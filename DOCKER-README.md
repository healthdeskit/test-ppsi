# PPSI – Docker Setup

Is project ko Docker se poora run karne ke liye.

## Kya chalega

| Service | Port | Kaam |
|--------|------|------|
| **Node (main site)** | **3000** | Pura site, clean URLs, API, admin panel |
| **PHP (Apache)** | **8080** | Jahan bhi `.php` pages chahiye |

- **Site (recommended):** http://localhost:3000 — yahi use karein (clean URLs, forms, admin).
- **PHP:** http://localhost:8080 — koi bhi `.php` file (e.g. http://localhost:8080/info.php).

## Chalana

### Pehli baar (build + run)

```bash
cd "c:\My Web Sites\PPSI WEB\Converted"
docker-compose up -d --build
```

### Baad mein (sirf run)

```bash
docker-compose up -d
```

### Band karna

```bash
docker-compose down
```

## URLs

- **Home:** http://localhost:3000  
- **Clean URLs:** http://localhost:3000/about-us , http://localhost:3000/contact-us , etc.  
- **Admin:** http://localhost:3000/admin (login: default password `ppsi-admin-2025`, `.env` se change karein)  
- **PHP test:** http://localhost:8080/info.php  

## Data

- Form submissions / medical record requests: `./data/ppsi.db` (SQLite).  
- `data/` folder container ke andar mount hai, isliye restart ke baad bhi data rehta hai.

## Sirf Node (PHP nahi chahiye)

Agar PHP service nahi chalaana:

```bash
docker-compose up -d --build web
```

## Sirf PHP (Node nahi chahiye)

Agar sirf PHP chalaana ho (static + PHP, bina Node backend):

```bash
docker-compose up -d php
```

Phir site: http://localhost:8080 (lekin clean URLs / API / admin nahi honge).

## Production

- `server/.env` mein `ADMIN_PASSWORD` aur `SESSION_SECRET` zaroor set karein.  
- Production par reverse proxy (nginx) ke peeche chalaana behtar hai; ports 3000/8080 ko public na karein.
