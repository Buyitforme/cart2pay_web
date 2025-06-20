/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 1.5s infinite",
        scroll: "scroll 5s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      fontFamily: {
        heading: ["Montserrat", "ui-sans-serif", "system-ui"],
        body: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        accent: "#1E2A47",
        primary: "#8fac6a",
        background: "#F5F7FA",
        input: "B0BEC5",
        card: "B0BEC5",
      },
    },
  },
  plugins: [],
};

