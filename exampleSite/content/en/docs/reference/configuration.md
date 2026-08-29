---
title: "Configuration"
date: "2025-03-24T23:00:00-03:00"
tags: ["guide"]
topics: ["documentation"]
weight: 2
---

This page outlines every configuration option the theme reads. Settings are split into four groups: the `params.ferro` namespace (the theme's own options), other `params` the theme consumes, per-page front matter options, and the standard Hugo site settings the theme relies on. Feature-specific setup (search, social links, internationalization) is covered by its own post and linked where relevant.

## Global Config

The following options make up the full `params.ferro` namespace. Values shown match the theme's demo site; unset boolean options behave as `false`.

````toml {group="global-config" tab="TOML"}
[params.ferro]
  enablei18n = true
  sidePane = true
  countPageItems = 7
  search = 'flexsearch'

[params.ferro.home]
  showBio = true
  showAuthorImg = false
  showASCIIArt = true
  showFeatured = true
  showRecent = true
  hideRecentWhenFeatured = true
  countPosts = 8
  # Custom tab list — omit for the default recent + featured pair
  [[params.ferro.home.tabs]]
    title = 'Documentation' # optional; defaults to the humanized term
    taxonomy = 'topics'
    term = 'documentation'

[params.ferro.page]
  copyPage = true
  showYearCount = false

[params.ferro.side.home]
  sidePaneSticky = false
  taxonomies = ['tags', 'series']
  countTaxonomy = 3

[params.ferro.side.term]
  sidePaneSticky = false

[params.ferro.side.single]
  sidePaneSticky = true
  showDetails = true
  showTableOfContents = true
  showAttachments = true
  showRelated = true
  countRelated = 5
````

````yaml {group="global-config" tab="YAML"}
params:
  ferro:
    enablei18n: true
    sidePane: true
    countPageItems: 7
    search: flexsearch
    home:
      showBio: true
      showAuthorImg: false
      showASCIIArt: true
      showFeatured: true
      showRecent: true
      hideRecentWhenFeatured: true
      countPosts: 8
    page:
      copyPage: true
      showYearCount: false
    side:
      home:
        sidePaneSticky: false
        taxonomies: [tags, series]
        countTaxonomy: 3
      term:
        sidePaneSticky: false
      single:
        sidePaneSticky: true
        showDetails: true
        showTableOfContents: true
        showAttachments: true
        showRelated: true
        countRelated: 5
````

````json {group="global-config" tab="JSON"}
{
  "params": {
    "ferro": {
      "enablei18n": true,
      "sidePane": true,
      "countPageItems": 7,
      "search": "flexsearch",
      "home": {
        "showBio": true,
        "showAuthorImg": false,
        "showASCIIArt": true,
        "showFeatured": true,
        "showRecent": true,
        "hideRecentWhenFeatured": true,
        "countPosts": 8
      },
      "page": {
        "copyPage": true,
        "showYearCount": false
      },
      "side": {
        "home": {
          "sidePaneSticky": false,
          "taxonomies": ["tags", "series"],
          "countTaxonomy": 3
        },
        "term": {
          "sidePaneSticky": false
        },
        "single": {
          "sidePaneSticky": true,
          "showDetails": true,
          "showTableOfContents": true,
          "showAttachments": true,
          "showRelated": true,
          "countRelated": 5
        }
      }
    }
  }
}
````

### Option Reference

| Option | Effective default | Description |
| ------ | ----------------- | ----------- |
| `ferro.enablei18n` | `true` | Show the language switcher in the navbar (only meaningful with more than one language configured). |
| `ferro.sidePane` | `true` | Render the side pane by default. Can be overridden per page via front matter. |
| `ferro.grain` | `false` | Paper-grain texture overlay on the page background (opt-in). |
| `ferro.countPageItems` | `7` | Number of items per page on section/taxonomy list pages (paginator size). |
| `ferro.search` | `flexsearch` | Search engine: `flexsearch` (built-in, zero config), `pagefind` (same panel backed by [Pagefind](https://pagefind.app), requires the Pagefind CLI after the build — see below), or `off` (hides every search entry point). |
| `ferro.home.showBio` | `true` | Show the greeting/bio block on the home page. |
| `ferro.home.showAuthorImg` | `false` | Show the author image inside the bio block (image comes from `data/ferro/content.yaml`). |
| `ferro.home.showASCIIArt` | `true` | Show ASCII art instead of the author image (art comes from `data/ferro/content.yaml`). |
| `ferro.home.showFeatured` | `true` | Show the "Featured" group on the home page. |
| `ferro.home.showRecent` | `true` | Show the recent-posts group on the home page. |
| `ferro.home.hideRecentWhenFeatured` | `false` | With both groups on, exclude featured posts from the recent list. |
| `ferro.home.countPosts` | `5` | How many posts the featured/recent groups list. |
| `ferro.home.tabs` | unset | Custom home tab list; entries are `"recent"`, `"featured"`, `"posts"` (all posts, newest first), `{taxonomy, term, title?}` to filter posts by a taxonomy term, or `{section, title?}` to list another content section in its weight order (empty tabs are skipped; a list that resolves to nothing falls back to one all-posts tab). Unset keeps the default recent + featured pair. Overridable per language via `languages.<lang>.params`. |
| `ferro.page.copyPage` | `false` | Show the "Copy page" button on single pages (fetches the raw Markdown). |
| `ferro.page.showYearCount` | `false` | Show per-year post counts on section landing pages. |
| `ferro.side.home.sidePaneSticky` | `false` | Make the home side pane stick while scrolling. |
| `ferro.side.home.taxonomies` | `[]` | Taxonomies listed in the home side pane (e.g. `tags`, `series`). Empty hides the section. |
| `ferro.side.home.countTaxonomy` | `3` | How many terms to show per taxonomy in the home side pane. |
| `ferro.side.term.sidePaneSticky` | `false` | Make the term-page side pane stick while scrolling. |
| `ferro.side.single.sidePaneSticky` | `false` | Make the single-page side pane stick while scrolling. |
| `ferro.side.single.showDetails` | `false` | Show metadata (date, taxonomies) in the single-page side pane. |
| `ferro.side.single.showTableOfContents` | `false` | Show the table of contents in the single-page side pane. |
| `ferro.side.single.showAttachments` | `false` | List page-bundle resources as attachments in the side pane. |
| `ferro.side.single.showRelated` | `false` | Show related posts in the single-page side pane (requires `related` config below). |
| `ferro.side.single.countRelated` | `5` | How many related posts to list. |

### Search engines

- `flexsearch` (default) — client-side search over a per-language index generated at build time; see the [Search doc]({{< ref "/docs/features/search" >}}) for the required `outputs`.
- `pagefind` — the same panel backed by [Pagefind](https://pagefind.app). Run the Pagefind CLI after the Hugo build; it indexes the rendered content of single pages (posts, docs, about — list, taxonomy and error pages are excluded) and routes queries to the page's language (including CJK segmentation) automatically:

  ```bash
  hugo && npx pagefind --site public
  ```

  In CI, add the same line after the build step. During development (`hugo server`) no Pagefind bundle exists yet, so the panel shows a hint instead of results.
- `off` — hides the header button, the home search bar and the panel; no search JavaScript is loaded. The `SearchIndex` output format cannot be switched off by params, so remove it from `outputs.home` in your site config if you don't want the JSON file.

## Other Params

Besides the `ferro` namespace, the theme reads these standard `params`:

````toml {group="other-params" tab="TOML"}
[params]
summaryLength = 70          # words in auto-generated summaries (Hugo core)
favicon = '/favicon.svg'    # favicon path
dateFormat = ':date_medium' # date format used across lists and heroes
searchLimit = 20            # max results rendered by client-side search
tagline = 'A blog tagline'  # site tagline; first fallback for the meta description

[params.author]
name = 'Your Name'          # footer copyright, author image alt text

[params.meta]
description = ''            # last-resort fallback when page and tagline are unset
# ogImage = '/images/og-default.png' # default social-card image
# twitter = '@yourhandle'            # twitter:creator for social cards

[params.links]
hugo = 'https://gohugo.io/'                   # footer attribution link
theme = 'https://github.com/dangpangch/ferro' # footer attribution link
````

````yaml {group="other-params" tab="YAML"}
params:
  summaryLength: 70          # words in auto-generated summaries (Hugo core)
  favicon: /favicon.svg      # favicon path
  dateFormat: ":date_medium" # date format used across lists and heroes
  searchLimit: 20            # max results rendered by client-side search
  tagline: "A blog tagline"  # site tagline; first fallback for the meta description
  author:
    name: Your Name          # footer copyright, author image alt text
  meta:
    description: ""          # last-resort fallback when page and tagline are unset
    # ogImage: /images/og-default.png  # default social-card image
    # twitter: "@yourhandle"           # twitter:creator for social cards
  links:
    hugo: https://gohugo.io/                   # footer attribution link
    theme: https://github.com/dangpangch/ferro # footer attribution link
````

````json {group="other-params" tab="JSON"}
{
  "params": {
    "summaryLength": 70,
    "favicon": "/favicon.svg",
    "dateFormat": ":date_medium",
    "searchLimit": 20,
    "tagline": "A blog tagline",
    "author": { "name": "Your Name" },
    "meta": { "description": "" },
    "links": {
      "hugo": "https://gohugo.io/",
      "theme": "https://github.com/dangpangch/ferro"
    }
  }
}
````

Every entry is optional except `author.name` and the two `links` entries, which the footer renders unconditionally. The two commented-out options (`meta.ogImage`, `meta.twitter`) only appear in the YAML/TOML tabs since JSON has no comments.

## Page Config

Some options live in a page's front matter:

````toml {group="page-config" tab="TOML"}
+++
featured = true         # listed in the home page "Featured" group
indexable = false       # excluded from home featured/recent lists
summary = "Manual text" # custom summary; falls back to auto-generated
cover = "cover.jpg"     # social-card image candidate (page bundle resource)
img = "cover.png"       # list cover thumbnail (bundle resource or /static path)
images = ["og.png"]     # further social-card image candidates

# Theme option: hide the side pane on this page
[ferro]
sidePane = false
+++
````

````yaml {group="page-config" tab="YAML"}
---
# Theme option: hide the side pane on this page
ferro:
  sidePane: false

# Flags the theme uses when building lists and social cards
indexable: false       # excluded from home featured/recent lists
summary: Manual text   # custom summary; falls back to auto-generated
cover: cover.jpg       # social-card image candidate (page bundle resource)
img: cover.png         # list cover thumbnail (bundle resource or /static path)
images:                # further social-card image candidates
  - og.png
---
````

````json {group="page-config" tab="JSON"}
{
  "ferro": {
    "sidePane": false
  },
  "featured": true,
  "indexable": false,
  "summary": "Manual text",
  "cover": "cover.jpg",
  "img": "cover.png",
  "images": ["og.png"]
}
````

`cover` and `images` feed the Open Graph/Twitter card tags in the page head; `summary` overrides the automatically generated excerpt wherever summaries are shown.

## Site Config Requirements

Beyond `params`, the theme depends on a few standard Hugo settings. Feature-specific walkthroughs live in the [Search doc]({{< ref "/docs/features/search" >}}) and their own posts ([Internationalization]({{< ref "/posts/internationalization" >}}), [Social Links]({{< ref "/docs/features/social-links" >}})); the essentials:

````toml {group="site-config" tab="TOML"}
mainSections = ['posts'] # content source for the home page groups

[taxonomies]
tag = 'tags'
topic = 'topics'
series = 'series'

# Powers the single-page "Related" pane
[related]
includeNewer = true

[[related.indices]]
name = 'tags'
weight = 100

[build.buildStats]
enable = true            # required by the Tailwind CSS v4 class detection

[outputs]
home = ['HTML', 'RSS', 'SearchIndex'] # enables search (see the Search post)
page = ['HTML', 'CopyPage']           # raw Markdown endpoint for "Copy page"
````

````yaml {group="site-config" tab="YAML"}
mainSections: [posts]     # content source for the home page groups

taxonomies:
  tag: tags
  topic: topics
  series: series

related:                  # powers the single-page "Related" pane
  includeNewer: true
  indices:
    - name: tags
      weight: 100

build:
  buildStats:             # required by the Tailwind CSS v4 class detection
    enable: true

outputs:
  home:
    - HTML
    - RSS
    - SearchIndex         # enables search (see the Search post)
  page:
    - HTML
    - CopyPage            # raw Markdown endpoint for the "Copy page" button
````

````json {group="site-config" tab="JSON"}
{
  "mainSections": ["posts"],
  "taxonomies": {
    "tag": "tags",
    "topic": "topics",
    "series": "series"
  },
  "related": {
    "includeNewer": true,
    "indices": [{ "name": "tags", "weight": 100 }]
  },
  "build": { "buildStats": { "enable": true } },
  "outputs": {
    "home": ["HTML", "RSS", "SearchIndex"],
    "page": ["HTML", "CopyPage"]
  }
}
````

The `SearchIndex` and `CopyPage` output formats themselves ship with the theme and only need activating through `outputs`, as shown above. For a ready-to-use starting point, clone the [starter template](https://github.com/dangpangch/ferro-starter-template), which wires all of this up.
