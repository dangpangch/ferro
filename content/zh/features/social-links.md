---
title: "社交链接"
date: "2026-08-13T00:00:00+08:00"
series: ["内容", "功能"]
---

社交链接会渲染在首页和单篇页面的侧边栏底部。它们定义在 `data/ferro/socials.yaml` 文件中，每个条目是一个列表项：

```yaml
- name: "GitHub"
  url: "https://github.com/dangpangch/ferro"
  icon: "github"
  handle: "@dangpangch"

- name: "RSS"
  url: "/index.xml"
  icon: "rss"
```

> 注意：可以使用 YAML 以外的文件格式，但键的结构必须保持一致！

每个条目支持以下键：

| 键       | 描述                                             | 必填                |
| -------- | ------------------------------------------------ | ------------------- |
| `name`   | 网络或站点名称；用作链接的可访问标签             | 是                  |
| `url`    | 链接目标                                         | 是                  |
| `icon`   | `github`、`x_twitter`、`mastodon`、`bluesky`、`rss`、`email`、`linkedin`、`link` 之一 | 否（默认为 `link`） |
| `handle` | 简短显示标签，例如 `@user`；省略时回退到 `name`  | 否                  |

> 没有找到你需要的配置？请在[仓库](https://github.com/dangpangch/ferro)中查看对应文件（其中可能已经更新），或者创建一个新的功能请求！
