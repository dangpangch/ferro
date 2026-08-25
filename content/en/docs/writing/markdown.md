---
title: "Markdown Features"
linkTitle: "Markdown"
description: "Code highlighting, figures and attributes."
date: 2023-01-01T08:00:00-07:00
weight: 2
---

## Code

Class-based Chroma tokens colored by gruvbox stylesheets, with light/dark support:

```js
export function hello(name) {
  console.log(`Hello, ${name}!`);
}
```

## Images

Standalone images become `<figure>`; block attributes are enabled:

![Placeholder](https://placehold.co/600x300/png "Caption from title attribute")

## Headings with anchors

Attach ids for deep links:

## Custom anchor {#custom-anchor}

Then link to it: [jump](#custom-anchor).
