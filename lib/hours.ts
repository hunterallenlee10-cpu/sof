// Market and Brudergarten hours, plus every "what is open right now" calculation.
// All logic runs in America/New_York, whatever timezone the visitor's device is in.

export const TZ = "America/New_York";

export type Span = { open: number; close: number } | null; // minutes from local midnight; close can pass 1440 (after midnight)

const h = (hr: number, min = 0) => hr * 60 + min;

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
export const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Source: the market's November 2026 Facebook flyer and the Visit St. Mary's listing.
// DRAFT: confirm Monday closed.
export const MARKET_HOURS: Record<number, Span> = {
  0: { open: h(11), close: h(17) },
  1: null,
  2: { open: h(10), close: h(19) },
  3: { open: h(10), close: h(19) },
  4: { open: h(10), close: h(19) },
  5: { open: h(10), close: h(19) },
  6: { open: h(10), close: h(19) },
};

// Source: the current shepherdsoldfield.com site.
export const BRUDERGARTEN_HOURS: Record<number, Span> = {
  0: { open: h(11), close: h(19) },
  1: null,
  2: { open: h(16), close: h(22) },
  3: { open: h(16), close: h(22) },
  4: { open: h(16), close: h(22) },
  5: { open: h(11), close: h(25) }, // 1 AM Saturday
  6: { open: h(11), close: h(25) }, // 1 AM Sunday
};

export type NYParts = { year: number; month: number; day: number; weekday: number; minutes: number };

const partsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TZ,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

export function nyParts(date: Date): NYParts {
  const p: Record<string, string> = {};
  for (const part of partsFormatter.formatToParts(date)) p[part.type] = part.value;
  return {
    year: Number(p.year),
    month: Number(p.month),
    day: Number(p.day),
    weekday: WEEKDAYS_SHORT.indexOf(p.weekday as (typeof WEEKDAYS_SHORT)[number]),
    minutes: (Number(p.hour) % 24) * 60 + Number(p.minute),
  };
}

export function formatTime(minutes: number): string {
  const m = minutes % 1440;
  const hr24 = Math.floor(m / 60);
  const min = m % 60;
  const suffix = hr24 >= 12 ? "PM" : "AM";
  const hr12 = hr24 % 12 === 0 ? 12 : hr24 % 12;
  return min ? `${hr12}:${String(min).padStart(2, "0")} ${suffix}` : `${hr12} ${suffix}`;
}

export function formatSpan(span: Span): string {
  return span ? `${formatTime(span.open)} to ${formatTime(span.close)}` : "Closed";
}

/** The next day (after today) the market opens, as a label like "Tuesday" or "tomorrow". */
function nextOpening(weekday: number): { label: string; span: NonNullable<Span> } {
  for (let i = 1; i <= 7; i++) {
    const wd = (weekday + i) % 7;
    const span = MARKET_HOURS[wd];
    if (span) return { label: i === 1 ? "tomorrow" : WEEKDAYS[wd], span };
  }
  throw new Error("Market has no opening day");
}

export type MarketStatus = {
  state: "open" | "later" | "closed";
  /** Big line on the hang tag, e.g. "OPEN NOW" */
  headline: string;
  /** Small line on the hang tag, e.g. "until 7 PM" */
  detail: string;
  /** Short line for the nav pill */
  pill: string;
};

export function marketStatus(date: Date): MarketStatus {
  const { weekday, minutes } = nyParts(date);
  const today = MARKET_HOURS[weekday];
  if (today && minutes >= today.open && minutes < today.close) {
    const until = formatTime(today.close);
    return { state: "open", headline: "Open now", detail: `until ${until}`, pill: `Open now until ${until}` };
  }
  if (today && minutes < today.open) {
    return {
      state: "later",
      headline: "Open today",
      detail: formatSpan(today),
      pill: `Opens today at ${formatTime(today.open)}`,
    };
  }
  const next = nextOpening(weekday);
  const when = `${next.label === "tomorrow" ? "tomorrow" : next.label} ${formatTime(next.span.open)}`;
  return {
    state: "closed",
    headline: today ? "Closed now" : "Closed today",
    detail: `Opens ${when}`,
    pill: `Opens ${when}`,
  };
}

/** Is Brudergarten pouring right now? Handles the Friday and Saturday 1 AM close. */
export function brudergartenOpen(date: Date): { open: boolean; until?: string } {
  const { weekday, minutes } = nyParts(date);
  const yesterday = BRUDERGARTEN_HOURS[(weekday + 6) % 7];
  if (yesterday && yesterday.close > 1440 && minutes < yesterday.close - 1440) {
    return { open: true, until: formatTime(yesterday.close) };
  }
  const today = BRUDERGARTEN_HOURS[weekday];
  if (today && minutes >= today.open && minutes < today.close) {
    return { open: true, until: formatTime(today.close) };
  }
  return { open: false };
}

