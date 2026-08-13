import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollTheme } from "../utils/ScrollProvider";
import experienceList from "../utils/ExperienceList";
import Section from "../components/Section";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

// Date rail left, content right. The date is the thing you scan a work history
// by, so it gets its own column and the content keeps one consistent left edge.
function Role({ job, show, delay, actText, actBg }) {
  return (
    <SlideDiv show={show} animateOnce type="left" delay={delay} className="overflow-visible">
      <FadeScroll show={show}>
        <article className="grid gap-1 md:grid-cols-[150px_1fr] md:gap-8">
          <div className="smalltext opacity-50 md:pt-1.5">{job.period}</div>

          <div>
            {job.link ? (
              <a
                href={job.link}
                target="_blank"
                rel="noreferrer"
                className={`heading3 group inline-flex items-center gap-1 ${actText} transition-opacity hover:opacity-70`}
              >
                {job.company}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <div className={`heading3 ${actText}`}>{job.company}</div>
            )}

            <div className="regulartext">
              {job.role}
              <span className="opacity-50"> · {job.location}</span>
            </div>

            <p className="regulartext mt-3 leading-relaxed opacity-75">{job.lead}</p>

            <ul className="mt-3 flex flex-col gap-1">
              {job.highlights.map((h) => (
                <li key={h} className="regulartext flex items-baseline gap-3 text-sm opacity-75">
                  <span className={`h-px w-3 shrink-0 opacity-50 ${actBg}`} />
                  {h}
                </li>
              ))}
            </ul>

            <div className="smalltext mt-3 opacity-50">{job.stack.join(" · ")}</div>
          </div>
        </article>
      </FadeScroll>
    </SlideDiv>
  );
}

export default function Experience() {
  const { activeSection, actText, actBg, inacText } = useScrollTheme();
  const isActive = activeSection === "experience";

  return (
    <Section
      id="experience"
      title="experience"
      show={isActive}
      actText={actText}
      actBg={actBg}
      inacText={inacText}
    >
      <div className="flex flex-col gap-10 md:gap-12">
        {experienceList.map((job, i) => (
          <Role
            key={job.company}
            job={job}
            show={isActive}
            delay={0.1 + i * 0.1}
            actText={actText}
            actBg={actBg}
          />
        ))}
      </div>
    </Section>
  );
}
