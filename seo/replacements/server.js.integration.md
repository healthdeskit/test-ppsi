# server.js integration patch

Use `server/seo.js` as the centralized metadata injector.

## 1. Add import near the top
```js
const { injectSeo } = require('./seo');
```

## 2. Add helper after `cleanUrlMap`
```js
function serveHtmlWithSeo(req, res, absoluteFilePath) {
  try {
    const raw = fs.readFileSync(absoluteFilePath, 'utf8');
    const html = injectSeo(raw, req.path);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  } catch (e) {
    console.error('SEO injection failed:', e);
    return res.sendFile(absoluteFilePath);
  }
}
```

## 3. Replace `serveCleanUrl` implementation
```js
function serveCleanUrl(req, res, next) {
  const p = req.path.replace(/\/$/, '') || '/';
  const file = cleanUrlMap[p];
  if (file) {
    const fp = path.join(ROOT, file);
    if (fs.existsSync(fp)) {
      return serveHtmlWithSeo(req, res, fp);
    }
  }
  next();
}
```

## 4. Replace `.html` handler sendFile call
```js
return serveHtmlWithSeo(req, res, fp);
```
Instead of:
```js
return res.sendFile(fp);
```

## 5. Replace final fallback clean URL sendFile call
```js
if (fs.existsSync(fp)) return serveHtmlWithSeo(req, res, fp);
```

## 6. Leave static assets untouched
Do not change:
```js
app.use(express.static(ROOT, { extensions: ['html'], index: false }));
```

## Result
This will centralize titles, meta descriptions, canonical tags, robots tags, Open Graph tags, Twitter cards, and JSON-LD schema without rewriting every HTML file first.
