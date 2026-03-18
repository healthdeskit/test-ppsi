# PPSI Web Project – Structure & Sitemap

Last updated: March 2025

---

## 1. Root HTML Pages (37 files)

### Home & Core
| File | Purpose |
|------|---------|
| `index.html` | Homepage |
| `about-us.html` | About PPSI |
| `contact-us.html` | Contact |
| `locations.html` | All locations listing |
| `medical-appointment.html` | Book appointment |

### Services
| File | Purpose |
|------|---------|
| `pain-management.html` | Pain management |
| `spine-surgery.html` | Spine surgery |
| `chiropractic.html` | Chiropractic care |
| `orthopedics.html` | Orthopedics |
| `podiatry.html` | Podiatry |
| `physical-therapy.html` | Physical therapy |
| `practice-areas.html` | All services / practice areas |
| `interventional.html` | Interventional procedures (image-guided) |
| `auto-injury.html` | Auto injury / MVA care |

### Doctors
| File | Purpose |
|------|---------|
| `doctors.html` | All doctors listing |
| `dr-wael-elkholy-m-d.html` | Dr. Wael Elkholy |
| `dr-wael-elkholy-resume.html` | Dr. Elkholy resume |
| `alexios-apazidis.html` | Dr. Alexios Apazidis |
| `dr-ashraf-sakr.html` | Dr. Ashraf Sakr |
| `fouad-karam.html` | Dr. Fouad Karam |
| `edward-sofo.html` | Dr. Edward Sofo |
| `patrick-nierva.html` | Dr. Patrick Nierva |

### Locations (dedicated pages – North Brunswick style)
| File | Purpose |
|------|---------|
| `north-brunswick.html` | North Brunswick (video hero) |
| `edison.html` | Edison (main campus) |
| `clifton-new-jersey.html` | Clifton |
| `jersey-city.html` | Jersey City |
| `elizabeth.html` | Elizabeth |
| `hamilton-new-jersey.html` | Hamilton |

*Note: Passaic & Somerset link to `locations.html` (no dedicated page).*

### Patient & Company
| File | Purpose |
|------|---------|
| `patient-portal.html` | Patient portal |
| `medical-records.html` | Medical records info |
| `medical-record-request.html` | Request records form |
| `insurance.html` | Insurance |
| `careers.html` | Careers |
| `blogs.html` | Blog & insights |
| `covid-19.html` | COVID-19 info |

### Legal & Policy
| File | Purpose |
|------|---------|
| `privacy-policy.html` | Privacy policy |
| `terms-of-service.html` | Terms of service |

---

## 2. Navigation & Links

- **Header:** Services (dropdown), Doctors (dropdown), Locations (dropdown), About.  
  Locations dropdown: Clifton, Edison, Jersey City, North Brunswick, All Locations.
- **Footer:** Same location links (all 8: Passaic→locations, Clifton, Jersey City, Somerset→locations, Elizabeth, Edison, North Brunswick, Hamilton), Services, Company, Contact.
- **Mobile nav:** Same structure; Locations list includes Clifton, Jersey City, Elizabeth, Edison, North Brunswick, Hamilton.
- **Homepage services cards:** Pain, Spine, Chiropractic, Orthopedics, Podiatry, PT, **Interventional**, **Auto Injury** → `interventional.html`, `auto-injury.html`.

---

## 3. Previously Missing Pages (now added)

- **`interventional.html`** – Linked from index (Interventional Procedures). Created from pain-management template; content for fluoroscopy/ultrasound-guided procedures.
- **`auto-injury.html`** – Linked from index (Auto Injury Care). Created from pain-management template; content for MVA/accident-related care.

---

## 4. Assets & Support

- **CSS:** `css/ppsi-shared.css`
- **JS:** `js/ppsi-shared.js`
- **Images:** `assets/`, `_next/`, `location-photos/`
- **Template (internal):** `_templates/ppsi-page-shell.html`

---

## 5. Link Check Summary

| Linked page | Exists |
|-------------|--------|
| All nav/footer .html | Yes |
| interventional.html | Yes (added) |
| auto-injury.html | Yes (added) |
| medical-record-request.html | Yes |
| dr-wael-elkholy-resume.html | Yes |

No broken internal .html links identified after adding `interventional.html` and `auto-injury.html`.
