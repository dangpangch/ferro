---
title: "静态内容"
date: "2025-03-24T23:00:00-03:00"
series: ["内容", "功能"]
---

站点上的一些静态内容——首页问候语与侧边栏内容——会按语言进行本地化。

## 首页问候语

首页的问候语与描述默认来自主题的 [i18n 翻译表]({{< ref "/features/internationalization" >}})（`home_greetings` 与 `home_text` 键），因此会自动跟随站点当前语言。

如需覆盖，可以在 `data/hugopress/content.yaml` 中定义这些值——data 中的值总是优先于 i18n 默认值：

```yaml
home:
  image: "images/greetings.jpg"
  greetings: "A Hugo Theme for Bloggers!"
  text: "The definitive, configurable, customizable, old fashioned rusty coloured theme for web writers and readers."
```

> 注意：可以使用 YAML 以外的文件格式，但键的结构必须保持一致！
> 图片路径（如上面的 `image`）会基于站点根目录解析（`absURL`），因此相对路径在页面的语言子目录（如 `/zh/`）下也能正常工作。

## 侧边栏内容

侧边栏条目（显示在首页与单篇页面上）定义在**首页的 front matter** 中（`content/<lang>/_index.md`），因此每种语言都可以有自己的翻译：

```yaml
hugopress:
  side:
    home:
      - content: "哦，我有没有提过它支持静态侧边栏内容？很酷吧？"
      - title: "媒体支持"
        content: "侧边栏内容可以包含图片！"
        imagePath: "images/hugo.svg"
        imageHref: "https://gohugo.io"
        imageWidth: "100%"
    single:
      - title: "静态内容"
        content: "单篇页面也可以有静态内容！"
```

解析顺序：当前语言的首页 front matter → 默认语言的首页 front matter（用于未翻译的页面）→ 全局 `data/hugopress/content.yaml`（作为旧版回退）。

> 没有找到你需要的配置？请在[仓库](https://github.com/dangpangch/hugopress)中查看对应文件（其中可能已经更新），或者创建一个新的功能请求！
