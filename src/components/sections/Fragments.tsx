'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

const fragments = [
  { label: '∞', unit: 'RANGE', desc: 'Vocal', color: 'text-signal' },
  { label: '1', unit: 'VOICE', desc: 'Enough', color: 'text-signal-cream' },
  { label: '5', unit: 'TRACKS', desc: 'Written in trust', color: 'text-signal' },
  { label: '1', unit: 'ALBUM', desc: 'GMGFE', color: 'text-signal-cream' },
]

export function Fragments() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.frag-cell'), { y: 20, duration: 0.5, stagger: 0.08 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="sr-only">By the numbers</h2>
        <div className="section-label mb-16">Signal /</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-signal-dim">
          {fragments.map((f, i) => (
            <div
              key={f.unit}
              className="frag-cell bg-void-raised p-6 md:p-12 flex flex-col items-center justify-center text-center"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div
                className={`font-mono text-4xl md:text-5xl font-bold tracking-[-0.04em] ${f.color}`}
              >
                {f.label}
              </div>
              <div
                className={`font-mono text-[9px] tracking-[0.25em] uppercase mt-2 opacity-70 ${f.color}`}
              >
                {f.unit}
              </div>
              <div className="font-mono text-[8px] tracking-[0.15em] uppercase mt-1 text-ink-tertiary">
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
