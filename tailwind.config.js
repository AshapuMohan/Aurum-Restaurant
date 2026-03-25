/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#C9971C',
          600: '#B8860B',
          700: '#92661a',
          800: '#78350f',
          900: '#451a03',
        },
        dark: {
          50: '#FFFFFF',
          100: '#FAF8F3',
          200: '#F5F0E8',
          300: '#EBE5DA',
          400: '#DFD8CC',
        },
        cream: {
          50: '#1a1a1a',
          100: '#2a2a2a',
          200: '#404040',
          300: '#555555',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9971C 0%, #fbbf24 50%, #C9971C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F3 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.95) 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'scroll-down': 'scroll-down 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,151,28,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201,151,28,0)' },
        },
        'scroll-down': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(12px)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(201,151,28,0.3)',
        'gold-lg': '0 8px 40px rgba(201,151,28,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
        'card': '0 4px 32px rgba(0,0,0,0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
