'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

const fragments = [
  { label: '∞', unit: 'RANGE', desc: 'Vocal', color: '#C4788A' },
  { label: '1', unit: 'VOICE', desc: 'Enough', color: '#D4C5A9' },
  { label: '12', unit: 'TRACKS', desc: 'Written in trust', color: '#C4788A' },
  { label: '1', unit: 'ALBUM', desc: 'GMGFE', color: '#D4C5A9' },
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
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px]" style={{ backgroundColor: 'rgba(196,120,138,0.06)' }}>
          {fragments.map((f) => (
            <div
              key={f.label}
              className="frag-cell bg-[#080604] p-6 md:p-10 flex flex-col items-center justify-center text-center"
            >
              <div
                className="font-mono text-4xl md:text-5xl font-bold tracking-[-0.04em]"
                style={{ color: f.color }}
              >
                {f.label}
              </div>
              <div
                className="font-mono text-[9px] tracking-[0.25em] uppercase mt-2"
                style={{ color: f.color }}
              >
                {f.unit}
              </div>
              <div className="font-mono text-[8px] tracking-[0.15em] uppercase mt-1" style={{ color: '#8B7D70' }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}