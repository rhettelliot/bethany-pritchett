'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function Gatekeeper() {
  const [entered, setEntered] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('bp-entered') === 'true'
    }
    return false
  })
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const gsapRef = useRef<typeof import('gsap').default | null>(null)

  const doEnter = useCallback(() => {
    sessionStorage.setItem('bp-entered', 'true')
    window.dispatchEvent(new Event('bp-enter'))
    if (reduced) {
      setEntered(true)
      return
    }
    const gsap = gsapRef.current
    if (!gsap) return
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.02,
      duration: 0.9,
      ease: 'power2.in',
      onComplete: () => setEntered(true),
    })
  }, [reduced])

  useEffect(() => {
    if (entered) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        doEnter()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [entered, doEnter])

  useEffect(() => {
    if (entered || reduced) return

    let ctx: { revert: () => void } | null = null
    let active = true

    const init = async () => {
      const gsap = (await import('gsap')).default
      if (!active) return
      gsapRef.current = gsap

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.3 })

        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }
        )

        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
          '-=1'
        )

        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )

        tl.fromTo(
          btnRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )
      }, containerRef)
    }

    init()

    return () => {
      active = false
      ctx?.revert()
    }
  }, [entered, reduced])

  useEffect(() => {
    if (reduced && !entered) {
      let active = true

      const init = async () => {
        const gsap = (await import('gsap')).default
        if (!active) return
        gsapRef.current = gsap
        gsap.set([lineRef.current, titleRef.current, subtitleRef.current, btnRef.current], { opacity: 1, y: 0, scaleX: 1 })
      }

      init()

      return () => {
        active = false
      }
    }
  }, [reduced, entered])

  if (entered) return null

  return (
    <div
      ref={containerRef}
      data-gate=""
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Bethany Pritchett"
      className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(184,138,154,0.06) 0%, transparent 60%)',
        }}
      />

      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(184,138,154,0.6), rgba(184,138,154,0.3), rgba(184,138,154,0.6), transparent)',
        }}
      />

      <div className="relative z-10 text-center px-6">
        <div ref={titleRef} className="opacity-0">
          <h2 className="font-display text-5xl md:text-7xl lg:text-[8.5rem] font-medium italic tracking-[-0.01em] leading-[0.88] text-signal-warm">
            Bethany
          </h2>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[8.5rem] font-normal tracking-[-0.01em] leading-[0.88] text-signal-cream">
            Pritchett
          </h2>
        </div>

        <p
          ref={subtitleRef}
          className="opacity-0 font-mono text-[9px] tracking-[0.4em] uppercase mt-5 text-ink-secondary"
        >
          Vocalist · Synthesist · Poet
        </p>

        <button
          ref={btnRef}
          onClick={doEnter}
          autoFocus
          className="mt-10 font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-3 border btn-soft min-h-[44px]"
        >
          Enter
        </button>
      </div>

      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.15em] text-ink-tertiary">
        MR-003
      </div>
      <div className="absolute top-6 right-6 font-display text-lg italic text-signal/30" aria-hidden="true">
        ♪
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.15em] text-ink-tertiary">
        good morning
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.15em] text-ink-secondary">
        Seattle, 2025
      </div>
    </div>
  )
}
