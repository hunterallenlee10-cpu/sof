import Image from "next/image";
import type { Photo } from "@/lib/photos";

/** A cover-cropped photo in a fixed-ratio frame. Lazy by default, always sized, never stretched past native width. */
export default function Pic({
  photo,
  sizes,
  className = "",
  ratio,
  alt,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  ratio?: string;
  alt?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[6px] bg-board ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <Image src={photo.src} alt={alt ?? photo.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: photo.pos }} />
    </div>
  );
}
