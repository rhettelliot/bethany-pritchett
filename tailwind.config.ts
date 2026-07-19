import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#000000',
          raised: '#0C0C0C',
          elevated: '#141414',
          float: '#1C1C1C',
        },
        signal: {
          DEFAULT: '#C4788A',
          dim: 'rgba(196,120,138,0.12)',
          border: 'rgba(196,120,138,0.40)',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          secondary: '#888888',
          tertiary: '#555555',
          ghost: 'rgba(255,255,255,0.18)',
        },
        edge: {
          ghost: 'rgba(255,255,255,0.04)',
          faint: 'rgba(255,255,255,0.08)',
          subtle: 'rgba(255,255,255,0.12)',
          clear: 'rgba(255,255,255,0.22)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-up': 'slide-up 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
