"use client";

import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

const sections = {
  contact: {
    start: 300,
    end: 400,
    bg_color: "brand-white",
    inac_text: "brand-black",
    active_text: "brand-primary",
    blur: "backdrop-blur-md bg-brand-white/75"
  },
  skills: {
    start: 200,
    end: 300,
    bg_color: "brand-black",
    inac_text: "brand-white",
    active_text: "brand-primary",
    blur: "backdrop-blur-md bg-brand-black/75"
  },
  projects: {
    start: 100,
    end: 200,
    bg_color: "brand-primary",
    inac_text: "brand-white",
    active_text: "brand-black",
    blur: "backdrop-blur-xs"
  },
  home: {
    start: 0,
    end: 100,
    bg_color: "brand-black",
    inac_text: "brand-white",
    active_text: "brand-primary",
    blur: ""
  },
};

export function ScrollTracker() {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState("home");
  const [bgColor, setBgColor] = useState(sections.home.bg_color);
  const [inacText, setInacText] = useState(sections.home.inac_text);
  const [actText, setActText] = useState(sections.home.active_text);
  const [blur, setBlur] = useState(sections.home.blur);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    setActiveSection("home");
    setBgColor(sections.home.bg_color);
    setInacText(sections.home.inac_text);
    setActText(sections.home.active_text);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (currentY) => {
      const percent = (currentY / window.innerHeight) * 100;
      setScrollPercent(percent);

      for (const [key, range] of Object.entries(sections)) {
        if (percent >= range.start - 10 && percent < range.end) {
          setActiveSection(key);
          setBgColor(range.bg_color);
          setInacText(range.inac_text);
          setActText(range.active_text);
          setBlur(range.blur);
          break;
        }
      }
    });

    return () => unsubscribe();
  }, [scrollY]);

  return { activeSection, bgColor, actText, inacText, blur, sections, scrollPercent };
}
