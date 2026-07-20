'use client'

import { useState } from 'react'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '#release', label: 'Release' },
    { href: '#verse', label: 'Verse' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl" style={{ background: 'rgba(8,6,4,0.85)', borderBottom: '1px solid rgba(196,120,138,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <a href="#" className="font-display text-lg font-medium italic tracking-[-0.02em]" style={{ color: '#E8B0BC' }}>
          BP
          <span className="font-mono text-[8px] tracking-[0.15em] ml-2 not-italic" style={{ color: '#8B7D70' }}>
            MR-003
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ color: '#B88A9A' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#C4788A' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#B88A9A' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://distrokid.com/hyperfollow/bethanypritchett/good-morning-good-fortune-elephant"
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 border btn-soft"
            style={{ borderColor: '#C4788A', color: '#C4788A' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C4788A'; e.currentTarget.style.color = '#000000' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C4788A' }}
          >
            Listen
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: '#B88A9A' }}
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 py-6 space-y-4" style={{ background: 'rgba(8,6,4,0.95)', borderBottom: '1px solid rgba(196,120,138,0.06)' }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
              style={{ color: '#B88A9A' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://distrokid.com/hyperfollow/bethanypritchett/good-morning-good-fortune-elephant"
            target="_blank"
            rel="noreferrer noopener"
            className="block font-mono text-[11px] tracking-[0.15em] uppercase"
            style={{ color: '#C4788A' }}
          >
            Listen →
          </a>
        </div>
      )}
    </nav>
  )
}