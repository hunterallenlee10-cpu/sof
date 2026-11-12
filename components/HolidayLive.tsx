"use client";

import { daysUntilChristmas, nextFirstFridayWeekend } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

/** Live days-until-Christmas. Renders an invisible placeholder of the same size before mount. */
export function ChristmasCount() {
  const now = useNow();
  const n = now ? daysUntilChristmas(now) : 44;
  if (now && n === null) {
    return <p className="font-display text-[2.5rem] leading-none font-bold sm:text-[3rem]">See you in the new year</p>;
  }
  return (
    <p className="flex items-end gap-3" aria-live="polite">
      <span className={`font-display text-[5.5rem] leading-[0.85] font-bold min-w-[2ch] text-brick tabular-nums sm:text-[7rem] ${now ? "" : "invisible"}`}>
        {n === 0 ? "0" : n}
      </span>
      <span className="pb-1 font-display text-[1.5rem] leading-tight font-semibold sm:text-[1.875rem]">
        {n === 0 ? "Merry Christmas" : n === 1 ? "day until Christmas" : "days until Christmas"}
      </span>
    </p>
  );
}

/** "Next: Friday, December 4 to Sunday, December 6" from the First Friday rule. */
export function FirstFridayDates() {
  const now = useNow();
  if (!now) return <span className="block">The first weekend of every month that includes a Friday.</span>;
  const w = nextFirstFridayWeekend(now);
  return (
    <span className="block">
      {w.isNow ? "On now, through " : "Next: "}
      {w.isNow ? w.sunday.longLabel : `${w.friday.longLabel} to ${w.sunday.longLabel}`}.
    </span>
  );
}
