/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#d9d9d9",
        "secondary": "#8787b1",
      },
      backgroundImage: {
        'page-bg': "url('/src/assets/img/bg_hero.jpg')",
        'box-bg': "url('/src/assets/img/bg_product.jpg')",
        'custom-gradient': 'linear-gradient(94deg, #a93eff, #5e40de 51%, #00b3ff)',
      },
      fontFamily: {
        oxanium: ['Oxanium', 'sans-serif'],
      },
    },
  },
  plugins: [],
}