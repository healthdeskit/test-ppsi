(function () {
  function base() {
    var path = (window.location.pathname || "").replace(/^\//, "").split("/").filter(Boolean);
    if (path.length <= 1) return "";
    return "../".repeat(path.length - 1);
  }

  function createMobileMenu() {
    var toggle = document.querySelector('button[aria-label="Toggle menu"]');
    if (!toggle || document.querySelector(".ppsi-mobile-menu")) return;

    var b = base();
    var panel = document.createElement("div");
    panel.className = "ppsi-mobile-menu";
    panel.innerHTML =
      '<div class="ppsi-mobile-menu-inner">' +
      '<a href="' + b + 'index.html">Home</a>' +
      '<a href="' + b + 'about-us.html">About Us</a>' +
      '<a href="' + b + 'practice-areas.html">Services</a>' +
      '<a href="' + b + 'doctors.html">Doctors</a>' +
      '<a href="' + b + 'locations.html">Locations</a>' +
      '<a href="' + b + 'medical-appointment.html" class="is-cta">Make Appointment</a>' +
      '<a href="' + b + 'contact-us.html">Contact Us</a>' +
      "</div>";
    document.body.appendChild(panel);

    toggle.addEventListener("click", function () {
      panel.classList.toggle("open");
      document.body.classList.toggle("ppsi-menu-open");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createMobileMenu);
  } else {
    createMobileMenu();
  }
})();

