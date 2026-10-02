# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Linux and multi-boot hobbyists who use (or are considering) the rEFInd UEFI boot manager. They arrive wanting to personalize their boot screen: they browse previews, compare looks, then follow the link to a theme's GitHub repository to install it. Theme authors are a secondary audience only through the submission path (PR or issue with a repo link); this was not confirmed as a design target.

## Product Purpose

A curated, single-page gallery of rEFInd themes with screenshots and direct links to each source repository. Success is a visitor finding a theme they like quickly and reaching its repo, with the original author credited.

## Positioning

Handpicked rather than exhaustive, and every theme has a preview image, in one searchable, filterable page. Authors are credited and linked.

## Operating Context

Themes live in GitHub repositories; the site only previews and links. Themes are added by editing `src/data/themes.json` after a PR or issue submission, and are reviewed before acceptance.

## Capabilities and Constraints

- Static Astro site with a React gallery island, deployed on Netlify; single page, no backend.
- Search, filters, per-theme image carousel, light/dark mode, mobile-friendly layout.
- Every theme entry requires name, description, link, user, user_url, images, creation_date, recently_added.
- Themes without previews are not listed.
- Visual direction is open; no binding visual constraints were set in this session.

## Brand Commitments

Name: "rEFInd Themes Collection". Described as clean, minimalist and colorful themes. MIT licensed; attribution and links back to the site are appreciated.

## Evidence on Hand

- ~148 `link` entries in `src/data/themes.json` with preview images in `src/assets/*.webp`.
- Live site: refind-themes-collection.netlify.app; screenshot at `public/refind-themes-collections-screenshot.png`.
- Mentioned in an Arco Linux YouTube video ("4053 REFIND – 6 Themes to Choose From"). No testimonials or usage metrics exist; do not fabricate any.

## Product Principles

- Previews are the product: the visitor judges a theme by seeing it.
- Curation over volume; every listed theme has an image.
- Credit and link authors; the site sends people to the source, not away from it.
- Stay a fast, static, single page that works on phones.
- Adding a theme stays a data edit, not a code change.
