"use client";

import Backdrop from "./components/Backdrop";
import Spine from "./components/Spine";
import { sections } from "./utils/ScrollProvider";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

const CONTENT = {
  projects: Projects,
  experience: Experience,
  education: Education,
  skills: Skills,
  contact: Contact,
};

const below = sections.filter((s) => s.id !== "home");

/**
 * The hero pins and the work rises over it.
 *
 * `sticky top-0` was already on the hero before, but its parent was exactly
 * h-svh — sticky with no room to travel behaves like static, so it just
 * scrolled away like any other block. Here the sticky element's parent is the
 * whole page, so it holds while the sections below climb over the top of it,
 * and Backdrop's veil blurs then dissolves it on the way.
 *
 * Sections size to their content. They used to be forced to min-h-svh with the
 * body centred inside, which is what produced the ~150px bands of dead air
 * above and below almost every block.
 *
 * Each section publishes its own point on the heat ramp as `--accent`, so
 * children never have to be handed colour classes through props — the old
 * actText/actBg/inacText plumbing is gone.
 */
export default function Home() {
  return (
    <div className="relative">
      <section
        data-section="home"
        className="sticky top-0 z-0 h-svh"
        style={{ "--accent": sections[0].accent }}
      >
        <Hero />
      </section>

      {/* Everything below the hero shares one stacking context that sits above
          it, so the veil and the work both occlude the pinned hero. */}
      <div className="relative z-10">
        <Backdrop />
        <Spine />

        {below.map(({ id, accent }) => {
          const Content = CONTENT[id];
          return (
            <section
              key={id}
              data-section={id}
              className="relative z-10"
              style={{ "--accent": accent }}
            >
              <Content />
            </section>
          );
        })}
      </div>
    </div>
  );
}
