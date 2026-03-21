# PPSI SEO Rebuild Audit

Branch: `seo-rebuild-foundation`
Repo: `healthdeskit/test-ppsi`

## Goal
Create a safe staging foundation for a full SEO/content rebuild without touching the live production repo.

## Sitewide findings

1. Core pages rely on basic `<title>` and `<meta name="description">` only.
2. Canonical tags, Open Graph tags, Twitter cards, and JSON-LD schema need to be standardized across page families.
3. Several pages use generic titles such as `Pain Management | PPSI`, `Practice Areas | PPSI`, `Our Doctors | PPSI`, which are weaker than search-intent titles.
4. Some pages contain encoding artifacts such as `?` and `�` in metadata or footer text.
5. Utility pages should not all be treated as SEO growth pages. Some should likely be `noindex`.
6. Blog is not yet a real topical authority hub and needs a content-cluster strategy.
7. Service, provider, and location pages are the strongest commercial SEO assets and should be prioritized.

## Implementation phases

### Phase 1 — Technical SEO foundation
- Standardize page titles and meta descriptions.
- Add canonical tags on every indexable page.
- Add Open Graph + Twitter metadata.
- Add JSON-LD schema for organization, physician, FAQ, and local pages.
- Fix broken characters / encoding issues.
- Clean malformed repeated HTML blocks in shared navigation areas.

### Phase 2 — Money page optimization
- Homepage as statewide commercial hub.
- Service pages target specialty + condition + procedure intent.
- Provider pages target physician entity + specialty + New Jersey intent.
- Location pages target city + specialty + conversion intent.

### Phase 3 — Indexation strategy
Likely candidates for reduced SEO priority or `noindex`:
- patient portal
- medical record request / utility forms
- resume pages
- covid page (if stale)
- purely legal/support pages if they do not need ranking focus

### Phase 4 — Topical authority
Build real content clusters around:
- sciatica
- herniated disc
- epidural injections
- facet joint pain
- neck pain
- chronic back pain
- auto injury pain care
- EMG / NCS
- when to see a pain specialist
- surgery vs conservative treatment

## Page family priorities

### Highest priority
- `/`
- `/pain-management`
- `/spine-surgery`
- `/practice-areas`
- `/doctors`
- all provider pages
- `/locations`
- all location pages
- `/auto-injury`

### Medium priority
- `/about-us`
- `/contact-us`
- `/insurance`
- `/careers`

### Low priority / utility
- `/patient-portal`
- `/medical-records`
- `/medical-record-request`
- `/privacy-policy`
- `/terms-of-service`
- `/covid-19`
- provider resume pages

## Content quality direction

### Homepage
Must serve as:
- brand trust hub
- statewide specialty hub
- service discovery hub
- doctor trust hub
- location discovery hub
- conversion hub

### Service pages
Each service page should answer:
- what it is
- symptoms / conditions treated
- when to seek care
- procedures offered
- who performs it
- where available
- insurance / scheduling questions
- FAQ

### Provider pages
Each provider page should emphasize:
- full name and specialty
- credentials
- training
- conditions treated
- procedures / services
- associated locations
- physician schema
- strong internal links to service/location pages

### Location pages
Each location page should include:
- city + specialty signals
- full NAP
- map / directions
- office hours
- nearby areas served
- services at that location
- doctors at that location
- local FAQ
- local schema

## Required technical assets
- dynamic or centrally managed metadata map
- canonical strategy
- sitemap strategy
- robots strategy
- redirect tracking
- schema templates
- internal linking map

## Staging policy
This branch is for safe SEO reconstruction and content architecture work before production rollout.
