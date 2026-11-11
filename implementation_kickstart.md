# SOF Market concept site: implementation kickstart

Concept site for Shepherd's Old Field Market, 22725 Duke Street, Leonardtown, MD 20650.
Built by Lee Enterprises Unlimited as a spec demo. Front end only.

## Plan

- Next.js 16 (App Router, Cache Components on) + TypeScript + Tailwind CSS 4.
- Framer Motion only for the hero "tag swing" and the Gift Finder. `lucide-react` icons at 1.5 stroke.
- Single landing page (`/`) plus `/visit`. Every call to action opens the Visit Planner modal.
- All facts live in `lib/business.ts`. Hours and open-now logic in `lib/hours.ts` (America/New_York, unit tested with Vitest).
- Shops in `lib/shops.ts`, Gift Finder mapping in `lib/giftFinder.ts`, gallery in `lib/gallery.ts`, photo registry in `lib/photos.ts`.
- One component file per section in `components/sections/`, plus `components/VisitPlanner/` and `components/GiftFinder/`. No file over 500 lines.
- Real photos only, converted to WebP with `sharp` (`scripts/convert-images.mjs`). Placeholders are labelled kraft tags.
- Live data that depends on "now" (open-now, Christmas countdown, First Friday dates) renders a neutral server value and swaps after mount, in a fixed-size box so nothing shifts.
- Launch switch: `NEXT_PUBLIC_SITE_MODE` (`demo` default, or `live`) and `NEXT_PUBLIC_SITE_URL`.

## Design tokens: "Brick, Board and Butterfly"

| Token | Value | Use |
|---|---|---|
| `--cream` | `#F5EFE3` | page background (porch cream) |
| `--board` | `#EADFCB` | cards and surfaces (pine board) |
| `--board-line` | `#D3C3A6` | 1px card borders |
| `--brick` | `#9E3B2B` | accent: primary button, "SOF", key numbers, open dot, active chips, twine |
| `--ink` | `#1E1B17` | text, and the one dark band (Brudergarten) |
| `--muted` | `#6A5F52` | secondary text |

- Fonts: Zilla Slab 600/700 (display, numbers, tags). Work Sans (body, and the SOF|MARKET wordmark: SOF 700, MARKET 300 with 0.08em tracking, 1px rule between).
- Material: the kraft hang tag (6px radius, 10px punched hole top left, brick twine). Only on the hero tag, the Gift Finder result and the hours card.
- Cards: board colour, 1px border, shadow no more than `0 1px 0 rgba(30,27,23,0.06)`.
- Spacing: 8px grid. Section padding 112 to 128px desktop, 72px mobile.
- Motion: hero tag swing, Gift Finder swap/flip. Hover and press states elsewhere. `prefers-reduced-motion` respected. (The planner's 200ms step slide is part of the spec'd planner.)

## Checklist

- [x] Phase 1: scaffold, design tokens, fonts, holiday bar, nav with open-now pill, `lib/hours.ts` with tests, hero with the tag swing, footer
- [x] Phase 2: Under one roof bento, Gift Finder with its mapping and auto-cycle
- [x] Phase 3: shops A to Z with search and letter rail, Eat and Drink, Brudergarten dark band, services row
- [ ] Phase 4: gallery with filters and lightbox, lumberyard story, holiday band with live countdown, vendor band, reviews, FAQ, final call to action
- [ ] Phase 5: Visit Planner modal with all three paths, wire every button, `.ics` / `sms:` / `mailto:` outputs, mobile sticky bar, `/visit` page
- [ ] Phase 6: launch switch, titles and descriptions, single h1, JSON-LD (validated), robots and sitemap, `llms.txt`, OG image, favicon, 404, image optimisation, `SEO-LAUNCH.md`
- [ ] Phase 6b: Lighthouse on a production build, mobile and desktop, live and demo modes
- [ ] Phase 7: final review against the checklist, commit, push

## Final review checklist

- [ ] Hero sells the job. Tag swings once and tells the truth about today. At 375px the headline and "Plan My Visit" show without scrolling.
- [ ] Gift Finder swaps cleanly, auto-cycles once, works with mouse, touch and keyboard. Shop chips jump to the directory.
- [ ] Open-now logic correct for every weekday in America/New_York, no hydration warning.
- [ ] Every "Plan My Visit" opens the planner with the right pre-selects. `.ics`, `sms:`, `mailto:`, call and directions all work.
- [ ] Every "only this business has" item is on the page.
- [ ] Zero em dashes, zero "--", zero stock or AI images, zero invented facts.
- [ ] Samples, category tags, Bowl 29 caption, seasonal bands and vendor reply line are labelled or commented DRAFT.
- [ ] 2 fonts, 3 colours plus text, motion in 2 places.
- [ ] 375px: no overflow, burger works, sticky bar works.
- [ ] Footer on both pages; demo mode noindex with concept line; live mode index, sitemap, no concept line.
- [ ] OG image and favicon are theirs.
- [ ] Lighthouse SEO 100 live; others 90+; demo mode fails only the indexing audit.
- [ ] One h1 per page with "gift shop" and "Leonardtown". Unique titles and descriptions. JSON-LD validates.
