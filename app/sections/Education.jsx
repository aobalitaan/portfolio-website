import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollTheme } from "../utils/ScrollProvider";
import { education, certifications, publications } from "../utils/EducationList";
import SectionHeading from "../components/SectionHeading";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

// Must stay at module scope. Defined inside Education() it would be a new
// component type on every render — and since the scroll context updates each
// frame, React would unmount/remount these subtrees continuously, resetting
// SlideDiv's "already played" ref and replaying the entrance animation on scroll.
function Block({ label, delay, type, show, actText, actBorder, children }) {
  return (
    <SlideDiv show={show} animateOnce type={type} delay={delay} className="overflow-visible">
      <FadeScroll show={show}>
        <div className={`border-l-2 pl-4 md:pl-6 ${actBorder}`}>
          <div className={`smalltext mb-1 uppercase tracking-widest ${actText}`}>{label}</div>
          {children}
        </div>
      </FadeScroll>
    </SlideDiv>
  );
}

export default function Education() {
  const { activeSection, actText, actBg, actBorder, inacText } = useScrollTheme();
  const isActive = activeSection === "education";

  return (
    <div
      id="education"
      className={`relative flex w-full flex-1 flex-col ${inacText} px-4 pb-8 pt-24 md:px-8 md:pt-28 lg:px-16`}
    >
      <SectionHeading title="education" actText={actText} actBg={actBg} show={isActive} />

      <div className="no-scrollbar mt-4 flex flex-1 flex-col justify-center gap-6 overflow-y-auto md:gap-8">

        <Block label="Degree" delay={0.1} type="left" show={isActive} actText={actText} actBorder={actBorder}>
          <div className="largetext">{education.degree}</div>
          <div className="regulartext opacity-90">{education.school}</div>
          <div className="smalltext opacity-70">{education.period}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {education.honors.map((h) => (
              <span key={h} className={`smalltext rounded-full px-3 py-1 ${actBg} text-brand-white`}>
                {h}
              </span>
            ))}
          </div>
          <ul className="mt-2 flex flex-col gap-1">
            {education.awards.map((a) => (
              <li key={a} className="smalltext flex gap-2">
                <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${actBg}`} />
                <span className="opacity-80">{a}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Certifications" delay={0.2} type="left" show={isActive} actText={actText} actBorder={actBorder}>
          {certifications.map((c) => (
            <a
              key={c.credentialId}
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="group block transition-opacity hover:opacity-70"
            >
              <div className="regulartext inline-flex items-center gap-1">
                {c.title}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="smalltext opacity-70">
                {c.issuer} · {c.period} · ID {c.credentialId}
              </div>
            </a>
          ))}
        </Block>

        <Block label="Research & Publications" delay={0.3} type="right" show={isActive} actText={actText} actBorder={actBorder}>
          {publications.map((p) => (
            <div key={p.title}>
              <div className="regulartext italic leading-snug">{p.title}</div>
              <div className="smalltext mt-1 opacity-80">{p.authors}</div>
              <div className="smalltext opacity-70">
                {p.venue} · {p.location}
              </div>
              <div className="smalltext opacity-70">
                {p.period} · {p.publisher}
              </div>
            </div>
          ))}
        </Block>

      </div>
    </div>
  );
}
