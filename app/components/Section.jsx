import React from "react";
import SlideDiv from "./animation/SlideDiv";
import FadeScroll from "./animation/FadeScroll";

/**
 * Every section below the hero shares this shell.
 *
 * The old layout put content in a full-bleed container starting at the left
 * gutter, so at 1440px the right half of every screen was empty — the content
 * ran to ~950px and stopped. A centred, max-width column gives symmetric
 * margins and a consistent measure, which is what makes the sections feel like
 * one designed page rather than a document dumped left.
 *
 * The heading is left-aligned to the same edge as the content and its rule runs
 * to the right gutter, so there is a single vertical anchor line down the page.
 */
export default function Section({ id, title, show, actText, actBg, inacText, children }) {
  return (
    <div
      id={id}
      className={`relative flex w-full flex-1 flex-col ${inacText} px-6 pb-12 pt-24 md:px-10 md:pt-28`}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <FadeScroll show={show}>
          <SlideDiv type="top" show={show} animateOnce>
            <div className="flex items-center gap-4">
              <h2 className={`heading2 whitespace-nowrap ${actText}`}>{title}</h2>
              <div className={`h-px flex-1 opacity-25 ${actBg}`} />
            </div>
          </SlideDiv>
        </FadeScroll>

        <div className="no-scrollbar flex flex-1 flex-col justify-center overflow-y-auto py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
