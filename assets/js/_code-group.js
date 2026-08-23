// Code groups — consecutive fenced blocks sharing {group="id"} collapse
// into one tabbed component; labels from tab=, falling back to the language.
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const groups = new Map();

    document.querySelectorAll(".highlight[data-group]").forEach(function (wrap) {
      const pre = wrap.querySelector("pre");
      const id = wrap.dataset.group;
      if (!pre || !groups.has(id)) groups.set(id, []);
      groups.get(id).push({ wrap, pre });
    });

    groups.forEach(function (blocks) {
      // Only adjacent siblings collapse; split runs form separate groups.
      let run = [];
      const runs = [];
      blocks.forEach(function (block, i) {
        const prev = i > 0 ? blocks[i - 1].wrap : null;
        if (prev && prev.nextElementSibling === block.wrap) {
          run.push(block);
        } else {
          if (run.length) runs.push(run);
          run = [block];
        }
      });
      if (run.length) runs.push(run);

      runs.forEach(function (run) {
        if (run.length < 2) return;
        buildGroup(run);
      });
    });

    function buildGroup(blocks) {
      const first = blocks[0].wrap;
      const box = document.createElement("div");
      box.className = "code-group";

      const bar = document.createElement("div");
      bar.className = "code-group-bar";
      bar.setAttribute("role", "tablist");

      const panes = [];
      blocks.forEach(function (block, i) {
        const label =
          block.wrap.dataset.tab || block.pre.dataset.lang || "text";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "code-group-tab";
        btn.textContent = label;
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", String(i === 0));
        btn.addEventListener("click", function () {
          select(i);
        });
        bar.appendChild(btn);

        block.wrap.classList.add("code-group-pane");
        panes.push(block.wrap);
      });

      first.parentNode.insertBefore(box, first);
      box.appendChild(bar);
      panes.forEach(function (pane) {
        box.appendChild(pane);
      });

      function select(active) {
        bar.querySelectorAll(".code-group-tab").forEach(function (tab, i) {
          tab.classList.toggle("is-active", i === active);
          tab.setAttribute("aria-selected", String(i === active));
        });
        panes.forEach(function (pane, i) {
          pane.classList.toggle("is-active", i === active);
        });
      }
      select(0);
    }
  });
})();
