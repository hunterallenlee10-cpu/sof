"use client";

import { marketStatus } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

/** The words on the hero hang tag. Neutral on the server, the truth after mount. Fixed box, no shift. */
export default function HeroTagText() {
  const now = useNow();
  const s = now ? marketStatus(now) : null;
  return (
    <span className="flex h-full flex-col justify-center" aria-live="polite">
      <span className="flex items-center gap-1.5">
        {s?.state === "open" && <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-brick" />}
        <span className="font-display text-[1.125rem] leading-[1.05] whitespace-nowrap font-bold tracking-[0.02em] uppercase sm:text-[1.5rem]">
          {s ? s.headline : "Open Tue to Sun"}
        </span>
      </span>
      <span className="mt-1 text-[0.8125rem] leading-snug font-medium text-ink sm:text-[0.9375rem]">
        {s ? s.detail : "Closed Mondays"}
      </span>
    </span>
  );
}
