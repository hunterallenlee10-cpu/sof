"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const PlannerModal = dynamic(() => import("./VisitPlanner/PlannerModal"), {
  ssr: false,
  loading: () => <div className="min-h-[520px] rounded-[8px] border border-line bg-board/50" aria-hidden="true" />,
});

/** The Visit Planner embedded in the /visit page. "Start over" remounts it fresh. */
export default function InlinePlanner() {
  const [run, setRun] = useState(0);
  return (
    <div className="min-h-[520px]">
      <PlannerModal key={run} inline prefill={{}} onClose={() => setRun((n) => n + 1)} />
    </div>
  );
}
