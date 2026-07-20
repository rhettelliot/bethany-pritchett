'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function Gatekeeper() {
  const [entered, setEntered] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('bp-entered') === 'true'
    }
    return false
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (entered) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleEnter()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [entered])

  useEffect(() => {
    if (entered) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Ink line draws — like a quill signing a name
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }
      )

      // Title blooms from blur — like eyes adjusting to morning light
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=1'
      )

      // Subtitle — gentle reveal
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )

      // Button
      tl.fromTo(
        btnRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [entered])

  if (entered) return null

  const handleEnter = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.02,
      duration: 0.9,
      ease: 'power2.in',
      onComplete: () => {
        sessionStorage.setItem('bp-entered', 'true')
        window.dispatchEvent(new Event('bp-enter'))
        setEntered(true)
      },
    })
  }

  return (
    <div
      ref={containerRef}
      data-gate=""
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Bethany Pritchett"
      className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center"
    >
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(196,120,138,0.06) 0%, rgba(212,197,169,0.03) 30%, transparent 60%)',
        }}
      />

      {/* Ink line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(196,120,138,0.6), rgba(212,197,169,0.3), rgba(196,120,138,0.6), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div ref={titleRef} className="opacity-0">
          <h2 className="font-display text-5xl md:text-7xl lg:text-[8.5rem] font-medium italic tracking-[-0.01em] leading-[0.88]" style={{ color: '#E8B0BC' }}>
            Bethany
          </h2>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[8.5rem] font-normal tracking-[-0.01em] leading-[0.88]" style={{ color: '#D4C5A9' }}>
            Pritchett
          </h2>
        </div>

        <p
          ref={subtitleRef}
          className="opacity-0 font-mono text-[9px] tracking-[0.4em] uppercase mt-5"
          style={{ color: '#B88A9A' }}
        >
          Vocalist · Synthesist · Poet
        </p>

        <button
          ref={btnRef}
          onClick={handleEnter}
          autoFocus
          className="mt-10 font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-3 border btn-soft"
          style={{ borderColor: 'rgba(196,120,138,0.3)', color: '#C4788A' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C4788A'; e.currentTarget.style.color = '#000000' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C4788A' }}
        >
          Enter
        </button>
      </div>

      {/* Corner annotations — like margins of a handwritten letter */}
      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.15em]" style={{ color: '#8B7D70' }}>
        MR-003
      </div>
      <div className="absolute top-6 right-6 font-display text-lg italic" style={{ color: 'rgba(196,120,138,0.3)' }} aria-hidden="true">
        ♪
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.15em]" style={{ color: '#8B7D70' }}>
        good morning
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.15em]" style={{ color: '#B88A9A' }}>
        Seattle, 2024
      </div>
    </div>
  )
}