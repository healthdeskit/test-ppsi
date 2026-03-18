(function () {
  function replaceWithApexcareHeader() {
    var header = document.querySelector("header.fixed");
    if (!header || document.getElementById("pps-header")) return;
    function base() {
      var path = (window.location.pathname || "").replace(/^\//, "").split("/").filter(Boolean);
      if (path.length <= 1) return "";
      return "../".repeat(path.length - 1);
    }
    var b = base();
    var logoSrc = withBase("assets/ppsi-logo.png");
    header.innerHTML =
      '<div class="pps-header-wrap" id="pps-header">' +
      '<div class="pps-header-topbar"><div class="pps-header-topbar-left">' +
      '<div class="pps-header-pill"><span class="pps-dot"></span>Pain Management: Six NJ Locations</div>' +
      '<div class="pps-header-pill" style="color:#6b7280;">\uD83D\uDCCD Edison, Clifton, Jersey City & more</div>' +
      '</div><div class="pps-header-topbar-right">' +
      '<a href="' + b + 'contact-us.html">Contact Us</a>' +
      '<a href="' + b + 'privacy-policy.html">Privacy</a>' +
      '<a href="' + b + 'medical-appointment.html">Book Online</a></div></div>' +
      '<div class="pps-header-main">' +
      '<a href="' + b + 'index.html" class="pps-header-logo"><img alt="Precision Pain & Spine Institute" src="' + logoSrc + '"/></a>' +
      '<nav class="pps-header-nav">' +
      '<div class="pps-header-nav-item"><a href="' + b + 'practice-areas.html" class="pps-header-nav-link">Services <svg viewBox="0 0 10 6" style="width:10px;height:10px"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></a>' +
      '<div class="pps-header-dropdown">' +
      '<a href="' + b + 'pain-management.html" class="pps-header-dd-item"><div class="pps-header-dd-icon">\uD83E\uDDC0</div><div><div class="pps-header-dd-title">Pain Management</div><div class="pps-header-dd-desc">Chronic pain, nerve blocks & more</div></div></a>' +
      '<a href="' + b + 'spine-surgery.html" class="pps-header-dd-item"><div class="pps-header-dd-icon">\uD83E\uDDB4</div><div><div class="pps-header-dd-title">Spine Surgery</div><div class="pps-header-dd-desc">Surgical consultations</div></div></a>' +
      '<a href="' + b + 'practice-areas.html" class="pps-header-dd-item"><div class="pps-header-dd-icon">\uD83E\uDDEA</div><div><div class="pps-header-dd-title">All Services</div><div class="pps-header-dd-desc">View complete list</div></div></a></div></div>' +
      '<div class="pps-header-nav-item"><a href="' + b + 'doctors.html" class="pps-header-nav-link">Doctors <svg viewBox="0 0 10 6" style="width:10px;height:10px"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></a>' +
      '<div class="pps-header-dropdown">' +
      '<a href="' + b + 'doctors.html" class="pps-header-dd-item"><div class="pps-header-dd-icon">\uD83D\uDC68\u200D\u2695\uFE0F</div><div><div class="pps-header-dd-title">Our Physicians</div><div class="pps-header-dd-desc">Board-certified specialists</div></div></a>' +
      '<a href="' + b + 'dr-wael-elkholy-m-d.html" class="pps-header-dd-item"><div class="pps-header-dd-icon">\uD83C\uDFC5</div><div><div class="pps-header-dd-title">Chief of Pain Management</div><div class="pps-header-dd-desc">Dr. Wael Elkholy</div></div></a></div></div>' +
      '<a href="' + b + 'locations.html" class="pps-header-nav-link">Locations</a>' +
      '<a href="' + b + 'about-us.html" class="pps-header-nav-link">About</a>' +
      '<a href="' + b + 'contact-us.html" class="pps-header-nav-link">Contact</a></nav>' +
      '<button class="pps-header-toggle" aria-label="Open menu" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>' +
      '<div class="pps-header-right"><div class="pps-header-phone"><div class="pps-header-phone-label">24/7 Appointments</div>' +
      '<a href="tel:+17324448888" class="pps-header-phone-num">(732) 444-8888</a></div>' +
      '<a href="' + b + 'medical-appointment.html" class="pps-header-cta">Book Now</a></div></div></div>' +
      '<div class="pps-mobile-menu" id="pps-mobile-menu" aria-hidden="true"><div class="pps-mobile-menu-inner">' +
      '<a href="' + b + 'index.html">Home</a><a href="' + b + 'practice-areas.html">Services</a>' +
      '<a href="' + b + 'doctors.html">Doctors</a><a href="' + b + 'locations.html">Locations</a>' +
      '<a href="' + b + 'about-us.html">About Us</a><a href="' + b + 'contact-us.html">Contact Us</a>' +
      '<a href="' + b + 'medical-appointment.html" class="pps-mobile-cta">Make Appointment</a></div></div>';
    header.className = "fixed top-0 left-0 w-full z-50 pps-apexcare-header";
    header.style.background = "#fff";
    document.body.classList.add("pps-has-apexcare");
    header.style.boxShadow = "0 1px 0 #e8f0ee, 0 4px 30px rgba(0,0,0,0.04)";
    var mobilePanel = header.querySelector("#pps-mobile-menu");
    var toggle = header.querySelector(".pps-header-toggle");
    if (toggle && mobilePanel) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = mobilePanel.classList.toggle("open");
        toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        document.body.style.overflow = isOpen ? "hidden" : "";
      });
      mobilePanel.querySelectorAll("a").forEach(function (lnk) {
        lnk.addEventListener("click", function () {
          mobilePanel.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }
  }

  function withBase(path) {
    if (path.charAt(0) === "/" || path.indexOf("http://") === 0 || path.indexOf("https://") === 0) {
      return path;
    }
    var depth = window.location.pathname.split("/").filter(Boolean).length - 1;
    if (depth <= 0) return path;
    return "../".repeat(depth) + path;
  }

  function applyLogoFallback() {
    if (!window.SITE_DATA || !window.SITE_DATA.header) return;
    var header = window.SITE_DATA.header;
    var configured = header.logoSrc || "assets/ppsi-logo.png";
    var fallback = "assets/ppsi-logo.png";
    var logoImage = document.querySelector("header a img");
    if (!logoImage) return;

    logoImage.alt = header.logoAlt || "Precision Pain and Spine Institute";
    logoImage.src = withBase(configured);
    logoImage.onerror = function () {
      if (logoImage.src.indexOf(fallback) === -1) {
        logoImage.src = withBase(fallback);
      }
    };
  }

  function removeLegacyBranding() {
    try {
      var legacyAnchors = document.querySelectorAll('a[href*="famaash.com"]');
      legacyAnchors.forEach(function (anchor) {
        anchor.remove();
      });
      var legacyLogos = document.querySelectorAll('img[src*="famaash-logo"]');
      legacyLogos.forEach(function (img) {
        img.remove();
      });
    } catch (e) {}
  }

  function improveMobileMenuLabel() {
    var callLink = document.querySelector('header a[aria-label="Call us"]');
    if (callLink) {
      callLink.setAttribute("title", "Call Precision Pain & Spine");
    }
  }

  function upgradeFooter() {
    try {
      var footer = document.querySelector("footer");
      if (!footer) return;
      footer.classList.add("premium-footer");

      var creditsText = "Precision Pain & Spine Institute \u00a9 All Rights Reserved. ";
      var newCreditsHtml = creditsText + '<span class="premium-healthdesk">Website & IT Services provided by HealthDesk IT.</span>';
      var existingCredits = footer.querySelector(".premium-credit");
      var container = footer.querySelector(".container") || footer;

      if (existingCredits) {
        existingCredits.innerHTML = newCreditsHtml;
      } else {
        var rightsNode = null;
        var allTextNodes = footer.querySelectorAll("p, small, span");
        allTextNodes.forEach(function (node) {
          var text = (node.textContent || "").toLowerCase();
          if (!rightsNode && text.indexOf("all rights reserved") !== -1) {
            rightsNode = node;
          }
        });

        if (rightsNode) {
          rightsNode.classList.add("premium-credit");
          rightsNode.innerHTML = newCreditsHtml;
        } else {
          var credit = document.createElement("p");
          credit.className = "premium-credit";
          credit.innerHTML = newCreditsHtml;
          container.appendChild(credit);
        }
      }

      if (!footer.querySelector(".premium-services")) {
        var services = document.createElement("div");
        services.className = "premium-services";
        services.innerHTML =
          "<span>HealthDesk IT: Website Redesign</span>" +
          "<span>SEO Optimization</span>" +
          "<span>Local SEO Structure</span>" +
          "<span>Speed & UX Improvements</span>";
        container.appendChild(services);
      }
    } catch (e) {}
  }

  function fixStrapiImages() {
    var base = "https://safe-flower-0fbf217001.media.strapiapp.com/";
    document.querySelectorAll("img[src]").forEach(function (img) {
      var s = img.getAttribute("src") || "";
      if (s.indexOf("safe-flower") !== -1 && s.indexOf("http") !== 0) {
        var file = s.split("/").pop();
        img.src = base + file;
      }
    });
    document.querySelectorAll("img[srcset]").forEach(function (img) {
      var s = img.getAttribute("srcset") || "";
      if (s.indexOf("safe-flower") !== -1 && s.indexOf("http") !== 0) {
        img.setAttribute("srcset", s.replace(/[^ ]*safe-flower[^ ]*/g, function (m) {
          return base + m.split("/").pop();
        }));
      }
    });
  }

  function hideBreadcrumbOnIndex() {
    var path = (window.location.pathname || "").toLowerCase();
    var isIndex = !path || path === "/" || path.endsWith("/index.html") || path === "/index.html" || path.endsWith("/");
    document.body.classList.add(isIndex ? "on-index" : "on-inner");
    if (isIndex) {
      var b = document.querySelector('nav[aria-label="Breadcrumb"]');
      if (b) b.style.display = "none";
    }
  }

  function run() {
    replaceWithApexcareHeader();
    applyLogoFallback();
    removeLegacyBranding();
    improveMobileMenuLabel();
    upgradeFooter();
    fixStrapiImages();
    hideBreadcrumbOnIndex();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();

