"use client";
// Temporary stub, replaced in phase 5.
export default function PlannerModal({ onClose }: { prefill: unknown; onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Plan your visit" className="fixed inset-0 z-50 grid place-items-center bg-ink/50">
      <button className="btn btn-primary" onClick={onClose}>Close</button>
    </div>
  );
}
