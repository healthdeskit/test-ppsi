const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

const footerOld = `        <div class="footer-links">
          <a href="/locations">Passaic, NJ</a>
          <a href="/clifton-new-jersey">Clifton, NJ</a>
          <a href="/jersey-city">Jersey City, NJ</a>
          <a href="/locations">Somerset, NJ</a>
          <a href="/elizabeth">Elizabeth, NJ</a>
          <a href="/edison">Edison, NJ</a>
          <a href="/north-brunswick">North Brunswick, NJ</a>
          <a href="/hamilton-new-jersey">Hamilton, NJ</a>
        </div>`;

const footerNew = `        <div class="footer-links">
          <a href="/clifton-new-jersey">Clifton, NJ</a>
          <a href="/edison">Edison, NJ</a>
          <a href="/elizabeth">Elizabeth, NJ</a>
          <a href="/hamilton-new-jersey">Hamilton, NJ</a>
          <a href="/jersey-city">Jersey City, NJ</a>
          <a href="/north-brunswick">North Brunswick, NJ</a>
          <a href="/locations">Passaic, NJ</a>
          <a href="/locations">Somerset, NJ</a>
        </div>`;

const mobileOld = `            <div class="mobile-subnav">
              <a href="/edison">Edison, NJ</a>
              <a href="/clifton-new-jersey">Clifton, NJ</a>
              <a href="/jersey-city">Jersey City, NJ</a>
              <a href="/elizabeth">Elizabeth, NJ</a>
              <a href="/north-brunswick">North Brunswick, NJ</a>
              <a href="/hamilton-new-jersey">Hamilton, NJ</a>
            </div>`;

const mobileNew = `            <div class="mobile-subnav">
              <a href="/clifton-new-jersey">Clifton, NJ</a>
              <a href="/edison">Edison, NJ</a>
              <a href="/elizabeth">Elizabeth, NJ</a>
              <a href="/hamilton-new-jersey">Hamilton, NJ</a>
              <a href="/jersey-city">Jersey City, NJ</a>
              <a href="/north-brunswick">North Brunswick, NJ</a>
              <a href="/locations">Passaic, NJ</a>
              <a href="/locations">Somerset, NJ</a>
            </div>`;

const crlf = (s) => s.replace(/\n/g, "\r\n");

/** Index-style mobile list (A–Z) missing Passaic/Somerset */
const mobileSixOld = `            <div class="mobile-subnav">
              <a href="/clifton-new-jersey">Clifton, NJ</a>
              <a href="/edison">Edison, NJ</a>
              <a href="/elizabeth">Elizabeth, NJ</a>
              <a href="/hamilton-new-jersey">Hamilton, NJ</a>
              <a href="/jersey-city">Jersey City, NJ</a>
              <a href="/north-brunswick">North Brunswick, NJ</a>
            </div>`;

const mobileSixNew = `            <div class="mobile-subnav">
              <a href="/clifton-new-jersey">Clifton, NJ</a>
              <a href="/edison">Edison, NJ</a>
              <a href="/elizabeth">Elizabeth, NJ</a>
              <a href="/hamilton-new-jersey">Hamilton, NJ</a>
              <a href="/jersey-city">Jersey City, NJ</a>
              <a href="/north-brunswick">North Brunswick, NJ</a>
              <a href="/locations">Passaic, NJ</a>
              <a href="/locations">Somerset, NJ</a>
            </div>`;

const replacements = [
  [footerOld, footerNew],
  [crlf(footerOld), crlf(footerNew)],
  [mobileOld, mobileNew],
  [crlf(mobileOld), crlf(mobileNew)],
  [mobileSixOld, mobileSixNew],
  [crlf(mobileSixOld), crlf(mobileSixNew)],
];

let count = 0;
for (const name of fs.readdirSync(root)) {
  if (!name.endsWith(".html")) continue;
  const p = path.join(root, name);
  let t = fs.readFileSync(p, "utf8");
  const orig = t;
  for (const [a, b] of replacements) {
    t = t.split(a).join(b);
  }
  if (t !== orig) {
    fs.writeFileSync(p, t, "utf8");
    count++;
    console.log(name);
  }
}
console.log("Updated", count, "files");
