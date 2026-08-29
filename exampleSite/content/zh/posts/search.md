---
title: "搜索"
img: /images/cover-search.svg
date: "2025-03-24T23:00:00-03:00"
series: ["内容", "功能"]
---

本主题内置由 FlexSearch 驱动的搜索功能。它通过在构建时生成搜索索引来工作。要启用它，请在你的配置文件中添加以下内容：

```toml
[outputFormats]
 [outputFormats.SearchIndex]
  mediaType = "application/json"
  baseName = "searchindex"
  isPlainText = true
  notAlternative = true

[mediaTypes]
 [mediaTypes."application/json"]
  suffixes = ["json"]

[outputs]
 home = ["HTML","RSS","SearchIndex"]
```

JSON 输出作为搜索索引提供，英文站点位于 `/searchindex.json`，中文站点位于 `/zh/searchindex.json`，由 FlexSearch 在浏览器端通过 JavaScript 消费。

搜索可以通过 `/search` 路径（主题自带的内容页）访问，或在页面中添加 `search` 短代码。
