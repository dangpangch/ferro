# HugoPress

🌐 **English** | [简体中文](README.zh-CN.md)

A Hugo blog theme forked from [Rusty Typewriter](https://github.com/math-queiroz/rusty-typewriter), keeping its retro typewriter character and adding built-in bilingual (English & Simplified Chinese) support. Built for personal blogs and writing.

## Features

- Responsive layout for desktop and mobile
- Light/dark theme switcher
- **Bilingual i18n**: translation tables in `i18n/en.yaml` and `i18n/zh.yaml`; the language switcher in the navbar jumps to the current page's counterpart in the other language
- **Built-in search (FlexSearch)**: a separate index per language (`/searchindex.json` for English, `/zh/searchindex.json` for Chinese), with friendly empty-query and no-results states
- Side pane, table of contents, related posts
- Data-driven social links; side pane static content lives in the home page front matter (`hugopress.side`) and can be localized per language
- Taxonomies (tags, topics, series)

## Requirements

- [Hugo](https://gohugo.io/installation/) ≥ 0.158.0

## Quick Start

```sh
# 1. Create a new site
hugo new site my-blog
cd my-blog

# 2. Install the theme
git clone https://github.com/dangpangch/hugopress themes/hugopress

# 3. Enable the theme in hugo.yaml
# theme: hugopress

# 4. Create a post
hugo new content content/posts/first-post.md

# 5. Preview locally
hugo server -D
```

## Multilingual

The theme ships with English (`/`) and Simplified Chinese (`/zh/`) configured via `languages`:

```yaml
languages:
  en:
    weight: 1
    locale: en-US
    label: English
    contentDir: content/en
  zh:
    weight: 2
    locale: zh-CN
    label: 中文
    contentDir: content/zh
```

How each layer is localized:

- **Content**: each language has its own `contentDir`; files with the same path are automatically linked as translations, and the language switcher jumps between them
- **UI strings**: translation tables in `i18n/<lang>.yaml`, rendered with `{{ T "key" }}`; missing keys fall back to the default language (`hugo --printI18nWarnings` lists gaps)
- **Home greetings**: defaults come from i18n (`home_greetings` / `home_text`) and can be overridden in `data/hugopress/content.yaml`
- **Side pane content**: defined in the home page front matter (`hugopress.side`) and translated per language; resolution order is current language → default language → data file

## Development

```sh
npm install       # Install dependencies (Tailwind CSS, Prettier)
npm run dev       # hugo server
npm run build     # hugo --minify --gc
```

## TODO

- [ ] Fonts: subset the Zira WOFF2 files to reduce font file size, or use preloading, or limit the fonts

## Credits

This theme is based on [Rusty Typewriter](https://github.com/math-queiroz/rusty-typewriter); thanks to the original author [Matheus Queiroz](https://github.com/math-queiroz) for the open-source contribution.
