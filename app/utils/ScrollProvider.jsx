"use client";

import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useScroll } from "framer-motion";

/**
 * Scroll ranges are expressed in viewport heights (100 = one full screen).
 * Class names are written out in full so Tailwind's static extractor can see
 * them — never build these by interpolation.
 */
export const sections = [
  {
    id: "home",
    start: 0,
    end: 100,
    bg: "bg-brand-black",
    bgSoft: "bg-brand-black/75",
    inacText: "text-brand-white",
    actText: "text-brand-primary",
    actBg: "bg-brand-primary",
    actBorder: "border-brand-primary",
    blur: "",
  },
  {
    id: "projects",
    start: 100,
    end: 200,
    bg: "bg-brand-primary",
    bgSoft: "bg-brand-primary/75",
    // Black, not white: #F3EFEE on #5e8cff is 2.76:1 and fails WCAG AA.
    inacText: "text-brand-black/80",
    actText: "text-brand-black",
    actBg: "bg-brand-black",
    actBorder: "border-brand-black",
    blur: "backdrop-blur-xs",
  },
  {
    id: "experience",
    start: 200,
    end: 300,
    bg: "bg-brand-black",
    bgSoft: "bg-brand-black/75",
    inacText: "text-brand-white",
    actText: "text-brand-primary",
    actBg: "bg-brand-primary",
    actBorder: "border-brand-primary",
    blur: "backdrop-blur-md bg-brand-black/75",
  },
  {
    id: "education",
    start: 300,
    end: 400,
    bg: "bg-brand-black",
    bgSoft: "bg-brand-black/75",
    inacText: "text-brand-white",
    actText: "text-brand-primary",
    actBg: "bg-brand-primary",
    actBorder: "border-brand-primary",
    blur: "backdrop-blur-md bg-brand-black/75",
  },
  {
    id: "skills",
    start: 400,
    end: 500,
    bg: "bg-brand-primary",
    bgSoft: "bg-brand-primary/75",
    inacText: "text-brand-black/80",
    actText: "text-brand-black",
    actBg: "bg-brand-black",
    actBorder: "border-brand-black",
    blur: "backdrop-blur-xs",
  },
  {
    id: "contact",
    start: 500,
    end: 600,
    bg: "bg-brand-white",
    bgSoft: "bg-brand-white/75",
    inacText: "text-brand-black",
    actText: "text-brand-primary",
    actBg: "bg-brand-primary",
    actBorder: "border-brand-primary",
    blur: "backdrop-blur-md bg-brand-white/75",
  },
];

export const routes = sections.map((section) => section.id);

const byId = Object.fromEntries(sections.map((s) => [s.id, s]));

// Pre-measurement fallback: assumes one viewport per section. Only used for the
// first paint, before the layout has been measured.
const LEAD = 10;
const resolveByPercent = (percent) => {
  let match = sections[0];
  for (const section of sections) {
    if (percent >= section.start - LEAD) match = section;
  }
  return match;
};

// Sections are min-height, not fixed height — a long Experience list on a phone
// is taller than one viewport. Measuring real offsets keeps the theme in step
// with what is actually on screen instead of assuming 100vh each.
const resolveByBands = (bands, scrollY, viewportH) => {
  const probe = scrollY + viewportH * 0.2;
  let match = bands[0];
  for (const band of bands) {
    if (probe >= band.top) match = band;
  }
  return byId[match.id] ?? sections[0];
};

const ScrollContext = createContext(null);

export function ScrollProvider({ children }) {
  const { scrollY } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);
  const [scrollPx, setScrollPx] = useState(0);
  const [bands, setBands] = useState(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const t = setTimeout(() => setIntroDone(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const measure = () => {
      const nodes = document.querySelectorAll("[data-section]");
      if (!nodes.length) return;
      setBands(
        Array.from(nodes).map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            id: el.dataset.section,
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
          };
        }),
      );
    };

    measure();
    window.addEventListener("resize", measure);
    // Section heights settle after fonts land and content animates in.
    const t = setTimeout(measure, 1500);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (currentY) => {
      setScrollPx(currentY);
      setScrollPercent((currentY / window.innerHeight) * 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const value = useMemo(() => {
    const active = bands?.length
      ? resolveByBands(bands, scrollPx, window.innerHeight)
      : resolveByPercent(scrollPercent);
    return {
      activeSection: active.id,
      introDone,
      bgColor: active.bg,
      bgSoft: active.bgSoft,
      inacText: active.inacText,
      actText: active.actText,
      actBg: active.actBg,
      actBorder: active.actBorder,
      blur: active.blur,
      scrollPercent,
      sections,
    };
  }, [scrollPercent, scrollPx, bands, introDone]);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useScrollTheme() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollTheme must be used within a ScrollProvider");
  }
  return context;
}
