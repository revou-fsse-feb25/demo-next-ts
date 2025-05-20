/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          bg: "var(--card-bg)",
          text: "var(--card-text)",
        },
        code: {
          bg: "var(--code-bg)",
          text: "var(--code-text)",
        },
        error: "var(--error)",
        success: "var(--success)",
      },
    },
  },
  plugins: [],
};
