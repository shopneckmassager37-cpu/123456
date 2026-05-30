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
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%':      { opacity: '0.65', transform: 'scale(1.08)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'gradient-border': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
      },
      animation: {
        'fade-up':        'fade-up 0.7s ease-out forwards',
        'fade-in':        'fade-in 0.6s ease-out forwards',
        'float':          'float 5s ease-in-out infinite',
        'float-slow':     'float 7s ease-in-out infinite',
        'shimmer':        'shimmer 3s linear infinite',
        'glow-pulse':     'glow-pulse 3s ease-in-out infinite',
        'spin-slow':      'spin-slow 8s linear infinite',
        'gradient-border':'gradient-border 4s ease infinite',
        'dot-pulse':      'dot-pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
