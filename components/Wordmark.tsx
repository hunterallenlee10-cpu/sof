// The market's own "SOF|MARKET" mark, set in type: SOF bold in brick, a thin rule, MARKET light.
export default function Wordmark({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center font-sans leading-none ${light ? "text-cream" : "text-ink"} ${className}`}
      aria-label="SOF Market"
      role="img"
    >
      <span className={`font-bold tracking-[0.04em] ${light ? "text-cream" : "text-brick"}`}>SOF</span>
      <span aria-hidden="true" className={`mx-[0.32em] inline-block h-[0.95em] w-px ${light ? "bg-cream/70" : "bg-ink/60"}`} />
      <span className="font-light tracking-[0.08em]">MARKET</span>
    </span>
  );
}
