import React from "react";
import { useScrollTheme } from "../utils/ScrollProvider";
import { ArrowDown } from "lucide-react";
import SlideDiv from "../components/animation/SlideDiv";
import FadeScroll from "../components/animation/FadeScroll";

export default function Hero() {
  const { activeSection, actText, inacText, introDone } = useScrollTheme();
  // Content is server-rendered immediately; the entrance animation still waits
  // for the loading overlay to clear so the choreography survives.
  const isActive = activeSection === "home" && introDone;

  return (
    <div
      id="home"
      className={`flex flex-col relative h-full w-full ${inacText} px-4 pt-24 pb-8 md:pb-8 md:pt-28 md:px-8 lg:px-16`}
    >
      <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-4 pb-8">
        <div className="col-span-5 row-start-5 md:col-span-4 md:col-start-1 md:row-start-5">
          <FadeScroll show={isActive} className="flex h-full flex-col justify-end">
            <SlideDiv show={isActive} animateOnce={true} type={"left"} delay={0.1} className="heading1">AXEL BALITAAN</SlideDiv>
            <SlideDiv show={isActive} animateOnce={true} type={"left"} delay={0.2} className="heading3 text-base md:text-3xl">
              Software Engineer | Philippines
            </SlideDiv>

          </FadeScroll>
        </div>

        <div className="rotate-y-180 col-start-5 row-span-3 row-start-2 md:row-span-4 md:row-start-2">

          <SlideDiv delay={0.25} show={isActive} animateOnce={true} className={"overflow-visible"} type ={"bottom"} >
            <div className="flex origin-bottom-left rotate-90 items-end">
              <FadeScroll show={isActive}>
                <div>
                  <div className='rotate-y-180'>
                    <div className="smalltext">
                      © 2026 All Rights Reserved
                    </div>
                    <div className="lg:w-128 md:w-100 bg-brand-white mt-1 h-1.5 w-80 md:h-2" />
                  </div>
                </div>
              </FadeScroll>
            </div>
          </SlideDiv>
        </div>


        <FadeScroll show={isActive} className="col-span-3 col-start-3 row-start-1 md:col-span-2 md:col-start-4 md:row-start-1">
          <SlideDiv show={isActive} animateOnce={true} type={"right"} delay={0.3} className="regulartext text-right">
            I build AI-powered products that blend real engineering with aesthetics.
          </SlideDiv>
        </FadeScroll>
      </div>


      <FadeScroll show ={isActive} className="flex w-full items-center justify-center">
        <ArrowDown className={`transition-colors duration-250 animate-bounce ${actText}`} size={30} />
      </FadeScroll>
    </div>
  );
}
