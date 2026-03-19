# PPSI Admin (Control center)

- **URL:** `/admin` (Node server must be running from the `server` folder: `npm start`)
- **Login:** Value of `ADMIN_PASSWORD` in **`server/.env`** (created for you). Default local password: **`ppsi-admin-2025`**
- **Important:** After changing `.env`, **restart** the Node server. If login fails, an old server may still be on port 3000 — stop it and run `node server.js` again.

## Sample data (optional)

The repo may include **demo rows** in `data/submissions.json`, `data/job_applications.json`, and `data/medical_record_requests.json` so the admin UI is easier to review. Remove or replace those files on production if you do not want fictitious entries.

## What you can do

| Area | Data source | Actions |
|------|-------------|---------|
| **Dashboard** | All | Counts per category + “new” pipeline totals |
| **Contact messages** | `data/submissions.json` (`type: contact`) | Separate list; **Open** = drawer with clear sections |
| **Appointment requests** | same (`type: appointment`) | Not mixed with contact or insurance |
| **Insurance verification** | same (`type: insurance`) | Subscriber + plan + location in drawer |
| **Job postings** | `data/job_listings.json` | **Create / edit / delete** open roles for `/careers`; toggle live/hidden; sort order |
| **Job applications** | `data/job_applications.json` | Full application in drawer + **Download resume** when `resume_file` exists |
| **Medical records** | `data/medical_record_requests.json` | Patient / delivery / request sections; status + notes |

Statuses are saved to JSON immediately (no extra database).

## Security

- Change `ADMIN_PASSWORD` and `SESSION_SECRET` before production.
- Serve only over HTTPS in production.

## Optional third-party tools (if you outgrow this)

- **Form + CRM:** [Tally](https://tally.so) / [Fillout](https://fillout.com) + Zapier → Google Sheets / HubSpot  
- **Full CMS + roles:** [Directus](https://directus.io) or [Strapi](https://strapi.io) (more setup; overkill if you only need these forms)  
- **Internal ops:** [Retool](https://retool.com) connected to a real database  

For your current static site + Express + JSON files, this built-in admin is the fastest path.
