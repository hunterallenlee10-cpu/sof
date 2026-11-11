"use client";

import { BRUDERGARTEN_HOURS, hoursRows, MARKET_HOURS, nyParts, type Span } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

function Rows({ table, today }: { table: Record<number, Span>; today: number | null }) {
  return (
    <dl className="mt-3 grid gap-1">
      {hoursRows(table).map((r) => {
        const on = today !== null && r.weekdays.includes(today);
        return (
          <div key={r.days} className={`grid grid-cols-[1fr_auto] gap-4 rounded-[4px] px-2 py-1.5 ${on ? "bg-brick text-white" : ""}`}>
            <dt className={on ? "font-semibold" : "text-muted"}>
              {r.days}
              {on && <span className="ml-2 text-[0.8125rem] font-medium">(today)</span>}
            </dt>
            <dd className="font-medium whitespace-nowrap">{r.hours}</dd>
          </div>
        );
      })}
    </dl>
  );
}

/** Hours as a kraft hang tag, with today's row in brick (after mount, so no hydration mismatch). */
export default function HoursTagCard() {
  const now = useNow();
  const today = now ? nyParts(now).weekday : null;
  return (
    <div className="relative pt-10">
      <span aria-hidden="true" className="absolute top-0 left-[27px] z-10 h-[61px] w-px bg-brick" />
      <span aria-hidden="true" className="absolute top-[-3px] left-[24px] z-10 size-[7px] rounded-full bg-ink" />
      <div className="tag px-5 pt-9 pb-6 sm:px-7">
        <span className="tag-hole top-[12px] left-[22px]" aria-hidden="true" />
        <h2 className="text-[1.75rem] font-bold">Market hours</h2>
        <Rows table={MARKET_HOURS} today={today} />
        <h3 className="mt-6 text-xl font-bold">Brudergarten Beer Garden</h3>
        <Rows table={BRUDERGARTEN_HOURS} today={today} />
      </div>
    </div>
  );
}
