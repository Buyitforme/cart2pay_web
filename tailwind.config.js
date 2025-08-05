/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
     keyframes: {
      dots: {
          '0%, 20%': { content: "' '" },
          '40%': { content: "'.'" },
          '60%': { content: "'..'" },
          '80%, 100%': { content: "'...'" },
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
   dots: 'dots 1.2s steps(4, end) infinite',
},

      fontFamily: {
        heading: ["Montserrat", "ui-sans-serif", "system-ui"],
        body: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        accent: "#1E2A47",
        primary: "#708238",
        highlight: "#f4f7ee",

        background: "#F5F7FA",
        input: "B0BEC5",
        card: "B0BEC5",
        sub_primary: "#8FAC6A",
        white: "#FAFAFA",
        muted_white: "#DCDCDC",
        error_red: "#c81828",
      },
    },
  },
  plugins: [],
};
