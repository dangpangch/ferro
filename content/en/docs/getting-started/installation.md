---
title: Installation
description: Add ferro to an existing or brand-new Hugo site.
date: 2026-08-01
weight: 1
---

ferro is a standard Hugo module theme — no npm build step is required on the
consumer side beyond what Hugo runs itself.

## Requirements

- Hugo **0.158.0** or newer (standard edition is enough)
- Git, for module-based installation

## Install as a Hugo module

```bash
hugo mod init example.com/site
hugo mod get github.com/dangpangch/ferro
```

Then add the theme to `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/dangpangch/ferro
```

## Start the dev server

```bash
hugo server
```

Open <http://localhost:1313> — the site rebuilds as you edit content.

## Next steps

Continue with [Configuration](/docs/getting-started/configuration/) to wire
up menus and languages.
