# Ferro

🌐 **English** | [简体中文](README.zh-CN.md)

A Hugo blog theme forked from [Rusty Typewriter](https://github.com/math-queiroz/rusty-typewriter), keeping its retro typewriter character and adding built-in bilingual (English & Simplified Chinese) support. Built for personal blogs and writing.

## Features

- Responsive layout for desktop and mobile
- Light/dark theme switcher
- **Bilingual i18n**: translation tables in `i18n/en.yaml` and `i18n/zh.yaml`; the language switcher in the navbar jumps to the current page's counterpart in the other language
- **Built-in search (FlexSearch)**: a separate index per language (`/searchindex.json` for English, `/zh/searchindex.json` for Chinese), with friendly empty-query and no-results states
- Side pane, table of contents, related posts
- Data-driven social links; side pane static content lives in the home page front matter (`ferro.side`) and can be localized per language
- Taxonomies (tags, topics, series)

## Requirements

- [Hugo](https://gohugo.io/installation/) ≥ 0.158.0

## Quick Start

```sh
# 1. Create a new site
hugo new site my-blog
cd my-blog

# 2. Install the theme
git clone https://github.com/dangpangch/ferro themes/ferro

# 3. Enable the theme in hugo.yaml
# theme: ferro

# 4. Create a post
hugo new content content/posts/first-post.md

# 5. Preview locally
hugo server -D
```

### Use as a Hugo module (recommended)

```sh
hugo mod init github.com/<you>/my-blog
```

Then import the theme in `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/dangpangch/ferro
```

Fetch the module and its Node dependencies, then preview:

```sh
hugo mod tidy
hugo mod npm pack   # consolidates the Tailwind CSS CLI declared in package.hugo.json
npm install
hugo server
```

Requires Hugo ≥ 0.159.0. See the [ferro-starter-template](https://github.com/dangpangch/ferro-starter-template) for a ready-made site.

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
- **Home greetings**: defaults come from i18n (`home_greetings` / `home_text`) and can be overridden in `data/ferro/content.yaml`; an ASCII-art banner from `data/ferro/content.yaml` (`home.asciiArt`) is rendered on the home page and can be toggled with `ferro.home.showASCIIArt`
- **Side pane content**: defined in the home page front matter (`ferro.side`) and translated per language; resolution order is current language → default language → data file

To turn i18n off entirely (single-language site), set `ferro.enablei18n` to `false` — the
language switcher is hidden and the logo always links to the `defaultContentLanguage` home:

```yaml
params:
  ferro:
    enablei18n: false
```

## Colors & Theme

Theme colors are CSS custom properties in `assets/css/main.css`, organized in
two layers:

- **Palette** (inside `@theme`): the only place raw color values live, as
  `-light` / `-dark` pairs per role — `--color-bg-*` (page background),
  `--color-fg-*` (body text), `--color-muted-*` (secondary text),
  `--color-accent-*` (links & accents), `--color-border-*`,
  `--color-selection-*`.
- **Semantic tokens**: mode-neutral names (`--color-bg`, `--color-fg`,
  `--color-muted`, `--color-accent`, `--color-border`, `--color-selection`)
  that all components reference. A single `:root[color-scheme="dark"]` block
  re-maps them to the dark palette when the navbar switcher (or the system
  preference) enables dark mode.

To restyle the theme:

1. Edit the `-light` / `-dark` palette pairs in `assets/css/main.css`.
2. Rebuild with `npm run build`.

To add a new color role: add a palette pair, a semantic token, and its dark
re-map, then use it as a utility (`text-<name>`, `bg-<name>`) or via
`var(--color-<name>)`.

## Development

```sh
npm install       # Install dependencies (Tailwind CSS, Prettier, @tabler/icons)
npm run icons     # Regenerate the icon sprite from @tabler/icons (outline, 16px, stroke 2)
npm run dev       # hugo server (runs `icons` first)
npm run build     # hugo --minify --gc (runs `icons` first)
```

## Icons

Icons come from [Tabler Icons](https://tabler.io/icons) (`@tabler/icons`, outline
style, 16px UI-control size, stroke 2, `currentColor` so they follow the theme
palette).

- **Source of truth**: `scripts/icons.config.mjs` maps each icon name to its
  Tabler icon name.
- **Build**: `npm run icons` extracts the used icons into
  `assets/icons/tabler.svg` (a subset sprite, ~6KB), served through Hugo's
  asset pipeline.
- **Usage**: `{{ partial "icon.html" (dict "name" "search") }}` renders one
  icon directly (optional `size` and `class` keys).
- **Adding an icon**: add a mapping line, run `npm run icons`, commit the
  regenerated sprite.

The generated `assets/icons/tabler.svg` is committed so the theme builds even
without running `npm install`.

## TODO

- [ ] Fonts: subset the Zira WOFF2 files to reduce font file size, or use preloading, or limit the fonts

## Credits

This theme is based on [Rusty Typewriter](https://github.com/math-queiroz/rusty-typewriter); thanks to the original author [Matheus Queiroz](https://github.com/math-queiroz) for the open-source contribution.
