"use client";

import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "./Navbar";
import { ScrollProvider } from "../utils/ScrollProvider";

export default function AppShell({ children }) {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const typeTimer = setTimeout(() => setStartTyping(true), 120);
    const fadeTimer = setTimeout(() => setFadeOut(true), 700);
    const removeTimer = setTimeout(() => setLoadingVisible(false), 1200);

    // Children render immediately now, so the overlay has to hold scroll
    // itself — it used to rely on there being no content behind it.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const unlockTimer = setTimeout(() => {
      document.body.style.overflow = previousOverflow;
    }, 700);

    if (!lenisRef.current) {
      lenisRef.current = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
      const raf = (time) => {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    return () => {
      clearTimeout(typeTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      clearTimeout(unlockTimer);
      document.body.style.overflow = previousOverflow;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <ScrollProvider>
      <Navbar />
      {children}

      {loadingVisible && (
        <LoadingScreen fadeOut={fadeOut} startTyping={startTyping} />
      )}
    </ScrollProvider>
  );
}

function LoadingScreen({ fadeOut, startTyping }) {
  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-ground text-heat-0 transition-all duration-1000 ease-in-out ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-hidden="true"
    >
      {startTyping && (
        <div className="display-lg animate-typing overflow-hidden whitespace-nowrap border-r-2 border-current">
          hello world!
        </div>
      )}
    </div>
  );
}

AppShell.propTypes = {
  children: PropTypes.node.isRequired,
};

LoadingScreen.propTypes = {
  fadeOut: PropTypes.bool.isRequired,
  startTyping: PropTypes.bool.isRequired,
};
