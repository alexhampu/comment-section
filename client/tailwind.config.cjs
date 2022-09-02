/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: 2
    },
    screens: {
      xl: '800px',
    },
    extend: {
      colors: {
        primary: '#7e34f6'
      }
    },
  },
  plugins: [],
}
