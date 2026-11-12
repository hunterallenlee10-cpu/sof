import PlanButton from "../PlanButton";
import Pic from "../ui/Pic";
import { BUSINESS } from "@/lib/business";
import { PHOTOS } from "@/lib/photos";

export default function VendorBand() {
  return (
    <section id="sell" aria-labelledby="sell-title" className="section-y border-t border-line bg-board/50">
      <div className="container-x grid items-center gap-10 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <figure className="relative mx-auto w-full max-w-[340px] -rotate-3">
          {/* a pushpin, the way it hangs on the market wall */}
          <span aria-hidden="true" className="absolute top-2 left-1/2 z-10 size-3.5 -translate-x-1/2 rounded-full bg-brick shadow-board" />
          <div className="rounded-[6px] border border-line bg-board p-2 shadow-board">
            <Pic photo={PHOTOS.spaceAvailable} sizes="340px" ratio="882 / 868" className="rounded-[4px]" />
          </div>
        </figure>
        <div>
          <p className="eyebrow mb-3">Sell at SOF Market</p>
          <h2 id="sell-title" className="max-w-[40rem] text-[2.25rem] font-bold sm:text-[3rem]">
            Have a big idea? Give it a place to grow.
          </h2>
          <p className="mt-5 max-w-[36rem] text-[1.0625rem] sm:text-lg">
            A few spaces are open for unique products not already in the market. Makers, artists and new small businesses welcome.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PlanButton prefill={{ reasons: ["sell"] }}>Ask about a space</PlanButton>
            <a href={`mailto:${BUSINESS.vendorEmail}?subject=${encodeURIComponent("Space enquiry")}`} className="link-u min-h-11 py-2.5 break-all">
              Or email {BUSINESS.vendorEmail}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
