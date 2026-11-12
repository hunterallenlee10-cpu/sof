import { describe, expect, it } from "vitest";
import { dayInfo } from "./hours";
import { buildIcs, eveningNote, isEmail, isFirstFridayWeekend, isPhone, smsHref, vendorMailto, visitWindow } from "./planOutputs";

const sat = dayInfo(2026, 11, 14); // Saturday
const sun = dayInfo(2026, 11, 15);
const wed = dayInfo(2026, 11, 11);

describe("visitWindow", () => {
  it("uses real hours", () => {
    expect(visitWindow(sat, "morning")).toEqual({ start: 600, end: 720 });
    expect(visitWindow(sun, "morning")).toEqual({ start: 660, end: 750 });
    expect(visitWindow(sun, "afternoon")).toEqual({ start: 720, end: 960 });
    expect(visitWindow(sat, "evening")).toEqual({ start: 960, end: 1320 });
    expect(visitWindow(sun, "evening")).toEqual({ start: 960, end: 1140 });
  });
});

describe("eveningNote", () => {
  it("names the real close times", () => {
    expect(eveningNote(sun)).toBe("The shops close at 5 PM. Brudergarten stays open later, until 7 PM.");
    expect(eveningNote(sat)).toBe("The shops close at 7 PM. Brudergarten stays open later, until 1 AM.");
    expect(eveningNote(wed)).toBe("The shops close at 7 PM. Brudergarten stays open later, until 10 PM.");
  });
});

describe("isFirstFridayWeekend", () => {
  it("matches the first Friday and that weekend only", () => {
    expect(isFirstFridayWeekend(dayInfo(2026, 12, 4))).toBe(true);
    expect(isFirstFridayWeekend(dayInfo(2026, 12, 6))).toBe(true);
    expect(isFirstFridayWeekend(dayInfo(2026, 12, 11))).toBe(false);
    expect(isFirstFridayWeekend(dayInfo(2026, 11, 1))).toBe(false); // Sunday Nov 1: its Friday was in October
  });
});

describe("buildIcs", () => {
  it("writes a valid VEVENT in UTC with the address", () => {
    const ics = buildIcs({ day: sat, time: "afternoon", description: "Plan, with commas; and semicolons", now: new Date("2026-11-11T12:00:00Z") });
    expect(ics).toContain("DTSTART:20261114T170000Z");
    expect(ics).toContain("DTEND:20261114T210000Z");
    const unfolded = ics.replace(/\r\n /g, "");
    expect(unfolded).toContain("LOCATION:Shepherd's Old Field Market\\, 22725 Duke Street\\, Leonardtown\\, MD 20650");
    expect(unfolded).toContain(String.raw`Plan\, with commas\; and semicolons`);
    expect(ics.split("\r\n").every((l) => l.length <= 75)).toBe(true);
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
  });
});

describe("links", () => {
  it("sms has no number", () => {
    expect(smsHref("hi there")).toBe("sms:?&body=hi%20there");
  });
  it("vendor mailto goes to the marketing inbox with the product in the subject", () => {
    const h = vendorMailto({ product: "Hand-poured candles", alreadySold: "Not sure", name: "Sam", contact: "sam@example.com" });
    expect(h.startsWith("mailto:MarketingSOFMarket@gmail.com?subject=Space%20enquiry%3A%20Hand-poured%20candles")).toBe(true);
  });
  it("validates contact details", () => {
    expect(isEmail("a@b.co")).toBe(true);
    expect(isEmail("nope@x")).toBe(false);
    expect(isPhone("(240) 309-4067")).toBe(true);
    expect(isPhone("1-240-309-4067")).toBe(true);
    expect(isPhone("309-4067")).toBe(false);
  });
});
