import React from "react";
import { ArrowUpRight } from "lucide-react";
import projectList from "../utils/ProjectList";
import Section from "../components/Section";
import Reveal from "../components/animation/Reveal";
import ProjectPreview from "../components/ProjectPreview";

/**
 * Two projects, presented large.
 *
 * They used to sit in a hover-shuffle carousel — a stacking, rotating,
 * blur-on-unfocus rail built for a deck of cards, holding two. That machinery
 * read as padding around a thin section. Two projects shown enormous reads as
 * confidence instead.
 *
 * The card is an <article>, not one big <a>: the media block carries its own
 * link overlay and its own play control, and those can't legally (or usably)
 * nest inside an outer anchor. Hover styling still keys off `group` on the
 * article, so hovering anywhere on the card still drives the whole thing.
 *
 * Each panel wears its own brand colour rather than the section accent: these
 * are real products with real identities, and Wyren's orange and Arca's blue
 * are already the endpoints of the page's heat ramp.
 */
function Project({ project, delay }) {
  const href = project.prodLink || project.repoLink;
  const alt = `${project.title} — ${project.subtitle}`;

  return (
    <Reveal type="up" delay={delay}>
      <article className="group" style={{ "--project": project.color }}>
        {/* 16:10 to match the product screenshots exactly — the still is the
            default state, so it's the one that shouldn't be cropped. */}
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg border border-[var(--line)] transition-colors duration-500 group-hover:border-[var(--project)]">
          <ProjectPreview
            src={`/${project.previewPath}`}
            poster={`/${project.imagePath}`}
            alt={alt}
            href={href}
            priority={delay === 0}
          />
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-[1fr_220px] md:gap-12">
          <div>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-baseline gap-3 transition-opacity duration-500 hover:opacity-80"
              style={{ color: project.color }}
            >
              <h3 className="display-lg">{project.title}</h3>
              <ArrowUpRight
                size={24}
                className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <div className="title ink-dim mt-3">{project.subtitle}</div>
            <p className="body ink-dim mt-4 max-w-[58ch]">{project.desc}</p>
          </div>

          <div className="mono-plain ink-faint flex flex-col gap-1 md:pt-4">
            {project.stack.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="selected projects" contentClass="mt-14 md:mt-20">
      <div className="flex flex-col gap-24 md:gap-36">
        {projectList.map((project, i) => (
          <Project key={project.title} project={project} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  );
}
