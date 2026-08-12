(function () {
  "use strict";

  const getCachedTheme = () => {
    const cachedTheme = localStorage.getItem("color-scheme");
    const preferDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return cachedTheme || (preferDark ? "dark" : "light");
  };

  document.documentElement.setAttribute("color-scheme", getCachedTheme());

  window.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() =>
      document.body.classList.remove("transition-none"),
    );
    const switcher = document.getElementById("theme-switcher");
    if (!switcher) return;
    switcher.addEventListener("click", (e) => {
      e.preventDefault();
      const next = getCachedTheme() === "light" ? "dark" : "light";
      document.documentElement.setAttribute("color-scheme", next);
      localStorage.setItem("color-scheme", next);
    });
  });
})();
