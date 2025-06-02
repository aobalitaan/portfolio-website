"use client";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import "./globals.css";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";

export default function RootLayout({ children }) {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const typeTimer = setTimeout(() => setStartTyping(true), 250);
    const mountTimer = setTimeout(() => setMounted(true), 1200);
    const fadeTimer = setTimeout(() => setFadeOut(true), 1250);
    const removeTimer = setTimeout(() => setLoadingVisible(false), 2000);

    // Initialize Lenis once
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
      const raf = (time) => {
        lenisRef.current.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    return () => {
      clearTimeout(typeTimer);
      clearTimeout(mountTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Portfolio | Axel Balitaan" />
        <meta property="og:description" content="Full-Stack Developer | UPLB | Philippines" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/aobalitaan/portfolio-website/319197aedc96ceab5cb6a1c47bb77a9c93a0b1bb/public/preview.png"
        />
      </head>
      <body className="bg-brand-black overflow-x-clip">
        {mounted && (
          <>
            <Navbar />
            {children}
          </>
        )}

        {loadingVisible && (
          <LoadingScreen fadeOut={fadeOut} startTyping={startTyping} />
        )}
      </body>
    </html>
  );
}

function LoadingScreen({ fadeOut, startTyping }) {
  return (
    <div
      className={`absolute top-0 z-[1000] h-screen w-screen flex items-center justify-center bg-brand-black text-brand-brighter transition-all duration-1000 ease-in-out ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-live="polite"
    >
      {startTyping && (
        <div className="heading2 md:heading1 animate-typing overflow-hidden whitespace-nowrap border-r-2 border-current opacity-100">
          hello world!
        </div>
      )}
    </div>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

LoadingScreen.propTypes = {
  fadeOut: PropTypes.node.isRequired,
  startTyping: PropTypes.node.isRequired
};

