---
title: Code Group Test
---

````md
Use the ```lang {group="id" tab="Label"} fence option to group blocks.
````

```js {group="hello" tab="JavaScript"}
console.log("hello");
```

```ts {group="hello" tab="TypeScript"}
const x: string = "hello";
```

```bash
echo "not grouped"
```

```js {group="split" tab="A"}
// split run A
```

Paragraph between — this run must stay separate.

```js {group="split" tab="B"}
// split run B
```
