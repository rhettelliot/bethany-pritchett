import { ALBUM } from '@/lib/album'

export function Footer() {
  return (
    <footer className="py-24 md:py-36 border-t border-signal-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-1">
            <h3 className="font-display text-3xl md:text-4xl font-medium italic tracking-[-0.02em]">
              <span className="text-signal-warm">Bethany</span>
              <span className="text-signal-cream">Pritchett</span>
            </h3>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase mt-3 text-ink-secondary">
              Vocalist · Synthesist · Poet
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] mt-6 text-ink-tertiary">
              Seattle, WA · Manteis Recordings · {ALBUM.catalog}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase mb-2 text-ink-tertiary">
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

          <div className="flex flex-col items-start gap-2">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase mb-2 text-ink-tertiary">
              Network
            </span>
            <a
              href="https://manteisrecordings.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Manteis Recordings — label"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300 link-quiet"
            >
              Manteis Recordings
            </a>
            <a
              href="https://redshiftmantra.vercel.app"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Red Shift Mantra — sibling artist"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300 link-quiet"
            >
              Red Shift Mantra
            </a>
            <a
              href="https://manteis-project-site.vercel.app"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="The Manteis Project — sibling artist"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300 link-quiet"
            >
              The Manteis Project
            </a>
            <a
              href="https://thesan-musique-site.vercel.app"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Thesan Musique — sibling artist"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300 link-quiet"
            >
              Thesan Musique
            </a>
            <a
              href="https://brindavan-gardens-site.vercel.app"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Brindavan Gardens — sibling artist"
              className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-300 link-quiet">
              Brindavan Gardens
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderTop: '1px solid rgba(184,138,154,0.07)' }}>
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
