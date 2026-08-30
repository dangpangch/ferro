---
title: "Shortcodes"
linkTitle: "Shortcodes"
description: "Callouts and collapsible sections."
date: 2023-01-01T08:00:00-07:00
weight: 3
---

The theme ships two content shortcodes. Both take Markdown inside; the inner content is rendered through the page's Markdown pipeline. Nesting one shortcode inside another (a callout inside a collapsible, say) also works, provided [`markup.goldmark.renderer.unsafe`](https://gohugo.io/configuration/markup/#renderer) is enabled — the theme's default config, the [starter template](https://github.com/dangpangch/ferro-starter-template) and this demo site set it; add it to your own `markup` block if you define one.

## Callouts

The `note` shortcode renders a bordered callout box in five flavors: `note` (the default), `info`, `tip`, `warning` and `danger` — each with its own icon and color. An optional `title` overrides the language-default heading:

```markdown
{{</* note */>}}
This is a **note** — supporting information that fits the surrounding text.
{{</* /note */>}}

{{</* note type="warning" title="Careful" */>}}
The `type` selects icon and color; `title` overrides the heading.
{{</* /note */>}}
```

{{< note >}}
This is a **note** — supporting information that fits the surrounding text.
{{< /note >}}

{{< note type="info" >}}
**Info** carries factual context: versions, references, background.
{{< /note >}}

{{< note type="tip" >}}
**Tip** marks a shortcut or a trick that saves time.
{{< /note >}}

{{< note type="warning" >}}
**Warning** highlights pitfalls that can cost the reader time.
{{< /note >}}

{{< note type="danger" >}}
**Danger** flags destructive operations and irreversible actions.
{{< /note >}}

## Markdown alerts

If you prefer staying in Markdown, GitHub alert blockquotes render with the same five callout styles — GitHub's keywords map onto the theme's types:

| Blockquote | Callout |
| --- | --- |
| `> [!NOTE]` | note |
| `> [!IMPORTANT]` | info |
| `> [!TIP]` | tip |
| `> [!WARNING]` | warning |
| `> [!CAUTION]` | danger |

A custom title can follow the keyword (Obsidian syntax, ignored by GitHub):

```markdown
> [!WARNING] Careful
> Highlights pitfalls and destructive operations.
```

> [!NOTE]
> This renders with the same icon and color as the `note` shortcode.

> [!TIP]
> Marks a shortcut or a trick that saves time.

> [!CAUTION]
> Flags destructive operations and irreversible actions.

Regular blockquotes keep their plain styling, untouched by the alert hook:

> A regular blockquote.

## Collapsible sections

The `details` shortcode renders a native `<details>` disclosure — no JavaScript. It requires a `summary` and accepts an optional `open` flag to render expanded:

```markdown
{{</* details summary="What ships with the theme?" */>}}
Two shortcodes: `note` and `details`.
{{</* /details */>}}

{{</* details summary="Expanded by default" open=true */>}}
Rendered with the `open` flag.
{{</* /details */>}}
```

{{< details summary="What ships with the theme?" >}}
Two shortcodes: `note` and `details`.
{{< /details >}}

{{< details summary="Expanded by default" open=true >}}
Rendered with the `open` flag.
{{< /details >}}
