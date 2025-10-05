# Anniversary Wishes 站点 — PRD（无 Prompt 版，v2）

## 0. 背景 & 机会
- 关键词盘巨大（关系×语气×语种×里程碑），但 SERP 出现 **AI 概览（AIO）+ 图片条带 + 短视频**，纯文字清单竞争加大、零点击上升。
- 本产品以“**句库 + 可分享图卡 +（可选）短视频/Web Stories**”为核心，把“看完即走”转化为 **复制/下载/分享** 行为，并通过长尾集群获取稳定自然流量。

## 1. 目标（90 天）
- **内容覆盖**：≥ **200** 个长尾落地页（关系/语气/语种/年数/平台）。
- **流量**：月活 UV **15k–40k**（取决于域名与执行）。
- **行为转化**：
  - 复制率 ≥ **20%**；
  - 图卡下载/分享 ≥ **8%**；
  - 站内二跳（进入其他关系/语气页）≥ **20%**。
- **搜索**：图片搜索与 Discover（Web Stories/短视频）占比逐月提升；AIO 引用逐步出现。

## 2. 用户 & 核心场景
- **用户**：为配偶/亲友找祝福语的人；社媒重度用户；教师/内容创作者（需可打印/素材）。
- **场景**：搜索“anniversary wishes for husband/funny/hindi/first/instagram captions…” → 进入对应页 → **复制句子或生成图片卡** → 下载/分享/收藏。

## 3. SERP 洞察与产品策略
- **AIO**：需要“可被抽取的结论块 + FAQ + 结构化数据（FAQPage/ItemList）”。
- **图片条带**：提供 **原创方形(1080×1080)/竖版(1080×1920)** 图卡；每张卡 **独立 URL** + `ImageObject` Schema + image-sitemap。
- **短视频/Stories**（可选 V1.1）：同主题 8–12 句自动生成 **Web Stories** 与 **Shorts/Reels**，页面注入 `VideoObject`，视频站点地图。

## 4. 范围（Scope）
### 4.1 MVP（≤30 天）
- **集群与首批 20 页**：
  - 关系：for husband / wife / couple / parents / friends（含各自 funny/romantic/short 子页）
  - 语种：EN 基线 + HI 总览页（含 2–3 个 HI 子页）
  - 里程碑：first / silver(25th) / golden(50th)
  - 平台：instagram captions / images（图片集合）
- **图卡生成器**：
  - 尺寸：square（1080×1080）、story（1080×1920）；
  - 主题：Light / Dark / Floral / Elegant（≥4 套）；
  - 变量：`{name}`, `{relation}`, `{nth}`；
  - 导出：PNG/WebP 下载；每张卡有 **可索引 URL**。
- **页面模板**：
  - 首屏“**结论块**”（一句定义 + 3–5 条精选祝福 + 生成卡按钮）；
  - 60–150 条分组句子（复制按钮 + 生成卡按钮）；
  - FAQ（2–4 条礼仪/写法）；相关页横向导航。
- **SEO**：`FAQPage` / `ItemList` / `ImageObject`，`hreflang`（en-IN/hi-IN），sitemap（含 image），动态 OG 图；
- **分析**：事件埋点（复制/生成/下载/分享/切换语言/相关推荐点击）；
- **性能**：移动 LCP ≤1.5s、CLS ≤0.05、TBT ≤150ms；PWA（缓存 shell）。
- **隐私**：不上传用户文本；仅匿名化事件。

### 4.2 V1.1（30–90 天）
- 扩充至 **200+ 页**；
- 批量导出 ZIP；主题编辑器（字体/底图/边距）；
- 更多语种（Bengali/Tamil/Telugu）；
- Web Stories/Shorts 生成与站点地图；
- 收藏夹（本地/登录可选）。

### 4.3 Out of Scope（MVP）
- 视频/动图卡片生成；
- 支付/订阅体系（后续可加）。

## 5. 站点结构（IA）
```
/anniversary-wishes/                      ← 总览页（聚合 + 生成器入口）
  /anniversary-wishes-for-husband/
    /funny-anniversary-wishes-for-husband/
    /romantic-anniversary-wishes-for-husband/
    /short-anniversary-wishes-for-husband/
  /anniversary-wishes-for-wife/
  /anniversary-wishes-for-couple/
  /anniversary-wishes-for-parents/
  /hindi-anniversary-wishes/
    /hindi-anniversary-wishes-for-husband/
    /hindi-anniversary-wishes-for-wife/
  /first-anniversary-wishes/
  /silver-anniversary-wishes/
  /golden-anniversary-wishes/
  /anniversary-captions-for-instagram/
  /anniversary-wishes-images/             ← 图片集合索引
  /anniversary-card-maker/                ← 独立生成器页
  /cards/[id]                             ← 图片卡详情（可索引）
```

