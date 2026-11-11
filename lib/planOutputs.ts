// Pure helpers behind the Visit Planner's result: time windows, the .ics file, and the sms: / mailto: links.
import { ADDRESS_LINE, BUSINESS, EVENTS_EMAIL, MAPS_URL, SITE_URL } from "./business";
import { formatSpan, formatTime, nyLocalToUtc, type DayInfo } from "./hours";

export type TimeOfDay = "morning" | "afternoon" | "evening";

export const TIME_LABELS: Record<TimeOfDay, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

/** The visit window for a chosen day and time of day, in minutes from midnight (New York). */
export function visitWindow(day: DayInfo, time: TimeOfDay): { start: number; end: number } {
  const m = day.market;
  const b = day.brudergarten;
  if (!m) throw new Error("Market closed that day");
  if (time === "morning") return { start: m.open, end: Math.max(m.open + 90, 12 * 60) };
  if (time === "afternoon") return { start: Math.max(m.open, 12 * 60), end: Math.min(m.close, 16 * 60) };
  // Evening: from 4 PM until the beer garden closes (capped at 10 PM), or the market closes.
  const end = b ? Math.min(b.close, 22 * 60) : m.close;
  return { start: 16 * 60, end: Math.max(end, 17 * 60) };
}

/** The gentle note when someone picks Evening: the shops close, Brudergarten stays open. */
export function eveningNote(day: DayInfo): string | null {
  if (!day.market) return null;
  const shops = `The shops close at ${formatTime(day.market.close)}.`;
  return day.brudergarten ? `${shops} Brudergarten stays open later, until ${formatTime(day.brudergarten.close)}.` : shops;
}

/** First Friday Weekend: is this day the first Friday of its month, or the Saturday/Sunday right after it? */
export function isFirstFridayWeekend(day: DayInfo): boolean {
  const back = { 5: 0, 6: 1, 0: 2 }[day.weekday as 5 | 6 | 0];
  if (back === undefined) return false;
  const fridayDate = day.day - back;
  return fridayDate >= 1 && fridayDate <= 7;
}

const pad = (n: number) => String(n).padStart(2, "0");
const icsDate = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
const icsText = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** Fold long lines at 75 octets, as RFC 5545 asks. */
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    out.push(rest.slice(0, 74));
    rest = " " + rest.slice(74);
  }
  out.push(rest);
  return out.join("\r\n");
}

export function buildIcs(opts: { day: DayInfo; time: TimeOfDay; description: string; now?: Date }): string {
  const { start, end } = visitWindow(opts.day, opts.time);
  const s = nyLocalToUtc(opts.day.year, opts.day.month, opts.day.day, start);
  const e = nyLocalToUtc(opts.day.year, opts.day.month, opts.day.day, end);
  const stamp = icsDate(opts.now ?? new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SOF Market//Visit Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:visit-${opts.day.iso}-${opts.time}@sofmarket`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsDate(s)}`,
    `DTEND:${icsDate(e)}`,
    `SUMMARY:${icsText(`Visit ${BUSINESS.name}`)}`,
    `LOCATION:${icsText(`${BUSINESS.name}, ${ADDRESS_LINE}`)}`,
    `GEO:${BUSINESS.geo.lat};${BUSINESS.geo.lng}`,
    `DESCRIPTION:${icsText(opts.description)}`,
    `URL:${SITE_URL}/visit`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function planSummary(opts: {
  day: DayInfo;
  time: TimeOfDay;
  shops: string[];
  service?: string;
  eateries: string[];
}): string {
  const parts = [
    `${opts.day.longLabel}, ${TIME_LABELS[opts.time].toLowerCase()}.`,
    `Market hours: ${formatSpan(opts.day.market)}.`,
  ];
  if (opts.day.brudergarten) parts.push(`Brudergarten: ${formatSpan(opts.day.brudergarten)}.`);
  if (opts.shops.length) parts.push(`Shops to see: ${opts.shops.join(", ")}.`);
  if (opts.service) parts.push(`Service: ${opts.service}.`);
  if (opts.eateries.length) parts.push(`Food and drink: ${opts.eateries.join(", ")}.`);
  parts.push(`${ADDRESS_LINE}. ${BUSINESS.phoneDisplay}.`);
  return parts.join(" ");
}

/** sms: with no number, so the visitor picks the friend. Body only. */
export function smsHref(body: string): string {
  return `sms:?&body=${encodeURIComponent(body)}`;
}

export function friendMessage(summary: string): string {
  return `Want to come to ${BUSINESS.name} with me? ${summary} Directions: ${MAPS_URL}`;
}

export function mailtoHref(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function vendorMailto(v: { product: string; alreadySold: string; name: string; contact: string }): string {
  const body = [
    "Hi SOF Market,",
    "",
    "I would like to ask about a space in the market.",
    "",
    `What I make or sell: ${v.product}`,
    `Already sold in the market: ${v.alreadySold}`,
    "",
    `Name: ${v.name}`,
    `Email or phone: ${v.contact}`,
    "",
    "Sent from the Plan My Visit form on the SOF Market website.",
  ].join("\n");
  return mailtoHref(BUSINESS.vendorEmail, `Space enquiry: ${v.product.slice(0, 60)}`, body);
}

export function eventMailto(e: { date: string; group: string; name: string; phone: string }): string {
  const body = [
    "Hi SOF Market,",
    "",
    "I would like to host a private event at Brudergarten.",
    "",
    `Date: ${e.date}`,
    `Group size: ${e.group}`,
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    "",
    "Sent from the Plan My Visit form on the SOF Market website.",
  ].join("\n");
  return mailtoHref(EVENTS_EMAIL, `Private event enquiry: ${e.date}`, body);
}

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
export const isPhone = (s: string) => s.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "").length === 10;
