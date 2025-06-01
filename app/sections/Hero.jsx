import React from "react";
import { ScrollTracker } from "../utils/ScrollTracker";
import { ArrowDown } from "lucide-react";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

export default function Hero() {
  const { activeSection, bgColor, actText, inacText, sections } = ScrollTracker();
  const isActive = activeSection === "home";

  return (
    <div
      id="home"
      className={`relative h-full w-full text-${inacText} px-4 pt-24 pb-4 md:pb-8 md:pt-28 md:px-8 lg:px-16`}
    >
      <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-4 pb-8">
        <div className="col-span-5 row-start-5 md:col-span-4 md:col-start-1 md:row-start-5">
          <FadeScroll show={isActive} className="flex h-full flex-col justify-end">
            <SlideDiv type={"left"} animateOnce={true} delay={0.1} className="heading1">AXEL BALITAAN</SlideDiv>
            <SlideDiv type={"left"} animateOnce={true} delay={0.2} className="heading3 text-base md:text-3xl">
              Full-Stack Developer | Philippines
            </SlideDiv>
            <div className="h-8 lg:h-0"></div>
          </FadeScroll>
        </div>

        <div className="bg-green rotate-y-180 col-start-5 row-span-3 row-start-2 md:row-span-4 md:row-start-2">

          <SlideDiv animateOnce={true} delay={0.25}>
            <div className="flex origin-bottom-left rotate-90 items-end">
              <FadeScroll show={isActive}>
                <div>
                  <div className='rotate-y-180'>
                    <div className="smalltext">
                      © Designed and built by Axel Balitaan 2025
                    </div>
                    <div className="lg:w-128 md:w-100 bg-brand-white mt-1 h-1.5 w-80 md:h-2" />
                  </div>
                </div>
              </FadeScroll>
            </div>
          </SlideDiv>

        </div>


        <FadeScroll show={isActive} className="col-span-3 col-start-3 row-start-1 md:col-span-2 md:col-start-4 md:row-start-1">
          <SlideDiv type={"right"} animateOnce={true} delay={0.3} className="regulartext text-right">
            I build web and mobile apps that blend functionality with aesthetics.
          </SlideDiv>
        </FadeScroll>
      </div>


      <FadeScroll show ={isActive} className="relative bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center">
        <ArrowDown className={`transition-colors duration-250 animate-bounce text-${actText}`} size={30} />
      </FadeScroll>
    </div>
  );
}
