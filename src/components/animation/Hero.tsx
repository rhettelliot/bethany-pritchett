'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { ALBUM } from '@/lib/album'

function TopographicHero({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="roseFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B88A9A" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#B88A9A" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#B88A9A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#roseFade)" strokeWidth="0.8" opacity="0.55">
        {[
          'M-50,520 C150,480 350,560 550,510 C750,460 950,500 1250,470',
          'M-30,480 C160,430 340,500 540,460 C740,420 940,460 1240,430',
          'M-10,440 C170,390 330,450 530,410 C730,370 930,410 1230,380',
          'M20,400 C180,350 320,410 520,370 C720,330 920,370 1220,340',
          'M50,360 C190,310 310,370 510,330 C710,290 910,330 1210,300',
          'M80,320 C200,270 300,330 500,290 C700,250 900,290 1200,260',
          'M110,280 C210,230 290,290 490,250 C690,210 890,250 1190,220',
          'M140,240 C220,190 280,250 480,210 C680,170 880,210 1180,180',
          'M170,200 C230,150 270,210 470,170 C670,130 870,170 1170,140',
          'M200,160 C240,110 260,170 460,130 C660,90 860,130 1160,100',
        ].map((d, i) => (
          <path key={i} d={d} strokeDasharray={i % 2 === 0 ? '2 4' : '1 3'} />
        ))}
      </g>
    </svg>
  )
}

function OrbitalArcs({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B88A9A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#F5E6D3" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#arcGrad)" strokeWidth="0.6">
        <path d="M100,700 C250,650 350,500 300,300" />
        <path d="M700,100 C550,150 450,300 500,500" />
        <path d="M150,150 C300,200 500,200 650,150" />
        <path d="M650,650 C500,600 300,600 150,650" />
      </g>
      <circle cx="400" cy="400" r="280" stroke="rgba(184,138,154,0.07)" strokeWidth="0.5" fill="none" />
      <circle cx="400" cy="400" r="180" stroke="rgba(184,138,154,0.10)" strokeWidth="0.5" fill="none" />
      <circle cx="400" cy="400" r="80" stroke="rgba(184,138,154,0.14)" strokeWidth="0.5" fill="none" />
    </svg>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const catalogRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let ctx: { revert: () => void } | null = null
    let active = true

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (!active) return
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.2 })

        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' }
        )

        tl.fromTo(
          subRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )

        tl.fromTo(
          catalogRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        )

        gsap.to(indicatorRef.current, {
          y: 5,
          duration: 2.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })

        gsap.to(titleRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
          },
        })

        gsap.to(catalogRef.current, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        })
      }, heroRef)
    }

    init()

    return () => {
      active = false
      ctx?.revert()
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) {
      let active = true
      const init = async () => {
        const gsap = (await import('gsap')).default
        if (!active) return
        gsap.set([titleRef.current, subRef.current, indicatorRef.current, catalogRef.current], { opacity: 1, y: 0 })
      }
      init()
      return () => { active = false }
    }
  }, [reduced])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines opacity-[0.35] pointer-events-none" />

      <div className="absolute inset-0 topo-lines opacity-[0.45] pointer-events-none" />

      <TopographicHero className="absolute inset-0 opacity-[0.55] pointer-events-none" />

      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(184,138,154,0.07) 0%, transparent 55%)',
        }}
      />

      <OrbitalArcs className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] opacity-50 pointer-events-none" />

      {/* Decorative left hairline */}
      <div className="absolute left-[8%] md:left-[12%] top-0 bottom-0 w-px pointer-events-none opacity-[0.06] bg-signal" />

      {/* Massive catalog number display art */}
      <div
        ref={catalogRef}
        className="absolute right-4 md:right-[8%] top-[12%] z-10 opacity-0"
      >
        <div
          className="font-mono text-[11vw] md:text-[8vw] lg:text-[7vw] leading-[0.8] tracking-[-0.04em] text-ink-ghost select-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {ALBUM.catalog}
        </div>
      </div>

      <div ref={titleRef} className="relative z-10 text-center px-6 opacity-0">
        <h1 className="font-display text-6xl md:text-[9rem] lg:text-[11rem] tracking-[-0.02em] leading-[0.86]">
          <span className="block font-medium italic text-signal-warm">Bethany</span>
          <span className="block font-normal text-signal-cream">Pritchett</span>
        </h1>
      </div>

      <div ref={subRef} className="relative z-10 mt-8 text-center opacity-0">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-ink-secondary">
          Vocalist · Synthesist · Poet · {ALBUM.catalog}
        </p>
        <div className="mt-5 rose-thread w-16 mx-auto" />
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-ink-secondary">
          Listen
        </span>
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
          <path d="M5 3 L5 13 M2 10 L5 13 L8 10" stroke="#B88A9A" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    </section>
  )
}
