# PPSI Project – Production Readiness

## Clean URLs ✅

- **All internal links** use clean paths: `href="/"`, `href="/careers"`, `href="/contact-us"`, etc. (no `.html` in links.)
- **Router** (`index.php` + `.htaccess`): `/about-us`, `/careers`, `/edison`, etc. serve the correct page.
- **Forms** POST to clean URLs: `/contact-us`, `/medical-appointment`, `/medical-record-request`, `/careers/apply`.
- **Admin** uses clean URLs: `/admin`, `/admin/login`, `/admin/logout`.

## Production Checklist ✅

| Item | Status |
|------|--------|
| Clean URLs (links + router) | Done |
| PHP router (`index.php`) | Serves all mapped pages |
| `.htaccess` | mod_rewrite, admin routes, clean URL rule |
| Form handlers | Contact, Appointment, Medical Record Request, Job Apply (resume upload) |
| Admin auth | Session-based; password via `ADMIN_PASSWORD` or default |
| Data dir | `data/` + `data/uploads/` (auto-created); `.gitkeep` in `data/` |
| `.gitignore` | Ignores `data/*.json`, `data/uploads/`, `node_modules/`, `.env` |
| `robots.txt` | Allow / ; Disallow /admin ; Sitemap URL |
| `sitemap.xml` | All public clean URLs (njnopain.com – change domain if needed) |
| 404 page | `404.html` served for unknown paths with 404 status |
| No .html in hrefs | Verified across all HTML files |

## Server Requirements

- **PHP** 7.4+ (sessions, file read/write, `move_uploaded_file`)
- **Apache** with `mod_rewrite` and `AllowOverride` so `.htaccess` applies
- **Writable:** `data/` and `data/uploads/` (PHP creates if missing)

## Before Go-Live

1. Upload full project (all HTML, PHP, `css/`, `assets/`, `_next/`, `data/`, `admin/`, `.htaccess`, `index.php`, `robots.txt`, `sitemap.xml`, `404.html`).
2. Ensure `data/` and `data/uploads/` exist and are writable (e.g. 755 or 775).
3. If using a different domain, update `sitemap.xml` and `robots.txt` (replace `https://njnopain.com` with your domain).
4. Set `ADMIN_PASSWORD` in server environment for production (optional but recommended).
5. Test: home `/`, `/careers`, `/contact-us`, form submissions, `/admin/login`, dashboard.

## Optional

- **Canonical / og:url:** Add per-page canonical and og:url with final production domain if you need SEO/social consistency.
- **404 layout:** Replace `404.html` with a full header/footer version if you want the same chrome as the rest of the site.
