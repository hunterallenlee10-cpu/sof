// Every business fact used on the site. Change it here and it changes everywhere.
// Name, address and phone must match Google, Facebook and Visit St. Mary's exactly.

export const BUSINESS = {
  name: "Shepherd's Old Field Market",
  shortName: "SOF Market",
  // DRAFT: confirm owner names before any About copy (Gerrie and Mike L'Heureux in 2018/2019 press). Not shown on the site.
  street: "22725 Duke Street",
  city: "Leonardtown",
  region: "MD",
  postalCode: "20650",
  country: "US",
  geo: { lat: 38.292805, lng: -76.639082 },
  phoneDisplay: "(240) 309-4067",
  phoneHref: "tel:+12403094067",
  phoneSchema: "+1-240-309-4067",
  // DRAFT: confirm the number takes texts. Until then there is no sms: link to it anywhere.
  email: "shepherdsoldfieldmarket@gmail.com",
  vendorEmail: "MarketingSOFMarket@gmail.com",
  facebook: "https://www.facebook.com/Shepherdsoldfield",
  instagram: "https://www.instagram.com/shepherds_old_field_market/",
  brudergarten: "https://www.brudergarten.com",
  opened: 2018,
  squareFeet: "9,000",
  shopCount: "90+",
  // Their own lines
  welcome: "We can't wait to welcome you!",
  bio: "Marketplace community catalyst that aims to promote redevelopment, community interaction, grassroots local commerce, and historical place attachment",
} as const;

export const ADDRESS_LINE = `${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postalCode}`;

export const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(`Shepherd's Old Field Market, ${ADDRESS_LINE}`);

export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(`Shepherd's Old Field Market, ${ADDRESS_LINE}`) +
  "&output=embed";

// DRAFT: Botanic ordering URL. Until supplied, the link goes to the planner instead.
export const BOTANIC_ORDER_URL: string | null = null;

// DRAFT: confirm reply timing for vendor enquiries.
// DRAFT: Brudergarten events email. Private event enquiries use the general inbox for now.
export const EVENTS_EMAIL = BUSINESS.email;

export const SITE_MODE: "demo" | "live" =
  process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const IS_LIVE = SITE_MODE === "live";
