import { useState, type CSSProperties } from "react";
import {
  contact,
  copy,
  experiences,
  projects,
  skills,
  technologies,
  type Language,
  type Project,
} from "../data/content";
import { ProjectImage } from "../components/ProjectDetail";
type Props = { lang: Language };
export function Home({ lang }: Props) {
  return (
    <div className="home-layout">
      <div className="home-color" aria-hidden="true" />
      <h1 className="home-name">
        <span>MOHAMED</span>
        <span>
          ARFAOUI<span className="name-dot">.</span>
        </span>
      </h1>
      <p className="home-slogan">{copy.profileTitle[lang]}</p>
      <p className="home-study">
        BUT Informatique
        <br />
        IUT Annecy
      </p>
    </div>
  );
}
export function Profile({ lang }: Props) {
  return (
    <div className="profile-layout">
      <div className="profile-heading">
        <h2>
          Mohamed
          <br />
          Arfaoui<span>.</span>
        </h2>
        <p className="profile-slogan">{copy.profileTitle[lang]}</p>
      </div>
      <div className="profile-reading">
        <p className="bio">{copy.bio[lang]}</p>
        <p>{copy.profileBody[lang]}</p>
        <dl className="profile-facts">
          <div>
            <dt>{copy.education[lang]}</dt>
            <dd>
              BUT Informatique, IUT Annecy
              <br />
              {copy.course[lang]}
              <br />
              {copy.studyMode[lang]}
            </dd>
          </div>
          <div>
            <dt>{copy.languages[lang]}</dt>
            <dd>{copy.spoken[lang]}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
export function Stack({ lang }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="stack-layout">
      <h2 className="stack-heading">
        Stack<span>&</span>
      </h2>
      <div className="tech-wall" onMouseLeave={() => setSelected(null)}>
        {technologies.map((tech, i) => (
          <button
            key={tech}
            className={`tech tech-${i} ${selected === tech ? "selected" : ""}`}
            onMouseEnter={() => setSelected(tech)}
            onFocus={() => setSelected(tech)}
            onBlur={() => setSelected(null)}
            onClick={() => setSelected(tech)}
            aria-pressed={selected === tech}
          >
            {tech}
          </button>
        ))}
      </div>
      <div className="skills">
        <h3>{copy.skills[lang]}</h3>
        {skills.map((s) => (
          <div key={s.title.en}>
            <h4>{s.title[lang]}</h4>
            <p>{s.text[lang]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export function Journey({ lang }: Props) {
  return (
    <div className="journey-layout">
      <header>
        <h2>{copy.journeyTitle[lang]}</h2>
        <p className="eyebrow">{copy.journeySubtitle[lang]}</p>
      </header>
      <ol className="timeline">
        {experiences.map((e, i) => (
          <li key={e.year} className={`event event-${i}`}>
            <div className="year">{e.year}</div>
            <div className="event-copy">
              <h3>{e.title[lang]}</h3>
              <p className="event-place">{e.place[lang]}</p>
              <p className="event-text">{e.text[lang]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
export function Contact({ lang }: Props) {
  return (
    <div className="contact-layout">
      <h2>{copy.contactTitle[lang]}</h2>
      <div className="contact-content">
        <p className="contact-name">Mohamed Arfaoui</p>
        <a className="email" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        <div className="contact-links">
          <a href={contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={contact.cv} download>
            CV
          </a>
        </div>
      </div>
    </div>
  );
}
export function Work({
  lang,
  open,
  activeIndex,
}: {
  lang: Language;
  open: (p: Project, e: React.MouseEvent) => void;
  activeIndex: number;
}) {
  return (
    <div className="work-layout">
      {projects.map((p, i) => (
        <article
          key={p.id}
          className={`project-exhibit exhibit-${p.composition}`}
          inert={i !== activeIndex}
          style={{ "--project-index": i } as CSSProperties}
        >
          <button
            className={`project project-${p.composition}`}
            onClick={(e) => open(p, e)}
            aria-label={`${copy.open[lang]}: ${p.title}`}
          >
            {p.composition === "designet" && (
              <>
                <div className="project-heading">
                  <p className="eyebrow">{copy.professional[lang]}, 2026</p>
                  <h2>
                    Designet
                    <br />
                    <span>ERP</span>
                  </h2>
                  <p>{p.summary[lang]}</p>
                </div>
                <ProjectImage project={p} lang={lang} />
              </>
            )}
            {p.composition === "lumora" && (
              <>
                <p className="eyebrow">{copy.ongoing[lang]}</p>
                <h2>Lumora</h2>
                <p className="voice-line">{copy.voice[lang]}</p>
                <p className="project-summary">{p.summary[lang]}</p>
                <span className="project-stack">
                  React / Node.js / SQL / Capacitor / Tauri
                </span>
              </>
            )}
            {p.composition === "iot" && (
              <>
                <div className="iot-achievement">
                  <strong>
                    1<sup>{copy.firstSuffix[lang]}</sup>
                  </strong>
                  <p>
                    {copy.regional[lang]}
                    <br />
                    {copy.paris[lang]}
                  </p>
                </div>
                <ProjectImage project={p} lang={lang} />
                <div className="iot-caption">
                  <h2>IoT Laser Target</h2>
                  <p>{copy.olympiad[lang]}</p>
                </div>
                <div className="iot-description">
                  <p>{p.summary[lang]}</p>
                  <span>{p.stack.join(" / ")}</span>
                </div>
              </>
            )}
            {p.composition === "cube" && (
              <>
                <h2>CubeBike</h2>
                <ProjectImage project={p} lang={lang} />
                <div className="cube-evolution">
                  <strong>V1 → V2</strong>
                  <p>PHP / SQL → Vue.js</p>
                  <p>{copy.evolution[lang]}</p>
                </div>
              </>
            )}
            {p.composition === "software" && (
              <>
                <h2>{p.title}</h2>
                <ProjectImage project={p} lang={lang} />
                <p>{p.summary[lang]}</p>
              </>
            )}
            <span className="project-read">
              {copy.open[lang]} <span aria-hidden="true">↗</span>
            </span>
          </button>
        </article>
      ))}
    </div>
  );
}
