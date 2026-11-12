import DeferredImage from "../ui/DeferredImage";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import PlanButton from "../PlanButton";
import SectionHeading from "../ui/SectionHeading";
import { PHOTOS, type Photo } from "@/lib/photos";

function Tile({
  photo,
  title,
  copy,
  action,
  className,
  imgClass = "",
  sizes,
  big = false,
  strip = false,
}: {
  photo: Photo;
  title: string;
  copy: string;
  action: ReactNode;
  className: string;
  imgClass?: string;
  sizes: string;
  big?: boolean;
  /** Wide and short: photo left, words right (tablet and up). */
  strip?: boolean;
}) {
  return (
    <article className={`board group flex flex-col overflow-hidden rounded-[6px] ${strip ? "md:flex-row" : ""} ${className}`}>
      <div
        className={`relative min-h-[200px] flex-1 overflow-hidden ${
          strip ? "md:min-h-[190px] md:w-[46%] md:flex-none" : big ? "min-h-[280px] md:min-h-[400px] lg:min-h-0" : ""
        }`}
      >
        <DeferredImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className={`object-cover ${imgClass}`}
          style={{ objectPosition: photo.pos }}
        />
      </div>
      <div
        className={`flex flex-col gap-3 border-t border-line ${
          big ? "p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8" : strip ? "p-5 md:flex-1 md:flex-row md:items-center md:justify-between md:border-t-0 md:border-l md:p-8" : "p-5"
        }`}
      >
        <div>
          <h3 className={`font-bold ${big ? "text-[1.875rem] sm:text-[2.25rem]" : "text-[1.5rem]"}`}>{title}</h3>
          <p className={`mt-1.5 text-ink/80 ${big ? "max-w-[30rem] text-[1.0625rem]" : ""}`}>{copy}</p>
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    </article>
  );
}

const textLink = "inline-flex min-h-11 items-center gap-1.5 font-semibold text-brick hover:underline";

export default function UnderOneRoof() {
  return (
    <section aria-labelledby="roof-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="roof-title"
          eyebrow="Under one roof"
          title="Shop, eat, sip, stay."
          intro="Gifts, lunch and a pint, all behind one door on Duke Street."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-6 lg:mt-14 lg:grid-cols-12 lg:grid-rows-[minmax(330px,auto)_minmax(330px,auto)_auto] lg:gap-5">
          <Tile
            big
            photo={PHOTOS.booth}
            title="Shop 90+ local makers"
            copy="Booths built like little cottages, packed with things you will not find at the mall."
            action={
              <a href="#gift-finder" className="btn btn-primary">
                Find a gift
              </a>
            }
            className="md:col-span-6 lg:col-span-7 lg:row-span-2"
            sizes="(min-width: 1024px) 680px, 100vw"
          />
          <Tile
            photo={PHOTOS.sandwich}
            title="Lunch and coffee"
            copy="Botanic Deli and Cafe, Bowl 29 and Juice Buzz, right inside."
            action={
              <PlanButton prefill={{ reasons: ["lunch"] }} className={textLink}>
                Plan lunch here <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </PlanButton>
            }
            className="md:col-span-3 lg:col-span-5"
            sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
          />
          <Tile
            photo={PHOTOS.beerGardenYard}
            title="Stay for the evening"
            copy="Brudergarten pours 20 taps till late on weekends."
            action={
              <PlanButton prefill={{ reasons: ["drinks"] }} className={textLink}>
                Plan an evening <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </PlanButton>
            }
            className="md:col-span-3 lg:col-span-5"
            sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
          />
          <Tile
            photo={PHOTOS.barber}
            title="Services too"
            copy="Barber, tattoo, music lessons."
            action={
              <a href="#services" className={textLink}>
                See services <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </a>
            }
            strip
            className="md:col-span-6 lg:col-span-12"
            sizes="(min-width: 768px) 560px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
