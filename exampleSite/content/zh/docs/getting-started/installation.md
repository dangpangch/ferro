---
title: "安装"
linkTitle: "安装"
description: "环境要求与首次运行。"
date: 2023-01-01T08:00:00-07:00
weight: 1
---

## 环境要求

- [Hugo](https://gohugo.io/installation/) ≥ 0.158.0
- 使用 Hugo Modules 时需要 [Go](https://go.dev/doc/install)
- Tailwind CSS CLI 需要 [Node.js](https://nodejs.org/)

## 以 Hugo module 方式使用

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

## 以 git submodule 方式使用

```bash
git clone https://github.com/dangpangch/ferro themes/ferro
echo 'theme: ferro' >> hugo.yaml
hugo server
```
