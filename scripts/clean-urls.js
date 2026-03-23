const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// file (no path) -> clean path (empty for home)
const MAP = {
  'index.html': '',
  'about-us.html': 'about-us',
  'contact-us.html': 'contact-us',
  'locations.html': 'locations',
  'medical-appointment.html': 'medical-appointment',
  'medical-records.html': 'medical-records',
  'medical-record-request.html': 'medical-record-request',
  'pain-management.html': 'pain-management',
  'spine-surgery.html': 'spine-surgery',
  'chiropractic.html': 'chiropractic',
  'orthopedics.html': 'orthopedics',
  'podiatry.html': 'podiatry',
  'physical-therapy.html': 'physical-therapy',
  'practice-areas.html': 'practice-areas',
  'interventional.html': 'interventional',
  'auto-injury.html': 'auto-injury',
  'doctors.html': 'doctors',
  'dr-wael-elkholy-m-d.html': 'dr-wael-elkholy-m-d',
  'dr-wael-elkholy-resume.html': 'dr-wael-elkholy-resume',
  'alexios-apazidis.html': 'alexios-apazidis',
  'dr-ashraf-sakr.html': 'dr-ashraf-sakr',
  'fouad-karam.html': 'fouad-karam',
  'edward-sofo.html': 'edward-sofo',
  'patrick-nierva.html': 'patrick-nierva',
  'north-brunswick.html': 'north-brunswick',
  'edison.html': 'edison',
  'clifton-new-jersey.html': 'clifton-new-jersey',
  'jersey-city.html': 'jersey-city',
  'elizabeth.html': 'elizabeth',
  'hamilton-new-jersey.html': 'hamilton-new-jersey',
  'patient-portal.html': 'patient-portal',
  'insurance.html': 'insurance',
  'careers.html': 'careers',
  'blogs.html': 'blogs',
  'covid-19.html': 'covid-19',
  'privacy-policy.html': 'privacy-policy',
  'terms-of-service.html': 'terms-of-service',
};

// Sort by filename length descending so longer names are replaced first (avoid partial matches)
const entries = Object.entries(MAP).sort((a, b) => b[0].length - a[0].length);

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [file, cleanPath] of entries) {
    const needle = 'href="' + file + '"';
    const replacement = cleanPath === '' ? 'href="/"' : 'href="/' + cleanPath + '"';
    if (content.includes(needle)) {
      content = content.split(needle).join(replacement);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', path.relative(ROOT, filePath));
  }
}

const htmlDir = ROOT;
const templateDir = path.join(ROOT, '_templates');
const adminDir = path.join(ROOT, 'admin');
const dirs = [htmlDir, templateDir, adminDir];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  for (const f of files) {
    processFile(path.join(dir, f));
  }
}

console.log('Clean URL conversion done.');
