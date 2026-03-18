# PPSI Backend & Admin Panel

Backend server for clean URLs, form submissions, and a limited admin panel.

## What’s included

- **Clean URLs** – e.g. `/about-us`, `/contact-us`, `/pain-management` (no `.html`)
- **Form API** – Contact, Appointment request, Medical record request (saved in JSON files in `data/`)
- **Admin panel** – View form submissions and medical record requests (password‑protected)

## Run the server

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure (optional)**
   - Copy `server/.env.example` to `server/.env`
   - Set `ADMIN_PASSWORD` and `SESSION_SECRET` for production

3. **Start**
   ```bash
   cd server
   npm start
   ```
   - Site: http://localhost:3000  
   - Admin: http://localhost:3000/admin  
   - Default admin password: `ppsi-admin-2025` (change via `ADMIN_PASSWORD` in `.env`)

## Clean URL mapping

| URL (no .html)     | Served file           |
|--------------------|------------------------|
| `/`                | index.html             |
| `/about-us`        | about-us.html          |
| `/contact-us`      | contact-us.html        |
| `/medical-appointment` | medical-appointment.html |
| `/medical-record-request` | medical-record-request.html |
| `/pain-management` | pain-management.html  |
| … (all main pages)  | corresponding .html    |

Static assets (`css/`, `js/`, `assets/`, `_next/`) are served as-is. Links in the site can stay as `about-us.html`; the server still serves them. For fully clean URLs in the address bar, update internal links from `page.html` to `/page` (e.g. `href="about-us.html"` → `href="/about-us"`).

## Forms

- **Contact** – `/contact-us`: name, email, phone, message → stored as “contact” submission  
- **Appointment** – `/medical-appointment`: name, phone, email, preferred location, date, message → stored as “appointment” submission  
- **Medical record request** – `/medical-record-request`: name, DOB, email, phone, address, details → stored in medical record requests  

Submissions are saved in `data/submissions.json` and `data/medical_record_requests.json`. The `data/` folder is created automatically. No database or native build required.

## Admin panel

- **Login:** http://localhost:3000/admin/login  
- **Dashboard:** http://localhost:3000/admin (after login)  
  - **Form submissions** – list of contact and appointment requests (type, date, payload)  
  - **Medical record requests** – list of medical record requests (date, payload)  

Access is session‑based; one password for all admins (no user accounts). Use a strong `ADMIN_PASSWORD` and HTTPS in production.

## Production notes

- Set `ADMIN_PASSWORD` and `SESSION_SECRET` in `.env`
- Run behind HTTPS (e.g. reverse proxy: Nginx/Apache)
- Keep `data/*.json` backed up (form and medical record data)
- Optional: run with `pm2` or similar: `pm2 start server.js --name ppsi`
