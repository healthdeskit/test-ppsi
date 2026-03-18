const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
const submissionsPath = path.join(dataDir, 'submissions.json');
const medicalPath = path.join(dataDir, 'medical_record_requests.json');
const jobsPath = path.join(dataDir, 'job_applications.json');

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

function initDb() {
  ensureDataDir();
  if (!fs.existsSync(submissionsPath)) writeJson(submissionsPath, []);
  if (!fs.existsSync(medicalPath)) writeJson(medicalPath, []);
  if (!fs.existsSync(jobsPath)) writeJson(jobsPath, []);
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

module.exports = { getDb, initDb, saveJobApplication };
