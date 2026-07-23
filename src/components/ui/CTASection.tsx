'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.cta-content'), { y: 25, duration: 0.7 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="cta-content">
          {/* Musical notation symbol */}
          <div className="font-display text-3xl italic mb-6 text-signal/40" aria-hidden="true">
            ♫
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium italic tracking-[-0.02em] leading-[1.05] text-signal-warm">
            Bring your voice to the room.
          </h2>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mt-4 text-ink-secondary">
            Manteis Recordings — accepting demos from artists with something to say
          </p>

          <div className="mt-10">
            <a
              href="mailto:demo@manteisrecordings.com"
              className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-4 border btn-soft min-h-[44px]"
            >
              Submit Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
