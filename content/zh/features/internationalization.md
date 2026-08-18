---
title: "国际化"
date: "2025-03-24T23:00:00-03:00"
---

Ferro 支持国际化 (i18n) 翻译表来本地化界面文案。本主题自带英文与简体中文翻译表（`i18n/en.yaml` 与 `i18n/zh.yaml`）；缺失的键会自动回退到默认语言，你也可以在站点的 `i18n/<lang>.yaml` 目录中添加自己的翻译。

```yaml
# Root
theme_light: 浅色主题
theme_dark: 深色主题

# Footer
scroll_top: 回到顶部
footer: 用 ❤️ 制作，由 {{ .HugoAnchor }} 驱动的 {{ .ThemeAnchor }} 主题

# Home
featured_posts: 精选文章
recent_posts: 最新文章

# SidePane for home
search: 搜索...
see_all: 查看全部...

# Page
breadcrumb_home: 首页

# SidePane for single pages
details_words: 字
details_read_time: 分钟阅读
side_table_of_contents: 目录
side_attachments: 附件
side_related: 相关文章
```

> **注意：** 没有找到你需要的文案？请在[仓库](https://github.com/dangpangch/ferro)中查看对应文件（其中可能已经更新），或者创建一个新的功能请求！
