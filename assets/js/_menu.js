(function () {
  "use strict";

  window.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("nav-dropdown-menu");
    const menuBtn = document.getElementById("nav-dropdown-button");

    if (!menu || !menuBtn) return;

    const closeOnOutside = (e) => {
      if (
        !menu.classList.contains("hidden") &&
        !menu.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        menu.classList.add("hidden");
      }
    };

    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.toggle("hidden");
    });

    document.addEventListener("click", closeOnOutside);
    window.addEventListener(
      "scroll",
      () => {
        if (!menu.classList.contains("hidden")) {
          menu.classList.add("hidden");
        }
      },
      { passive: true },
    );
  });
})();
