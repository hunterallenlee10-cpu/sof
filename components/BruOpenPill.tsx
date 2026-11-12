"use client";

import { brudergartenOpen } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

export default function BruOpenPill() {
  const now = useNow();
  const s = now ? brudergartenOpen(now) : null;
  return (
    <span className="inline-flex h-9 w-[15rem] items-center gap-2 rounded-full border border-cream/30 px-3 text-[0.875rem] font-medium text-cream" aria-live="polite">
      <span aria-hidden="true" className={`size-2 rounded-full ${s?.open ? "bg-cream" : "border border-cream/70"}`} />
      {s ? (s.open ? `Pouring now until ${s.until}` : "Closed right now") : "Open Tuesday to Sunday"}
    </span>
  );
}
