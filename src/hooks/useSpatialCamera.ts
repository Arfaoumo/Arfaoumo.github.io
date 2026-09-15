import { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import {
  bound,
  layoutFor,
  nearestZone,
  zonePresets,
  projectPosition,
  projectStep,
  type CameraPreset,
} from "./spatial";
import { projects, type ZoneId } from "../data/content";

export function useSpatialCamera(initial: ZoneId, initialProject = 0) {
  const viewport = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState(() =>
    layoutFor(innerWidth, innerHeight),
  );
  const layoutRef = useRef(layout);
  const camera = useRef<CameraPreset>({
    ...zonePresets[layout.breakpoint][initial],
    ...(initial === "work"
      ? projectPosition(initialProject, layout.width)
      : {}),
  });
  const [nearest, setNearest] = useState<ZoneId>(initial);
  const nearestRef = useRef(initial);
  const tween = useRef<gsap.core.Tween | null>(null);
  const dragging = useRef(false);
  const suppressClick = useRef(false);
  const [traveling, setTraveling] = useState(false);
  const [workIndex, setWorkIndex] = useState(initialProject);
  const workIndexRef = useRef(initialProject);
  const render = useCallback(() => {
    const c = camera.current,
      a = layoutRef.current;
    if (world.current)
      world.current.style.transform = `translate(${a.centerX}px,${a.centerY}px) scale(${c.scale}) rotate(${c.rotation}deg) translate(${-c.x}px,${-c.y}px)`;
    const n = nearestZone(c.x, c.y);
    const index = bound(
      Math.round((c.x - projectPosition(0, a.width).x) / projectStep(a.width)),
      0,
      projects.length - 1,
    );
    if (index !== workIndexRef.current) {
      workIndexRef.current = index;
      setWorkIndex(index);
    }
    if (n !== nearestRef.current) {
      nearestRef.current = n;
      setNearest(n);
    }
  }, []);
  const stop = useCallback(() => {
    tween.current?.kill();
    tween.current = null;
    setTraveling(false);
  }, []);
  const travel = useCallback(
    (zone: ZoneId, immediate = false, projectIndex = 0) => {
      stop();
      const target = { ...zonePresets[layoutRef.current.breakpoint][zone] };
      if (zone === "work")
        Object.assign(
          target,
          projectPosition(projectIndex, layoutRef.current.width),
        );
      if (immediate || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        Object.assign(camera.current, target);
        render();
        return;
      }
      setTraveling(true);
      tween.current = gsap.to(camera.current, {
        ...target,
        duration: Math.min(
          1.35,
          0.8 +
            Math.hypot(
              camera.current.x - target.x,
              camera.current.y - target.y,
            ) /
              10000,
        ),
        ease: "power3.inOut",
        onUpdate: render,
        onComplete: () => setTraveling(false),
      });
    },
    [render, stop],
  );
  const zoom = useCallback(
    (factor: number, px?: number, py?: number) => {
      stop();
      const c = camera.current,
        a = layoutRef.current;
      const sx = (px ?? a.centerX) - a.centerX,
        sy = (py ?? a.centerY) - a.centerY;
      const scale = bound(
        c.scale * factor,
        a.breakpoint === "mobile" ? 0.65 : 0.55,
        1.6,
      );
      c.x = bound(
        c.x + sx / c.scale - sx / scale,
        -4000,
        projectPosition(projects.length - 1, a.width).x + a.width,
      );
      c.y = bound(c.y + sy / c.scale - sy / scale, -3550, 3450);
      c.scale = scale;
      render();
    },
    [render, stop],
  );
  useLayoutEffect(() => {
    const area = viewport.current!;
    const points = new Map<number, { x: number; y: number }>();
    let start = { x: 0, y: 0 },
      last = { x: 0, y: 0 },
      distance = 0,
      frame = 0;
    const queue = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          render();
        });
    };
    const midpoint = () => {
      const p = [...points.values()];
      return {
        x: (p[0].x + p[1].x) / 2,
        y: (p[0].y + p[1].y) / 2,
        d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y),
      };
    };
    const down = (e: PointerEvent) => {
      if (e.button !== 0 || (e.target as Element).closest("video,dialog"))
        return;
      stop();
      points.set(e.pointerId, { x: e.clientX, y: e.clientY });
      start = last = { x: e.clientX, y: e.clientY };
      dragging.current = true;
      suppressClick.current = false;
      area.dataset.dragging = "true";
      if (points.size === 2) {
        const m = midpoint();
        distance = m.d;
        last = m;
      }
    };
    const move = (e: PointerEvent) => {
      if (!points.has(e.pointerId)) return;
      points.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const c = camera.current;
      if (
        Math.hypot(e.clientX - start.x, e.clientY - start.y) > 5 ||
        points.size === 2
      ) {
        suppressClick.current = true;
        if (!area.hasPointerCapture(e.pointerId))
          area.setPointerCapture(e.pointerId);
      }
      if (!suppressClick.current) return;
      if (points.size === 2) {
        const m = midpoint();
        zoom(distance ? m.d / distance : 1, m.x, m.y);
        c.x -= (m.x - last.x) / c.scale;
        c.y -= (m.y - last.y) / c.scale;
        distance = m.d;
        last = m;
      } else {
        c.x -= (e.clientX - last.x) / c.scale;
        c.y -= (e.clientY - last.y) / c.scale;
        last = { x: e.clientX, y: e.clientY };
      }
      c.x = bound(
        c.x,
        -4000,
        projectPosition(projects.length - 1, layoutRef.current.width).x +
          layoutRef.current.width,
      );
      c.y = bound(c.y, -3550, 3450);
      queue();
    };
    const up = (e: PointerEvent) => {
      points.delete(e.pointerId);
      if (points.size === 1) last = [...points.values()][0];
      if (!points.size) {
        dragging.current = false;
        area.dataset.dragging = "false";
      }
      if (area.hasPointerCapture(e.pointerId))
        area.releasePointerCapture(e.pointerId);
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom(
        Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.035 : 0.0015)),
        e.clientX,
        e.clientY,
      );
    };
    const click = (e: MouseEvent) => {
      if (suppressClick.current) {
        e.preventDefault();
        e.stopPropagation();
        suppressClick.current = false;
      }
    };
    const resize = () => {
      stop();
      const a = layoutFor(innerWidth, innerHeight);
      if (nearestRef.current === "work")
        camera.current.x = projectPosition(workIndexRef.current, a.width).x;
      layoutRef.current = a;
      setLayout(a);
      render();
    };
    render();
    area.addEventListener("pointerdown", down);
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerup", up);
    area.addEventListener("pointercancel", up);
    area.addEventListener("wheel", wheel, { passive: false });
    area.addEventListener("click", click, true);
    window.addEventListener("resize", resize);
    return () => {
      stop();
      cancelAnimationFrame(frame);
      area.removeEventListener("pointerdown", down);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerup", up);
      area.removeEventListener("pointercancel", up);
      area.removeEventListener("wheel", wheel);
      area.removeEventListener("click", click, true);
      window.removeEventListener("resize", resize);
    };
  }, [render, stop, zoom]);
  return {
    viewport,
    world,
    camera,
    layout,
    nearest,
    travel,
    zoom,
    traveling,
    stop,
    render,
    workIndex,
  };
}
