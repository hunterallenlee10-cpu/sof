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

export default function Home() {
  return (
    <>
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
