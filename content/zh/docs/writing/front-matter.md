---
title: Front Matter
description: ferro 会读取的页面元数据字段。
date: 2026-08-03
weight: 1
---

所有页面都接受标准 Hugo front matter,其中几个字段会触发主题的额外行为。

## 常用字段

```yaml
---
title: 我的文章
date: 2026-08-03
description: 用于列表摘要与 SEO 标签的一句话简介。
tags:
  - hugo
series: 主题内部机制
---
```

## 精选文章

添加 `featured: true` 即可将文章提升到首页精选区块。此时首页会按
`hideRecentWhenFeatured` 的设置隐藏最近文章列表。

## 草稿与未来日期

草稿仅在 `--buildDrafts` 下渲染(开发脚本已默认携带);设定了未来日期的页
面会等到发布时间才可见。

## 摘要

页面未写 `summary` 时,ferro 会截取首段前 `params.summaryLength` 个字符作
为列表预览。