export type DayInfo = {
  iso: string; // YYYY-MM-DD in New York
  year: number;
  month: number;
  day: number;
  weekday: number;
  label: string; // "Today", "Tomorrow", "Saturday"
  shortLabel: string; // "Today", "Tmrw", "Sat"
  dateLabel: string; // "Nov 14"
  longLabel: string; // "Saturday, November 14"
  market: Span;
  brudergarten: Span;
};

/** Pure calendar arithmetic on a New York date (no timezone involved). */
export function addDays(year: number, month: number, day: number, n: number) {
  const d = new Date(Date.UTC(year, month - 1, day + n));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate(), weekday: d.getUTCDay() };
}

export function dayInfo(year: number, month: number, day: number, offsetFromToday?: number): DayInfo {
  const d = addDays(year, month, day, 0);
  const label =
    offsetFromToday === 0 ? "Today" : offsetFromToday === 1 ? "Tomorrow" : WEEKDAYS[d.weekday];
  return {
    iso: `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`,
    ...d,
    label,
    shortLabel: offsetFromToday === 0 ? "Today" : WEEKDAYS_SHORT[d.weekday],
    dateLabel: `${MONTHS_SHORT[d.month - 1]} ${d.day}`,
    longLabel: `${WEEKDAYS[d.weekday]}, ${MONTHS[d.month - 1]} ${d.day}`,
    market: MARKET_HOURS[d.weekday],
    brudergarten: BRUDERGARTEN_HOURS[d.weekday],
  };
}

export function nextDays(date: Date, count = 7): DayInfo[] {
  const t = nyParts(date);
  return Array.from({ length: count }, (_, i) => {
    const d = addDays(t.year, t.month, t.day, i);
    return dayInfo(d.year, d.month, d.day, i);
  });
}

/** Days until Christmas Day in New York. Null after December 25 (the band then says "See you in the new year"). */
export function daysUntilChristmas(date: Date): number | null {
  const t = nyParts(date);
  const today = Date.UTC(t.year, t.month - 1, t.day);
  const xmas = Date.UTC(t.year, 11, 25);
  if (today > xmas) return null;
  return Math.round((xmas - today) / 86400000);
}

/**
 * First Friday Weekend Sales: the first weekend of each month that includes a Friday,
 * i.e. the month's first Friday through that Sunday. Returns the current one if it is
 * still running, otherwise the next one.
 */
export function nextFirstFridayWeekend(date: Date): { friday: DayInfo; sunday: DayInfo; isNow: boolean } {
  const t = nyParts(date);
  const todayUtc = Date.UTC(t.year, t.month - 1, t.day);
  for (let k = 0; k < 3; k++) {
    const first = addDays(t.year, t.month + k, 1, 0); // Date.UTC rolls months over years
    const fridayOffset = (5 - first.weekday + 7) % 7;
    const fri = addDays(first.year, first.month, 1, fridayOffset);
    const sun = addDays(fri.year, fri.month, fri.day, 2);
    const sunUtc = Date.UTC(sun.year, sun.month - 1, sun.day);
    const friUtc = Date.UTC(fri.year, fri.month - 1, fri.day);
    if (todayUtc <= sunUtc) {
      return {
        friday: dayInfo(fri.year, fri.month, fri.day),
        sunday: dayInfo(sun.year, sun.month, sun.day),
        isNow: todayUtc >= friUtc,
      };
    }
  }
  throw new Error("unreachable");
}

/** Convert a New York wall-clock time to a real instant (handles daylight saving). */
export function nyLocalToUtc(year: number, month: number, day: number, minutes: number): Date {
  const wall = Date.UTC(year, month - 1, day, Math.floor(minutes / 60), minutes % 60);
  let guess = wall + 5 * 3600000; // EST first guess
  for (let i = 0; i < 3; i++) {
    const p = nyParts(new Date(guess));
    const seen = Date.UTC(p.year, p.month - 1, p.day, Math.floor(p.minutes / 60), p.minutes % 60);
    guess += wall - seen;
  }
  return new Date(guess);
}

/** A compact hours table for display: groups days with the same hours, Tuesday first. */
export function hoursRows(table: Record<number, Span>): { days: string; hours: string; weekdays: number[] }[] {
  const order = [2, 3, 4, 5, 6, 0, 1];
  const rows: { days: string; hours: string; weekdays: number[] }[] = [];
  for (const wd of order) {
    const hours = formatSpan(table[wd]);
    const last = rows[rows.length - 1];
    if (last && last.hours === hours) last.weekdays.push(wd);
    else rows.push({ days: "", hours, weekdays: [wd] });
  }
  for (const r of rows) {
    const a = WEEKDAYS[r.weekdays[0]];
    const b = WEEKDAYS[r.weekdays[r.weekdays.length - 1]];
    r.days = r.weekdays.length === 1 ? a : r.weekdays.length === 2 ? `${a} and ${b}` : `${a} to ${b}`;
  }
  return rows;
}
