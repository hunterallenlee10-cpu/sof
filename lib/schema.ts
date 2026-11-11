// JSON-LD. Only true things: no ratings, reviews, prices, awards or invented dates.
import { BUSINESS, MAPS_URL, SITE_URL } from "./business";
import { BRUDERGARTEN_HOURS, MARKET_HOURS, WEEKDAYS, type Span } from "./hours";
import { FAQ } from "./faq";
import { PHOTOS } from "./photos";

const MARKET_ID = `${SITE_URL}/#market`;
const hhmm = (m: number) => `${String(Math.floor((m % 1440) / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Group days with identical hours into OpeningHoursSpecification entries. */
function openingHours(table: Record<number, Span>) {
  const groups = new Map<string, string[]>();
  for (const wd of [1, 2, 3, 4, 5, 6, 0]) {
    const span = table[wd];
    if (!span) continue;
    const key = `${hhmm(span.open)}-${hhmm(span.close)}`;
    groups.set(key, [...(groups.get(key) ?? []), WEEKDAYS[wd]]);
  }
  return [...groups.entries()].map(([key, days]) => {
    const [opens, closes] = key.split("-");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes };
  });
}

const address = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS.street,
  addressLocality: BUSINESS.city,
  addressRegion: BUSINESS.region,
  postalCode: BUSINESS.postalCode,
  addressCountry: BUSINESS.country,
};

export function marketSchema() {
  return {
    "@type": "ShoppingCenter",
    "@id": MARKET_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.shortName,
    description:
      "A two-floor local makers market with over 90 locally owned shops and services, eateries and a beer garden in the former Leonardtown Building Supply on Duke Street in Leonardtown, Maryland.",
    url: `${SITE_URL}/`,
    telephone: BUSINESS.phoneSchema,
    email: BUSINESS.email,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}${PHOTOS.storefront.src}`,
    address,
    geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    hasMap: MAPS_URL,
    openingHoursSpecification: openingHours(MARKET_HOURS),
    foundingDate: String(BUSINESS.opened),
    sameAs: [BUSINESS.facebook, BUSINESS.instagram],
  };
}

export function brudergartenSchema() {
  return {
    "@type": "BarOrPub",
    "@id": `${SITE_URL}/#brudergarten`,
    name: "Brudergarten Beer Garden",
    url: BUSINESS.brudergarten,
    address,
    openingHoursSpecification: openingHours(BRUDERGARTEN_HOURS),
    containedInPlace: { "@id": MARKET_ID },
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