## 6. 页面模板要素
- **Hero/结论块**：一句定义 + 3–5 条最佳示例 + 生成卡 CTA；
- **章节目录**：ItemList（如 Romantic/Short/Religious …）；
- **句子列表**：分组展示，复制/生成卡按钮；
- **图卡墙**：最新/热门卡片（可懒加载）；
- **FAQ**：2–4 条（礼仪/写法）；
- **相关推荐**：同关系/同语气/同语种的交叉链接；
- **结构化数据**：FAQPage、ItemList、ImageObject（卡片页）、BreadcrumbList。

## 7. 数据模型（JSON）
```json
{
  "category": "anniversary-wishes-for-husband",
  "language": "en",
  "groups": [
    { "label": "Romantic", "items": [
      { "id": "awh-rom-001", "text": "To my {relation}, here’s to another year of us. Happy {nth} Anniversary!", "tags": ["romantic","short"], "vars": ["relation","nth"] },
      { "id": "awh-rom-002", "text": "Forever my favorite hello, {name}. Happy Anniversary.", "tags": ["romantic"], "vars": ["name"] }
    ]}
  ]
}
```
- **主题模型**（示例）：
```json
{
  "id": "floral",
  "name": "Floral",
  "fonts": {"title": "Playfair Display", "body": "Inter"},
  "palette": {"bg": "#fff7f8", "fg": "#1a1a1a", "accent": "#e25a7a"},
  "decorations": ["rose_corner.svg"]
}
```

## 8. 事件埋点
- `copy_text` {page, item_id}
- `generate_card_open` {page, item_id}
- `card_theme_change` {theme}
- `card_download` {page, item_id, format, size}
- `share_click` {channel: whatsapp|instagram|copy-link}
- `switch_language` {from,to}
- `related_nav_click` {from_page,to_page}
> 数据最小化：不记录原文，仅记录 ID 与动作。

## 9. 技术方案
- **框架**：Next.js 14（App Router）+ TypeScript + Tailwind；部署 Cloudflare Pages。
- **渲染**：
  - 内容页：静态生成（ISR 7 天）；
  - 图卡：
    1) 前端 Canvas 渲染（MVP 简易）；或
    2) SSR 截图 API（Workers + Playwright），便于稳定出图与可索引 `ImageObject`。
- **资源**：开源字体（Google Fonts）；背景图/装饰素材授权可追溯。
- **i18n**：`next-intl`/`@vercel/i18n`；`hreflang`（en-IN/hi-IN）。
- **Sitemap**：标准 + image（+ video，若启用 Stories/Shorts）。
- **性能**：图卡懒加载、首屏仅 1–2 张、图片无损压缩、preconnect DNS；移动端 LCP ≤1.5s。
- **日志/分析**：PostHog 或自建简易端点（KV/Analytics）。
- **安全/合规**：CSP、Referrer-Policy、隐私与使用条款；内容过滤（避免冒犯语）。

## 10. 风险与对策
- **AIO 抢点击** → 结论块 + FAQ + 结构化数据，提供 **必须点击** 的“个性化/下载/分享”。
- **内容重复** → 模板+变体+人工抽检，设相似度阈值；每页原创引导段与 FAQ。
- **程序化风控** → 明确作者/更新日期，合理 canonical，控制页速与广告密度。
- **素材压力** → 先模板化生成，再人工精选；内容与主题 JSON 资产可复用。

## 11. 里程碑 & 验收
- **M0（第 7 天）**：站点骨架 + 6 页内容 + 4 套主题 + 图卡导出（Canvas）。
  - 验收：能生成并下载 1080×1080/1080×1920；结构化数据通过 Rich Results 测试；移动 Lighthouse ≥ 90（性能/SEO/可达性）。
- **M1（第 30 天）**：上线 20–40 页 + EN/HI 切换 + image-sitemap。
  - 验收：复制/下载/分享事件可见，页面收录增长；图片开始进入图片搜索。
- **M2（第 90 天）**：200+ 页 +（可选）Stories/Shorts 生成 + 收藏/打包。
  - 验收：UV 达标；下载/分享率达标；Discover/图片搜索带来稳定流量。

## 12. 域名策略与推荐
### 12.1 选择原则
- **易记/易读/≤12 字母**，避免连字符与数字；
- **可品牌化**（不强求精确匹配）；
- **跨语种可用**（不局限某语言拼写）；
- 优先 **.com**，备选 **.love / .cards / .site / .app / .in**（面向印度）；
- 避免可能与大媒体/商标冲突的名称。

### 12.2 推荐清单（未查可用性，供你挑方向）
**偏品牌（首选）**
1) **AnnivHub.com**
2) **WishPairs.com**
3) **LoveToast.com**
4) **Annigram.com**（anniversary+gram）
5) **TwoGetherDay.com**（twogether 双关）
6) **VowsDay.com**
7) **RingYears.com**
8) **HeartVersary.com**
9) **EverVersary.com**
10) **DearVersary.com**

