"use client";

/** Scroll to a shop in the directory and light it up in brick for 1.5s. Clears any search first. */
export function revealShop(id: string) {
  window.dispatchEvent(new CustomEvent("sof:reveal-shop", { detail: id }));
  // Let the directory re-render with the search cleared before scrolling.
  window.requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    history.replaceState(null, "", `#${id}`);
    el.classList.add("shop-flash");
    window.setTimeout(() => el.classList.remove("shop-flash"), 1500);
    el.focus({ preventScroll: true });
  });
}
