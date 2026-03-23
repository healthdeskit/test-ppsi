/**
 * Insert Dr. Patrick Nierva (Doctor of Chiropractic) into Doctors dropdown + mobile nav after Dr. Karam.
 * Skips files that already include patrick-nierva in the desktop doctors dropdown.
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

const desktopOld = `            <a href="/fouad-karam" class="dropdown-link">
              <span class="dropdown-icon"><svg class="icon icon-sm"><use href="#i-user"></use></svg></span>
              <span>
                <span class="dropdown-title">Dr. Fouad Karam</span>
                <span class="dropdown-desc">Doctor of Chiropractic focused on conservative spine care.</span>
              </span>
            </a>
            <a href="/doctors" class="dropdown-link">`;

const desktopNew = `            <a href="/fouad-karam" class="dropdown-link">
              <span class="dropdown-icon"><svg class="icon icon-sm"><use href="#i-user"></use></svg></span>
              <span>
                <span class="dropdown-title">Dr. Fouad Karam</span>
                <span class="dropdown-desc">Doctor of Chiropractic focused on conservative spine care.</span>
              </span>
            </a>
            <a href="/patrick-nierva" class="dropdown-link">
              <span class="dropdown-icon"><svg class="icon icon-sm"><use href="#i-user"></use></svg></span>
              <span>
                <span class="dropdown-title">Dr. Patrick Nierva</span>
                <span class="dropdown-desc">Doctor of Chiropractic focused on spine and musculoskeletal care.</span>
              </span>
            </a>
            <a href="/doctors" class="dropdown-link">`;

const mobileOld = `              <a href="/fouad-karam">Dr. Fouad Karam</a>
              <a href="/doctors">Meet All Doctors</a>`;

const mobileNew = `              <a href="/fouad-karam">Dr. Fouad Karam</a>
              <a href="/patrick-nierva">Dr. Patrick Nierva</a>
              <a href="/doctors">Meet All Doctors</a>`;

let n = 0;
for (const name of fs.readdirSync(root)) {
  if (!name.endsWith(".html")) continue;
  const p = path.join(root, name);
  let t = fs.readFileSync(p, "utf8");
  const orig = t;

  if (t.includes('href="/patrick-nierva" class="dropdown-link"')) {
    // already has desktop entry
  } else if (t.includes(desktopOld)) {
    t = t.replace(desktopOld, desktopNew);
  } else if (t.includes(desktopOld.replace(/\n/g, "\r\n"))) {
    t = t.replace(desktopOld.replace(/\n/g, "\r\n"), desktopNew.replace(/\n/g, "\r\n"));
  }

  if (t.includes('<a href="/patrick-nierva">Dr. Patrick Nierva</a>')) {
    // mobile already
  } else if (t.includes(mobileOld)) {
    t = t.replace(mobileOld, mobileNew);
  } else if (t.includes(mobileOld.replace(/\n/g, "\r\n"))) {
    t = t.replace(mobileOld.replace(/\n/g, "\r\n"), mobileNew.replace(/\n/g, "\r\n"));
  }

  if (t !== orig) {
    fs.writeFileSync(p, t, "utf8");
    n++;
    console.log(name);
  }
}
console.log("Updated", n, "files");
