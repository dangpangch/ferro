---
title: 安装
description: 将 ferro 加入全新或已有的 Hugo 站点。
date: 2026-08-01
weight: 1
---

ferro 是标准的 Hugo module 主题,使用方无需额外的 npm 构建步骤。

## 环境要求

- Hugo **0.158.0** 或更新版本(标准版即可)
- Git,用于 module 方式安装

## 以 Hugo module 安装

```bash
hugo mod init example.com/site
hugo mod get github.com/dangpangch/ferro
```

然后在 `hugo.yaml` 中引入主题:

```yaml
module:
  imports:
    - path: github.com/dangpangch/ferro
```

## 启动开发服务器

```bash
hugo server
```

打开 <http://localhost:1313>,内容改动会即时重建。

## 下一步

继续阅读[配置](/zh/docs/getting-started/configuration/)一章,接好菜单与多语言。
