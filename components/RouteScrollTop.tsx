"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * New pages open at the very top (above the announcement bar). Next only scrolls to the first
 * page element, which sits under the sticky header. Back and forward keep the browser's restored
 * position, and links with a #hash are left to scroll to their target.
 */
export default function RouteScrollTop() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => (popped.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (popped.current) {
      popped.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
