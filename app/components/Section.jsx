import React from "react";
import Reveal from "./animation/Reveal";

/**
 * Every section below the hero docks onto the wire here.
 *
 * The heading forms a T-junction with the spine: a short accent stub runs from
 * the wire out to the title, then a hairline continues to the right gutter. The
 * rule isn't decoration — it's the connector geometry that says this block is
 * attached to the pipeline.
 *
 * Two things the old shell got wrong, both fixed here:
 *
 * 1. It centred content in a flex-1 box while pinning the heading to the top,
 *    so most sections were heading → ~150px of dead air → content → ~150px of
 *    dead air. Rhythm now comes from padding, and sections size to their
 *    content instead of being stretched to a viewport.
 * 2. Its top padding (96px) was smaller than the navbar is tall (80px) plus its
 *    scrim, so headings passed straight through the nav mid-scroll.
 */
export default function Section({ id, title, children, contentClass = "" }) {
  return (
    <div id={id} className="w-full py-28 md:py-40">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal type="none">
          <div data-port={id} className="flex items-center gap-4 md:gap-6">
            {/* The stub out of the wire. */}
            <div className="h-px w-6 shrink-0 bg-[var(--accent)] md:w-10" />
            <h2 className="display-md shrink-0 accent">{title}</h2>
            <div className="h-px flex-1 bg-[var(--line)]" />
          </div>
        </Reveal>

        <div className={`pl-10 md:pl-16 ${contentClass}`}>{children}</div>
      </div>
    </div>
  );
}
