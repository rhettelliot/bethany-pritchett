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
          DEFAULT: 'var(--void)',
          raised: 'var(--void-raised)',
          elevated: 'var(--void-elevated)',
          float: 'var(--void-float)',
        },
        signal: {
          DEFAULT: 'var(--signal)',
          dim: 'var(--signal-dim)',
          border: 'var(--signal-border)',
          pale: 'var(--signal-pale)',
          warm: 'var(--signal-warm)',
          cream: 'var(--signal-cream)',
        },
        ink: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          ghost: 'var(--text-ghost)',
        },
        edge: {
          ghost: 'var(--edge-ghost)',
          faint: 'var(--edge-faint)',
          subtle: 'var(--edge-subtle)',
          clear: 'var(--edge-clear)',
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
