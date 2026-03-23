#!/usr/bin/env node
/**
 * Replaces corrupted Unicode replacement chars (U+FFFD) with proper punctuation.
 * Run: node scripts/fix-encoding.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FIXES = [
  [/\uFFFD/g, ', '],  // default: comma (avoid em dash in site copy)
];

const CONTEXT_FIXES = [
  ["hasn\uFFFDt", "hasn't"],
  ["hasn\uFFFDt ", "hasn't "],
  ["We\uFFFDre", "We're"],
  ["we\uFFFDre", "we're"],
  ["they\uFFFDre", "they're"],
  ["you\uFFFDre", "you're"],
  ["You\uFFFDll", "You'll"],
  ["We\uFFFDll", "We'll"],
  ["we\uFFFDll", "we'll"],
  ["don\uFFFDt", "don't"],
  ["it\uFFFDs", "it's"],
  ["that\uFFFDs", "that's"],
  ["specialists\uFFFDour", "specialists, our"],
  ["pain\uFFFDnot", "pain, not"],
  ["options\uFFFDfrom", "options, from"],
  ["surgery\uFFFDso", "surgery, so"],
  ["roof\uFFFDso", "roof, so"],
  ["injection\uFFFDwe", "injection, we"],
  ["plan\uFFFDwhich", "plan, which"],
  ["combination\uFFFDand", "combination, and"],
  ["when they\uFFFDre", "when they're"],
  ["you\uFFFDre not", "you're not"],
  ["Pain Management \uFFFD Common", "Pain Management – Common"],
];

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
let total = 0;
for (const file of files) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;
  for (const [from, to] of CONTEXT_FIXES) {
    html = html.split(from).join(to);
  }
  html = html.replace(/\uFFFD/g, ', ');
  if (html !== orig) {
    fs.writeFileSync(fp, html, 'utf8');
    total++;
  }
}
console.log(`Fixed encoding in ${total} files.`);
