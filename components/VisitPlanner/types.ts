export type Reason = "holiday" | "browse" | "lunch" | "drinks" | "service" | "event" | "sell";

export const REASONS: { key: Reason; label: string; hint?: string }[] = [
  { key: "holiday", label: "Holiday and gift shopping" },
  { key: "browse", label: "Browsing the shops" },
  { key: "lunch", label: "Lunch or coffee" },
  { key: "drinks", label: "Drinks and games at Brudergarten" },
  { key: "service", label: "A service", hint: "barber, tattoo, music lessons, reflexology" },
  { key: "event", label: "Host a private event" },
  { key: "sell", label: "Sell at SOF Market" },
];

export const SERVICES = ["Olde Towne Barbershop", "Ribshot Tattoo", "Leonardtown Music Service", "Reflexology with Ruth"] as const;
export type ServiceName = (typeof SERVICES)[number];

export type PlannerPrefill = {
  reasons?: Reason[];
  categories?: string[];
  service?: ServiceName;
};
