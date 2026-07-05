/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream:    "#FDF8F3",
        forest:   "#234038",
        sage:     "#9DB8A1",
        lavender: "#B8A0E0",
        gold:     "#D4A017",
        ink:      "#2D2D2D",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};