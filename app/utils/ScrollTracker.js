"use client"

import { useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'

const sections = {
  contact: { start: 300, end: 350, bg_color: "brand-black", inac_text: "brand-white", active_text: "brand-primary" },
  about: { start: 250, end: 300, bg_color: "brand-white", inac_text: "brand-black", active_text: "brand-primary" },
  skills: { start: 200, end: 250, bg_color: "brand-black", inac_text: "brand-white", active_text: "brand-primary" },
  projects: { start: 100, end: 200, bg_color: "brand-white", inac_text: "brand-black", active_text: "brand-primary" },
  home: { start: 0, end: 100, bg_color: "brand-black", inac_text: "brand-white", active_text: "brand-primary" },
}


export function ScrollTracker() {
  const { scrollY } = useScroll()
  const [activeSection, setActiveSection] = useState('home')
  const [bgColor, setBgColor] = useState(sections.home.bg_color)
  const [inacText, setInacText] = useState(sections.home.inac_text)
  const [actText, setActText] = useState(sections.home.active_text)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    setActiveSection('home')
    setBgColor(sections.home.bg_color)
    setInacText(sections.home.inac_text)
    setActText(sections.home.active_text)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (currentY) => {
      const scrollPercent = (currentY / window.innerHeight) * 100

      for (const [key, range] of Object.entries(sections)) {
        if (scrollPercent >= range.start - 10 && scrollPercent < range.end) {
          setActiveSection(key)
          setBgColor(range.bg_color)
          setInacText(range.inac_text)
          setActText(range.active_text)
          break
        }
      }
    })
   

    return () => unsubscribe()
  }, [scrollY])

  return { activeSection, bgColor, actText, inacText, sections }
}