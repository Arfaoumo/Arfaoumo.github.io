import type { ZoneId } from "../data/content";
export interface CameraPreset {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}
export type Breakpoint = "desktop" | "tablet" | "mobile";
export const positions: Record<ZoneId, { x: number; y: number }> = {
  home: { x: 0, y: 0 },
  profile: { x: -3100, y: -650 },
  stack: { x: -2700, y: 2700 },
  work: { x: 3300, y: -450 },
  journey: { x: 150, y: -2900 },
  contact: { x: 3200, y: 2750 },
};
// World coordinates and authored framing live here, never inside zone markup.
export const zonePresets: Record<
  Breakpoint,
  Record<ZoneId, CameraPreset>
> = Object.fromEntries(
  (["desktop", "tablet", "mobile"] as const).map((b) => [
    b,
    Object.fromEntries(
      Object.entries(positions).map(([id, p]) => [
        id,
        { ...p, scale: 1, rotation: 0 },
      ]),
    ),
  ]),
) as Record<Breakpoint, Record<ZoneId, CameraPreset>>;
export function layoutFor(width: number, height: number) {
  const breakpoint: Breakpoint =
    width < 640 ? "mobile" : width < 1100 ? "tablet" : "desktop";
  const mobile = breakpoint === "mobile";
  const short = height < 500 && width >= 640;
  const zoneHeight = Math.max(180, height - (short ? 150 : mobile ? 180 : 220));
  return {
    breakpoint,
    width: mobile ? width - 40 : Math.min(width - 112, 1380),
    height: zoneHeight,
    centerX: width / 2,
    centerY: (short ? 64 : mobile ? 64 : 86) + zoneHeight / 2,
  };
}
export function bound(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
export function projectStep(width: number) {
  return width + 480;
}
export function projectPosition(index: number, width: number) {
  return {
    x: positions.work.x + index * projectStep(width),
    y: positions.work.y,
  };
}
export function nearestZone(x: number, y: number): ZoneId {
  return (
    Object.entries(positions) as [ZoneId, { x: number; y: number }][]
  ).reduce<ZoneId>(
    (best, [id, p]) =>
      Math.hypot(x - p.x, y - p.y) <
      Math.hypot(x - positions[best].x, y - positions[best].y)
        ? id
        : best,
    "home",
  );
}
export function parseHash(hash: string): { zone: ZoneId; project?: string } {
  const [zone, project] = hash.replace(/^#/, "").split("/");
  return {
    zone: Object.hasOwn(positions, zone) ? (zone as ZoneId) : "home",
    project: zone === "work" ? project : undefined,
  };
}
