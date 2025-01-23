import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        estate: {
          primary: '#1a365d',
          secondary: '#2d5a27',
          accent: '#e65d1e',
          light: '#f5f7fa',
          dark: '#1f2937'
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
