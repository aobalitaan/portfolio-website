import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollTheme } from "../utils/ScrollProvider";
import { education, certifications, publications } from "../utils/EducationList";
import SectionHeading from "../components/SectionHeading";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

// Card, not another left-bordered text block — Experience already owns that
// treatment, and repeating it is what made the sections blur together.
// Module scope, not inline: an inline component is a new type every render, and
// the scroll context updates each frame, so React would remount the subtree and
// replay SlideDiv's entrance animation continuously.
function Card({ label, actText, actBorder, children }) {
  return (
    <div className={`flex-1 border p-4 md:p-5 ${actBorder}`}>
      <div className={`smalltext mb-2 uppercase tracking-[0.2em] ${actText}`}>{label}</div>
      {children}
    </div>
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

      <div className="no-scrollbar mt-4 flex flex-1 flex-col justify-center gap-8 overflow-y-auto md:gap-12">

        <SlideDiv show={isActive} animateOnce type="left" delay={0.1} className="overflow-visible">
          <FadeScroll show={isActive}>
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-4">
              <div className="col-span-12 md:col-span-7">
                <div className="heading1 leading-[0.95]">{education.degree}</div>
                <div className="largetext mt-1 opacity-80">{education.school}</div>
              </div>

              {/* The honour is the headline fact — set it as display type
                  rather than burying it in a pill. */}
              <div className="col-span-12 md:col-span-5 md:text-right">
                <div className={`font-var1 text-2xl leading-none md:text-4xl ${actText}`}>
                  {education.honors[0]}
                </div>
                <div className="smalltext mt-2 opacity-65">
                  {education.honors.slice(1).join(" · ")} · {education.period}
                </div>
              </div>

              <div className="col-span-12">
                <div className={`h-px w-full opacity-20 ${actBg}`} />
                <div className="smalltext mt-3 flex flex-wrap gap-x-6 gap-y-1 opacity-70">
                  {education.awards.map((a) => (
                    <span key={a} className="flex items-baseline gap-2">
                      <span className={`h-px w-3 shrink-0 ${actBg}`} />
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeScroll>
        </SlideDiv>

        <SlideDiv show={isActive} animateOnce type="bottom" delay={0.25} className="overflow-visible">
          <FadeScroll show={isActive}>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">

              <Card label="Certification" actText={actText} actBorder={actBorder}>
                {certifications.map((c) => (
                  <a
                    key={c.credentialId}
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group block transition-opacity hover:opacity-70"
                  >
                    <div className="regulartext inline-flex items-start gap-1 leading-snug">
                      {c.title}
                      <ArrowUpRight size={16} className="mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="smalltext mt-1 opacity-60">
                      {c.issuer} · {c.period}
                    </div>
                    <div className="smalltext opacity-45">ID {c.credentialId}</div>
                  </a>
                ))}
              </Card>

              <Card label="Research" actText={actText} actBorder={actBorder}>
                {publications.map((p) => (
                  <div key={p.title}>
                    <div className="regulartext max-w-[52ch] italic leading-snug">{p.title}</div>
                    <div className="smalltext mt-2 opacity-60">{p.authors}</div>
                    <div className="smalltext mt-1 opacity-45">
                      {p.venue} · {p.period} · {p.publisher}
                    </div>
                  </div>
                ))}
              </Card>

            </div>
          </FadeScroll>
        </SlideDiv>

      </div>
    </div>
  );
}
