import Image from "next/image";
import PhotoPlaceholder from "../ui/PhotoPlaceholder";
import { GIFT_CATEGORIES } from "@/lib/giftFinder";
import { PHOTOS } from "@/lib/photos";

/**
 * Every category's photo is stacked in the panel and the selected one fades in over 300ms.
 * Stacking means the next photo is already loaded when the visitor (or the auto-cycle) switches.
 * The stack mounts once the section is within ~600px of the viewport.
 */
export default function GiftPhotoPanel({ selected, near }: { selected: string; near: boolean }) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-[6px] border border-line bg-board shadow-board lg:aspect-auto lg:h-full lg:min-h-[480px]">
      {GIFT_CATEGORIES.map((c) => {
        const on = c.key === selected;
        // Nothing loads until the section is close to the viewport, so the stack never
        // competes with the hero photo for bandwidth on first load.
        if (!near) return null;
        const [main, second] = c.photos;
        return (
          <div
            key={c.key}
            aria-hidden={!on}
            className={`absolute inset-0 transition-opacity duration-300 ease-out ${on ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            {main ? (
              <>
                <Image
                  src={PHOTOS[main.key].src}
                  alt={on ? PHOTOS[main.key].alt : ""}
                  fill
                  sizes="(min-width: 1024px) 680px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: PHOTOS[main.key].pos }}
                />
                {second && (
                  <figure className="absolute right-3 bottom-3 w-[34%] rotate-2 rounded-[6px] border border-line bg-board p-1 shadow-board sm:right-5 sm:bottom-5 sm:w-[30%] sm:p-1.5">
                    <Image
                      src={PHOTOS[second.key].src}
                      alt={on ? PHOTOS[second.key].alt : ""}
                      width={PHOTOS[second.key].width}
                      height={PHOTOS[second.key].height}
                      sizes="(min-width: 1024px) 200px, 34vw"
                      className="block aspect-square h-auto w-full rounded-[4px] object-cover"
                      style={{ objectPosition: PHOTOS[second.key].pos }}
                    />
                    <figcaption className="px-1 pt-1 text-[0.75rem] leading-tight font-medium sm:text-[0.8125rem]">{second.caption}</figcaption>
                  </figure>
                )}
                <p className="absolute bottom-3 left-3 rounded-[4px] bg-cream/95 px-2.5 py-1 text-[0.875rem] font-medium sm:bottom-5 sm:left-5">
                  {main.caption}
                </p>
              </>
            ) : (
              <PhotoPlaceholder label={c.placeholder ?? "Photo coming soon"} />
            )}
          </div>
        );
      })}
    </div>
  );
}
