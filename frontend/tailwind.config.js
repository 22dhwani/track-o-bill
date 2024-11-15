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
      colors: {
        primaryPurple: "#9333ea",
        primaeryYellow: "#FBE882",
        primaeryGreen: "#16a34a",
        mediumGray: "#7987a1",
        dimGray: "#1A1B1C",

        dimWhite: "#FAFAFA",
        textColor: "rgb(51 65 85)",
      },
    },
  },
  plugins: [],
};
