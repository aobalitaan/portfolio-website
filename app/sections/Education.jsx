import React from "react";
import { ArrowUpRight } from "lucide-react";
import { education, certifications, publications } from "../utils/EducationList";
import Section from "../components/Section";
import Reveal from "../components/animation/Reveal";

// Compact records (degree, certification) keep the meta rail. Research does
// not — a paper published in the ACM Digital Library was being rendered as a
// footnote under the same 150px label as everything else, and it's the
// strongest credential in the section.
function Record({ label, delay, children }) {
  return (
    <Reveal type="up" delay={delay}>
      <div className="grid gap-3 md:grid-cols-[168px_1fr] md:gap-10">
        <div className="mono ink-faint md:pt-2">{label}</div>
        <div>{children}</div>
      </div>
    </Reveal>
  );
}

export default function Education() {
  const paper = publications[0];

  return (
    <Section id="education" title="education" contentClass="mt-14 md:mt-20">
      <div className="flex flex-col gap-16 md:gap-20">

        <Record label="Degree" delay={0}>
          <div className="display-md accent">{education.degree}</div>
          <div className="body-lg ink-dim mt-2">{education.school}</div>

          {/* Summa Cum Laude is the headline fact here, so it gets marked
              rather than buried in a middot-separated run of text. */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {education.honors.map((h) => (
              <span
                key={h}
                className="mono rounded-full border border-[var(--accent)] px-3 py-1.5 accent"
              >
                {h}
              </span>
            ))}
            <span className="mono ink-faint pl-1">{education.period}</span>
          </div>

          <ul className="mt-5 flex flex-col gap-2">
            {education.awards.map((a) => (
              <li key={a} className="body-sm ink-dim flex items-baseline gap-3">
                <span className="mt-2 h-px w-3 shrink-0 bg-[var(--accent)] opacity-60" />
                {a}
              </li>
            ))}
          </ul>
        </Record>

        <Record label="Certification" delay={0.06}>
          {certifications.map((c) => (
            <a
              key={c.credentialId}
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="group block transition-opacity hover:opacity-70"
            >
              <div className="title inline-flex items-start gap-1.5 accent">
                {c.title}
                <ArrowUpRight size={16} className="mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="body ink-dim mt-1">{c.issuer} · {c.period}</div>
              <div className="mono-plain ink-faint mt-1">ID {c.credentialId}</div>
            </a>
          ))}
        </Record>

        {/* Peer-reviewed publication — given a panel of its own. */}
        <Reveal type="up" delay={0.12}>
          <div className="relative rounded-lg border border-[var(--line)] p-6 md:p-10">
            <div className="mono accent">Peer-reviewed publication</div>

            <h3 className="display-md mt-5 max-w-[26ch] leading-[1.1]">{paper.title}</h3>

            <div className="body ink-dim mt-5 max-w-[62ch]">{paper.authors}</div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--line)] pt-5">
              <Fact label="Venue" value={paper.venue} />
              <Fact label="Held at" value={paper.location} />
              <Fact label="Dates" value={paper.period} />
              <Fact label="Published in" value={paper.publisher} />
            </div>
          </div>
        </Reveal>

      </div>
    </Section>
  );
}

function Fact({ label, value }) {
  return (
    <div className="max-w-[30ch]">
      <div className="mono ink-faint">{label}</div>
      <div className="body-sm mt-1.5">{value}</div>
    </div>
  );
}
