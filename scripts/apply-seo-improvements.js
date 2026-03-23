#!/usr/bin/env node
/**
 * Applies SEO best practices: title overrides, page-type schema (Physician, MedicalClinic, FAQPage, BreadcrumbList).
 * Run: node scripts/apply-seo-improvements.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = process.env.SITE_BASE_URL || 'https://njnopain.com';

const TITLE_OVERRIDES = {
  'about-us.html': 'About Precision Pain & Spine Institute | Pain Management & Spine Care in NJ | PPSI',
  'contact-us.html': 'Contact Us | Pain Management Specialists in New Jersey | PPSI',
  'locations.html': 'Pain Management & Spine Centers in New Jersey | Our Locations | PPSI',
  'medical-appointment.html': 'Book an Appointment | Pain Management & Spine Care NJ | PPSI',
  'medical-records.html': 'Medical Records Request | Precision Pain & Spine Institute | PPSI',
  'medical-record-request.html': 'Request Medical Records | PPSI New Jersey',
  'pain-management.html': 'Pain Management in New Jersey | Board-Certified Specialists | PPSI',
  'spine-surgery.html': 'Spine Surgery in New Jersey | Minimally Invasive & Advanced Care | PPSI',
  'chiropractic.html': 'Chiropractic Care in New Jersey | Back & Neck Pain Relief | PPSI',
  'orthopedics.html': 'Orthopedics in New Jersey | Joint & Sports Medicine | PPSI',
  'podiatry.html': 'Podiatry & Foot Care in New Jersey | PPSI',
  'physical-therapy.html': 'Physical Therapy for Pain & Spine | New Jersey | PPSI',
  'practice-areas.html': 'Pain Management & Spine Services | All Practice Areas | PPSI',
  'interventional.html': 'Interventional Pain Procedures in New Jersey | Injections & Blocks | PPSI',
  'auto-injury.html': 'Auto Injury Care & Car Accident Pain Treatment | New Jersey | PPSI',
  'doctors.html': 'Board-Certified Pain & Spine Specialists in New Jersey | Our Doctors | PPSI',
  'dr-wael-elkholy-m-d.html': 'Dr. Wael Elkholy, Pain Management Specialist in New Jersey | PPSI',
  'dr-wael-elkholy-resume.html': 'Dr. Wael Elkholy M.D. Curriculum Vitae | Board-Certified Pain Specialist | PPSI',
  'alexios-apazidis.html': 'Dr. Alexios Apazidis, Spine Surgeon in New Jersey | PPSI',
  'dr-ashraf-sakr.html': 'Dr. Ashraf Sakr, Anesthesiologist & Pain Specialist in New Jersey | PPSI',
  'dr-ashraf-sakr-resume.html': 'Dr. Ashraf Sakr M.D. Curriculum Vitae | PPSI',
  'fouad-karam.html': 'Dr. Fouad Karam, Pain Management Specialist in New Jersey | PPSI',
  'edward-sofo.html': 'Dr. Edward Sofo, Chiropractor for Athletes & Back Pain | New Jersey | PPSI',
  'patrick-nierva.html': 'Dr. Patrick Nierva, Chiropractor | Back & Neck Pain Care NJ | PPSI',
  'patient-portal.html': 'Patient Portal | Access Your Care | PPSI',
  'insurance.html': 'Insurance & Payment Options | Pain Management NJ | PPSI',
  'careers.html': 'Careers at PPSI | Join Our Pain & Spine Team in New Jersey',
  'blogs.html': 'Pain Management & Spine Care Blog | Patient Education | PPSI',
  'covid-19.html': 'COVID-19 Updates | Precision Pain & Spine Institute | PPSI',
  'privacy-policy.html': 'Privacy Policy | Precision Pain & Spine Institute',
  'terms-of-service.html': 'Terms of Service | Precision Pain & Spine Institute',
};

const LOCATION_ADDRESSES = {
  'edison.html': { street: '1921 Oak Tree Rd #104', locality: 'Edison', region: 'NJ' },
  'north-brunswick.html': { street: '3300 US-1', locality: 'North Brunswick', region: 'NJ' },
  'clifton-new-jersey.html': { street: '1000 Clifton Ave', locality: 'Clifton', region: 'NJ' },
  'jersey-city.html': { street: '1000 Newark Ave', locality: 'Jersey City', region: 'NJ' },
  'elizabeth.html': { street: '225 Williamson St', locality: 'Elizabeth', region: 'NJ' },
  'hamilton-new-jersey.html': { street: '1255 Whitehorse Mercerville Rd', locality: 'Hamilton', region: 'NJ' },
};

const FAQ_ITEMS = [
  { q: 'Do I need a referral to book an appointment?', a: 'It depends on your insurance. Some plans require a referral from your primary care doctor; others let you schedule directly. Call (732) 444-8888 to confirm before booking.' },
  { q: 'What should I bring to my first visit?', a: 'Bring your insurance card, photo ID, current medication list, and any prior X-rays, MRIs, or spine-related records. This helps avoid repeat tests and speeds your evaluation.' },
  { q: 'When should I go to the ER instead?', a: 'Go to the ER or call 911 for sudden leg weakness, numbness, loss of bowel/bladder control, or severe trauma. For ongoing back or neck pain, schedule an appointment with us.' },
  { q: 'How soon can I be seen?', a: 'Same-day and same-week appointments may be available depending on location and schedule. Call us to find the soonest opening near you.' },
  { q: 'Do you accept my insurance or workers\' comp?', a: 'Yes. We accept Horizon BCBS, Aetna, Cigna, UnitedHealthcare, and other major plans, plus workers\' comp and personal injury (including car accidents). Call us to verify your coverage.' },
  { q: 'What treatments do you offer for back and neck pain?', a: 'We offer physical therapy, chiropractic care, pain-relief injections (epidurals, facet blocks, nerve blocks), and spine surgery when needed. Your doctor will recommend the best option after evaluating you.' },
];

const DOCTOR_SPECIALTIES = {
  'dr-wael-elkholy-m-d.html': 'Interventional Pain Management',
  'dr-ashraf-sakr.html': 'Anesthesiology',
  'alexios-apazidis.html': 'Orthopedic Spine Surgery',
  'fouad-karam.html': 'Pain Management',
  'edward-sofo.html': 'Chiropractic',
  'patrick-nierva.html': 'Chiropractic',
};

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function applyTitle(html, file) {
  const title = TITLE_OVERRIDES[file];
  if (!title) return html;
  const escaped = escapeXml(title);
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${escaped}</title>`);
  out = out.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escaped}" />`);
  out = out.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escaped}" />`);
  return out;
}

function getBreadcrumb(pathUrl, pageName) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE }];
  if (pathUrl && pathUrl !== '/') {
    const name = pageName || pathUrl.split('/').pop().replace(/-/g, ' ');
    items.push({ '@type': 'ListItem', position: 2, name: name, item: BASE + pathUrl });
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

function getExtraSchema(file, pathUrl, pageTitle) {
  const schemas = [];
  const url = pathUrl === '/' ? BASE : `${BASE}${pathUrl}`;
  const pageName = pageTitle ? pageTitle.split('|')[0].trim() : null;

  if (LOCATION_ADDRESSES[file]) {
    const addr = LOCATION_ADDRESSES[file];
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      name: `Precision Pain & Spine Institute - ${addr.locality}`,
      url,
      telephone: '+1-732-444-8888',
      address: { '@type': 'PostalAddress', streetAddress: addr.street, addressLocality: addr.locality, addressRegion: addr.region },
      parentOrganization: { '@type': 'MedicalOrganization', name: 'Precision Pain & Spine Institute', url: BASE },
    });
  }

  if (DOCTOR_SPECIALTIES[file]) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Physician',
      name: pageName || '',
      url,
      medicalSpecialty: DOCTOR_SPECIALTIES[file],
      worksFor: { '@type': 'MedicalOrganization', name: 'Precision Pain & Spine Institute', url: BASE },
    });
  }

  if (file === 'index.html') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }

  schemas.push(getBreadcrumb(pathUrl, pageName));

  return schemas;
}

function injectExtraSchema(html, file, pageTitle) {
  const pathMap = {
    'index.html': '/', 'about-us.html': '/about-us', 'contact-us.html': '/contact-us', 'locations.html': '/locations',
    'medical-appointment.html': '/medical-appointment', 'medical-records.html': '/medical-records',
    'medical-record-request.html': '/medical-record-request', 'pain-management.html': '/pain-management',
    'spine-surgery.html': '/spine-surgery', 'chiropractic.html': '/chiropractic', 'orthopedics.html': '/orthopedics',
    'podiatry.html': '/podiatry', 'physical-therapy.html': '/physical-therapy', 'practice-areas.html': '/practice-areas',
    'interventional.html': '/interventional', 'auto-injury.html': '/auto-injury', 'doctors.html': '/doctors',
    'dr-wael-elkholy-m-d.html': '/dr-wael-elkholy-m-d', 'dr-wael-elkholy-resume.html': '/dr-wael-elkholy-resume',
    'alexios-apazidis.html': '/alexios-apazidis', 'dr-ashraf-sakr.html': '/dr-ashraf-sakr',
    'dr-ashraf-sakr-resume.html': '/dr-ashraf-sakr-resume', 'fouad-karam.html': '/fouad-karam',
    'edward-sofo.html': '/edward-sofo', 'patrick-nierva.html': '/patrick-nierva', 'edison.html': '/edison',
    'north-brunswick.html': '/north-brunswick', 'clifton-new-jersey.html': '/clifton-new-jersey',
    'jersey-city.html': '/jersey-city', 'elizabeth.html': '/elizabeth', 'hamilton-new-jersey.html': '/hamilton-new-jersey',
    'patient-portal.html': '/patient-portal', 'insurance.html': '/insurance', 'careers.html': '/careers',
    'blogs.html': '/blogs', 'covid-19.html': '/covid-19', 'privacy-policy.html': '/privacy-policy',
    'terms-of-service.html': '/terms-of-service',
  };
  const pathUrl = pathMap[file] || '/';
  const schemas = getExtraSchema(file, pathUrl, pageTitle);
  const scripts = schemas.map((s) => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  return html.replace('</head>', `\n${scripts}\n</head>`);
}

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !f.startsWith('admin'));
let titleCount = 0;
let schemaCount = 0;

for (const file of files) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const currentTitle = titleMatch ? titleMatch[1].trim() : '';

  let next = applyTitle(html, file);
  if (next !== html) {
    titleCount++;
    html = next;
  }

  if (!/"@type"\s*:\s*"BreadcrumbList"/.test(html)) {
    const newTitle = TITLE_OVERRIDES[file] || currentTitle;
    next = injectExtraSchema(html, file, newTitle);
    if (next !== html) {
      schemaCount++;
      html = next;
      fs.writeFileSync(fp, html, 'utf8');
    }
  } else if (html !== next) {
    fs.writeFileSync(fp, html, 'utf8');
  }
}

console.log(`Updated ${titleCount} titles, injected schema into ${schemaCount} files.`);
