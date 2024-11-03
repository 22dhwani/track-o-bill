/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "300px",
        xl: "1280px",
        "2xl": "1480px",
        "3xl": "1600px",
        // ...defaultTheme.screens,
      },
      colors: {},
    },
  },
  plugins: [],
};
