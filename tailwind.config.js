/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ef',
          100: '#dbf0d9',
          200: '#b9e1b7',
          300: '#8fcb8d',
          400: '#62af60',
          500: '#498e47', // main sage green
          600: '#3a7539',
          700: '#305e30',
          800: '#2a4b29',
          900: '#243f23',
          950: '#0f220f',
        },
        secondary: {
          50: '#fdf4f1',
          100: '#fae6df',
          200: '#f5ccbe',
          300: '#eda993',
          400: '#e47d60',
          500: '#dc5c39', // terracotta
          600: '#cc4628',
          700: '#aa3721',
          800: '#8b2f20',
          900: '#732c1f',
          950: '#3e130d',
        },
        accent: {
          50: '#fefbe8',
          100: '#fff8c2',
          200: '#ffee86',
          300: '#ffdd42',
          400: '#fdc911', // honey gold
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'recipe-card': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};