/**
 * Pain Point Section Fix
 * Reveals the body diagram, pain spot markers, and condition content
 * that are hidden (opacity:0) by default in the static/SSR HTML.
 * Re-runs on condition menu click so dots update correctly when switching conditions.
 */
(function () {
  function withBase(path) {
    if (path.charAt(0) === "/" || path.indexOf("http") === 0) return path;
    var depth = (window.location.pathname || "/").split("/").filter(Boolean).length - 1;
    if (depth <= 0) return path;
    return Array(depth).fill("..").join("/") + "/" + path;
  }

  function revealInContainer(container) {
    if (!container) return;
    // 1. Show containers with opacity:0
    var hidden = container.querySelectorAll('[style*="opacity:0"]');
    hidden.forEach(function (el) {
      var s = (el.getAttribute("style") || "").replace(/opacity\s*:\s*0/gi, "opacity:1");
      if (s.indexOf("transform") !== -1 && s.indexOf("scale(0)") !== -1) {
        s = s.replace(/transform\s*:\s*scale\(0\)/gi, "transform:scale(1)");
      }
      el.setAttribute("style", s || "opacity:1");
    });
    // 2. Show pain spot dots (bg-blue-600 rounded-full with scale(0))
    var dots = container.querySelectorAll('.bg-blue-600.rounded-full[style*="scale(0)"], .bg-blue-600.rounded-full[style*="opacity:0"]');
    dots.forEach(function (dot) {
      var s = (dot.getAttribute("style") || "").replace(/opacity\s*:\s*0/gi, "opacity:1").replace(/scale\(0\)/g, "scale(1)");
      dot.setAttribute("style", s);
    });
    // 3. Fix any div with transform:scale(0)
    var scaled = container.querySelectorAll('[style*="scale(0)"]');
    scaled.forEach(function (el) {
      var s = (el.getAttribute("style") || "").replace(/opacity\s*:\s*0/gi, "opacity:1").replace(/scale\(0\)/g, "scale(1)");
      el.setAttribute("style", s);
    });
  }

  function fixPainPointSection() {
    var sections = document.querySelectorAll('section');
    sections.forEach(function (section) {
      var text = (section.textContent || "").toLowerCase();
      var isPainPoint = text.indexOf("find your pain point") !== -1 || text.indexOf("conditions we treat") !== -1;
      if (!isPainPoint) return;

      revealInContainer(section);

      // 4. Ensure body diagram image loads (fix src if relative)
      var imgs = section.querySelectorAll('img[src*="Group_221"]');
      imgs.forEach(function (img) {
        var src = img.getAttribute("src") || "";
        if (src.indexOf("safe-flower") !== -1 && src.indexOf("http") !== 0) {
          img.src = "https://safe-flower-0fbf217001.media.strapiapp.com/Group_221_0cc62b2a7b.svg";
        }
      });
    });
  }

  var listenersAttached = false;
  function setupConditionMenuListeners() {
    if (listenersAttached) return;
    var sections = document.querySelectorAll('section');
    sections.forEach(function (section) {
      var text = (section.textContent || "").toLowerCase();
      var isPainPoint = text.indexOf("find your pain point") !== -1 || text.indexOf("conditions we treat") !== -1;
      if (!isPainPoint) return;

      var nav = section.querySelector('nav.flex.flex-col');
      var prevBtn = section.querySelector('button[aria-label="Previous condition"]');
      var nextBtn = section.querySelector('button[aria-label="Next condition"]');
      var navButtons = section.querySelectorAll('nav button[type="button"]');

      function scheduleReveal() {
        setTimeout(function () { revealInContainer(section); }, 350);
      }

      if (nav) {
        nav.addEventListener('click', scheduleReveal);
      }
      if (prevBtn) prevBtn.addEventListener('click', scheduleReveal);
      if (nextBtn) nextBtn.addEventListener('click', scheduleReveal);
      navButtons.forEach(function (btn) { btn.addEventListener('click', scheduleReveal); });
    });
    listenersAttached = true;
  }

  function run() {
    fixPainPointSection();
    setupConditionMenuListeners();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  // Re-run after short delays to catch React/Next hydration and initial re-renders
  setTimeout(run, 800);
  setTimeout(function () { fixPainPointSection(); }, 1500);
})();
