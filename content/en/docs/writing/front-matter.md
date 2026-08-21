---
title: Front Matter
description: The metadata fields ferro reads from your pages.
date: 2026-08-03
weight: 1
---

Every page accepts standard Hugo front matter. A few fields unlock extra
theme behaviour.

## Common fields

```yaml
---
title: My post
date: 2026-08-03
description: One-line summary used in listings and SEO tags.
tags:
  - hugo
series: Theme internals
---
```

## Featured posts

Add `featured: true` to promote a post to the featured block on the home
page. The home section then hides the recent list when featured posts exist
(`hideRecentWhenFeatured`).

## Drafts and future dates

Drafts render only with `--buildDrafts`, which the dev script already passes.
Future-dated pages stay hidden until their publish date.

## Summaries

When a page has no `summary`, ferro truncates the first paragraph to
`params.summaryLength` characters for list previews.
