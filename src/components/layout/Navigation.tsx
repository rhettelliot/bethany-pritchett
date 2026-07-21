'use client'

import { useState } from 'react'
import { ALBUM } from '@/lib/album'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '#release', label: 'Release' },
    { href: '#verse', label: 'Verse' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-void/90" style={{ borderBottom: '1px solid rgba(196,120,138,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <a href="#" className="font-display text-lg font-medium italic tracking-[-0.02em] text-signal-warm">
          BP
          <span className="font-mono text-[8px] tracking-[0.15em] ml-2 not-italic text-ink-tertiary">
            {ALBUM.catalog}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 link-quiet min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ALBUM.listenUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 border btn-soft min-h-[44px] flex items-center"
          >
            Listen
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase link-quiet min-h-[44px] px-2"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 py-6 space-y-4 bg-void" style={{ borderBottom: '1px solid rgba(196,120,138,0.06)' }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 link-quiet py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ALBUM.listenUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="block font-mono text-[11px] tracking-[0.15em] uppercase text-signal py-2"
          >
            Listen →
          </a>
        </div>
      )}
    </nav>
  )
}
