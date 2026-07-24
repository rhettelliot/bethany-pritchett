'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'
import { ALBUM } from '@/lib/album'

const paragraphs = [
  'Bethany Pritchett writes from the edge of the bed. Voice first, then synthesizer, then the poem that ties them together.',
  'Her home studio is a quiet room in Seattle where daylight comes through one window and every take is a confession.',
  'Good Morning, Good Fortune Elephant is a small album about large feelings: five songs that feel like letters you were not supposed to read.',
  'Alternative, intimate, unproduced-in-the-best-way — this is music made by one person listening carefully to herself.',
]

function Stamp({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`stamp flex items-center justify-center ${className}`}
      style={{
        width: 76,
        height: 76,
        borderStyle: 'dashed',
      }}
    >
      <span className="font-mono text-[8px] tracking-[0.12em] uppercase text-center leading-[1.5] text-signal/80">
        {children}
      </span>
    </div>
  )
}

function OrbitalCurves({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bioArcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B88A9A" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#F5E6D3" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#B88A9A" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#bioArcGrad)" strokeWidth="0.6">
        <path d="M-20,300 C100,250 200,350 300,300 C400,250 500,350 620,300" />
        <path d="M-20,320 C120,270 220,370 300,320 C380,270 480,370 620,320" />
        <path d="M-20,280 C80,230 240,330 300,280 C360,230 520,330 620,280" />
      </g>
    </svg>
  )
}

export function Bio() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.bio-label, .bio-head, .bio-para, .bio-thread'), {
        y: 30,
        duration: 0.9,
        stagger: 0.09,
      }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.bio-visual, .bio-stamp'), { y: 30, duration: 0.9, stagger: 0.12 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  useEffect(() => {
    if (reduced || !sectionRef.current || !visualRef.current) return

    let ctx: { revert: () => void } | null = null
    let active = true

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (!active) return
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.to('.bio-text-track', {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })

        gsap.to('.bio-visual-track', {
          y: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        })
      }, sectionRef)
    }

    init()

    return () => {
      active = false
      ctx?.revert()
    }
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="bio"
      className="relative gallery-section flex items-center overflow-hidden"
    >
      {/* Orbital curves behind the bio */}
      <OrbitalCurves className="absolute top-0 left-0 w-full h-full opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-28 items-start">
          <div className="bio-text-track md:sticky md:top-[25vh]">
            <div className="max-w-[58ch]">
              <div className="bio-label section-label mb-12">{ALBUM.catalog} {'//'} Intimate Protocol</div>

              <h2 className="bio-head font-display text-3xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05] mb-10">
                <span className="block font-medium italic text-signal-warm">Home studio</span>
                <span className="block font-normal text-signal-cream">aesthetic.</span>
              </h2>

              <div className="space-y-8 md:space-y-10">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="bio-para font-body text-base md:text-lg leading-[1.85] text-ink-secondary"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="bio-thread rose-thread w-20 mt-12" />
            </div>
          </div>

          <div ref={visualRef} className="bio-visual-track relative flex flex-col items-center">
            <div className="bio-visual opacity-0 relative">
              <div
                className="relative aspect-[3/4] overflow-hidden circle-mask"
                style={{
                  opacity: loaded ? 1 : 0,
                  width: 'min(100%, 520px)',
                  border: '1px solid rgba(184,138,154,0.16)',
                  transition: 'opacity 0.9s ease',
                }}
              >
                <Image
                  src="/covers/GMGFE.webp"
                  alt="Bethany Pritchett — Good Morning, Good Fortune Elephant"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  loading="lazy"
                  quality={92}
                  onLoad={() => setLoaded(true)}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)',
                  }}
                />
              </div>

              <div className="mt-10 flex flex-col items-center gap-3">
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink-tertiary">
                  Vocal / Synthesizer / Poetry
                </span>
                <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-ink-ghost">
                  Seattle, WA
                </span>
              </div>
            </div>

            <div className="bio-stamp opacity-0 mt-12">
              <Stamp className="text-ink-secondary">
                Intimate<br />Poetry<br />{ALBUM.year}
              </Stamp>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
