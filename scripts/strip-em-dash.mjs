/**
 * Replace Unicode em dash (U+2014) in public-facing copy with commas, colons, or "to" as appropriate.
 * Run: node scripts/strip-em-dash.mjs
 *
 * Patterns use \u2014 (em dash) so this file stays ASCII-only.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const EXT = new Set(['.html', '.css', '.md', '.js', '.json', '.yml', '.ps1', '.php']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (EXT.has(path.extname(e.name))) out.push(p);
  }
  return out;
}

function fixContent(s) {
  let t = s;
  const E = '\u2014';

  // Wrong apostrophe (em dash instead of ')
  const apos = [
    [new RegExp(`isn${E}t`, 'gi'), "isn't"],
    [new RegExp(`doesn${E}t`, 'gi'), "doesn't"],
    [new RegExp(`haven${E}t`, 'gi'), "haven't"],
    [new RegExp(`Don${E}t`, 'gi'), "Don't"],
    [new RegExp(`It${E}s`), "It's"],
    [new RegExp(`it${E}s`), "it's"],
    [new RegExp(`you${E}ve`, 'gi'), "you've"],
    [new RegExp(`I${E}ve`, 'gi'), "I've"],
    [new RegExp(`there${E}s`, 'gi'), "there's"],
    [new RegExp(`we${E}ll`, 'gi'), "we'll"],
    [new RegExp(`We${E}ll`), "We'll"],
    [new RegExp(`PPSI${E}s`), "PPSI's"],
    [new RegExp(`body${E}s`), "body's"],
    [new RegExp(`isn${E}t appropriate`, 'gi'), "isn't appropriate"],
  ];
  for (const [re, rep] of apos) t = t.replace(re, rep);

  t = t.replace(new RegExp(`Monday${E}Friday`), 'Monday to Friday');
  t = t.replace(new RegExp(`(\\d)${E}(\\d)`, 'g'), '$1 to $2');
  t = t.replace(new RegExp(` ${E} Common Questions`), ': Common Questions');
  t = t.replace(new RegExp(` ${E} `, 'g'), ', ');
  t = t.replace(new RegExp(`([a-z0-9])${E}([a-z])`, 'gi'), '$1, $2');
  t = t.replace(new RegExp(`a ${E}pop${E} from`, 'gi'), 'a small pop from');
  t = t.replace(new RegExp(`coverage${E}you`, 'gi'), 'coverage: you');
  t = t.replace(new RegExp(`PPSI${E}s website`, 'gi'), "PPSI's website");
  t = t.replace(new RegExp(`${E}</div>`), '...</div>');
  t = t.replace(new RegExp(`positions${E}"`), 'positions..."');
  t = t.replace(new RegExp(`/\\*([^*]*?)${E}`, 'g'), '/*$1-');

  return t;
}

const files = walk(ROOT);
let changed = 0;
for (const fp of files) {
  const raw = fs.readFileSync(fp, 'utf8');
  if (!raw.includes('\u2014')) continue;
  const next = fixContent(raw);
  if (next !== raw) {
    fs.writeFileSync(fp, next, 'utf8');
    changed++;
    console.log('Updated:', path.relative(ROOT, fp));
  }
}
console.log('Files changed:', changed);
