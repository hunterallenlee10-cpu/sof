"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Expand } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { GALLERY, GALLERY_FILTERS, type GalleryFilter } from "@/lib/gallery";
import { PHOTOS } from "@/lib/photos";

const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [open, setOpen] = useState<number | null>(null);
  // Phones show the first 8 photos, then a "Show all" button. Tablets and up show everything.
  const [all, setAll] = useState(false);
  const PREVIEW = 8;
  const opener = useRef<HTMLButtonElement | null>(null);
  const items = filter === "All" ? GALLERY : GALLERY.filter((g) => g.tags.includes(filter));

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-y border-t border-line">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="gallery-title" eyebrow="Inside the market" title="Brick floors, tin roofs, good finds." />
          <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className="chip"
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  setAll(false);
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 lg:mt-12 lg:columns-4">
          {items.map((g, i) => {
            const p = PHOTOS[g.key];
            return (
              <li key={g.key} className={`mb-3 break-inside-avoid sm:mb-4 ${!all && i >= PREVIEW ? "max-md:hidden" : ""}`}>
                <button
                  type="button"
                  className="group relative block w-full overflow-hidden rounded-[6px] border border-line bg-board text-left"
                  aria-label={`Open photo: ${g.caption}`}
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setOpen(i);
                  }}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 1024px) 290px, (min-width: 768px) 33vw, 50vw"
                    className="block h-auto w-full"
                  />
                  <span className="flex items-center justify-between gap-2 px-3 py-2 text-[0.875rem] leading-snug font-medium">
                    {g.caption}
                    <Expand aria-hidden="true" className="hidden size-4 shrink-0 text-muted group-hover:text-brick sm:block" strokeWidth={1.5} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {!all && items.length > PREVIEW && (
          <button
            type="button"
            className="btn btn-ghost mt-2 w-full md:hidden"
            onClick={() => {
              flushSync(() => setAll(true));
              document.querySelectorAll<HTMLButtonElement>("#gallery ul button")[PREVIEW]?.focus();
            }}
          >
            Show all {items.length} photos
          </button>
        )}
      </div>
      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onIndex={setOpen}
          onClose={() => {
            setOpen(null);
            opener.current?.focus();
          }}
        />
      )}
    </section>
  );
}
