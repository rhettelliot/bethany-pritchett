import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 bg-void"
    >
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal">
        404 — A letter never sent
      </p>
      <h1 className="font-display text-4xl md:text-6xl mt-6 mb-4 text-ink">
        Page not found
      </h1>
      <p className="font-body text-sm mb-12 text-ink-secondary">
        This page doesn&apos;t exist. The song continues elsewhere.
      </p>
      <Link
        href="/"
        className="font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-4 border transition-colors duration-200 btn-soft"
      >
        Return to the music
      </Link>
    </main>
  )
}
