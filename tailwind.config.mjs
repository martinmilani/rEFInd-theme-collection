/** @type {import('tailwindcss').Config} */
import tailwindDracula from "tailwind-dracula";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./src/styles/global.css"
  ],
  theme: {
    extend: {}
  },
  plugins: [tailwindDracula()]
};
