---
title: 配置
description: 菜单、多语言、侧栏与主题参数。
date: 2026-08-02
weight: 2
---

ferro 的全部设置都位于 `hugo.yaml` 的 `params.ferro` 键下。每一项都有合理
的默认值,空配置即可得到完整站点。

## 站点菜单

菜单就是普通 Hugo menu,指向 pageRef 的条目会渲染为顶部导航:

```yaml
languages:
  zh:
    menus:
      main:
        - name: 文章
          pageRef: /posts
          weight: 1
```

## 侧栏

右侧边栏可按页面类型分别配置——首页、列表、分类与单页各有独立开关:

```yaml
params:
  ferro:
    sidePane: true
    side:
      single:
        showTableOfContents: true
        showRelated: true
```

将 `sidePane` 设为 `false` 可收起为单栏居中布局。

## 暗色模式

ferro 内置由语义化 CSS token 驱动的明暗双配色。头部开关会把访客的选择存入
`localStorage`,并以 `prefers-color-scheme` 兜底。

| Token | 浅色 | 深色 |
| ----- | ---- | ---- |
| 背景 | 暖纸色 | 暖炭色 |
| 强调色 | 铁锈红 | 亮锈色 |
| 代码底 | Gruvbox | Gruvbox |
