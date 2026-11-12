"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A next/image that is only put in the DOM when it comes within `margin` of the viewport.
 * Used for photos a screen or more below the fold, so they never compete with the hero photo
 * for bandwidth on first load. `fill` images sit in a sized parent, so nothing shifts.
 */
export default function DeferredImage({ margin = "300px", ...props }: ImageProps & { margin?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  if (near) return <Image {...props} alt={props.alt} />;
  return <span ref={ref} aria-hidden="true" className="absolute inset-0 block" />;
}
