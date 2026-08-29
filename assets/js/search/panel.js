// Shared search panel controller for the command palette mounted by
// layouts/_partials/search_panel.html. Owns open/close, focus trapping,
// keyboard navigation and result rendering; search engines plug in through
// initPanel and stay independent of the panel DOM:
//   ready()   — boolean, index available for immediate search
//   onOpen()  — optional, fired every time the panel opens
//   search(q) — undefined = not ready (leave the UI as is), null = index
//               missing (show #search-panel[data-missing]), array = rows
// Rows are { url, titleHtml, summaryHtml, dateText? } with the *Html fields
// pre-escaped (or pre-highlighted) by the engine.

export function escapeHtml(s) {
  return s.replace(/[&<>"']/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c];
  });
}

// Finds every occurrence of the query terms in already-lowercased text and
// returns the ordered, overlapping-merged [start, end] ranges. Single source
// of truth for both consumers: the panel preview (flexsearch.js) and the
// landing highlight (highlight.js).
export function termRanges(lower, terms) {
  const ranges = [];
  terms.forEach(function (term) {
    let idx = 0;
    while ((idx = lower.indexOf(term, idx)) !== -1) {
      ranges.push([idx, idx + term.length]);
      idx += term.length;
    }
  });
  ranges.sort(function (a, b) {
    return a[0] - b[0];
  });
  const merged = [];
  ranges.forEach(function (r) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) {
      last[1] = Math.max(last[1], r[1]);
    } else {
      merged.push(r);
    }
  });
  return merged;
}

const noop = { refresh: function () {} };

