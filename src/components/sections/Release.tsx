'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'
import { ALBUM } from '@/lib/album'

export function Release() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

  // Parallax tilt on hover
  useEffect(() => {
    if (reduced || !cardRef.current) return

    const card = cardRef.current
    let rafId: number | null = null
    let targetRotateX = 0
    let targetRotateY = 0
    let currentRotateX = 0
    let currentRotateY = 0

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      currentRotateX = lerp(currentRotateX, targetRotateX, 0.08)
      currentRotateY = lerp(currentRotateY, targetRotateY, 0.08)

      const clampedX = Math.round(currentRotateX * 100) / 100
      const clampedY = Math.round(currentRotateY * 100) / 100

      card.style.transform = `perspective(1200px) rotateX(${-clampedX}deg) rotateY(${clampedY}deg)`

      if (
        Math.abs(targetRotateX - currentRotateX) > 0.01 ||
        Math.abs(targetRotateY - currentRotateY) > 0.01
      ) {
        rafId = requestAnimationFrame(animate)
      } else {
        rafId = null
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2

      // Max tilt in degrees
      targetRotateY = ((x - cx) / cx) * 5
      targetRotateX = ((y - cy) / cy) * 5

      if (rafId === null) {
        rafId = requestAnimationFrame(animate)
      }
    }

    const onLeave = () => {
      targetRotateX = 0
      targetRotateY = 0
      if (rafId === null) {
        rafId = requestAnimationFrame(animate)
      }
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)

    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [reduced])

  return (
    <section ref={sectionRef} id="release" className="py-48 md:py-72">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-24">Release /</div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-28 items-start">
          {/* Cover with parallax tilt */}
          <div className="release-cover w-full md:w-1/2">
            <div
              ref={cardRef}
              className="relative aspect-square overflow-hidden transition-all duration-200 ease-out will-change-transform"
              style={{
                opacity: loaded ? 1 : 0,
                border: '1px solid rgba(184,138,154,0.12)',
                boxShadow: '0 0 80px rgba(184,138,154,0.07), 0 30px 60px rgba(0,0,0,0.4)',
              }}
            >
              <Image
                src="/covers/GMGFE.webp"
                alt={`${ALBUM.title} cover art`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                onLoad={() => setLoaded(true)}
                quality={90}
              />
              {/* Warm vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 20% 20%, rgba(184,138,154,0.08) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="release-info flex-1 py-4 md:py-12">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 text-signal">
              {ALBUM.catalog} · {ALBUM.year}
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[0.9] mb-4">
              <span className="block font-medium italic text-signal-cream">Good Morning</span>
              <span className="block font-normal text-signal-warm">Good Fortune</span>
              <span className="block font-normal italic text-signal-cream">Elephant</span>
            </h2>
            <p className="font-display text-xl md:text-2xl font-normal mb-6 text-signal">
              Bethany Pritchett
            </p>

            <div className="rose-thread w-12 mb-8" />

            <p className="font-body text-base md:text-lg leading-[1.85] mb-10 max-w-[55ch] text-ink-secondary">
              A breathtaking dive into intimacy. Voice and synthesizer woven into
              poetic architecture — songs that feel like letters you weren&apos;t supposed
              to read. Alternative songwriting at its most vulnerable and vivid.
            </p>

            {/* Streaming */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href={ALBUM.listenUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 border btn-soft min-h-[44px] flex items-center"
              >
                Listen
              </a>
              <a
                href={ALBUM.spotifyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] tracking-[0.1em] uppercase transition-colors duration-300 link-quiet min-h-[44px] flex items-center"
              >
                Spotify →
              </a>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['Alternative', 'Vocal', 'Synthesist', 'Poetic'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1 text-ink-secondary"
                  style={{ border: '1px solid rgba(184,138,154,0.14)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider-ink max-w-5xl mx-auto mt-40" />
    </section>
  )
}
