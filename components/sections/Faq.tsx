import { Plus } from "lucide-react";
import { FAQ } from "@/lib/faq";

export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="section-y border-t border-line">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Good to know</p>
          <h2 id="faq-title" className="text-[2.25rem] font-bold sm:text-[3rem]">
            Questions, answered.
          </h2>
        </div>
        <div className="border-t border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[1.375rem] font-semibold hover:text-brick [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <Plus aria-hidden="true" className="size-5 shrink-0 transition-transform group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              <p className="max-w-[44rem] pb-6 text-[1.0625rem] text-ink/85">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
