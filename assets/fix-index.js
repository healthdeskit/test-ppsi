(function () {
  function run() {
    var path = (window.location.pathname || "").toLowerCase();
    var isIndex = !path || path === "/" || path.endsWith("/index.html") || path === "/index.html" || path.endsWith("/");

    if (isIndex) {
      var breadcrumb = document.querySelector('nav[aria-label="Breadcrumb"]');
      if (breadcrumb) breadcrumb.style.display = "none";
    }

    document.body.classList.add(isIndex ? "on-index" : "on-inner");

    var strapiBase = "https://safe-flower-0fbf217001.media.strapiapp.com/";
    document.querySelectorAll("img[src]").forEach(function (img) {
      var s = img.getAttribute("src") || "";
      if (s.indexOf("safe-flower") !== -1 && s.indexOf("http") !== 0) {
        var file = s.split("/").pop();
        img.src = strapiBase + file;
      }
    });
    document.querySelectorAll("img[srcset]").forEach(function (img) {
      var s = img.getAttribute("srcset") || "";
      if (s.indexOf("safe-flower") !== -1 && s.indexOf("http") !== 0) {
        img.setAttribute("srcset", s.replace(/[^ ]*safe-flower[^ ]*/g, function (m) {
          var file = m.split("/").pop();
          return strapiBase + file;
        }));
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
