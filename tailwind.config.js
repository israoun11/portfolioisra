/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/*/.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark mode: warm charcoal-plum canvas, blush accent
        canvas: {
          DEFAULT: '#1c1417',
          raised: '#251b1f',
          line: '#3a2a30',
        },
        // Light mode: warm cream/beige canvas
        paper: {
          DEFAULT: '#faf3ec',
          raised: '#fffaf5',
          line: '#e9d9cc',
        },
        signal: {
          DEFAULT: '#e8a3ac',
          dim: '#c97e8c',
          bright: '#f4c2c9',
        },
        accent: {
          violet: '#c99b7a',
        },
        ink: {
          DEFAULT: '#f3e9e6',
          dim: '#c9b3ae',
          faint: '#8a7370',
        },
        inkLight: {
          DEFAULT: '#2b1f22',
          dim: '#6b5650',
          faint: '#a68f83',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(232,163,172,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,163,172,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
        typingDot: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: 0.4 },
          '30%': { transform: 'translateY(-4px)', opacity: 1 },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        typingDot: 'typingDot 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};