'use client'

import { useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'
import Navbar from './components/Navbar'
import './globals.css'

const sections = {
  contact: { start: 250, end: 300 },
  about: { start: 200, end: 250 },
  projects: { start: 100, end: 200 },
  home: { start: 0, end: 100 },
}

export default function RootLayout({ children }) {
  const { scrollY } = useScroll()
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
     if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (currentY) => {
      const scrollPercent = (currentY / window.innerHeight) * 100

      console.log(scrollPercent)
      for (const [key, range] of Object.entries(sections)) {
        if (scrollPercent >= range.start-10 && scrollPercent < range.end) {
          setActiveSection(key)
          break
        }
      }
    })

    return () => unsubscribe()
  }, [scrollY])

  return (
    <html lang="en">
      <body>
        <Navbar activeSection={activeSection} />
        {children}
      </body>
    </html>
  )
}
