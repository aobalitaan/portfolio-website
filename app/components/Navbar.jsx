"use client";

import { useState, useEffect } from "react";
import { routes, useScrollTheme } from "../utils/ScrollProvider";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const { activeSection, bgSoft, actText, inacText } = useScrollTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleScroll = (route) => {
    if (route === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetElement = document.getElementById(route);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={"from-brand-black/25 fixed top-0 z-50 flex h-20 w-screen items-center justify-between gap-4 bg-gradient-to-b to-transparent px-8 transition-all duration-500 ease-in lg:justify-start lg:gap-7 md:px-12"}
      >

        <div className="animate-slideDown cursor-pointer" onClick={() => handleScroll("home")}>
          <Logo className={`size-12 ${inacText} transition-all hover:scale-110 duration-250 ease-in`} />
        </div>

        {routes.map((route, index) => {
          const isActive = activeSection === route;
          return (
            <button
              key={route}
              type="button"
              onClick={() => handleScroll(route)}
              aria-current={isActive ? "true" : undefined}
              className={`navbar-options hidden text-shadow-lg lg:block font-var1 text-lg xl:text-xl cursor-pointer transition-colors duration-250 ease-in ${
                isActive
                  ? `${actText} hover:text-brand-darker`
                  : `${inacText} hover:text-brand-gray`
              } animate-slideDown`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {route}
            </button>
          );
        })}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className={`animate-slideDown lg:hidden cursor-pointer transition-transform duration-250 z-50 ease-in ${inacText} ${
            menuOpen ? "rotate-90" : "rotate-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      <div
        onClick={() => setMenuOpen(false)}
        className={`
          ${bgSoft} backdrop-blur-sm
          fixed inset-0 z-49 flex flex-col items-center justify-center space-y-6 lg:hidden
          transition-all duration-250 ease-in-out
          ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        {routes.map((route) => (
          <button
            key={route}
            onClick={() => handleScroll(route)}
            className={`heading3 cursor-pointer px-6 py-2 transition-colors duration-200 ease-in ${
              activeSection === route
                ? actText
                : `${inacText} hover:text-brand-gray`
            }`}
          >
            {route}
          </button>
        ))}
      </div>

      <style jsx>{`
        .navbar-options {
          opacity: 0;
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          50% {
            transform: translateY(5px);
            opacity: 1;
          }
          75% {
            transform: translateY(-1px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 1s ease-out forwards;
        }
      `}</style>
    </>
  );
}
