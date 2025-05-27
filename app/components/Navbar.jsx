'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const routes = {
  home: {
    bg: 'bg-brand-black/95',
    inactiveText: 'text-brand-white'
  },
  projects: {
    bg: 'bg-brand-white/95',
    inactiveText: 'text-brand-black'
  },
  about: {
    bg: 'bg-brand-white',
    inactiveText: 'text-brand-black'
  },
  contact: {
    bg: 'bg-brand-white',
    inactiveText: 'text-brand-black'
  }
}

export default function Navbar({ activeSection }) {
  const handleScroll = (id) => {
    const section = document.getElementById(id)
    if (section) {
      const yOffset = -80
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
      className={`fixed top-0 z-50 flex w-screen h-1/10 items-center flex-row gap-8 px-8 py-4 shadow-md transition-colors duration-250 backdrop-blur-xs ${routes[activeSection]?.bg}`}
    >
      <div>
       
      </div>
      {Object.keys(routes).map((route) => (
        <div
          key={route}
          onClick={() => handleScroll(route)}
          className={`cursor-pointer heading3 transition-colors duration-200 ${
            activeSection === route
              ? 'text-brand-primary font-semibold'
              : `${routes[activeSection]?.inactiveText || 'text-brand-white'} hover:text-brand-gray`
          }`}
        >
          {route}
        </div>
      ))}
    </motion.div>
  )
}
