# Cyberpanel Deployment - Precision Pain & Spine Institute

Clean static site structure ready for CyberPanel on Ubuntu.

## Structure

```
Cyberpanel/
├── index.html              # Homepage
├── about-us.html
├── blogs.html
├── contact-us.html
├── covid-19.html
├── doctors.html
├── locations.html
├── medical-appointment.html
├── medical-record-request.html
├── practice-areas.html
├── privacy-policy.html
├── terms-of-service.html
├── clifton-new-jersey.html
├── jersey-city.html
├── elizabeth.html
├── edison.html
├── north-brunswick.html
├── hamilton-new-jersey.html
├── dr-wael-elkholy-m-d.html
├── dr-ashraf-sakr.html
├── edward-sofo.html
├── patrick-nierva.html
├── alexios-apazidis.html
├── fouad-karam.html
├── pain-management.html
├── spine-surgery.html
├── css/                    # All stylesheets
├── assets/                 # JS, logo, custom scripts
├── _next/                  # Next.js runtime (required)
├── favicon.ico
├── manifest.json
├── robots.txt
└── sitemap.xml
```

## Deployment

1. Create a website in CyberPanel for your domain
2. Upload the **entire Cyberpanel folder contents** to the site's document root (e.g. `public_html`)
3. Ensure `index.html` is in the root
4. All internal links use flat paths (no subfolders)

## Design

- Same design as original site
- Tailwind CSS + custom overrides
- All images (external Strapi URLs + local assets) preserved
- Responsive layout intact
