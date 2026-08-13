import React from "react";

/**
 * Tags inherit `currentColor` rather than picking from a palette. The old
 * hash-to-pastel scheme produced arbitrary pairings (yellow-on-yellow, pale
 * chips on the blue sections) that failed contrast and read as noise. Deriving
 * from the surrounding text colour means a tag is always legible against
 * whatever section it sits in, and the accent hue stays reserved for the
 * things that should actually draw the eye.
 */
export default function Tag({ label, className = "" }) {
  return (
    <span
      className={`smalltext inline-flex items-center whitespace-nowrap border border-current/30 px-2.5 py-1 tracking-wide ${className}`}
    >
      {label}
    </span>
  );
}
