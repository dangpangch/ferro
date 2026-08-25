# Ferro

🌐 [English](README.md) | **简体中文**

一个基于 [Rusty Typewriter](https://github.com/math-queiroz/rusty-typewriter) 二次开发的 Hugo 博客主题，延续其复古打字机风格，内置中英双语支持，适合个人博客与写作。

## 特性

- 响应式布局，适配桌面与移动端
- 明暗主题切换
- **中英双语（i18n）**：翻译表位于 `i18n/en.yaml`、`i18n/zh.yaml`；导航栏语言切换按钮自动跳转当前页面的对应语言版本
- **内置搜索（FlexSearch）**：按语言生成独立索引（英文 `/searchindex.json`、中文 `/zh/searchindex.json`），空查询与无结果均有友好提示
- 侧边栏、目录、相关文章
- 数据驱动的侧边栏社交链接；侧边栏静态内容定义在首页 front matter（`ferro.side`），支持按语言本地化
- 分类、系列、主题（Taxonomies）支持

## 要求

- [Hugo](https://gohugo.io/installation/) ≥ 0.158.0

## 快速开始

```sh
# 1. 新建站点
hugo new site my-blog
cd my-blog

# 2. 安装主题
git clone https://github.com/dangpangch/ferro themes/ferro

# 3. 在 hugo.yaml 中启用主题
# theme: ferro

# 4. 新建文章
hugo new content content/posts/first-post.md

# 5. 本地预览
hugo server -D
```

### 以 Hugo module 方式使用(推荐)

```sh
hugo mod init github.com/<you>/my-blog
```

然后在 `hugo.yaml` 中引入主题:

```yaml
module:
  imports:
    - path: github.com/dangpangch/ferro
```

拉取模块及其 Node 依赖,然后预览:

```sh
hugo mod tidy
hugo mod npm pack   # 汇总 package.hugo.json 中声明的 Tailwind CSS CLI 依赖
npm install
hugo server
```

需要 Hugo ≥ 0.159.0。可直接使用 [ferro-starter-template](https://github.com/dangpangch/ferro-starter-template) 快速建站。

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
- **首页问候语**：默认来自 i18n（`home_greetings` / `home_text`），可在 `data/ferro/content.yaml` 中覆盖；首页还会渲染 `data/ferro/content.yaml` 中的 ASCII 艺术横幅（`home.asciiArt`），可通过 `ferro.home.showASCIIArt` 开关控制
- **侧边栏内容**：定义在首页 front matter（`ferro.side`），按语言各自翻译；解析顺序为当前语言 → 默认语言 → data 文件回退

如需完全关闭 i18n（单语言站点），将 `ferro.enablei18n` 设为 `false` —— 语言切换按钮会隐藏，logo 始终链接到 `defaultContentLanguage` 首页：

```yaml
params:
  ferro:
    enablei18n: false
```

## 配色与主题

主题颜色以 CSS 自定义属性定义在 `assets/css/main.css`,分为两层:

- **调色板层**(`@theme` 块内):唯一写原始色值的地方,每个角色一对
  `-light` / `-dark` —— `--color-bg-*`(页面背景)、`--color-fg-*`(正文文字)、
  `--color-muted-*`(次要文字)、`--color-accent-*`(链接与强调色)、
  `--color-border-*`、`--color-selection-*`。
- **语义层**:模式中性的名称(`--color-bg`、`--color-fg`、`--color-muted`、
  `--color-accent`、`--color-border`、`--color-selection`),所有组件只引用
  这一层。导航栏切换按钮(或系统偏好)开启深色模式时,`main.css` 中的
  `:root[color-scheme="dark"]` 块统一把它们重映射到深色值。

自定义配色:

1. 编辑 `assets/css/main.css` 中的 `-light` / `-dark` 调色板对。
2. 执行 `npm run build` 重新构建。

新增颜色角色:添加一对调色板值、一个语义 token 及其深色重映射,即可通过
`text-<名称>`、`bg-<名称>` 等工具类或 `var(--color-<名称>)` 使用。

## 开发

```sh
npm install       # 安装依赖（Tailwind CSS、Prettier、@tabler/icons）
npm run icons     # 从 @tabler/icons 重新生成图标 sprite（outline、16px、stroke 2）
npm run dev       # hugo server（先执行 icons）
npm run build     # hugo --minify --gc（先执行 icons）
```

## 图标

图标来自 [Tabler Icons](https://tabler.io/icons)（`@tabler/icons`，outline 描边风格，UI 控件尺寸 16px，stroke 2，使用 `currentColor` 跟随主题配色）。

- **事实来源**：`scripts/icons.config.mjs` 维护图标名 → Tabler 图标名的映射
- **构建**：`npm run icons` 将用到的图标提取到 `assets/icons/tabler.svg`（子集 sprite，约 6KB），经 Hugo 资源管线发布
- **用法**：`{{ partial "icon.html" (dict "name" "search") }}` 直接渲染单个图标（可选 `size`、`class` 参数）
- **新增图标**：在映射文件加一行，运行 `npm run icons`，提交重新生成的 sprite

生成的 `assets/icons/tabler.svg` 已提交进仓库，因此不运行 `npm install` 也能正常构建。

## TODO List

- [ ] fonts: 对字体Zira的Woff2文件做子集化，减少字体文件体积 OR 使用预加载 OR 对字体进行限制

## 致谢

本主题基于 [Rusty Typewriter](https://github.com/math-queiroz/rusty-typewriter) 开发，感谢原作者 [Matheus Queiroz](https://github.com/math-queiroz) 的开源贡献。