**偏描述（利于早期理解）**
11) **WishesForAnniversary.com**
12) **AnniversaryCardMaker.com**
13) **AnniversaryWishesGallery.com**
14) **HappyAnnivCards.com**
15) **AnniversaryCaptions.com**

**新后缀/地区向**
16) **Anniv.cards**
17) **Wish.love**
18) **Anniversary.site**
19) **Anniversary.app**（若定位工具型）
20) **Anniversary.in**（若主打印度）

> 采购建议：优先 Cloudflare Registrar（成本价 + DNS 便捷）；备选 Porkbun/Namecheap。注册后立刻接入 CF DNS、开启 HSTS、启用 0-SSL 与 CDN 缓存。

## 13. 运营与增长
- **外部分发**：Pinterest 看板、IG 图墙、YouTube Shorts；统一 UTM；
- **站内导流**：每页顶部横向切换（关系/语气/语种），底部“你可能还需要”；
- **素材包**：推出“主题图卡合集（可打印/高清）”下载页；
- **轻广告**：控制密度，首屏不投放；以图卡下方与章节间隙为主。

---

> 本 PRD 可直接用于工程落地（Next.js + Cloudflare Pages）。如需，我可以在此基础上输出 **可部署样板仓库结构 + 10 个示例页面** 与 **4 套主题**，方便你边上线边扩写。



## 14. India‑first 专项策略（根据国家分布调整）
**结论**：需以 India 优先做本地化与分发，围绕 EN/HI 双语 + WhatsApp 分享 + 图片/Stories 入口。

### 14.1 语言与 IA
- `hreflang`: `en-IN`, `hi-IN`（后续 `bn-IN`, `ta-IN`, `te-IN`, `ur-IN/PK` 进入待办）。
- 目录：在现有 EN 集群外，新增 `/hi/…` 镜像集群与混合 “Hinglish”（罗马字母）版本：
  - `/hi/hindi-anniversary-wishes/`
  - `/hi/hindi-anniversary-wishes-for-husband/`
  - `/hi/hindi-anniversary-wishes-for-wife/`
  - `/hi/anniversary-shayari/`（Shayari/诗句）
  - `/hi/anniversary-status-for-whatsapp/`（Status/2 Lines/Short）
  - `/hi/first-anniversary-wishes-in-hindi/`, `/hi/25th-…`, `/hi/50th-…`
- 页面元素：尊称与称谓本地化（如 ji），提供 EN↔HI 并排与 Hinglish 选项。

### 14.2 内容包（首批 20 页推荐）
1) Hindi 总览 + Husband/Wife/Parents/Couple 子页（各含 romantic/funny/short 组）。
2) Shayari 专题（四言/对仗/2-Lines）。
3) WhatsApp Status/Instagram Captions 专题（短句、竖版卡高度匹配）。
4) 里程碑：1st/25th/50th in Hindi。

### 14.3 分享与体验
- 优先 WhatsApp：移动端固定悬浮的 WhatsApp 分享；`navigator.share` + 预填文本/图卡。
- 图卡尺寸：1080×1080 与 1080×1920；WebP/AVIF 导出，目标 <180KB/张。
- 字体：Noto Sans Devanagari/Modak（标题可选）；处理连字与断行。
- 低带宽优化：首屏 1–2 张、懒加载、`srcset`、JS 总量 ≤180KB（gzip）。

### 14.4 SEO & 数据
- image-sitemap + hreflang 对（EN↔HI）。
- 结构化：FAQPage、ItemList；图片页注入 ImageObject；（若做 Stories）补充 VideoObject/AMP Stories。
- 在 GSC 建立 en-IN 与 hi-IN 属性，跟踪图片/Discover 占比。

### 14.5 变现与合作
- AdSense 为主；探索印度礼品/鲜花/蛋糕等联盟，在相关页做轻度导流（非侵扰式）。
- 发布可打印高清包（ZIP）与“去水印/批量导出”轻订阅作为增量收入。

### 14.6 14 天落地节奏
- D1–D3：`hi` 语言环境与 6 页（总览 + husband/wife/parents + shayari + status）；接好 WhatsApp 分享。
- D4–D7：扩至 20 页；上线 4 个主题；建 image-sitemap。
- D8–D14：扩至 60 页；新增 1st/25th/50th；首批 Web Stories（可选）。
- KPI：复制率≥20%，图卡下载/分享≥8%，图片搜索展示量稳定上升。

### 14.7 域名建议（India 友好）
- 品牌向：WishWala.com、DilSeWishes.com、ShubhWishes.com、WishMitra.com、AnnivHub.com
- 后缀向：Anniv.in、Wishes.in、Anniversary.app（工具定位）
> 建议优先 .com 获取全球流量，若 .in 可用可做 301 到主域或作地区入口；注册后接入 Cloudflare DNS，开启 HSTS 与缓存。

