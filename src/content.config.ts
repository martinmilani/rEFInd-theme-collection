import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const themes = defineCollection({
  loader: file("src/data/themes.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    link: z.string(),
    user: z.string(),
    user_url: z.string(),
    images: z.array(z.string()),
    recently_added: z.boolean(),
    creation_date: z.string()
  })
});

export const collections = {
  themes
};
