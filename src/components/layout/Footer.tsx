export function Footer() {
  return (
    <footer className="py-16 md:py-24" style={{ borderTop: '1px solid rgba(196,120,138,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h3 className="font-display text-2xl font-medium italic tracking-[-0.02em]">
              <span style={{ color: '#E8B0BC' }}>Bethany</span>{' '}
              <span style={{ color: '#D4C5A9' }}>Pritchett</span>
            </h3>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase mt-2" style={{ color: '#B88A9A' }}>
              Vocalist · Synthesist · Poet
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] mt-4" style={{ color: '#8B7D70' }}>
              Seattle, WA · Manteis Recordings · MR-003
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: '#8B7D70' }}>
              Stream
            </span>
            <a
              href="https://open.spotify.com/artist/bethanypritchett"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Listen to Bethany Pritchett on Spotify (opens in new tab)"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300"
              style={{ color: '#B88A9A' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#C4788A' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#B88A9A' }}
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Listen to Bethany Pritchett on Apple Music (opens in new tab)"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300"
              style={{ color: '#B88A9A' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#C4788A' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#B88A9A' }}
            >
              Apple Music
            </a>
          </div>
        </div>

        {/* Manteis Network — cross-site discovery */}
        <div className="mt-10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8" style={{ borderTop: '1px solid rgba(196,120,138,0.06)' }}>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: '#8B7D70' }}>
              Label
            </span>
            <a
              href="https://manteisrecordings.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Visit Manteis Recordings label hub (opens in new tab)"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300"
              style={{ color: '#B88A9A' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#C4788A' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#B88A9A' }}
            >
              Manteis Recordings ↗
            </a>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: '#8B7D70' }}>
              Roster
            </span>
            <div className="flex flex-col md:items-end gap-1">
              <a href="https://redshiftmantra.com" target="_blank" rel="noreferrer noopener" aria-label="Visit Red Shift Mantra artist site (opens in new tab)" className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300" style={{ color: '#B88A9A' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C4788A' }} onMouseLeave={(e) => { e.currentTarget.style.color = '#B88A9A' }}>Red Shift Mantra ↗</a>
              <a href="https://manteis-project-site.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit The Manteis Project artist site (opens in new tab)" className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300" style={{ color: '#B88A9A' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C4788A' }} onMouseLeave={(e) => { e.currentTarget.style.color = '#B88A9A' }}>The Manteis Project ↗</a>
              <a href="https://thesan-musique-site.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit Thesan Musique artist site (opens in new tab)" className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300" style={{ color: '#B88A9A' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C4788A' }} onMouseLeave={(e) => { e.currentTarget.style.color = '#B88A9A' }}>Thesan Musique ↗</a>
              <a href="https://brindavan-gardens-site.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit Brindavan Gardens artist site (opens in new tab)" className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300" style={{ color: '#B88A9A' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C4788A' }} onMouseLeave={(e) => { e.currentTarget.style.color = '#B88A9A' }}>Brindavan Gardens ↗</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-2" style={{ borderTop: '1px solid rgba(196,120,138,0.06)' }}>
          <p className="font-mono text-[8px] tracking-[0.15em]" style={{ color: '#8B7D70' }}>
            © {new Date().getFullYear()} Bethany Pritchett. All voices reserved.
          </p>
          <p className="font-mono text-[8px] tracking-[0.15em]" style={{ color: '#8B7D70' }}>
            Manteis Recordings
          </p>
        </div>
      </div>
    </footer>
  )
}