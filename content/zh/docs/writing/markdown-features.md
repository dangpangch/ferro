---
title: Markdown 特性
description: 开箱即用的代码块、表格、图片与提示块。
date: 2026-08-04
weight: 2
---

ferro 为完整的 CommonMark 语法以及表格和 Chroma 高亮的围栏代码提供排版样式。

## 代码块

围栏代码经 Chroma 以 class 形式输出 token,由 gruvbox 配色在两种模式下着色:

````markdown
```js
export const greet = (name) => `Hello, ${name}!`;
```
````

行内代码带有轻微的底纹处理,在纸色与炭色背景上都保持可读。

## 表格

| 特性 | 状态 |
| ---- | ---- |
| 暗色模式 | 已支持 |
| 站内搜索 | 已支持 |
| 多语言 | 已支持 |

过宽的表格会横向滚动,不会撑破版心。

## 图片

图片居中显示、带圆角,并配有与主题签名线一致的细边框。Markdown 的
figure 语法照常可用。
