# Shepherd's Old Field Market: concept site

A front-end-only concept website for Shepherd's Old Field Market (SOF Market), 22725 Duke Street, Leonardtown, MD 20650. Built by Lee Enterprises Unlimited as a spec demo for the owners.

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, lucide-react. No backend, no database, no API keys.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # hours, open-now and planner output tests (Vitest)
npm run build && npm start
```

Add `?now=2026-11-14T14:00:00-05:00` to any URL to preview the live "open now" tag, countdown and planner at a fixed time.

## Launch switch

| Variable | Values | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` (default) or `live` | demo: `noindex, nofollow`, empty sitemap, concept footer line. live: `index, follow`, sitemap, no concept line |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://example.com` | base for canonicals, Open Graph and JSON-LD |

Keep the deployed demo in demo mode. See `SEO-LAUNCH.md` for launch day.

## Where things live

- `lib/business.ts`: every business fact (name, address, phone, emails, links)
- `lib/hours.ts`: market and Brudergarten hours, open-now logic in America/New_York (tested in `lib/hours.test.ts`)
- `lib/shops.ts`, `lib/giftFinder.ts`, `lib/gallery.ts`, `lib/faq.ts`, `lib/photos.ts`: content
- `lib/planOutputs.ts`: `.ics`, `sms:` and `mailto:` builders for the Visit Planner
- `components/sections/`: one file per page section
- `components/VisitPlanner/`, `components/GiftFinder/`
- `public/images/`: the market's own photos as WebP (`scripts/convert-images.mjs` converts from `public/images/raw/`, which is not committed)
- `scripts/brand/`: renders the Open Graph image, icons and logo (`node scripts/brand/render.cjs`)
- `docs/screenshots/`, `docs/lighthouse.md`: review material

Anything assumed is marked `DRAFT` in the code or labelled "Sample" on the page.
