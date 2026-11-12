"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Navigation, Phone, X } from "lucide-react";
import Wordmark from "../Wordmark";
import OpenNowPill from "../OpenNowPill";
import PlanButton from "../PlanButton";
import { BUSINESS, MAPS_URL } from "@/lib/business";

export const NAV_LINKS = [
  { href: "/#shops", label: "Shops" },
  { href: "/#gift-finder", label: "Gift Finder" },
  { href: "/#eat-and-drink", label: "Eat and Drink" },
  { href: "/#events", label: "Events" },
  { href: "/visit", label: "Visit" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const burger = burgerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = sheetRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && sheetRef.current) {
        const items = Array.from(sheetRef.current.querySelectorAll<HTMLElement>("a,button"));
        const a = items[0];
        const b = items[items.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-200 ${
        scrolled ? "border-b border-line bg-cream/85 backdrop-blur-md" : "border-b border-transparent bg-cream"
      }`}
    >
      <div className="container-x flex h-16 items-center gap-4">
        <Link href="/" className="-ml-1 inline-flex min-h-11 items-center px-1 text-[1.375rem]">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="ml-4 hidden lg:block xl:ml-6">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-md px-2.5 text-[0.9375rem] font-medium whitespace-nowrap hover:text-brick"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <OpenNowPill className="hidden w-[12.75rem] sm:inline-flex lg:hidden xl:inline-flex" />
          <a
            href={BUSINESS.phoneHref}
            className="hidden min-h-11 items-center gap-2 rounded-md px-2 font-semibold whitespace-nowrap hover:text-brick lg:inline-flex"
          >
            <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
            {BUSINESS.phoneDisplay}
          </a>
          <PlanButton className="btn btn-primary hidden lg:inline-flex" />
          <button
            ref={burgerRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-board lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-cream lg:hidden"
        >
          <div className="container-x flex h-16 shrink-0 items-center justify-between">
            <span className="text-[1.375rem]">
              <Wordmark />
            </span>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-board"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="container-x flex flex-1 flex-col pt-4 pb-8">
            <OpenNowPill className="inline-flex self-start" />
            <nav aria-label="Menu" className="mt-6">
              <ul className="divide-y divide-line border-y border-line">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-16 items-center font-display text-[2rem] font-semibold hover:text-brick"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto grid gap-3 pt-8">
              <div onClick={() => setOpen(false)}>
                <PlanButton className="btn btn-primary w-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a href={BUSINESS.phoneHref} className="btn btn-ghost">
                  <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} /> Call
                </a>
                <a href={MAPS_URL} target="_blank" rel="noopener" className="btn btn-ghost">
                  <Navigation aria-hidden="true" className="size-4" strokeWidth={1.5} /> Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
