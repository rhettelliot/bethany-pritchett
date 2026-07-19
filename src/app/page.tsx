'use client'

import { useEffect, useState } from 'react'
import { Gatekeeper } from '@/components/layout/Gatekeeper'
import { Navigation } from '@/components/layout/Navigation'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Hero } from '@/components/animation/Hero'
import { Fragments } from '@/components/sections/Fragments'
import { Release } from '@/components/sections/Release'
import { Verse } from '@/components/sections/Verse'
import { CTASection } from '@/components/ui/CTASection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  const [entered, setEntered] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('bp-entered') === 'true'
    }
    return false
  })

  useEffect(() => {
    const handleEnter = () => {
      sessionStorage.setItem('bp-entered', 'true')
      setEntered(true)
    }

    window.addEventListener('bp-enter', handleEnter)
    return () => window.removeEventListener('bp-enter', handleEnter)
  }, [])

  return (
    <>
      <Gatekeeper />
      {entered && (
        <SmoothScroll>
          <header>
            <Navigation />
          </header>
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <Fragments />
            <Release />
            <Verse />
            <CTASection />
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </>
  )
}