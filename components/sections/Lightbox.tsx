"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PHOTOS } from "@/lib/photos";
import type { GalleryItem } from "@/lib/gallery";

/** Full-screen photo viewer: arrow keys, swipe, Esc, focus kept inside. No animation. */
export default function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: GalleryItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const item = items[index];
  const photo = PHOTOS[item.key];
  const go = (d: number) => onIndex((index + d + items.length) % items.length);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "Tab" && ref.current) {
      const els = Array.from(ref.current.querySelectorAll<HTMLElement>("button"));
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const btn = "inline-flex size-12 items-center justify-center rounded-full bg-cream text-ink hover:bg-board";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}: ${item.caption}`}
      className="on-dark fixed inset-0 z-[70] flex flex-col bg-ink text-cream"
      onKeyDown={onKey}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between p-3 sm:p-5">
        <p className="text-[0.9375rem] text-cream/80">
          {index + 1} / {items.length}
        </p>
        <button type="button" data-close className={btn} aria-label="Close photo" onClick={onClose}>
          <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 900px, 100vw"
          className="h-auto max-h-full w-auto max-w-full rounded-[4px] object-contain"
        />
        <button type="button" className={`${btn} absolute top-1/2 left-3 -translate-y-1/2 max-sm:hidden sm:left-5`} aria-label="Previous photo" onClick={() => go(-1)}>
          <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
        <button type="button" className={`${btn} absolute top-1/2 right-3 -translate-y-1/2 max-sm:hidden sm:right-5`} aria-label="Next photo" onClick={() => go(1)}>
          <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-4 p-4 sm:justify-center sm:p-6">
        <button type="button" className={`${btn} sm:hidden`} aria-label="Previous photo" onClick={() => go(-1)}>
          <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
        <p className="text-center font-display text-lg font-semibold">{item.caption}</p>
        <button type="button" className={`${btn} sm:hidden`} aria-label="Next photo" onClick={() => go(1)}>
          <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
