---
title: "How Hugo Merges Theme Configuration"
description: "How theme config flows into your site config: the merge chain, the three _merge strategies, and the gotchas we hit while building ferro."
date: 2026-08-29T12:00:00+08:00
tags: ["guide"]
topics: ["documentation"]
---

A Hugo theme can ship its own `hugo.yaml`, and the settings in it quietly become defaults for every site that installs the theme — until the site overrides them. This post maps that mechanism, including the gotchas we hit while wiring up ferro (all verified with probe keys and `hugo config`, not guesswork).

## The merge chain

Hugo merges configuration from themes and modules into the project config, and the project always wins. With `theme = ['theme-a', 'theme-b']`, the order is:

1. project `hugo.yaml` — highest precedence
2. theme-a
3. theme-b

## Three merge strategies

Each top-level configuration key has its own merge strategy, controlled by a `_merge` key placed inside that key. The three values:

| Strategy | Meaning |
| --- | --- |
| `none` | no merge — the theme's value never reaches the site |
| `shallow` | only add values for keys the site does not define |
| `deep` | add new keys and merge existing maps recursively; the site wins per leaf |

Two hard limits: only **maps** merge — slices are replaced whole, never concatenated; and `_merge` inherits downwards, so it can be set once at a high level.

## The default table that matters

| Configuration key | Default strategy |
| --- | --- |
| `params` | deep |
| `languages.<lang>.params` | deep |
| `menus`, `languages.<lang>.menus` | shallow |
| `markup`, `taxonomies`, `related`, `outputs`, `outputFormats`, `mediaTypes`, `build`, `security`, `module`, … | none |

In practice: theme `params` genuinely become site defaults (a consumer overriding one leaf keeps the rest); theme default menus fill in only the menu names the site has not defined; and the none group never crosses the theme boundary at all.

## Gotchas we hit building ferro

**None-keys do not propagate.** A theme cannot ship working defaults for `markup`, `taxonomies`, or `related` — the site must declare them itself. We keep mirror copies in this demo site's config: the goldmark `wrapStandAloneImageWithinParagraph` setting that the image render hook depends on, the `topics`/`series` taxonomies, and the `related` index. Copy them into your own site config where needed.

**Language blocks are picky.** A language that exists only in the theme is not injected into the site (which languages exist is the site's decision). And a language block that only carries `params` merges nothing — which is why ferro's per-language reading-speed defaults live in template code rather than in the theme's `languages` block.

**Verify with `hugo config`.** `hugo config` prints the effective merged configuration — the fastest way to answer "did my theme's value actually land?". For anything subtler, drop a throwaway probe key into the theme config, run `hugo config`, and see where (and whether) it shows up.

## Takeaways for theme authors

- Keep a complete defaults registry in the theme config — one authoritative file listing every option with its default — and mirror it in the docs, so the two cannot drift silently.
- Declare defaults in config only where config is the right home; structural fallbacks (sorting, groupings) and workarounds for merge quirks belong in templates, with a comment saying why.
- Never assume a merge: probe it.

Reference: [Hugo docs — Configuration](https://gohugo.io/configuration/introduction/)
