import { useEffect, useRef } from "react";
import { copy, type Language, type Project } from "../data/content";
export function ProjectImage({
  project,
  lang,
  className = "",
}: {
  project: Project;
  lang: Language;
  className?: string;
}) {
  return project.image ? (
    <img
      className={className}
      src={
        project.image === "erp"
          ? "/assets/erp.png"
          : `/assets/${project.image}-960.webp`
      }
      srcSet={
        project.image === "erp"
          ? undefined
          : `/assets/${project.image}-480.webp 480w, /assets/${project.image}-960.webp 960w, /assets/${project.image}-1440.webp 1440w`
      }
      sizes="(max-width:640px) 90vw, 70vw"
      alt={project.alt?.[lang] ?? project.title}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  ) : null;
}
export default function ProjectDetail({
  project,
  lang,
  close,
  origin,
}: {
  project: Project;
  lang: Language;
  close: () => void;
  origin: { x: number; y: number };
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const el = dialog.current!;
    el.showModal();
    return () => {
      el.close();
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`detail detail-${project.composition}`}
      style={{ transformOrigin: `${origin.x}px ${origin.y}px` }}
      aria-labelledby="project-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <button
        className="detail-close"
        autoFocus
        aria-label={copy.close[lang]}
        onClick={close}
      >
        ×
      </button>
      <article className="detail-content">
        <div className="detail-intro">
          <h1 id="project-title">{project.title}</h1>
          <p className="detail-lead">{project.summary[lang]}</p>
        </div>
        <ProjectImage project={project} lang={lang} className="detail-image" />
        <div className="detail-reading">
          <section>
            <h2>{copy.context[lang]}</h2>
            <p>{project.context[lang]}</p>
          </section>
          <section>
            <h2>{copy.implementation[lang]}</h2>
            <p>{project.implementation[lang]}</p>
          </section>
          {(["role", "technicalDecisions", "result", "lessons"] as const).map(
            (key) =>
              project[key] && (
                <section key={key}>
                  <h2>
                    {
                      (key === "technicalDecisions"
                        ? copy.decisions
                        : copy[key])[lang]
                    }
                  </h2>
                  <p>{project[key]![lang]}</p>
                </section>
              ),
          )}
          <section>
            <h2>Stack</h2>
            <p className="detail-stack">{project.stack.join(" / ")}</p>
          </section>
          {project.video && (
            <figure>
              <video
                controls
                preload="none"
                poster="/assets/olympiad-960.webp"
                src={project.video}
                aria-label={copy.video[lang]}
              />
              <figcaption>{copy.video[lang]}</figcaption>
            </figure>
          )}
          <section>
            <h2>{copy.source[lang]}</h2>
            <div className="detail-links">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label[lang]}
                </a>
              ))}
            </div>
          </section>
        </div>
      </article>
    </dialog>
  );
}
