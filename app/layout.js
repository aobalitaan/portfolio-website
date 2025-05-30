"use client";

import Navbar from "./components/Navbar";
import "./globals.css";
import { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 1200); // Mount slightly before fadeOut
    const fadeTimer = setTimeout(() => setFadeOut(true), 1250); // When fade starts
    const removeTimer = setTimeout(() => setLoadingVisible(false), 3000); // When it's fully gone

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <html lang="en">
      <body className='overflow-x-hidden'>
        {mounted && (
          <>
            <Navbar />
            {children}
          </>
        )}

        {loadingVisible && (
          <div
            className={`fixed inset-0 z-[99] flex items-center justify-center bg-brand-black text-brand-primary transition-all duration-1000 ease-in-out ${
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
    <div className="typing-animation heading2 md:heading1 opacity-0" aria-label="Loading">
      hello world!
      <style jsx>{`
        .typing-animation {
          white-space: nowrap;
          overflow: hidden;
          width: 0;
          border-right: 2px solid currentColor;
          animation:
            typing 0.50s steps(11, end) forwards,
            blink 0.7s step-end infinite;
          opacity: 1
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 8.75ch }
        }

        @keyframes blink {
          50% { border-color: transparent }
        }
      `}</style>
    </div>
  );
}