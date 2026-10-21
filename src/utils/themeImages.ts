import type { CollectionEntry } from "astro:content";

const images = import.meta.glob<{
  default: ImageMetadata;
}>("/src/assets/*.webp", { eager: true });

// Resolves a theme's `images` entries plus the image named after its repo
// (`owner/repo` → `/src/assets/owner--repo.webp`) to processed URLs.
// Missing images are dropped silently.
export function resolveThemeImages(theme: CollectionEntry<"themes">): string[] {
  const imagePaths = [
    ...theme.data.images.map((image: string) => images[image]?.default.src),
    images[`/src/assets/${theme.data.link.slice(19).replace(/\//g, "--")}.webp`]
      ?.default.src
  ];

  return imagePaths.filter((src): src is string => Boolean(src));
}
