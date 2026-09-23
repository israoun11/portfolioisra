/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base
        cream: '#FBF3EC',
        pearl: '#F7EFEA',
        plum: '#2B1E23',
        // Feminine accent palette — used deliberately, not everywhere
        blush: '#F1B8C4',
        rose: '#D98CA0',
        lilac: '#C9B6E4',
        lavender: '#B9A6D9',
        peach: '#F3C9A6',
        champagne: '#E3C79A',
        burgundy: '#6E2140',
        wine: '#5A1B34',
        gold: '#B68B5C',
        // Legacy aliases kept so existing components resolve
        ivory: '#FBF3EC',
        paper: '#FBF3EC',
        charcoal: '#2B1E23',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        editorial: '68ch',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
