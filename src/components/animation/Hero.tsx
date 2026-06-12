'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' }
      )

      tl.fromTo(
        subRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )

      gsap.to(indicatorRef.current, {
        y: 5,
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(titleRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Warm ambient — like morning light through curtains */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-breathe-soft"
          style={{
            background: 'radial-gradient(circle, rgba(196,120,138,0.08) 0%, rgba(212,197,169,0.04) 30%, transparent 60%)',
          }}
        />
      </div>

      {/* Faint vertical line — like a margin rule */}
      <div
        className="absolute left-[8%] md:left-[12%] top-0 bottom-0 w-px pointer-events-none opacity-[0.04]"
        style={{ backgroundColor: '#C4788A' }}
      />

      {/* Title */}
      <div ref={titleRef} className="relative z-10 text-center px-6 opacity-0">
        <h1 className="font-display text-6xl md:text-[8rem] lg:text-[10rem] font-medium italic tracking-[-0.01em] leading-[0.86]" style={{ color: '#E8B0BC' }}>
          Bethany
        </h1>
        <h1 className="font-display text-6xl md:text-[8rem] lg:text-[10rem] font-normal tracking-[-0.01em] leading-[0.86]" style={{ color: '#D4C5A9' }}>
          Pritchett
        </h1>
      </div>

      {/* Subtitle */}
      <div ref={subRef} className="relative z-10 mt-5 text-center opacity-0">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: '#9A5C6D' }}>
          Vocalist · Synthesist · Poet · MR-003
        </p>
        <div className="mt-4 rose-thread w-16 mx-auto" />
      </div>

      {/* Scroll */}
      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: '#9A5C6D' }}>
          Listen
        </span>
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
          <path d="M5 3 L5 13 M2 10 L5 13 L8 10" stroke="#C4788A" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    </section>
  )
}