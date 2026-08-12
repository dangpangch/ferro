# HugoPress

一个基于 [Rusty Typewriter](https://github.com/math-queiroz/rusty-typewriter) 二次开发的 Hugo 博客主题，延续其复古打字机风格，适合个人博客与写作。

## 特性

- 响应式布局，适配桌面与移动端
- 明暗主题切换
- 内置搜索（FlexSearch）
- 侧边栏、目录、相关文章
- 分类、系列、主题（Taxonomies）支持

## 要求

- [Hugo](https://gohugo.io/installation/) ≥ 0.146.0

## 快速开始

```sh
# 1. 新建站点
hugo new site my-blog
cd my-blog

# 2. 安装主题
git clone https://github.com/dangpangch/hugopress themes/hugopress

# 3. 在 hugo.yaml 中启用主题
# theme: hugopress

# 4. 新建文章
hugo new content posts/first-post.md

# 5. 本地预览
hugo server -D
```

## 开发

```sh
npm install       # 安装依赖（Tailwind CSS、Prettier）
npm run dev       # hugo server
npm run build     # hugo --minify --gc
```

## TODO List

- [ ] fonts: 对字体Zira的Woff2文件做子集化，减少字体文件体积 OR 使用预加载 OR 对字体进行限制

## 致谢

本主题基于 [Rusty Typewriter](https://github.com/math-queiroz/rusty-typewriter) 开发，感谢原作者 [Matheus Queiroz](https://github.com/math-queiroz) 的开源贡献。
