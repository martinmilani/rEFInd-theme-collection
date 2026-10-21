type EventParams = Record<string, string | number | boolean>;

// Sends a GA4 event; a no-op when gtag is missing (ad blockers, dev, SSR)
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}
