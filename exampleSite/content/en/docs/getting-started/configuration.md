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
| `countRecent` | `5` | number of recent posts |

## Side pane

The side pane can be toggled globally with `sidePane`, per page with front matter, and its sticky behavior is configured per layout (`side.home`, `side.single`, …).

## Single pages

| Option | Default | Description |
| --- | --- | --- |
| `showDetails` | `true` | date/reading meta block |
| `showTableOfContents` | `true` | table of contents |
| `showRelated` | `true` | related posts |
| `copyPage` | `true` | copy page as Markdown button |

## Multilingual

Set `enablei18n: true` and declare both languages to enable the built-in English/Chinese mode with a navbar switcher.
