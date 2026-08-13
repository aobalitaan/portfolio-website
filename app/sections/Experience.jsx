import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollTheme } from "../utils/ScrollProvider";
import experienceList from "../utils/ExperienceList";
import SectionHeading from "../components/SectionHeading";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

/**
 * Three type levels and three opacity levels, no more. The previous version had
 * an index number, a metrics row, two-column highlights and a stack line all
 * competing at once — density read as clutter because nothing was clearly
 * dominant. Here the company name is the only thing that shouts, the lead
 * carries the meaning, and everything else sits quietly at meta weight.
 */
function Role({ job, show, delay, actText, actBg }) {
  return (
    <SlideDiv show={show} animateOnce type="left" delay={delay} className="overflow-visible">
      <FadeScroll show={show}>
        <article className="max-w-3xl">

          {/* Date as an eyebrow, not right-aligned: the article is capped at
              max-w-3xl, so a right-aligned date lands mid-screen and reads as
              floating rather than as a ledger column. */}
          <div className="smalltext opacity-50">{job.period}</div>

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
            <div className={`heading2 ${actText}`}>{job.company}</div>
          )}

          <div className="regulartext mt-0.5">
            {job.role}
            <span className="opacity-50"> · {job.location}</span>
          </div>

          <p className="regulartext mt-4 max-w-[60ch] leading-relaxed opacity-90">
            {job.lead}
          </p>

          {/* One column, not two. A single vertical list has one reading order;
              two columns force the eye to choose. */}
          <ul className="mt-4 flex flex-col gap-1.5">
            {job.highlights.map((h) => (
              <li key={h} className="regulartext flex items-baseline gap-3 text-sm opacity-75">
                <span className={`h-px w-4 shrink-0 opacity-60 ${actBg}`} />
                {h}
              </li>
            ))}
          </ul>

          <div className="smalltext mt-4 opacity-50">{job.stack.join(" · ")}</div>

        </article>
      </FadeScroll>
    </SlideDiv>
  );
}

export default function Experience() {
  const { activeSection, actText, actBg, inacText } = useScrollTheme();
  const isActive = activeSection === "experience";

  return (
    <div
      id="experience"
      className={`relative flex w-full flex-1 flex-col ${inacText} px-4 pb-8 pt-24 md:px-8 md:pt-28 lg:px-16`}
    >
      <SectionHeading title="experience" actText={actText} actBg={actBg} show={isActive} />

      {/* Generous separation is what tells you where one role ends and the next
          begins — more reliable than a divider or an index number. */}
      <div className="no-scrollbar mt-4 flex flex-1 flex-col justify-center gap-10 overflow-y-auto md:gap-16">
        {experienceList.map((job, i) => (
          <Role
            key={job.company}
            job={job}
            show={isActive}
            delay={0.1 + i * 0.12}
            actText={actText}
            actBg={actBg}
          />
        ))}
      </div>
    </div>
  );
}
