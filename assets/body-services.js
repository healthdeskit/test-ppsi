(function () {
  var wrapper = document.getElementById("bodyDiagramWrapper");
  var inner = document.getElementById("bodyDiagramInner");
  var tooltip = document.getElementById("bodyTooltip");
  if (!wrapper || !inner || !tooltip) return;

  var zones = {
    "zone-neck": "Neck & cervical pain",
    "zone-shoulder": "Shoulder pain",
    "zone-spine": "Spine & spinal conditions",
    "zone-back": "Upper back pain",
    "zone-lowerback": "Lower back pain",
    "zone-hip": "Hip pain",
    "zone-knee": "Knee pain",
  };

  function setTooltip(text) {
    tooltip.textContent = text;
    tooltip.classList.add("visible");
  }

  function hideTooltip() {
    tooltip.classList.remove("visible");
  }

  wrapper.addEventListener("mousemove", function (e) {
    var rect = wrapper.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    inner.style.transform = "translate(" + x * 6 + "px, " + y * 6 + "px)";
  });

  wrapper.addEventListener("mouseleave", function () {
    inner.style.transform = "translate(0, 0)";
    hideTooltip();
  });

  [].slice.call(document.querySelectorAll(".body-zone")).forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      setTooltip(zones[el.id] || el.getAttribute("data-label") || "Learn more");
    });
    el.addEventListener("mouseleave", hideTooltip);
  });
})();
