/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  safelist: [
    // All text sizes including large ones
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "text-8xl",
    "text-9xl",
    // Responsive variants
    "sm:text-5xl",
    "sm:text-6xl",
    "sm:text-7xl",
    "sm:text-8xl",
    "sm:text-9xl",
    "md:text-5xl",
    "md:text-6xl",
    "md:text-7xl",
    "md:text-8xl",
    "md:text-9xl",
    "lg:text-5xl",
    "lg:text-6xl",
    "lg:text-7xl",
    "lg:text-8xl",
    "lg:text-9xl",
    "xl:text-5xl",
    "xl:text-6xl",
    "xl:text-7xl",
    "xl:text-8xl",
    "xl:text-9xl",

    // Or use pattern matching (more efficient)
    {
      pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
      variants: ["sm", "md", "lg", "xl"],
    },
  ],
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
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        body: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#F38C05",
        primary_light: "#FFB547",
        primary_dark: "#dd8006ff",
        secondary: "#054B2F",
        secondary_light: "#099f63ff",
        secondary_dark: "#1C4A3F",
        highlight: "#E8F7F0",
        text: {
          primary: "#0F1724",
          secondary: "#403D39",
        },
        links: "#CAEDCC",
        background: "#F6FBFF",
        input: {
          bg: "#E6F0FA",
          value: "#10111A",
          border: "#E6F0FA",
        },
        card: "#FFFFFF",
        border: "#E6F0FA",
        white: "#FFFFFF",
        error: "#820d17ff",
        error_light: "#a4101dff",
      },
    },
  },
  plugins: [],
};
