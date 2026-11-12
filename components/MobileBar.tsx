"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Navigation, Phone } from "lucide-react";
import PlanButton from "./PlanButton";
import { BUSINESS, MAPS_URL } from "@/lib/business";

/**
 * Phones: a sticky Call / Directions / Plan My Visit bar once the hero's own buttons scroll away.
 * Everyone: a Back to top button after 1.5 screens.
 */
export default function MobileBar() {
  const [showBar, setShowBar] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setShowBar(y > vh * 0.6);
      setShowTop(y > vh * 1.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <>
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        inert={!showTop}
        className={`fixed right-4 z-30 inline-flex size-12 items-center justify-center rounded-full border border-line bg-cream shadow-board transition-opacity duration-200 hover:border-ink ${
          showBar ? "bottom-[84px]" : "bottom-4"
        } lg:bottom-6 lg:right-6 ${showTop ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </button>

      <div
        inert={!showBar}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-3 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-200 lg:hidden ${
          showBar ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
      >
        <nav aria-label="Quick actions" className="mx-auto grid max-w-md grid-cols-[1fr_1fr_1.45fr] gap-1.5 min-[360px]:gap-2">
          <a href={BUSINESS.phoneHref} className="btn btn-ghost px-1.5 text-[0.9375rem] max-[359px]:text-[0.875rem]">
            <Phone aria-hidden="true" className="size-4 max-[359px]:hidden" strokeWidth={1.5} /> Call
          </a>
          <a href={MAPS_URL} target="_blank" rel="noopener" className="btn btn-ghost px-1.5 text-[0.9375rem] max-[359px]:text-[0.875rem]">
            <Navigation aria-hidden="true" className="size-4 max-[359px]:hidden" strokeWidth={1.5} /> Directions
          </a>
          <PlanButton className="btn btn-primary px-1.5 text-[0.9375rem] max-[359px]:text-[0.875rem]" />
        </nav>
      </div>
    </>
  );
}
