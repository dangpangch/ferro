// TOC scrollspy — highlight the heading currently in view with .is-active.
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const toc = document.getElementById("TableOfContents");
    if (!toc || !("IntersectionObserver" in window)) return;

    const links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    const headings = links
      .map(function (a) {
        return document.getElementById(decodeURIComponent(a.hash.slice(1)));
      })
      .filter(Boolean);
    if (!headings.length) return;

    let active = null;
    const setActive = function (id) {
      if (active === id) return;
      active = id;
      links.forEach(function (a) {
        a.classList.toggle(
          "is-active",
          decodeURIComponent(a.hash.slice(1)) === id,
        );
      });
    };

    // Track headings crossing the upper quarter of the viewport; the last
    // one above that line is the active section.
    const update = function () {
      const line = window.innerHeight * 0.25;
      let current = null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h;
        else break;
      }
      setActive(current ? current.id : headings[0].id);
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: "-25% 0px -65% 0px",
    });
    headings.forEach(function (h) {
      observer.observe(h);
    });
  });
})();
