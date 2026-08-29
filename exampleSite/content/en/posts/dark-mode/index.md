---
title: "Dark Theme"
img: cover.png
date: "2025-03-24T23:00:00-03:00"
tags: ["guide"]
topics: ["documentation"]
series: ["styling", "features"]
---

Switch between dark and light mode with the switcher icon at the right of the navbar. Your choice is remembered in `localStorage`; on the first visit the theme follows your system preference.

## How the palette is organized

All theme colors are CSS custom properties defined in `assets/css/main.css`:

- **Palette** — inside the `@theme` block. Raw color values, one `-light` / `-dark` pair per role:

  | Role            | Light                     | Dark                     |
  | --------------- | ------------------------- | ------------------------ |
  | Page background | `--color-bg-light`        | `--color-bg-dark`        |
  | Body text       | `--color-fg-light`        | `--color-fg-dark`        |
  | Secondary text  | `--color-muted-light`     | `--color-muted-dark`     |
  | Accent & links  | `--color-accent-light`    | `--color-accent-dark`    |
  | Borders         | `--color-border-light`    | `--color-border-dark`    |
  | Text selection  | `--color-selection-light` | `--color-selection-dark` |

  Code blocks share `--color-code-bg` / `--color-code-text` in both modes; syntax highlighting has its own palettes in `assets/css/code/gruvbox-light.css` and `assets/css/code/gruvbox-dark.css`.

- **Semantic tokens** — mode-neutral names such as `--color-bg`, `--color-fg`, `--color-muted`, `--color-accent`, `--color-border`, `--color-selection`. Components reference only these, so a mode switch re-colors the entire site in one place.

Dark mode activates when `<html>` carries the `color-scheme="dark"` attribute (set by `assets/js/_theme.js`). A single block in `main.css` then re-maps every semantic token to its dark palette value:

```css
:root[color-scheme="dark"] {
  --color-bg: var(--color-bg-dark);
  --color-fg: var(--color-fg-dark);
  /* ... */
}
```

## Customizing colors

1. Open `assets/css/main.css` and edit the palette pairs inside `@theme` — change both the `-light` and `-dark` value of the roles you want to restyle.
2. Rebuild the site with `npm run build`.

No component changes are needed — every component reads the semantic tokens and picks up the new colors automatically.

### Adding a new color role

1. Add a `-light` / `-dark` pair to the palette, e.g. `--color-success-light` / `--color-success-dark`.
2. Add the semantic token `--color-success: var(--color-success-light)`.
3. Add its dark re-map `--color-success: var(--color-success-dark)` to the `:root[color-scheme="dark"]` block.
4. Use it: `text-success`, `bg-success`, `border-success` utilities, or `var(--color-success)` in component CSS.
