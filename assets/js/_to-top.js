// Back-to-top — the control at the bottom of the side pane (markup in
// components/to-top.html, styles in components/to-top.css).
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".to-top");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  });
})();
