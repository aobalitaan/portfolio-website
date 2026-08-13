import React from "react";
import { useScrollTheme } from "../utils/ScrollProvider";
import skillList from "../utils/SkillList";
import SkillIcon from "../components/SkillIcon";
import SectionHeading from "../components/SectionHeading";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

export default function Skills() {
  const { activeSection, actText, actBg, inacText } = useScrollTheme();
  const isActive = activeSection === "skills";

  return (
    <div
      id="skills"
      className={`relative flex w-full flex-1 flex-col ${inacText} px-4 pb-8 pt-24 md:px-8 md:pt-28 lg:px-16`}
    >
      <SectionHeading title="skills" actText={actText} actBg={actBg} show={isActive} />

      <div className="no-scrollbar mt-4 flex flex-1 flex-col justify-center gap-7 overflow-y-auto md:gap-10">
        {skillList.map((group, i) => (
          <SlideDiv
            key={group.group}
            show={isActive}
            animateOnce
            type="bottom"
            delay={0.1 + i * 0.12}
            className="overflow-visible"
          >
            <FadeScroll show={isActive}>
              <div className="flex items-baseline gap-4">
                <div className={`smalltext uppercase tracking-[0.2em] ${actText}`}>
                  {group.group}
                </div>
                <div className={`h-px flex-1 opacity-15 ${actBg}`} />
              </div>

              <div className="mt-4 grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-6 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
                {group.items.map((item) => <SkillIcon key={item} label={item} />)}
              </div>
            </FadeScroll>
          </SlideDiv>
        ))}
      </div>
    </div>
  );
}
