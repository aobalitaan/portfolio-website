"use client";

import React from "react";

const interpolateColor = (color1, color2, factor) => {
  const hex = (color) => parseInt(color, 16);
  const r1 = hex(color1.slice(1, 3)), g1 = hex(color1.slice(3, 5)), b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3)), g2 = hex(color2.slice(3, 5)), b2 = hex(color2.slice(5, 7));
  const r = Math.round(r1 + factor * (r2 - r1)).toString(16).padStart(2, "0");
  const g = Math.round(g1 + factor * (g2 - g1)).toString(16).padStart(2, "0");
  const b = Math.round(b1 + factor * (b2 - b1)).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
};

/**
 * The hero's field.
 *
 * This used to rewrite the `d` attribute of every path on every animation
 * frame. That forces the browser to re-rasterise the entire SVG — which is
 * scaled 350% and masked — 30-60 times a second, and it was the single largest
 * cost on the page: the hero sat at ~27fps because of it.
 *
 * The paths are drawn once and never touched again, and there is no idle
 * animation loop at all. Measured on the hero: any continuous animation of this
 * SVG — transform, opacity, anything — pins the page at ~21fps, because a
 * screen-sized, 350%-scaled, masked vector can't be promoted to a layer the
 * compositor can cheaply transform, so it repaints every frame. Drawn once and
 * left alone it's free: 60fps, zero long frames.
 *
 * The field still moves — Hero applies a scroll-linked parallax to it — so
 * there's motion exactly when the eye is already tracking movement, and nothing
 * burning the CPU when the page is sitting still.
 */
const Wave = ({ startColor = "#2B5BFF", endColor = "#E4502A" }) => {
  const numLines = 36;
  const waveStrength = 6;

  return (
    <div className="h-6/4 overflow-hidden">
      <div className="h-full w-full">
        <svg
          className="scale-x-350 -rotate-75 md:scale-x-250 md:-rotate-60 lg:-rotate-20 lg:scale-x-115 h-screen w-screen origin-center md:h-screen"
          viewBox="0 0 100 25"
          preserveAspectRatio="none"
        >
          {Array.from({ length: numLines }, (_, i) => {
            const yOffset = 10 + i * 0.15;
            const factor = i / (numLines - 1);
            const strokeColor = interpolateColor(startColor, endColor, factor);
            const startY = yOffset - Math.sin(factor * Math.PI) * 2;

            return (
              <path
                key={i}
                d={`M0 ${startY} Q 10 ${yOffset - waveStrength}, 20 ${yOffset} T 40 ${yOffset} T 60 ${yOffset} T 80 ${yOffset} T 100 ${yOffset}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth="0.045"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default Wave;
