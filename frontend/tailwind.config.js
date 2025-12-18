/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFF9F0",
        dark: "#2C2C2C",
        light: "#FFFFFF",
        black: "#000000",
        purple: "#DABCFC",
        yellow: "#FDE67B",
        coral: "#FFAD71",
        pink: "#EB818B",
        blue: "#574CFF",
        lightBlue: "#9AAAFF",
        teal: "#39C4BD",
        orange: "#FF9900",
        "black-50": "rgba(0,0,0,0.5)",
        "black-60": "rgba(0,0,0,0.6)",
        "border-light": "rgba(0,0,0,0.06)",
        "border-lighter": "rgba(0,0,0,0.02)",
        "border-white-faint": "rgba(255,255,255,0.03)",
      },
      borderRadius: {
        card: "24px",
        soft: "16px",
        pill: "50px",
      },
      fontFamily: {
        garamond: ["Garamond", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
