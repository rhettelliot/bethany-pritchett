import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import localFont from 'next/font/local'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { ALBUM } from '@/lib/album'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bethany Pritchett — Good Morning, Good Fortune Elephant | Vocalist / Synthesist / Poet',
  description:
    'Vocalist. Synthesist. Poet. Good Morning, Good Fortune Elephant — five songs of intimate poetry, out 2025 on Manteis Recordings.',
  keywords: [
    'Bethany Pritchett',
    'Good Morning Good Fortune Elephant',
    'vocalist',
    'synthesist',
    'poet',
    'alternative',
    'art song',
    'Manteis Recordings',
    'Seattle',
  ],
  authors: [{ name: 'Bethany Pritchett' }],
  creator: 'Bethany Pritchett',
  publisher: 'Manteis Recordings',
  metadataBase: new URL('https://bethanypritchett.com'),
  alternates: {
    canonical: 'https://bethanypritchett.com',
  },
  openGraph: {
    title: 'Bethany Pritchett — Good Morning, Good Fortune Elephant',
    description: 'Vocalist / Synthesist / Poet — five songs of intimate poetry. Manteis Recordings, 2025.',
    type: 'website',
    url: 'https://bethanypritchett.com',
    siteName: 'Bethany Pritchett',
    locale: 'en_US',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'Bethany Pritchett — Good Morning, Good Fortune Elephant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bethany Pritchett — Good Morning, Good Fortune Elephant',
    description: 'Vocalist / Synthesist / Poet — Manteis Recordings',
    images: ['/og.jpg'],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicAlbum',
  name: ALBUM.title,
  byArtist: {
    '@type': 'MusicGroup',
    name: ALBUM.artist,
  },
  recordLabel: {
    '@type': 'Organization',
    name: ALBUM.label,
    url: ALBUM.labelUrl,
  },
  catalogNumber: ALBUM.catalog,
  datePublished: ALBUM.year,
  numTracks: ALBUM.tracks.length,
  albumProductionType: 'https://schema.org/StudioAlbum',
  albumReleaseType: 'https://schema.org/AlbumRelease',
  genre: ['Alternative', 'Vocal', 'Synthesist', 'Poetic'],
  url: 'https://bethanypritchett.com',
  image: 'https://bethanypritchett.com/og.jpg',
  description:
    'Five songs of intimate poetry. Voice and synthesizer woven into poetic architecture — songs that feel like letters you were not supposed to read.',
  track: {
    '@type': 'ItemList',
    numberOfItems: ALBUM.tracks.length,
    itemListElement: ALBUM.tracks.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'MusicRecording',
        name: t.title,
        duration: t.iso,
        byArtist: { '@type': 'MusicGroup', name: ALBUM.artist },
      },
    })),
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="bg-void text-ink antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', color: '#B88A9A', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', textAlign: 'center', padding: 24 }}>
            Bethany Pritchett is an interactive experience — enable JavaScript to enter.
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}
