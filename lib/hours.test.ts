import { describe, expect, it } from "vitest";
import {
  brudergartenOpen,
  daysUntilChristmas,
  hoursRows,
  MARKET_HOURS,
  marketStatus,
  nextDays,
  nextFirstFridayWeekend,
  nyLocalToUtc,
  nyParts,
} from "./hours";

// November 2026 is Eastern Standard Time (UTC-5). Nov 1 2026 is a Sunday.
const ny = (iso: string) => new Date(`${iso}-05:00`);

describe("nyParts", () => {
  it("reads New York wall time, not the machine's", () => {
    const p = nyParts(new Date("2026-11-11T03:30:00Z")); // 10:30 PM Tue Nov 10 in NY
    expect(p).toMatchObject({ year: 2026, month: 11, day: 10, weekday: 2, minutes: 22 * 60 + 30 });
  });
});

describe("marketStatus", () => {
  it("is closed all day Monday and points to Tuesday 10 AM", () => {
    for (const t of ["00:01", "10:30", "15:00", "23:59"]) {
      const s = marketStatus(ny(`2026-11-09T${t}:00`));
      expect(s.state).toBe("closed");
      expect(s.headline).toBe("Closed today");
      expect(s.detail).toBe("Opens tomorrow 10 AM");
    }
  });

  it("says open today before opening on a Tuesday", () => {
    const s = marketStatus(ny("2026-11-10T08:15:00"));
    expect(s).toMatchObject({ state: "later", headline: "Open today", detail: "10 AM to 7 PM", pill: "Opens today at 10 AM" });
  });

  it("is open on a Wednesday afternoon until 7 PM", () => {
    expect(marketStatus(ny("2026-11-11T14:00:00"))).toMatchObject({ state: "open", detail: "until 7 PM", pill: "Open now until 7 PM" });
  });

  it("opens at exactly 10 AM and closes at exactly 7 PM", () => {
    expect(marketStatus(ny("2026-11-12T10:00:00")).state).toBe("open");
    expect(marketStatus(ny("2026-11-12T18:59:00")).state).toBe("open");
    const after = marketStatus(ny("2026-11-12T19:00:00"));
    expect(after).toMatchObject({ state: "closed", headline: "Closed now", detail: "Opens tomorrow 10 AM" });
  });

  it("Sunday runs 11 AM to 5 PM and then points to Tuesday", () => {
    expect(marketStatus(ny("2026-11-15T10:30:00"))).toMatchObject({ state: "later", detail: "11 AM to 5 PM" });
    expect(marketStatus(ny("2026-11-15T16:59:00"))).toMatchObject({ state: "open", detail: "until 5 PM" });
    expect(marketStatus(ny("2026-11-15T17:00:00"))).toMatchObject({ state: "closed", detail: "Opens Tuesday 10 AM" });
  });

  it("Saturday evening points to Sunday 11 AM", () => {
    expect(marketStatus(ny("2026-11-14T20:00:00")).detail).toBe("Opens tomorrow 11 AM");
  });

  it("has the right hours for every day of the week", () => {
    expect(Object.values(MARKET_HOURS).filter(Boolean)).toHaveLength(6);
    expect(MARKET_HOURS[1]).toBeNull();
  });
});

describe("brudergartenOpen", () => {
  it("pours past midnight on Friday into Saturday until 1 AM", () => {
    expect(brudergartenOpen(ny("2026-11-13T23:30:00"))).toEqual({ open: true, until: "1 AM" });
    expect(brudergartenOpen(ny("2026-11-14T00:45:00"))).toEqual({ open: true, until: "1 AM" });
    expect(brudergartenOpen(ny("2026-11-14T01:00:00")).open).toBe(false);
  });

  it("Saturday night runs into Sunday, but Sunday night does not run into Monday", () => {
    expect(brudergartenOpen(ny("2026-11-15T00:30:00")).open).toBe(true);
    expect(brudergartenOpen(ny("2026-11-16T00:30:00")).open).toBe(false);
  });

  it("opens at 4 PM on weekdays and is closed Monday", () => {
    expect(brudergartenOpen(ny("2026-11-11T15:59:00")).open).toBe(false);
    expect(brudergartenOpen(ny("2026-11-11T16:00:00"))).toEqual({ open: true, until: "10 PM" });
    expect(brudergartenOpen(ny("2026-11-09T18:00:00")).open).toBe(false);
  });
});

describe("nextDays", () => {
  it("lists 7 New York days starting today, with Monday closed", () => {
    const days = nextDays(ny("2026-11-11T22:30:00"));
    expect(days.map((d) => d.shortLabel)).toEqual(["Today", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]);
    expect(days[5].market).toBeNull();
    expect(days[0].iso).toBe("2026-11-11");
  });
});

describe("daysUntilChristmas", () => {
  it("counts calendar days in New York", () => {
    expect(daysUntilChristmas(ny("2026-11-11T09:00:00"))).toBe(44);
    expect(daysUntilChristmas(ny("2026-12-24T23:59:00"))).toBe(1);
    expect(daysUntilChristmas(ny("2026-12-25T08:00:00"))).toBe(0);
    expect(daysUntilChristmas(ny("2026-12-26T08:00:00"))).toBeNull();
  });
});

describe("nextFirstFridayWeekend", () => {
  it("finds December's first Friday weekend after November's has passed", () => {
    const w = nextFirstFridayWeekend(ny("2026-11-11T12:00:00"));
    expect(w.friday.iso).toBe("2026-12-04");
    expect(w.sunday.iso).toBe("2026-12-06");
    expect(w.isNow).toBe(false);
  });

  it("reports the weekend as running while it is on", () => {
    const w = nextFirstFridayWeekend(ny("2026-11-07T12:00:00"));
    expect(w.friday.iso).toBe("2026-11-06");
    expect(w.isNow).toBe(true);
  });

  it("rolls over the year", () => {
    expect(nextFirstFridayWeekend(ny("2026-12-20T12:00:00")).friday.iso).toBe("2027-01-01");
  });
});

describe("nyLocalToUtc", () => {
  it("handles standard and daylight time", () => {
    expect(nyLocalToUtc(2026, 11, 14, 10 * 60).toISOString()).toBe("2026-11-14T15:00:00.000Z");
    expect(nyLocalToUtc(2026, 7, 4, 10 * 60).toISOString()).toBe("2026-07-04T14:00:00.000Z");
  });
});

describe("hoursRows", () => {
  it("groups the market week for display", () => {
    expect(hoursRows(MARKET_HOURS)).toEqual([
      { days: "Tuesday to Saturday", hours: "10 AM to 7 PM", weekdays: [2, 3, 4, 5, 6] },
      { days: "Sunday", hours: "11 AM to 5 PM", weekdays: [0] },
      { days: "Monday", hours: "Closed", weekdays: [1] },
    ]);
  });
});
