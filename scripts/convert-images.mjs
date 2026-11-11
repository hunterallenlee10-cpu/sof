// Converts every photo in public/images/raw to .webp in public/images (same base name).
// Run: node scripts/convert-images.mjs
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, parse } from "node:path";

const RAW = "public/images/raw";
const OUT = "public/images";
await mkdir(OUT, { recursive: true });

const files = (await readdir(RAW)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const manifest = {};
for (const f of files) {
  const { name } = parse(f);
  const out = join(OUT, `${name}.webp`);
  const info = await sharp(join(RAW, f)).rotate().webp({ quality: 82, effort: 6 }).toFile(out);
  manifest[name] = { width: info.width, height: info.height, bytes: info.size };
  console.log(`${name}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
console.log(JSON.stringify(manifest));
