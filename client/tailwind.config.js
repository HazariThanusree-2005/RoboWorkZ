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
          DEFAULT: '#7b39fc',
          50: '#f3edff',
          100: '#e4d6ff',
          200: '#ccb3ff',
          300: '#ae82ff',
          400: '#9254ff',
          500: '#7b39fc',
          600: '#6b1ff0',
          700: '#5b15d4',
          800: '#4b12ab',
          900: '#3d1088',
          950: '#250666',
        },
        dark: {
          DEFAULT: '#2b2344',
          50: '#f0ecf7',
          100: '#d8ceed',
          200: '#b4a0d9',
          300: '#8b6cc1',
          400: '#6b45a8',
          500: '#4e2d80',
          600: '#3d2365',
          700: '#2b2344',
          800: '#1a1530',
          900: '#0f0d1d',
          950: '#08060f',
        },
        accent: '#7b39fc',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        cabin: ['Manrope', 'sans-serif'],
        instrument: ['"Space Grotesk"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-purple': 'radial-gradient(circle, rgba(123,57,252,0.15) 0%, transparent 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(123, 57, 252, 0.3)',
        'glow-lg': '0 0 40px rgba(123, 57, 252, 0.4)',
        'glow-xl': '0 0 60px rgba(123, 57, 252, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'particle': 'particle 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(123, 57, 252, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(123, 57, 252, 0.6)' },
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
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
