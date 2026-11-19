import type { Config } from "tailwindcss";

// Accent colours come from CSS variables in app/globals.css (the single place to retheme).
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0709",
        panel: "#130d10",
        bone: "#f6eef1",
        accent: { 200: v("accent-200"), 300: v("accent-300"), 400: v("accent"), 500: v("accent-500"), 600: v("accent-600") },
        accent2: { 300: v("accent2-300"), 400: v("accent2") },
      },
    },
  },
} satisfies Config;
