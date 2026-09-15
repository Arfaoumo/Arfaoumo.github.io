import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  copy,
  contact,
  labels,
  projects,
  zoneIds,
  type Language,
  type Project,
  type ZoneId,
} from "../data/content";
import { useSpatialCamera } from "../hooks/useSpatialCamera";
import { parseHash, positions } from "../hooks/spatial";
import { Home, Profile, Stack, Work, Journey, Contact } from "../zones/Zones";
import ProjectDetail from "../components/ProjectDetail";
function stored(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Private browsing may disable storage. */
  }
}
export default function App() {
  const initial = useRef(parseHash(location.hash));
  const spatial = useSpatialCamera(
    initial.current.zone,
    Math.max(
      0,
      projects.findIndex((p) => p.id === initial.current.project),
    ),
  );
  const { travel, stop } = spatial;
  const [lang, setLang] = useState<Language>(() => {
    const v = stored("portfolio-language");
    return v === "fr" || v === "it" ? v : "en";
  });
  const [theme, setTheme] = useState<"day" | "night">(() =>
    document.documentElement.dataset.theme === "night" ? "night" : "day",
  );
  const [project, setProject] = useState<Project | undefined>(() =>
    projects.find((p) => p.id === initial.current.project),
  );
  const [origin, setOrigin] = useState({
    x: innerWidth / 2,
    y: innerHeight / 2,
  });
  const selectedRef = useRef(project);
  const openedHere = useRef(false);
  const returnCamera = useRef({ ...spatial.camera.current });
  const cameraRef = spatial.camera;
  const render = spatial.render;
  useEffect(() => {
    document.documentElement.lang = lang;
    persist("portfolio-language", lang);
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "day" ? "#f2ecdf" : "#191a17");
    persist("portfolio-theme", theme);
  }, [theme]);
  useEffect(() => {
    const changed = () => {
      const route = parseHash(location.hash);
      const next = projects.find((p) => p.id === route.project);
      if (
        selectedRef.current &&
        !next &&
        route.zone === "work" &&
        openedHere.current
      ) {
        stop();
        Object.assign(cameraRef.current, returnCamera.current);
        render();
      } else if (!next || !selectedRef.current) {
        travel(
          route.zone,
          false,
          Math.max(
            0,
            projects.findIndex((p) => p.id === next?.id),
          ),
        );
      }
      selectedRef.current = next;
      setProject(next);
    };
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, [travel, stop, cameraRef, render]);
  const navigate = useCallback(
    (zone: ZoneId) => {
      openedHere.current = false;
      if (location.hash === `#${zone}`) travel(zone);
      else location.hash = zone;
    },
    [travel],
  );
  const open = (p: Project, e: React.MouseEvent) => {
    stop();
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
    returnCamera.current = { ...cameraRef.current };
    openedHere.current = true;
    selectedRef.current = p;
    setProject(p);
    history.pushState(null, "", `#work/${p.id}`);
  };
  const close = () => {
    if (openedHere.current) {
      history.back();
    } else {
      selectedRef.current = undefined;
      setProject(undefined);
      history.replaceState(null, "", "#work");
      travel(
        "work",
        true,
        Math.max(
          0,
          projects.findIndex((p) => p.id === project?.id),
        ),
      );
    }
  };
  const content = {
    home: <Home lang={lang} />,
    profile: <Profile lang={lang} />,
    stack: <Stack lang={lang} />,
    work: <Work lang={lang} open={open} activeIndex={spatial.workIndex} />,
    journey: <Journey lang={lang} />,
    contact: <Contact lang={lang} />,
  };
  return (
    <>
      <a
        className="skip"
        href={`#${spatial.nearest}`}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(`zone-${spatial.nearest}`)?.focus();
        }}
      >
        {copy.skip[lang]}
      </a>
      <header className="masthead">
        <a
          href="#home"
          className="monogram"
          onClick={(e) => {
            e.preventDefault();
            navigate("home");
          }}
          aria-label="Mohamed Arfaoui"
        >
          Mohamed Arfaoui
        </a>

        <div className="utilities">
          <div
            className="language-control"
            role="group"
            aria-label={copy.language[lang]}
          >
            {(["fr", "en", "it"] as Language[]).map((l) => (
              <button
                lang={l}
                key={l}
                aria-pressed={l === lang}
                aria-label={
                  { fr: "Français", en: "English", it: "Italiano" }[l]
                }
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="theme-control"
            onClick={() => setTheme(theme === "day" ? "night" : "day")}
            aria-label={copy.theme[lang]}
          >
            <span className="theme-mark" aria-hidden="true" />
            {copy[theme][lang]}
          </button>
          <a className="global-cv" href={contact.cv} download>
            CV
          </a>
        </div>
      </header>
      <main
        ref={spatial.viewport}
        className="viewport"
        data-traveling={spatial.traveling}
        aria-label={copy.portfolio[lang]}
      >
        <div
          ref={spatial.world}
          className="world"
          style={
            {
              "--zone-width": `${spatial.layout.width}px`,
              "--zone-height": `${spatial.layout.height}px`,
              "--project-step": `${spatial.layout.width + 480}px`,
            } as CSSProperties
          }
        >
          {zoneIds.map((id) => (
            <section
              key={id}
              id={`zone-${id}`}
              className={`zone zone-${id}`}
              style={{ left: positions[id].x, top: positions[id].y }}
              tabIndex={-1}
              aria-label={labels[id][lang]}
              inert={spatial.nearest !== id}
            >
              {content[id]}
            </section>
          ))}
        </div>
      </main>
      {spatial.nearest === "work" && (
        <nav
          className="project-navigation"
          aria-label={copy.projectNavigation[lang]}
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              aria-current={spatial.workIndex === i ? "true" : undefined}
              onClick={() => travel("work", false, i)}
            >
              {p.title}
            </button>
          ))}
        </nav>
      )}
      <div className="explore-tools">
        <span>
          {
            (spatial.layout.breakpoint === "mobile"
              ? copy.touchHint
              : copy.hint)[lang]
          }
        </span>
        <div>
          <button
            aria-label={copy.zoomOut[lang]}
            onClick={() => spatial.zoom(0.85)}
          >
            −
          </button>
          <button
            className="recenter"
            onClick={() => travel(spatial.nearest, false, spatial.workIndex)}
          >
            {copy.recenter[lang]}
          </button>
          <button
            aria-label={copy.zoomIn[lang]}
            onClick={() => spatial.zoom(1.15)}
          >
            +
          </button>
        </div>
      </div>
      <nav className="navigation" aria-label={copy.navigation[lang]}>
        {zoneIds.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={spatial.nearest === id ? "location" : undefined}
            onClick={(e) => {
              e.preventDefault();
              navigate(id);
            }}
          >
            <span className="nav-label">{labels[id][lang]}</span>
          </a>
        ))}
      </nav>
      {project && (
        <ProjectDetail
          key={project.id}
          project={project}
          lang={lang}
          close={close}
          origin={origin}
        />
      )}
    </>
  );
}
