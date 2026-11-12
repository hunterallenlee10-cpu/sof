import { Camera } from "lucide-react";

/**
 * A labelled kraft tag standing in for a photo the market has not supplied yet. Never stock.
 * `compact` is for small frames (cards): just the camera and a short label, no hang tag.
 */
export default function PhotoPlaceholder({ label, className = "", compact = false }: { label: string; className?: string; compact?: boolean }) {
  if (compact) {
    return (
      <div
        role="img"
        aria-label={label}
        className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-[6px] border border-dashed border-muted/50 bg-cream p-3 text-center ${className}`}
      >
        <Camera aria-hidden="true" className="size-6 text-muted" strokeWidth={1.5} />
        <span className="text-[0.8125rem] leading-snug font-medium text-muted">{label.replace(/, from SOF Market$/, "")}</span>
        <span className="text-[0.8125rem] leading-snug text-muted">Photo coming soon</span>
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex h-full w-full items-center justify-center bg-board p-6 ${className}`}
      style={{
        backgroundImage: "repeating-linear-gradient(90deg, rgba(211,195,166,0.35) 0 1px, transparent 1px 22px)",
      }}
    >
      <div className="tag max-w-[16rem] px-5 pt-7 pb-5 text-center">
        <span className="tag-hole top-2.5 left-3" aria-hidden="true" />
        <Camera aria-hidden="true" className="mx-auto size-6 text-muted" strokeWidth={1.5} />
        <p className="mt-2 font-display text-lg leading-snug font-semibold">{label}</p>
        <p className="mt-1 text-[0.875rem] text-muted">Placeholder until the market sends one</p>
      </div>
    </div>
  );
}
