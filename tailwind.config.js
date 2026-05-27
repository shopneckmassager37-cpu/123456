/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent:       '#D4A853',
        'accent-dim': '#B8903D',
        'accent-glow':'#D4A85320',
        surface:      '#111111',
        's2':         '#1A1A1A',
        's3':         '#242424',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up':  'fade-up 0.7s ease-out forwards',
        'fade-in':  'fade-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
