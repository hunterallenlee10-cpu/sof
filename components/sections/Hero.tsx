import Image from "next/image";
import { Navigation } from "lucide-react";
import PlanButton from "../PlanButton";
import HeroTagText from "../HeroTagText";
import { MAPS_URL } from "@/lib/business";
import { PHOTOS } from "@/lib/photos";

const { storefront, atrium } = PHOTOS;

/** The kraft tag hanging from the top edge of the storefront photo by brick twine. */
function HangTag() {
  // Geometry (px): nail sits on the photo's top edge; twine runs down to the punched hole.
  return (
    <div className="pointer-events-none absolute top-0 right-[5%] z-20 w-[140px] sm:right-[4%] sm:w-[184px]">
      {/* nail: fixed to the photo, it does not swing */}
      <span aria-hidden="true" className="absolute top-[-4px] left-[70%] z-10 size-2 -translate-x-1/2 rounded-full bg-ink" />
      <div className="tag-swing relative pt-[34px] sm:pt-[42px]" style={{ ["--nail-x" as string]: "70%" }}>
        {/* twine: from the nail down to the punched hole */}
        <svg aria-hidden="true" className="absolute top-0 left-0 h-[38px] w-full overflow-visible sm:h-[46px]" preserveAspectRatio="none" viewBox="0 0 100 40">
          <path d="M70 0 C 60 14, 34 22, 20 40" fill="none" stroke="#9E3B2B" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          <path d="M70 0 C 64 16, 42 26, 24 40" fill="none" stroke="#9E3B2B" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.6" />
        </svg>
        <div className="tag h-[78px] px-3 pt-4 pb-1.5 sm:h-[118px] sm:px-4 sm:pt-6">
          <span className="tag-hole top-[8px] left-[14px] sm:top-[10px] sm:left-[18px]" aria-hidden="true" />
          <span className="sr-only">Market hours today: </span>
          <HeroTagText />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-x grid items-center gap-x-10 gap-y-6 pt-4 pb-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:pt-12 lg:pb-28">
        {/* Collage. On phones it sits above the headline. */}
        <div className="relative order-1 lg:order-2 lg:pl-6">
          <div className="relative mx-auto max-w-[640px] pb-[9%] lg:mr-0 lg:pb-[34%]">
            <figure className="relative z-10 -rotate-[1.5deg] rounded-[6px] border border-line bg-board p-[5px] shadow-board sm:p-2">
              <Image
                src={storefront.src}
                width={storefront.width}
                height={storefront.height}
                alt={storefront.alt}
                preload
                fetchPriority="high"
                sizes="(min-width: 1024px) 640px, calc(100vw - 32px)"
                className="block h-auto w-full rounded-[4px]"
              />
              <HangTag />
            </figure>
            <figure className="absolute right-[-2%] bottom-0 z-20 w-[34%] rotate-2 rounded-[6px] border border-line bg-board p-[4px] shadow-board sm:p-1.5 lg:right-auto lg:left-[-6%] lg:w-[42%]">
              <Image
                src={atrium.src}
                width={atrium.width}
                height={atrium.height}
                alt={atrium.alt}
                sizes="(min-width: 1024px) 300px, 34vw"
                className="block aspect-[4/5] h-auto w-full rounded-[4px] object-cover object-top"
              />
            </figure>
          </div>
        </div>

        {/* Words */}
        <div className="order-2 flex flex-col lg:order-1">
          <h1 id="hero-title" className="flex flex-col">
            <span className="eyebrow mb-3 font-sans leading-snug lg:mb-5">Gift shop and makers market in Leonardtown, MD</span>
            <span className="text-[2.125rem] leading-[1.02] font-bold tracking-[-0.01em] min-[400px]:text-[2.375rem] sm:text-[3.5rem] lg:text-[3.375rem] xl:text-[4.125rem]">
              Over 90 local shops.
              <br />
              <span className="text-brick">One front door.</span>
            </span>
          </h1>

          <div className="mt-6 flex flex-col">
            <p className="order-2 mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink/85 sm:order-1 sm:mt-0 sm:mb-8 lg:text-lg">
              Gifts, home décor, sweets and handmade finds on two floors of the old Leonardtown lumberyard, plus a café and a beer garden.
              Something new every time you visit.
            </p>
            <div className="order-1 flex flex-wrap gap-3 sm:order-2">
              <PlanButton className="btn btn-primary max-sm:flex-1" />
              <a href={MAPS_URL} target="_blank" rel="noopener" className="btn btn-ghost max-sm:flex-1">
                <Navigation aria-hidden="true" className="size-4" strokeWidth={1.5} />
                Get directions
              </a>
            </div>
          </div>

          <ul className="mt-8 grid grid-cols-3 border-y border-line text-[0.875rem] leading-snug sm:text-[0.9375rem] lg:mt-12">
            {[
              ["90+", "local shops"],
              ["2 floors", "9,000 sq ft"],
              ["Café", "bowls and a beer garden"],
            ].map(([big, small], i) => (
              <li key={big} className={`py-4 pr-3 ${i > 0 ? "border-l border-line pl-3 sm:pl-5" : ""}`}>
                <span className="block font-display text-[1.375rem] leading-none font-bold text-brick sm:text-[1.625rem]">{big}</span>
                <span className="mt-1.5 block text-muted">{small}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
