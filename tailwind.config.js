/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#2563eb", // blue-600
          dark: "#60a5fa", // blue-400
        },
        secondary: {
          light: "#0369a1", // sky-700
          dark: "#7dd3fc", // sky-300
        },
        background: {
          light: "#f9fafb", // gray-50 (a very light gray for main page background)
          dark: "#111827", // gray-900
        },
        card: {
          light: "#ffffff", // white (for cards and distinct sections)
          dark: "#1f2937", // gray-800
        },
        text: {
          light: "#1f2937", // gray-800 (strong dark gray for text in light mode)
          dark: "#ffffff", // white
        },
      },
      animation: {
        "float-to-cart": "floatToCart 0.8s ease-out forwards",
      },
      keyframes: {
        floatToCart: {
          "0%": { transform: "scale(1) translateY(0)", opacity: "1" },
          "50%": { transform: "scale(0.8) translateY(-10px)", opacity: "0.8" },
          "100%": {
            transform: "scale(0.2) translateY(-50px) translateX(50px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
