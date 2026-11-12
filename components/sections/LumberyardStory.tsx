import Pic from "../ui/Pic";
import { BUSINESS } from "@/lib/business";
import { PHOTOS } from "@/lib/photos";

export default function LumberyardStory() {
  return (
    <section aria-labelledby="story-title" className="section-y border-t border-line bg-board/50">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <figure className="mx-auto w-full max-w-[520px] -rotate-1 rounded-[6px] border border-line bg-board p-2 shadow-board">
          <Pic photo={PHOTOS.atrium} sizes="(min-width: 1024px) 500px, 92vw" ratio="1100 / 1207" className="rounded-[4px]" />
          <figcaption className="px-1 pt-2 text-[0.875rem] text-muted">Two floors under one roof on Duke Street</figcaption>
        </figure>
        <div>
          <p className="eyebrow mb-3">Our story</p>
          <h2 id="story-title" className="text-[2.25rem] font-bold sm:text-[3rem] lg:text-[3.5rem]">
            A lumberyard, reborn.
          </h2>
          <p className="mt-6 max-w-[36rem] text-[1.0625rem] sm:text-lg">
            For years the old Leonardtown Building Supply sat empty on Duke Street. In 2018 it opened again as Shepherd&apos;s Old Field
            Market, with the brick floors and rough-sawn walls kept just as they were. Today it is home to over 90 local businesses on two
            floors.
          </p>
          <blockquote className="mt-8 border-l-2 border-brick pl-5">
            <p className="font-display text-[1.5rem] leading-snug font-semibold sm:text-[1.75rem]">
              &ldquo;Grassroots local commerce, and historical place attachment.&rdquo;
            </p>
            <footer className="mt-2 text-[0.9375rem] text-muted">From the market&apos;s Facebook bio</footer>
          </blockquote>
          <dl className="mt-10 grid max-w-[34rem] grid-cols-3 border-t border-line pt-6">
            {[
              [String(BUSINESS.opened), "opened"],
              [BUSINESS.squareFeet, "sq ft"],
              [BUSINESS.shopCount, "shops"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-[2rem] leading-none font-bold text-brick sm:text-[2.5rem]">{n}</dd>
                <dd className="mt-1 text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
