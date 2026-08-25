"use client";

import { useState, useEffect } from "react";
import { routes, useScrollTheme } from "../utils/ScrollProvider";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

/**
 * Set in the mono face rather than the display face.
 *
 * The nav is a control surface, not a headline — and keeping Syne out of it
 * means the display face only ever appears at moments that earn it. It also
 * ends the collision: section headings and nav items used to be the same
 * typeface at similar weights, so when a heading transited under the bar you
 * got two sets of Syne bold overlapping. Now they can't be confused, and the
 * bar carries a real scrim instead of a faint gradient.
 */
export default function Navbar() {
  const { activeSection, accent } = useScrollTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleScroll = (route) => {
    if (route === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(route)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 h-20"
        style={{ "--accent": accent }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ground via-ground/85 to-transparent backdrop-blur-[2px]" />

        <div className="relative mx-auto flex h-full w-full max-w-5xl items-center justify-between px-6 md:px-10">
          <button
            type="button"
            onClick={() => handleScroll("home")}
            aria-label="Back to top"
            className="cursor-pointer"
          >
            <Logo className="size-9 text-ink transition-transform duration-300 hover:scale-110" />
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            {routes.map((route) => {
              const isActive = activeSection === route;
              return (
                <button
                  key={route}
                  type="button"
                  onClick={() => handleScroll(route)}
                  aria-current={isActive ? "true" : undefined}
                  className={`mono relative cursor-pointer transition-colors duration-300 ${
                    isActive ? "accent" : "ink-faint hover:text-ink"
                  }`}
                >
                  {route}
                  <span
                    className="absolute -bottom-2 left-0 h-px bg-[var(--accent)] transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%" }}
                  />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`z-50 cursor-pointer text-ink transition-transform duration-300 lg:hidden ${
              menuOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div
        onClick={() => setMenuOpen(false)}
        style={{ "--accent": accent }}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-ground/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {routes.map((route) => (
          <button
            key={route}
            onClick={() => handleScroll(route)}
            className={`display-md cursor-pointer transition-colors duration-200 ${
              activeSection === route ? "accent" : "ink-dim hover:text-ink"
            }`}
          >
            {route}
          </button>
        ))}
      </div>
    </>
  );
}
