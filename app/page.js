"use client";

import Backdrop from "./components/Backdrop";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

// min-h rather than fixed h: Experience/Education/Skills overflow one viewport
// on narrow screens, and ScrollProvider measures the real offsets anyway.
// `flex` matters — with height:auto a child's h-full collapses to content, so
// sections stretch via flex-1 instead.
const sectionClass = "relative z-10 flex min-h-svh";

export default function Home() {
  return (
    <div className="relative">
      <Backdrop />

      <section data-section="home" className="sticky top-0 z-0 h-svh min-h-[720px]">
        <Hero />
      </section>

      <section data-section="projects" className={sectionClass}>
        <Projects />
      </section>

      <section data-section="experience" className={sectionClass}>
        <Experience />
      </section>

      <section data-section="education" className={sectionClass}>
        <Education />
      </section>

      <section data-section="skills" className={sectionClass}>
        <Skills />
      </section>

      <section data-section="contact" className={sectionClass}>
        <Contact />
      </section>
    </div>
  );
}
