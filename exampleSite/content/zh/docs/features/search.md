---
title: "搜索"
date: "2026-08-30T00:00:00+08:00"
series: ["内容", "功能"]
---

搜索以命令面板形式呈现：点击导航栏的放大镜按钮（或使用首页的搜索条），输入关键词后用方向键选择结果。搜索引擎由 `ferro.search` 选择，且所有引擎都**只在当前语言内检索**——多语言站点上同一个查询在不同语言下返回各自的结果。

## 引擎

### flexsearch（默认）

零配置的客户端搜索。构建时把页面生成一份按语言划分的 JSON 索引，通过 `SearchIndex` 输出启用：

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

索引位于 `/searchindex.json`（多语言站点为 `/<lang>/searchindex.json`）。中文和日文按字符切分索引，无需空格也能命中词组中间的查询。

### pagefind

同一面板改由 [Pagefind](https://pagefind.app) 驱动。Pagefind 索引的是构建产物，因此需要在 Hugo 构建之后运行它的 CLI：

```bash
hugo && npx pagefind --site public
```

只有单页内容（posts、docs、about）参与索引——列表页、分类页与错误页不参与。Pagefind 会自动把查询路由到页面语言，并内置中日韩分词。

在 CI 中，把同一行加在构建步骤之后即可：

```yaml
- name: Build
  run: hugo --gc --minify
- name: Pagefind index
  run: npx pagefind --site public
```

开发阶段（`hugo server`）尚无索引，面板会显示提示而非结果；对构建产物目录运行一次 CLI 即可本地测试搜索。

### off

`ferro.search = 'off'` 会隐藏全部搜索入口，且不加载任何搜索 JS。`SearchIndex` 输出格式无法由参数关闭，如不需要该 JSON 文件，请自行从站点配置的 `outputs.home` 中移除。

## 结果高亮

点击结果会用查询词装饰目标 URL（`?s=...`），进入文章后命中文本会自动高亮，点击任一高亮即淡出清除全部。任何带 `?s=` 参数加载的页面都会高亮对应文本，因此这类链接也可以直接分享。

面板结果预览的高亮来自引擎：Pagefind 高亮整个命中词（搜索 `s` 会标出所有 s 开头的词——整词前缀匹配是引擎的匹配语义），内置引擎则高亮你输入的字面子串。

`searchLimit`（默认 `20`）限制面板渲染的结果条数。
