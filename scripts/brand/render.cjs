// Renders the brand images with Playwright: node scripts/brand/render.cjs
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const jobs = [
    ['og.html', 1200, 630, '../../app/opengraph-image.png'],
    ['og.html', 1200, 630, '../../app/twitter-image.png'],
    ['icon.html', 512, 512, '../../app/icon.png'],
    ['icon.html', 512, 512, '../../public/icon-512.png'],
    ['logo.html', 600, 600, '../../public/logo.png'],
  ];
  for (const [file, w, h, out] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('file://' + path.join(__dirname, file), { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, out) });
    await p.close();
  }
  await b.close();
})();
