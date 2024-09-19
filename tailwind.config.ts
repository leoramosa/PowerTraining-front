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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#F9911E",
        primarLight: "#fba83c",
        secondary: "#000000",
        white: "#ffffff",
        dark: "#343a40",
        lightGray: "#f8f9fa",
        success: "#17c964",
        successBg: "#17c96433",
        warning: "#f8c12a",
        warningBg: "#f8c12a33",
        delete: "#f31260",
        deleteBg: "#f3126033",
      },
    },
  },
  plugins: [],
};
export default config;
