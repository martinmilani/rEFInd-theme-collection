import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  image: {
    domains: ["github.com", "raw.githubusercontent.com","camo.githubusercontent.com","user-images.githubusercontent.com","res.cloudinary.com"],
  }
});