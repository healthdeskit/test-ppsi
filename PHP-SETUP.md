# PPSI – PHP Backend (Final / Server-Ready)

Site ab **PHP** se chal raha hai: clean URLs, form submissions, jobs, aur admin panel.

## Requirements

- **PHP 7.4+** (recommended 8.x)
- **Apache** with `mod_rewrite` enabled (`.htaccess` for clean URLs)

## Run locally

1. Document root ko project folder par set karein (e.g. `htdocs/ppsi` ya `www/ppsi`).
2. Apache start karein.
3. Browser: `http://localhost/` ya `http://localhost/ppsi/` (apne setup ke hisaab se).

Agar **PHP built-in server** use karna ho (rewrite support limited):

```bash
cd "c:\My Web Sites\PPSI WEB\Converted"
php -S localhost:8000
```

Note: Built-in server `.htaccess` use nahi karta, isliye clean URLs ke liye Apache better hai.

## Clean URLs

| URL | Page |
|-----|------|
| `/` | Home |
| `/about-us` | About Us |
| `/contact-us` | Contact (form) |
| `/medical-appointment` | Book appointment (form) |
| `/medical-record-request` | Medical record request (form) |
| `/careers` | Careers + jobs + apply form |
| `/admin` | Admin dashboard (login required) |
| `/admin/login` | Admin login |

Purani `.html` wali URLs bhi kaam karengi agar file maujood ho (e.g. `contact-us.html`).

## Forms (front → backend)

| Form | POST URL | Data stored |
|------|----------|-------------|
| Contact | `/contact-us` | `data/submissions.json` (type: contact) |
| Appointment | `/medical-appointment` | `data/submissions.json` (type: appointment) |
| Medical record request | `/medical-record-request` | `data/medical_record_requests.json` |
| Job application | `/careers/apply` | `data/job_applications.json` (+ optional resume in `data/uploads/`) |

Submit ke baad user ko success message dikhta hai; backend par admin dashboard par sab entries dikhti hain.

## Admin panel

- **Login:** `/admin/login`  
- **Password (default):** `ppsi-admin-2025`  
- **Dashboard:** `/admin` – Form submissions, Medical record requests, Job applications (design ke sath)

Password change: Apache me `SetEnv ADMIN_PASSWORD your-password` ya PHP me `admin/auth.php` me define.

## Jobs (sample)

- **Medical Assistant** – Full-time, multiple locations, MA certification.
- **Front Desk / Patient Services** – Full-time, Edison / North Brunswick, etc.

Dono careers page par listed hain; "Apply for this position" se apply form open hota hai. Applications admin panel me "Job applications" me dikhti hain.

## File structure

- `index.php` – Router (clean URLs + form POST handlers)
- `.htaccess` – Rewrite rules
- `php/config.php` – Path map, data dir, read/write JSON
- `php/forms.php` – Contact, appointment, medical record, job save functions
- `admin/login.php`, `admin/logout.php`, `admin/index.php`, `admin/auth.php` – Admin
- `data/` – `submissions.json`, `medical_record_requests.json`, `job_applications.json`, `uploads/` (resumes)

## Node server (optional)

Agar pehle wala **Node** server bhi chalana ho (e.g. `node server/server.js`), to forms Node API ko hit karenge agar aap HTML me action wapas `/api/...` kar dein. **PHP setup** me forms direct PHP ko POST karte hain (`/contact-us`, `/medical-appointment`, etc.).
