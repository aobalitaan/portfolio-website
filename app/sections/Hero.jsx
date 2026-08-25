"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useScrollTheme } from "../utils/ScrollProvider";
import SlideDiv from "../components/animation/SlideDiv";
import Wave from "../components/Wave";

/**
 * The hero is the thesis, and the wave is the thesis statement.
 *
 * It used to run behind every section at 50% opacity, where it read as a smudge
 * under the content rather than as an image. Scoped to the hero it can be shown
 * at full strength — and its gradient runs from the blue the wire starts at to
 * the orange the wire ends at, so the hero foreshadows the whole traversal
 * before handing off to the spine.
 *
 * It fades out as the hero leaves rather than smearing behind the work below.
 */
export default function Hero() {
  const { introDone } = useScrollTheme();
  const show = introDone;

  const ref = useRef(null);

  // Driven by window scroll, NOT by useScroll({ target: ref }).
  //
  // The hero is sticky, and a sticky element does not move relative to the
  // viewport while it's pinned — so a target-based scrollYProgress sits at 0
  // for the entire pin and every effect hung off it silently does nothing.
  // That's measured against the viewport height directly instead.
  const { scrollY } = useScroll();
  const vh = () => (typeof window === "undefined" ? 800 : window.innerHeight);

  const waveY = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / vh(), 0), 1);
    return `${p * 18}%`;
  });

  // The hero clears out well before the first section is seated, so scrolling
  // into the work never overlaps a live hero. Past this point the canvas loop
  // is switched off entirely rather than merely hidden.
  const [waveActive, setWaveActive] = useState(true);
  useEffect(() => {
    let frame = null;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        setWaveActive(window.scrollY < window.innerHeight * 0.62);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // The defocus, applied to the hero's own layer rather than as a
  // backdrop-filter on a fixed overlay above it. A backdrop-filter re-blurs the
  // whole viewport on every frame of the scroll and cost ~9fps plus 14 long
  // frames; this blurs one static subtree instead, and the radius is quantised
  // to 3px steps so the browser recomputes it a handful of times across the
  // transition rather than continuously. The steps aren't visible at this speed.
  const blurPx = useTransform(scrollY, (y) => {
    const raw = Math.min(Math.max(y / (vh() * 0.38), 0), 1) * 12;
    return Math.round(raw / 3) * 3;
  });
  const heroFilter = useMotionTemplate`blur(${blurPx}px)`;

  const heroOpacity = useTransform(scrollY, (y) =>
    1 - Math.min(Math.max((y - vh() * 0.06) / (vh() * 0.5), 0), 1),
  );

  return (
    <motion.div
      ref={ref}
      id="home"
      className="relative flex h-full w-full flex-col"
      style={{ filter: heroFilter, opacity: heroOpacity }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{ y: waveY }}
        aria-hidden="true"
      >
        <div className="h-full w-full [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.35)_0%,rgba(0,0,0,1)_45%,rgba(0,0,0,0.55)_100%)]">
          <Wave active={waveActive} />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 pb-14 pt-28 md:px-10 md:pb-16 md:pt-32">

        <div className="flex justify-end">
          <SlideDiv show={show} type="right" delay={0.3} className="overflow-visible">
            <p className="body-lg ink-dim max-w-[32ch] text-right">
              I build AI-powered products that blend real engineering with aesthetics.
            </p>
          </SlideDiv>
        </div>

        <div className="flex-1" />

        {/* Two deliberate lines rather than an incidental wrap — at display
            scale the break lands differently at every viewport width unless
            it's set. */}
        <SlideDiv show={show} type="left" delay={0.1} className="overflow-visible">
          <h1 className="display-xl">
            AXEL
            <br />
            BALITAAN
          </h1>
        </SlideDiv>
        <SlideDiv show={show} type="left" delay={0.2} className="overflow-visible">
          <p className="mono ink-dim mt-6">Software Engineer · Philippines</p>
        </SlideDiv>

        {/* Wire origin. Sits at x = 0 of the content column, which is exactly
            where the spine runs. */}
        <motion.div
          className="mt-14 flex flex-col items-start gap-3 md:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-[rgba(243,239,238,0.3)] to-[#5E8CFF]" />
        </motion.div>
      </div>

      {/* Rotated rights rail — kept from the original; it's the one piece of
          structural mischief on the page and it belongs to the hero.
          w-max matters: an absolutely-positioned box pinned to the right edge
          shrinks to the space beside it, which breaks the label into a column
          of single characters before the rotation ever applies. */}
      <div className="pointer-events-none absolute right-0 top-1/2 z-10 hidden w-max -translate-y-1/2 md:block">
        <SlideDiv show={show} type="bottom" delay={0.25} className="overflow-visible">
          <div className="flex w-max origin-center rotate-90 items-center gap-4 whitespace-nowrap">
            <div className="h-px w-16 bg-[#5E8CFF] md:w-24" />
            <span className="mono ink-faint">© 2026 All Rights Reserved</span>
          </div>
        </SlideDiv>
      </div>
    </motion.div>
  );
}
