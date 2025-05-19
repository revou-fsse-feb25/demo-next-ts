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
          light: "#4338ca", // indigo-700 - darker for better contrast in light mode
          dark: "#6366f1", // indigo-500
        },
        secondary: {
          light: "#0369a1", // sky-700
          dark: "#38bdf8", // sky-400
        },
        background: {
          light: "#f8fafc", // slate-50
          dark: "#0f172a", // slate-900
        },
        card: {
          light: "#ffffff", // white
          dark: "#1e293b", // slate-800
        },
        text: {
          light: "#0f172a", // slate-900
          dark: "#f1f5f9", // slate-100
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
