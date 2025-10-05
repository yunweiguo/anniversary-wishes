# AGENTS 指南（适用于本仓库全局）

本文件为在本仓库内协作的智能体/开发者提供统一的工程约定与操作指引。
其作用域为仓库根目录下的整个项目结构（Next.js + TypeScript）。

## 技术栈与目标
- 框架：Next.js 14（App Router） + TypeScript
- 样式：Tailwind CSS + shadcn/ui（Radix Primitives）
- 渲染：内容页 SSG/ISR（后续可开），图卡前端 Canvas（MVP）
- 产物：长尾祝福句落地页 + 可分享图卡（1080×1080 / 1080×1920）

## 目录结构（关键路径）
- `app/` 应用路由与页面
  - `page.tsx` 首页（Landing Page）
  - `anniversary-wishes/` 聚合页
  - `anniversary-wishes-images/` 图卡集合索引页
  - `anniversary-card-maker/` 图卡生成器页
  - `cards/[id]/` 单卡详情页（可索引，含 ImageObject JSON‑LD）
  - `api/event/` 客户端事件收集端点（匿名化）
  - `sitemap.ts`、`robots.ts` 站点地图与 robots
  - `layout.tsx`、`globals.css` 全局布局与样式变量
- `components/` 业务组件（非 UI 原子）
  - `Section.tsx` 页面分区容器（模块化视觉分隔）
  - `Hero.tsx`、`QuickFilterNav.tsx`、`SentenceList.tsx`、`CardWall.tsx` 等
  - `CategoryContent.tsx` 分类页客户端封装（Hero + Wishes + Generator）
  - `CardGenerator.tsx`（组合）与 `CardCanvas.tsx`（Canvas 渲染）
  - `GeneratorSheet.tsx`（Radix Dialog 弹窗生成器）
- `app/components/ui/*` shadcn/ui 生成的 UI 原子
- `data/categories/*` 内容数据（按语言/分类）
- `lib/` 类型、主题与数据聚合
  - `types.ts`、`themes.ts`、`data.ts`
- `public/manifest.webmanifest`、`public/sw.js` PWA 外壳

## 本地开发
- 启动：`npm install`、`npm run dev`，访问 `http://localhost:3000/`
- UI 原子：使用 `npx shadcn@latest add <component>` 增补（已集成 Button/Sheet/Input/Textarea/Label/Select/Tabs/Dialog/Separator/ScrollArea）
- Tailwind：已启用 `tailwindcss-animate` 与 CSS 变量（见 `app/globals.css`、`tailwind.config.ts`）

## 代码风格与约定
- 语言：TypeScript，开启严格模式（Next.js 可能覆盖个别 tsconfig 字段）
- 组件：
  - UI 原子（Button、Sheet 等）从 `@/app/components/ui/*` 引用
  - 业务组件置于 `components/`，避免与 UI 原子混放
- 页面：App Router 约定式文件夹，`metadata` 仅在服务端组件中导出
- 命名：使用语义化文件与变量名；避免一字母变量
- 事件：仅上报 ID 与动作，不记录用户自定义文本（隐私最小化）

## UI/UX 设计约束
- 首页（Landing）模块清晰分隔：统一通过 `components/Section.tsx` 包裹，每个区块应包含：
  - 标题（必要） + 简短描述（可选） + 分隔线
  - 内容区避免与外层重复边框，卡片统一圆角/阴影层级
- 主题与字体：默认使用 Inter（sans）+ Playfair Display（serif），见 `app/layout.tsx`
- 可用性：按钮与交互优先使用 shadcn/ui + Radix，减少自实现可访问性逻辑
- Heading 规则：**每个页面必须至少包含一组 H1/H2/H3**，并保持层级递进（示例：页面主标题 `<h1>`、区块标题 `<h2>`、列表内分组 `<h3>`）。复用 `Section` + `SentenceList (h3)` 可快速满足要求。
- 导航：顶部 `SiteNav` 提供全站入口，分类与卡片页需包含 `Breadcrumbs` 便于返回首页。

## 内容模型与新增页面
1) 在 `data/categories/<lang>/<slug>.ts` 新增分类文件，导出 `CategoryData`：
   - `slug`、`title`、`summary`、`groups[{label, items[{id,text,tags,vars}]}]`、`faq`、`related`
2) 在 `lib/data.ts` 注册该分类（加入 `CATEGORIES`）
3) 如需独立页面，在 `app/<slug>/page.tsx` 以 `CategoryPage` 模板渲染（见 `app/_categoryPage.tsx`）
4) 站点地图会自动包含新分类与其卡片 URL（基于 `CATEGORIES`）

## SEO 与结构化数据
- FAQ：`FAQGeneric`/`FAQ` 注入 `FAQPage` JSON‑LD
- 列表：分类页注入 `ItemList` JSON‑LD
- 图片卡：卡片详情页注入 `ImageObject` JSON‑LD
- hreflang：`next.config.mjs` 已配置 `en-IN`/`hi-IN`；新增语言需补充页面与交叉链接
- OG：后续可引入 SSR 动态 OG 图（推荐）
- 站点图标与 Robots：`public/favicon.ico` / `favicon.svg` 已设置；全站默认输出 `<meta name="robots" content="index,follow">` 与 `X-Robots-Tag: index, follow`

## 图卡生成与下载
- 生成器：使用 `GeneratorSheet`（Radix Sheet）+ `CardGenerator`（Canvas）
- 尺寸：`square` 1080×1080，`story` 1080×1920
- 变量替换：支持 `{name}`、`{relation}`、`{nth}`（避免在埋点中记录原文）

## 分析与隐私
- 客户端事件：`lib/analytics.ts` → `/api/event`（匿名化）
- 事件键：`copy_text`、`generate_card_open`、`card_theme_change`、`card_download`、`share_click`、`switch_language`、`related_nav_click`
- 隐私：严禁上送用户自定义文本内容

## 性能与 PWA
- 目标：移动端 Lighthouse ≥ 90（性能/可达性/SEO）
- PWA：`public/sw.js` 仅为占位；需要按需补充缓存策略（runtime caching）
- 图片：图卡懒加载（`CardWall` 已实现增量加载）

## 安全与合规
- 头部：`next.config.mjs` 已设置基础安全头（Referrer‑Policy 等），CSP/HSTS 需在生产网关完善
- 内容过滤：避免冒犯性语句；编辑规范见 E‑E‑A‑T 区块

## 提交前检查清单
- 页面是否服务端导出 `metadata`（避免在 `"use client"` 文件中导出）
- 新分类是否已加入 `lib/data.ts`，路由是否生效
- 结构化数据是否注入，HTML 验证无报错
- 埋点是否按约记录 ID/动作

---
如需扩展（20–40/200+ 页）、动态 OG、image‑sitemap、Web Stories/Shorts、或 next‑intl 全量 i18n，请在 Issue/任务中标注，我会据此调整信息架构与构建脚本。
