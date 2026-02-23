# 青云文档 (QingYun Docs)

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/Explore114/qingyun_doc/link-check.yml?label=Link%20Check&logo=github&style=flat-square" alt="Build Status">
  <img src="https://img.shields.io/github/license/Explore114/qingyun_doc?style=flat-square" alt="License">
  <img src="https://img.shields.io/github/stars/Explore114/qingyun_doc?style=flat-square" alt="Stars">
</p>

## 📖 项目简介

**青云文档** 是基于 [VitePress](https://vitepress.dev/) 构建的高性能静态文档站点，致力于为青云系列产品提供详尽的使用指南和技术支持。本项目不仅包含了丰富的产品文档，还集成了一套**全自动化的友链管理系统**，通过 GitHub Actions 实现友链的提交、检测与合并。

## ✨ 核心特性

- 🚀 **高性能**：基于 VitePress，极速构建与加载。
- 🤝 **自动化友链**：提交 PR 即可申请友链，系统自动完成链接有效性检测与网站所有权验证。
- 📦 **开箱即用**：简单的配置即可快速启动本地开发环境。

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/Explore114/qingyun_doc.git
cd qingyun_doc
```

### 2. 安装依赖

推荐使用 `npm` 或 `pnpm` 进行依赖安装：

```bash
npm install
```

### 3. 本地开发

启动本地开发服务器，实时预览修改：

```bash
npm run docs:dev
```

访问 `http://localhost:5173` (端口可能随机) 查看效果。

### 4. 构建与预览

构建生产环境静态文件：

```bash
npm run docs:build
```

预览构建后的产物：

```bash
npm run docs:preview
```

## 🔗 友链申请指南

本项目采用 **GitHub Actions** 进行自动化的友链审核。如果您希望将您的网站添加到友链列表，请遵循以下步骤：

### 1. 修改数据文件

Fork 本仓库，并修改 `.vitepress/theme/untils/data.ts` 文件。在 `items` 数组中添加您的友链信息：

```typescript
// 示例格式
{
  icon: 'https://您的网站/favicon.png', // 网站图标 URL (必填，需可访问)
  title: '您的网站名称',              // 网站标题 (必填)
  desc: '一句话描述',                 // 网站描述
  link: 'https://您的网站地址'         // 网站链接 (必填，需可访问)
},
```

### 2. 提交 Pull Request (PR)

提交您的更改并创建 Pull Request。GitHub Actions 将自动触发并执行以下检查：

- **PR 标题**：系统会自动将 PR 标题更新为您的网站名称。
- **链接检测**：系统会检查 `icon` 和 `link` 是否可访问。
- **打标签**：根据检测结果，PR 会被自动打上 `友链`、`头像可达/不可达`、`网站可达/不可达` 等标签。

### 3. 所有权验证 (重要!)

为了确保您是该网站的所有者，系统会在 PR 中评论要求验证。

1.  **放置验证文件**：请在您的网站根目录下放置一个名为 `qingyun-verify.txt` 的文件（内容不限）。
    *   例如：若您的友链是 `https://example.com/blog`，验证文件应位于 `https://example.com/blog/qingyun-verify.txt`。
2.  **回复验证指令**：在 PR 的评论区回复内容：
    ```text
    准备完毕
    ```
3.  **自动合并**：系统检测到回复后，会再次验证文件是否存在。若验证通过，PR 将被**自动合并**！

## 📂 项目结构

```text
qingyun_doc/
├── .github/
│   ├── scripts/
│   │   └── verify_links.js         # 友链验证脚本
│   └── workflows/
│       └── link-check.yml          # 自动化工作流配置
├── .vitepress/
│   ├── theme/
│   │   ├── components/
│   │   │   ├── MNavLink.vue        # 导航链接组件
│   │   │   └── MNavLinks.vue       # 导航链接列表组件
│   │   ├── style/
│   │   │   └── nav.css             # 导航样式
│   │   ├── untils/
│   │   │   ├── data.ts             # 友链数据源文件
│   │   │   └── types.ts            # 类型定义
│   │   └── index.ts                # 主题入口
│   └── config.mts                  # VitePress 核心配置
├── docs/
│   ├── announcement/
│   │   └── notice/
│   │       └── 友链指南.md          # 友链相关说明文档
│   ├── nav/
│   │   └── index.md                # 导航页文档
│   └── qingyun_oss/
│       └── 控件文档/
│           └── 青云对象存储控件文档.md # 核心产品文档
├── LICENSE                         # 开源协议
├── README.md                       # 项目说明文档
├── index.md                        # 首页文档
├── package-lock.json               # 依赖版本锁定
├── package.json                    # 项目依赖配置
└── wrangler.jsonc                  # Cloudflare Wrangler 配置
```

## 📈 Star 趋势

[![Star History Chart](https://api.star-history.com/svg?repos=Explore114/qingyun_doc&type=Date)](https://star-history.com/#Explore114/qingyun_doc&Date)

## 🤝 贡献指南

欢迎提交 Issue 反馈问题或 Pull Request 改进代码。在提交 PR 前，请确保您的代码符合项目规范，并已通过本地测试。

## 📄 开源协议

本项目遵循 [MIT License](LICENSE) 开源协议。
