// Pagefind engine for the shared search panel (panel.js). Pagefind's bundle
// is generated after the Hugo build (`npx pagefind --site public`) and is
// imported lazily when the panel first opens; a missing bundle (e.g. during
// `hugo server`) surfaces the panel's data-missing message instead of an
// error. Pagefind indexes per <html lang> and filters to the current
// language automatically; excerpts arrive pre-highlighted with <mark> and
// entity-encoded, so they are safe as innerHTML.
import { initPanel, escapeHtml } from "./panel.js";
import { initSearchHighlight } from "./highlight.js";

(function () {
  "use strict";

  const panel = document.getElementById("search-panel");
  if (!panel) return;

  const searchLimit = parseInt(panel.dataset.searchLimit, 10) || 20;

  let pagefind = null;
  let failed = false;
  let loading = null;

  function load() {
    if (loading) return;
    // Computed URL: a literal would make esbuild try to bundle the import.
    loading = import(
      (panel.dataset.pagefindBasePath || "/pagefind/") + "pagefind.js"
    )
      .then(function (module) {
        pagefind = module;
        // A query typed while loading sat unanswered; search it now.
        ui.refresh();
      })
      .catch(function () {
        failed = true;
        loading = null; // allow a retry on the next open
      });
  }

  const ui = initPanel({
    ready: function () {
      return pagefind !== null;
    },
    onOpen: load,
    search: function (q) {
      if (failed) return null;
      if (!pagefind) return undefined;
      return pagefind
        .search(q)
        .then(function (response) {
          return Promise.all(
            response.results.slice(0, searchLimit).map(function (result) {
              return result.data();
            }),
          );
        })
        .then(function (pages) {
          return pages.map(function (page) {
            return {
              url: page.url,
              titleHtml: escapeHtml(
                page.meta && page.meta.title ? page.meta.title : "",
              ),
              summaryHtml: page.excerpt || "",
            };
          });
        })
        .catch(function () {
          return null; // transient failures read as "index missing"
        });
    },
  });

  initSearchHighlight(document.getElementById("main-content"));
})();
