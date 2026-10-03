# 教学示例：博客的版本演进

以博客为例，用渐进式版本演示前端开发技术的演进：**一个版本只引入一个技术概念**。主链为 es6 原生实现，jquery 等变体挂分支。

> 运行 Web 代码均应使用 Web 服务器方式（`http://`），不应直接 `file://` 打开。本仓库的用法是在根目录 `npm run dev`，用生成的教学应用浏览与运行这些版本。

## 文件名跨版本统一

同类文件在所有版本中同名（`lib/db.js`、`app.js`、`index.html`、`lib/view.js`、`view/post/*.tpl`），数据库实现换了、文件名不换。这样相邻版本的 diff 是「同名文件更新」，可在差异面板里左右对照。原课程文件内容原样入册，仅文件名统一。

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

目录名只是稳定标识（slug，引用与未来 git tag 都用它）；顺序与挂靠在各版 `doc.md` frontmatter（`seq` / `parent`），重排版本改 frontmatter 即可，不改目录名。

每版本目录内有 `doc.md`：本版引入的概念、与上一版的差异、操作指引。原课程示例文件内容一律原样保留；新写文件仅有四个：`02` 的 app.js、`03`/`04` 的中间步进 app.js、`08` 的 db.js（fetch 版），其余版本由原有模块重新组合而来。

版本目录命名规则与「目录即版本 / git tag 即版本」的统一语法见仓库 `docs/v1-方案.md`。
