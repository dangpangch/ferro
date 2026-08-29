---
title: "国际化"
img: cover.svg
featured: true
date: "2026-08-23T00:00:00+08:00"
---

Ferro 支持国际化（i18n）翻译表来本地化界面文案。本主题自带英文与简体中文两张翻译表（`i18n/en.yaml` 与 `i18n/zh.yaml`），按语言查找键值；缺失的键会自动回退到默认语言。你也可以在站点的 `i18n/<lang>.yaml` 中添加或覆盖任意键。

## Ferro 的组合方式

本演示站点组合了三种 Hugo 机制：

1. **按内容目录翻译** — 每种语言拥有独立的内容树（配置中的 `contentDir: content/en` / `content/zh`），两棵树中相同路径的文件自动互相关联为翻译页。
2. **配置内分语言菜单** — 菜单项定义在各语言的 `languages.<key>.menus` 下，导航天然就是已翻译的，无需额外的翻译表。
3. **i18n 翻译表** — 界面文案（按钮、标签、问候语等）来自下文介绍的主题翻译表。

```yaml
defaultContentLanguage: en

languages:
  en:
    weight: 1
    locale: en-US
    label: English
    contentDir: content/en
    menus:
      main:
        - name: Posts
          pageRef: /posts
          weight: 1
  zh:
    weight: 2
    locale: zh-CN
    label: 中文
    contentDir: content/zh
    menus:
      main:
        - name: 文章
          pageRef: /posts
          weight: 1
```

以下是翻译表中比较有代表性的一部分（完整内容见仓库中的对应文件）：

```yaml
# Root
theme_light: 浅色主题
theme_dark: 深色主题

# Not found (404)
not_found_title: 哎呀，页面不存在！
not_found_home_link: 返回首页

# Footer
scroll_top: 回到顶部
footer: 由 {{ .HugoAnchor }} 驱动的 {{ .ThemeAnchor }} 主题

# Home
featured_posts: 精选文章
recent_posts: 最新文章

# Search
search_placeholder: 搜索...
search_no_results: '没有找到 "%s" 的结果'

# Header
switch_language: 切换语言
toggle_theme: 切换主题

# 首页问候语（可通过 data/ferro/content.yaml → home.greetings / home.text 覆盖）
home_greetings: 为博主而生的 Hugo 主题！
home_text: 一款为网络写作者与读者打造的经典、可配置、可定制的米白与炭暖色主题。

# Taxonomies
taxonomies:
  tags: 标签
  topics: 主题
  series: 系列

taxonomy_post_count:
  one: "{{ .Count }} 篇文章"
  other: "{{ .Count }} 篇文章"

# Pagination
pagination_prev: ← 上一页
pagination_next: 下一页 →

# SidePane for single pages
details_words: 字
details_read_time: 分钟阅读
side_table_of_contents: 目录
side_attachments: 附件
side_related: 相关文章
```

几点说明：

- **模板函数**：模板中通过 `{{ T "key" }}`（或 `i18n "key"`）读取当前语言的文案，例如页脚的 `footer` 键通过 `{{ .HugoAnchor }}`、`{{ .ThemeAnchor }}` 接收模板变量。
- **复数形式**：形如 `taxonomy_post_count` 的键使用 `one`/`other` 子键，由 Hugo 按 CLDR 复数规则自动选择。
- **首页问候语**：默认取 `home_greetings`/`home_text` 键，可在 `data/ferro/content.yaml` 的 `home.greetings`/`home.text` 中按站点覆盖。
- **菜单与结构化内容**：导航菜单在各语言的配置中分别定义；侧边栏等结构化内容放在各语言首页的 front matter（`ferro.side`）里，因此天然支持按语言翻译。

> **注意：** 没有找到你需要的文案？请到[仓库](https://github.com/dangpangch/ferro)查看对应的 i18n 文件（其中可能有更新），或者提一个功能请求！
