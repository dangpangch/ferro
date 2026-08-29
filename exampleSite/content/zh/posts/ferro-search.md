---
title: "Ferro 搜索设计"
img: /images/cover-search.svg
featured: true
date: "2026-08-30T00:00:00+08:00"
series: ["内容", "功能"]
---

搜索是内容型站点使用频率最高的入口之一，因此 ferro 把它当作一等功能来做：一个命令面板、两个可插拔引擎、按语言隔离的结果、落地页高亮。这篇文章说明设计方案、两个引擎的取舍，以及全部配置方式。

## 设计：一个面板，可插拔引擎

面板只负责呈现——遮罩、焦点陷阱、键盘导航、防抖与竞态防护都收敛在一个共享模块里。引擎是适配器，只需实现三个方法的契约（`ready`、`onOpen`、`search`），由 `ferro.search` 参数选择：

```text
ferro.search: "flexsearch"（默认） | "pagefind" | "off"
```

契约刻意保持很小。FlexSearch 是围绕其内核文件的适配器；Pagefind 是围绕其懒加载 bundle 的适配器；未来接入第三个引擎大约只需一百行代码，面板无需再动。

两条不变量决定了整个设计：

- **结果按语言隔离。** 双语站点的查询绝不能跨语言泄漏。内置引擎按语言各生成一份索引（`/searchindex.json`、`/zh/searchindex.json`），面板只取当前语言的文件；Pagefind 按 `<html lang>` 分语种索引并自行过滤。
- **匹配与高亮的连续性。** 结果链接把查询词带在 `?s=` 上，共享的高亮模块在目标页把命中包成标记、点击后淡出。面板预览与落地高亮因此是同一匹配的两个视图，带高亮的链接也可以直接分享。

两种引擎都对中文做了显式处理：FlexSearch 把汉字按字切分索引（注册表这类词中间查询也能命中），Pagefind 则内置分词。

## flexsearch 还是 pagefind？

| | flexsearch | pagefind |
|---|---|---|
| 索引来源 | 构建时生成 JSON（`searchindex.json`） | 构建后抓取 HTML |
| 接入成本 | 仅需 outputs 配置 | 构建后加一步 CLI |
| 首次搜索 | 下载当前语言的完整索引 | 先加载引擎，再按结果懒取分片 |
| 适合规模 | 博客与小型文档站 | 大站点、省带宽、多语言分词 |
| 中文 | 按字符匹配 | 内置分词 |
| `hugo server` | 开箱即用 | 需构建目录（面板显示提示） |

**默认选 flexsearch**——零外部依赖，一段配置搞定。当站点规模超出单份 JSON 索引的舒适区（数千页）、想要 Pagefind 的排序与懒加载分片，或 CI 里本就有构建后处理步骤时，再换 pagefind。两个引擎共享同一个面板、同一套高亮和同样的按语言行为，切换只是一行配置。

## 配置

```toml
[params.ferro]
  search = 'flexsearch' # 或 'pagefind'；'off' 关闭搜索
```

- **flexsearch** 需要为首页启用 `SearchIndex` 输出（见[搜索文档]({{< ref "/docs/features/search" >}})）。
- **pagefind** 需要在构建后加一行：`npx pagefind --site public`。本演示站运行的就是 pagefind——这一步在部署 workflow 里。
- **off** 隐藏全部搜索入口，不加载任何搜索 JS。
- `searchLimit`（默认 `20`）限制渲染的结果条数。

完整参考（含 CI 配置片段与高亮行为说明）见[搜索文档]({{< ref "/docs/features/search" >}})。

## 试试看

本站运行的是 pagefind：点击放大镜输入关键词——英文站试试 `grain` 或 `config`，中文站试试 配置 或 注册表。点击结果后命中处会在页面中高亮；点击任一高亮即淡出清除全部。
