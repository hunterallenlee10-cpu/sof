import { ArrowUpRight } from "lucide-react";
import PlanButton from "../PlanButton";
import BruOpenPill from "../BruOpenPill";
import Pic from "../ui/Pic";
import { BrudergartenHours } from "../HoursTable";
import { BUSINESS } from "@/lib/business";
import { PHOTOS } from "@/lib/photos";

export default function Brudergarten() {
  return (
    <section id="brudergarten" aria-labelledby="bru-title" className="on-dark section-y bg-ink text-cream">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-14">
          <div>
            <p className="font-display text-xl font-semibold text-cream/80">Your Favorite Hangout!</p>
            <h2 id="bru-title" className="mt-2 text-[2.5rem] font-bold sm:text-[3.25rem] lg:text-[4rem]">
              After 4 PM: Brudergarten
            </h2>
          </div>
          <div>
            <p className="text-[1.0625rem] text-cream/85 sm:text-lg">
              20 taps, local craft beer, flights, wine and cocktails like the Smoked Chai Old Fashioned. Snookball, Extreme Jenga and cornhole
              in the yard.
            </p>
            <div className="mt-5">
              <BruOpenPill />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:gap-4 lg:mt-14">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Pic photo={PHOTOS.taps} sizes="(min-width: 1240px) 580px, 50vw" ratio="4 / 3" />
            <Pic photo={PHOTOS.snookball} sizes="(min-width: 1240px) 580px, 50vw" ratio="4 / 3" />
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <Pic photo={PHOTOS.flight} sizes="(min-width: 1240px) 385px, 33vw" ratio="3 / 2" />
            <Pic photo={PHOTOS.pretzel} sizes="(min-width: 1240px) 385px, 33vw" ratio="3 / 2" />
            <Pic photo={PHOTOS.cocktail} sizes="(min-width: 1240px) 385px, 33vw" ratio="3 / 2" />
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-cream/20 pt-10 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.2fr]">
          <div>
            <h3 className="text-xl font-bold">Beer garden hours</h3>
            <BrudergartenHours dark className="mt-3" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Weekly</h3>
            <ul className="mt-3 space-y-1.5">
              <li>
                <span className="font-semibold">Wednesday:</span> Trivia, 7 to 9 PM
              </li>
              <li>
                <span className="font-semibold">Thursday:</span> Karaoke
              </li>
            </ul>
            <p className="mt-3 text-[0.9375rem] text-cream/75">Trivia is indoors, teams of 2 to 6.</p>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex flex-wrap gap-3">
              <PlanButton prefill={{ reasons: ["drinks"] }} />
              <PlanButton prefill={{ reasons: ["event"] }} className="btn btn-ghost-light">
                Book a private event
              </PlanButton>
            </div>
            <a
              href={BUSINESS.brudergarten}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream"
            >
              Brudergarten&apos;s full menu <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
