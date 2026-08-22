// Code block copy buttons — injected into each .highlight wrapper.
// Also powers the "copy page" button in the page header (data-copy-page).
// The language label lives in CSS (pre.chroma::before + data-lang).
(function () {
  "use strict";

  const LABELS = {
    en: { copy: "Copy", copied: "Copied!" },
    "zh-CN": { copy: "复制", copied: "已复制" },
  };

  function labels() {
    const lang = document.documentElement.lang || "en";
    return LABELS[lang] || LABELS.en;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for non-secure contexts (e.g. plain http).
    return new Promise(function (resolve, reject) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const words = labels();

    // "Copy page" button in the page header — copies the article as Markdown.
    // The raw markdown + title are embedded as JSON next to the button, so the
    // copy is byte-faithful to the source file instead of reverse-engineering
    // the rendered HTML.
    const copyPage = document.querySelector("[data-copy-page]");
    if (copyPage) {
      const payloadEl = document.querySelector("[data-copy-page-content]");
      copyPage.addEventListener("click", function () {
        if (!payloadEl) return;
        let payload;
        try {
          // Hugo's script-context escaping can double-encode the JSON; unwrap
          // until we get an object.
          payload = JSON.parse(payloadEl.textContent);
          if (typeof payload === "string") {
            payload = JSON.parse(payload);
          }
        } catch (e) {
          return;
        }
        const md = "# " + payload.title + "\n\n" + payload.markdown;
        copyText(md).then(function () {
          copyPage.classList.add("is-copied");
          setTimeout(function () {
            copyPage.classList.remove("is-copied");
          }, 1500);
        });
      });
    }

    document.querySelectorAll(".highlight").forEach(function (wrap) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy";
      btn.textContent = words.copy;
      btn.setAttribute("aria-label", words.copy);
      wrap.appendChild(btn);

      btn.addEventListener("click", function () {
        const code = wrap.querySelector("pre > code");
        if (!code) return;
        // textContent, not innerText: chroma renders each line as a flex
        // block (.chroma .line), so innerText would add a second newline per
        // line and produce blank lines in the copied text.
        copyText(code.textContent).then(
          function () {
            btn.textContent = words.copied;
            btn.classList.add("is-copied");
            setTimeout(function () {
              btn.textContent = words.copy;
              btn.classList.remove("is-copied");
            }, 1500);
          },
          function () {
            btn.textContent = words.copy;
          },
        );
      });
    });
  });
})();
