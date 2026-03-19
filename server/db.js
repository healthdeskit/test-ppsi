const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
const submissionsPath = path.join(dataDir, 'submissions.json');
const medicalPath = path.join(dataDir, 'medical_record_requests.json');
const jobsPath = path.join(dataDir, 'job_applications.json');
const jobListingsPath = path.join(dataDir, 'job_listings.json');

const DEFAULT_JOB_LISTINGS = [
  {
    slug: 'medical-assistant',
    title: 'Medical Assistant',
    meta: 'Full-time · Multiple locations (Edison, North Brunswick, Clifton, Elizabeth, Jersey City, Hamilton)',
    description:
      'Support our physicians and clinical team with rooming patients, vitals, history intake, and preparation for procedures. You will work directly with pain management and spine specialists in a fast-paced, patient-centered environment. Ideal for certified or certified-eligible medical assistants who want to grow in a multispecialty practice.',
    requirements: 'MA certification (or eligible), strong communication skills, EHR experience preferred. BLS a plus.',
    sort_order: 10,
    active: true,
  },
  {
    slug: 'front-desk',
    title: 'Front Desk / Patient Services',
    meta: 'Full-time · Edison, North Brunswick, and other NJ locations',
    description:
      'Be the first point of contact for our patients. You will handle scheduling, check-in, insurance verification, and patient inquiries while ensuring a welcoming and efficient experience. We need someone organized, friendly, and comfortable with front-desk software and phone systems.',
    requirements:
      'High school diploma or equivalent; 1+ year front desk or medical office experience preferred; strong customer service and computer skills.',
    sort_order: 20,
    active: true,
  },
];

function ensureDataDir() {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    const uploadsDir = path.join(dataDir, 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (_) {}
}

function readJson(filePath, defaultVal) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return defaultVal;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 0), 'utf8');
}

function stampJobListing(row, isNew) {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
  if (isNew && !row.created_at) row.created_at = now;
  row.updated_at = now;
  return row;
}

function copySeedIfMissing(targetPath, seedFileName) {
  ensureDataDir();
  if (fs.existsSync(targetPath)) return;
  const seedPath = path.join(dataDir, 'seed', seedFileName);
  try {
    if (fs.existsSync(seedPath)) {
      fs.copyFileSync(seedPath, targetPath);
    }
  } catch (_) {}
}

function ensureJobListingsFile() {
  ensureDataDir();
  const seedListings = path.join(dataDir, 'seed', 'job_listings.json');
  if (!fs.existsSync(jobListingsPath) && fs.existsSync(seedListings)) {
    try {
      fs.copyFileSync(seedListings, jobListingsPath);
      return;
    } catch (_) {}
  }
  if (!fs.existsSync(jobListingsPath)) {
    const seeded = DEFAULT_JOB_LISTINGS.map((j, i) =>
      stampJobListing(
        {
          id: i + 1,
          slug: j.slug,
          title: j.title,
          meta: j.meta,
          description: j.description,
          requirements: j.requirements,
          sort_order: j.sort_order,
          active: j.active !== false,
        },
        true
      )
    );
    writeJson(jobListingsPath, seeded);
    return;
  }
  const list = readJson(jobListingsPath, []);
  if (!Array.isArray(list) || list.length === 0) {
    if (fs.existsSync(seedListings)) {
      try {
        fs.copyFileSync(seedListings, jobListingsPath);
        return;
      } catch (_) {}
    }
    const seeded = DEFAULT_JOB_LISTINGS.map((j, i) =>
      stampJobListing(
        {
          id: i + 1,
          slug: j.slug,
          title: j.title,
          meta: j.meta,
          description: j.description,
          requirements: j.requirements,
          sort_order: j.sort_order,
          active: j.active !== false,
        },
        true
      )
    );
    writeJson(jobListingsPath, seeded);
  }
}

function initDb() {
  ensureDataDir();
  copySeedIfMissing(submissionsPath, 'submissions.json');
  if (!fs.existsSync(submissionsPath)) writeJson(submissionsPath, []);
  copySeedIfMissing(medicalPath, 'medical_record_requests.json');
  if (!fs.existsSync(medicalPath)) writeJson(medicalPath, []);
  copySeedIfMissing(jobsPath, 'job_applications.json');
  if (!fs.existsSync(jobsPath)) writeJson(jobsPath, []);
  ensureJobListingsFile();
}

