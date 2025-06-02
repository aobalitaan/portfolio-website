import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ScrollTracker } from "../utils/ScrollTracker";
import ProjectCard from "../components/ProjectCard";
import projectList from "../utils/ProjectList";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";
import CardsAnimation from "../components/animation/CardsAnimation";

export default function Projects() {
  const {
    activeSection,
    actText,
    scrollPercent
  } = ScrollTracker();

  const isActive = activeSection === "projects";

  const [hoveredCard, setHoveredCard] = useState(null);
  const [disableSwitch, setDisableSwitch] = useState(false);

  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const { scrollY } = useScroll();

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setOffsetTop(window.scrollY + rect.top);
        setScreenHeight(window.innerHeight);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scrollEffect = useTransform(scrollY, scrollYValue => {
    const distanceToTop = offsetTop - scrollYValue;
    return distanceToTop / screenHeight;
  });

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

    // Scroll to center card when inactive
    if (!isActive && scrollPercent > 10) {
      setHoveredCard(null);
      hasScrolledToFirst.current = false; // Reset flag when leaving the section

      const centerIndex = Math.floor(projectList.length / 2);
      const cardEl = cardRefs.current[centerIndex];

      if (cardEl) {
        const cardOffsetLeft = cardEl.offsetLeft;
        const cardWidth = cardEl.offsetWidth;
        const containerWidth = containerEl.offsetWidth;

        const scrollLeft = cardOffsetLeft - (containerWidth - cardWidth) / 2;

        containerEl.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }

    // Scroll to first card only once when section becomes active
    if (isActive && !hasScrolledToFirst.current) {
      const firstCard = cardRefs.current[0];
      if (firstCard) {
        const cardOffsetLeft = firstCard.offsetLeft;
        const cardWidth = firstCard.offsetWidth;
        const containerWidth = containerEl.offsetWidth;

        const scrollLeft = cardOffsetLeft - (containerWidth - cardWidth) / 2;

        containerEl.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });

        hasScrolledToFirst.current = true; // ✅ mark as done
      }
    }
  }, [isActive, scrollPercent]);





  const getCardStyles = (index) => {
    const isHovered = hoveredCard === index;
    const noHover = hoveredCard === null;
    const zIndex = isHovered ? 29 : noHover ? 25 : 28 - Math.abs(hoveredCard - index);

    if (noHover || isHovered) {
      return {
        zIndex,
        className: isHovered ? "scale-105 z-29" : "",
      };
    }

    const diff = Math.abs(index - hoveredCard);
    const rotation = `${index > hoveredCard ? "" : "-"}rotate-${(diff * 5) % 30}`;
    const translate = `${index < hoveredCard ? "" : "-"}translate-x-${diff * 25}`;
    const extra = "translate-y-16 brightness-90 scale-85 blur-[1px]";

    return {
      zIndex,
      className: `${rotation} ${translate} ${extra}`,
    };
  };

  return (
    <div
      id="projects"
      className={`relative h-full w-full text-${actText} px-0 pt-24 pb-4 md:pb-8 md:pt-28 overflow-x-clip`}
    >
      {isActive && (
        <div className="px-4 md:px-8 lg:px-16">
          <FadeScroll show={true}>
            <SlideDiv type="top" animateOnce className="p-4">
              <div className="flex h-fit w-full items-center justify-between">
                <div className={`h-2 w-4 md:w-16 lg:w-40 bg-${actText}`} />
                <div className={`heading2 text-${actText} transition-colors duration-250 ease-in`}>
                  selected projects
                </div>
                <div className={`h-2 w-4 md:w-16 lg:w-40 bg-${actText}`} />
              </div>
            </SlideDiv>
          </FadeScroll>
        </div>
      )}

      <div className="no-scrollbar h-9/10 flex items-center overflow-visible transition-all">
        <div
          ref ={containerRef}
          className="no-scrollbar ml-auto mr-auto flex h-full w-fit snap-x snap-mandatory items-center gap-4 overflow-x-auto px-4"
        >
          {projectList.map((project, index) => {
            const { zIndex, className } = getCardStyles(index);

            return (
              <div
                key={index}
                ref={el => (cardRefs.current[index] = el)}
                className="snap-center"
                style={{ zIndex }}
                onClick={() => {
                  const url = project.prodLink || project.repoLink;
                  if (url) window.location.href = url;
                }}

              >
                <div className={`transition-all duration-250 ease-in-out ${className}`}>
                  <CardsAnimation
                    toggledisableSwitch={setDisableSwitch}
                    changeHoveredCard={setHoveredCard}
                    index={index}
                    length={projectList.length}
                    show={isActive}
                  >
                    <ProjectCard
                      toggledisableSwitch={setDisableSwitch}
                      show={isActive}
                      disableSwitch={disableSwitch}
                      switchCard={switchCard}
                      changeHoveredCard={setHoveredCard}
                      index={index}
                      project={project}
                    />
                  </CardsAnimation>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
