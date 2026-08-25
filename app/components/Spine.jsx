"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { sections } from "../utils/ScrollProvider";

/**
 * The pipeline.
 *
 * One wire runs from the first section's dock to the last, drawn progressively
 * as you scroll and heating from Arca's blue to Wyren's orange on the way down.
 * Sections dock onto it at ports.
 *
 * This is the page's structural answer to "the quality degrades as you scroll":
 * a continuous object that ties six screens into one traversal, and that gets
 * *more* intense toward the bottom rather than trailing off.
 *
 * Ports are measured from the real headings ([data-port]) rather than assumed
 * from padding constants, so they stay aligned when type reflows.
 */
export default function Spine() {
  const reduced = useReducedMotion();
  const [ports, setPorts] = useState([]);
  const [originY, setOriginY] = useState(0);
  const hostRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      const nodes = document.querySelectorAll("[data-port]");
      if (!nodes.length || !hostRef.current) return;

      // Ports are measured in absolute document coordinates, but this component
      // renders inside the post-hero wrapper, which starts one viewport down —
      // so the wire has to be positioned relative to its own host, not to the
      // document, or the whole thing sits a screen too low.
      const origin =
        hostRef.current.getBoundingClientRect().top + window.scrollY;
      setOriginY(origin);

      setPorts(
        Array.from(nodes).map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            id: el.dataset.port,
            y: rect.top + window.scrollY + rect.height / 2,
          };
        }),
      );
    };

    measure();
    window.addEventListener("resize", measure);
    // Ports settle after fonts land and the reveals run.
    const t1 = setTimeout(measure, 800);
    const t2 = setTimeout(measure, 2000);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const start = ports.length ? ports[0].y : 0;
  const end = ports.length ? ports[ports.length - 1].y : 0;
  const offsetTop = start - originY;
  const height = Math.max(end - start, 1);

  const { scrollY } = useScroll();
  // The wire fills to wherever the middle of the viewport has reached — the
  // same probe the active-section highlight uses, so they never disagree.
  const rawProgress = useTransform(scrollY, (y) => {
    if (!ports.length || typeof window === "undefined") return 0;
    const probe = y + window.innerHeight * 0.5;
    return Math.min(Math.max((probe - start) / height, 0), 1);
  });
  const progress = useSpring(rawProgress, { stiffness: 220, damping: 40, mass: 0.6 });

  const accentFor = (id) => sections.find((s) => s.id === id)?.accent ?? "#5E8CFF";

  return (
    <div ref={hostRef} className="pointer-events-none absolute inset-x-0 top-0 z-[5]" aria-hidden="true">
      {ports.length > 0 && (
        <div className="mx-auto h-full w-full max-w-5xl px-6 md:px-10">
          <div
            className="relative w-px"
            style={{ marginTop: offsetTop, height }}
          >
            <svg
              className="absolute left-1/2 top-0 -translate-x-1/2 overflow-visible"
              width="2"
              height={height}
              viewBox={`0 0 2 ${height}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="spine-heat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5E8CFF" />
                  <stop offset="22%" stopColor="#6E7BFF" />
                  <stop offset="45%" stopColor="#8B6BF5" />
                  <stop offset="68%" stopColor="#B45BD4" />
                  <stop offset="86%" stopColor="#D9524F" />
                  <stop offset="100%" stopColor="#E4502A" />
                </linearGradient>
              </defs>

              {/* Unlit track. The wire exists before you get there. */}
              <line
                x1="1"
                y1="0"
                x2="1"
                y2={height}
                stroke="rgba(243,239,238,0.10)"
                strokeWidth="1"
              />

              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2={height}
                stroke="url(#spine-heat)"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ pathLength: reduced ? 1 : progress }}
              />
            </svg>

            {ports.map((port) => (
              <Port
                key={port.id}
                offset={port.y - start}
                accent={accentFor(port.id)}
                progress={progress}
                at={height ? (port.y - start) / height : 0}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * A port lights when the wire reaches it. Squares, not circles — a circle on a
 * line reads as a bullet point; a square reads as a connector.
 */
function Port({ offset, accent, progress, at, reduced }) {
  const lit = useTransform(progress, (p) => (reduced || p >= at - 0.001 ? 1 : 0));
  const litSpring = useSpring(lit, { stiffness: 300, damping: 30 });

  return (
    <div
      className="absolute left-1/2 size-[8px] -translate-x-1/2 -translate-y-1/2"
      style={{ top: offset }}
    >
      {/* Unlit socket underneath, lit fill on top of it. */}
      <div className="absolute inset-0 rotate-45 border border-[rgba(243,239,238,0.25)] bg-ground" />
      <motion.div
        className="absolute inset-0 rotate-45"
        style={{ backgroundColor: accent, opacity: litSpring }}
      />
    </div>
  );
}
