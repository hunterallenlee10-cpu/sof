"use client";

import { Check, Mail, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { eventMailto, vendorMailto } from "@/lib/planOutputs";
import type { Patch, PlannerState } from "./state";

const input = "mt-2 h-12 w-full rounded-[6px] border bg-board px-4 text-base focus:border-ink";

export function Field({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 first:mt-0">
      <label htmlFor={id} className="block font-semibold">
        {label}
        {hint && <span className="font-normal text-muted"> {hint}</span>}
      </label>
      {children}
      <p id={`${id}-err`} className="mt-1.5 min-h-5 text-[0.9375rem] text-brick" aria-live="polite">
        {error}
      </p>
    </div>
  );
}

export const inputCls = (bad?: string) => `${input} ${bad ? "border-brick" : "border-line"}`;

/* Vendor path */

export function StepProduct({ s, patch, errors }: { s: PlannerState; patch: Patch; errors: Record<string, string> }) {
  return (
    <div>
      <Field id="v-product" label="What do you make or sell?" error={errors.product}>
        <textarea
          id="v-product"
          value={s.product}
          rows={3}
          onChange={(e) => patch({ product: e.target.value })}
          aria-invalid={!!errors.product}
          aria-describedby="v-product-err"
          className={`${inputCls(errors.product)} h-auto py-3`}
          placeholder="Hand-poured candles, wood signs, dog treats"
        />
      </Field>
      <fieldset className="mt-2">
        <legend className="font-semibold">Is it already sold in the market?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["Not that I know of", "Not sure"] as const).map((o) => (
            <button key={o} type="button" className="chip" aria-pressed={s.alreadySold === o} onClick={() => patch({ alreadySold: o })}>
              {o}
            </button>
          ))}
        </div>
        <p className="mt-1.5 min-h-5 text-[0.9375rem] text-brick" aria-live="polite">
          {errors.alreadySold}
        </p>
      </fieldset>
    </div>
  );
}

export function StepVendorContact({ s, patch, errors }: { s: PlannerState; patch: Patch; errors: Record<string, string> }) {
  return (
    <div>
      <Field id="v-name" label="Your name" error={errors.vName}>
        <input id="v-name" value={s.vName} onChange={(e) => patch({ vName: e.target.value })} autoComplete="name" aria-invalid={!!errors.vName} aria-describedby="v-name-err" className={inputCls(errors.vName)} />
      </Field>
      <Field id="v-contact" label="Email or phone" error={errors.vContact}>
        <input
          id="v-contact"
          value={s.vContact}
          onChange={(e) => patch({ vContact: e.target.value })}
          autoComplete="email"
          aria-invalid={!!errors.vContact}
          aria-describedby="v-contact-err"
          className={inputCls(errors.vContact)}
        />
      </Field>
    </div>
  );
}

export function VendorDone({ s }: { s: PlannerState }) {
  return (
    <div className="tag px-5 pt-9 pb-6 sm:px-7">
      <span className="tag-hole top-3 left-4" aria-hidden="true" />
      <span className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full bg-brick text-white" aria-hidden="true">
        <Check className="size-5" strokeWidth={2} />
      </span>
      <p className="font-display text-[1.75rem] leading-tight font-bold">Thanks. Send this to the market and they will be in touch.</p>
      {/* DRAFT: confirm reply timing */}
      <p className="mt-3 text-muted">Your note is written and ready. Tap the button to send it from your own email.</p>
      <a
        href={vendorMailto({ product: s.product.trim(), alreadySold: s.alreadySold ?? "Not sure", name: s.vName.trim(), contact: s.vContact.trim() })}
        className="btn btn-primary mt-6 w-full text-lg sm:w-auto"
      >
        <Mail aria-hidden="true" className="size-5" strokeWidth={1.5} /> Email the market
      </a>
      <p className="mt-3 text-[0.875rem] break-all text-muted">Goes to {BUSINESS.vendorEmail}</p>
    </div>
  );
}

/* Private event path */

export function StepEventDetails({ s, patch, errors, minDate }: { s: PlannerState; patch: Patch; errors: Record<string, string>; minDate: string }) {
  return (
    <div>
      <Field id="e-date" label="Date" error={errors.eDate}>
        <input id="e-date" type="date" min={minDate} value={s.eDate} onChange={(e) => patch({ eDate: e.target.value })} aria-invalid={!!errors.eDate} aria-describedby="e-date-err" className={inputCls(errors.eDate)} />
      </Field>
      <Field id="e-group" label="Group size" error={errors.eGroup}>
        <input
          id="e-group"
          type="number"
          inputMode="numeric"
          min={1}
          value={s.eGroup}
          onChange={(e) => patch({ eGroup: e.target.value })}
          aria-invalid={!!errors.eGroup}
          aria-describedby="e-group-err"
          className={`${inputCls(errors.eGroup)} max-w-[10rem]`}
        />
      </Field>
    </div>
  );
}

export function StepEventContact({ s, patch, errors }: { s: PlannerState; patch: Patch; errors: Record<string, string> }) {
  return (
    <div>
      <Field id="e-name" label="Your name" error={errors.eName}>
        <input id="e-name" value={s.eName} onChange={(e) => patch({ eName: e.target.value })} autoComplete="name" aria-invalid={!!errors.eName} aria-describedby="e-name-err" className={inputCls(errors.eName)} />
      </Field>
      <Field id="e-phone" label="Phone" error={errors.ePhone}>
        <input id="e-phone" type="tel" value={s.ePhone} onChange={(e) => patch({ ePhone: e.target.value })} autoComplete="tel" aria-invalid={!!errors.ePhone} aria-describedby="e-phone-err" className={inputCls(errors.ePhone)} />
      </Field>
    </div>
  );
}

export function EventDone({ s }: { s: PlannerState }) {
  const nice = s.eDate ? new Date(`${s.eDate}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "";
  return (
    <div>
      <div className="tag px-5 pt-9 pb-6 sm:px-7">
        <span className="tag-hole top-3 left-4" aria-hidden="true" />
        <span className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full bg-brick text-white" aria-hidden="true">
          <Check className="size-5" strokeWidth={2} />
        </span>
        <p className="font-display text-[1.75rem] leading-tight font-bold">Your private event at Brudergarten</p>
        <dl className="mt-4 grid gap-2 border-t border-dashed border-line pt-4 text-[0.9375rem] sm:grid-cols-2">
          <div><dt className="font-semibold">Date</dt><dd>{nice}</dd></div>
          <div><dt className="font-semibold">Group size</dt><dd>{s.eGroup}</dd></div>
          <div><dt className="font-semibold">Name</dt><dd>{s.eName}</dd></div>
          <div><dt className="font-semibold">Phone</dt><dd>{s.ePhone}</dd></div>
        </dl>
        <p className="mt-4 text-muted">Call or email the market to book it.</p>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <a href={BUSINESS.phoneHref} className="btn btn-primary">
          <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} /> Call {BUSINESS.phoneDisplay}
        </a>
        {/* DRAFT: Brudergarten events email */}
        <a href={eventMailto({ date: nice, group: s.eGroup, name: s.eName.trim(), phone: s.ePhone.trim() })} className="btn btn-ghost">
          <Mail aria-hidden="true" className="size-4" strokeWidth={1.5} /> Email the market
        </a>
      </div>
    </div>
  );
}
