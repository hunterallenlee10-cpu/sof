import { Quote } from "lucide-react";
import { BUSINESS } from "@/lib/business";

// DRAFT: real figure as of Nov 11, 2026, refresh before launch.
const STAT = "92% of 28 Facebook reviewers recommend SOF Market";

// Sample cards only. Replace with real Google or Facebook reviews (with permission) before launch.
const SAMPLES = [
  "Found a gift for everyone on my list, then stayed for a pretzel at Brudergarten.",
  "Every booth is different. We stop in every few weeks and there is always something new.",
  "Trivia Wednesday is our standing date night now.",
];

export default function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="section-y border-t border-line">
      <div className="container-x">
        <p className="eyebrow mb-3">What people say</p>
        <h2 id="reviews-title" className="max-w-[48rem] text-[2rem] font-bold sm:text-[2.75rem]">
          <span className="text-brick">92%</span> of 28 Facebook reviewers recommend SOF Market.
        </h2>
        <p className="sr-only">{STAT}</p>
        <a href={BUSINESS.facebook} target="_blank" rel="noopener" className="link-u mt-3 inline-flex min-h-11 items-center text-muted">
          Read the reviews on Facebook
        </a>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {SAMPLES.map((q, i) => (
            <li key={i} className={`board flex flex-col rounded-[6px] p-6 ${i === 1 ? "md:translate-y-6" : ""}`}>
              <p className="border-b border-dashed border-brick/60 pb-3 text-[0.8125rem] leading-snug text-brick">
                <span className="font-semibold">Sample review:</span> replace with real Google or Facebook reviews
              </p>
              <Quote aria-hidden="true" className="mt-5 size-6 text-brick" strokeWidth={1.5} />
              <p className="mt-2 flex-1 font-display text-[1.375rem] leading-snug font-semibold">{q}</p>
              <p className="mt-4 text-[0.9375rem] text-muted">Sample customer</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
