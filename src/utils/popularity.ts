import popularity from "@src/data/popularity.json";
import { normalizeLink } from "@src/utils/themeSlug";
import type { CollectionEntry } from "astro:content";

const POPULAR_COUNT = 12;
const POPULAR_MIN_CLICKS = 20;

const clicksByLink: Record<string, number> = popularity.clicks;

export type Popularity = {
  // GitHub repo clicks from GA over `popularity.days`, keyed by theme id
  clicks: Record<string, number>;
  // Ids of the most clicked themes, which get the "Popular" badge
  popularIds: string[];
};

export function getPopularity(themes: CollectionEntry<"themes">[]): Popularity {
  const clicks: Record<string, number> = {};
  for (const theme of themes) {
    clicks[theme.id] = clicksByLink[normalizeLink(theme.data.link)] ?? 0;
  }

  const popularIds = themes
    .filter((theme) => clicks[theme.id] >= POPULAR_MIN_CLICKS)
    .sort((a, b) => clicks[b.id] - clicks[a.id])
    .slice(0, POPULAR_COUNT)
    .map((theme) => theme.id);

  return { clicks, popularIds };
}
