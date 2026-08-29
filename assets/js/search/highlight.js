// Landing-page highlight for search navigation: result links carry the query
// in ?s= (see panel.js); this module wraps the matches on the target page in
// <mark class="search-hit">, scrolls to the first one, and lets a click on
// any highlight remove it. Shared by every search engine adapter, and runs on
// any page loaded with a ?s= parameter, so highlighted URLs can be shared.
import { termRanges } from "./panel.js";

export function initSearchHighlight(root) {
  if (!root) return;
  const raw = new URLSearchParams(location.search).get("s");
  const terms = raw ? raw.toLowerCase().split(/\s+/).filter(Boolean) : [];
  if (!terms.length) return;

  // Text-node matching only: a term spanning element boundaries (e.g. across
  // a <code> tag) is not highlighted — same tradeoff as the panel preview.
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.parentElement.closest("mark, script, style, template, noscript")) {
      nodes.push(node);
    }
  }
  let first = null;
  nodes.forEach(function (node) {
    const mark = wrapNode(node, terms);
    if (mark && !first) first = mark;
  });
  if (!first) return;
  first.scrollIntoView({ block: "center" });

  // Clicking any highlight fades all of them out, then unwraps the marks.
  // A mark inside a link clears instead of navigating. The timeout must
  // cover the 150ms background transition in components/search.css.
  root.addEventListener("click", function (e) {
    if (!e.target.closest("mark.search-hit")) return;
    const link = e.target.closest("a");
    if (link) e.preventDefault();
    root
      .querySelectorAll("mark.search-hit")
      .forEach(function (hit) {
        hit.classList.add("is-fading");
      });
    setTimeout(function () {
      const fading = root.querySelectorAll("mark.search-hit");
      fading.forEach(function (hit) {
        hit.replaceWith(...hit.childNodes);
      });
      root.normalize();
    }, 160);
  });
}

// Splits one text node around the merged term ranges and wraps them in
// marks. Returns the first mark created, or null when the node holds no
// match.
function wrapNode(node, terms) {
  const text = node.nodeValue;
  const ranges = termRanges(text.toLowerCase(), terms);
  if (!ranges.length) return null;
  const fragment = document.createDocumentFragment();
  let cursor = 0;
  let first = null;
  ranges.forEach(function (m) {
    if (m[0] > cursor) fragment.append(text.slice(cursor, m[0]));
    const mark = document.createElement("mark");
    mark.className = "search-hit";
    mark.append(text.slice(m[0], m[1]));
    fragment.append(mark);
    if (!first) first = mark;
    cursor = m[1];
  });
  if (cursor < text.length) fragment.append(text.slice(cursor));
  node.replaceWith(fragment);
  return first;
}
