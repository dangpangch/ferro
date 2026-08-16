(function () {
  "use strict";

  window.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("nav-dropdown-menu");
    const menuBtn = document.getElementById("nav-dropdown-button");

    if (!menu || !menuBtn) return;

    const isOpen = () => !menu.classList.contains("hidden");

    const setOpen = (open) => {
      menu.classList.toggle("hidden", !open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };

    const closeOnOutside = (e) => {
      if (isOpen() && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        setOpen(false);
      }
    };

    const closeOnEscape = (e) => {
      if (e.key === "Escape" && isOpen()) {
        setOpen(false);
        menuBtn.focus();
      }
    };

    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!isOpen());
    });

    document.addEventListener("click", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener(
      "scroll",
      () => {
        if (isOpen()) {
          setOpen(false);
        }
      },
      { passive: true },
    );
  });
})();