function getDb() {
  return {
    prepare(sql) {
      const run = (...args) => {
        if (sql.includes('INSERT INTO submissions')) {
          const list = readJson(submissionsPath, []);
          list.push({
            id: list.length ? Math.max(...list.map((r) => r.id)) + 1 : 1,
            type: args[0],
            payload: args[1],
            created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
          });
          writeJson(submissionsPath, list);
          return {};
        }
        if (sql.includes('INSERT INTO medical_record_requests')) {
          const list = readJson(medicalPath, []);
          list.push({
            id: list.length ? Math.max(...list.map((r) => r.id)) + 1 : 1,
            payload: args[0],
            created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
          });
          writeJson(medicalPath, list);
          return {};
        }
        return {};
      };
      const all = () => {
        if (sql.includes('FROM submissions')) {
          return readJson(submissionsPath, []).sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
        }
        if (sql.includes('FROM medical_record_requests')) {
          return readJson(medicalPath, []).sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
        }
        if (sql.includes('FROM job_applications')) {
          return readJson(jobsPath, []).sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
        }
        return [];
      };
      return { run, all };
    },
    close() {},
  };
}

function saveJobApplication(payload) {
  ensureDataDir();
  const list = readJson(jobsPath, []);
  list.push({
    id: list.length ? Math.max(...list.map((r) => r.id)) + 1 : 1,
    ...payload,
    created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
  });
  writeJson(jobsPath, list);
}

/* ——— Admin: list + patch with status / notes ——— */

function normalizeSubmission(row) {
  return {
    ...row,
    status: row.status || 'new',
    admin_notes: row.admin_notes != null ? String(row.admin_notes) : '',
  };
}

function normalizeJob(row) {
  return {
    ...row,
    status: row.status || 'new',
    admin_notes: row.admin_notes != null ? String(row.admin_notes) : '',
  };
}

function normalizeMedical(row) {
  return {
    ...row,
    status: row.status || 'new',
    admin_notes: row.admin_notes != null ? String(row.admin_notes) : '',
  };
}

function listSubmissionsSorted() {
  return readJson(submissionsPath, [])
    .map(normalizeSubmission)
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
}

function listMedicalSorted() {
  return readJson(medicalPath, [])
    .map(normalizeMedical)
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
}

function listJobsSorted() {
  return readJson(jobsPath, [])
    .map(normalizeJob)
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
}

function patchSubmission(id, { status, admin_notes }) {
  const list = readJson(submissionsPath, []);
  const i = list.findIndex((r) => String(r.id) === String(id));
  if (i === -1) return null;
  if (status != null) list[i].status = String(status).slice(0, 64);
  if (admin_notes != null) list[i].admin_notes = String(admin_notes).slice(0, 4000);
  writeJson(submissionsPath, list);
  return normalizeSubmission(list[i]);
}

function patchMedical(id, { status, admin_notes }) {
  const list = readJson(medicalPath, []);
  const i = list.findIndex((r) => String(r.id) === String(id));
  if (i === -1) return null;
  if (status != null) list[i].status = String(status).slice(0, 64);
  if (admin_notes != null) list[i].admin_notes = String(admin_notes).slice(0, 4000);
  writeJson(medicalPath, list);
  return normalizeMedical(list[i]);
}

function patchJob(id, { status, admin_notes }) {
  const list = readJson(jobsPath, []);
  const i = list.findIndex((r) => String(r.id) === String(id));
  if (i === -1) return null;
  if (status != null) list[i].status = String(status).slice(0, 64);
  if (admin_notes != null) list[i].admin_notes = String(admin_notes).slice(0, 4000);
  writeJson(jobsPath, list);
  return normalizeJob(list[i]);
}

function getJobById(id) {
  const list = readJson(jobsPath, []);
  const row = list.find((r) => String(r.id) === String(id));
  return row ? normalizeJob(row) : null;
}

/* ——— Job listings (open positions on /careers) ——— */

function normalizeJobListing(row) {
  if (!row || typeof row !== 'object') return null;
  return {
    id: row.id,
    slug: String(row.slug || '').trim(),
    title: String(row.title || '').trim(),
    meta: String(row.meta || '').trim(),
    description: String(row.description || '').trim(),
    requirements: String(row.requirements || '').trim(),
    sort_order: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : 0,
    active: row.active !== false && row.active !== 'false' && row.active !== 0,
    created_at: row.created_at || '',
    updated_at: row.updated_at || '',
  };
}

