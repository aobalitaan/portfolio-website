import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollTheme } from "../utils/ScrollProvider";
import { education, certifications, publications } from "../utils/EducationList";
import Section from "../components/Section";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

// Same meta-left / content-right rail as Experience, so the eye keeps one
// vertical anchor across sections instead of relearning the layout each screen.
function Row({ label, show, delay, children }) {
  return (
    <SlideDiv show={show} animateOnce type="left" delay={delay} className="overflow-visible">
      <FadeScroll show={show}>
        <div className="grid gap-1 md:grid-cols-[150px_1fr] md:gap-8">
          <div className="smalltext uppercase tracking-[0.15em] opacity-50 md:pt-1.5">{label}</div>
          <div>{children}</div>
        </div>
      </FadeScroll>
    </SlideDiv>
  );
}

export default function Education() {
  const { activeSection, actText, actBg, inacText } = useScrollTheme();
  const isActive = activeSection === "education";

  return (
    <Section
      id="education"
      title="education"
      show={isActive}
      actText={actText}
      actBg={actBg}
      inacText={inacText}
    >
      <div className="flex flex-col gap-10 md:gap-12">

        <Row label="Degree" show={isActive} delay={0.1}>
          <div className={`heading3 ${actText}`}>{education.degree}</div>
          <div className="regulartext">{education.school}</div>
          <div className="regulartext mt-2">
            {education.honors.join(" · ")}
            <span className="opacity-50"> · {education.period}</span>
          </div>
          <ul className="mt-3 flex flex-col gap-1">
            {education.awards.map((a) => (
              <li key={a} className="regulartext flex items-baseline gap-3 text-sm opacity-75">
                <span className={`h-px w-3 shrink-0 opacity-50 ${actBg}`} />
                {a}
              </li>
            ))}
          </ul>
        </Row>

        <Row label="Certification" show={isActive} delay={0.2}>
          {certifications.map((c) => (
            <a
              key={c.credentialId}
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="group block transition-opacity hover:opacity-70"
            >
              <div className={`largetext inline-flex items-start gap-1 leading-snug ${actText}`}>
                {c.title}
                <ArrowUpRight size={16} className="mt-1.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="regulartext opacity-75">
                {c.issuer}
                <span className="opacity-70"> · {c.period} · ID {c.credentialId}</span>
              </div>
            </a>
          ))}
        </Row>

        <Row label="Research" show={isActive} delay={0.3}>
          {publications.map((p) => (
            <div key={p.title}>
              <div className={`largetext max-w-[46ch] leading-snug ${actText}`}>{p.title}</div>
              <div className="regulartext mt-1 opacity-75">{p.authors}</div>
              <div className="regulartext text-sm opacity-50">
                {p.venue} · {p.period} · {p.publisher}
              </div>
            </div>
          ))}
        </Row>

      </div>
    </Section>
  );
}
