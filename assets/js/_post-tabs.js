// Home page post tabs — switch between featured/recent panels.
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    document
      .querySelectorAll('[data-component="post-tabs"]')
      .forEach(initTabs);
  });

  function initTabs(root) {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    if (tabs.length < 2) return;

    function select(tab) {
      tabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
        t.setAttribute("tabindex", active ? "0" : "-1");
        document
          .getElementById(t.getAttribute("aria-controls"))
          .toggleAttribute("hidden", !active);
      });
      tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.classList.toggle("is-active", i === 0);
      tab.addEventListener("click", function () {
        select(tab);
      });
      tab.addEventListener("keydown", function (e) {
        let next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft")
          next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) {
          e.preventDefault();
          select(next);
        }
      });
    });
  }
})();
