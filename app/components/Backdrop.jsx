"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useScrollTheme } from "../utils/ScrollProvider";

/**
 * The veil the work rises through, and the page's ground.
 *
 * The hero is sticky, so it stays pinned while the sections below scroll over
 * the top of it. This layer sits between them: as you pull the first section
 * up, it ramps in blur and then ground opacity, so the hero softens and
 * dissolves behind the work rather than being abruptly covered.
 *
 * Performance notes, because this component is capable of wrecking the page:
 *
 * - The hero's defocus used to be a `backdrop-filter` on a full-viewport fixed
 *   element here. That re-blurs the viewport on every frame of the scroll and
 *   was the entire remaining scroll cost (51fps/14 long frames, against
 *   60fps/0 with it off). The blur now lives on the hero's own layer instead,
 *   where a stepped radius can be cached — see Hero.
 * - The grain used `mix-blend-overlay`, which forces an extra full-screen
 *   compositing pass forever. Plain low opacity looks near-identical and costs
 *   nothing.
 * - The bloom cross-fades between two static layers rather than transitioning
 *   the `background` property, which would repaint on every frame of the
 *   transition.
 */
export default function Backdrop() {
  const { accent } = useScrollTheme();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const vh = () => (typeof window === "undefined" ? 800 : window.innerHeight);

  const groundOpacity = useTransform(scrollY, (y) =>
    Math.min(Math.max((y - vh() * 0.18) / (vh() * 0.62), 0), 1),
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-ground"
        style={{ opacity: reduced ? 1 : groundOpacity }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ opacity: reduced ? 1 : groundOpacity }}
      >
        {/* Bloom. Large, low-opacity, off-centre — depth, not a spotlight.
            Painted once per accent change; no property transition. */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 80% at 78% 12%, ${accent}22 0%, transparent 60%), radial-gradient(90% 60% at 12% 88%, ${accent}18 0%, transparent 62%)`,
          }}
        />

        {/* Grain. Dark grounds band badly on wide-gamut displays. */}
        <div
          className="absolute inset-0 opacity-[0.05]"
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