export function initPanel(engine) {
  const panel = document.getElementById("search-panel");
  if (!panel) return noop;

  const triggers = document.querySelectorAll(".search-bar-button");
  const input = panel.querySelector(".search-text");
  const closeButtons = panel.querySelectorAll("[data-search-close]");
  const resultsEl = panel.querySelector(".search-results");
  const emptyEl = panel.querySelector(".search-empty");
  const loadingEl = panel.querySelector(".search-loading");
  const countEl = panel.querySelector(".search-count");

  let activeIndex = -1;
  let debounceTimer = null;
  let lastTrigger = null;
  // Async engines (pagefind) may complete out of order while the user keeps
  // typing; each search tags its render so only the newest one draws.
  let searchSeq = 0;

  /* ── Rendering ─────────────────────────────────────── */

  function show(els) {
    els.forEach(function (el) {
      el.hidden = false;
    });
  }

  function hide(els) {
    els.forEach(function (el) {
      el.hidden = true;
    });
  }

  function resetActive() {
    activeIndex = -1;
    input.setAttribute("aria-activedescendant", "");
  }

  function resetResults() {
    resetActive();
    countEl.textContent = "";
    emptyEl.textContent = emptyEl.dataset.empty;
    hide([resultsEl, loadingEl]);
    show([emptyEl]);
  }

  function renderEmpty(query) {
    resetActive();
    countEl.textContent = "";
    emptyEl.textContent = "";
    emptyEl.appendChild(
      document.createTextNode(emptyEl.dataset.noResults.replace("%s", query)),
    );
    const hint = emptyEl.dataset.hint;
    if (hint) {
      const hintEl = document.createElement("span");
      hintEl.className = "search-empty-hint";
      hintEl.textContent = hint;
      emptyEl.appendChild(hintEl);
    }
    hide([resultsEl, loadingEl]);
    show([emptyEl]);
  }

  function renderMissing() {
    resetActive();
    countEl.textContent = "";
    emptyEl.textContent = panel.dataset.missing || emptyEl.dataset.empty;
    hide([resultsEl, loadingEl]);
    show([emptyEl]);
  }

  // Result links carry the active query in ?s= so the landing page can
  // highlight the matches (see ./highlight.js).
  function decorateUrl(url, query) {
    if (!query) return url;
    return (
      url + (url.includes("?") ? "&" : "?") + "s=" + encodeURIComponent(query)
    );
  }

  function renderResults(items, query) {
    resetActive();
    resultsEl.textContent = "";
    hide([emptyEl, loadingEl]);

    const fragment = document.createDocumentFragment();
    items.forEach(function (item, i) {
      const li = document.createElement("li");
      li.className = "search-result";
      li.id = "search-result-" + i;
      li.setAttribute("role", "option");

      const a = document.createElement("a");
      a.href = decorateUrl(item.url, query);

      const head = document.createElement("span");
      head.className = "search-result-head";

      const title = document.createElement("span");
      title.className = "search-result-title";
      title.innerHTML = item.titleHtml;

      head.append(title);
      if (item.dateText) {
        const date = document.createElement("time");
        date.className = "search-result-date";
        date.textContent = item.dateText;
        head.append(date);
      }

      const summary = document.createElement("p");
      summary.className = "search-result-summary";
      summary.innerHTML = item.summaryHtml;

      a.append(head, summary);
      li.appendChild(a);
      fragment.appendChild(li);
    });
    resultsEl.appendChild(fragment);

    const n = items.length;
    countEl.textContent =
      n +
      " " +
      (n === 1 ? countEl.dataset.countOne : countEl.dataset.countMany);
    show([resultsEl]);
  }

  function doSearch() {
    const q = input.value.trim();
    const seq = ++searchSeq;
    if (!q) {
      resetResults();
      return;
    }
    Promise.resolve(engine.search(q)).then(function (items) {
      if (seq !== searchSeq) return; // superseded by a newer query
      if (items === undefined) return;
      if (items === null) {
        renderMissing();
      } else if (items.length) {
        renderResults(items, q);
      } else {
        renderEmpty(q);
      }
    });
  }

  function refresh() {
    if (panel.hidden) return;
    if (input.value.trim()) {
      doSearch();
    } else {
      resetResults();
    }
  }

  /* ── Keyboard navigation over results ──────────────── */

  function resultLinks() {
    return Array.from(resultsEl.querySelectorAll("a"));
  }

  function setActive(idx) {
    const links = resultLinks();
    if (!links.length) return;
    const max = links.length - 1;
    activeIndex = Math.max(0, Math.min(idx, max));
    const link = links[activeIndex];
    input.setAttribute("aria-activedescendant", link.closest("li").id);
    links.forEach(function (l) {
      l.closest("li").classList.toggle("is-active", l === link);
    });
  }

  function moveActive(step) {
    const links = resultLinks();
    if (!links.length) return;
    const max = links.length - 1;
    let next;
    if (activeIndex < 0) {
      next = step > 0 ? 0 : max;
    } else {
      next = activeIndex + step;
      if (next > max) next = 0;
      if (next < 0) next = max;
    }
    setActive(next);
    resultLinks()[activeIndex].scrollIntoView({ block: "nearest" });
  }

  function openActive() {
    const links = resultLinks();
    if (!links.length) return;
    const link = activeIndex >= 0 ? links[activeIndex] : links[0];
    close();
    link.click();
  }

  function onInputKeydown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveActive(-1);
        break;
      case "Enter":
        e.preventDefault();
        openActive();
        break;
      case "Tab": {
        // Trap focus inside the panel.
        const focusable = Array.from(
          panel.querySelectorAll("a[href], button"),
        ).filter(function (el) {
          return !el.hidden;
        });
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        break;
      }
    }
  }

  // Escape closes the panel from anywhere inside it (capture phase).
  function onGlobalKeydown(e) {
    if (e.key !== "Escape") return;
    e.preventDefault();
    e.stopPropagation();
    close();
  }

  /* ── Open / close ──────────────────────────────────── */

  function open() {
    lastTrigger = document.activeElement;
    input.value = "";
    activeIndex = -1;
    panel.classList.remove("is-closing");
    panel.hidden = false;
    document.body.classList.add("search-open");
    document.addEventListener("keydown", onGlobalKeydown, true);
    triggers.forEach(function (t) {
      t.setAttribute("aria-expanded", "true");
    });
    if (engine.ready()) {
      loadingEl.hidden = true;
      resetResults();
    } else {
      hide([resultsEl, emptyEl]);
      loadingEl.hidden = false;
    }
    if (engine.onOpen) engine.onOpen();
    input.focus();
  }

  function close() {
    if (panel.hidden) return;
    panel.classList.add("is-closing");
    setTimeout(function () {
      panel.hidden = true;
      panel.classList.remove("is-closing");
      document.body.classList.remove("search-open");
      document.removeEventListener("keydown", onGlobalKeydown, true);
      triggers.forEach(function (t) {
        t.setAttribute("aria-expanded", "false");
      });
      if (lastTrigger) lastTrigger.focus();
    }, 120);
  }

  /* ── Bindings ──────────────────────────────────────── */

  triggers.forEach(function (t) {
    t.addEventListener("click", function () {
      open();
    });
  });

  closeButtons.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      close();
    });
  });

  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(doSearch, 120);
  });

  input.addEventListener("keydown", onInputKeydown);

  // Hovering a result mirrors the active item.
  resultsEl.addEventListener("mouseover", function (e) {
    const li = e.target.closest(".search-result");
    if (!li) return;
    setActive(Array.from(resultsEl.children).indexOf(li));
  });

  return { refresh: refresh };
}
