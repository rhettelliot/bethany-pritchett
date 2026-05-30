'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="cta-content">
          {/* Musical notation symbol */}
          <div className="font-display text-3xl italic mb-6" style={{ color: 'rgba(196,120,138,0.4)' }}>
            ♫
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium italic tracking-[-0.02em] leading-[1.05]" style={{ color: '#E8B0BC' }}>
            Bring your voice to the room.
          </h2>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mt-4" style={{ color: '#9A5C6D' }}>
            Manteis Recordings — accepting demos from artists with something to say
          </p>

          <div className="mt-10">
            <a
              href="mailto:demo@manteisrecordings.com"
              className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-4 border btn-soft"
              style={{ borderColor: '#C4788A', color: '#C4788A' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C4788A'; e.currentTarget.style.color = '#080604' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C4788A' }}
            >
              Submit Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}