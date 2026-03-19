const express = require('express');
const path = require('path');
const fs = require('fs');
const {
  listSubmissionsSorted,
  listMedicalSorted,
  listJobsSorted,
  patchSubmission,
  patchMedical,
  patchJob,
  getJobById,
} = require('../db');

const router = express.Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ppsi-admin-2025';

const UPLOADS_DIR = path.join(__dirname, '..', '..', 'data', 'uploads');

/** Whitelist — invalid values rejected */
const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'not_qualified', 'scheduled', 'closed', 'spam'];
const JOB_STATUSES = ['new', 'under_review', 'interview', 'offer', 'hired', 'rejected', 'withdrawn', 'on_hold'];
const MEDICAL_STATUSES = ['new', 'processing', 'completed', 'closed'];

function requireAuth(req, res, next) {
  if (req.session && req.session.admin) return next();
  if (req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return res.redirect('/admin/login');
}

function sanitizeStatus(value, allowed) {
  if (value == null || value === '') return undefined;
  const s = String(value);
  return allowed.includes(s) ? s : null;
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

router.get('/api/overview', requireAuth, (req, res) => {
  try {
    const subs = listSubmissionsSorted();
    const med = listMedicalSorted();
    const jobs = listJobsSorted();
    const countBy = (rows, key = 'status') => {
      const m = {};
      for (const r of rows) {
        const s = r[key] || 'new';
        m[s] = (m[s] || 0) + 1;
      }
      return m;
    };
    res.json({
      submissions: { total: subs.length, byStatus: countBy(subs) },
      medical: { total: med.length, byStatus: countBy(med) },
      jobs: { total: jobs.length, byStatus: countBy(jobs) },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load overview' });
  }
});

router.get('/api/submissions', requireAuth, (req, res) => {
  try {
    res.json(listSubmissionsSorted());
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load submissions' });
  }
});

router.patch('/api/submissions/:id', requireAuth, (req, res) => {
  try {
    const { status, admin_notes } = req.body || {};
    if (status == null && admin_notes == null) {
      return res.status(400).json({ error: 'Provide status and/or admin_notes' });
    }
    let st;
    if (status != null) {
      st = sanitizeStatus(status, LEAD_STATUSES);
      if (st === null) return res.status(400).json({ error: 'Invalid status', allowed: LEAD_STATUSES });
    }
    const row = patchSubmission(req.params.id, { status: st, admin_notes });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Update failed' });
  }
});

router.get('/api/medical-requests', requireAuth, (req, res) => {
  try {
    res.json(listMedicalSorted());
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load medical record requests' });
  }
});

router.patch('/api/medical-requests/:id', requireAuth, (req, res) => {
  try {
    const { status, admin_notes } = req.body || {};
    if (status == null && admin_notes == null) {
      return res.status(400).json({ error: 'Provide status and/or admin_notes' });
    }
    let st;
    if (status != null) {
      st = sanitizeStatus(status, MEDICAL_STATUSES);
      if (st === null) return res.status(400).json({ error: 'Invalid status', allowed: MEDICAL_STATUSES });
    }
    const row = patchMedical(req.params.id, { status: st, admin_notes });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Update failed' });
  }
});

router.get('/api/jobs', requireAuth, (req, res) => {
  try {
    res.json(listJobsSorted());
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load job applications' });
  }
});

router.patch('/api/jobs/:id', requireAuth, (req, res) => {
  try {
    const { status, admin_notes } = req.body || {};
    if (status == null && admin_notes == null) {
      return res.status(400).json({ error: 'Provide status and/or admin_notes' });
    }
    let st;
    if (status != null) {
      st = sanitizeStatus(status, JOB_STATUSES);
      if (st === null) return res.status(400).json({ error: 'Invalid status', allowed: JOB_STATUSES });
    }
    const row = patchJob(req.params.id, { status: st, admin_notes });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Update failed' });
  }
});

router.get('/api/jobs/:id/resume', requireAuth, (req, res) => {
  try {
    const job = getJobById(req.params.id);
    if (!job || !job.resume_file) return res.status(404).send('No resume on file');
    const safe = path.basename(String(job.resume_file));
    const fp = path.join(UPLOADS_DIR, safe);
    if (!fs.existsSync(fp) || !fs.statSync(fp).isFile()) return res.status(404).send('File missing');
    res.download(fp, safe);
  } catch (e) {
    console.error(e);
    res.status(500).send('Download failed');
  }
});

module.exports = router;
