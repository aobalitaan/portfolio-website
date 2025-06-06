"use client";

import { useState, useEffect } from "react";
import { ScrollTracker } from "../utils/ScrollTracker";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const routes = ["home", "projects"];

export default function Navbar() {
  const { activeSection, bgColor, actText, inacText, blur, sections } = ScrollTracker();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isbgBlur = activeSection != "home";

  useEffect(() => {
    if (menuOpen) setShowMenu(true);
    else {
      const timeout = setTimeout(() => setShowMenu(false), 250);
      return () => clearTimeout(timeout);
    }
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
        className={"from-brand-black/25 fixed top-0 z-50 flex h-20 w-screen items-center justify-between gap-4 bg-gradient-to-b to-transparent px-8 transition-all duration-500 ease-in md:justify-start md:gap-8 md:px-12"}
      >

        <div className="animate-slideDown cursor-pointer" onClick={() => handleScroll("home")}>
          <Logo className={` size-12 text-${inacText} transition-all hover:scale-110 duration-250 ease-in`} />
        </div>

        {routes.map((route, index) => {
          const isActive = activeSection === route;
          return (
            <div
              key={route}
              onClick={() => handleScroll(route)}
              className={`navbar-options hidden text-shadow-lg md:block heading3 cursor-pointer transition-colors duration-250 ease-in ${
                isActive
                  ? `text-${actText} hover:text-brand-darker`
                  : `text-${inacText} hover:text-brand-gray`
              } animate-slideDown`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {route}
            </div>
          );
        })}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className={`animate-slideDown focus:outline-none md:hidden cursor-pointer transition-transform duration-250 z-50 ease-in text-${inacText} ${
            menuOpen ? "rotate-90" : "rotate-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className={`
          bg-${bgColor}/75 backdrop-blur-sm
          fixed inset-0 z-49 flex flex-col items-center justify-center space-y-8 text-3xl change md:hidden
          transition-all duration-250 ease-in-out
          ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        {routes.map((route) => (
          <button
            key={route}
            onClick={() => handleScroll(route)}
            className={`heading3 cursor-pointer transition-colors duration-200 ease-in ${
              activeSection === route
                ? `text-${actText}`
                : `text-${inacText} hover:text-brand-gray`
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