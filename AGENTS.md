# Agent Guidelines: rEFInd Themes Collection

This repository is an Astro-based web application showcasing a collection of rEFInd themes. It uses React for interactive components and Tailwind CSS for styling. It is designed to be a high-performance, accessible, and visually appealing gallery.

## 🛠 Build, Lint, and Development

### Core Commands

- **Development**: `npm run dev` or `npm run start`
  - Runs `astro dev`. Starts a local development server with Hot Module Replacement (HMR).
- **Build**: `npm run build`
  - Runs `astro check && astro build`. This command validates TypeScript/Astro types before generating a static production build in the `dist/` directory.
- **Type Checking**: `npx astro check`
  - Specifically checks `.astro` and `.ts/.tsx` files for type safety. Use this frequently during development.
- **Formatting**: `npm run format`
  - Runs `prettier . --write`. This project uses Prettier with plugins for Astro and Tailwind CSS class sorting.
- **Linting**: `npx eslint .`
  - Uses `eslint.config.js`. Ensure all changes pass linting before submitting.
- **Preview Build**: `npm run preview`
  - Serves the production build locally for final verification.

### Testing

- **Status**: There is currently no automated testing framework (Vitest/Jest) configured.
- **Verification Strategy**:
  1. Run the dev server (`npm run dev`).
  2. Manually verify component behavior (filters, search, carousels).
  3. Check responsiveness across mobile and desktop breakpoints.
  4. Ensure dark mode (localStorage and system preference) works correctly.

---

## 📂 Project Structure

- `src/assets/`: Contains all theme preview images (mostly `.webp`).
- `src/components/`:
  - `.astro`: Static UI elements (Header, Footer, Hero).
  - `.tsx`: Client-side interactive components (ThemeGallery, SearchInput, FilterButton, ImageCarousel).
- `src/data/themes.json`: The single source of truth for theme data.
- `src/icons/`: SVG icons provided as both Astro and React components to ensure compatibility.
- `src/layouts/`: Base HTML structure and shared styles.
- `src/pages/`: Routing logic. The main entry point is `index.astro`.
- `src/styles/`: Global CSS and Tailwind directives.

---

## 🎨 Code Style & Conventions

### 1. Frameworks & Libraries

- **Astro (v5)**: Used for the outer shell, SEO, and static content.
- **React (v19)**: Used for the dynamic gallery functionality. Note the use of `client:load` or `client:visible` directives in Astro components if interactivity is needed.
- **Tailwind CSS**: Primary styling method. Avoid custom CSS in `.astro` files; use utility classes.
- **Dracula Theme**: Integrated via `tailwind-dracula`. Use colors like `dracula-400` (purple), `dracula-500` (pink), etc.
- **Flowbite**: Integrated via CDN for specific UI behaviors like tooltips or modals.

### 2. Component Structure

- **Astro Components**:
  - Keep logic in the frontmatter (`---` block).
  - Use `interface Props` for type definitions.
  - Use standard HTML tags and Tailwind classes.
- **React Components**:
  - Use functional components and modern hooks (`useState`, `useMemo`, `useCallback`).
  - Use `type Props` for type definitions.
  - Ensure compatibility with React 19 (e.g., proper handling of `ref` and `key`).

### 3. Imports & Path Aliases

Always use path aliases defined in `tsconfig.json`. NEVER use relative paths for deep nesting.

- `@src/*` -> `src/*`
- `@components/*` -> `src/components/*`
- `@icons/*` -> `src/icons/*`
- `@images/*` -> `src/assets/*`

Example:

```tsx
import GitHubIcon from "@src/icons/GitHubIcon.tsx";
import Card from "@components/Card";
import themes from "@src/data/themes.json";
```

### 4. Data Management

- **Themes**: All theme information is stored in `src/data/themes.json`.
- **Schema**:
  - `id`: Unique string (usually slugified name).
  - `name`: Display name.
  - `description`: Short summary.
  - `link`: URL to the repository.
  - `user`/`user_url`: Creator details.
  - `images`: Array of paths to images in `src/assets/`.
  - `recently_added`: Boolean for the "New!" badge.
  - `creation_date`: ISO string (YYYY-MM-DD).

### 5. Naming Conventions

- **Components**: PascalCase (`ThemeGallery.tsx`).
- **Styles**: Standard Tailwind utility classes.
- **Assets**: kebab-case (`my-theme-preview.webp`).
- **Variables**: camelCase.

### 6. Error Handling & Typing

- **TypeScript**: Strict mode is enabled. Avoid `any` at all costs.
- **Safety**: Use optional chaining (`?.`) when accessing theme data that might be missing or incomplete.
- **Dynamic Assets**: Use `import.meta.glob` for loading images dynamically in React components to ensure they are processed by Astro's build pipeline.

### 7. Formatting

- **Prettier**: Required for all files. Tailwind classes MUST be sorted according to the `prettier-plugin-tailwindcss` plugin logic.

---

## 🚀 Proactive Tasks for Agents

### Adding a New Theme

1. Add the preview image to `src/assets/` as a `.webp` file.
2. Update `src/data/themes.json` with the new theme entry.
3. Set `recently_added: true` and update the `creation_date`.
4. Run `npm run build` to verify the new data passes the Zod schema validation in `content.config.ts`.

### Modifying UI

1. Ensure changes support both light and dark modes (use `dark:` prefix).
2. Maintain mobile responsiveness (check `md:`, `lg:`, `xl:` prefixes).
3. If creating a new icon, ensure it's added to `src/icons/` in both `.astro` and `.tsx` formats if usage spans both frameworks.

### Code Maintenance

1. Regularly run `npx astro check` to catch regression in types.
2. Ensure accessibility (a11y) by using proper ARIA labels and alt text for images.
