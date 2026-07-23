'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let lenis: Lenis | null = null
    let gsapInstance: typeof import('gsap').default | null = null
    let active = true

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (!active) return
      gsap.registerPlugin(ScrollTrigger)
      gsapInstance = gsap

      lenis = new Lenis({
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenisRef.current = lenis

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis!.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)
    }

    init()

    return () => {
      active = false
      lenis?.destroy()
      gsapInstance?.ticker.remove(lenis!.raf as unknown as (time: number) => void)
    }
  }, [reduced])

  return <div className="relative">{children}</div>
}

