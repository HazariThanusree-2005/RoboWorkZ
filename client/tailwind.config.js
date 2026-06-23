/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8B5CF6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        accent: '#A855F7',
        glow: '#C084FC',
        dark: {
          DEFAULT: '#120A2A',
          50: '#f0ecf7',
          100: '#d8ceed',
          200: '#b4a0d9',
          300: '#8b6cc1',
          400: '#6b45a8',
          500: '#4e2d80',
          600: '#3d2365',
          700: '#2e1065',
          800: '#120A2A',
          900: '#0B061F',
          950: '#050312',
        },
      },
      fontFamily: {
        ethno: ['"Ethnocentric"', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        cabin: ['Manrope', 'sans-serif'],
        instrument: ['"Space Grotesk"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-purple': 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.4)',
        'glow-xl': '0 0 60px rgba(139, 92, 246, 0.5)',
        'glow-neon': '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(139, 92, 246, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.2)',
      },
      borderColor: {
        'glow': 'rgba(168, 85, 247, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'particle': 'particle 15s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'eye-blink': 'eyeBlink 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) rotate(720deg)', opacity: '0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.015)' },
        },
        eyeBlink: {
          '0%, 42%, 44%, 100%': { scaleY: '1' },
          '43%': { scaleY: '0.1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
