import React from "react";
import SlideDiv from "./animation/SlideDiv";
import FadeScroll from "./animation/FadeScroll";

// The rule / title / rule treatment first used by the Projects section.
export default function SectionHeading({ title, actText, actBg, show }) {
  return (
    <FadeScroll show={show}>
      <SlideDiv type="top" show={show} animateOnce className="p-4">
        {/* Rules flex to fill whatever the title leaves, so they stay symmetric
            at every width instead of overflowing on narrow screens. */}
        <div className="flex h-fit w-full items-center gap-3 md:gap-4">
          <div className={`h-1.5 min-w-2 flex-1 md:h-2 lg:max-w-40 ${actBg}`} />
          <div className={`heading2 whitespace-nowrap ${actText} transition-colors duration-250 ease-in`}>
            {title}
          </div>
          <div className={`h-1.5 min-w-2 flex-1 md:h-2 lg:max-w-40 ${actBg}`} />
        </div>
      </SlideDiv>
    </FadeScroll>
  );
}
