import type { Metadata } from "next";
import Link from "next/link";
import PlanButton from "@/components/PlanButton";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Shepherd's Old Field Market" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="section-y">
      <div className="container-x max-w-3xl text-center">
        <p className="font-display text-[5rem] leading-none font-bold text-brick sm:text-[7rem]">404</p>
        <h1 id="nf-title" className="mt-4 text-[2.25rem] font-bold sm:text-[3rem]">
          This aisle is empty.
        </h1>
        <p className="mt-3 text-lg text-ink/85">Head back to the front door.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to the front door
          </Link>
          <PlanButton className="btn btn-ghost" />
        </div>
      </div>
    </section>
  );
}
