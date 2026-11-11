import Hero from "@/components/sections/Hero";
import UnderOneRoof from "@/components/sections/UnderOneRoof";
import GiftFinder from "@/components/GiftFinder/GiftFinder";
import ShopsDirectory from "@/components/sections/ShopsDirectory";
import EatAndDrink from "@/components/sections/EatAndDrink";
import Brudergarten from "@/components/sections/Brudergarten";
import Services from "@/components/sections/Services";

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
    </>
  );
}
