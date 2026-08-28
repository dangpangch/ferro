---
title: "Front Matter"
linkTitle: "Front Matter"
description: "主题识别的键位。"
date: 2023-01-01T08:00:00-07:00
weight: 1
---

## 分类

```yaml
tags: ["hugo", "博客"]
topics: ["文档"]
series: ["主题指南"]
```

分类页面拥有独立版式;series(系列)将文章组织为有序集合。

## 版式行为

```yaml
featured: true        # 置顶到首页精选区块
weight: 1             # 列表与章节中的排序
draft: true           # 生产构建中排除

ferro:
  sidePane: false     # 该页面关闭侧边栏
```

## 摘要

`description` 用于文档卡片、翻页器与社交分享摘要。
