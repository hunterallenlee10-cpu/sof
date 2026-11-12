# SEO launch checklist

The site ships in **demo mode**: `noindex, nofollow`, no sitemap, and the "Concept preview by Lee Enterprises Unlimited." footer line. Flip it to live only on launch day.

## Launch day

- [ ] In Vercel, Project Settings, Environment Variables (Production):
  - `NEXT_PUBLIC_SITE_MODE=live`
  - `NEXT_PUBLIC_SITE_URL=https://<real domain>` (no trailing slash)
- [ ] Redeploy (env vars are read at build time).
- [ ] View source on `/` and `/visit`: `<meta name="robots" content="index, follow">`, canonical points at the real domain, no concept line in the footer.
- [ ] Open `/robots.txt`: it lists `Sitemap: https://<real domain>/sitemap.xml`.
- [ ] Open `/sitemap.xml`: it lists `/` and `/visit` with dates. Update the dates in `app/sitemap.ts` whenever a page changes.
- [ ] Test both pages in Google's Rich Results Test and the Schema.org validator (ShoppingCenter, BarOrPub, FAQPage, BreadcrumbList).
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools.
- [ ] Link the site from the Google Business Profile.
- [ ] Make the phone number match everywhere: (240) 309-4067 on Google, Facebook and Visit St. Mary's. Retire (240) 753-3332 and (240) 577-0524, and the 23115 Leonard Hall Drive #653 address on Visit St. Mary's.
- [ ] Run Lighthouse on the production URL (mobile and desktop): SEO 100, the rest 90+.
- [ ] Share the link in a chat app and check the preview image and title.

## Replace before launch (every DRAFT and Sample)

Search the code for `DRAFT` and the site for "Sample". The main ones:

- Monday hours (currently closed)
- Whether (240) 309-4067 takes texts (no `sms:` to it until confirmed)
- Owner names (not on the site; only needed for an About section)
- The full current shop list (79 listed; the market says 90+), and Gift Finder category tags
- The Bowl 29 photo (captioned "From the market's kitchens" until confirmed)
- Botanic ordering link (the button says "Plan lunch at Botanic" until then)
- Brudergarten events email (private event requests go to the general inbox)
- Service booking links (barbershop, tattoo, music, reflexology)
- Vendor reply timing
- Real reviews to replace the three sample cards, and a fresh "92% of 28" figure
- Photos for Juice Buzz, the self-care shops and Reflexology with Ruth
- Seasonal content: the holiday bar, the Christmas band, the "Nearby" line on `/visit`
- Parking and pet policy (left off the site until confirmed)
