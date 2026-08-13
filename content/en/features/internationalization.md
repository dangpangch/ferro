---
title: "Internationalization"
date: "2025-03-24T23:00:00-03:00"
---

HugoPress supports internationalization (i18n) translation tables for localizing its interface strings. The theme ships with English and Simplified Chinese tables (`i18n/en.yaml` and `i18n/zh.yaml`); missing keys fall back to the default language automatically, and you can add your own translations in the `i18n/<lang>.yaml` directory of your site.

```yaml
# Root
theme_light: Light Theme
theme_dark: Dark Theme

# Footer
scroll_top: Scroll to Top
footer: Made with ❤️ and powered by {{ .ThemeAnchor }} theme for {{ .HugoAnchor }}

# Home
featured_posts: Featured Posts
recent_posts: Recent Posts

# SidePane for home
search: Search...
see_all: See all...

# Page
breadcrumb_home: Home

# Header
switch_language: Switch language

# Home greetings
home_greetings: A Hugo Theme for Bloggers!
home_text: The definitive, configurable, customizable, old fashioned rusty coloured theme for web writers and readers.

# SidePane for single pages
details_words: words
details_read_time: minutes read
side_table_of_contents: Table Of Contents
side_attachments: Attachments
side_related: Related
```

> **Note:** Didn't find a value you're looking for? Check the [repository](https://github.com/dangpangch/hugopress) for the given file (which may be updated with it), or create a new feature request!
