---
title: "Hugo 如何合并主题配置"
description: "主题配置如何传递到站点配置：合并链路、三种 _merge 策略,以及我们在开发 ferro 时踩过的坑。"
date: 2026-08-29T12:00:00+08:00
tags: ["guide"]
topics: ["documentation"]
---

Hugo 主题可以自带 `hugo.yaml`,其中的配置会安静地成为每个安装该主题的站点的默认值——直到站点自己覆盖它。这篇文章梳理这套机制,包括我们在开发 ferro 时踩过的坑(全部通过探针键和 `hugo config` 实证,非猜测)。

## 合并链路

Hugo 将主题与模块的配置合并进项目配置,项目永远赢。当 `theme = ['theme-a', 'theme-b']` 时,顺序为:

1. 项目 `hugo.yaml` —— 优先级最高
2. theme-a
3. theme-b

## 三种合并策略

每个顶层配置键有独立的合并策略,由键内的 `_merge` 控制。三个取值:

| 策略 | 含义 |
| --- | --- |
| `none` | 不合并——主题值永远不会到达站点 |
| `shallow` | 只补站点未定义的键 |
| `deep` | 新键照加,已有 map 递归合并;叶级冲突时站点赢 |

两条硬限制:只有 **map** 能合并——slice 整体替换、绝不拼接;`_merge` 向下继承,可以在高层设置一次。

## 真正要紧的默认策略表

| 配置键 | 默认策略 |
| --- | --- |
| `params` | deep |
| `languages.<lang>.params` | deep |
| `menus`、`languages.<lang>.menus` | shallow |
| `markup`、`taxonomies`、`related`、`outputs`、`outputFormats`、`mediaTypes`、`build`、`security`、`module` 等 | none |

实际含义:主题的 `params` 确实成为站点默认(消费者覆盖一个叶,其余保留);主题默认菜单只补站点没定义的菜单名;而 none 组完全不会跨越主题边界。

## 开发 ferro 踩过的坑

**none 类键不传导。** 主题无法为 `markup`、`taxonomies`、`related` 提供可用默认——站点必须自己声明。本演示站配置里保留了镜像副本:图片渲染钩子依赖的 goldmark `wrapStandAloneImageWithinParagraph`、`topics`/`series` 分类法、`related` 索引。需要时请复制到你的站点配置。

**语言块很挑剔。** 只存在于主题中的语言不会注入站点(有哪些语言由站点决定);而只携带 `params` 的语言块什么也合并不进来——这也是 ferro 把分语言阅读速度默认值放进模板代码、而非主题 `languages` 块的原因。

**用 `hugo config` 验证。** `hugo config` 打印合并后的生效配置——回答"主题的值到底生效没有"最快的方式。更微妙的情况,往主题配置里塞一个一次性探针键,跑 `hugo config`,看它出现在哪、是否出现。

## 给主题作者的建议

- 在主题配置里维护一份完整的默认值注册表——一个权威文件列全所有选项及默认值——并在文档中镜像它,两边就不会悄悄漂移。
- 只在配置是正确归宿时才把默认值放进配置;结构性回退(排序、分组)和合并怪癖的变通属于模板,并注释原因。
- 永远不要假设合并行为:动手探测。

参考:[Hugo 文档 —— Configuration](https://gohugo.io/configuration/introduction/)
