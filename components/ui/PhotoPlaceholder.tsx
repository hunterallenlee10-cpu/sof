import { Camera } from "lucide-react";

/** A labelled kraft tag standing in for a photo the market has not supplied yet. Never stock. */
export default function PhotoPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex h-full w-full items-center justify-center bg-board p-6 ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(211,195,166,0.35) 0 1px, transparent 1px 22px)",
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
