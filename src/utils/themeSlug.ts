// `https://github.com/Owner/Repo?tab=readme-ov-file` → `Owner/Repo`
function repoPath(link: string): string {
  return link
    .trim()
    .split(/[?#]/)[0]
    .replace(/^https:\/\/github\.com\//i, "")
    .replace(/\/+$/, "");
}

// `https://github.com/Owner/Repo` → `owner--repo`
export function themeSlug(link: string): string {
  return repoPath(link).replace(/\//g, "--").toLowerCase();
}

// Lowercased URL without query, fragment or trailing slash, used to match GA
// click data to themes (keep in sync with scripts/fetch-popularity.mjs)
export function normalizeLink(link: string): string {
  return `https://github.com/${repoPath(link)}`.toLowerCase();
}

// Repo name, used as the install folder name
export function repoName(link: string): string {
  return repoPath(link).split("/").pop() || "theme-name";
}

// Repo URL without query or fragment, for clone commands
export function repoUrl(link: string): string {
  return `https://github.com/${repoPath(link)}`;
}
