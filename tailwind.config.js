/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B9AC90',
        whiteTransparent: 'rgba(255, 255, 255, 0.12)',
        whiteSemiTransparent: 'rgba(255, 255, 255, 0.36)',
        whiteDarkTransparent: 'rgba(255, 255, 255, 0.7)',
      },
    },
    fontFamily: {
      sans: ['Roboto Flex, sans-serif']
    },


  },
  plugins: [],
}
