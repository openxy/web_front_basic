# 教学示例语料：多条版本演进线

本仓库是多项目语料仓：**仓根下每个目录是一条演进线（一个示例项目）**，项目下每个目录是一个版本。渐进式版本演示前端开发技术的演进，用渐进式小项目演示单个知识点。

配套的在线教学应用（版本浏览 / 差异对比 / 在线运行 / 教学文档）是另一个私有仓库。

## 布局规范（二选一，不允许混杂）

- **多项目**（本仓现状）：仓根下全是项目目录，版本目录 = 项目的直接子目录（不嵌套），如 `spa/template/`
- **单项目**（浅语料仓）：版本目录直接放仓根（适合只有一条线的仓）

保留名（不进代码树/diff/快照）：每版本 `mock.json`（接口模拟配置）；仓根 `docs/`（配套教程，与示例代码同仓演进）。

## 怎么用

- 项目内每个目录是一个版本，目录名即版本名（slug）；顺序与挂靠关系见仓根 `versions.yaml`（结构元信息唯一事实源；`parent` 写同项目内的 slug）
- 任一版本目录都可独立运行：下载该目录，起任意静态服务器（如 `python3 -m http.server`）即可——例如 `spa/es-modules/` 的外部依赖经 import map 指 CDN，浏览器原生零构建

## 文件名跨版本统一

同一项目内，同类文件在所有版本中同名（`lib/db.js`、`app.js`、`index.html`、`lib/view.js`），实现换了、文件名不换——相邻版本的演进就是「同名文件更新」，可逐行对照。原课程文件内容原样入册，仅文件名统一。

## form-ajax/ —— 表单与 Ajax（微线，接口走模拟层）

原课程（九种控件 + EventUtil/ajax/json2/jQuery 四个库 + PHP 后端）重构为现代原生 JavaScript：控件砍到三个聚焦 JS 数据流，后端换成教学站接口模拟层（`mock.json` 声明基址与种子，在线运行自动拦截应答）：

| 目录（slug） | seq | 概念 |
|---|---|---|
| `submit/` | 1 | 接管表单提交：preventDefault + FormData 收集 |
| `ajax-post/` | 2 | fetch 发送 JSON：POST /users，应答回显 |
| `async/` | 3 | async/await 与异步：慢网络计数器照走、表单照打字 |
| `validate/` | 4 | 提交前校验：正则 + 行内提示，不过不发请求 |
| `name-check/` | 5 | 失焦查重：blur 即 GET /users/名字，200 占用 / 404 可用 |

## pcd/ —— 省市区三级联动（微线）

原课堂插件（pcd.js 一次写成的 PCD 构造函数）按功能与技术拆开，一版一个概念演进为现代原生 JS；全国数据 `pcd-data.js` 原样入册、全链共用：

| 目录（slug） | seq | 概念 |
|---|---|---|
| `data/` | 1 | 索引路径数据：树编码成扁平键（"0_2_1"） |
| `onchange/` | 2 | change 事件 + selectedIndex 拼键，两级联动 |
| `cascade/` | 3 | 级联递推：任一级变化重刷其后所有级 |
| `widget/` | 4 | 封装成控件：class PCD 收编三段过程代码 |
| `prompts/` | 5 | 提示项与索引偏移：选项头插「请选择」，序号减 1 |

## position/ —— CSS 定位机制（微线，原课程页面原样入册）

同一张图片同一个版式，每版只动 CSS 里关于 `position` 的几行，走完四种定位机制 + z 轴 + 浮动（配文参考《Web 前端开发技术·06 定位》）：

| 目录（slug） | seq | 概念 |
|---|---|---|
| `static/` | 1 | 静态定位：文档流基准形态 |
| `relative/` | 2 | 相对定位：原位置偏移，原空间保留 |
| `absolute/` | 3 | 绝对定位：最近已定位祖先为原点 |
| `z-index/` | 4 | 浮层与 z 轴：叠放次序、角标徽章（依文档新写） |
| `fixed/` | 5 | 固定定位：原点是屏幕可视区域 |
| `float/` | 6 | 浮动与清除：文字环绕、clear 找回流 |

## spa/ —— 博客的版本演进（应用形态主线）

以博客为例，用渐进式版本演示前端应用形态的演进：**一个版本只引入一个技术概念**。主链为 es6 原生实现，jquery 等变体挂分支。`06` 号（`es-modules/`）之前为传统按序 script 标签，之后为原生 ESM；`gulp/`、`bower/` 为打包器时代的历史原样项目。

### 主链

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

### 分支

| 目录（slug） | 挂靠 | 概念 |
|---|---|---|
| `jquery-view/` | localstorage | 视图层换 jQuery（原 index_sync.html） |
| `jquery-ajax/` | ajax-rest | $.ajax 实现 REST 数据层（原 index_json.html） |
| `bower/` | gulp | bower 包管理变体 |

## table-row/ —— 动态表格行操作（微线）

原课程 event.html 改写为现代原生 JS 的概念链，一版一个事件/DOM 概念：

| 目录（slug） | seq | 概念 |
|---|---|---|
| `event-bind/` | 1 | 事件绑定：addEventListener + preventDefault |
| `delegation/` | 2 | 事件委托：一个监听器挂 tbody，冒泡接管所有行 |
| `element-replace/` | 3 | 元素替换：closest 甄别 + replaceWith 原地换输入框 |
| `dynamic-event/` | 4 | 动态事件：blur 不冒泡，input 诞生那刻动态绑 |
| `keyboard-event/` | 5 | 键盘事件：回车主动 blur()，提交路仍只一条 |

## 教学文档

每版 `doc.md` 是该版的教学文档（引入什么概念、与上一版的差异、思考题；失败分支用「此路不通」一节拆解症状与根源）；部分版本 `doc/` 下有按代码路径的文件级解读（`doc/lib/db.js.md` 对应 `lib/db.js`）。

> 运行 Web 代码应使用 Web 服务器方式（`http://`），不应直接 `file://` 打开。
