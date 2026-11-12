import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "@/lib/business";

// Demo mode: crawling is allowed so crawlers can read the page-level noindex, and no sitemap is listed.
// Live mode: same rules, plus the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(IS_LIVE ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  };
}
