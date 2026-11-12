import { ArrowRight } from "lucide-react";
import PlanButton from "../PlanButton";
import Pic from "../ui/Pic";
import PhotoPlaceholder from "../ui/PhotoPlaceholder";
import SectionHeading from "../ui/SectionHeading";
import { BOTANIC_ORDER_URL } from "@/lib/business";
import { PHOTOS } from "@/lib/photos";

export default function EatAndDrink() {
  return (
    <section id="eat-and-drink" aria-labelledby="eat-title" className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="eat-title"
          eyebrow="Eat and drink"
          title="Hungry? Stay a while."
          intro="Lunch, coffee and juice inside, and a beer garden out back."
        />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
          {/* Botanic */}
          <article className="board rounded-[6px] p-4 sm:p-6">
            <div className="grid grid-cols-3 grid-rows-2 gap-3">
              <Pic photo={PHOTOS.sandwich} sizes="(min-width: 1024px) 460px, 66vw" className="col-span-2 row-span-2 aspect-square" />
              <Pic photo={PHOTOS.soup} sizes="(min-width: 1024px) 220px, 33vw" className="aspect-square" />
              <Pic photo={PHOTOS.salad} sizes="(min-width: 1024px) 220px, 33vw" className="aspect-square" />
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-[1.875rem] font-bold">Botanic Deli and Cafe</h3>
                <p className="mt-2 max-w-[32rem] text-[1.0625rem] text-ink/85">
                  Fresh salads, handcrafted sandwiches and seasonal soups, with vegetarian and vegan options.
                </p>
              </div>
              {/* DRAFT: Botanic ordering URL. When it arrives, this becomes an "Order from Botanic" link. */}
              {BOTANIC_ORDER_URL ? (
                <a href={BOTANIC_ORDER_URL} target="_blank" rel="noopener" className="btn btn-ghost shrink-0">
                  Order from Botanic
                </a>
              ) : (
                <PlanButton prefill={{ reasons: ["lunch"] }} className="btn btn-ghost shrink-0">
                  Plan lunch at Botanic
                </PlanButton>
              )}
            </div>
          </article>

          <div className="grid gap-6">
            {/* Bowl 29 */}
            <article className="board grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-5 rounded-[6px] p-4 sm:p-5">
              <figure>
                {/* DRAFT: confirm this is a Bowl 29 dish */}
                <Pic photo={PHOTOS.bowl} sizes="(min-width: 1024px) 220px, 45vw" className="aspect-square" />
                <figcaption className="mt-2 text-[0.8125rem] text-muted">From the market&apos;s kitchens</figcaption>
              </figure>
              <div>
                <h3 className="text-[1.625rem] font-bold">Bowl 29</h3>
                <p className="mt-1.5 text-ink/85">Fusion bowls, made to order.</p>
                <PlanButton
                  prefill={{ reasons: ["lunch"] }}
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-brick hover:underline"
                >
                  Plan lunch <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
                </PlanButton>
              </div>
            </article>

            {/* Juice Buzz */}
            <article className="board grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-5 rounded-[6px] p-4 sm:p-5">
              <div className="aspect-square overflow-hidden rounded-[6px]">
                <PhotoPlaceholder compact label="Photo: Juice Buzz, from SOF Market" />
              </div>
              <div>
                <h3 className="text-[1.625rem] font-bold">Juice Buzz</h3>
                <p className="mt-1.5 text-ink/85">Juice, right inside the market.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
