import React from 'react'
import { ScrollTracker } from '../utils/ScrollTracker'
import ParallaxSection from '../components/animation/ParallaxSection'

export default function Projects(){

  const { activeSection, bgColor, actText, inacText, sections } = ScrollTracker()

  return (
      <div
        id="projects"
        className={`relative h-full w-full text-${inacText} px-4 py-8 md:px-8 lg:px-16 overflow-clip`}
      >
      <ParallaxSection entrance={"bottom"} animateOnce={false} speed={1.025} className='flex h-fit w-full items-center justify-between'>
        <div className={`h-2 w-4 md:w-16 lg:w-40 bg-${inacText}`}/>
        <div className={`heading2 text-${inacText} transition-colors duration-250 ease-in`}>selected projects</div>
        <div className={`h-2 w-4 md:w-16 lg:w-40 bg-${inacText}`}/>
      </ParallaxSection>

      
    </div>
  )
}
