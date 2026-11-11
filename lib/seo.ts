import type { Metadata } from "next";
import { BUSINESS } from "./business";

/** Page metadata with the shared Open Graph and Twitter fields (Next merges these shallowly, so set them per page). */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: BUSINESS.name, locale: "en_US", title, description, url: path },
    twitter: { card: "summary_large_image", title, description },
  };
}
