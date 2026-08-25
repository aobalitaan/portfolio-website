"use client";

import { useScroll, useTransform, useMotionTemplate, motion, useReducedMotion } from "framer-motion";
import { useScrollTheme } from "../utils/ScrollProvider";

/**
 * The veil the work rises through.
 *
 * The hero is sticky, so it stays pinned while the sections below scroll over
 * the top of it. This layer sits between them: as you pull the first section
 * up, it ramps in blur and then ground opacity, so the hero softens and
 * dissolves behind the work rather than being abruptly covered by an opaque
 * block. By the time the first section is seated the hero is gone and this is
 * simply the page's ground.
 *
 * Blur leads, opacity follows — a defocus that then fades reads as depth,
 * whereas fading and blurring on the same curve just reads as a dip to black.
 *
 * There is only one ground below the hero. The old backdrop repainted the
 * whole viewport per section (black → blue → black → black → blue → white),
 * which is what made every boundary a jump cut; the only thing that moves now
 * is a soft bloom in the current accent.
 */
export default function Backdrop() {
  const { accent } = useScrollTheme();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const vh = () => (typeof window === "undefined" ? 800 : window.innerHeight);

  const blurPx = useTransform(scrollY, (y) =>
    Math.min(Math.max((y / (vh() * 0.55)) * 16, 0), 16),
  );
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  const groundOpacity = useTransform(scrollY, (y) =>
    Math.min(Math.max((y - vh() * 0.18) / (vh() * 0.62), 0), 1),
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Defocuses whatever is behind — which, while the hero is pinned, is the
          hero and its wave. */}
      {!reduced && (
        <motion.div
          className="absolute inset-0"
          style={{ backdropFilter: filter, WebkitBackdropFilter: filter }}
        />
      )}

      <motion.div
        className="absolute inset-0 bg-ground"
        style={{ opacity: reduced ? 1 : groundOpacity }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ opacity: reduced ? 1 : groundOpacity }}
      >
        {/* Bloom. Large, low-opacity, off-centre — it should register as depth,
            not as a spotlight. */}
        <div
          className="absolute inset-0 transition-[background] duration-[1200ms] ease-out"
          style={{
            background: `radial-gradient(120% 80% at 78% 12%, ${accent}22 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 transition-[background] duration-[1200ms] ease-out"
          style={{
            background: `radial-gradient(90% 60% at 12% 88%, ${accent}18 0%, transparent 62%)`,
          }}
        />

        {/* Grain. Dark grounds band badly on wide-gamut displays; a little
            noise is what keeps this from looking like flat #000 fill. */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />
      </motion.div>
    </div>
  );
}
