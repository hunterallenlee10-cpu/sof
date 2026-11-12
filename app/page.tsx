import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { brudergartenSchema, faqSchema, graph, marketSchema } from "@/lib/schema";
import Hero from "@/components/sections/Hero";
import UnderOneRoof from "@/components/sections/UnderOneRoof";
import GiftFinder from "@/components/GiftFinder/GiftFinder";
import ShopsDirectory from "@/components/sections/ShopsDirectory";
import EatAndDrink from "@/components/sections/EatAndDrink";
import Brudergarten from "@/components/sections/Brudergarten";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import LumberyardStory from "@/components/sections/LumberyardStory";
import HolidayBand from "@/components/sections/HolidayBand";
import VendorBand from "@/components/sections/VendorBand";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

const TITLE = "Gift Shop in Leonardtown, MD | Shepherd's Old Field Market";
const DESCRIPTION =
  "Over 90 local shops, makers and eateries under one roof on Duke Street in Leonardtown, MD. Gifts, decor, sweets and a beer garden. Plan your visit today.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/" });

export default function Home() {
  return (
    <>
      <JsonLd data={graph(marketSchema(), brudergartenSchema(), faqSchema())} />
      <Hero />
      <UnderOneRoof />
      <GiftFinder />
      <ShopsDirectory />
      <EatAndDrink />
      <Brudergarten />
      <Services />
      <Gallery />
      <LumberyardStory />
      <HolidayBand />
      <VendorBand />
      <Reviews />
      <Faq />
      <FinalCta />
    </>
  );
}
