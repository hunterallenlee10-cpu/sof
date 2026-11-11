"use client";

import { useMemo } from "react";
import { formatSpan } from "@/lib/hours";
import { eveningNote, TIME_LABELS, type TimeOfDay } from "@/lib/planOutputs";
import { GIFT_CATEGORIES } from "@/lib/giftFinder";
import { nextDays } from "@/lib/hours";
import { REASONS, SERVICES, type Reason } from "./types";
import { PARTIES, type Patch, type PlannerState } from "./state";

const EXCLUSIVE: Reason[] = ["sell", "event"];

function Toggle({ on, onClick, children, disabled, className = "" }: { on: boolean; onClick: () => void; children: React.ReactNode; disabled?: boolean; className?: string }) {
  return (
    <button type="button" aria-pressed={on} disabled={disabled} onClick={onClick} className={`chip disabled:cursor-not-allowed disabled:opacity-45 ${className}`}>
      {children}
    </button>
  );
}

export function StepReasons({ s, patch }: { s: PlannerState; patch: Patch }) {
  const toggle = (r: Reason) => {
    const on = s.reasons.includes(r);
    let next: Reason[];
    if (on) next = s.reasons.filter((x) => x !== r);
    else if (EXCLUSIVE.includes(r)) next = [r]; // selling or a private event is its own path
    else next = [...s.reasons.filter((x) => !EXCLUSIVE.includes(x)), r];
    patch({ reasons: next, ...(r === "service" && on ? { service: undefined } : {}) });
  };
  return (
    <div>
      <p className="text-muted">Pick as many as you like.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {REASONS.map((r) => (
          <Toggle key={r.key} on={s.reasons.includes(r.key)} onClick={() => toggle(r.key)} className="h-auto min-h-11 py-2 whitespace-normal">
            <span className="text-left">
              {r.label}
              {r.hint && <span className="block text-[0.8125rem] font-normal opacity-80">{r.hint}</span>}
            </span>
          </Toggle>
        ))}
      </div>
      {s.reasons.includes("service") && (
        <fieldset className="mt-6">
          <legend className="font-semibold">Which service?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {SERVICES.map((sv) => (
              <Toggle key={sv} on={s.service === sv} onClick={() => patch({ service: s.service === sv ? undefined : sv })}>
                {sv}
              </Toggle>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}

export function StepCategories({ s, patch }: { s: PlannerState; patch: Patch }) {
  return (
    <div>
      <p className="text-muted">Optional. We will match you to shops.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {GIFT_CATEGORIES.map((c) => {
          const on = s.categories.includes(c.label);
          return (
            <Toggle
              key={c.key}
              on={on}
              onClick={() => patch({ categories: on ? s.categories.filter((x) => x !== c.label) : [...s.categories, c.label] })}
            >
              {c.label}
            </Toggle>
          );
        })}
      </div>
    </div>
  );
}

export function StepWhen({ s, patch, now }: { s: PlannerState; patch: Patch; now: Date }) {
  const days = useMemo(() => nextDays(now, 7), [now]);
  const day = days.find((d) => d.iso === s.dayIso);
  const note = day && s.time === "evening" ? eveningNote(day) : null;
  return (
    <div>
      <fieldset>
        <legend className="font-semibold">Pick a day</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {days.map((d) => {
            const on = s.dayIso === d.iso;
            return (
              <button
                key={d.iso}
                type="button"
                aria-pressed={on}
                disabled={!d.market}
                onClick={() => patch({ dayIso: d.iso })}
                className={`flex min-h-16 flex-col items-start justify-center rounded-[6px] border px-3 py-2 text-left transition-colors ${
                  on ? "border-brick bg-brick text-white" : "border-line bg-board hover:border-ink"
                } disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-line`}
              >
                <span className="font-semibold">
                  {d.shortLabel} <span className="font-normal opacity-80">{d.dateLabel}</span>
                </span>
                <span className={`text-[0.8125rem] ${on ? "text-white/90" : "text-muted"}`}>{d.market ? formatSpan(d.market) : "Closed"}</span>
              </button>
            );
          })}
        </div>
      </fieldset>
      <fieldset className="mt-6">
        <legend className="font-semibold">Time of day</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(TIME_LABELS) as TimeOfDay[]).map((t) => (
            <Toggle key={t} on={s.time === t} onClick={() => patch({ time: t })}>
              {TIME_LABELS[t]}
            </Toggle>
          ))}
        </div>
      </fieldset>
      <p className="mt-4 min-h-12 text-[0.9375rem] text-brick" aria-live="polite">
        {note}
      </p>
    </div>
  );
}

export function StepWho({ s, patch }: { s: PlannerState; patch: Patch }) {
  return (
    <div>
      <fieldset>
        <legend className="font-semibold">How many?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {PARTIES.map((p) => (
            <Toggle key={p} on={s.party === p} onClick={() => patch({ party: p })}>
              {p}
            </Toggle>
          ))}
        </div>
      </fieldset>
      <label htmlFor="plan-name" className="mt-6 block font-semibold">
        Your first name <span className="font-normal text-muted">(optional)</span>
      </label>
      <input
        id="plan-name"
        value={s.firstName}
        onChange={(e) => patch({ firstName: e.target.value })}
        autoComplete="given-name"
        className="mt-2 h-12 w-full max-w-sm rounded-[6px] border border-line bg-board px-4 text-base focus:border-ink"
      />
    </div>
  );
}
