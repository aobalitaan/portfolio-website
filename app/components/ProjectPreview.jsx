"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { useReducedMotion } from "framer-motion";

/**
 * The product screenshot is the still; the clip plays over it.
 *
 * The image stays mounted underneath rather than being swapped out, so there's
 * no flash of empty frame while the video decodes — the video fades in on top
 * once it's actually playing, and the still is what everyone sees by default.
 *
 * `preload="none"` matters: two clips that autoloaded would outweigh the rest
 * of the page, and most visitors will never start either one. The clip is
 * fetched on intent and not before.
 *
 * Two input models, because hover is not one:
 *   - pointer devices  → hovering the card plays it
 *   - touch devices    → an explicit play/pause button
 *
 * The link overlay and the play button are siblings, not nested. A <button>
 * inside an <a> is invalid, and it also makes "tap to play" and "tap to open"
 * fight over the same gesture. Here the button toggles playback and never
 * navigates; anywhere else on the still opens the project.
 */
export default function ProjectPreview({ src, poster, alt, href, priority }) {
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [canHover, setCanHover] = useState(true);

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

  const toggle = (e) => {
    // Never let the control trigger the card's link.
    e.preventDefault();
    e.stopPropagation();
    playing ? stop() : play();
  };

  return (
    <div
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

      {/* Click-through to the project. Sits above the media, below the
          play control. */}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={alt}
        className="absolute inset-0 z-10"
      />

      {canHover && !reduced && (
        <div
          className={`pointer-events-none absolute bottom-4 left-4 z-20 rounded-full border border-[rgba(243,239,238,0.25)] bg-ground/70 px-3 py-1.5 backdrop-blur-sm transition-opacity duration-500 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="mono text-ink">hover to play</span>
        </div>
      )}

      {!canHover && !reduced && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause preview" : "Play preview"}
          className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-[rgba(243,239,238,0.3)] bg-ground/80 py-2 pl-3 pr-4 backdrop-blur-sm active:scale-95 transition-transform"
        >
          {playing ? (
            <Pause size={14} className="text-ink" fill="currentColor" />
          ) : (
            <Play size={14} className="text-ink" fill="currentColor" />
          )}
          <span className="mono text-ink">{playing ? "pause" : "play"}</span>
        </button>
      )}
    </div>
  );
}
