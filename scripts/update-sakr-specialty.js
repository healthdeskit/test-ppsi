/**
 * One-off: rebrand Dr. Sakr from "Anesthesiologist" to "pain management specialist" in shared UI strings.
 * Run: node scripts/update-sakr-specialty.js
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

const pairs = [
  [
    "Anesthesiologist with interventional and perioperative expertise.",
    "Pain management specialist with interventional and perioperative expertise.",
  ],
  [
    '<div class="doctor-grid-meta">Anesthesiologist</div>',
    '<div class="doctor-grid-meta">Pain management specialist</div>',
  ],
  [
    '<p class="resume-hero-role">Anesthesiologist</p>',
    '<p class="resume-hero-role">Pain management specialist</p>',
  ],
  [
    '<p class="provider-hero-role">Anesthesiologist</p>',
    '<p class="provider-hero-role">Pain management specialist</p>',
  ],
  [
    "Dr. Ashraf Sakr M.D., Anesthesiologist at Precision Pain &amp; Spine Institute",
    "Dr. Ashraf Sakr M.D., pain management specialist at Precision Pain &amp; Spine Institute",
  ],
];

let files = 0;
for (const name of fs.readdirSync(root)) {
  if (!name.endsWith(".html")) continue;
  const p = path.join(root, name);
  let t = fs.readFileSync(p, "utf8");
  const o = t;
  for (const [a, b] of pairs) {
    t = t.split(a).join(b);
  }
  if (t !== o) {
    fs.writeFileSync(p, t, "utf8");
    files++;
    console.log(name);
  }
}
console.log("Updated", files, "HTML files");
