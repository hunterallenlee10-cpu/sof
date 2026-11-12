import Image from "next/image";
import { Phone } from "lucide-react";
import PlanButton from "../PlanButton";
import { BUSINESS } from "@/lib/business";
import { PHOTOS } from "@/lib/photos";

export default function FinalCta() {
  const p = PHOTOS.storefront;
  return (
    <section aria-labelledby="final-title" className="py-16 lg:py-24">
      <div className="container-x">
        <div className="on-dark relative isolate overflow-hidden rounded-[6px] bg-ink px-6 py-20 text-center text-cream sm:px-12 lg:py-28">
          <Image src={p.src} alt="" fill sizes="(min-width: 1240px) 1176px, 100vw" className="-z-10 object-cover" style={{ objectPosition: "50% 45%" }} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/55" />
          <h2 id="final-title" className="text-[2.75rem] font-bold [text-shadow:0_1px_3px_rgba(30,27,23,0.5)] sm:text-[4rem] lg:text-[4.5rem]">
            Come find something new.
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-lg font-semibold text-cream [text-shadow:0_1px_2px_rgba(30,27,23,0.6)]">22725 Duke Street, Leonardtown. Open Tuesday to Sunday.</p>
          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <PlanButton />
            <a href={BUSINESS.phoneHref} className="btn btn-cream">
              <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
