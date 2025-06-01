import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTracker } from "../utils/ScrollTracker";
import ProjectCard from "../components/ProjectCard";
import projectList from "../utils/ProjectList";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";
import { useScroll, useTransform } from "framer-motion";
import CardsAnimation from "../components/animation/CardsAnimation";

export default function Projects() {

  const { activeSection, bgColor, actText, inacText, blur, sections, scrollPercent } = ScrollTracker();
  const isActive = activeSection === "projects";


  const [hoveredCard, changeHoveredCard] = useState(null);
  const [disableSwitch, toggledisableSwitch] = useState(false);

  const switchCard = async (index) => {
    if (index === hoveredCard || isActive === false) return;

    // Scroll the card into view
    const cardEl = cardRefs.current[index];
    if (cardEl) {
      cardEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    changeHoveredCard(null);
    toggledisableSwitch(true);
    await new Promise(res => setTimeout(res, 100)); // smooth reset
    toggledisableSwitch(false);
    changeHoveredCard(index);
  };

  useEffect(() => {
    if (!isActive) {
      changeHoveredCard(null);
      const centerEl = cardRefs.current[Math.floor(projectList.length/2)];
      if (centerEl) {
        centerEl.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [isActive]);


  const cardRefs = useRef([]);


  const ref = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0);
  const { scrollY } = useScroll();
  const [screenHeight, setScreenHeight] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setOffsetTop(window.scrollY + rect.top);
        setScreenHeight(window.innerHeight);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scrollEffect = useTransform(scrollY, (scrollYValue) => {
    const distanceToTop = offsetTop - scrollYValue;
    return distanceToTop / screenHeight;
  });


  return (
    <div
      id="projects"
      className={`relative h-full w-full text-${actText} px-4 pt-24 pb-4 md:pb-8 md:pt-28 md:px-8 lg:px-16 overflow-x-clip`}
    >

      {activeSection === "projects" && (
        <FadeScroll show={isActive}>
          <SlideDiv
            type="top"
            animateOnce={true}
            className="flex h-fit w-full items-center justify-between"
          >
            <div className={`h-2 w-4 md:w-16 lg:w-40 bg-${actText}`} />
            <div className={`heading2 text-${actText} transition-colors duration-250 ease-in`}>
              selected projects
            </div>
            <div className={`h-2 w-4 md:w-16 lg:w-40 bg-${actText}`} />
          </SlideDiv>
        </FadeScroll>
      )}

      <div className={"overflow-auto transition-all h-19/20 flex items-center no-scrollbar"}>
        <div
          className={"flex items-center ml-auto mr-auto px-4 gap-4 w-fit"}
        >
          {projectList.map((project, index) => {

            const isHovered = hoveredCard === index;
            const noHover = hoveredCard === null;
            let rotateClass = "rotate-0";
            let translateX = "translate-x-0";
            const zIndex = isHovered
              ? 29
              : noHover
                ? 25
                : 28 - Math.abs(hoveredCard - index);

            if (!noHover && index !== hoveredCard) {
              const diff = Math.abs(index - hoveredCard); // or 10 for more dramatic effect
              const rotation = `${index > hoveredCard ? "" : "-"}rotate-${diff * 5 % 30}`;
              translateX = `${index < hoveredCard ? "" : "-"}translate-x-${diff * 25}`;
              rotateClass = rotation;
            }

            return (
              <div
                ref={(el) => cardRefs.current[index] = el}
                key={index}
                className={"snap-start"}
                style={{ zIndex }}
              >
                <div
                  className={`
                    transition-all duration-250 ease-in-out ${rotateClass} ${translateX}
                    ${isHovered ? "scale-105 z-29" : ""}
                    ${!isHovered && !noHover ? "translate-y-16 brightness-90 scale-85 blur-[1px]" : ""}
                  `}
                >
                  <CardsAnimation toggledisableSwitch={toggledisableSwitch} changeHoveredCard={changeHoveredCard} index={index} length={projectList.length} show={isActive}>
                    <ProjectCard toggledisableSwitch={toggledisableSwitch} disableSwitch={disableSwitch} switchCard={switchCard} changeHoveredCard={changeHoveredCard} index={index} project={project} />
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
