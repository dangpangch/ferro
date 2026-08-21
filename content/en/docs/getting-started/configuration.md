---
title: Configuration
description: Menus, languages, side pane, and theme parameters.
date: 2026-08-02
weight: 2
---

All ferro settings live under the `params.ferro` key of your `hugo.yaml`.
Every option has a sensible default, so an empty config already produces a
complete site.

## Site menus

Menus are plain Hugo menus. Entries pointing at page refs render as top-level
navigation:

```yaml
languages:
  en:
    menus:
      main:
        - name: Posts
          pageRef: /posts
          weight: 1
```

## Side pane

The right-hand pane is configurable per page kind — home, lists, terms, and
single pages each accept their own flags:

```yaml
params:
  ferro:
    sidePane: true
    side:
      single:
        showTableOfContents: true
        showRelated: true
```

Set `sidePane: false` to collapse the layout to a single centered column.

## Dark mode

ferro ships light and dark palettes driven by semantic CSS tokens. The toggle
in the header stores the visitor's choice in `localStorage` and falls back to
`prefers-color-scheme`.

| Token | Light | Dark |
| ----- | ----- | ---- |
| Background | Warm paper | Warm charcoal |
| Accent | Rust red | Bright rust |
| Code surface | Gruvbox | Gruvbox |
