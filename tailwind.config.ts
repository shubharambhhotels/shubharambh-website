import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: "#A44A1E",
          light: "#C9652D",
          pale: "#F0DDD0",
        },
        forest: {
          DEFAULT: "#234232",
          light: "#2E5541",
          dark: "#162A20",
        },
        ivory: {
          DEFAULT: "#F7F3EA",
          dark: "#EDE8DC",
        },
        stone: {
          DEFAULT: "#C9B8A5",
          light: "#E8DDD0",
          dark: "#9A8878",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8C84A",
          pale: "#F5EAC8",
        },
        charcoal: {
          DEFAULT: "#1F1F1F",
          mid: "#3A3530",
          light: "#5A5550",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        hind: ["var(--font-hind)", "sans-serif"],
      },
      backgroundImage: {
        "none": "none",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};

export default config;
