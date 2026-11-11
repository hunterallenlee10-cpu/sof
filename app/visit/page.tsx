import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Navigation, Phone } from "lucide-react";
import InlinePlanner from "@/components/InlinePlanner";
import HoursTagCard from "@/components/HoursTagCard";
import FinalCta from "@/components/sections/FinalCta";
import { ADDRESS_LINE, BUSINESS, MAPS_EMBED_URL, MAPS_URL } from "@/lib/business";
import { PHOTOS } from "@/lib/photos";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, brudergartenSchema, graph, marketSchema } from "@/lib/schema";

const TITLE = "Hours and Directions | Shepherd's Old Field Market";
const DESCRIPTION =
  "Hours, directions and contact for Shepherd's Old Field Market, 22725 Duke Street, Leonardtown, MD 20650. Call (240) 309-4067 or plan your visit online.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/visit" });

const tiles = [
  { href: BUSINESS.phoneHref, icon: Phone, title: "Call", line: BUSINESS.phoneDisplay, external: false },
  { href: MAPS_URL, icon: Navigation, title: "Directions", line: ADDRESS_LINE, external: true },
  { href: `mailto:${BUSINESS.email}`, icon: Mail, title: "Email", line: BUSINESS.email, external: false },
];

export default function VisitPage() {
  const p = PHOTOS.storefront;
  return (
    <>
      <JsonLd
        data={graph(
          marketSchema(),
          brudergartenSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Plan your visit", path: "/visit" },
          ]),
        )}
      />
      <section aria-labelledby="visit-title" className="pt-8 pb-14 lg:pt-14 lg:pb-20">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <h1 id="visit-title" className="flex flex-col">
              <span className="text-[2.75rem] leading-[1.02] font-bold sm:text-[4rem] lg:text-[4.5rem]">Plan your visit</span>
              <span className="mt-3 font-sans text-lg leading-snug font-medium text-muted sm:text-xl">
                to Shepherd&apos;s Old Field Market in Leonardtown, MD
              </span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.0625rem] sm:text-lg">
              {BUSINESS.name} is a gift shop and makers market at {ADDRESS_LINE}. In the heart of Leonardtown, St. Mary&apos;s County. An
              easy drive from Lexington Park, California, Hollywood and Mechanicsville.
            </p>
          </div>
          <figure className="mx-auto w-full max-w-[600px] -rotate-1 rounded-[6px] border border-line bg-board p-2 shadow-board">
            <Image src={p.src} alt={p.alt} width={p.width} height={p.height} preload fetchPriority="high" sizes="(min-width: 1024px) 580px, 92vw" className="block h-auto w-full rounded-[4px]" />
          </figure>
        </div>

        <div className="container-x mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {tiles.map((t) => (
            <a
              key={t.title}
              href={t.href}
              {...(t.external ? { target: "_blank", rel: "noopener" } : {})}
              className="board group flex min-w-0 items-start gap-4 rounded-[6px] p-5 hover:border-ink"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brick text-white">
                <t.icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-xl font-bold group-hover:text-brick">{t.title}</span>
                <span className="block text-[0.9375rem] [overflow-wrap:anywhere] text-ink/80">{t.line}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="planner-heading" className="border-t border-line bg-board/50 py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4.5fr)] lg:gap-14">
          <div>
            <h2 id="planner-heading" className="mb-6 text-[2.25rem] font-bold sm:text-[3rem]">
              Build your plan
            </h2>
            <InlinePlanner />
          </div>
          <div className="lg:pt-20">
            <HoursTagCard />
          </div>
        </div>
      </section>

      <section aria-labelledby="map-title" className="py-16 lg:py-24">
        <div className="container-x">
          <h2 id="map-title" className="text-[2.25rem] font-bold sm:text-[3rem]">
            Find the porch on Duke Street.
          </h2>
          <p className="mt-3 max-w-[40rem] text-[1.0625rem] text-ink/85">
            Look for the SOF MARKET sign, the black porch with string lights and the butterfly mural. {ADDRESS_LINE}.
          </p>
          {/* DRAFT: confirm the best nearby landmark wording with the owners */}
          <p className="mt-2 max-w-[40rem] text-[1.0625rem] text-ink/85">Nearby: Leonardtown&apos;s town square.</p>
          <div className="mt-8 overflow-hidden rounded-[6px] border border-line bg-board">
            <iframe
              title="Map of Shepherd's Old Field Market, 22725 Duke Street, Leonardtown, MD"
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[360px] w-full sm:h-[440px]"
            />
          </div>
          <a href={MAPS_URL} target="_blank" rel="noopener" className="btn btn-primary mt-6">
            <Navigation aria-hidden="true" className="size-4" strokeWidth={1.5} /> Get directions to 22725 Duke Street
          </a>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
