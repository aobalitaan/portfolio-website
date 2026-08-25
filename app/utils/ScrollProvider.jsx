"use client";

import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * The page has ONE ground. Sections are distinguished by composition and by
 * their position on the heat ramp, not by repainting the whole viewport — the
 * old per-section background flip is what made every boundary a jump cut.
 *
 * `accent` walks from Arca's blue to Wyren's orange, routed through violet so
 * the midpoint stays chromatic instead of going grey.
 */
export const sections = [
  { id: "home", accent: "#5E8CFF" },
  { id: "projects", accent: "#6E7BFF" },
  { id: "experience", accent: "#8B6BF5" },
  { id: "education", accent: "#B45BD4" },
  { id: "skills", accent: "#D9524F" },
  { id: "contact", accent: "#E4502A" },
];

export const routes = sections.map((section) => section.id);

const byId = Object.fromEntries(sections.map((s) => [s.id, s]));

/**
 * Which section am I looking at? The probe sits at the vertical middle of the
 * viewport, which is what "looking at" actually means.
 *
 * It used to sit at 20%, so a section became "active" while 80% of the screen
 * still showed the previous one. Everything keyed off that flag — background
 * colour and content visibility both — so the theme changed and the outgoing
 * content erased itself with most of it still in view. That was the whole of
 * the "quality degrades as you scroll" complaint.
 */
const resolveActive = (bands, scrollY, viewportH) => {
  const probe = scrollY + viewportH * 0.5;
  let match = bands[0];
  for (const band of bands) {
    if (probe >= band.top) match = band;
  }
  return byId[match.id] ?? sections[0];
};

const ScrollContext = createContext(null);

export function ScrollProvider({ children }) {
  const [activeId, setActiveId] = useState("home");
  const [bands, setBands] = useState([]);
  const [docHeight, setDocHeight] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const t = setTimeout(() => setIntroDone(true), 700);
    return () => clearTimeout(t);
  }, []);

  // Sections are min-height, not fixed height — a long Experience list on a
  // phone is taller than one viewport, so real offsets have to be measured
  // rather than assumed at 100vh each.
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
      setDocHeight(document.documentElement.scrollHeight);
    };

    measure();
    window.addEventListener("resize", measure);
    // Heights settle after fonts land and the reveal animations run.
    const t1 = setTimeout(measure, 800);
    const t2 = setTimeout(measure, 2000);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!bands.length) return;

    let frame = null;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        setActiveId(resolveActive(bands, window.scrollY, window.innerHeight).id);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [bands]);

  const value = useMemo(
    () => ({
      activeSection: activeId,
      accent: byId[activeId]?.accent ?? sections[0].accent,
      introDone,
      bands,
      docHeight,
      sections,
    }),
    [activeId, introDone, bands, docHeight],
  );

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
