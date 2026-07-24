'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'

const paragraphs = [
  'Bethany Pritchett writes from the edge of the bed. Voice first, then synthesizer, then the poem that ties them together.',
  'Her home studio is a quiet room in Seattle where daylight comes through one window and every take is a confession.',
  'Good Morning, Good Fortune Elephant is a small album about large feelings: five songs that feel like letters you were not supposed to read.',
  'Alternative, intimate, unproduced-in-the-best-way — this is music made by one person listening carefully to herself.',
]

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
        // Left text column drifts upward on scroll (slower)
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

        // Right visual column drifts downward (opposite direction)
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
      className="relative min-h-[140vh] md:min-h-[170vh] flex items-center py-32 md:py-48"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Text column — slides opposite to visual */}
          <div className="bio-text-track md:sticky md:top-[25vh]">
            <div className="max-w-[65ch]">
              <div className="bio-label section-label mb-12">BP-009 // INTIMATE PROTOCOL</div>

              <h2 className="bio-head font-display text-3xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05] mb-10">
                <span className="block font-medium italic text-signal-warm">Home studio</span>
                <span className="block font-normal text-signal-cream">aesthetic.</span>
              </h2>

              <div className="space-y-7 md:space-y-9">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="bio-para font-body text-base md:text-lg leading-[1.75] text-ink-secondary"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="bio-thread rose-thread w-20 mt-12" />
            </div>
          </div>

          {/* Visual column */}
          <div ref={visualRef} className="bio-visual-track relative">
            <div className="bio-visual opacity-0">
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{
                  opacity: loaded ? 1 : 0,
                  border: '1px solid rgba(184,138,154,0.12)',
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
                    background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)',
                  }}
                />
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink-tertiary">
                  Vocal / Synthesizer / Poetry
                </span>
                <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-ink-ghost">
                  Seattle, WA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
