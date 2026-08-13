---
title: "Social Links"
date: "2026-08-13T00:00:00+08:00"
series: ["content", "features"]
---

Social links are rendered at the bottom of the side pane on the home page and single pages. They are defined in the file at `data/hugopress/socials.yaml`, where each entry is a list item:

```yaml
- name: "GitHub"
  url: "https://github.com/dangpangch/hugopress"
  icon: "github"
  handle: "@dangpangch"

- name: "RSS"
  url: "/index.xml"
  icon: "rss"
```

> Note: It's possible to use file formats other than YAML, but the key structure must remain the same!

Each entry supports the following keys:

| Key      | Description                                                                             | Required                |
| -------- | --------------------------------------------------------------------------------------- | ----------------------- |
| `name`   | Network or site name; used as the link's accessible label                               | yes                     |
| `url`    | Link target                                                                             | yes                     |
| `icon`   | One of `github`, `x_twitter`, `mastodon`, `bluesky`, `rss`, `email`, `linkedin`, `link` | no (defaults to `link`) |
| `handle` | Short display label, e.g. `@user`; falls back to `name` when omitted                    | no                      |

> Didn't find a value you're looking for? Check the [repository](https://github.com/dangpangch/hugopress) for the given file (which may be updated with it), or create a new feature request!
