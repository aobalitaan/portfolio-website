"use client";

import { useState, useEffect } from "react";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

import { ScrollTracker } from "./utils/ScrollTracker";

export default function Home() {
  const { activeSection, bgColor, inacText } = ScrollTracker();

  return (
    <div
      style={{ background: `var(--color-${bgColor})` }}
      className="duration-250 w-screen transition-colors ease-in"
    >
      <div className="size-full z-48 sticky top-0 h-screen overflow-hidden">
        <Hero />
      </div>
      <Projects />
    </div>
  );
}
