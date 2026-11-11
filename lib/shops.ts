// The shop directory, from the market's current site plus its Facebook posts.
// DRAFT: owner to confirm the current list and add the rest of the 90+.
// DRAFT: per-shop pages and social links later.

import { CATEGORY_BY_SHOP } from "./giftFinder";

export const SHOP_NAMES = [
  "Amp Beauty",
  "Apple Spice",
  "Barclay Soap Co.",
  "Bay Leather",
  "Black Point Chocolates",
  "Blind Date with a Book",
  "Bowl 29",
  "B's Sweet Bites",
  "Buzz Ballard Art",
  "Cachito de Mi",
  "Cakes by Amanda",
  "Charles County Walking Sticks",
  "Chef in a Jar",
  "Chris Debons Designs",
  "Classic Candy & Snack Co.",
  "Coastal Farms Boutique",
  "Cynthia Pitcher Designs",
  "Dayzi Doodles",
  "DNA Brickz",
  "Firefly Crystal Studio",
  "Flower Child",
  "Geez Louise",
  "GHWG",
  "Gift Bagz for Dayz",
  "Gina's Artsy Creations",
  "Got Your Goat",
  "Gregory Hewitt (Author)",
  "Gym Leader Cloak",
  "Hack3r Runway",
  "HCW Creative Designs",
  "Howe Inspired Creations",
  "Ivy's Sauce",
  "Juice Buzz",
  "Julia's Asian Store",
  "Katelyn's Custom Creations",
  "Kindled Coast",
  "Kishpaugh Kids Korner",
  "Kiss & Tell with Hilary",
  "Layers!",
  "Leonardtown Music",
  "LisaAnn Creations",
  "Living Water Men's Mercantile",
  "Liz Walter Pottery",
  "Mary Lou Troutman",
  "Mason by Design Co.",
  "Mayberry Crafts & Gifts",
  "Mess-Ta-Pieces",
  "Mystical Beauty",
  "Next Dimension Origami",
  "Olde Towne Barbershop",
  "One of a Kind Seashore Creations",
  "Pepper Paradise",
  "Pops Patents",
  "Pressed Oils",
  "Quade Wood Designs",
  "Reflexology with Ruth",
  "Resinated",
  "Ribshot Tattoo",
  "Rough Palletman",
  "Sacred River",
  "Soil & Green",
  "SOMD Entertainment",
  "Southern Comfort Berry Farm",
  "Steelhead Art",
  "Style by Dawn",
  "Terri's Touch of SOMD",
  "That's Sew Mason",
  "The Art of Seth",
  "The Hometown Nest",
  "The Spoiled Pet",
  "The U.S. Oyster Fest Shop",
  "Town Grounds",
  "Vectored Thrust",
  "Vee's Knotty Nook",
  "Ward Huffine (Author)",
  "Willow & Wax Candle Co.",
  "Woolsey Fiction",
  "Yarn Over with 10-4 Check",
  "Yellow Truck Creations",
] as const;

export type ShopName = (typeof SHOP_NAMES)[number];

/** The newest shop, flagged "New" in the directory and the Gift Finder. */
export const NEWEST_SHOP: ShopName = "Katelyn's Custom Creations";

export function shopId(name: string): string {
  return (
    "shop-" +
    name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/['’.()!]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

/** Sort key ignoring a leading "The " so "The Spoiled Pet" files under S. */
export function sortName(name: string): string {
  return name.replace(/^The /, "");
}

export type Shop = { name: string; id: string; letter: string; tag?: string; isNew: boolean };

export const SHOPS: Shop[] = [...SHOP_NAMES]
  .sort((a, b) => sortName(a).localeCompare(sortName(b), "en", { sensitivity: "base" }))
  .map((name) => {
    const first = sortName(name)[0].toUpperCase();
    return {
      name,
      id: shopId(name),
      letter: /[A-Z]/.test(first) ? first : "#",
      tag: CATEGORY_BY_SHOP[name],
      isNew: name === NEWEST_SHOP,
    };
  });

export const SHOP_LETTERS = Array.from(new Set(SHOPS.map((s) => s.letter)));
