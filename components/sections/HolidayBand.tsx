import PlanButton from "../PlanButton";
import Pic from "../ui/Pic";
import { ChristmasCount, FirstFridayDates } from "../HolidayLive";
import { PHOTOS } from "@/lib/photos";

// DRAFT: seasonal section, swap for spring.
export default function HolidayBand() {
  return (
    <section id="events" aria-labelledby="events-title" className="section-y border-t border-line">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <figure className="mx-auto w-full max-w-[460px] rotate-[1.5deg] rounded-[6px] border border-line bg-board p-2 shadow-board">
          <Pic photo={PHOTOS.countdown} sizes="(min-width: 1024px) 440px, 92vw" ratio="1 / 1" className="rounded-[4px]" />
          <figcaption className="px-1 pt-2 text-[0.875rem] text-muted">The real one, in the front window</figcaption>
        </figure>

        <div>
          <p className="eyebrow mb-3">Events and holidays</p>
          <h2 id="events-title" className="text-[2.25rem] font-bold sm:text-[3rem] lg:text-[3.5rem]">
            The Christmas countdown is on.
          </h2>
          <div className="mt-8">
            <ChristmasCount />
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-[1.5fr_1fr_1fr]">
            <li className="bg-board p-5">
              <h3 className="text-xl font-bold">First Friday Weekend Sales</h3>
              <p className="mt-1.5 text-[0.9375rem] text-ink/85">
                Sales at select shops throughout the market. <FirstFridayDates />
              </p>
            </li>
            <li className="bg-board p-5">
              <h3 className="text-xl font-bold">Trivia Wednesdays</h3>
              <p className="mt-1.5 text-[0.9375rem] text-ink/85">7 to 9 PM at Brudergarten. Indoors, teams of 2 to 6.</p>
            </li>
            <li className="bg-board p-5">
              <h3 className="text-xl font-bold">Karaoke Thursdays</h3>
              <p className="mt-1.5 text-[0.9375rem] text-ink/85">Every Thursday night at Brudergarten.</p>
            </li>
          </ul>

          <div className="mt-8">
            <PlanButton prefill={{ reasons: ["holiday"] }} />
          </div>
        </div>
      </div>
    </section>
  );
}
