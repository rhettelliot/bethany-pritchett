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
        // Bethany Pritchett — intimate, poetic, handwritten light
        void: {
          DEFAULT: '#020203',
          raised: '#050506',
          elevated: '#0A0A0B',
          warm: '#0F0F11',
        },
        electric: {
          DEFAULT: '#C4788A',
          dim: '#9A5C6D',
          glow: '#C4788A26',
          pale: '#E8B0BC',
        },
        gold: {
          DEFAULT: '#D4C5A9',
          dim: '#A89878',
          muted: '#7A6F5E',
        },
        light: {
          DEFAULT: '#E8DDD0',
          dim: '#B0A597',
          muted: '#6E6358',
        },
        edge: {
          faint: 'rgba(0,122,255,0.06)',
          subtle: 'rgba(0,122,255,0.12)',
          medium: 'rgba(0,122,255,0.2)',
          bright: 'rgba(0,122,255,0.4)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
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
        'breathe-soft': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.01)' },
        },
        'ink-spread': {
          from: { opacity: '0', filter: 'blur(6px)', transform: 'scale(0.97)' },
          to: { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
        },
        'quill-draw': {
          from: { strokeDashoffset: '100%' },
          to: { strokeDashoffset: '0%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-up': 'slide-up 0.7s ease-out forwards',
        'breathe-soft': 'breathe-soft 10s ease-in-out infinite',
        'ink-spread': 'ink-spread 1s ease-out forwards',
        'quill-draw': 'quill-draw 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

export default config