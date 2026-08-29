---
title: "配置"
linkTitle: "配置"
description: "params.ferro 下的主题选项。"
date: 2023-01-01T08:00:00-07:00
weight: 2
---

所有主题选项都位于站点配置的 `params.ferro` 下。

## 首页

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `showBio` | `true` | 首页作者简介区块 |
| `showASCIIArt` | `true` | ASCII 艺术标题 |
| `showFeatured` | `true` | 精选文章区块 |
| `showRecent` | `true` | 最近文章列表 |
| `countPosts` | `5` | 每个分组列出的文章数量 |
| `tabs` | 未设置 | 自定义首页 tab 列表(`recent` / `featured` / `posts` 或 `{taxonomy, term}` 过滤)——详见[配置参考]({{< ref "/posts/configuration" >}}) |

## 侧边栏

通过 `sidePane` 全局开关,也可以在页面 front matter 中按页关闭;吸顶行为按版式分别配置(`side.home`、`side.single` 等)。

## 文章页

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `showDetails` | `true` | 日期与阅读元信息 |
| `showTableOfContents` | `true` | 目录 |
| `showRelated` | `true` | 相关文章 |
| `copyPage` | `true` | 复制页面为 Markdown 按钮 |

## 多语言

设置 `enablei18n: true` 并声明中英两种语言,即可启用导航栏语言切换器。
