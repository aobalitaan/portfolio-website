import React from 'react';
import { ScrollTracker } from '../utils/ScrollTracker';
import ParallaxSection from '../components/animation/ParallaxSection';

export default function Hero() {
  const { activeSection, bgColor, actText, inacText, sections } = ScrollTracker();

  return (
    <div
      id="home"
      className={`relative h-full w-full text-${inacText} px-4 py-4 md:px-8 lg:px-16 overflow-clip`}
    >
      <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-4">

        <ParallaxSection entrance={"left"} speed={1.25} className="col-span-5 row-start-5 md:col-span-4 md:col-start-1 md:row-start-5">
          <div className="heading1">AXEL BALITAAN</div>
          <div className="heading3 text-base md:text-3xl">
            Full-Stack Developer | Philippines
          </div>
        </ParallaxSection>

        <div className="bg-green rotate-y-180 col-start-5 row-span-3 row-start-2 md:row-span-4 md:row-start-2">
          <ParallaxSection entrance={"bottom"} speed={1.1}>
          <div className="flex origin-bottom-left rotate-90 items-end">
            <div className='rotate-y-180'>
              <div className="smalltext">
                © Designed and built by Axel Balitaan 2025
              </div>
              <div className="lg:w-128 md:w-100 mt-1 h-2 w-80 bg-brand-white" />
            </div>
          </div>
        </ParallaxSection>
        </div>
        

        <div className="col-span-3 col-start-3 row-start-1 md:col-span-2 md:col-start-4 md:row-start-1">
          <ParallaxSection entrance={"right"} speed={1.025}> 
             <div className="regulartext text-right">
              I build web and mobile apps that blend functionality with aesthetics.
            </div>
          </ParallaxSection>
        </div>
      </div>
    </div>
  );
}
