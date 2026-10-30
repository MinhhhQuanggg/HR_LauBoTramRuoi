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
        brand: {
          50: "#fdf2f2",
          100: "#fde8e8",
          200: "#fbd5d5",
          300: "#f8b4b4",
          400: "#f98080",
          500: "#e02424",
          600: "#c81e1e",
          700: "#9b1c1c",
          800: "#8B1E1E", // Primary Nâu đỏ Triều Châu / Trăm Rưỡi
          900: "#6B1414",
          950: "#450a0a",
        },
        gold: {
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        surface: "#F8F9FA",
      },
      borderRadius: {
        "2xl": "16px",
      },
      boxShadow: {
        card: "0 2px 12px 0 rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 24px 0 rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
