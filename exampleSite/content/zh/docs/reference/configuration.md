---
title: "配置"
date: "2025-03-24T23:00:00-03:00"
tags: ["指南"]
topics: ["文档"]
weight: 2
---

本页完整列出主题读取的每一项配置。设置分为四组:`params.ferro` 命名空间(主题自有选项)、主题消费的其他 `params`、页面级 front matter 选项,以及主题依赖的标准 Hugo 站点设置。特定功能的配置(搜索、社交链接、国际化)由各自的文章单独介绍,并在相关位置给出链接。

## 全局配置

以下选项构成完整的 `params.ferro` 命名空间。示例值与主题演示站一致;未设置的布尔选项行为等同 `false`。

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
  # 自定义 tab 列表——省略则使用默认的「最新 + 精选」组合
  [[params.ferro.home.tabs]]
    title = 'Documentation' # 可选;默认为 term 的人性化名称
    taxonomy = 'topics'
    term = 'documentation'

[params.ferro.page]
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

### 选项参考

| 选项 | 缺省行为 | 说明 |
| ---- | -------- | ---- |
| `ferro.enablei18n` | `true` | 在导航栏显示语言切换器(仅在配置了多种语言时有意义)。 |
| `ferro.sidePane` | `true` | 默认渲染侧边栏,可通过页面 front matter 覆盖。 |
| `ferro.grain` | `false` | 页面背景的纸张颗粒纹理,需显式开启。 |
| `ferro.countPageItems` | `7` | 列表页(section/taxonomy)每页条目数(分页大小)。 |
| `ferro.search` | `flexsearch` | 搜索引擎:`flexsearch`(内置,零配置)、`pagefind`(同一面板,由 [Pagefind](https://pagefind.app) 驱动,构建后需运行 Pagefind CLI,见下文)或 `off`(隐藏全部搜索入口)。 |
| `ferro.home.showBio` | `true` | 在首页显示问候/简介区块。 |
| `ferro.home.showAuthorImg` | `false` | 在简介区块中显示作者图片(图片来自 `data/ferro/content.yaml`)。 |
| `ferro.home.showASCIIArt` | `true` | 显示 ASCII 字符画代替作者图片(内容来自 `data/ferro/content.yaml`)。 |
| `ferro.home.showFeatured` | `true` | 在首页显示「精选」分组。 |
| `ferro.home.showRecent` | `true` | 在首页显示最新文章分组。 |
| `ferro.home.hideRecentWhenFeatured` | `false` | 两组同时开启时,从最新列表中排除精选文章。 |
| `ferro.home.countPosts` | `5` | 精选/最新分组列出的文章数量。 |
| `ferro.home.tabs` | 未设置 | 自定义首页 tab 列表;条目为 `"recent"`、`"featured"`、`"posts"`(全部文章,按时间倒序)、`{taxonomy, term, title?}`(按 taxonomy term 过滤文章)或 `{section, title?}`(按 weight 序列出另一个内容 section;空 tab 跳过;解析后为空则回退为单个全部文章 tab)。未设置保持默认的「最新 + 精选」组合。可通过 `languages.<lang>.params` 按语言覆盖。 |
| `ferro.page.showYearCount` | `false` | 在 section 落地页显示按年份的文章计数。 |
| `ferro.side.home.sidePaneSticky` | `false` | 首页侧边栏随滚动固定。 |
| `ferro.side.home.taxonomies` | `[]` | 首页侧边栏列出的分类法(如 `tags`、`series`)。为空时隐藏该区块。 |
| `ferro.side.home.countTaxonomy` | `3` | 每个分类法在首页侧边栏显示的词条数。 |
| `ferro.side.term.sidePaneSticky` | `false` | 词条页(term)侧边栏随滚动固定。 |
| `ferro.side.single.sidePaneSticky` | `false` | 单页侧边栏随滚动固定。 |
| `ferro.side.single.showDetails` | `false` | 单页侧边栏显示元信息(日期、分类等)。 |
| `ferro.side.single.showTableOfContents` | `false` | 单页侧边栏显示目录。 |
| `ferro.side.single.showAttachments` | `false` | 单页侧边栏列出页面 bundle 资源作为附件。 |
| `ferro.side.single.showRelated` | `false` | 单页侧边栏显示相关文章(需要下文的 `related` 配置)。 |
| `ferro.side.single.countRelated` | `5` | 相关文章的列出数量。 |

### 搜索引擎

- `flexsearch`(默认)——基于构建时生成的按语言索引的客户端搜索;所需 `outputs` 见[搜索文档]({{< ref "/docs/features/search" >}})。
- `pagefind`——同一面板改由 [Pagefind](https://pagefind.app) 驱动。在 Hugo 构建之后运行 Pagefind CLI;它会索引单页内容(posts、docs、about——列表页、分类页与错误页不参与),并自动把查询路由到页面语言(内置中日韩分词):

  ```bash
  hugo && npx pagefind --site public
  ```

  在 CI 中,把同一行加在构建步骤之后即可。开发阶段(`hugo server`)尚无 Pagefind 索引,面板会显示提示而非结果。
- `off`——隐藏头部搜索按钮、首页搜索条与面板,不加载任何搜索 JS。`SearchIndex` 输出格式无法由参数关闭,如不需要该 JSON 文件,请自行从站点配置的 `outputs.home` 中移除。

## 其他 Params

除 `ferro` 命名空间外,主题还读取这些标准 `params`:

````toml {group="other-params" tab="TOML"}
[params]
summaryLength = 70          # 自动摘要的词数上限(Hugo 核心参数)
favicon = '/favicon.svg'    # favicon 路径
dateFormat = ':date_medium' # 列表与标题区使用的日期格式
searchLimit = 20            # 客户端搜索最多渲染的结果数
tagline = '站点标语'         # 站点标语;meta description 的第一顺位兜底

[params.author]
name = 'Your Name'          # 页脚版权、作者图片 alt 文本

[params.meta]
description = ''            # 页面与 tagline 均未设置时的最终兜底
# ogImage = '/images/og-default.png' # 默认社交卡片图
# twitter = '@yourhandle'            # 社交卡片的 twitter:creator

[params.links]
hugo = 'https://gohugo.io/'                   # 页脚署名链接
theme = 'https://github.com/dangpangch/ferro' # 页脚署名链接
````

````yaml {group="other-params" tab="YAML"}
params:
  summaryLength: 70          # 自动摘要的词数上限(Hugo 核心参数)
  favicon: /favicon.svg      # favicon 路径
  dateFormat: ":date_medium" # 列表与标题区使用的日期格式
  searchLimit: 20            # 客户端搜索最多渲染的结果数
  tagline: "站点标语"         # 站点标语;meta description 的第一顺位兜底
  author:
    name: Your Name          # 页脚版权、作者图片 alt 文本
  meta:
    description: ""          # 页面与 tagline 均未设置时的最终兜底
    # ogImage: /images/og-default.png  # 默认社交卡片图
    # twitter: "@yourhandle"           # 社交卡片的 twitter:creator
  links:
    hugo: https://gohugo.io/                   # 页脚署名链接
    theme: https://github.com/dangpangch/ferro # 页脚署名链接
````

````json {group="other-params" tab="JSON"}
{
  "params": {
    "summaryLength": 70,
    "favicon": "/favicon.svg",
    "dateFormat": ":date_medium",
    "searchLimit": 20,
    "tagline": "站点标语",
    "author": { "name": "Your Name" },
    "meta": { "description": "" },
    "links": {
      "hugo": "https://gohugo.io/",
      "theme": "https://github.com/dangpangch/ferro"
    }
  }
}
````

除 `author.name` 与两条 `links`(页脚无条件渲染)外,其余均可选。两个注释掉的可选项(`meta.ogImage`、`meta.twitter`)因 JSON 不支持注释,仅出现在 YAML/TOML 标签页。

## 页面配置

部分选项定义在页面 front matter 中:

````toml {group="page-config" tab="TOML"}
+++
featured = true        # 进入首页「精选」分组
indexable = false      # 从首页精选/最新列表中排除
summary = "手动摘要文本" # 自定义摘要;缺省回退到自动生成
cover = "cover.jpg"    # 社交卡片图候选(page bundle 资源)
img = "cover.png"      # 列表封面缩略图(bundle 资源或 /static 路径)
images = ["og.png"]    # 更多社交卡片图候选

# 主题选项:隐藏本页侧边栏
[ferro]
sidePane = false
+++
````

````yaml {group="page-config" tab="YAML"}
---
# 主题选项:隐藏本页侧边栏
ferro:
  sidePane: false

# 主题在构建列表和社交卡片时使用的标记
indexable: false       # 从首页精选/最新列表中排除
summary: 手动摘要文本   # 自定义摘要;缺省回退到自动生成
cover: cover.jpg       # 社交卡片图候选(page bundle 资源)
img: cover.png         # 列表封面缩略图(bundle 资源或 /static 路径)
images:                # 更多社交卡片图候选
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
  "summary": "手动摘要文本",
  "cover": "cover.jpg",
  "img": "cover.png",
  "images": ["og.png"]
}
````

`cover` 与 `images` 用于页面头部的 Open Graph/Twitter 卡片标签;`summary` 在所有展示摘要的位置覆盖自动生成的摘录。

## 站点配置要求

除 `params` 外,主题依赖少量标准 Hugo 设置。具体功能见[搜索文档]({{< ref "/docs/features/search" >}})与各自的文章([国际化]({{< ref "/posts/internationalization" >}})、[社交链接]({{< ref "/docs/features/social-links" >}}));核心项如下:

````toml {group="site-config" tab="TOML"}
mainSections = ['posts'] # 首页各分组的内容来源

[taxonomies]
tag = 'tags'
topic = 'topics'
series = 'series'

# 驱动单页侧边栏的「相关文章」
[related]
includeNewer = true

[[related.indices]]
name = 'tags'
weight = 100

[build.buildStats]
enable = true            # Tailwind CSS v4 class 检测所必需

[outputs]
home = ['HTML', 'RSS', 'SearchIndex'] # 启用搜索(见「搜索」一文)
page = ['HTML', 'CopyPage']           # 「复制页面」按钮的原始 Markdown 端点
````

````yaml {group="site-config" tab="YAML"}
mainSections: [posts]     # 首页各分组的内容来源

taxonomies:
  tag: tags
  topic: topics
  series: series

related:                  # 驱动单页侧边栏的「相关文章」
  includeNewer: true
  indices:
    - name: tags
      weight: 100

build:
  buildStats:             # Tailwind CSS v4 class 检测所必需
    enable: true

outputs:
  home:
    - HTML
    - RSS
    - SearchIndex         # 启用搜索(见「搜索」一文)
  page:
    - HTML
    - CopyPage            # 「复制页面」按钮的原始 Markdown 端点
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

`SearchIndex` 与 `CopyPage` 输出格式本身随主题提供,只需像上面这样通过 `outputs` 启用。若想直接使用现成配置,可克隆 [starter template](https://github.com/dangpangch/ferro-starter-template),其中已完成全部接线。

## 网站统计

Google Analytics 4 通过 Hugo 标准的 `services` 配置接入——设置 ID 后,统计脚本会输出到 `<body>` 末尾(开发服务器下跳过,本地构建不会污染数据):

````yaml
services:
  googleAnalytics:
    ID: G-XXXXXXXXXX
````

其他统计服务(Plausible、Umami 等)可通过覆盖主题的 `layouts/_partials/analytics.html` partial 接入:在站点自己的 `layouts/_partials/analytics.html` 中放置统计代码,即可替换内置实现。
