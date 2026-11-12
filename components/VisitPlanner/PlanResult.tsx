"use client";

import { CalendarPlus, Check, MessageSquare, Navigation, Phone } from "lucide-react";
import { BUSINESS, MAPS_URL } from "@/lib/business";
import { formatSpan, type DayInfo } from "@/lib/hours";
import { GIFT_CATEGORIES } from "@/lib/giftFinder";
import { buildIcs, friendMessage, isFirstFridayWeekend, planSummary, smsHref, TIME_LABELS, type TimeOfDay } from "@/lib/planOutputs";
import { shopId } from "@/lib/shops";
import { revealShop } from "@/lib/revealShop";
import type { PlannerState } from "./state";

const INSIDE_EATERIES = ["Botanic Deli and Cafe", "Bowl 29", "Juice Buzz"];

export default function PlanResult({ s, day, onClose }: { s: PlannerState; day: DayInfo; onClose: () => void }) {
  const time = s.time as TimeOfDay;
  const shops = Array.from(new Set(GIFT_CATEGORIES.filter((c) => s.categories.includes(c.label)).flatMap((c) => c.shops)));
  const eateries = [...INSIDE_EATERIES, ...(day.brudergarten ? ["Brudergarten Beer Garden"] : [])];
  const summary = planSummary({ day, time, shops, service: s.service, eateries });
  const weekday = day.weekday;
  const happenings = [
    weekday === 3 && "Trivia Night at Brudergarten, 7 to 9 PM",
    weekday === 4 && "Karaoke Night at Brudergarten",
    isFirstFridayWeekend(day) && "First Friday Weekend Sales at select shops",
  ].filter(Boolean) as string[];

  const downloadIcs = () => {
    const blob = new Blob([buildIcs({ day, time, description: summary })], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sof-market-visit-${day.iso}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const name = s.firstName.trim();

  return (
    <div>
      <div className="tag px-5 pt-9 pb-6 sm:px-7">
        <span className="tag-hole top-3 left-4" aria-hidden="true" />
        <span className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full bg-brick text-white" aria-hidden="true">
          <Check className="size-5" strokeWidth={2} />
        </span>
        <p className="font-display text-[1.875rem] leading-tight font-bold sm:text-[2.25rem]">
          See you {day.label === "Today" ? "today" : day.label === "Tomorrow" ? "tomorrow" : day.label}
          {name ? `, ${name}` : ""}.
        </p>
        <p className="mt-1 text-muted">
          {day.longLabel}, {TIME_LABELS[time].toLowerCase()}
          {s.party ? `, ${s.party === "Just me" ? "just you" : `${s.party} people`}` : ""}
        </p>

        <dl className="mt-5 grid gap-3 border-t border-dashed border-line pt-5 text-[0.9375rem] sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Market hours</dt>
            <dd>{formatSpan(day.market)}</dd>
          </div>
          <div>
            <dt className="font-semibold">Brudergarten</dt>
            <dd>{formatSpan(day.brudergarten)}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold">Food inside</dt>
            {/* DRAFT: individual eatery hours not supplied yet */}
            <dd>Botanic Deli and Cafe, Bowl 29 and Juice Buzz</dd>
          </div>
          {s.service && (
            <div className="sm:col-span-2">
              <dt className="font-semibold">{s.service}</dt>
              {/* DRAFT: each service's own booking link */}
              <dd>Booking links are coming soon. Call the market for help.</dd>
            </div>
          )}
          {happenings.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="font-semibold">That day</dt>
              <dd>{happenings.join(". ")}.</dd>
            </div>
          )}
        </dl>

        {shops.length > 0 && (
          <div className="mt-5">
            <p className="text-[0.9375rem] font-semibold">Shops for your list</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {shops.map((n) => (
                <li key={n}>
                  <a
                    href={`/#${shopId(n)}`}
                    onClick={(e) => {
                      if (!document.getElementById(shopId(n))) return; // on /visit, let the link go home
                      e.preventDefault();
                      onClose();
                      window.setTimeout(() => revealShop(shopId(n)), 50);
                    }}
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-cream px-3 text-[0.875rem] font-medium hover:border-ink"
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <a href={MAPS_URL} target="_blank" rel="noopener" className="btn btn-primary">
          <Navigation aria-hidden="true" className="size-4" strokeWidth={1.5} /> Get directions
        </a>
        <button type="button" onClick={downloadIcs} className="btn btn-ghost">
          <CalendarPlus aria-hidden="true" className="size-4" strokeWidth={1.5} /> Add to calendar
        </button>
        <a href={smsHref(friendMessage(summary))} className="btn btn-ghost">
          <MessageSquare aria-hidden="true" className="size-4" strokeWidth={1.5} /> Send this plan to a friend
        </a>
        <a href={BUSINESS.phoneHref} className="btn btn-ghost">
          <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} /> Call {BUSINESS.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
