/**
 * Fix duplicate FAQ and broken sections on index page.
 * - Hides the Next.js FAQ (accordion with empty content) - keep our static #nj-faq-seo-section
 * - Ensures Conditions we treat / body diagram sections are visible
 */
(function () {
  function hideDuplicateFaq() {
    var sections = document.querySelectorAll("main section");
    sections.forEach(function (section) {
      if (section.id === "nj-faq-seo-section") return;
      var h3 = section.querySelector("h3");
      if (!h3) return;
      var text = (h3.textContent || "").toLowerCase();
      if (text.indexOf("frequently asked") === -1) return;
      var hasRadixAccordion = section.querySelector("[data-radix-collection-item], [data-state='closed'][data-orientation='vertical']");
      if (hasRadixAccordion) {
        section.style.display = "none";
      }
    });
  }

  function revealHiddenSections() {
    var sections = document.querySelectorAll("section");
    sections.forEach(function (section) {
      var text = (section.textContent || "").toLowerCase();
      var isConditions = text.indexOf("conditions we treat") !== -1 || text.indexOf("find your pain point") !== -1;
      if (!isConditions) return;

      section.querySelectorAll('[style*="opacity:0"]').forEach(function (el) {
        var s = (el.getAttribute("style") || "").replace(/opacity\s*:\s*0/gi, "opacity:1");
        if (s.indexOf("scale(0)") !== -1) s = s.replace(/scale\(0\)/g, "scale(1)");
        el.setAttribute("style", s || "opacity:1");
      });
      section.querySelectorAll('.bg-blue-600.rounded-full[style*="scale(0)"], .bg-blue-600.rounded-full[style*="opacity:0"]').forEach(function (dot) {
        var s = (dot.getAttribute("style") || "").replace(/opacity\s*:\s*0/gi, "opacity:1").replace(/scale\(0\)/g, "scale(1)");
        dot.setAttribute("style", s);
      });
    });
  }

  function run() {
    hideDuplicateFaq();
    revealHiddenSections();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
  setTimeout(run, 500);
  setTimeout(revealHiddenSections, 1200);
})();
