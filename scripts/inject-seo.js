#!/usr/bin/env node
/**
 * Injects canonical, OG, Twitter meta tags and base JSON-LD schema into all HTML pages.
 * Run: node scripts/inject-seo.js
 * Set SITE_BASE_URL env var to override default (e.g. https://yoursite.com)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = process.env.SITE_BASE_URL || 'https://njnopain.com';

const FILE_TO_PATH = {
  'index.html': '/',
  'about-us.html': '/about-us',
  'contact-us.html': '/contact-us',
  'locations.html': '/locations',
  'medical-appointment.html': '/medical-appointment',
  'medical-records.html': '/medical-records',
  'medical-record-request.html': '/medical-record-request',
  'pain-management.html': '/pain-management',
  'spine-surgery.html': '/spine-surgery',
  'chiropractic.html': '/chiropractic',
  'orthopedics.html': '/orthopedics',
  'podiatry.html': '/podiatry',
  'physical-therapy.html': '/physical-therapy',
  'practice-areas.html': '/practice-areas',
  'interventional.html': '/interventional',
  'auto-injury.html': '/auto-injury',
  'doctors.html': '/doctors',
  'dr-wael-elkholy-m-d.html': '/dr-wael-elkholy-m-d',
  'dr-wael-elkholy-resume.html': '/dr-wael-elkholy-resume',
  'alexios-apazidis.html': '/alexios-apazidis',
  'dr-ashraf-sakr.html': '/dr-ashraf-sakr',
  'dr-ashraf-sakr-resume.html': '/dr-ashraf-sakr-resume',
  'fouad-karam.html': '/fouad-karam',
  'edward-sofo.html': '/edward-sofo',
  'patrick-nierva.html': '/patrick-nierva',
  'north-brunswick.html': '/north-brunswick',
  'edison.html': '/edison',
  'clifton-new-jersey.html': '/clifton-new-jersey',
  'jersey-city.html': '/jersey-city',
  'elizabeth.html': '/elizabeth',
  'hamilton-new-jersey.html': '/hamilton-new-jersey',
  'patient-portal.html': '/patient-portal',
  'insurance.html': '/insurance',
  'careers.html': '/careers',
  'blogs.html': '/blogs',
  'covid-19.html': '/covid-19',
  'privacy-policy.html': '/privacy-policy',
  'terms-of-service.html': '/terms-of-service',
  '404.html': '/404',
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Precision Pain & Spine Institute',
  url: BASE,
  logo: `${BASE}/assets/ppsi-logo.webp`,
  telephone: '+1-732-444-8888',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Edison',
    addressRegion: 'NJ',
  },
};

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? m[1].trim() : 'Precision Pain & Spine Institute';
}

function extractDescription(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/);
  if (m) return m[1].replace(/&amp;/g, '&').trim();
  const m2 = html.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/);
  if (m2) return m2[1].replace(/&amp;/g, '&').trim();
  return 'Precision Pain & Spine Institute offers advanced pain management and spine care across New Jersey.';
}

function hasCanonical(html) {
  return /<link\s+rel="canonical"/.test(html);
}

function hasSchema(html) {
  return /"@type"\s*:\s*"MedicalOrganization"/.test(html);
}

function injectMeta(html, file) {
  const pathUrl = FILE_TO_PATH[file];
  if (!pathUrl) return html;
  const url = pathUrl === '/' ? BASE : `${BASE}${pathUrl}`;
  const title = extractTitle(html);
  const desc = extractDescription(html);
  const img = `${BASE}/assets/ppsi-logo.webp`;

  const block = `  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${escapeXml(title)}" />
  <meta property="og:description" content="${escapeXml(desc)}" />
  <meta property="og:image" content="${img}" />
  <meta property="og:site_name" content="Precision Pain &amp; Spine Institute" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeXml(title)}" />
  <meta name="twitter:description" content="${escapeXml(desc)}" />
  <meta name="twitter:image" content="${img}" />
`;

  const schemaScript = `  <script type="application/ld+json">${JSON.stringify(SCHEMA)}</script>
`;

  let out = html;

  if (!hasCanonical(out)) {
    out = out.replace(
      /(<meta\s+name="description"[\s\S]*?\/?>)/i,
      (match) => match + '\n' + block.trim()
    );
  }

  if (!hasSchema(out)) {
    out = out.replace('</head>', schemaScript + '</head>');
  }

  return out;
}

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !f.startsWith('admin'));
let count = 0;
for (const file of files) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');
  const next = injectMeta(html, file);
  if (next !== html) {
    fs.writeFileSync(fp, next, 'utf8');
    count++;
  }
}
console.log(`Injected SEO meta + schema into ${count} files.`);
console.log(`Base URL: ${BASE} (set SITE_BASE_URL to override)`);
