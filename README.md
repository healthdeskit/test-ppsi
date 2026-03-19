# Precision Pain & Spine Institute (PPSI) — website

Static HTML/CSS + **Node.js** server (Express): clean URLs, form handling, SQLite submissions, `/admin`.

## Project layout

| Path | Purpose |
|------|---------|
| `*.html` | Site pages |
| `css/` | Shared + page styles (`ppsi-shared.css` is main) |
| `js/ppsi-shared.js` | Header, mobile menu, accordions |
| `assets/` | Logo, images |
| `_next/` | Optimized images |
| `Location-photos/` | Location gallery assets |
| `server/` | Express app (`server.js`, routes, SQLite) |
| `data/` | Runtime JSON + uploads (volume in Docker) |
| `data/seed/` | **Demo data** copied into `data/*.json` only when those files are missing (fresh server / empty disk) |
| `admin/` | Legacy PHP admin (optional; primary admin is Node `/admin`) |
| `docker/` | Apache config (PHP profile only) |

## Run locally

```bash
cd server && npm install && cd ..
node server/server.js
# → http://localhost:3000
```

## Docker (production-style)

**Main site only (recommended):**

```bash
docker compose up -d --build
```

- **Site:** http://localhost:3000  
- **Admin:** http://localhost:3000/admin  

Set secrets before production (create `.env` in project root or export):

```env
ADMIN_PASSWORD=your-strong-password
SESSION_SECRET=long-random-string
```

**Optional — PHP + Apache** (legacy `.php` files on port 8080):

```bash
docker compose --profile php-local up -d --build
```

PowerShell: `.\start-docker.ps1` (web only) or `.\start-docker.ps1 -PhpLocal` (web + PHP on 8080).

## Publish checklist

1. **Secrets:** `ADMIN_PASSWORD`, `SESSION_SECRET` — never use defaults in production.
2. **Persistence:** Mount `data/` so SQLite and uploads survive restarts.
3. **Health:** Container healthcheck hits `/` (200).
4. **Forms:** Test contact, appointment, careers after deploy.
5. **Admin:** Log in at `/admin`, verify submissions.
6. **Traditional PHP hosting:** If you deploy only static + PHP, use `index.php` + `.htaccess` instead of Node (separate stack).

## Hosting: fastest way to go live

| Need | Best option | Why |
|------|-------------|-----|
| **Forms + admin (Node)** | **Render**, Railway, or a **VPS** (DigitalOcean, Linode) | One Docker or Node deploy; forms and `/admin` work. Render/Railway: connect repo → set env → done. |
| **Static only (no forms backend)** | **Netlify**, **Vercel**, or **Cloudflare Pages** | Fastest: drag-and-drop or Git; free tier; global CDN. Forms won’t save unless you add a serverless/API. |
| **Your own server / VPS** | Docker or `node server/server.js` | Copy project (or Git pull) → `docker compose up -d` or run Node; point Nginx to port 3000; add SSL (e.g. Let’s Encrypt). |

**Fastest path with forms + admin:** Push repo to GitHub → connect **Render** (or Railway) → add `ADMIN_PASSWORD` and `SESSION_SECRET` in dashboard → deploy. Attach your domain in the host’s UI.

**Fastest path static-only:** Zip the folder or push to Git → **Netlify** “Deploy site” → connect domain. (Contact/appointment forms will need a separate form service or backend.)

## Why Docker looked different from opening HTML locally

Pages use **relative** asset paths (`css/ppsi-shared.css`, `assets/…`, `_next/…`). That’s fine when you open `index.html` from disk (base URL = that folder) or when you’re at `http://localhost:3000/` (base = `/`). But with **clean URLs** like `http://localhost:3000/edison` or `http://localhost:3000/medical-appointment`, the browser’s base URL is `/edison` or `/medical-appointment`, so it requested `/edison/css/ppsi-shared.css` (wrong) and CSS/images broke.

**Fix applied:** Every page now has `<base href="/" />` in the `<head>`, so all relative URLs resolve from the site root. Docker (and any Node/hosted setup) should now match the original look.

## Deploy (Render example)

`render.yaml` builds from `Dockerfile`. Set `ADMIN_PASSWORD` and `SESSION_SECRET` in the Render dashboard.
