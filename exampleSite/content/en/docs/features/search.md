---
title: "Search"
date: "2026-08-30T00:00:00+08:00"
series: ["content", "features"]
---

Search lives in a command palette: press the magnifier button in the navbar (or use the search bar on the home page), type, and navigate results with the arrow keys. The engine is selected with `ferro.search`, and every engine searches **only the current language** — on a multilingual site the same query returns different results per language.

## Engines

### flexsearch (default)

Zero-config client-side search. Pages are indexed at build time into a per-language JSON file; enable it with the `SearchIndex` output:

```toml
[outputFormats]
 [outputFormats.SearchIndex]
  mediaType = "application/json"
  baseName = "searchindex"
  isPlainText = true
  notAlternative = true

[mediaTypes]
 [mediaTypes."application/json"]
  suffixes = ["json"]

[outputs]
 home = ["HTML","RSS","SearchIndex"]
```

The index is served at `/searchindex.json` (or `/<lang>/searchindex.json` on multilingual sites). Chinese and Japanese text is matched per character, so mid-phrase queries work without spaces.

### pagefind

The same panel backed by [Pagefind](https://pagefind.app). Pagefind indexes the built HTML, so run its CLI after the Hugo build:

```bash
hugo && npx pagefind --site public
```

Only single content pages (posts, docs, about) are indexed — list, taxonomy and error pages are excluded. Pagefind routes queries to the page's language automatically and ships CJK word segmentation.

In CI, add the same line after the build step:

```yaml
- name: Build
  run: hugo --gc --minify
- name: Pagefind index
  run: npx pagefind --site public
```

While developing with `hugo server` no bundle exists yet — the panel shows a hint instead of results. Run the CLI once against a built directory to test search locally.

### off

`ferro.search = 'off'` hides every search entry point and loads no search JavaScript. The `SearchIndex` output format cannot be switched off by params, so remove it from `outputs.home` in your site config if you don't want the JSON file.

## Result highlighting

Clicking a result decorates the target URL with the query (`?s=...`), so the matching text arrives highlighted on the page; clicking any highlight fades them all out. Every page loaded with a `?s=` parameter highlights its matches, so such URLs can be shared, too.

Panel result previews come from the engine: Pagefind highlights the whole matched word (searching `s` marks every word starting with `s` — word-prefix matching is the engine's match semantics), while the built-in engine highlights the literal substring you typed.

`searchLimit` (default `20`) caps how many results the panel renders.
