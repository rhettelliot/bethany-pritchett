import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bethany Pritchett — Good Morning Good Fortune Elephant | Vocalist / Synthesist / Poet',
  description: 'Vocalist. Synthesist. Poet. Good Morning Good Fortune Elephant — a breathtaking dive into intimacy. Manteis Recordings.',
  keywords: ['Bethany Pritchett', 'Good Morning Good Fortune Elephant', 'vocalist', 'synthesist', 'poet', 'alternative', 'art song', 'Manteis Recordings', 'Seattle'],
  authors: [{ name: 'Bethany Pritchett' }],
  creator: 'Bethany Pritchett',
  publisher: 'Manteis Recordings',
  metadataBase: new URL('https://bethanypritchett.com'),
  alternates: {
    canonical: 'https://bethanypritchett.com',
  },
  openGraph: {
    title: 'Bethany Pritchett — Good Morning Good Fortune Elephant',
    description: 'Vocalist / Synthesist / Poet — Manteis Recordings',
    type: 'website',
    url: 'https://bethanypritchett.com',
    siteName: 'Bethany Pritchett',
    locale: 'en_US',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'Bethany Pritchett — Good Morning Good Fortune Elephant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bethany Pritchett — Good Morning Good Fortune Elephant',
    description: 'Vocalist / Synthesist / Poet — Manteis Recordings',
    images: ['/og.jpg'],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicAlbum',
  name: 'Good Morning Good Fortune Elephant',
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Bethany Pritchett',
  },
  recordLabel: {
    '@type': 'Organization',
    name: 'Manteis Recordings',
  },
  catalogNumber: 'MR-003',
  datePublished: '2024',
  genre: ['Alternative', 'Vocal', 'Synthesist', 'Poetic'],
  url: 'https://bethanypritchett.com',
  image: 'https://bethanypritchett.com/og.jpg',
  description: 'A breathtaking dive into intimacy. Voice and synthesizer woven into poetic architecture — songs that feel like letters you weren\u2019t supposed to read. Alternative songwriting at its most vulnerable and vivid.',
}

export const viewport: Viewport = {
  themeColor: '#020203',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${playfair.variable}`}>
      <body className="bg-void text-light antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080604', color: '#C4788A', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', textAlign: 'center', padding: 24 }}>
            Bethany Pritchett is an interactive experience — enable JavaScript to enter.
          </div>
        </noscript>
        <div className="noise-overlay" />
        <div className="warm-vignette fixed top-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(8,6,4,0.7) 0%, transparent 100%)' }} />
        <div className="warm-vignette fixed bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, rgba(8,6,4,0.7) 0%, transparent 100%)' }} />
        {children}
      </body>
    </html>
  )
}