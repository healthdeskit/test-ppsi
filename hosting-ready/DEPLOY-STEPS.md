# PPSI Deployment Steps (Roman Urdu)

## Best + Quick option

Render + GitHub + Docker + Persistent Disk.

Yeh option shared hosting se better hai kyun ke backend, forms, admin aur uploads sab stable chalenge.

## Step-by-step

1. Project GitHub par push karo.
2. Render par "New -> Blueprint" select karo.
3. Repo connect karo, root ka `render.yaml` use karo.
4. Env vars set karo:
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
5. Deploy run karo.
6. Render Custom Domain me apna domain add karo.
7. DNS panel me Render ke diye huye records set karo.
8. SSL active hone do, phir final test:
   - home page
   - appointment form
   - careers apply + resume
   - `/admin` login

## Important

- Free tier avoid karo agar business site hai.
- Persistent disk enabled rehni chahiye warna form/admin data lose ho sakta hai.
- Har deploy ke baad forms test zaroor karo.
