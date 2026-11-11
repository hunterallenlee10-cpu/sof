"use client";
import { useMemo, useSyncExternalStore } from "react";

/**
 * The current time, but only on the client. The server snapshot is null, so the server render and
 * the hydration pass agree, then React swaps in the live time. Ticks every minute.
 * A ?now=2026-11-14T15:00:00-05:00 query overrides the clock for screenshots and QA.
 */
function readNow(): number {
  const override = new URLSearchParams(window.location.search).get("now");
  if (override) {
    const t = new Date(override).getTime();
    if (!Number.isNaN(t)) return t;
  }
  return Math.floor(Date.now() / 60_000) * 60_000; // stable within a minute
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

export function useNow(): Date | null {
  const t = useSyncExternalStore<number | null>(subscribe, readNow, () => null);
  return useMemo(() => (t === null ? null : new Date(t)), [t]);
}
