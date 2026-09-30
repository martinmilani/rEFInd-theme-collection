# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See `AGENTS.md` for detailed style conventions (path aliases, Tailwind/Dracula, Prettier class sorting, a11y, dark mode). This file covers commands and architecture only.

## Commands

The lockfile is `pnpm-lock.yaml` (README uses pnpm); `npm run` also works.

- `pnpm dev` — dev server at `localhost:4321`
- `pnpm build` — runs `astro check && astro build` (type-checks first, output in `dist/`)
- `pnpm astro check` — type check only
- `pnpm format` — Prettier (Astro + Tailwind class sorting plugins)
- `npx eslint .` — lint
- No test framework is configured; verify manually in the dev server (filters, search, carousel, dark mode, mobile).

## Architecture

Static Astro 5 site (single page, `src/pages/index.astro`) with a React island for the gallery.

**Data flow:** `src/data/themes.json` → Astro content collection `themes` (`file()` loader, Zod schema in `src/content.config.ts`) → `index.astro` passes entries to `ThemeGallery.tsx` (React, hydrated) → `Card.tsx` / `ImageCarousel.tsx`. Adding a theme means editing the JSON, so the schema (all fields required, including `recently_added` and `creation_date`) is validated at build time.

**Image resolution (non-obvious):** `ThemeGallery.tsx` uses `import.meta.glob("/src/assets/*.webp", { eager: true })` and maps each theme's `images` entries (paths like `/src/assets/foo.webp`, which must match glob keys exactly) to processed URLs. It additionally auto-picks an image named after the repo link: `link.slice(19)` (strips `https://github.com/`) with `/` replaced by `--`, e.g. `owner/repo` → `/src/assets/owner--repo.webp`. Missing images are silently filtered out, so a typo in a path shows up as a missing preview rather than an error.

**Path aliases caveat:** `tsconfig.json` maps `@images/*` to `src/images/*`, but images actually live in `src/assets/` (AGENTS.md says `@images/*` → `src/assets/*`; that doesn't match the config). Reference images by `/src/assets/...` path as the existing code does.

Other notes: `src/icons/` holds icons as both `.astro` and `.tsx`; `src/utils/getCloudinaryPublicId.tsx` is a helper; site URL/sitemap are configured in `astro.config.mjs` (deployed on Netlify).
