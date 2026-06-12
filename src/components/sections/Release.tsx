'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'

export function Release() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-cover'), { y: 0, scale: 1.04, duration: 1.2 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-info'), { y: 0, x: 30, duration: 0.8 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="release" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Release /</div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
          {/* Cover */}
          <div className="release-cover w-full md:w-1/2">
            <div
              className="relative aspect-square overflow-hidden"
              style={{
                border: '1px solid rgba(196,120,138,0.1)',
                boxShadow: '0 0 60px rgba(196,120,138,0.06), 0 0 120px rgba(212,197,169,0.03)',
              }}
            >
              <Image
                src="/covers/GMGFE.webp"
                alt="Good Morning Good Fortune Elephant cover art"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Warm vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 20% 20%, rgba(196,120,138,0.06) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="release-info flex-1 py-4 md:py-12">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: '#C4788A' }}>
              MR-003 · 2024
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium italic tracking-[-0.02em] leading-[0.9] mb-1" style={{ color: '#D4C5A9' }}>
              Good Morning
            </h2>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal tracking-[-0.02em] leading-[0.9] mb-1" style={{ color: '#E8B0BC' }}>
              Good Fortune
            </h2>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal italic tracking-[-0.02em] leading-[0.9] mb-4" style={{ color: '#D4C5A9' }}>
              Elephant
            </h2>
            <p className="font-display text-xl md:text-2xl font-normal mb-6" style={{ color: '#C4788A' }}>
              Bethany Pritchett
            </p>

            <div className="rose-thread w-12 mb-8" />

            <p className="font-body text-base md:text-lg leading-relaxed mb-10 max-w-lg" style={{ color: '#B0A597' }}>
              A breathtaking dive into intimacy. Voice and synthesizer woven into 
              poetic architecture — songs that feel like letters you weren&apos;t supposed 
              to read. Alternative songwriting at its most vulnerable and vivid.
            </p>

            {/* Streaming */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="https://distrokid.com/hyperfollow/bethanypritchett/good-morning-good-fortune-elephant"
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 border btn-soft"
                style={{ borderColor: '#C4788A', color: '#C4788A' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C4788A'; e.currentTarget.style.color = '#080604' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C4788A' }}
              >
                Listen
              </a>
              <a
                href="https://open.spotify.com/artist/bethanypritchett"
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] tracking-[0.1em] uppercase transition-colors duration-300"
                style={{ color: '#9A5C6D' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#C4788A' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9A5C6D' }}
              >
                Spotify →
              </a>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['Alternative', 'Vocal', 'Synthesist', 'Poetic'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1"
                  style={{ border: '1px solid rgba(196,120,138,0.12)', color: '#9A5C6D' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider-ink max-w-5xl mx-auto mt-32" />
    </section>
  )
}