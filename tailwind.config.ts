import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        socra: {
          darkest: '#333d29',
          dark: '#414833',
          forest: '#656d4a',
          sage: '#a4ac86',
          stone: '#c2c5aa',
          tan: '#b6ad90',
          sand: '#a68a64',
          midbrown: '#936639',
          deepbrown: '#7f4f24',
          richbrown: '#582f0e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(147, 102, 57, 0.35), 0 18px 60px rgba(51, 61, 41, 0.45)',
      },
      backgroundImage: {
        'socra-grid':
          'linear-gradient(rgba(164, 172, 134, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(164, 172, 134, 0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

export default config