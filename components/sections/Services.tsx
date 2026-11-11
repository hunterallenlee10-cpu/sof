import PlanButton from "../PlanButton";
import Pic from "../ui/Pic";
import PhotoPlaceholder from "../ui/PhotoPlaceholder";
import SectionHeading from "../ui/SectionHeading";
import ScrollRowButtons from "../ui/ScrollRowButtons";
import { PHOTOS, type Photo } from "@/lib/photos";
import type { ServiceName } from "../VisitPlanner/types";

// DRAFT: each service's own booking link. Until then each card opens the planner with the service picked.
const SERVICES: { name: ServiceName; copy: string; photo?: Photo; placeholder?: string; width: string }[] = [
  {
    name: "Olde Towne Barbershop",
    copy: "Private one-on-one appointments. Men's and kids' cuts.",
    photo: PHOTOS.barber,
    width: "w-[86vw] sm:w-[520px]",
  },
  { name: "Ribshot Tattoo", copy: "Tattoos, right inside the market.", photo: PHOTOS.tattoo, width: "w-[78vw] sm:w-[340px]" },
  {
    name: "Leonardtown Music Service",
    copy: "Lessons for all ages: guitar, piano, drums and more. Piano tuning and moving.",
    photo: PHOTOS.guitar,
    width: "w-[78vw] sm:w-[360px]",
  },
  {
    name: "Reflexology with Ruth",
    copy: "Reflexology, right inside the market.",
    placeholder: "Photo: Reflexology with Ruth, from SOF Market",
    width: "w-[78vw] sm:w-[320px]",
  },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading id="services-title" eyebrow="Services" title="Book a service while you shop." />
          <ScrollRowButtons target="services-row" label="services" />
        </div>
      </div>
      <div
        id="services-row"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:scroll-px-8 md:px-8 lg:mt-12 xl:scroll-px-[max(32px,calc((100vw-1176px)/2))] xl:px-[max(32px,calc((100vw-1176px)/2))]"
      >
        {SERVICES.map((s) => (
          <article key={s.name} className={`board flex shrink-0 snap-start flex-col overflow-hidden rounded-[6px] ${s.width}`}>
            <div className="h-[220px] sm:h-[240px]">
              {s.photo ? (
                <Pic photo={s.photo} sizes="(min-width: 640px) 520px, 86vw" className="h-full rounded-none" />
              ) : (
                <PhotoPlaceholder label={s.placeholder!} />
              )}
            </div>
            <div className="flex flex-1 flex-col border-t border-line p-5">
              <h3 className="text-[1.5rem] font-bold">{s.name}</h3>
              <p className="mt-1.5 flex-1 text-ink/85">{s.copy}</p>
              <PlanButton
                prefill={{ reasons: ["service"], service: s.name }}
                className="btn btn-ghost mt-5 self-start"
                ariaLabel={`Plan a visit with ${s.name}`}
              >
                Plan a visit with this
              </PlanButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
