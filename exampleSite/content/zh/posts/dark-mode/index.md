---
title: "深色主题"
img: cover.png
featured: true
date: "2025-03-24T23:00:00-03:00"
tags: ["指南"]
topics: ["文档"]
series: ["样式", "功能"]
---

通过导航栏右侧的切换图标，可以在深色与浅色模式之间切换主题。你的选择会保存在 `localStorage` 中；首次访问时跟随系统偏好。

## 配色结构

主题颜色全部以 CSS 自定义属性定义在 `assets/css/main.css` 中：

- **调色板层**——位于 `@theme` 块内，是唯一写原始色值的地方。每个角色一对 `-light` / `-dark`：

  | 角色         | 浅色                      | 深色                     |
  | ------------ | ------------------------- | ------------------------ |
  | 页面背景     | `--color-bg-light`        | `--color-bg-dark`        |
  | 正文文字     | `--color-fg-light`        | `--color-fg-dark`        |
  | 次要文字     | `--color-muted-light`     | `--color-muted-dark`     |
  | 强调色与链接 | `--color-accent-light`    | `--color-accent-dark`    |
  | 边框         | `--color-border-light`    | `--color-border-dark`    |
  | 文本选中     | `--color-selection-light` | `--color-selection-dark` |

  代码块在两种模式下共用 `--color-code-bg` / `--color-code-text`；语法高亮有独立的配色文件 `assets/css/code/gruvbox-light.css` 与 `assets/css/code/gruvbox-dark.css`。

- **语义层**——模式中性的名称，如 `--color-bg`、`--color-fg`、`--color-muted`、`--color-accent`、`--color-border`、`--color-selection`。组件只引用这一层，因此切换模式即可整体换色。

深色模式在 `<html>` 带有 `color-scheme="dark"` 属性时生效（由 `assets/js/_theme.js` 设置）。`main.css` 中一个块负责把所有语义 token 重映射到深色值：

```css
:root[color-scheme="dark"] {
  --color-bg: var(--color-bg-dark);
  --color-fg: var(--color-fg-dark);
  /* ... */
}
```

## 自定义配色

1. 打开 `assets/css/main.css`，在 `@theme` 的调色板中修改对应角色的 `-light` / `-dark` 两个值。
2. 执行 `npm run build` 重新构建。

无需改动组件——所有组件都引用语义 token，会自动套用新颜色。

### 新增颜色角色

1. 在调色板中添加一对 `-light` / `-dark`，例如 `--color-success-light` / `--color-success-dark`。
2. 添加语义 token `--color-success: var(--color-success-light)`。
3. 在 `:root[color-scheme="dark"]` 块中补上 `--color-success: var(--color-success-dark)`。
4. 即可使用 `text-success`、`bg-success`、`border-success` 等工具类，或在组件 CSS 中使用 `var(--color-success)`。
