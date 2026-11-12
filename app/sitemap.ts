import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "@/lib/business";

// Last real content change for each page. Update when the page changes.
const UPDATED = { home: "2026-11-11", visit: "2026-11-11" };

export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_LIVE) return []; // demo mode lists nothing
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(UPDATED.home), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/visit`, lastModified: new Date(UPDATED.visit), changeFrequency: "monthly", priority: 0.8 },
  ];
}
