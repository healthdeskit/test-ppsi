const express = require('express');
const { getDb, listActiveJobListingsPublic } = require('../db');

const router = express.Router();

/** Public: active open positions for /careers (no auth) */
router.get('/careers/open-positions', (req, res) => {
  try {
    const rows = listActiveJobListingsPublic().map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      meta: r.meta,
      description: r.description,
      requirements: r.requirements,
      sort_order: r.sort_order,
    }));
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load open positions' });
  }
});

router.post('/contact', (req, res) => {
  try {
    const payload = JSON.stringify(req.body || {});
    const db = getDb();
    db.prepare('INSERT INTO submissions (type, payload) VALUES (?, ?)').run('contact', payload);
    db.close();
    res.json({ ok: true, message: 'Thank you. We will get back to you soon.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: 'Something went wrong.' });
  }
});

router.post('/appointment', (req, res) => {
  try {
    const payload = JSON.stringify(req.body || {});
    const db = getDb();
    db.prepare('INSERT INTO submissions (type, payload) VALUES (?, ?)').run('appointment', payload);
    db.close();
    res.json({ ok: true, message: 'Appointment request received. We will contact you to confirm.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: 'Something went wrong.' });
  }
});

router.post('/medical-record-request', (req, res) => {
  try {
    const payload = JSON.stringify(req.body || {});
    const db = getDb();
    db.prepare('INSERT INTO medical_record_requests (payload) VALUES (?)').run(payload);
    db.close();
    res.json({ ok: true, message: 'Medical record request received. We will process it as soon as possible.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: 'Something went wrong.' });
  }
});

module.exports = router;
