// Refreshes src/data/popularity.json with GitHub repo clicks from GA4.
// Runs before every build. Without credentials, or if GA fails, it keeps the
// committed snapshot and exits 0 so the build never breaks.
//
// Env: GA_PROPERTY_ID, GA_SERVICE_ACCOUNT_KEY (service-account JSON)
import { writeFile } from "node:fs/promises";

const OUTPUT = new URL("../src/data/popularity.json", import.meta.url);
const DAYS = 90;

// Same normalisation as src/utils/themeSlug.ts normalizeLink, plus dropping
// query strings and fragments that GA records (e.g. ?tab=readme-ov-file)
function normalizeLink(url) {
  return url.trim().split(/[?#]/)[0].replace(/\/+$/, "").toLowerCase();
}

async function main() {
  const { GA_PROPERTY_ID, GA_SERVICE_ACCOUNT_KEY } = process.env;
  if (!GA_PROPERTY_ID || !GA_SERVICE_ACCOUNT_KEY) {
    console.warn(
      "[popularity] GA_PROPERTY_ID / GA_SERVICE_ACCOUNT_KEY not set; keeping committed snapshot"
    );
    return;
  }

  const { BetaAnalyticsDataClient } = await import("@google-analytics/data");
  const client = new BetaAnalyticsDataClient({
    credentials: JSON.parse(GA_SERVICE_ACCOUNT_KEY)
  });

  const [response] = await client.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: "yesterday" }],
    dimensions: [{ name: "linkUrl" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      andGroup: {
        expressions: [
          {
            filter: {
              fieldName: "eventName",
              stringFilter: { matchType: "EXACT", value: "click" }
            }
          },
          {
            filter: {
              fieldName: "linkUrl",
              stringFilter: {
                matchType: "BEGINS_WITH",
                value: "https://github.com/",
                caseSensitive: false
              }
            }
          }
        ]
      }
    },
    limit: 1000
  });

  const clicks = {};
  for (const row of response.rows ?? []) {
    const link = normalizeLink(row.dimensionValues[0].value);
    clicks[link] = (clicks[link] ?? 0) + Number(row.metricValues[0].value);
  }

  if (Object.keys(clicks).length === 0) {
    console.warn(
      "[popularity] GA returned no clicks; keeping committed snapshot"
    );
    return;
  }

  const data = { generatedAt: new Date().toISOString(), days: DAYS, clicks };
  await writeFile(OUTPUT, JSON.stringify(data, null, 2) + "\n");
  console.log(
    `[popularity] wrote ${Object.keys(clicks).length} links from the last ${DAYS} days`
  );
}

main().catch((error) => {
  console.warn(
    `[popularity] GA fetch failed; keeping committed snapshot: ${error.message}`
  );
});
