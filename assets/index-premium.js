(function () {
  function withBase(path) {
    if (path.charAt(0) === "/" || path.indexOf("http://") === 0 || path.indexOf("https://") === 0) return path;
    var depth = window.location.pathname.split("/").filter(Boolean).length - 1;
    if (depth <= 0) return path;
    return "../".repeat(depth) + path;
  }

  function forceVisibleLogo() {
    var logo = document.querySelector("header a img");
    if (!logo) return;
    logo.alt = "Precision Pain and Spine Institute";
    logo.style.display = "block";
    logo.style.maxHeight = "62px";
    logo.style.width = "auto";

    var preferred = "assets/PPSI-logo.png";
    var fallback = "assets/header-logo.svg";
    logo.src = withBase(preferred);
    logo.onerror = function () {
      logo.src = withBase(fallback);
    };
  }

  function tuneHomepageHeading() {
    var h1 = document.querySelector("main h1");
    if (!h1) return;
    h1.textContent = "Pain Management and Spine Specialists Across New Jersey";
  }

  function run() {
    forceVisibleLogo();
    tuneHomepageHeading();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();

