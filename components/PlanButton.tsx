"use client";

import type { ReactNode } from "react";
import { usePlanner } from "./VisitPlanner/PlannerProvider";
import type { PlannerPrefill } from "./VisitPlanner/types";

/** Anything that opens the Visit Planner is a real <button>. */
export default function PlanButton({
  prefill,
  className = "btn btn-primary",
  children = "Plan My Visit",
  ariaLabel,
}: {
  prefill?: PlannerPrefill;
  className?: string;
  children?: ReactNode;
  ariaLabel?: string;
}) {
  const { openPlanner } = usePlanner();
  return (
    <button type="button" className={className} aria-haspopup="dialog" aria-label={ariaLabel} onClick={() => openPlanner(prefill)}>
      {children}
    </button>
  );
}
