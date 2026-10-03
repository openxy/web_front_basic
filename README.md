# 教学示例：博客的版本演进

以博客为例，用渐进式版本演示前端开发技术的演进：**一个版本只引入一个技术概念**。主链为 es6 原生实现，jquery 等变体挂分支。

本仓库只含示例代码（语料）。配套的在线教学应用（版本浏览 / 差异对比 / 在线运行 / 教学文档）是另一个私有仓库。

## 怎么用

- 每个目录是一个版本，目录名即版本名（slug）；顺序与挂靠关系见各版 `doc.md` 开头的 frontmatter（`seq` / `parent`）
- 任一版本目录都可独立运行：下载该目录，起任意静态服务器（如 `python3 -m http.server`）即可——例如 `es-modules/` 的外部依赖经 import map 指 CDN，浏览器原生零构建
- `06` 号（`es-modules/`）之前为传统按序 script 标签，之后为原生 ESM；`gulp/`、`bower/` 为打包器时代的历史原样项目

## 文件名跨版本统一

同类文件在所有版本中同名（`lib/db.js`、`app.js`、`index.html`、`lib/view.js`），数据库实现换了、文件名不换——相邻版本的演进就是「同名文件更新」，可逐行对照。原课程文件内容原样入册，仅文件名统一。

## 主链

| 目录（slug） | seq | 概念 | 说明 |
|---|---|---|---|
| `file/` | 0 | 前史 | 用文件系统管理内容（无代码） |
| `static/` | 1 | 静态网站 | 纯 HTML 多页，链接互跳 |
| `template/` | 2 | 前端模板引擎 | ejs：结构与数据分离，只读列表 |
| `router/` | 3 | 前端路由 / SPA | hash 路由，列表+详情两页，数据写死 |
| `crud/` | 4 | 完整 CRUD | 新增/编辑/删除+表单，数据操作内联在 app.js |
| `db/` | 5 | 数据层抽象 | 抽出 lib/db.js（内存版），五接口契约 |
| `es-modules/` | 6 | ES 模块 | 五个按序 script 标签换一个 module 入口与 import/export |
| `localstorage/` | 7 | 本地存储 | db.js 换 localStorage 实现，刷新不丢 |
| `ajax-rest/` | 8 | Ajax + REST API | db.js 换 fetch 回调版（在线运行为模拟层） |
| `async-await/` | 9 | Promise / async-await | db.js/app.js 换 async/await |
| `gulp/` | 10 | 构建工具 | 压缩合并出 dist/app.js，页面只引构建产物 |

## 分支

| 目录（slug） | 挂靠 | 概念 |
|---|---|---|
| `jquery-view/` | localstorage | 视图层换 jQuery（原 index_sync.html） |
| `jquery-ajax/` | ajax-rest | $.ajax 实现 REST 数据层（原 index_json.html） |
| `bower/` | gulp | bower 包管理变体 |

## 教学文档

每版 `doc.md` 是该版的教学文档（引入什么概念、与上一版的差异、思考题）；部分版本 `doc/` 下有按代码路径的文件级解读（`doc/lib/db.js.md` 对应 `lib/db.js`）。

> 运行 Web 代码应使用 Web 服务器方式（`http://`），不应直接 `file://` 打开。
