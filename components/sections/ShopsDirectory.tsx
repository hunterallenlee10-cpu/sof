"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { Search, X } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { SHOPS, type Shop } from "@/lib/shops";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const norm = (s: string) => s.toLowerCase().replace(/['’.()!&-]/g, "").replace(/\s+/g, " ").trim();

function ShopPill({ shop }: { shop: Shop }) {
  return (
    <li
      id={shop.id}
      tabIndex={-1}
      className="board flex min-h-10 items-center justify-between gap-2 rounded-[6px] px-3 py-1.5 transition-colors duration-300 outline-none"
    >
      <span className="font-medium">{shop.name}</span>
      <span className="flex shrink-0 items-center gap-1.5">
        {shop.isNew && <span className="rounded-full bg-brick px-2 py-0.5 text-[0.75rem] font-semibold text-white">New</span>}
        {shop.tag && <span className="text-[0.8125rem] whitespace-nowrap text-muted">{shop.tag}</span>}
      </span>
    </li>
  );
}

export default function ShopsDirectory() {
  const [query, setQuery] = useState("");
  const lagging = useDeferredValue(query);
  // Clearing the search applies at once (the Gift Finder relies on it); typing stays deferred.
  const deferred = query ? lagging : "";

  // The Gift Finder clears the search before it jumps to a shop.
  useEffect(() => {
    const onReveal = () => flushSync(() => setQuery(""));
    window.addEventListener("sof:reveal-shop", onReveal);
    return () => window.removeEventListener("sof:reveal-shop", onReveal);
  }, []);

  const groups = useMemo(() => {
    const q = norm(deferred);
    const list = q ? SHOPS.filter((s) => norm(s.name).includes(q) || (s.tag && norm(s.tag).includes(q))) : SHOPS;
    const map = new Map<string, Shop[]>();
    for (const s of list) map.set(s.letter, [...(map.get(s.letter) ?? []), s]);
    return [...map.entries()];
  }, [deferred]);

  const count = groups.reduce((n, [, l]) => n + l.length, 0);
  const letters = new Set(SHOPS.map((s) => s.letter));

  return (
    <section id="shops" aria-labelledby="shops-title" className="section-y">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="shops-title"
            eyebrow="The shops, A to Z"
            title="Meet the shops."
            intro="Over 90 locally owned shops and services under one roof. Here are the ones on our list today."
          />
          <div className="w-full lg:max-w-[24rem]">
            <label htmlFor="shop-search" className="mb-2 block font-semibold">
              Search 90+ shops
            </label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" strokeWidth={1.5} />
              <input
                id="shop-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try candles, leather, books"
                autoComplete="off"
                className="h-13 w-full rounded-[6px] border border-line bg-board pr-12 pl-12 text-base placeholder:text-muted focus:border-ink"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-1 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-md hover:text-brick"
                >
                  <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        </div>

        <nav aria-label="Shops A to Z" className="mt-8 border-y border-line">
          <ul className="no-scrollbar -mx-4 flex overflow-x-auto px-4 md:mx-0 md:justify-between md:px-0">
            {ALPHABET.map((L) =>
              letters.has(L) ? (
                <li key={L}>
                  <a
                    href={`#letter-${L}`}
                    className="inline-flex size-11 items-center justify-center font-display text-lg font-bold hover:bg-board hover:text-brick"
                  >
                    {L}
                  </a>
                </li>
              ) : (
                <li key={L} aria-hidden="true" className="inline-flex size-11 items-center justify-center font-display text-lg text-line">
                  {L}
                </li>
              ),
            )}
          </ul>
        </nav>

        <p className="mt-4 text-[0.9375rem] text-muted" aria-live="polite">
          {deferred ? `${count} ${count === 1 ? "shop matches" : "shops match"} "${deferred}"` : `${count} shops listed, A to Z`}
        </p>

        {count === 0 ? (
          <p className="mt-8 max-w-xl text-lg">No shop by that name on our list yet. New makers join all the time, so stop in and ask at the front.</p>
        ) : (
          <div className="mt-6 gap-x-6 sm:columns-2 lg:columns-3">
            {groups.map(([letter, shops]) => (
              <div key={letter} id={`letter-${letter}`} className="mb-6 break-inside-avoid">
                <h3 className="mb-2 flex items-center gap-3 text-2xl font-bold text-brick">
                  {letter}
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </h3>
                <ul className="grid gap-1.5">
                  {shops.map((s) => (
                    <ShopPill key={s.id} shop={s} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 font-display text-xl font-semibold">New makers join all the time. Stop in and see what is new.</p>
      </div>
    </section>
  );
}
