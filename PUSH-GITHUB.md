# GitHub par push kaise karein

**Commit pehle se ban chuka hai** (`main` branch). Ab sirf GitHub repo bana kar push karna hai.

## 1. GitHub par naya repo

1. https://github.com/new kholo
2. **Repository name:** e.g. `ppsi-web` (kuch bhi)
3. **Public** ya **Private** select karo
4. **README, .gitignore, license mat add karo** (empty repo)
5. **Create repository**

## 2. Git identity (already set for this repo)

- **Email:** `healthdeskit@gmail.com`
- **Name:** `HealthDesk IT`

Naye commits bhi isi identity se banenge. Badalna ho to:

```bash
cd "c:\My Web Sites\PPSI WEB\Converted"
git config user.name "Aapka Naam"
git config user.email "aapka@email.com"
```

## 3. Remote add + push

GitHub page par jo URL dikhe (HTTPS ya SSH), woh use karo:

**HTTPS (password / Personal Access Token):**
```bash
cd "c:\My Web Sites\PPSI WEB\Converted"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**SSH (agar key setup hai):**
```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

`YOUR_USERNAME` aur `YOUR_REPO` apne se replace karo.

### Agar `remote already exists` aaye

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

**Note:** Main aapke GitHub account se login nahi kar sakta, isliye **push aapko apne PC se** ye commands chala kar karna hoga.
