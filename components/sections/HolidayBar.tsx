import PlanButton from "../PlanButton";

// DRAFT: seasonal, swap per month.
export default function HolidayBar() {
  return (
    <aside aria-label="This month at the market" className="border-b border-line bg-board">
      <div className="container-x flex items-center justify-center gap-x-3 text-center text-[0.9375rem] font-medium text-brick">
        <p className="leading-tight">
          First Friday Weekend Sales<span className="hidden sm:inline"> at select shops</span>.
          <span className="hidden md:inline"> Open Tuesday to Sunday.</span>
        </p>
        <PlanButton
          prefill={{ reasons: ["holiday"] }}
          className="link-u inline-flex min-h-11 shrink-0 items-center font-semibold text-ink"
        >
          Plan My Visit
        </PlanButton>
      </div>
    </aside>
  );
}
