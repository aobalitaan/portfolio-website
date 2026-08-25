"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const OFFSET = {
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  up: { x: 0, y: 32 },
  none: { x: 0, y: 0 },
};

/**
 * Reveal on enter, then stay revealed. Forever.
 *
 * This replaces the old SlideDiv + FadeScroll pair, which drove content to
 * `opacity: 0, scale: 0.8` whenever its section wasn't the active one. Because
 * "active" flipped early, a section erased its own content while it was still
 * filling most of the screen — you'd scroll and watch things evaporate ahead of
 * you. Reveal is tied to the element's own visibility instead of a global
 * section flag, so that can't happen.
 *
 * The travel is 32px, not the old 100px: at 100px a whole column of staggered
 * items reads as a slot machine rather than a settle.
 */
export default function Reveal({
  children,
  type = "up",
  delay = 0,
  className = "",
  as: Tag = motion.div,
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-8% 0px -12% 0px",
  });

  const from = reduced ? OFFSET.none : OFFSET[type] ?? OFFSET.up;

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...from }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{
        duration: reduced ? 0 : 0.7,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
}
