"use client";

import { marketStatus } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

/** Server renders a neutral line; the live state swaps in after mount in a fixed-width box. */
export default function OpenNowPill({ className = "" }: { className?: string }) {
  const now = useNow();
  const status = now ? marketStatus(now) : null;
  const text = status ? status.pill : "Open Tuesday to Sunday";
  const lit = status?.state === "open";
  return (
    <span
      className={`h-9 items-center justify-center gap-2 rounded-full border border-line bg-board px-3 text-[0.8125rem] font-medium whitespace-nowrap text-ink ${className}`}
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={`size-2 shrink-0 rounded-full ${lit ? "bg-brick" : "border border-muted bg-transparent"}`}
      />
      <span>{text}</span>
    </span>
  );
}
