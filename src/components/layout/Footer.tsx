export function Footer() {
  return (
    <footer className="py-16 md:py-24" style={{ borderTop: '1px solid rgba(196,120,138,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h3 className="font-display text-2xl font-medium italic tracking-[-0.02em]">
              <span className="text-signal-warm">Bethany</span>{' '}
              <span className="text-signal-cream">Pritchett</span>
            </h3>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase mt-2 text-ink-secondary">
              Vocalist · Synthesist · Poet
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] mt-4 text-ink-tertiary">
              Seattle, WA · Manteis Recordings · MR-003
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1 text-ink-tertiary">
              Stream
            </span>
            <a
              href="https://open.spotify.com/artist/bethanypritchett"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300 link-quiet"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300 link-quiet"
            >
              Apple Music
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-2" style={{ borderTop: '1px solid rgba(196,120,138,0.06)' }}>
          <p className="font-mono text-[8px] tracking-[0.15em] text-ink-tertiary">
            © {new Date().getFullYear()} Bethany Pritchett. All voices reserved.
          </p>
          <p className="font-mono text-[8px] tracking-[0.15em] text-ink-tertiary">
            Manteis Recordings
          </p>
        </div>
      </div>
    </footer>
  )
}
