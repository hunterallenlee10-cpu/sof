"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import type { PlannerPrefill } from "./types";

// The modal is only downloaded when someone opens it, so it costs nothing on first load.
const PlannerModal = dynamic(() => import("./PlannerModal"), { ssr: false });

type Ctx = { openPlanner: (prefill?: PlannerPrefill) => void };
const PlannerContext = createContext<Ctx>({ openPlanner: () => {} });

export function usePlanner() {
  return useContext(PlannerContext);
}

export default function PlannerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; prefill: PlannerPrefill; key: number }>({
    open: false,
    prefill: {},
    key: 0,
  });
  const returnFocus = useRef<HTMLElement | null>(null);

  const openPlanner = useCallback((prefill: PlannerPrefill = {}) => {
    returnFocus.current = (document.activeElement as HTMLElement) ?? null;
    setState((s) => ({ open: true, prefill, key: s.key + 1 }));
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    const el = returnFocus.current;
    if (el && document.contains(el)) window.setTimeout(() => el.focus(), 0);
  }, []);

  return (
    <PlannerContext.Provider value={{ openPlanner }}>
      {children}
      {state.open && <PlannerModal key={state.key} prefill={state.prefill} onClose={close} />}
    </PlannerContext.Provider>
  );
}
