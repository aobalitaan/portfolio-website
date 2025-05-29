'use client'

import React, {useState, useEffect} from 'react';

const interpolateColor = (color1, color2, factor) => {
  const hex = (color) => parseInt(color, 16);
  const r1 = hex(color1.slice(1, 3)), g1 = hex(color1.slice(3, 5)), b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3)), g2 = hex(color2.slice(3, 5)), b2 = hex(color2.slice(5, 7));
  const r = Math.round(r1 + factor * (r2 - r1)).toString(16).padStart(2, '0');
  const g = Math.round(g1 + factor * (g2 - g1)).toString(16).padStart(2, '0');
  const b = Math.round(b1 + factor * (b2 - b1)).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

const generateValues = (startY, yOffset, waveStrength, twistStrength, i) => {
  return Array.from({ length: 5 }, (_, step) => {
    const angle = (Math.PI / 2) * step;
    const qY = yOffset - waveStrength + Math.sin(i * 0.2 + angle) * twistStrength;
    return `M0 ${startY} Q 10 ${qY}, 20 ${yOffset} T 40 ${yOffset} T 60 ${yOffset} T 80 ${yOffset} T 100 ${yOffset}`;
  }).join(';');
};

const Wave = ({ startColor = '#4777F0', endColor = '#F54A57' }) => {
  const numLines = 50;
  const duration = 45;
  const waveStrength = 4;
  const twistStrength = 1.5;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <div className="h-full w-full overflow-hidden" />;


  return (
    <div className="h-full overflow-hidden">
      <svg className="wave h-6/5 md:h-6/5 md:w-6/5 w-full" viewBox="0 0 100 25" preserveAspectRatio="none">
        {Array.from({ length: numLines }, (_, i) => {
          const yOffset = 10 + i * 0.125;
          const factor = i / (numLines - 1);
          const strokeColor = interpolateColor(startColor, endColor, factor);
          const startY = yOffset - Math.sin(factor * Math.PI) * 2;

          return (
            <path
              key={i}
              d={`M0 ${startY} Q 10 ${yOffset - waveStrength}, 20 ${yOffset} T 40 ${yOffset} T 60 ${yOffset} T 80 ${yOffset} T 100 ${yOffset}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.025"
              strokeLinecap="round"
            >
              <animate
                attributeName="d"
                values={generateValues(startY, yOffset, waveStrength, twistStrength, i)}
                dur={`${duration}s`}
                repeatCount="indefinite"
                keyTimes="0;0.25;0.5;0.75;1"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
              />
            </path>
          );
        })}
      </svg>
    </div>
  );
};

export default Wave;
