(function() {
  const siteHeader = document.getElementById("siteHeader");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  function handleScrollUI() {
    if (siteHeader) {
      if (window.scrollY > 12) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }
    if (scrollTopBtn) {
      if (window.scrollY > 700) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  }

  window.addEventListener("scroll", handleScrollUI, { passive: true });
  handleScrollUI();

  if (scrollTopBtn) scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const desktopDropdownItems = document.querySelectorAll(".desktop-nav .has-dropdown");
  function closeAllDesktopDropdowns() {
    desktopDropdownItems.forEach((item) => {
      item.classList.remove("open");
      const btn = item.querySelector(".nav-button");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  desktopDropdownItems.forEach((item) => {
    const btn = item.querySelector(".nav-button");
    if (btn) btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains("open");
      closeAllDesktopDropdowns();
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", closeAllDesktopDropdowns);

  const mobileMenuOpen = document.getElementById("mobileMenuOpen");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileMenuPanel = document.getElementById("mobileMenuPanel");

  function openMobileMenu() {
    mobileMenuPanel.classList.add("active");
    mobileMenuOverlay.classList.add("active");
    mobileMenuPanel.setAttribute("aria-hidden", "false");
    mobileMenuOpen.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenuPanel.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    mobileMenuPanel.setAttribute("aria-hidden", "true");
    mobileMenuOpen.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (mobileMenuOpen) mobileMenuOpen.addEventListener("click", openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener("click", closeMobileMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
      closeAllDesktopDropdowns();
    }
  });

  const mobileAccordions = document.querySelectorAll(".mobile-accordion");
  mobileAccordions.forEach((accordion) => {
    const toggle = accordion.querySelector(".mobile-accordion-toggle");
    if (toggle) toggle.addEventListener("click", () => {
      const isOpen = accordion.classList.contains("open");
      mobileAccordions.forEach((item) => item.classList.remove("open"));
      if (!isOpen) accordion.classList.add("open");
    });
  });

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    if (button) button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      faqItems.forEach((faq) => faq.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
})();
