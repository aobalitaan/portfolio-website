"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const interpolateColor = (color1, color2, factor) => {
  const hex = (c) => parseInt(c, 16);
  const r1 = hex(color1.slice(1, 3)), g1 = hex(color1.slice(3, 5)), b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3)), g2 = hex(color2.slice(3, 5)), b2 = hex(color2.slice(5, 7));
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  return `rgb(${r},${g},${b})`;
};

// Matches the original responsive SVG utilities: the field lies almost flat on
// desktop and rears up steeply on narrow screens.
const framing = (w) => {
  if (w < 768) return { angle: -75, scaleX: 3.5 };
  if (w < 1024) return { angle: -60, scaleX: 2.5 };
  return { angle: -20, scaleX: 1.15 };
};

/**
 * The hero's field, drawn on canvas.
 *
 * This was an SVG for a long time, and it was the single most expensive thing
 * on the page: 30-odd stroked paths inside a screen-sized vector scaled 350%
 * and masked. Animating it pinned the hero at ~21-27fps, and it made no
 * difference what was animated — rewriting path data, transform, even opacity
 * alone all measured the same, because any change forces the whole vector to
 * re-rasterise.
 *
 * A canvas is already a bitmap, so there's no rasterisation step to redo. The
 * same 36 curves, the same twist, now cost nothing measurable — and the loop
 * stops outright once the hero has faded, so nothing follows you down the page.
 *
 * Geometry is kept in the old viewBox space (100 x 25) and mapped onto the
 * canvas, so the composition is unchanged from the SVG version. The transform
 * order mirrors CSS individual transform properties — translate, then rotate,
 * then scale.
 */
const NUM_LINES = 36;
const WAVE_STRENGTH = 6;
const TWIST = 3;
const VB_W = 100;
const VB_H = 25;
const SMOOTH_XS = [50, 70, 90, 100];

const Wave = ({ startColor = "#2B5BFF", endColor = "#E4502A", active = true }) => {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = null;
    let w = 0, h = 0, dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // Capped at 2: beyond that the fill cost rises with no visible gain for
      // hairline strokes.
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const draw = (t) => {
      if (!w || !h) return;
      const { angle, scaleX } = framing(w);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.translate(w / 2, h / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.scale(scaleX, 1);
      ctx.translate(-w / 2, -h / 2);
      ctx.scale(w / VB_W, h / VB_H);

      // Hairlines: the transform scales lineWidth too, so it's specified in
      // viewBox units exactly as the SVG stroke-width was.
      ctx.lineWidth = 0.045;
      ctx.lineCap = "round";

      for (let i = 0; i < NUM_LINES; i++) {
        const factor = i / (NUM_LINES - 1);
        const yOffset = 10 + i * 0.15;
        const startY = yOffset - Math.sin(factor * Math.PI) * 2;
        const qY = yOffset - WAVE_STRENGTH + Math.sin(t + i * 0.1) * TWIST;

        // Reproduces the SVG path exactly:
        //   M0 startY  Q 10 qY, 20 yOffset  T 50 …  T 70 …  T 90 …  T 100 …
        // An SVG `T` is a quadratic whose control point is the reflection of
        // the previous control point about the current point — that reflection
        // is what produces the S-curve. Canvas has no `T`, so it's computed
        // here; drawing a straight line to the end instead (as this did at
        // first) collapses the whole field into a flat diagonal band.
        ctx.beginPath();
        ctx.moveTo(0, startY);
        let cx = 10, cy = qY, px = 20, py = yOffset;
        ctx.quadraticCurveTo(cx, cy, px, py);
        for (const nx of SMOOTH_XS) {
          const rcx = 2 * px - cx;
          const rcy = 2 * py - cy;
          ctx.quadraticCurveTo(rcx, rcy, nx, yOffset);
          cx = rcx; cy = rcy; px = nx; py = yOffset;
        }
        ctx.strokeStyle = interpolateColor(startColor, endColor, factor);
        ctx.stroke();
      }
    };

    resize();

    // Once the hero has faded out there is nothing to draw. Stopping the loop
    // is what keeps the projects section free of any hero cost at all.
    if (!active) return;

    if (reduced) {
      draw(0);
      window.addEventListener("resize", () => { resize(); draw(0); });
      return () => cancelAnimationFrame(raf);
    }

    const start = performance.now();
    const MIN_DELTA = 1000 / 30; // The drift is slow; 30fps is indistinguishable.
    let lastDraw = 0;

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (now - lastDraw < MIN_DELTA) return;
      lastDraw = now;
      draw(((now - start) / 6000) % (Math.PI * 2));
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, startColor, endColor, active]);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
};

export default Wave;
