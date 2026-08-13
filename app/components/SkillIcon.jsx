import React from "react";
import { Database, Webhook, MessageSquare, SquareTerminal } from "lucide-react";
import {
  siPython, siTypescript, siJavascript, siOpenjdk, siC, siDart, siR,
  siReact, siNextdotjs, siFlutter, siNodedotjs,
  siSupabase, siPostgresql, siMongodb, siMariadb, siFirebase,
  siClaudecode, siGit, siVercel, siRender, siLangchain,
} from "simple-icons";

/**
 * Brand marks are rendered in `currentColor`, not their official brand colours.
 * A wall of 25 competing brand hues fights the section palette and wrecks
 * contrast on the blue background; monochrome keeps every mark legible on any
 * section and reads as a deliberate logo wall rather than a sticker sheet.
 *
 * The four entries with no brand mark available — SQL and REST APIs aren't
 * products, and simple-icons dropped the OpenAI marks for trademark reasons —
 * use a semantic lucide glyph instead. A truncated wordmark ("SQ", "CH") reads
 * as a rendering failure; a database or webhook icon reads as a choice.
 */
const ICONS = {
  "Python": siPython,
  "TypeScript": siTypescript,
  "JavaScript": siJavascript,
  "Java": siOpenjdk,
  "C": siC,
  "Dart": siDart,
  "R": siR,
  "React": siReact,
  "NextJS": siNextdotjs,
  "Flutter": siFlutter,
  "Node.js": siNodedotjs,
  "Supabase": siSupabase,
  "PostgreSQL": siPostgresql,
  "MongoDB": siMongodb,
  "MariaDB": siMariadb,
  "Firebase": siFirebase,
  "Claude Code": siClaudecode,
  "Git": siGit,
  "Vercel": siVercel,
  "Render": siRender,
  "LangChain": siLangchain,
};

// Not brands — concepts. Drawn from lucide, already a dependency.
const GLYPHS = {
  "SQL": Database,
  "REST APIs": Webhook,
  "ChatGPT": MessageSquare,
  "Codex": SquareTerminal,
};

export default function SkillIcon({ label }) {
  const icon = ICONS[label];
  const Glyph = GLYPHS[label];

  return (
    <div className="group flex flex-col items-center gap-2 text-center">
      <div className="flex h-8 w-8 items-center justify-center transition-transform duration-250 ease-out group-hover:-translate-y-0.5 md:h-9 md:w-9">
        {icon ? (
          <svg
            role="img"
            aria-label={label}
            viewBox="0 0 24 24"
            className="h-full w-full"
            fill="currentColor"
          >
            <path d={icon.path} />
          </svg>
        ) : Glyph ? (
          <Glyph aria-label={label} strokeWidth={1.5} className="h-[85%] w-[85%]" />
        ) : null}
      </div>
      <span className="smalltext leading-tight">{label}</span>
    </div>
  );
}
