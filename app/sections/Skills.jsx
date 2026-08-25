import React from "react";
import skillList from "../utils/SkillList";
import Section from "../components/Section";
import Reveal from "../components/animation/Reveal";

/**
 * Set as type, not as a logo wall.
 *
 * This was 25 vendor logos in a grid, all rendered in flat black — which
 * stripped Python, React and Postgres of the one thing that makes them
 * recognisable at 24px and left a field of near-identical blobs. It was also
 * the most template-looking screen on the site. A dense typographic list reads
 * more senior, loads nothing, and drops the simple-icons dependency.
 */
export default function Skills() {
  return (
    <Section id="skills" title="skills" contentClass="mt-14 md:mt-20">
      <div className="flex flex-col gap-14 md:gap-16">
        {skillList.map((group, i) => (
          <Reveal key={group.group} type="up" delay={i * 0.08}>
            <div className="grid gap-4 md:grid-cols-[168px_1fr] md:gap-10">
              <div className="mono ink-faint md:pt-3">{group.group}</div>

              <div className="flex flex-wrap items-baseline gap-x-1 gap-y-2">
                {group.items.map((item, j) => (
                  <span key={item} className="inline-flex items-baseline">
                    <span className="body-lg">{item}</span>
                    {/* Trailing, not leading: a leading separator would strand
                        a "/" at the start of every wrapped line. */}
                    {j < group.items.length - 1 && (
                      <span className="accent mx-3 select-none opacity-40" aria-hidden="true">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
