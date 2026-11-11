// Gift Finder mapping. Shop names must match lib/shops.ts exactly.
// Photos are only captioned with a shop name when the photo map ties the photo to that shop.

import type { PhotoKey } from "./photos";

export type GiftCategory = {
  key: string;
  label: string;
  line: string;
  photos: { key: PhotoKey; caption: string }[];
  /** Shown instead of a photo when the market has not supplied one yet */
  placeholder?: string;
  shops: string[];
};

export const GIFT_CATEGORIES: GiftCategory[] = [
  {
    key: "for-her",
    label: "For Her",
    line: "Painted leather, candles, soaps and pottery.", // DRAFT: owner to confirm category tags
    photos: [{ key: "bracelets", caption: "Found at SOF Market" }],
    shops: ["Bay Leather", "Katelyn's Custom Creations", "Willow & Wax Candle Co.", "Barclay Soap Co.", "Liz Walter Pottery"], // DRAFT: owner to confirm category tags
  },
  {
    key: "for-him",
    label: "For Him",
    line: "Leather hats and belts, walking sticks and a fresh cut.", // DRAFT: owner to confirm category tags
    photos: [{ key: "bayLeather", caption: "Bay Leather" }],
    shops: ["Bay Leather", "Living Water Men's Mercantile", "Charles County Walking Sticks", "Olde Towne Barbershop"], // DRAFT: owner to confirm category tags
  },
  {
    key: "kids",
    label: "Kids",
    line: "Books, crafts and stocking stuffers.", // DRAFT: owner to confirm category tags
    photos: [{ key: "kidsBooks", caption: "Found at SOF Market" }],
    shops: ["Kishpaugh Kids Korner", "Next Dimension Origami", "Blind Date with a Book"], // DRAFT: owner to confirm category tags
  },
  {
    key: "pet-lovers",
    label: "Pet Lovers",
    line: "Sweaters, leashes, bandanas and toys.", // DRAFT: owner to confirm category tags
    photos: [{ key: "spoiledPet", caption: "The Spoiled Pet" }],
    shops: ["The Spoiled Pet"], // DRAFT: owner to confirm category tags
  },
  {
    key: "sweet-tooth",
    label: "Sweet Tooth",
    line: "Dipped Oreos, decorated cookies and snacks from Japan.", // DRAFT: owner to confirm category tags
    photos: [
      { key: "navyOreos", caption: "Black Point Chocolates" },
      { key: "julias", caption: "Julia's Asian Store" },
    ],
    shops: ["Black Point Chocolates", "Cakes by Amanda", "B's Sweet Bites", "Classic Candy & Snack Co.", "Julia's Asian Store"], // DRAFT: owner to confirm category tags
  },
  {
    key: "home-and-decor",
    label: "Home and Decor",
    line: "Candles, pottery, wood pieces and farmhouse finds.", // DRAFT: owner to confirm category tags and line
    photos: [{ key: "chickens", caption: "Found at SOF Market" }],
    shops: ["Willow & Wax Candle Co.", "Liz Walter Pottery", "Quade Wood Designs", "Rough Palletman", "The Hometown Nest", "Mayberry Crafts & Gifts"], // DRAFT: owner to confirm category tags
  },
  {
    key: "maryland-and-coastal",
    label: "Maryland and Coastal",
    line: "Blue crabs, sea glass and Southern Maryland pride.", // DRAFT: owner to confirm category tags
    photos: [
      { key: "crab", caption: "Found at SOF Market" },
      { key: "booth", caption: "One of a Kind Seashore Creations" },
    ],
    shops: ["One of a Kind Seashore Creations", "Coastal Farms Boutique", "Kindled Coast", "The U.S. Oyster Fest Shop", "Terri's Touch of SOMD"], // DRAFT: owner to confirm category tags
  },
  {
    key: "collectors-and-readers",
    label: "Collectors and Readers",
    line: "Comics, local authors and a blind date with a book.", // DRAFT: owner to confirm category tags
    photos: [{ key: "comics", caption: "Found at SOF Market" }],
    shops: ["Gregory Hewitt (Author)", "Ward Huffine (Author)", "Woolsey Fiction", "Blind Date with a Book"], // DRAFT: owner to confirm category tags
  },
  {
    key: "self-care",
    label: "Self-Care",
    line: "Soaps, oils, beauty and reflexology.", // DRAFT: owner to confirm category tags and line
    photos: [],
    placeholder: "Photo: self-care shops, from SOF Market",
    shops: ["Barclay Soap Co.", "Pressed Oils", "Reflexology with Ruth", "Amp Beauty", "Mystical Beauty"], // DRAFT: owner to confirm category tags
  },
  {
    key: "handmade-keepsakes",
    label: "Handmade Keepsakes",
    line: "Fabric albums, sewing, yarn, art and resin pieces.", // DRAFT: owner to confirm category tags and line
    photos: [{ key: "katelyns", caption: "Katelyn's Custom Creations" }],
    shops: ["Katelyn's Custom Creations", "That's Sew Mason", "Yarn Over with 10-4 Check", "Gina's Artsy Creations", "Resinated"], // DRAFT: owner to confirm category tags
  },
];

export const CATEGORY_LABELS = GIFT_CATEGORIES.map((c) => c.label);

/** The first Gift Finder category a shop appears in, used as its tag in the directory. */
export const CATEGORY_BY_SHOP: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const c of GIFT_CATEGORIES) for (const s of c.shops) out[s] ??= c.label;
  return out;
})();

/** The auto-cycle order when the Gift Finder first scrolls into view; it rests on the last one. */
export const AUTO_CYCLE = ["sweet-tooth", "maryland-and-coastal", "pet-lovers"];
