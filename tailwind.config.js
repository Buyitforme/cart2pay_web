/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      keyframes: {
        dots: {
          "0%, 20%": { content: "' '" },
          "40%": { content: "'.'" },
          "60%": { content: "'..'" },
          "80%, 100%": { content: "'...'" },
        },

        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        zoom: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.4)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        scroll: "scroll 5s linear infinite",
        zoom: "zoom 1.5s ease-in-out infinite",
        dots: "dots 1.2s steps(4, end) infinite",
      },

      fontFamily: {
        heading: ["Montserrat", "ui-sans-serif", "system-ui"],
        body: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#F38C05",
        primary_lightt: "#FFB547",
        primary_dark: "#C26F04",
        secondary: "#054B2F",
        secondary_light: "#099f63ff",
        secondary_dark: "#043B26",
        highlight: "#E8F7F0",
        text: {
          primary: "#0F1724",
          secondary: "#403D39",
        },
        links: "#CAEDCC",
        background: "#E6F0FA",
        input: {
          bg:"#E6F0FA",
          value:"#10111A",
          border:"#E6F0FA"
        },
        card: "#FFFFFF",
        border:"#E6F0FA",
        white: "#FFFFFF",
        error: "#820d17ff",
                error_light: "#a4101dff",

      },
    },
  },
  plugins: [],
};
