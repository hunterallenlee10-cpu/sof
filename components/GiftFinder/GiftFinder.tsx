"use client";

import { useEffect, useEffectEvent, useRef, useState, type KeyboardEvent } from "react";
import GiftPhotoPanel from "./GiftPhotoPanel";
import GiftTagCard from "./GiftTagCard";
import SectionHeading from "../ui/SectionHeading";
import { AUTO_CYCLE, GIFT_CATEGORIES } from "@/lib/giftFinder";

const STEP_MS = 1600;

export default function GiftFinder() {
  const [selected, setSelected] = useState(AUTO_CYCLE[0]);
  const [shown, setShown] = useState(AUTO_CYCLE[0]); // what the tag shows; lags `selected` by half a flip
  const [flipping, setFlipping] = useState(false);
  const selectedRef = useRef(selected);
  const sectionRef = useRef<HTMLElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const cycleTimers = useRef<number[]>([]);
  const userTookOver = useRef(false);

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const choose = (key: string) => {
    if (key === selectedRef.current) return;
    selectedRef.current = key;
    setSelected(key);
    if (reduceMotion()) setShown(key);
    else setFlipping(true); // the tag turns to 90deg, swaps content on transitionend, turns back
    // On phones the chip row scrolls sideways: bring the chosen chip into view without moving the page.
    const row = rowRef.current;
    const chip = chipRefs.current[GIFT_CATEGORIES.findIndex((c) => c.key === key)];
    if (row && chip && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: chip.offsetLeft - 16, behavior: reduceMotion() ? "auto" : "smooth" });
    }
  };

  const stopCycle = () => {
    userTookOver.current = true;
    cycleTimers.current.forEach((t) => window.clearTimeout(t));
    cycleTimers.current = [];
  };

  const chooseFromCycle = useEffectEvent((key: string) => choose(key));

  // Auto-cycle once through three categories the first time the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduceMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || userTookOver.current) return;
        io.disconnect();
        AUTO_CYCLE.slice(1).forEach((key, i) => {
          cycleTimers.current.push(
            window.setTimeout(() => {
              if (!userTookOver.current) chooseFromCycle(key);
            }, STEP_MS * (i + 1)),
          );
        });
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    const timers = cycleTimers.current;
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const onChipKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const n = GIFT_CATEGORIES.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    stopCycle();
    choose(GIFT_CATEGORIES[next].key);
    chipRefs.current[next]?.focus();
  };

  const category = GIFT_CATEGORIES.find((c) => c.key === shown)!;

  return (
    <section
      id="gift-finder"
      ref={sectionRef}
      aria-labelledby="gift-title"
      className="section-y border-y border-line bg-board/50"
      onClick={stopCycle}
      onKeyDown={stopCycle}
    >
      <div className="container-x">
        <SectionHeading
          id="gift-title"
          eyebrow="Gift Finder"
          title="Who are you shopping for?"
          intro="Pick a person. We will point you to the shops that fit."
        />

        <div
          role="radiogroup"
          aria-labelledby="gift-title"
          ref={rowRef}
          className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 lg:mt-10"
        >
          {GIFT_CATEGORIES.map((c, i) => {
            const on = c.key === selected;
            return (
              <button
                key={c.key}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                className="chip snap-start"
                onClick={() => {
                  stopCycle();
                  choose(c.key);
                }}
                onKeyDown={(e) => onChipKey(e, i)}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <GiftPhotoPanel selected={selected} />
          <GiftTagCard
            category={category}
            flipping={flipping}
            onFlipMid={() => {
              setShown(selectedRef.current);
              setFlipping(false);
            }}
          />
        </div>
      </div>
    </section>
  );
}
