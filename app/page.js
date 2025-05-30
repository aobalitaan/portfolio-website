"use client";

import { ScrollTracker } from "./utils/ScrollTracker";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Wave from "./components/Wave";

export default function Home() {
  const { activeSection, bgColor, actText, inacText, sections } = ScrollTracker();

  return (
    <div className={"h-screen"}>
      {/* Wave background - full screen, at the back */}
      <div className={`fixed inset-0 z-0 h-screen w-screen bg-${bgColor} transition-colors duration-500 ease-in`}>
        <div className="h-full w-full opacity-50 [mask-image:linear-gradient(to_top,rgba(0,0,0,0.25)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0.25)_100%)]">
          <Wave />
        </div>
      </div>


      {/* Content container with responsive padding */}
      <div className="relative top-20 z-10 h-full">
        <div className="h-[calc(100vh-80px)]">
          <Hero />
        </div>
      </div>

      <div className="sticky z-10 h-full pt-20">
        <div className="h-[calc(100vh-80px)]">
          <Projects />
        </div>
      </div>

    </div>
  );
}