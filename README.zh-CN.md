# HugoPress

🌐 [English](README.md) | **简体中文**

一个基于 [Rusty Typewriter](https://github.com/math-queiroz/rusty-typewriter) 二次开发的 Hugo 博客主题，延续其复古打字机风格，内置中英双语支持，适合个人博客与写作。

## 特性

- 响应式布局，适配桌面与移动端
- 明暗主题切换
- **中英双语（i18n）**：翻译表位于 `i18n/en.yaml`、`i18n/zh.yaml`；导航栏语言切换按钮自动跳转当前页面的对应语言版本
- **内置搜索（FlexSearch）**：按语言生成独立索引（英文 `/searchindex.json`、中文 `/zh/searchindex.json`），空查询与无结果均有友好提示
- 侧边栏、目录、相关文章
- 数据驱动的侧边栏社交链接；侧边栏静态内容定义在首页 front matter（`hugopress.side`），支持按语言本地化
- 分类、系列、主题（Taxonomies）支持

## 要求

- [Hugo](https://gohugo.io/installation/) ≥ 0.158.0

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
hugo new content content/posts/first-post.md

# 5. 本地预览
hugo server -D
```

## 多语言

主题默认配置英文（`/`）与简体中文（`/zh/`），通过 `languages` 配置：

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

各层的本地化方式：

- **内容**：每种语言独立 `contentDir`，同路径文件自动关联为翻译对；语言按钮可切换当前页面的语言版本
- **界面文案**：`i18n/<lang>.yaml` 翻译表，模板中用 `{{ T "key" }}` 渲染，缺失键自动回退默认语言（`hugo --printI18nWarnings` 可排查缺失）
- **首页问候语**：默认来自 i18n（`home_greetings` / `home_text`），可在 `data/hugopress/content.yaml` 中覆盖
- **侧边栏内容**：定义在首页 front matter（`hugopress.side`），按语言各自翻译；解析顺序为当前语言 → 默认语言 → data 文件回退

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
