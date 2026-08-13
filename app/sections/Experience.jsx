import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollTheme } from "../utils/ScrollProvider";
import experienceList from "../utils/ExperienceList";
import SectionHeading from "../components/SectionHeading";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

export default function Experience() {
  const { activeSection, actText, actBg, actBorder, inacText } = useScrollTheme();
  const isActive = activeSection === "experience";

  return (
    <div
      id="experience"
      className={`relative flex w-full flex-1 flex-col ${inacText} px-4 pb-8 pt-24 md:px-8 md:pt-28 lg:px-16`}
    >
      <SectionHeading title="experience" actText={actText} actBg={actBg} show={isActive} />

      <div className="no-scrollbar mt-4 flex flex-1 flex-col justify-center gap-6 overflow-y-auto md:gap-10">
        {experienceList.map((job, i) => (
          <SlideDiv
            key={job.company}
            show={isActive}
            animateOnce
            type="left"
            delay={0.1 + i * 0.15}
            className="overflow-visible"
          >
            <FadeScroll show={isActive}>
              <div className={`border-l-2 pl-4 md:pl-6 ${actBorder}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  {job.link ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`heading3 group inline-flex items-center gap-1 ${actText} transition-opacity hover:opacity-70`}
                    >
                      {job.company}
                      <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className={`heading3 ${actText}`}>{job.company}</span>
                  )}
                  <div className="smalltext opacity-70">{job.period}</div>
                </div>

                <div className="largetext mt-0.5">{job.role}</div>
                <div className="smalltext opacity-70">{job.location}</div>

                <ul className="mt-3 flex flex-col gap-2">
                  {job.bullets.map((bullet, b) => (
                    <li key={b} className="regulartext flex gap-2 text-sm leading-snug md:text-base">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${actBg}`} />
                      <span className="opacity-90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeScroll>
          </SlideDiv>
        ))}
      </div>
    </div>
  );
}
