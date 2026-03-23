#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const patterns = [
  [/https:\/\/www\.ppsinj\.com/g, 'https://njnopain.com'],
  [/https:\/\/ppsinj\.com/g, 'https://njnopain.com'],
];

function walk(dir, ext, out = []) {
  const ents = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of ents) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!['node_modules', 'dist', '.git'].includes(e.name)) walk(fp, ext, out);
    } else if (ext.some((x) => e.name.endsWith(x))) out.push(fp);
  }
  return out;
}

const files = walk(ROOT, ['.html', '.xml', '.txt', '.js']);
let total = 0;
for (const fp of files) {
  let content = fs.readFileSync(fp, 'utf8');
  let changed = false;
  for (const [re, replacement] of patterns) {
    if (re.test(content)) {
      content = content.replace(re, replacement);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(fp, content, 'utf8');
    total++;
    console.log(path.relative(ROOT, fp));
  }
}
console.log(`\nReplaced domain in ${total} files.`);
