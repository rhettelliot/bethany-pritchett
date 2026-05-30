import type { Metadata } from 'next'
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
  title: 'Bethany Pritchett',
  description: 'Vocalist. Synthesist. Poet. Good Morning Good Fortune Elephant. Manteis Recordings.',
  metadataBase: new URL('https://bethanypritchett.com'),
  openGraph: {
    title: 'Bethany Pritchett',
    description: 'Vocalist / Synthesist / Poet — Manteis Recordings',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${playfair.variable}`}>
      <body className="bg-void text-light antialiased">
        <div className="noise-overlay" />
        <div className="warm-vignette fixed top-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(8,6,4,0.7) 0%, transparent 100%)' }} />
        <div className="warm-vignette fixed bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, rgba(8,6,4,0.7) 0%, transparent 100%)' }} />
        {children}
      </body>
    </html>
  )
}