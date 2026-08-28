---
title: "Installation"
linkTitle: "Installation"
description: "Requirements and first run."
date: 2023-01-01T08:00:00-07:00
weight: 1
---

## Requirements

- [Hugo](https://gohugo.io/installation/) ≥ 0.158.0
- [Go](https://go.dev/doc/install) when using Hugo modules
- [Node.js](https://nodejs.org/) for the Tailwind CSS CLI

## As a Hugo module

```yaml
module:
  imports:
    - path: github.com/dangpangch/ferro
```

```bash
hugo mod tidy
hugo mod npm pack && npm install
hugo server
```

## As a git submodule

```bash
git clone https://github.com/dangpangch/ferro themes/ferro
echo 'theme: ferro' >> hugo.yaml
hugo server
```
