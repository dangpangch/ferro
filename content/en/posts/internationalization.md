---
title: "Internationalization"
date: "2026-08-23T00:00:00+08:00"
---

Ferro supports internationalization (i18n) translation tables for localizing its interface strings. The theme ships with English and Simplified Chinese tables (`i18n/en.yaml` and `i18n/zh.yaml`); keys are looked up per language, and missing ones fall back to the default language automatically. You can add or override any key in your site's own `i18n/<lang>.yaml`.

## How ferro puts it together

The demo site combines three Hugo mechanisms:

1. **Translation by content directory** — each language has its own content tree (`contentDir: content/en` / `content/zh` in the configuration); files at the same path in both trees are linked as translations automatically.
2. **Per-language menus in configuration** — menu entries are defined under each language's `languages.<key>.menus`, so navigation is translated natively without extra tables.
3. **i18n translation tables** — interface strings (buttons, labels, greetings) come from the theme's translation tables described below.

```yaml
defaultContentLanguage: en

languages:
  en:
    weight: 1
    locale: en-US
    label: English
    contentDir: content/en
    menus:
      main:
        - name: Posts
          pageRef: /posts
          weight: 1
  zh:
    weight: 2
    locale: zh-CN
    label: 中文
    contentDir: content/zh
    menus:
      main:
        - name: 文章
          pageRef: /posts
          weight: 1
```

Below is a representative excerpt of the translation table (see the repository files for the full content):

```yaml
# Root
theme_light: Light Theme
theme_dark: Dark Theme

# Not found (404)
not_found_title: Whoops, page not found!
not_found_home_link: Go Home

# Footer
scroll_top: Scroll to Top
footer: Powered by {{ .ThemeAnchor }} theme for {{ .HugoAnchor }}

# Home
featured_posts: Featured Posts
recent_posts: Recent Posts

# Search
search_placeholder: Search...
search_no_results: 'No results for "%s"'

# Header
switch_language: Switch language
toggle_theme: Toggle theme

# Home greetings (overridable via data/ferro/content.yaml → home.greetings / home.text)
home_greetings: A Hugo Theme for Bloggers!
home_text: The definitive, configurable, customizable rice-white and warm-charcoal theme for web writers and readers.

# Taxonomies
taxonomies:
  tags: Tags
  topics: Topics
  series: Series

taxonomy_post_count:
  one: "{{ .Count }} post"
  other: "{{ .Count }} posts"

# Pagination
pagination_prev: ← Previous
pagination_next: Next →

# SidePane for single pages
details_words: words
details_read_time: minutes read
side_table_of_contents: Table Of Contents
side_attachments: Attachments
side_related: Related
```

A few notes:

- **Template functions**: templates read the current language's strings with `{{ T "key" }}` (or `i18n "key"`); the `footer` key receives template variables such as `{{ .HugoAnchor }}` and `{{ .ThemeAnchor }}`.
- **Plural forms**: keys like `taxonomy_post_count` use `one`/`other` sub-keys, chosen automatically by Hugo following CLDR plural rules.
- **Home greetings**: defaults to the `home_greetings`/`home_text` keys; override them per site in `data/ferro/content.yaml` under `home.greetings`/`home.text`.
- **Menus and structured content**: navigation menus are defined per language in the configuration; structured side-pane content lives in each language's home page front matter (`ferro.side`), so it is translated naturally.

> **Note:** Didn't find a value you're looking for? Check the [repository](https://github.com/dangpangch/ferro) for the given file (which may be updated), or create a new feature request!
