import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#7C1C1C",     // Saperavi Red
          secondary: "#2F5C8C",   // Tushetian Blue
          accent: "#FFD460",      // Khinkali Yellow
          surface: "#FAFAFA",     // Soft White
          muted: "#C5C5C5",       // Sulfur Gray
        },
      },
    },
  },
  plugins: [],
};

export default config;
