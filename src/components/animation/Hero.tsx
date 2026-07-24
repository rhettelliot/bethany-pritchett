'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let ctx: { revert: () => void } | null = null
    let active = true

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (!active) return
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
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
    }

    init()

    return () => {
      active = false
      ctx?.revert()
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) {
      let active = true

      const init = async () => {
        const gsap = (await import('gsap')).default
        if (!active) return
        gsap.set([titleRef.current, subRef.current, indicatorRef.current], { opacity: 1, y: 0 })
      }

      init()

      return () => {
        active = false
      }
    }
  }, [reduced])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-breathe-soft"
          style={{
            background: 'radial-gradient(circle, var(--signal-glow) 0%, transparent 60%)',
          }}
        />
      </div>

      <div
        className="absolute left-[8%] md:left-[12%] top-0 bottom-0 w-px pointer-events-none opacity-[0.04] bg-signal"
      />

      <div ref={titleRef} className="relative z-10 text-center px-6 opacity-0">
        <h1 className="font-display text-6xl md:text-[8rem] lg:text-[10rem] tracking-[-0.01em] leading-[0.86]">
          <span className="block font-medium italic text-signal-warm">Bethany</span>
          <span className="block font-normal text-signal-cream">Pritchett</span>
        </h1>
      </div>

      <div ref={subRef} className="relative z-10 mt-5 text-center opacity-0">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-ink-secondary">
          Vocalist · Synthesist · Poet · MR-003
        </p>
        <div className="mt-4 rose-thread w-16 mx-auto" />
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-ink-secondary">
          Listen
        </span>
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
          <path d="M5 3 L5 13 M2 10 L5 13 L8 10" stroke="#B88A9A" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    </section>
  )
}
