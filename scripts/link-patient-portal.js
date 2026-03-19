const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const portal = 'https://my.eclinicalworks.com/eCRM/portal/login.jsp';
const replacement =
  `href="${portal}" target="_blank" rel="noopener noreferrer"`;

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f === 'node_modules') continue;
      walk(p);
    } else if (f.endsWith('.html')) {
      let s = fs.readFileSync(p, 'utf8');
      const next = s.split('href="/patient-portal"').join(replacement);
      if (next !== s) {
        fs.writeFileSync(p, next);
        console.log('updated', path.relative(root, p));
      }
    }
  }
}

walk(root);
