import React from "react";
import { useScrollTheme } from "../utils/ScrollProvider";
import skillList from "../utils/SkillList";
import SkillIcon from "../components/SkillIcon";
import Section from "../components/Section";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

export default function Skills() {
  const { activeSection, actText, actBg, inacText } = useScrollTheme();
  const isActive = activeSection === "skills";

  return (
    <Section
      id="skills"
      title="skills"
      show={isActive}
      actText={actText}
      actBg={actBg}
      inacText={inacText}
    >
      <div className="flex flex-col gap-8 md:gap-10">
        {skillList.map((group, i) => (
          <SlideDiv
            key={group.group}
            show={isActive}
            animateOnce
            type="left"
            delay={0.1 + i * 0.1}
            className="overflow-visible"
          >
            <FadeScroll show={isActive}>
              {/* Same 150px meta rail as Experience and Education. Inside the
                  max-w-5xl column the grid reads dense instead of stranded
                  across the full 1440px. */}
              <div className="grid gap-3 md:grid-cols-[150px_1fr] md:gap-8">
                <div className="smalltext uppercase tracking-[0.15em] opacity-50 md:pt-1.5">
                  {group.group}
                </div>
                <div className="grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-6">
                  {group.items.map((item) => <SkillIcon key={item} label={item} />)}
                </div>
              </div>
            </FadeScroll>
          </SlideDiv>
        ))}
      </div>
    </Section>
  );
}
