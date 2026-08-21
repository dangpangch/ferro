---
title: Markdown Features
description: Code blocks, tables, images, and callouts out of the box.
date: 2026-08-04
weight: 2
---

ferro styles the full CommonMark surface plus tables and fenced code with
Chroma highlighting.

## Code blocks

Fenced code renders through Chroma with class-based tokens, coloured by the
gruvbox palette in both modes:

````markdown
```js
export const greet = (name) => `Hello, ${name}!`;
```
````

Inline code gets a subtle chip treatment that stays readable on paper and
charcoal alike.

## Tables

| Feature | Status |
| ------- | ------ |
| Dark mode | Shipped |
| Search | Shipped |
| i18n | Shipped |

Wide tables scroll horizontally instead of breaking the column.

## Images

Images are centred, rounded, and carry a hairline border matching the theme's
signature lines. Markdown figure syntax works as usual.
