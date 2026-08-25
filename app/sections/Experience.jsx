import React from "react";
import { ArrowUpRight } from "lucide-react";
import experienceList from "../utils/ExperienceList";
import Section from "../components/Section";
import Reveal from "../components/animation/Reveal";

/**
 * Date rail left, content right — the date is what you scan a work history by.
 *
 * The metrics row is new to the markup, not to the data: ExperienceList has
 * carried a `metrics` array all along and nothing rendered it, so the only
 * quantitative proof on the page was sitting in dead code.
 */
function Role({ job, delay }) {
  return (
    <Reveal type="up" delay={delay}>
      <article className="grid gap-3 md:grid-cols-[168px_1fr] md:gap-10">
        <div className="mono ink-faint md:pt-2">{job.period}</div>

        <div>
          {job.link ? (
            <a
              href={job.link}
              target="_blank"
              rel="noreferrer"
              className="title group inline-flex items-center gap-1.5 accent transition-opacity hover:opacity-70"
            >
              {job.company}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <div className="title accent">{job.company}</div>
          )}

          <div className="body mt-1">
            {job.role}
            <span className="ink-faint"> · {job.location}</span>
          </div>

          <p className="body-lg ink-dim mt-4 max-w-[54ch]">{job.lead}</p>

          {job.metrics?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-[var(--line)] py-4">
              {job.metrics.map((m) => (
                <div key={m.label}>
                  <div className="display-md accent leading-none">{m.value}</div>
                  <div className="mono ink-faint mt-2">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <ul className="mt-6 flex flex-col gap-2">
            {job.highlights.map((h) => (
              <li key={h} className="body-sm ink-dim flex items-baseline gap-3">
                <span className="mt-2 h-px w-3 shrink-0 bg-[var(--accent)] opacity-60" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mono-plain ink-faint mt-6">{job.stack.join("  ·  ")}</div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <Section id="experience" title="experience" contentClass="mt-14 md:mt-20">
      <div className="flex flex-col gap-16 md:gap-24">
        {experienceList.map((job, i) => (
          <Role key={job.company} job={job} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  );
}
