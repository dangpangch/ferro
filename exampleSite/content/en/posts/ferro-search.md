---
title: "Ferro Search"
img: /images/cover-search.svg
featured: true
date: "2026-08-30T00:00:00+08:00"
series: ["content", "features"]
---

Search is the most-travelled surface of any documentation-heavy site, so ferro treats it as a first-class feature: one command palette, two pluggable engines, per-language results and highlighted landings. This post explains the design, when to pick which engine, and how to configure everything.

## Design: one panel, pluggable engines

The panel owns presentation and nothing else — overlay, focus trap, keyboard navigation, debounce and race-guarded rendering live in a single shared module. Engines are adapters behind a three-method contract (`ready`, `onOpen`, `search`), selected by the `ferro.search` param:

```text
ferro.search: "flexsearch" (default) | "pagefind" | "off"
```

The contract is deliberately small. FlexSearch ships as an adapter around its vendored core; Pagefind around its lazy-loaded bundle; a third engine would be roughly a hundred lines without touching the panel again.

Two invariants shaped the design:

- **Language-first results.** On a bilingual site a query must never leak across languages. The built-in engine generates one index per language (`/searchindex.json`, `/zh/searchindex.json`) and the panel fetches the current language's file; Pagefind segments by `<html lang>` and filters on its own.
- **Match → highlight continuity.** Result links carry the query in `?s=`; a shared highlighter wraps the matches on the target page and fades them out on click. The panel preview and the landing highlight are therefore two views of the same match, and highlighted URLs can be shared.

CJK gets explicit treatment in both engines: FlexSearch indexes Han/Kana text per character (so mid-phrase queries like 注册表 match), while Pagefind ships word segmentation.

## flexsearch or pagefind?

| | flexsearch | pagefind |
|---|---|---|
| Index source | build-time JSON (`searchindex.json`) | the built HTML, crawled post-build |
| Setup | outputs config only | one CLI step after the build |
| First search | downloads the language's full index | loads the engine, then fragments per result |
| Sweet spot | blogs and small docs sites | large sites, low bandwidth, multilingual segmentation |
| CJK | per-character matching | built-in word segmentation |
| `hugo server` | works out of the box | needs a built directory; panel shows a hint |

**Start with flexsearch** — it has zero moving parts and one config block. Reach for pagefind when the site outgrows a single JSON index (thousands of pages), when you want Pagefind's ranking and lazy fragment loading, or when a post-build step already exists in CI. Both engines keep the same panel, the same highlighting and the same per-language behavior, so switching is a one-line config change.

## Configuration

```toml
[params.ferro]
  search = 'flexsearch' # or 'pagefind', or 'off' to hide search entirely
```

- **flexsearch** needs the `SearchIndex` output on the home page (see the [Search doc]({{< ref "/docs/features/search" >}})).
- **pagefind** needs one line after the build: `npx pagefind --site public`. This demo site runs pagefind — that step lives in the deploy workflow.
- **off** hides every search entry point and loads no search JavaScript.
- `searchLimit` (default `20`) caps the rendered results.

The full reference, including the CI snippet and the highlighting behavior, lives in the [Search doc]({{< ref "/docs/features/search" >}}).

## Try it

This site runs pagefind: press the magnifier and type — on the English site try `grain` or `config`, on the Chinese site 配置 or 注册表. Click a result and the matches are highlighted on the page; click any highlight to fade them all out.
