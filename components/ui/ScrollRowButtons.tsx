"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/** Previous / next buttons for a horizontal snap row, for people without a trackpad. */
export default function ScrollRowButtons({ target, label }: { target: string; label: string }) {
  const go = (dir: 1 | -1) => {
    const row = document.getElementById(target);
    if (!row) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: dir * Math.min(420, row.clientWidth * 0.8), behavior: reduce ? "auto" : "smooth" });
  };
  const cls = "inline-flex size-12 items-center justify-center rounded-full border border-ink hover:bg-ink hover:text-cream";
  return (
    <div className="hidden shrink-0 gap-2 md:flex">
      <button type="button" className={cls} aria-label={`Scroll ${label} left`} aria-controls={target} onClick={() => go(-1)}>
        <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </button>
      <button type="button" className={cls} aria-label={`Scroll ${label} right`} aria-controls={target} onClick={() => go(1)}>
        <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
