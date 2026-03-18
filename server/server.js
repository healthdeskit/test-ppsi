const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const multer = require('multer');
const { initDb, getDb, saveJobApplication } = require('./db');

const api = require('./routes/api');
const admin = require('./routes/admin');

initDb();

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..');
const dataDir = path.join(ROOT, 'data');
const uploadsDir = path.join(dataDir, 'uploads');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
const upload = multer({ dest: uploadsDir, limits: { fileSize: 5 * 1024 * 1024 } });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'ppsi-admin-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));

// Form POST handlers (same behaviour as PHP: save + redirect with ?sent=1 or ?error=1)
function redirectForm(res, path, ok) {
  res.redirect(path + (ok ? '?sent=1' : '?error=1'));
}

app.post('/contact-us', (req, res) => {
  try {
    const payload = JSON.stringify({
      name: String(req.body.name || '').trim(),
      email: String(req.body.email || '').trim(),
      phone: String(req.body.phone || '').trim(),
      message: String(req.body.message || '').trim(),
    });
    const db = getDb();
    db.prepare('INSERT INTO submissions (type, payload) VALUES (?, ?)').run('contact', payload);
    db.close();
    return redirectForm(res, '/contact-us', true);
  } catch (e) {
    console.error(e);
    return redirectForm(res, '/contact-us', false);
  }
});

app.post('/medical-appointment', (req, res) => {
  try {
    const payload = JSON.stringify({
      name: String(req.body.name || '').trim(),
      phone: String(req.body.phone || '').trim(),
      email: String(req.body.email || '').trim(),
      preferred_location: String(req.body.preferred_location || '').trim(),
      date_preference: String(req.body.date_preference || '').trim(),
      message: String(req.body.message || '').trim(),
    });
    const db = getDb();
    db.prepare('INSERT INTO submissions (type, payload) VALUES (?, ?)').run('appointment', payload);
    db.close();
    return redirectForm(res, '/medical-appointment', true);
  } catch (e) {
    console.error(e);
    return redirectForm(res, '/medical-appointment', false);
  }
});

app.post('/medical-record-request', (req, res) => {
  try {
    const payload = JSON.stringify({
      name: String(req.body.name || '').trim(),
      date_of_birth: String(req.body.date_of_birth || '').trim(),
      email: String(req.body.email || '').trim(),
      phone: String(req.body.phone || '').trim(),
      mailing_address: String(req.body.mailing_address || '').trim(),
      details: String(req.body.details || '').trim(),
    });
    const db = getDb();
    db.prepare('INSERT INTO medical_record_requests (payload) VALUES (?)').run(payload);
    db.close();
    return redirectForm(res, '/medical-record-request', true);
  } catch (e) {
    console.error(e);
    return redirectForm(res, '/medical-record-request', false);
  }
});

app.post('/careers/apply', upload.single('resume'), (req, res) => {
  try {
    const body = req.body || {};
    let resume_file = '';
    if (req.file && req.file.filename) {
      const ext = path.extname(req.file.originalname || '') || '.bin';
      const newName = 'resume_' + Date.now() + '_' + (String(body.name || '').replace(/\W/g, '') || 'file') + ext;
      const newPath = path.join(uploadsDir, newName);
      fs.renameSync(req.file.path, newPath);
      resume_file = newName;
    }
    saveJobApplication({
      job_id: String(body.job_id || '').trim(),
      job_title: String(body.job_title || '').trim(),
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      phone: String(body.phone || '').trim(),
      message: String(body.message || '').trim(),
      resume_file,
    });
    return redirectForm(res, '/careers', true);
  } catch (e) {
    console.error(e);
    return redirectForm(res, '/careers', false);
  }
});

app.use('/api', api);
app.use('/admin', admin);

