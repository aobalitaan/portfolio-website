"use client";

import { ScrollTracker } from "./utils/ScrollTracker";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Wave from "./components/Wave";
import Skills from "./sections/Skills";

import Lenis from "lenis";
import Contact from "./sections/Contact";

export default function Home() {
  const { activeSection, bgColor, actText, inacText, blur, sections } = ScrollTracker();

  return (
    <div className={"relative snap-y snap-mandatory scroll-smooth"}>
      <div className={`fixed inset-0 z-0 w-screen bg-${bgColor} transition-colors duration-500 ease-in`}>
        <div className="h-screen w-full opacity-50 [mask-image:linear-gradient(to_top,rgba(0,0,0,0.25)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0.25)_100%)]">
          <Wave />
        </div>
      </div>

      <div className={`fixed inset-0 z-0 h-screen w-screen ${blur} transition-all duration-750 ease-in`}>
      </div>


      <section className="sticky top-0 z-0 h-screen min-h-[720px] snap-start">
        <Hero />
      </section>

      <section className="top-0 z-0 h-screen min-h-[720px] snap-start">
        <Projects />
      </section>

      {/* <section className="top-0 z-0 h-screen snap-start">
        <Skills />
      </section>

      <section className="z-40 h-screen snap-start">
        <Contact />
      </section> */}
    </div>
  );
}