# Lighthouse results (2026-11-11)

Lighthouse 13.6.0, Playwright Chromium, against a production build (`next build` then `next start`) on `http://localhost:3000`. Image optimizer cache warmed first (on Vercel these variants are cached at the edge). Mobile = Lighthouse default mobile emulation with simulated slow 4G; desktop = `--preset=desktop`.

## Live mode (`NEXT_PUBLIC_SITE_MODE=live NEXT_PUBLIC_SITE_URL=http://localhost:3000`)

| Page | Form | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|---|
| `/` | mobile | 92 | 100 | 100 | 100 |
| `/` | desktop | 100 | 100 | 100 | 100 |
| `/visit` | mobile | 93 | 100 | 100 | 100 |
| `/visit` | desktop | 100 | 100 | 100 | 100 |

CLS 0 on every run. Mobile LCP 3.1 to 3.2 s simulated (observed LCP about 0.25 s); TBT 100 to 140 ms.

## Demo mode (default, what is deployed)

| Page | Form | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|---|
| `/` | mobile | 95 | 100 | 100 | 69 |
| `/` | desktop | 100 | 100 | 100 | 69 |
| `/visit` | mobile | 93 | 100 | 100 | 69 |
| `/visit` | desktop | 100 | 100 | 100 | 69 |

The only failing SEO audit in demo mode is `is-crawlable` ("Page is blocked from indexing"), which is the intended `noindex, nofollow`.

Note: mobile Performance moves a few points between runs (88 to 95 seen on the same build), mostly from simulated LCP. A cold image cache costs about 5 points on the first run after a rebuild.

## Structured data

validator.schema.org: 0 errors, 0 warnings on `/` (ShoppingCenter, BarOrPub, FAQPage) and `/visit` (ShoppingCenter, BarOrPub, BreadcrumbList).
