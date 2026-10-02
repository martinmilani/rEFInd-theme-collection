---
name: rEFInd Themes Collection
description: A quiet gray gallery that lets boot-screen previews carry the page.
colors:
  brand-violet: "#a771f6"
  control-violet: "#6916e0"
  control-violet-dark: "#7d2eed"
  surface-light: "#f9fafb"
  surface-dark: "#111827"
  ink-light: "#111827"
  ink-dark: "#ffffff"
  muted-light: "#6b7280"
  muted-dark: "#9ca3af"
  border-light: "#d1d5db"
  border-dark: "#4b5563"
  field-light: "#f9fafb"
  field-dark: "#111827"
typography:
  display:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
  title:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
  body:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  label:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  md: "8px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  filter-pill:
    backgroundColor: "transparent"
    textColor: "{colors.muted-light}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  filter-pill-active:
    backgroundColor: "{colors.control-violet}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  search-field:
    backgroundColor: "{colors.field-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.md}"
    padding: "16px 16px"
  search-submit:
    backgroundColor: "{colors.control-violet}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  new-badge:
    backgroundColor: "{colors.brand-violet}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
---

# Design System: rEFInd Themes Collection

## Overview

**Creative North Star: "The Quiet Gallery"**

The chrome is deliberately neutral: near-white or near-black gray surfaces, one variable sans (Onest), and plain, familiar controls. The boot-screen previews are the only visually loud things on the page, so the interface steps back and lets them be judged.

Violet is the site's identity and appears sparingly (logo hover, "rEFInd" in the headline, the New badge, author hover). Violet also marks interactive controls (filters, search); only the shade differs. The look is Flowbite-default in spirit: rounded-lg, pill filters, soft focus rings. Light and dark modes are equal citizens.

**Key Characteristics:**
- Neutral gray surfaces; previews supply the color.
- One accent: violet for identity and controls.
- Plain, familiar components with no ornament.
- Single fixed top bar, centered hero, responsive card grid.

## Colors

Cool gray neutrals with a single violet accent.

### Primary
- **Dracula Violet** (#a771f6, dracula-400): brand moments only: "rEFInd" link in the headline, New badge, hover on logo, author links and nav items, active carousel bullet.

### Secondary
- **Control Violet** (#6916e0 light, #7d2eed dark; dracula-700/600): active filter pill, search submit button; search focus border uses dracula-500.

### Neutral
- **Paper Gray** (#f9fafb): light page and top bar background, search field.
- **Night Gray** (#111827): dark page, top bar and search field background; light-mode body ink.
- **Slate Muted** (#6b7280 / #9ca3af): hero lead paragraph in light / dark.
- **Hairline** (#d1d5db / #4b5563): field and inactive pill borders in light / dark.

### Named Rules
**The Previews Speak Rule.** No decorative color competes with theme screenshots; chrome stays neutral.
**The One Accent Rule.** Violet carries both identity and controls; don't add a second hue.

## Typography

**Display, Body and Label Font:** Onest Variable (with system-ui, sans-serif)

**Character:** One friendly geometric sans at several weights; hierarchy comes from size and weight, not from a second face.

### Hierarchy
- **Display** (800, 2.25rem to 3.75rem, line-height 1, tracking tight): hero headline.
- **Lead** (400, 1.125 to 1.25rem, muted gray): hero paragraph.
- **Title** (500, 1rem): card theme name.
- **Body** (400, 0.875rem, 70% opacity): card description (single line, clamped), controls.
- **Label** (500, 0.75rem): New badge, author handle.

## Layout

Fixed top bar (max-w screen-xl, 2xl on large screens) above a centered hero (pt-28), then a container grid: 1 column on mobile, 2 at md, 3 at lg, 4 at xl, with 32px gaps. Search is centered at max-w-lg above centered, wrapping filter pills. Spacing follows Tailwind's 4px scale; mobile gutter is 16px.

## Elevation & Depth

Flat. No card shadows; depth comes from rounded image crops and, on desktop, a hover scale (1.05) on the preview. The only shadow is a text-shadow on carousel arrows for legibility over images.

## Shapes

Rounded-lg (8px) for preview images, search field and submit button; full pills for filters and the badge; circular carousel pagination dots. Preview frames are 16:9.

## Components

Plain and familiar: Flowbite-style defaults with soft focus rings.

### Buttons
- **Shape:** 8px radius (submit), full pill (filters).
- **Primary:** dracula-600 fill, white text, 8px 16px padding.
- **Hover / Focus:** dracula-700 on hover; 4px dracula-200 focus ring on keyboard focus (dracula-800 in dark).

### Chips (Filter pills)
- **Style:** 1px gray border, gray text; active is violet fill with white text.
- **State:** inactive hover turns border and text violet; 200ms ease transition.

### Cards
- **Corner Style:** 8px on the preview; no card container.
- **Background:** none; text sits directly on the page.
- **Border:** none.
- **Internal Padding:** 4px 16px under the image; name, one-line description, author with GitHub icon.

### Inputs / Fields
- **Style:** 1px gray border, gray-50 (light) or gray-900 (dark) fill, 8px radius, tall (py-4).
- **Focus:** border shifts to dracula-500.

### Navigation
Fixed bar on page background: logo mark left (violet on hover), FAQ and theme-switcher right; collapses to a hamburger below md.

### Image Carousel (signature)
Swiper inside the 16:9 preview. Translucent white pagination dots (active dot violet, 8px), small white arrows with a text-shadow, disabled arrows at 20% opacity.

## Do's and Don'ts

### Do:
- **Do** keep chrome neutral and let previews carry color.
- **Do** use violet for identity, hover and controls.
- **Do** support light and dark mode for every new element.
- **Do** use Onest Variable across all text.

### Don't:
- **Don't** add shadows or borders around cards; the Quiet Gallery stays flat.
- **Don't** introduce a second accent hue.
- **Don't** put decorative imagery near the previews.
