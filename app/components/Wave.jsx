import React from 'react';

// Function to interpolate between two colors
const interpolateColor = (color1, color2, factor) => {
  const hex = (color) => parseInt(color, 16);
  const r1 = hex(color1.slice(1, 3)), g1 = hex(color1.slice(3, 5)), b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3)), g2 = hex(color2.slice(3, 5)), b2 = hex(color2.slice(5, 7));
  const r = Math.round(r1 + factor * (r2 - r1)).toString(16).padStart(2, '0');
  const g = Math.round(g1 + factor * (g2 - g1)).toString(16).padStart(2, '0');
  const b = Math.round(b1 + factor * (b2 - b1)).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

const Wave = () => {
  // Configurable parameters
  const numLines = 30;
  const duration = 15; // Animation duration in seconds
  const waveStrength = 1.15; // Strength of the wave (amplitude)
  const twistStrength = 3; // Strength of the twisting effect

  const paths = [];

  for (let i = 0; i < numLines; i++) {
    const yOffset = 10 + (i * 0.35); // Vertical offset for each line
    const factor = i / (numLines - 1); // Gradient factor from 0 to 1
    const strokeColor = interpolateColor('#4777F0', '#FF0000', factor); // Interpolate color

    paths.push(
      <path
        key={i}
        d={`M0 ${yOffset} Q 10 ${yOffset - waveStrength + Math.random() * 10 * twistStrength}, 20 ${yOffset} T 40 ${yOffset} T 60 ${yOffset} T 80 ${yOffset} T 100 ${yOffset}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.015"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values={`
            M0 ${yOffset} Q 10 ${yOffset - waveStrength + Math.sin(i * 0.2) * twistStrength}, 20 ${yOffset} T 40 ${yOffset} T 60 ${yOffset} T 80 ${yOffset} T 100 ${yOffset};
            M0 ${yOffset} Q 10 ${yOffset + waveStrength + Math.sin(i * 0.2 + Math.PI) * twistStrength}, 20 ${yOffset} T 40 ${yOffset} T 60 ${yOffset} T 80 ${yOffset} T 100 ${yOffset};
            M0 ${yOffset} Q 10 ${yOffset - waveStrength + Math.sin(i * 0.2) * twistStrength}, 20 ${yOffset} T 40 ${yOffset} T 60 ${yOffset} T 80 ${yOffset} T 100 ${yOffset}`}
          dur={`${duration}s`}
          repeatCount="indefinite"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
        />
      </path>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-transparent">
      <svg className="wave h-screen w-screen" viewBox="0 0 100 20" preserveAspectRatio="none">
        {paths}
      </svg>
    </div>
  );
};

export default Wave;