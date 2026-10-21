// `https://github.com/Owner/Repo` → `owner--repo`
export function themeSlug(link: string): string {
  return link
    .replace(/^https:\/\/github\.com\//i, "")
    .replace(/\/+$/, "")
    .replace(/\//g, "--")
    .toLowerCase();
}

// Lowercased, trailing-slash-free URL used to match GA click data to themes
export function normalizeLink(link: string): string {
  return link.trim().replace(/\/+$/, "").toLowerCase();
}

// Last path segment of the repo URL, used as the install folder name
export function repoName(link: string): string {
  return link.replace(/\/+$/, "").split("/").pop() ?? "theme-name";
}
