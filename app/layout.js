"use client";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import "./globals.css";
import { useState, useEffect } from "react";
import Lenis from "lenis";

export default function RootLayout({ children }) {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(false);



  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 1200); // Mount slightly before fadeOut
    const fadeTimer = setTimeout(() => setFadeOut(true), 1250); // When fade starts
    const removeTimer = setTimeout(() => setLoadingVisible(false), 2000); // When it's fully gone

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1 // default is 0.1 — increase this to make scroll less smooth (e.g., 0.2 or 0.3)
    });


    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);


    return () => {
      clearTimeout(mountTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <html lang="en">
      <body className='bg-brand-black overflow-x-hidden'>
        {mounted && (
          <>
            <Navbar />
            {children}
          </>
        )}

        {loadingVisible && (
          <div
            className={`absolute top-0 z-[1000] h-screen w-screen flex items-center justify-center bg-brand-black text-brand-brighter transition-all duration-1000 ease-in-out ${
              fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
            }`}
            aria-live="polite"
          >
            <TypingLoading />
          </div>
        )}
      </body>
    </html>
  );
}

function TypingLoading() {
  return (
    <div
      className="heading2 md:heading1 opacity-100 whitespace-nowrap overflow-hidden border-r-2 border-current animate-typing"
      aria-label="Loading"
    >
      hello world!
    </div>

  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};