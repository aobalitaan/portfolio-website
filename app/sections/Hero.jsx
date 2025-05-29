import React from 'react'
import Wave from '../components/Wave'
export default function Hero() {
  return (
    <div id="home" className="h-screen w-screen">
      
      <div
        className="w-10/5 md:7/5 z-1 h-4/5 opacity-50 md:h-full lg:h-full lg:w-full"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
          maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
        }}
      >
        <Wave />
      </div>
    </div>
  )
}