/**
 * Convert site images to optimized WebP and update HTML/CSS/JS references.
 * Run: node scripts/convert-to-webp.mjs
 * Or:  powershell -File scripts/convert-to-webp.ps1
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const IMAGE_EXT = /\.(png|jpe?g)$/i;
const SKIP = new Set(['.webp', '.gif', '.svg', '.ico', '.mp4', '.webm']);

/** SEO-friendly WebP paths (forward slashes) for location photos */
const LOCATION_SEO_MAP = [
  ['Location-photos/Clifton/1fea68b3-9706-4d14-a01a-47fb3b805b9c.jpeg', 'Location-photos/Clifton/ppsi-clifton-office-exterior.webp'],
  ['Location-photos/Clifton/8b742414-c850-4317-8596-06e45abcb5bb.jpeg', 'Location-photos/Clifton/ppsi-clifton-office-entrance.webp'],
  ['Location-photos/Jersey-City/jersey-city-1.png', 'Location-photos/Jersey-City/ppsi-jersey-city-office-exterior.webp'],
  ['Location-photos/Jersey-City/jersey-city-2.png', 'Location-photos/Jersey-City/ppsi-jersey-city-office-interior.webp'],
  ['Location-photos/Elizabeth/elizabeth-outside.png', 'Location-photos/Elizabeth/ppsi-elizabeth-office-exterior.webp'],
  ['Location-photos/Elizabeth/elizabeth-office-2.jpeg', 'Location-photos/Elizabeth/ppsi-elizabeth-office-interior.webp'],
  ['Location-photos/Hamilton/hamilton-office-outside-building.jpg', 'Location-photos/Hamilton/ppsi-hamilton-office-exterior.webp'],
  ['Location-photos/Hamilton/hamilton-office-photo-1.png', 'Location-photos/Hamilton/ppsi-hamilton-office-interior.webp'],
  ['Location-photos/north-brunswick/North-brunc-office-entrence.jpg', 'Location-photos/north-brunswick/ppsi-north-brunswick-office-entrance.webp'],
  ['Location-photos/north-brunswick/north-brun-office-sign-board-outside.jpg', 'Location-photos/north-brunswick/ppsi-north-brunswick-office-signage.webp'],
  ['Location-photos/Edison/edison-office-building.jpeg', 'Location-photos/Edison/ppsi-edison-office-building.webp'],
  ['Location-photos/Edison/edison-office.jpg', 'Location-photos/Edison/ppsi-edison-campus.webp'],
];

function walkDir(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkDir(full, files);
    else if (IMAGE_EXT.test(name)) files.push(full);
  }
  return files;
}

async function toWebp(src, dest, quality = 82) {
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  await sharp(src)
    .webp({ quality, effort: 6 })
    .toFile(dest);
  const st = fs.statSync(src);
  const dt = fs.statSync(dest);
  console.log(`OK ${path.relative(root, dest)} (${Math.round(dt.size / 1024)}KB, was ${Math.round(st.size / 1024)}KB)`);
}

async function main() {
  const replacements = [];

  // --- Location photos with SEO names ---
  for (const [relSrc, relDest] of LOCATION_SEO_MAP) {
    const absSrc = path.join(root, ...relSrc.split('/'));
    const absDest = path.join(root, ...relDest.split('/'));
    if (!fs.existsSync(absSrc)) {
      console.warn(`Skip missing: ${relSrc}`);
      continue;
    }
    await toWebp(absSrc, absDest);
    const variants = [
      relSrc,
      relSrc.replace(/\//g, '\\'),
      relSrc.replace('Location-photos', 'location-photos'),
    ];
    for (const v of variants) {
      replacements.push([v, relDest]);
      replacements.push([encodeURI(v), encodeURI(relDest)]);
    }
    replacements.push([relSrc, relDest]);
  }

  // --- _next & assets: same basename .webp ---
  for (const sub of ['_next', 'assets']) {
    const base = path.join(root, sub);
    const list = walkDir(base);
    for (const absSrc of list) {
      const rel = path.relative(root, absSrc).split(path.sep).join('/');
      if (rel.endsWith('.webp')) continue;
      const dest = absSrc.replace(IMAGE_EXT, '.webp');
      const relDest = rel.replace(IMAGE_EXT, '.webp');
      await toWebp(absSrc, dest);
      const relNorm = rel.split(path.sep).join('/');
      replacements.push([relNorm, relDest]);
      replacements.push([relNorm.replace(/\//g, '\\'), relDest.replace(/\//g, '\\')]);
    }
  }

  // Deduplicate longer strings first (avoid partial replaces)
  replacements.sort((a, b) => b[0].length - a[0].length);
  const seen = new Set();
  const unique = [];
  for (const [a, b] of replacements) {
    const k = `${a}=>${b}`;
    if (seen.has(k)) continue;
    seen.add(k);
    unique.push([a, b]);
  }

  const textFiles = [];
  function walkText(d) {
    if (!fs.existsSync(d)) return;
    for (const name of fs.readdirSync(d)) {
      if (name === 'node_modules' || name === '.git') continue;
      const full = path.join(d, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walkText(full);
      else if (/\.(html|css|js|json|md)$/i.test(name)) textFiles.push(full);
    }
  }
  walkText(root);

  let updated = 0;
  for (const file of textFiles) {
    let text = fs.readFileSync(file, 'utf8');
    const orig = text;
    for (const [from, to] of unique) {
      if (from === to) continue;
      if (text.includes(from)) text = text.split(from).join(to);
    }
    if (text !== orig) {
      fs.writeFileSync(file, text, 'utf8');
      updated++;
      console.log(`Updated ${path.relative(root, file)}`);
    }
  }

  console.log(`\nDone. ${updated} text files updated. Re-run build if needed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
