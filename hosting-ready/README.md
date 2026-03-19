# PPSI Hosting Ready (Quick + Proper)

This folder gives you the fastest production path without shared hosting:

- Deploy from GitHub on Render (Docker runtime)
- Keep forms/admin/uploads persistent with a disk mount
- Connect your domain and update DNS
- Continue development with normal GitHub flow

## Why this option

- Quick to launch (minutes, not days)
- Proper backend support (Node + form submissions + admin)
- Easy to scale later (upgrade plan, move to VPS/cloud when needed)
- Team-friendly workflow (PRs, branches, auto-deploy)

## 1) Push website to GitHub

Create a new GitHub repo and push your project root (`Converted`) to that repo.

Minimal commands:

```powershell
git init
git add .
git commit -m "Initial PPSI production deploy setup"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

## 2) Deploy on Render

1. Open Render dashboard -> New -> Blueprint
2. Connect your GitHub repo
3. Select `render.yaml` from repo root
4. Set environment variables (do NOT use defaults):
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
5. Deploy

Service uses Docker + persistent disk mounted at `/app/data` for:
- form records
- admin data
- uploaded resumes

## 3) Domain + DNS

In Render service -> Settings -> Custom Domains:

1. Add your domain (example: `www.yourdomain.com`)
2. Render will show target/CNAME
3. Add those DNS records in your domain registrar/DNS provider
4. (Optional) Redirect apex to `www` or vice versa

After DNS propagation, SSL is provisioned automatically by Render.

## 4) Daily development workflow

- Work locally
- Push to GitHub main (or merge PR)
- Render auto-deploys latest commit

## 5) Production checklist

- Change admin password regularly
- Keep secrets only in hosting env vars
- Backup `data/` from persistent disk periodically
- Test all forms after each major release
- Verify `/admin` and resume download flow

## Included files

- `render.production.yaml`: reference blueprint copy for production
- `ENV.production.example`: safe env template
- `DEPLOY-STEPS.md`: condensed checklist in Roman Urdu
