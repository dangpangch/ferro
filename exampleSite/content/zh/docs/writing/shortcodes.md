---
title: "短代码"
linkTitle: "短代码"
description: "提示框与折叠区块。"
date: 2023-01-01T08:00:00-07:00
weight: 3
---

主题内置两个内容短代码。二者内部接受 Markdown,并通过页面的 Markdown 管线渲染。短代码之间也可以嵌套(例如折叠区块里套提示框),前提是开启 [`markup.goldmark.renderer.unsafe`](https://gohugo.io/configuration/markup/#renderer)——主题默认配置、[starter template](https://github.com/dangpangch/ferro-starter-template) 与本演示站均已开启;站点若自定义 `markup` 块,请自行加上。

## 提示框

`note` 短代码渲染带边框的提示框,共五种形态:`note`(默认)、`info`、`tip`、`warning`、`danger`——各自配有独立的图标与颜色。可选 `title` 覆盖语言默认标题:

````markdown
{{</* note */>}}
这是一条**注意**——与上下文相辅的背景信息。
{{</* /note */>}}

{{</* note type="warning" title="当心" */>}}
`type` 决定图标与颜色;`title` 覆盖默认标题。
{{</* /note */>}}
````

{{< note >}}
这是一条**注意**——与上下文相辅的背景信息。
{{< /note >}}

{{< note type="info" >}}
**信息**用于陈述事实:版本、出处、背景。
{{< /note >}}

{{< note type="tip" >}}
**提示**标记省时省力的捷径与技巧。
{{< /note >}}

{{< note type="warning" >}}
**警告**强调可能让读者付出代价的易错点。
{{< /note >}}

{{< note type="danger" title="当心" >}}
**危险**标记破坏性、不可逆的操作。
{{< /note >}}

## Markdown 告警

如果更愿意停留在 Markdown 语法内,GitHub 告警引用块会渲染为同样的五种提示框样式——GitHub 的关键词映射到主题类型:

| 引用块 | 提示框 |
| --- | --- |
| `> [!NOTE]` | note |
| `> [!IMPORTANT]` | info |
| `> [!TIP]` | tip |
| `> [!WARNING]` | warning |
| `> [!CAUTION]` | danger |

关键词后可跟自定义标题(Obsidian 语法,GitHub 会忽略):

````markdown
> [!WARNING] 当心
> 强调易错点与破坏性操作。
````

> [!NOTE]
> 渲染效果与 `note` 短代码完全一致——图标与颜色相同。

> [!TIP]
> 标记省时省力的捷径与技巧。

> [!CAUTION]
> 标记破坏性、不可逆的操作。

普通引用块保持原有朴素样式,不受告警钩子影响:

> 一条普通引用块。

## 折叠区块

`details` 短代码渲染原生 `<details>` 折叠块——无需 JavaScript。必须提供 `summary`,可选 `open` 标志使区块默认展开:

````markdown
{{</* details summary="主题内置了什么?" */>}}
两个短代码:`note` 与 `details`。
{{</* /details */>}}

{{</* details summary="默认展开" open=true */>}}
通过 `open` 标志渲染。
{{</* /details */>}}
````

{{< details summary="主题内置了什么?" >}}
两个短代码:`note` 与 `details`。
{{< /details >}}

{{< details summary="默认展开" open=true >}}
通过 `open` 标志渲染。
{{< /details >}}
