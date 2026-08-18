---
title: "开始使用"
date: "2025-03-24T23:00:00-03:00"
tags: ["入门", "指南"]
topics: ["文档"]
featured: true
weight: 1
---

本篇文章将指导你使用此主题搭建属于自己的 Hugo 站点。它涵盖了核心部分：[安装](#安装)、[基本用法](#基本用法)以及推荐的[后续步骤](#后续步骤)。完成基础设置后，也可以再看看站点的其他[文章]({{< ref "/posts" >}})！

## 安装

本指南是 [Hugo 快速开始](https://gohugo.io/getting-started/quick-start/) 的精简版（你甚至可以说它是"更快开始"）。如果遇到任何问题或需要更全面的内容，请务必查阅它！

### 环境要求

- 对 Hugo 有基本了解（即[阅读文档](https://gohugo.io/documentation/)）
- [已安装 Hugo 命令行工具](https://gohugo.io/installation/)
- [已安装 git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### 本地搭建

1. 创建一个新的 Hugo 站点

```sh
hugo new site my-blog
```

2. 切换到新创建的目录

```sh
cd my-blog
```

3. 通过克隆 GIT 仓库来安装主题

```sh
git clone https://github.com/dangpangch/ferro themes/ferro
```

4. 创建一些包含所需内容的页面

```sh
hugo new content content/posts/first-post.md
```

5. 在本地测试你的站点

```sh
hugo server -D
```

6. 恭喜！你的站点已经在本地运行起来了。现在开始配置和自定义吧！

### 发布上线

由于构建后得到的只是纯静态站点文件（HTML、CSS 和 JS），因此有大量的流水线、托管平台和发布方式可供选择。如果你对 Hugo 最常见的方案感兴趣，可以在[这里](https://gohugo.io/hosting-and-deployment/)找到它们的列表和文档。

## 基本用法

现在你有了一个站点，管理内容的标准流程如下：

1. 使用 `hugo new content content/posts/post-name.md` 创建内容页面
2. 编辑创建的文件，写入想要的内容
3. 更新仓库并发布改动

另外，请务必阅读[内容管理文档](https://gohugo.io/content-management/)。

## 后续步骤

最后，如果你需要下一步的方向：

- 根据[样板配置文件]({{< ref "/posts/configuration" >}})调整 `hugo.toml` 配置文件；
- 通过 CSS 为你的主题站点定制样式；
- 如果你喜欢这个主题，记得给主题仓库点个 Star，支持我的工作！
