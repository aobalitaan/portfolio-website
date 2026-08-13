import React from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { useScrollTheme } from "../utils/ScrollProvider";
import contactList from "../utils/ContactList";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

const icons = { Email: Mail, GitHub: Github, LinkedIn: Linkedin };

export default function Contact() {
  const { activeSection, actText, actBg, inacText } = useScrollTheme();
  const isActive = activeSection === "contact";

  return (
    <div
      id="contact"
      className={`relative flex w-full flex-1 flex-col ${inacText} px-4 pb-8 pt-24 md:px-8 md:pt-28 lg:px-16`}
    >
      <div className="flex flex-1 flex-col justify-center gap-8">
        <SlideDiv show={isActive} animateOnce type="left" delay={0.1} className="overflow-visible">
          <FadeScroll show={isActive}>
            <div className={`smalltext uppercase tracking-widest ${actText}`}>get in touch</div>
            <div className="heading1 mt-2">Let&apos;s build something.</div>
            <div className="regulartext mt-3 max-w-xl opacity-80">
              Open to software engineering roles and collaborations on AI-powered products.
            </div>
          </FadeScroll>
        </SlideDiv>

        <div className="flex flex-col gap-3">
          {contactList.map((item, i) => {
            const Icon = icons[item.label];
            return (
              <SlideDiv
                key={item.label}
                show={isActive}
                animateOnce
                type="left"
                delay={0.25 + i * 0.1}
                className="overflow-visible"
              >
                <FadeScroll show={isActive}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 transition-opacity hover:opacity-60"
                  >
                    <span className={`flex size-9 items-center justify-center rounded-full ${actBg} text-brand-white`}>
                      <Icon size={18} />
                    </span>
                    <span className="largetext">{item.value}</span>
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </FadeScroll>
              </SlideDiv>
            );
          })}
        </div>
      </div>

      <FadeScroll show={isActive}>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <div className={`h-1.5 w-24 md:w-auto md:flex-1 ${actBg}`} />
          <div className="smalltext shrink-0 opacity-70">© 2026 Axel Balitaan · All Rights Reserved</div>
        </div>
      </FadeScroll>
    </div>
  );
}
