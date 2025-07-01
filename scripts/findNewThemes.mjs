import fs from "fs";
import https from "https";
import process from "node:process";

const DATA_PATH = "src/data/themes.json";
const OUTPUT_PATH = "new-themes-found.json";

function fetchGitHubThemes() {
  const query = encodeURIComponent("refind theme in:name,description");
  const url = `https://api.github.com/search/repositories?q=${query}&sort=updated&order=desc&per_page=20`;
  const options = {
    headers: {
      "User-Agent": "GitHub Actions",
      Accept: "application/vnd.github.v3+json"
    }
  };

  return new Promise((resolve, reject) => {
    https
      .get(url, options, (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          const json = JSON.parse(raw);
          const repos = json.items || [];
          const simplified = repos.map((repo) => ({
            name: repo.name,
            description: repo.description || "",
            link: repo.html_url,
            user: repo.owner.login,
            user_url: repo.owner.html_url,
            isNew: true
          }));
          resolve(simplified);
        });
      })
      .on("error", reject);
  });
}

function loadExistingThemes() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const existing = JSON.parse(raw);
  const links = new Set(existing.map((theme) => theme.link));
  return links;
}

async function main() {
  const existingLinks = loadExistingThemes();
  const found = await fetchGitHubThemes();

  const newOnes = found.filter((item) => !existingLinks.has(item.link));
  if (newOnes.length === 0) {
    console.log("✅ No new themes found.");
    process.exit(0);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(newOnes, null, 2));
  console.log(`📦 Found ${newOnes.length} new themes → ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("❌ Error fetching themes:", err);
  process.exit(1);
});
