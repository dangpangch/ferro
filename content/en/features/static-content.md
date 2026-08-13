---
title: "Static Content"
date: "2025-03-24T23:00:00-03:00"
series: ["content", "features"]
---

Some of the site's static content — the home greetings and the side pane content — is localized per language.

## Home greetings

The home page greeting and description default to the theme's [i18n translation tables]({{< ref "/features/internationalization" >}}) (`home_greetings` and `home_text` keys), so they follow the site's current language automatically.

To override them, define the values in `data/hugopress/content.yaml` — data values always win over the i18n defaults:

```yaml
home:
  image: "images/greetings.jpg"
  greetings: "A Hugo Theme for Bloggers!"
  text: "The definitive, configurable, customizable, old fashioned rusty coloured theme for web writers and readers."
```

> Note: It's possible to use file formats other than YAML, but the key structure must remain the same!
> Image paths (like `image` above) are resolved against the site root (`absURL`), so relative paths work regardless of the page's language subdirectory (e.g. under `/zh/`).

## Side pane content

The side pane items (shown on the home page and on single pages) are defined in the **home page's front matter** (`content/<lang>/_index.md`), so each language can have its own translation:

```yaml
hugopress:
  side:
    home:
      - content: "Oh, and did I mention it has support for static side pane content? Cool, right?"
      - title: "Media Support"
        content: "Side content can have images!"
        imagePath: "images/hugo.svg"
        imageHref: "https://gohugo.io"
        imageWidth: "100%"
    single:
      - title: "Static Content"
        content: "Single pages can also have static content!"
```

Resolution order: the current language's home front matter, then the default language's home front matter (for untranslated pages), then the global `data/hugopress/content.yaml` as a legacy fallback.

> Didn't find a value you're looking for? Check the [repository](https://github.com/dangpangch/hugopress) for the given file (which may be updated with it), or create a new feature request!
