/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        dark: '#05070D',
        surface: '#0B0F1A',
        card: '#101625',
        accent: '#7B61FF',
        green: '#22C55E',
        muted: '#8590A6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        speedlines: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.6)' },
          '50%': { boxShadow: '0 0 0 12px rgba(34, 197, 94, 0)' },
        },
      },
      animation: {
        speedlines: 'speedlines 1.2s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
