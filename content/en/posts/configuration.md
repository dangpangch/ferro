---
title: "Configuration"
date: "2025-03-24T23:00:00-03:00"
tags: ["guide"]
topics: ["documentation"]
featured: true
weight: 2
---

This page outlines the configuration options for the theme. There are plenty of settings for tweaking your site's layout and content presentation. Key features include options for controlling the side pane visibility, adjusting the number of items displayed on each list page, and managing elements such as featured posts, recent posts, taxonomies, and related content.

## Global Config

The following configuration options can be added to your site's Hugo config file.

````toml {group="global-config" tab="TOML"}
[params.ferro]
  sidePane = true
  countPageItems = 7

[params.ferro.home]
  showBio = true
  showAuthorImg = true
  showASCIIArt = true
  sidePaneTags = true
  showFeatured = true
  showRecent = true
  hideRecentWhenFeatured = true
  countRecent = 5

[params.ferro.page]
  copyPage = true
  showYearCount = false

[params.ferro.side.home]
  sidePaneSticky = false
  taxonomies = ['tags']
  countTaxonomy = 5

[params.ferro.side.list]
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
    sidePane: true
    countPageItems: 7
    home:
      showBio: true
      showAuthorImg: true
      showASCIIArt: true
      sidePaneTags: true
      showFeatured: true
      showRecent: true
      hideRecentWhenFeatured: true
      countRecent: 5
    page:
      copyPage: true
      showYearCount: false
    side:
      home:
        sidePaneSticky: false
        taxonomies: [tags]
        countTaxonomy: 5
      list:
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
      "sidePane": true,
      "countPageItems": 7,
      "home": {
        "showBio": true,
        "showAuthorImg": true,
        "showASCIIArt": true,
        "sidePaneTags": true,
        "showFeatured": true,
        "showRecent": true,
        "hideRecentWhenFeatured": true,
        "countRecent": 5
      },
      "page": {
        "copyPage": true,
        "showYearCount": false
      },
      "side": {
        "home": {
          "sidePaneSticky": false,
          "taxonomies": ["tags"],
          "countTaxonomy": 5
        },
        "list": {
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

## Page Config

Some configurations are defined in the page frontmatter, they're as following.

```yaml
---
ferro:
  sidePane: false
  sidePaneSticky: false
---
...
```
