"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useNow } from "@/lib/useNow";
import { nextDays } from "@/lib/hours";
import { isEmail, isPhone } from "@/lib/planOutputs";
import type { PlannerPrefill } from "./types";
import { initialState, STEP_TITLES, stepsFor, type PlannerState, type StepKey } from "./state";
import { StepCategories, StepReasons, StepWhen, StepWho } from "./VisitSteps";
import PlanResult from "./PlanResult";
import { EventDone, StepEventContact, StepEventDetails, StepProduct, StepVendorContact, VendorDone } from "./OtherPaths";

type Errors = Record<string, string>;

function validate(step: StepKey, s: PlannerState): Errors {
  const e: Errors = {};
  if (step === "reasons" && s.reasons.length === 0) e.form = "Pick at least one so we can plan it.";
  if (step === "when") {
    if (!s.dayIso) e.form = "Pick a day.";
    else if (!s.time) e.form = "Pick morning, afternoon or evening.";
  }
  if (step === "who" && !s.party) e.form = "Let us know how many are coming.";
  if (step === "product") {
    if (s.product.trim().length < 3) e.product = "Tell the market a little about what you make or sell.";
    if (!s.alreadySold) e.alreadySold = "Pick one. Not sure is fine.";
  }
  if (step === "vendorContact") {
    if (!s.vName.trim()) e.vName = "Please add your name.";
    const c = s.vContact.trim();
    if (!c) e.vContact = "Add an email or a phone number so the market can reply.";
    else if (!isEmail(c) && !isPhone(c)) e.vContact = "That does not look like an email or a 10 digit phone number. Mind checking it?";
  }
  if (step === "eventDetails") {
    if (!s.eDate) e.eDate = "Pick a date.";
    if (!s.eGroup || Number(s.eGroup) < 1) e.eGroup = "About how many people?";
  }
  if (step === "eventContact") {
    if (!s.eName.trim()) e.eName = "Please add your name.";
    if (!isPhone(s.ePhone)) e.ePhone = "Add a 10 digit phone number so the market can call you back.";
  }
  return e;
}

