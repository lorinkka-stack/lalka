import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#EEF2F8",
          100: "#D5DDEF",
          200: "#ADC0E0",
          300: "#7A9ACB",
          400: "#4E79B5",
          500: "#2C5AA0",
          600: "#1E3F73",
          700: "#162E55",
          800: "#0F2040",
          900: "#0A1628",
          950: "#060E1A",
        },
        solar: {
          50:  "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "solar-gradient": "linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #0D2137 100%)",
        "green-gradient": "linear-gradient(135deg, #15803D 0%, #22C55E 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
