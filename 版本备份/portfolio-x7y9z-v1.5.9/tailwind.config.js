/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22C45E',
        secondary: '#1CFF93',
        dark: '#1D1D20',
        darker: '#101010',
        black: '#000000',
        card: '#2A2A2A',
        'card-border': '#474747',
        'text-gray': '#A9A9A9',
        'btn-green': '#32CD96'
      },
      fontFamily: {
        sans: ['PingFang SC', 'sans-serif'],
        oppo: ['OPPOSans', 'sans-serif'],
        cervantis: ['Cervanttis', 'serif']
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px', // Safe area width
          '3xl': '1920px', // Maximum width for full layout
        },
      },
      fontSize: {
        '6xl': '3.75rem', // 60px
        '7xl': '4.375rem', // 70px
        '8xl': '5rem', // 80px
        '9xl': '15rem', // 240px for HELLO!
      }
    },
  },
  plugins: [],
} 