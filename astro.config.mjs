import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://refind-themes-collection.netlify.app",
  integrations: [tailwind(), sitemap()],
  image: {
    domains: ["res.cloudinary.com"]
  }
});