function sanitizeSlug(raw) {
  const s = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return s;
}

function listJobListingsSorted() {
  ensureJobListingsFile();
  return readJson(jobListingsPath, [])
    .map(normalizeJobListing)
    .filter(Boolean)
    .sort((a, b) => {
      if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
      return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
    });
}

function listActiveJobListingsPublic() {
  return listJobListingsSorted().filter((r) => r.active);
}

function getJobListingById(id) {
  const list = readJson(jobListingsPath, []);
  const row = list.find((r) => String(r.id) === String(id));
  return row ? normalizeJobListing(row) : null;
}

function slugTaken(slug, excludeId) {
  const list = readJson(jobListingsPath, []);
  return list.some((r) => String(r.slug) === slug && String(r.id) !== String(excludeId || ''));
}

function createJobListing(body) {
  ensureJobListingsFile();
  const slug = sanitizeSlug(body.slug);
  if (!slug) return { error: 'INVALID_SLUG', message: 'Job ID (slug) is required (letters, numbers, hyphens).' };
  if (slugTaken(slug)) return { error: 'DUPLICATE_SLUG', message: 'That job ID is already in use.' };
  const title = String(body.title || '').trim().slice(0, 200);
  if (!title) return { error: 'INVALID_TITLE', message: 'Title is required.' };
  const list = readJson(jobListingsPath, []);
  const nextId = list.length ? Math.max(...list.map((r) => Number(r.id) || 0)) + 1 : 1;
  const row = stampJobListing(
    {
      id: nextId,
      slug,
      title,
      meta: String(body.meta || '').trim().slice(0, 500),
      description: String(body.description || '').trim().slice(0, 8000),
      requirements: String(body.requirements || '').trim().slice(0, 4000),
      sort_order: Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 100,
      active: body.active !== false && body.active !== 'false' && body.active !== 0,
    },
    true
  );
  list.push(row);
  writeJson(jobListingsPath, list);
  return { row: normalizeJobListing(row) };
}

function updateJobListing(id, body) {
  ensureJobListingsFile();
  const list = readJson(jobListingsPath, []);
  const i = list.findIndex((r) => String(r.id) === String(id));
  if (i === -1) return null;
  const cur = list[i];
  if (body.slug != null) {
    const slug = sanitizeSlug(body.slug);
    if (!slug) return { error: 'INVALID_SLUG', message: 'Invalid job ID (slug).' };
    if (slugTaken(slug, id)) return { error: 'DUPLICATE_SLUG', message: 'That job ID is already in use.' };
    cur.slug = slug;
  }
  if (body.title != null) {
    const t = String(body.title).trim().slice(0, 200);
    if (!t) return { error: 'INVALID_TITLE', message: 'Title cannot be empty.' };
    cur.title = t;
  }
  if (body.meta != null) cur.meta = String(body.meta).trim().slice(0, 500);
  if (body.description != null) cur.description = String(body.description).trim().slice(0, 8000);
  if (body.requirements != null) cur.requirements = String(body.requirements).trim().slice(0, 4000);
  if (body.sort_order != null && Number.isFinite(Number(body.sort_order))) cur.sort_order = Number(body.sort_order);
  if (body.active != null) cur.active = body.active !== false && body.active !== 'false' && body.active !== 0;
  stampJobListing(cur, false);
  writeJson(jobListingsPath, list);
  return { row: normalizeJobListing(cur) };
}

function deleteJobListing(id) {
  ensureJobListingsFile();
  const list = readJson(jobListingsPath, []);
  const next = list.filter((r) => String(r.id) !== String(id));
  if (next.length === list.length) return false;
  writeJson(jobListingsPath, next);
  return true;
}

module.exports = {
  getDb,
  initDb,
  saveJobApplication,
  submissionsPath,
  medicalPath,
  jobsPath,
  jobListingsPath,
  listSubmissionsSorted,
  listMedicalSorted,
  listJobsSorted,
  patchSubmission,
  patchMedical,
  patchJob,
  getJobById,
  listJobListingsSorted,
  listActiveJobListingsPublic,
  getJobListingById,
  createJobListing,
  updateJobListing,
  deleteJobListing,
};