export default function PlannerModal({
  prefill,
  onClose,
  inline = false,
}: {
  prefill: PlannerPrefill;
  onClose: () => void;
  /** Inline mode (the /visit page): no overlay, no scroll lock, no Esc, "Start over" instead of Close. */
  inline?: boolean;
}) {
  const [s, setS] = useState<PlannerState>(() => initialState(prefill));
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [errors, setErrors] = useState<Errors>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const now = useNow() ?? new Date();

  const steps = stepsFor(s);
  const step = steps[Math.min(i, steps.length - 1)];
  const isLast = i === steps.length - 1;
  const days = nextDays(now, 7);
  const day = days.find((d) => d.iso === s.dayIso);
  const patch = (p: Partial<PlannerState>) => {
    setS((prev) => ({ ...prev, ...p }));
    setErrors({});
  };

  // Lock page scroll; close on Esc; keep Tab inside.
  useEffect(() => {
    if (inline) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [inline]);

  const firstRender = useRef(true);
  useEffect(() => {
    // In the modal, focus the step heading from the start. Inline, only once someone moves between steps.
    if (inline && firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [i, inline]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (inline) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
    }
    if (e.key === "Tab" && dialogRef.current) {
      const els = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex='-1'])"),
      );
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === headingRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const next = () => {
    const e = validate(step, s);
    setErrors(e);
    if (Object.keys(e).length) {
      const firstBad = Object.keys(e).find((k) => k !== "form");
      const map: Record<string, string> = { product: "v-product", vName: "v-name", vContact: "v-contact", eDate: "e-date", eGroup: "e-group", eName: "e-name", ePhone: "e-phone" };
      if (firstBad && map[firstBad]) document.getElementById(map[firstBad])?.focus();
      return;
    }
    setDir(1);
    setI((n) => Math.min(n + 1, steps.length - 1));
  };
  const back = () => {
    setErrors({});
    setDir(-1);
    setI((n) => Math.max(n - 1, 0));
  };

  const minDate = days[0].iso;
  const counter = isLast ? "Done" : `Step ${i + 1} of ${steps.length - 1}`;
  const progress = isLast ? 100 : ((i + 1) / steps.length) * 100;

  const body = (
      <div
        ref={dialogRef}
        {...(inline
          ? { role: "region", "aria-labelledby": "planner-title" }
          : { role: "dialog", "aria-modal": true, "aria-labelledby": "planner-title", "aria-describedby": "planner-step" })}
        onKeyDown={onKeyDown}
        className={
          inline
            ? "flex w-full flex-col overflow-hidden rounded-[8px] border border-line bg-cream"
            : "flex h-[100dvh] w-full flex-col overflow-hidden bg-cream sm:h-auto sm:max-h-[min(92dvh,860px)] sm:max-w-[680px] sm:rounded-[8px] sm:border sm:border-line"
        }
      >
        <div className="border-b border-line px-5 pt-4 pb-4 sm:px-8 sm:pt-6">
          <div className="flex items-center justify-between gap-4">
            <p id="planner-title" className="eyebrow">
              {s.reasons.includes("sell") ? "Sell at SOF Market" : s.reasons.includes("event") ? "Host a private event" : "Plan your visit"}
            </p>
            {!inline && (
              <button type="button" onClick={onClose} aria-label="Close planner" className="-mr-2 inline-flex size-11 items-center justify-center rounded-md hover:bg-board">
                <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
              </button>
            )}
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-board" role="progressbar" aria-label="Progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-brick transition-[width] duration-200" style={{ width: `${progress}%` }} />
            </div>
            <span id="planner-step" className="text-[0.875rem] font-medium whitespace-nowrap text-muted">
              {counter}
            </span>
          </div>
        </div>

        <div className={`flex-1 px-5 py-6 sm:px-8 ${inline ? "" : "overflow-y-auto overscroll-contain"}`}>
          <div key={step} className={dir === 1 ? "plan-in-fwd" : "plan-in-back"}>
            <h2 ref={headingRef} tabIndex={-1} className="mb-5 text-[1.875rem] font-bold outline-none sm:text-[2.25rem]">
              {STEP_TITLES[step]}
            </h2>
            {step === "reasons" && <StepReasons s={s} patch={patch} />}
            {step === "categories" && <StepCategories s={s} patch={patch} />}
            {step === "when" && <StepWhen s={s} patch={patch} now={now} />}
            {step === "who" && <StepWho s={s} patch={patch} />}
            {step === "plan" && day && <PlanResult s={s} day={day} onClose={onClose} />}
            {step === "product" && <StepProduct s={s} patch={patch} errors={errors} />}
            {step === "vendorContact" && <StepVendorContact s={s} patch={patch} errors={errors} />}
            {step === "vendorDone" && <VendorDone s={s} />}
            {step === "eventDetails" && <StepEventDetails s={s} patch={patch} errors={errors} minDate={minDate} />}
            {step === "eventContact" && <StepEventContact s={s} patch={patch} errors={errors} />}
            {step === "eventDone" && <EventDone s={s} />}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line bg-cream px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:px-8 sm:py-4">
          {i > 0 ? (
            <button type="button" onClick={back} className="btn btn-ghost px-4">
              <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} /> Back
            </button>
          ) : (
            <span />
          )}
          <p className="flex-1 text-right text-[0.9375rem] text-brick" aria-live="assertive">
            {errors.form}
          </p>
          {isLast ? (
            <button type="button" onClick={onClose} className="btn btn-ghost">
              {inline ? "Start over" : "Close"}
            </button>
          ) : (
            <button type="button" onClick={next} className="btn btn-primary">
              {steps[i + 1] === "plan" ? "See my plan" : steps[i + 1]?.endsWith("Done") ? "Finish" : "Next"}
            </button>
          )}
        </div>
      </div>
  );

  if (inline) return body;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      {body}
    </div>
  );
}
