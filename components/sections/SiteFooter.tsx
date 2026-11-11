import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Wordmark from "../Wordmark";
import { BrudergartenHours, MarketHours } from "../HoursTable";
import { FacebookIcon, InstagramIcon } from "../ui/SocialIcons";
import { ADDRESS_LINE, BUSINESS, IS_LIVE, MAPS_URL } from "@/lib/business";

const QUICK = [
  { href: "/#shops", label: "Shops" },
  { href: "/#gift-finder", label: "Gift Finder" },
  { href: "/#eat-and-drink", label: "Eat and Drink" },
  { href: "/#events", label: "Events" },
  { href: "/visit", label: "Visit" },
  { href: "/#sell", label: "Sell at SOF Market" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-board pb-24 lg:pb-0">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_1.15fr_1.15fr_0.8fr] lg:gap-10 lg:py-20">
        <div>
          <Link href="/" className="inline-flex min-h-11 items-center text-[1.75rem]" aria-label="SOF Market, home">
            <Wordmark />
          </Link>
          <p className="mt-3 font-display text-xl font-semibold">{BUSINESS.welcome}</p>
          <a href={BUSINESS.phoneHref} className="mt-6 inline-flex min-h-11 items-center gap-2 font-display text-[2rem] font-bold text-brick hover:underline">
            <Phone aria-hidden="true" className="size-6" strokeWidth={1.5} />
            {BUSINESS.phoneDisplay}
          </a>
          <address className="mt-4 space-y-2 not-italic">
            <p className="font-semibold">{BUSINESS.name}</p>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="flex items-start gap-2 hover:text-brick">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" strokeWidth={1.5} />
              <span>{ADDRESS_LINE}</span>
            </a>
            <p className="pl-6 text-[0.9375rem] text-muted">In the heart of Leonardtown, St. Mary&apos;s County.</p>
            <a href={`mailto:${BUSINESS.email}`} className="flex items-start gap-2 break-all hover:text-brick">
              <Mail aria-hidden="true" className="mt-1 size-4 shrink-0" strokeWidth={1.5} />
              <span>{BUSINESS.email}</span>
            </a>
          </address>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Market hours</h2>
          <MarketHours className="mt-4 !gap-x-4 text-[0.9375rem]" />
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Brudergarten Beer Garden</h2>
          <BrudergartenHours className="mt-4 !gap-x-4 text-[0.9375rem]" />
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Around the market</h2>
          <ul className="mt-3">
            {QUICK.map((q) => (
              <li key={q.href}>
                <Link href={q.href} className="inline-flex min-h-11 items-center hover:text-brick">
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Shepherd's Old Field Market on Facebook"
              className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-cream hover:border-ink"
            >
              <FacebookIcon />
            </a>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Shepherd's Old Field Market on Instagram"
              className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-cream hover:border-ink"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-1 py-6 text-[0.9375rem] text-muted sm:flex-row sm:justify-between">
          <p>© 2026 Shepherd&apos;s Old Field Market</p>
          {!IS_LIVE && <p>Concept preview by Lee Enterprises Unlimited.</p>}
        </div>
      </div>
    </footer>
  );
}
