---
title: "Markdown 特性"
linkTitle: "Markdown"
description: "代码高亮、图片与属性。"
date: 2023-01-01T08:00:00-07:00
weight: 2
---

## 代码

基于 class 的 Chroma token,由 gruvbox 样式表着色,支持明暗模式:

```js
export function hello(name) {
  console.log(`你好,${name}!`);
}
```

## 图片

独立图片会输出为 `<figure>`,并支持块属性:

![占位图](https://placehold.co/600x300/png "来自 title 属性的题注")

## 标题锚点

可以为标题附加 id 以便深链:

## 自定义锚点 {#custom-anchor}

然后链接过去:[跳转](#custom-anchor)。
