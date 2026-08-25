"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";

/**
 * The still is the poster; hover plays a walkthrough of the live product.
 *
 * The image stays mounted underneath rather than being swapped out, so there's
 * no flash of empty frame while the video decodes its first frame — the video
 * simply fades in on top once it's actually playing.
 *
 * `preload="none"` matters: two 1MB clips that autoload would cost more than
 * the rest of the page combined, and most visitors will never hover either one.
 * The clip is fetched on intent (pointer enters the card) and not before.
 *
 * Hover is a pointer idiom, so touch devices get the poster plus an in-view
 * autoplay instead — there's no hover to wait for and no controls to hunt for.
 */
export default function ProjectPreview({ src, poster, alt, priority }) {
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [canHover, setCanHover] = useState(true);

  const { ref: inViewRef, inView } = useInView({ threshold: 0.55 });

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const play = useCallback(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    el.play().then(() => setPlaying(true)).catch(() => {});
  }, [reduced]);

  const stop = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
  }, []);

  // Touch devices have no hover to key off, so the clip runs while the card
  // holds the screen and stops when it leaves.
  useEffect(() => {
    if (canHover || reduced) return;
    if (inView) play();
    else stop();
  }, [canHover, inView, reduced, play, stop]);

  return (
    <div
      ref={inViewRef}
      className="absolute inset-0"
      onPointerEnter={canHover ? play : undefined}
      onPointerLeave={canHover ? stop : undefined}
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 90vw, 900px"
        priority={priority}
        className="object-cover object-top"
      />

      {/* Only where a hover exists. On touch the clip plays itself once the
          card holds the screen, so the badge would be both wrong and noise. */}
      {canHover && !reduced && (
        <div
          className={`pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-[rgba(243,239,238,0.25)] bg-ground/70 px-3 py-1.5 backdrop-blur-sm transition-opacity duration-500 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="mono text-ink">hover to play</span>
        </div>
      )}

      {!reduced && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
