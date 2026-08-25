import React from "react";
import { ArrowUpRight } from "lucide-react";
import contactList from "../utils/ContactList";
import Section from "../components/Section";
import Reveal from "../components/animation/Reveal";

/**
 * The terminus. The wire's last port docks on this heading, and the heat ramp
 * has arrived at Wyren's orange by the time you get here.
 *
 * The old version floated a short block in the middle of a min-h-svh box with
 * ~250px of dead air above it and the footer rule stranded at the bottom edge.
 * This one is composed to close the page.
 */
export default function Contact() {
  return (
    <Section id="contact" title="contact" contentClass="mt-14 md:mt-20">
      <Reveal type="up">
        <h3 className="display-xl max-w-[14ch]">
          Let&apos;s build something.
        </h3>
        <p className="body-lg ink-dim mt-8 max-w-[46ch]">
          Open to software engineering roles and collaborations on AI-powered products.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col md:mt-20">
        {contactList.map((item, i) => (
          <Reveal key={item.label} type="up" delay={0.06 + i * 0.06}>
            <a
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group grid items-baseline gap-1 border-t border-[var(--line)] py-6 transition-colors duration-300 hover:border-[var(--accent)] md:grid-cols-[168px_1fr] md:gap-10"
            >
              <span className="mono ink-faint transition-colors group-hover:text-[var(--accent)]">
                {item.label}
              </span>
              <span className="title inline-flex items-center gap-2 transition-colors group-hover:text-[var(--accent)]">
                {item.value}
                <ArrowUpRight
                  size={18}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </a>
          </Reveal>
        ))}
        <div className="border-t border-[var(--line)]" />
      </div>

      <Reveal type="none" delay={0.2}>
        <div className="mt-20 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <div className="mono ink-faint">Axel Balitaan · Software Engineer · Philippines</div>
          <div className="mono ink-faint">© 2026 All rights reserved</div>
        </div>
      </Reveal>
    </Section>
  );
}
