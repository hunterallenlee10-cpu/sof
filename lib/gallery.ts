// "Inside the Market" gallery: photos 03 to 18. Captions only say what the photo map says.
import type { PhotoKey } from "./photos";

export const GALLERY_FILTERS = ["All", "Shops", "Treats", "Brudergarten", "Seasonal"] as const;
export type GalleryFilter = (typeof GALLERY_FILTERS)[number];

export type GalleryItem = { key: PhotoKey; caption: string; tags: Exclude<GalleryFilter, "All">[] };

export const GALLERY: GalleryItem[] = [
  { key: "booth", caption: "One of a Kind Seashore Creations", tags: ["Shops"] },
  { key: "bayLeather", caption: "Bay Leather", tags: ["Shops"] },
  { key: "spoiledPet", caption: "The Spoiled Pet", tags: ["Shops", "Seasonal"] },
  { key: "julias", caption: "Julia's Asian Store", tags: ["Shops", "Treats"] },
  { key: "crab", caption: "Found at SOF Market", tags: ["Shops"] },
  { key: "comics", caption: "Found at SOF Market", tags: ["Shops"] },
  { key: "katelyns", caption: "Katelyn's Custom Creations", tags: ["Shops"] },
  { key: "navyOreos", caption: "Black Point Chocolates", tags: ["Treats"] },
  { key: "cookies", caption: "Cakes by Amanda", tags: ["Treats", "Seasonal"] },
  { key: "bracelets", caption: "Found at SOF Market", tags: ["Shops"] },
  { key: "chickens", caption: "Found at SOF Market", tags: ["Shops"] },
  { key: "kidsBooks", caption: "Found at SOF Market", tags: ["Shops"] },
  { key: "countdown", caption: "The Christmas Countdown sign", tags: ["Seasonal"] },
  { key: "beerGardenYard", caption: "The Brudergarten yard", tags: ["Brudergarten", "Seasonal"] },
  { key: "snookball", caption: "Snookball at Brudergarten", tags: ["Brudergarten"] },
  { key: "picnic", caption: "The Brudergarten patio", tags: ["Brudergarten"] },
];
