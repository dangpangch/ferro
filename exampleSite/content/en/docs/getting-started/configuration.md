---
title: "Configuration"
linkTitle: "Configuration"
description: "Theme options under params.ferro."
date: 2023-01-01T08:00:00-07:00
weight: 2
---

All theme options live under `params.ferro` in your site configuration.

## Home page

| Option | Default | Description |
| --- | --- | --- |
| `showBio` | `true` | author bio block on the home page |
| `showASCIIArt` | `true` | ASCII art header |
| `showFeatured` | `true` | featured posts section |
| `showRecent` | `true` | recent posts list |
| `countPosts` | `5` | number of posts per group |
| `tabs` | unset | custom home tab list (`recent` / `featured` / `posts`, or `{taxonomy, term}` filters) — see the [configuration reference]({{< ref "/docs/reference/configuration" >}}) |

## Side pane

The side pane can be toggled globally with `sidePane`, per page with front matter, and its sticky behavior is configured per layout (`side.home`, `side.single`, …).

## Background

| Option | Default | Description |
| --- | --- | --- |
| `grain` | `false` | paper-grain texture overlay on the page background (opt-in) |

## Single pages

| Option | Default | Description |
| --- | --- | --- |
| `showDetails` | `false` | date/reading meta block |
| `showTableOfContents` | `false` | table of contents |
| `showRelated` | `false` | related posts |

The "Copy page" button is enabled by adding `CopyPage` to `outputs.page` in your site config — see the [configuration reference]({{< ref "/docs/reference/configuration" >}}).

## Multilingual

Set `enablei18n: true` and declare both languages to enable the built-in English/Chinese mode with a navbar switcher.
