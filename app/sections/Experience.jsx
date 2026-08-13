import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollTheme } from "../utils/ScrollProvider";
import experienceList from "../utils/ExperienceList";
import SectionHeading from "../components/SectionHeading";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

// Asymmetric editorial split: identity pinned left, substance right. Deliberately
// unlike Education's card grid and Skills' logo wall so the three sections don't
// read as one continuous document.
function Role({ job, i, show, actText, actBg, actBorder }) {
  return (
    <SlideDiv show={show} animateOnce type="left" delay={0.1 + i * 0.12} className="overflow-visible">
      <FadeScroll show={show}>
        <article className="grid grid-cols-12 gap-x-6 gap-y-4">

          <div className="col-span-12 md:col-span-4">
            <div className="flex items-start gap-3">
              <span className={`font-var1 text-4xl leading-none opacity-20 md:text-5xl ${actText}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                {job.link ? (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`heading2 group inline-flex items-center gap-1 ${actText} transition-opacity hover:opacity-70`}
                  >
                    {job.company}
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className={`heading2 ${actText}`}>{job.company}</span>
                )}
                <div className="largetext leading-tight">{job.role}</div>
                <div className="smalltext opacity-60">{job.location}</div>
                <div className="smalltext mt-1 opacity-60">{job.period}</div>
              </div>
            </div>
          </div>

          <div className={`col-span-12 border-l-2 pl-5 md:col-span-8 md:pl-6 ${actBorder}`}>
            <p className="regulartext max-w-[58ch] leading-relaxed opacity-90">{job.lead}</p>

            <ul className="mt-4 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {job.highlights.map((h) => (
                <li key={h} className="smalltext flex items-baseline gap-2 opacity-80">
                  <span className={`h-px w-3 shrink-0 translate-y-[-3px] ${actBg}`} />
                  {h}
                </li>
              ))}
            </ul>

            {/* Pulling the numbers out gives the eye somewhere to land that
                isn't a sentence. */}
            <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3">
              {job.metrics.map((m) => (
                <div key={m.label}>
                  <div className={`font-var1 text-xl leading-none md:text-2xl ${actText}`}>{m.value}</div>
                  <div className="smalltext opacity-55">{m.label}</div>
                </div>
              ))}
              <div className="smalltext ml-auto opacity-45">{job.stack.join(" · ")}</div>
            </div>
          </div>

        </article>
      </FadeScroll>
    </SlideDiv>
  );
}

export default function Experience() {
  const { activeSection, actText, actBg, actBorder, inacText } = useScrollTheme();
  const isActive = activeSection === "experience";

  return (
    <div
      id="experience"
      className={`relative flex w-full flex-1 flex-col ${inacText} px-4 pb-8 pt-24 md:px-8 md:pt-28 lg:px-16`}
    >
      <SectionHeading title="experience" actText={actText} actBg={actBg} show={isActive} />

      <div className="no-scrollbar mt-4 flex flex-1 flex-col justify-center gap-8 overflow-y-auto md:gap-14">
        {experienceList.map((job, i) => (
          <Role
            key={job.company}
            job={job}
            i={i}
            show={isActive}
            actText={actText}
            actBg={actBg}
            actBorder={actBorder}
          />
        ))}
      </div>
    </div>
  );
}
