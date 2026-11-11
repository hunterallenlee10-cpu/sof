// Every photo on the site. All are the market's own, from its website and Facebook page.
// Alt text is written from the photo map. `crop` = object-position that hides the burned-in
// shop name at the bottom when our own caption sits nearby.

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** object-position for cover crops */
  pos?: string;
};

const p = (file: string, width: number, height: number, alt: string, pos?: string): Photo => ({
  src: `/images/${file}.webp`,
  width,
  height,
  alt,
  pos,
});

const TOP = "50% 18%"; // keeps the burned-in name in the bottom 15 to 20 percent out of a cover crop

export const PHOTOS = {
  storefront: p(
    "01-storefront-SOF-MARKET-sign-butterfly-mural-BEST",
    1284,
    936,
    "The front of Shepherd's Old Field Market on Duke Street: SOF MARKET lettering on the facade, a black timber porch with string lights and the carved market sign, and a rainbow butterfly mural on the cream wall",
    "40% 50%",
  ),
  atrium: p(
    "02-interior-atrium-two-floors-flag-balcony",
    1100,
    1207,
    "Inside the market from the upper level: a large American flag hangs in the two-story atrium above the booths, with the balcony and upstairs shopfronts around it",
  ),
  booth: p(
    "03-booth-one-of-a-kind-seashore-creations-french-doors",
    866,
    868,
    "A booth built like a little cottage, with a tin roof, open white French doors and shelves inside, at One of a Kind Seashore Creations",
    TOP,
  ),
  bayLeather: p("04-bay-leather-hats-belts-wall", 866, 868, "Bay Leather's wall of leather cowboy and outback hats, belts, carved wallets and painted coin purses", TOP),
  spoiledPet: p(
    "05-spoiled-pet-wall-brick-floor",
    866,
    868,
    "The Spoiled Pet: Christmas dog sweaters, leashes in every colour, bandanas and toys above a red brick floor",
    TOP,
  ),
  julias: p(
    "06-julias-asian-store-snack-shelves",
    866,
    868,
    "Julia's Asian Store: a carved cherry blossom sign over shelves of Pocky, mochi and Japanese snacks",
    TOP,
  ),
  crab: p("07-crab-sea-glass-art-framed", 866, 868, "Framed glass art of a Maryland blue crab in sea glass colours", "50% 40%"),
  comics: p("08-comic-books-spinner-racks", 866, 868, "Vintage comic books on a black rack and an oak spinner rack, on a brick floor", TOP),
  katelyns: p(
    "09-katelyns-custom-creations-fabric-albums",
    866,
    868,
    "Handmade fabric covered albums with lace and ruffles from Katelyn's Custom Creations",
    "50% 30%",
  ),
  navyOreos: p(
    "10-black-point-chocolate-navy-oreos",
    866,
    868,
    "Black Point Chocolate dipped Oreos with yellow NAVY drizzle and gold stars, labelled gluten free",
    "50% 35%",
  ),
  cookies: p(
    "11-cakes-by-amanda-frankenstein-cookies",
    866,
    868,
    "Cakes by Amanda monster sugar cookies, each one individually wrapped",
    TOP,
  ),
  bracelets: p("12-leather-flower-bracelets", 866, 868, "Hand painted leather flower bracelets and cuffs, with a ladybug on a leaf", TOP),
  chickens: p("13-ceramic-chickens-farmhouse-decor", 866, 868, "Black and white ceramic hens and a red rose dish on a reclaimed wood shelf", "50% 40%"),
  kidsBooks: p("14-kids-books-shelf", 865, 868, "A shelf of colourful children's books", "50% 35%"),
  countdown: p(
    "15-christmas-countdown-sign-47-days",
    864,
    868,
    "The market's Christmas Countdown sign in a Santa hat, hanging in the front window",
    "50% 40%",
  ),
  beerGardenYard: p(
    "16-beer-garden-yard-autumn-bunting",
    648,
    868,
    "The Brudergarten yard seen through a web of string lights, with autumn trees and red, yellow and black bunting",
    "50% 30%",
  ),
  snookball: p("17-brudergarten-snookball-turf-yard", 792, 600, "Snookball on the Brudergarten turf yard: giant pool ball footballs, a wood fence and pennants"),
  picnic: p("18-brudergarten-picnic-tables-umbrellas", 805, 605, "Wooden picnic tables under navy umbrellas on the Brudergarten patio"),
  taps: p("19-brudergarten-tap-wall", 811, 608, "A row of tap handles on white tile at the Brudergarten bar, with spirits on the shelf above"),
  flight: p("20-brudergarten-beer-flight", 960, 640, "A flight of four beers on a chalk labelled paddle at Brudergarten"),
  pretzel: p("21-brudergarten-bavarian-pretzel-beer-cheese", 960, 640, "A Bavarian pretzel with beer cheese at Brudergarten"),
  cocktail: p("22-brudergarten-cocktail-on-bar", 960, 640, "An iced amber cocktail on the Brudergarten bar"),
  badminton: p("23-brudergarten-badminton-turf-small", 456, 343, "Badminton rackets, a soccer ball and a beer on the Brudergarten turf"),
  sandwich: p("24-botanic-roast-beef-sandwich-chips", 1000, 1000, "A roast beef sandwich with chips from Botanic Deli and Cafe"),
  soup: p("25-botanic-soup-and-panini", 1000, 959, "Broccoli cheddar soup and a pressed panini from Botanic Deli and Cafe"),
  salad: p("26-botanic-salad-bowl", 1000, 948, "A fresh salad bowl with sprouts, avocado and chickpeas from Botanic Deli and Cafe"),
  // DRAFT: confirm this is a Bowl 29 dish. Captioned only as "From the market's kitchens".
  bowl: p("27-bowl-ramen-egg-roasted-corn", 865, 868, "A bowl with a jammy egg, charred corn, crispy chicken and green onion"),
  barber: p("28-olde-towne-barbershop-door", 1536, 568, "The Olde Towne Barbershop entrance with a barber pole sign and an OPEN sign", "28% 50%"),
  tattoo: p("29-ribshot-tattoo-neon-sign", 978, 720, "The Ribshot Tattoos neon sign"),
  guitar: p("30-leonardtown-music-hollowbody-guitar", 633, 551, "A hollow body electric guitar on display at Leonardtown Music Service"),
  spaceAvailable: p(
    "31-space-available-vendor-sign",
    882,
    868,
    "The market's own sign: Space available. Do you have a unique product not already offered at SOF Market? Email MarketingSOFMarket@gmail.com for more information",
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;
