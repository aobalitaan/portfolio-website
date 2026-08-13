import React, { useState, useEffect, useRef } from "react";
import { useScrollTheme } from "../utils/ScrollProvider";
import ProjectCard from "../components/ProjectCard";
import projectList from "../utils/ProjectList";
import CardsAnimation from "../components/animation/CardsAnimation";

export default function Projects() {
  const { activeSection, actText, actBg, scrollPercent } = useScrollTheme();

  const isActive = activeSection !== "home";

  const [hoveredCard, setHoveredCard] = useState(null);
  const [disableSwitch, setDisableSwitch] = useState(false);

  const cardRefs = useRef([]);
  const containerRef = useRef(null);

  const switchCard = async (index) => {
    if (index === hoveredCard || !isActive) return;

    const cardEl = cardRefs.current[index];
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    setHoveredCard(null);
    setDisableSwitch(true);
    await new Promise(res => setTimeout(res, 100));
    setDisableSwitch(false);
    setHoveredCard(index);
  };


  const hasScrolledToFirst = useRef(false);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    // Centre a single card, not the rail's midpoint — with two cards the
    // midpoint falls in the gap between them and both get half-cut on mobile.
    // On desktop the rail doesn't overflow, so this is a no-op there.
    const centreCard = (i) => {
      const cardEl = cardRefs.current[i];
      if (!cardEl) return;
      containerEl.scrollTo({
        left: cardEl.offsetLeft - (containerEl.clientWidth - cardEl.offsetWidth) / 2,
        behavior: "smooth",
      });
    };

    if (!isActive) {
      setHoveredCard(null);
      hasScrolledToFirst.current = false;
      centreCard(0);
    }

    if (isActive && !hasScrolledToFirst.current) {
      centreCard(0);
      hasScrolledToFirst.current = true;
    }
  }, [isActive, scrollPercent]);


  const getCardStyles = (index) => {
    const isHovered = hoveredCard === index;
    const noHover = hoveredCard === null;
    const zIndex = isHovered ? 29 : noHover ? 25 : 28 - Math.abs(hoveredCard - index);

    if (noHover || isHovered) {
      return {
        zIndex,
        style: { transform: isHovered ? "scale(1.05)" : "none" },
      };
    }

    // Computed transforms cannot be Tailwind classes — Tailwind only ships
    // utilities it can find as literal strings. These go inline.
    const signed = index - hoveredCard;
    const diff = Math.abs(signed);
    const deg = Math.sign(signed) * ((diff * 5) % 30);
    const tx = -Math.sign(signed) * diff * 100;

    return {
      zIndex,
      style: {
        transform: `translateX(${tx}px) translateY(4rem) rotate(${deg}deg) scale(0.85)`,
        filter: "blur(1px) brightness(0.9)",
      },
    };
  };

  return (
    <div
      id="projects"
      className={`relative flex w-full flex-1 flex-col ${actText} px-0 pt-24 pb-4 md:pb-8 md:pt-28 overflow-x-clip`}
    >
      {isActive && (
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <div className="flex items-center gap-4">
            <h2 className={`heading2 whitespace-nowrap ${actText}`}>selected projects</h2>
            <div className={`h-px flex-1 opacity-25 ${actBg}`} />
          </div>
        </div>
      )}

      <div className="no-scrollbar flex flex-1 items-center overflow-visible transition-all">
        <div
          ref={containerRef}
          className="no-scrollbar ml-auto mr-auto flex h-full w-fit snap-x snap-mandatory items-center gap-4 overflow-x-auto px-4"
        >
          {projectList.map((project, index) => {
            const { zIndex, style } = getCardStyles(index);

            return (
              <a
                key={project.title}
                ref={el => (cardRefs.current[index] = el)}
                href={project.prodLink || project.repoLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} — ${project.subtitle}`}
                className="snap-center relative block"
                style={{ zIndex }}
                onClick={(e) => { if (!isActive) e.preventDefault(); }}
              >
                <div className="transition-all duration-250 ease-in-out" style={style}>
                  <CardsAnimation
                    toggledisableSwitch={setDisableSwitch}
                    changeHoveredCard={setHoveredCard}
                    index={index}
                    length={projectList.length}
                    show={isActive}
                  >
                    <ProjectCard
                      show={isActive}
                      disableSwitch={disableSwitch}
                      switchCard={switchCard}
                      changeHoveredCard={setHoveredCard}
                      index={index}
                      project={project}
                    />
                  </CardsAnimation>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
