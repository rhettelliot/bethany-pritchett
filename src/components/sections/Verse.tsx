'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const verses = [
  'Voice is the first instrument.',
  'The synthesizer dreams what the voice cannot say.',
  'A song is a room you build for one feeling.',
  'Good morning — the bravest word in any language.',
  'Fortune is not luck. It is attention.',
  'The elephant remembers what the heart forgets.',
  'Intimacy is the only architecture that matters.',
]

export function Verse() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.verse-line').forEach((line, i) => {
        gsap.from(line, {
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            once: true,
          },
          delay: i * 0.04,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="verse" className="py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Verse /</div>

        {/* Margin line — like reading at a desk */}
        <div className="relative pl-6 md:pl-10 border-l" style={{ borderColor: 'rgba(196,120,138,0.1)' }}>
          <div className="space-y-7 md:space-y-9">
            {verses.map((line, i) => (
              <p
                key={i}
                className={`verse-line font-display text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.01em] ${
                  i === verses.length - 1
                    ? 'font-medium italic'
                    : i === 0
                      ? 'font-medium'
                      : ''
                }`}
                style={{
                  color: i === verses.length - 1
                    ? '#E8B0BC'
                    : i === 0
                      ? '#C4788A'
                      : '#E8DDD0',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-16 rose-thread w-20" />
      </div>
    </section>
  )
}