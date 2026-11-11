"use client";

import { ArrowDownRight } from "lucide-react";
import PlanButton from "../PlanButton";
import { revealShop } from "@/lib/revealShop";
import { NEWEST_SHOP, shopId } from "@/lib/shops";
import type { GiftCategory } from "@/lib/giftFinder";

/**
 * Signature motion 2: the result tag turns on its twine (rotateY to 90deg), swaps its words
 * while edge-on, and turns back. Transform only.
 */
export default function GiftTagCard({
  category,
  flipping,
  onFlipMid,
}: {
  category: GiftCategory;
  flipping: boolean;
  onFlipMid: () => void;
}) {
  return (
    <div className="relative pt-9 [perspective:900px] lg:pt-11">
      {/* twine from the top edge to the punched hole */}
      <span aria-hidden="true" className="absolute top-0 left-[27px] z-10 h-[53px] w-px bg-brick lg:h-[61px]" />
      <span aria-hidden="true" className="absolute top-[-3px] left-[24px] z-10 size-[7px] rounded-full bg-ink" />
      <div
        className="tag min-h-[400px] px-6 pt-10 pb-7 sm:px-8 lg:min-h-[440px]"
        style={{
          transformOrigin: "27px 0",
          transform: flipping ? "rotateY(90deg)" : "rotateY(0deg)",
          transition: `transform 110ms ${flipping ? "ease-in" : "ease-out"}`,
        }}
        onTransitionEnd={(e) => {
          if (flipping && e.propertyName === "transform") onFlipMid();
        }}
        aria-live="polite"
      >
        <span className="tag-hole top-[12px] left-[22px]" aria-hidden="true" />
        <p className="text-[0.8125rem] font-semibold tracking-[0.12em] text-muted uppercase">Shopping for</p>
        <h3 className="mt-1 text-[2.25rem] font-bold text-ink sm:text-[2.75rem]">{category.label}</h3>
        <p className="mt-2 text-[1.0625rem] text-ink/85">{category.line}</p>

        <p className="mt-6 text-[0.875rem] font-semibold">Shops that fit</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {category.shops.map((name) => {
            const id = shopId(name);
            return (
              <li key={name}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    revealShop(id);
                  }}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-cream px-3.5 text-[0.9375rem] font-medium hover:border-ink"
                >
                  {name}
                  {name === NEWEST_SHOP && (
                    <span className="rounded-full bg-brick px-2 py-0.5 text-[0.75rem] font-semibold text-white">New in the market</span>
                  )}
                  <ArrowDownRight aria-hidden="true" className="size-3.5 text-muted" strokeWidth={1.5} />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <PlanButton prefill={{ reasons: ["holiday"], categories: [category.label] }} className="btn btn-primary">
            Plan a visit for this
          </PlanButton>
        </div>
      </div>
    </div>
  );
}
