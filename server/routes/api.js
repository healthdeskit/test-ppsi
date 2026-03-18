const express = require('express');
const { getDb } = require('../db');

const router = express.Router();

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
