const express = require('express');
const path = require('path');
const fs = require('fs');
const { getDb } = require('../db');

const router = express.Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ppsi-admin-2025';

function requireAuth(req, res, next) {
  if (req.session && req.session.admin) return next();
  if (req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return res.redirect('/admin/login');
}

router.get('/login', (req, res) => {
  if (req.session && req.session.admin) return res.redirect('/admin');
  res.sendFile(path.join(__dirname, '..', '..', 'admin', 'login.html'));
});

router.post('/login', (req, res) => {
  const p = String(req.body?.password || '').trim();
  if (p && p === ADMIN_PASSWORD) {
    req.session.admin = true;
    return res.redirect('/admin');
  }
  res.redirect('/admin/login?error=1');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});
router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

router.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'admin', 'index.html'));
});

router.get('/api/submissions', requireAuth, (req, res) => {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
    db.close();
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load submissions' });
  }
});

router.get('/api/medical-requests', requireAuth, (req, res) => {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM medical_record_requests ORDER BY created_at DESC').all();
    db.close();
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load medical record requests' });
  }
});

router.get('/api/jobs', requireAuth, (req, res) => {
  try {
    const jobsPath = path.join(__dirname, '..', '..', 'data', 'job_applications.json');
    const list = fs.existsSync(jobsPath)
      ? JSON.parse(fs.readFileSync(jobsPath, 'utf8'))
      : [];
    const sorted = list.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
    res.json(sorted);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load job applications' });
  }
});

module.exports = router;
