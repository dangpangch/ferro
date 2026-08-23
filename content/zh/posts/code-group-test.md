---
title: 代码组测试
---

````md
使用 ```lang {group="id" tab="Label"} 围栏选项将代码块分组。
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

中间隔了段落——这一组必须保持分离。

```js {group="split" tab="B"}
// split run B
```
