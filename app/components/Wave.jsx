"use client";

import React, { useEffect, useRef } from "react";

const interpolateColor = (color1, color2, factor) => {
  const hex = (color) => parseInt(color, 16);
  const r1 = hex(color1.slice(1, 3)), g1 = hex(color1.slice(3, 5)), b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3)), g2 = hex(color2.slice(3, 5)), b2 = hex(color2.slice(5, 7));
  const r = Math.round(r1 + factor * (r2 - r1)).toString(16).padStart(2, "0");
  const g = Math.round(g1 + factor * (g2 - g1)).toString(16).padStart(2, "0");
  const b = Math.round(b1 + factor * (b2 - b1)).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
};

const generatePathD = (startY, yOffset, waveStrength, twistStrength, i, time) => {
  const angle = time + i * 0.1;
  const qY = yOffset - waveStrength + Math.sin(angle) * twistStrength;
  return `M0 ${startY} Q 10 ${qY}, 20 ${yOffset} T 50 ${yOffset} T 70 ${yOffset} T 90 ${yOffset} T 100 ${yOffset}`;
};

const Wave = ({ startColor = "#1F51FF", endColor = "#FF3131" }) => {
  const numLines = 30;
  const waveStrength = 6;
  const twistStrength = 3;
  const duration = 60;

  const pathRefs = useRef([]);

  useEffect(() => {
    let frameId;
    const startTime = performance.now();

    const animate = (time) => {
      const t = ((time - startTime) / (1000 * (duration/10))) % duration;

      pathRefs.current.forEach((path, i) => {
        const yOffset = 10 + i * 0.1;
        const factor = i / (numLines - 1);
        const startY = yOffset - Math.sin(factor * Math.PI) * 2;
        const d = generatePathD(startY, yOffset, waveStrength, twistStrength, i, t);
        if (path) {
          path.setAttribute("d", d);
        }
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="h-6/4 overflow-hidden">
      <svg
        className="wave scale-x-350 -rotate-75 md:scale-x-250 md:-rotate-60 lg:-rotate-20 lg:scale-x-115 h-screen w-screen origin-center md:h-screen"
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
              ref={(el) => (pathRefs.current[i] = el)}
              d={`M0 ${startY} Q 10 ${yOffset - waveStrength}, 20 ${yOffset} T 40 ${yOffset} T 60 ${yOffset} T 80 ${yOffset} T 100 ${yOffset}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.05"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Wave;
