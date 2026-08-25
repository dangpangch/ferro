---
title: "配置"
date: "2025-03-24T23:00:00-03:00"
tags: ["指南"]
topics: ["文档"]
featured: true
weight: 2
---

本页概述了主题的配置选项。有大量设置可用于调整站点的布局与内容呈现。主要功能包括控制侧边栏的可见性、调整每个列表页显示的项目数量，以及管理精选文章、最新文章、分类法和相关内容等元素。

## 全局配置

以下配置选项可以添加到站点的 Hugo 配置文件中。

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

## 页面配置

部分配置在页面 front matter 中定义，如下所示。

```yaml
---
ferro:
  sidePane: false
  sidePaneSticky: false
---
...
```
