import type { ReactNode } from "react";

export default function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  className = "",
  dark = false,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`max-w-[46rem] ${className}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${dark ? "!text-cream/80" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className="text-[2.25rem] font-bold tracking-[-0.01em] sm:text-[3rem] lg:text-[3.5rem]">
        {title}
      </h2>
      {intro && <p className={`mt-4 text-[1.0625rem] sm:text-lg ${dark ? "text-cream/85" : "text-ink/80"}`}>{intro}</p>}
    </div>
  );
}
