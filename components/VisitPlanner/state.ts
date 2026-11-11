import type { TimeOfDay } from "@/lib/planOutputs";
import type { PlannerPrefill, Reason, ServiceName } from "./types";

export type Party = "Just me" | "2" | "3 to 5" | "6 or more";
export const PARTIES: Party[] = ["Just me", "2", "3 to 5", "6 or more"];

export type PlannerState = {
  reasons: Reason[];
  categories: string[];
  service?: ServiceName;
  dayIso?: string;
  time?: TimeOfDay;
  party?: Party;
  firstName: string;
  // vendor path
  product: string;
  alreadySold?: "Not that I know of" | "Not sure";
  vName: string;
  vContact: string;
  // private event path
  eDate: string;
  eGroup: string;
  eName: string;
  ePhone: string;
};

export type Patch = (p: Partial<PlannerState>) => void;

export function initialState(prefill: PlannerPrefill): PlannerState {
  return {
    reasons: prefill.reasons ?? [],
    categories: prefill.categories ?? [],
    service: prefill.service,
    firstName: "",
    product: "",
    vName: "",
    vContact: "",
    eDate: "",
    eGroup: "",
    eName: "",
    ePhone: "",
  };
}

export type StepKey = "reasons" | "categories" | "when" | "who" | "plan" | "product" | "vendorContact" | "vendorDone" | "eventDetails" | "eventContact" | "eventDone";

export const isShopping = (r: Reason[]) => r.includes("holiday") || r.includes("browse");

/** The planner branches on step 1: visit, vendor ("Sell at SOF Market") or private event. */
export function stepsFor(s: PlannerState): StepKey[] {
  if (s.reasons.includes("sell")) return ["reasons", "product", "vendorContact", "vendorDone"];
  if (s.reasons.includes("event")) return ["reasons", "eventDetails", "eventContact", "eventDone"];
  return ["reasons", ...(isShopping(s.reasons) ? (["categories"] as StepKey[]) : []), "when", "who", "plan"];
}

export const STEP_TITLES: Record<StepKey, string> = {
  reasons: "What brings you in?",
  categories: "Shopping for?",
  when: "When?",
  who: "Who is coming?",
  plan: "Your visit plan",
  product: "What do you make or sell?",
  vendorContact: "How can the market reach you?",
  vendorDone: "Almost there",
  eventDetails: "Tell us about your event",
  eventContact: "Who should the market call?",
  eventDone: "Your event request",
};
