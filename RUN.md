# Run PPSI Site (Everything Working)

## Option 1: Node server (recommended – forms, admin, clean URLs)

No Python or SQLite build required. Data is stored in `data/submissions.json` and `data/medical_record_requests.json`.

### One-time setup
```bash
cd server
npm install
cd ..
```

### Start
```bash
node server/server.js
```
Or from project root:
```bash
npm run install:server   # first time only
npm start
```

**Windows:** Double-click `run.bat` or in Command Prompt:
```cmd
run.bat
```

- **Site:** http://localhost:3000  
- **Admin:** http://localhost:3000/admin (password: `ppsi-admin-2025` – set `ADMIN_PASSWORD` in `server/.env` to change)  
- **Forms:** Contact, Appointment, Medical record request submit to the server and appear in Admin.

---

## Option 2: Docker (full stack + PHP)

```bash
docker-compose up -d --build
```

- **Site (Node):** http://localhost:3000  
- **PHP pages:** http://localhost:8080 (e.g. http://localhost:8080/info.php)

Stop:
```bash
docker-compose down
```

---

## What runs

| Feature | Node (port 3000) | Docker |
|--------|-------------------|--------|
| All HTML pages | ✅ | ✅ (web service) |
| Clean URLs (/about-us, etc.) | ✅ | ✅ |
| Links (.html) | ✅ | ✅ |
| Contact / Appointment / Medical record forms | ✅ | ✅ |
| Admin panel (view submissions) | ✅ | ✅ |
| PHP pages | ❌ | ✅ (port 8080) |

**Important:** Forms and admin only work when the **Node server** is running (Option 1 or Docker `web`). Opening `index.html` in the browser (file://) will not submit forms.
