'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'
import { ALBUM } from '@/lib/album'

function ConcentricTunnel({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tunnelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B88A9A" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#F5E6D3" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {[380, 330, 280, 230, 180, 130, 80].map((r, i) => (
        <rect
          key={r}
          x={200 - r / 2}
          y={200 - r / 2}
          width={r}
          height={r}
          rx={4}
          fill="none"
          stroke="url(#tunnelGrad)"
          strokeWidth={i % 2 === 0 ? 0.8 : 0.4}
          opacity={1 - i * 0.12}
        />
      ))}
    </svg>
  )
}

function Stamp({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`stamp flex items-center justify-center ${className}`}
      style={{
        width: 92,
        height: 92,
        borderStyle: 'dashed',
      }}
    >
      <span className="font-mono text-[8px] tracking-[0.12em] uppercase text-center leading-[1.5] text-signal/80">
        {children}
      </span>
    </div>
  )
}

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
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-cover'), { y: 0, scale: 1.03, duration: 1.2 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-info'), { y: 0, x: 30, duration: 0.9 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-tracks'), { y: 40, duration: 0.8, stagger: 0.05 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-stamp'), { scale: 0.94, duration: 0.7, stagger: 0.1 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-catalog'), { y: 60, duration: 1.2 }))
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
      if (Math.abs(targetRotateX - currentRotateX) > 0.01 || Math.abs(targetRotateY - currentRotateY) > 0.01) {
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
      targetRotateY = ((x - cx) / cx) * 5
      targetRotateX = ((y - cy) / cy) * 5
      if (rafId === null) rafId = requestAnimationFrame(animate)
    }

    const onLeave = () => {
      targetRotateX = 0
      targetRotateY = 0
      if (rafId === null) rafId = requestAnimationFrame(animate)
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
    <section ref={sectionRef} id="release" className="gallery-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-28">
          <div className="section-label release-info opacity-0">Release /</div>
          <div className="release-stamp opacity-0">
            <Stamp className="text-ink-secondary">
              Manteis<br />Recordings<br />{ALBUM.year}
            </Stamp>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Cover with concentric frame tunnel */}
          <div className="release-cover lg:col-span-6 opacity-0">
            <div
              ref={cardRef}
              className="relative aspect-square overflow-hidden transition-all duration-200 ease-out will-change-transform"
              style={{
                opacity: loaded ? 1 : 0,
                border: '1px solid rgba(184,138,154,0.12)',
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
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 20% 20%, rgba(184,138,154,0.08) 0%, transparent 50%)',
                }}
              />
              <ConcentricTunnel className="absolute inset-0 pointer-events-none" />
            </div>

            {/* Sheet-music parallel line pattern under the cover */}
            <div className="mt-12 sheet-lines h-32 w-full opacity-[0.6]" />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-16">
            <div className="release-info opacity-0">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5 text-signal">
                {ALBUM.catalog} · {ALBUM.year}
              </div>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[0.92] mb-5">
                <span className="block font-medium italic text-signal-cream">Good Morning</span>
                <span className="block font-normal text-signal-warm">Good Fortune</span>
                <span className="block font-normal italic text-signal-cream">Elephant</span>
              </h2>
              <p className="font-display text-xl md:text-2xl font-normal mb-7 text-signal">
                Bethany Pritchett
              </p>
              <div className="rose-thread w-12 mb-8" />
              <p className="font-body text-base md:text-lg leading-[1.9] mb-10 max-w-[55ch] text-ink-secondary">
                A breathtaking dive into intimacy. Voice and synthesizer woven into
                poetic architecture — songs that feel like letters you weren&apos;t supposed
                to read. Alternative songwriting at its most vulnerable and vivid.
              </p>

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

            {/* Tracklist as technical metadata / sheet music */}
            <div className="release-tracks opacity-0">
              <div className="section-label mb-8">Track Metadata /</div>
              <div className="border-t border-signal-hairline">
                {ALBUM.tracks.map((track) => (
                  <div
                    key={track.n}
                    className="grid grid-cols-[2rem_1fr_4rem] md:grid-cols-[3rem_1fr_5rem] gap-4 items-baseline py-5 border-b border-signal-hairline group"
                  >
                    <span className="font-mono text-[10px] tracking-[0.15em] text-ink-tertiary">{track.n}</span>
                    <span className="font-body text-lg md:text-xl leading-[1.25] text-signal-cream group-hover:text-signal-warm transition-colors">
                      {track.title}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.15em] text-ink-tertiary text-right">{track.length}</span>
                  </div>
                ))}
              </div>              <div className="mt-6 font-mono text-[9px] tracking-[0.12em] uppercase text-ink-tertiary">
                Total runtime: 21:11 · 5 tracks · {ALBUM.year} · {ALBUM.label}
              </div>
            </div>

            {/* Massive catalog number as display art */}
            <div className="release-catalog opacity-0 mt-8">
              <div className="font-mono text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[0.78] tracking-[-0.04em] text-ink-ghost select-none">
                {ALBUM.catalog.replace('MR-', '')}
              </div>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-tertiary mt-3">
                {ALBUM.catalog} · Manteis Recordings
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
