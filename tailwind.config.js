/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        BLACK : '#000000',
        mainDark:'#24303c',
        mainDark2:'#495564',
        mainFaded:'rgba(255, 255, 255, 0.427)',
        mainGrayLoadDark:'#69696972',
      },
    },
  },
  plugins: [],
}


