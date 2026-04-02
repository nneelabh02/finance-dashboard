export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        bgLight: "#F8FAFC",
        bgDark: "#0F172A",
        cardLight: "#FFFFFF",
        cardDark: "#1E293B",
        primary: "#6366F1",
      },
    },
  },
  plugins: [],
};