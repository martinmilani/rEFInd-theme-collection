// Triggers a production rebuild once a week so the "Popular" ranking picks up
// fresh GA click data (see scripts/fetch-popularity.mjs).
// Needs BUILD_HOOK_URL: a Netlify build hook for the `deploy` branch.
export default async () => {
  const hook = process.env.BUILD_HOOK_URL;
  if (!hook) {
    console.warn("[weekly-rebuild] BUILD_HOOK_URL is not set; skipping");
    return;
  }

  const response = await fetch(hook, { method: "POST" });
  console.log(`[weekly-rebuild] build hook responded ${response.status}`);
};

export const config = { schedule: "@weekly" };
