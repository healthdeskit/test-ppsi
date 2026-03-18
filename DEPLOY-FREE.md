# PPSI – Automatic Deploy (Premium Free Hosting)

Is project ko **Git push = auto deploy** ke saath free hosting par chalane ke liye. Docker + Node server use hota hai; forms, admin, clean URLs sab kaam karte hain.

---

## Option 1: Render (Recommended – sabse easy)

**Free tier:** 750 hours/month, auto deploy from GitHub. Service 15 min inactivity ke baad sleep ho jati hai; next request par cold start (thodi der lag sakti hai).

### Steps

1. **GitHub par code push karein**
   - Agar repo nahi hai: GitHub par new repo banao, phir:
   ```bash
   cd "c:\My Web Sites\PPSI WEB\Converted"
   git init
   git add .
   git commit -m "PPSI site ready for deploy"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Render par account**
   - https://render.com → Sign up (GitHub se login kar sakte hain).

3. **New Web Service**
   - Dashboard → **New +** → **Web Service**
   - **Connect repository:** apna GitHub repo select karein
   - **Name:** ppsi-web (ya kuch bhi)
   - **Runtime:** **Docker**
   - **Root Directory:** (khali chhod dein)
   - **Instance Type:** **Free**

4. **Environment variables** (Recommended)
   - **ADMIN_PASSWORD** – admin login password (e.g. `ppsi-admin-2025` ya naya strong password)
   - **SESSION_SECRET** – koi bhi random string (session ke liye)
   - **PORT** – Render khud set karta hai, aapko set karne ki zarurat nahi

5. **Create Web Service**
   - Deploy start ho jayega. Pehli baar build 2–4 min le sakta hai.
   - Jab **Live** ho jaye, URL milega: `https://ppsi-web.onrender.com` (ya aapka diya hua name).

6. **Auto deploy**
   - Ab jab bhi `git push` karoge (main branch), Render automatically naya build + deploy karega.

### Note (Free tier)

- **Data (forms, job applications)** container ke andar rehta hai. Service restart/redeploy par **reset** ho sakta hai. Permanent storage ke liye paid plan par Render Disk use kar sakte hain, ya baad mein database add kar sakte hain.
- Cold start: 15 min idle ke baad pehli request slow ho sakti hai.

---

## Option 2: Railway

**Free tier:** $5 credit/month (approx 500 hours). GitHub se auto deploy.

### Steps

1. **Code GitHub par push** (Option 1 jaisa).

2. **Railway**
   - https://railway.app → Login with GitHub.

3. **New Project**
   - **New Project** → **Deploy from GitHub repo** → apna repo select karein.

4. **Settings**
   - Railway repo detect karke **Dockerfile** se build karega.
   - **Root Directory:** (default)
   - **Build:** Dockerfile (auto)
   - **Start:** CMD in Dockerfile (node server/server.js)

5. **Variables**
   - **Variables** tab: `ADMIN_PASSWORD`, `SESSION_SECRET` add karein. `PORT` Railway khud set karta hai.

6. **Domain**
   - **Settings** → **Generate Domain** → aapko `https://xxx.up.railway.app` milega.

7. **Auto deploy**
   - Har `git push` par naya deploy (agar Railway ne repo connect kiya hua hai).

### Note

- Credit khatam hone par service suspend. Naya month = naya credit.
- Persistent data ke liye Railway **Volume** (paid) ya baad mein DB add karna hoga.

---

## Kya deploy hota hai?

| Item | Status |
|------|--------|
| Clean URLs (/, /careers, /contact-us, …) | ✅ |
| Contact form | ✅ POST /contact-us |
| Appointment form | ✅ POST /medical-appointment |
| Medical record request form | ✅ POST /medical-record-request |
| Job application form (resume upload) | ✅ POST /careers/apply |
| Admin panel | ✅ /admin (login, submissions, medical requests, job applications) |
| 404 page | ✅ |
| Static assets (CSS, images, _next) | ✅ |

---

## Local test (Docker se)

Deploy se pehle local Docker se verify kar sakte hain:

```bash
cd "c:\My Web Sites\PPSI WEB\Converted"
docker build -t ppsi-web .
docker run -p 3000:3000 -e ADMIN_PASSWORD=ppsi-admin-2025 ppsi-web
```

Browser: http://localhost:3000

---

## Summary

| Platform | Free tier | Auto deploy | Best for |
|----------|-----------|-------------|----------|
| **Render** | 750 hrs/month, sleep after 15 min | ✅ GitHub | Sabse easy, zero config |
| **Railway** | $5 credit/month | ✅ GitHub | Thoda zyada control |

**Recommendation:** Pehle **Render** par try karein: GitHub connect → Docker → Environment variables → Deploy. Har `git push` par site automatically update ho jayegi.
