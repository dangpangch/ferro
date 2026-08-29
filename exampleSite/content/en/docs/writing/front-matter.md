---
title: "Front Matter"
linkTitle: "Front Matter"
description: "Keys understood by the theme."
date: 2023-01-01T08:00:00-07:00
weight: 1
---

## Taxonomies

```yaml
tags: ["hugo", "blog"]
topics: ["documentation"]
series: ["theme guide"]
```

Taxonomy pages get their own layouts; the series taxonomy groups posts into ordered collections.

## Layout behavior

```yaml
featured: true        # pin to the Featured block on the home page
weight: 1             # ordering in lists and chapters
draft: true           # exclude from production builds

ferro:
  sidePane: false     # opt out of the side pane on this page
```

## Summaries and descriptions

```yaml
summary: "Manual text"                 # list rows and the search index
description: "One line for meta tags"  # docs cards, pager, social tags,
                                       # and the list-summary fallback
```

List summaries resolve in order: `summary`, the first content paragraph, then `description`.
