import { BRUDERGARTEN_HOURS, MARKET_HOURS, hoursRows, type Span } from "@/lib/hours";

export function HoursList({ table, className = "", dark = false }: { table: Record<number, Span>; className?: string; dark?: boolean }) {
  return (
    <dl className={`grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 ${className}`}>
      {hoursRows(table).map((r) => (
        <div key={r.days} className="contents">
          <dt className={dark ? "text-cream/75" : "text-muted"}>{r.days}</dt>
          <dd className="font-medium">{r.hours}</dd>
        </div>
      ))}
    </dl>
  );
}

export const MarketHours = (p: { className?: string; dark?: boolean }) => <HoursList table={MARKET_HOURS} {...p} />;
export const BrudergartenHours = (p: { className?: string; dark?: boolean }) => <HoursList table={BRUDERGARTEN_HOURS} {...p} />;