const cleanUrlMap = {
  '': 'index.html',
  '/': 'index.html',
  '/about-us': 'about-us.html',
  '/contact-us': 'contact-us.html',
  '/locations': 'locations.html',
  '/medical-appointment': 'medical-appointment.html',
  '/medical-records': 'medical-records.html',
  '/medical-record-request': 'medical-record-request.html',
  '/pain-management': 'pain-management.html',
  '/spine-surgery': 'spine-surgery.html',
  '/chiropractic': 'chiropractic.html',
  '/orthopedics': 'orthopedics.html',
  '/podiatry': 'podiatry.html',
  '/physical-therapy': 'physical-therapy.html',
  '/practice-areas': 'practice-areas.html',
  '/interventional': 'interventional.html',
  '/auto-injury': 'auto-injury.html',
  '/doctors': 'doctors.html',
  '/dr-wael-elkholy-m-d': 'dr-wael-elkholy-m-d.html',
  '/dr-wael-elkholy-resume': 'dr-wael-elkholy-resume.html',
  '/alexios-apazidis': 'alexios-apazidis.html',
  '/dr-ashraf-sakr': 'dr-ashraf-sakr.html',
  '/fouad-karam': 'fouad-karam.html',
  '/edward-sofo': 'edward-sofo.html',
  '/patrick-nierva': 'patrick-nierva.html',
  '/north-brunswick': 'north-brunswick.html',
  '/edison': 'edison.html',
  '/clifton': 'clifton-new-jersey.html',
  '/clifton-new-jersey': 'clifton-new-jersey.html',
  '/jersey-city': 'jersey-city.html',
  '/elizabeth': 'elizabeth.html',
  '/hamilton': 'hamilton-new-jersey.html',
  '/hamilton-new-jersey': 'hamilton-new-jersey.html',
  '/patient-portal': 'patient-portal.html',
  '/insurance': 'insurance.html',
  '/careers': 'careers.html',
  '/blogs': 'blogs.html',
  '/covid-19': 'covid-19.html',
  '/privacy-policy': 'privacy-policy.html',
  '/terms-of-service': 'terms-of-service.html',
};

function serveCleanUrl(req, res, next) {
  const p = req.path.replace(/\/$/, '') || '/';
  const file = cleanUrlMap[p];
  if (file) {
    const fp = path.join(ROOT, file);
    if (fs.existsSync(fp)) {
      return res.sendFile(fp);
    }
  }
  next();
}

app.get(['/', '/about-us', '/contact-us', '/locations', '/medical-appointment', '/medical-records', '/medical-record-request',
  '/pain-management', '/spine-surgery', '/chiropractic', '/orthopedics', '/podiatry', '/physical-therapy', '/practice-areas',
  '/interventional', '/auto-injury', '/doctors', '/dr-wael-elkholy-m-d', '/dr-wael-elkholy-resume', '/alexios-apazidis',
  '/dr-ashraf-sakr', '/fouad-karam', '/edward-sofo', '/patrick-nierva', '/north-brunswick', '/edison', '/clifton', '/clifton-new-jersey',
  '/jersey-city', '/elizabeth', '/hamilton', '/hamilton-new-jersey', '/patient-portal', '/insurance', '/careers', '/blogs', '/covid-19',
  '/privacy-policy', '/terms-of-service'], serveCleanUrl);

// Explicitly serve .html requests so links like href="about-us.html" always work
app.get(/\\.html$/i, (req, res, next) => {
  const raw = req.path.replace(/^\//, '');
  const fp = path.join(ROOT, raw);
  const rel = path.relative(ROOT, fp);
  if ((rel.startsWith('..') || path.isAbsolute(rel)) === false && fs.existsSync(fp) && fs.statSync(fp).isFile()) {
    return res.sendFile(fp);
  }
  next();
});

app.use(express.static(ROOT, { extensions: ['html'], index: false }));

app.use((req, res) => {
  const p = req.path.replace(/\/$/, '') || '/';
  const file = cleanUrlMap[p];
  if (file) {
    const fp = path.join(ROOT, file);
    if (fs.existsSync(fp)) return res.sendFile(fp);
  }
  const notFound = path.join(ROOT, '404.html');
  res.status(404).sendFile(fs.existsSync(notFound) ? notFound : path.join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`PPSI server: http://localhost:${PORT}`);
  console.log('Clean URLs enabled. Admin: http://localhost:' + PORT + '/admin');
});
