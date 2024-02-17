/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "miracle-dark-blue":"#0D416B",
        "miracle-light-blue":"#00AAE7",
        "miracle-blue-tint":"#DFF2FE",
        "miracle-white":"#000000",
        "miracle-white":"#FFFFFF",
      }
    },
  },
  plugins: [],
}

