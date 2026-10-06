# 博客应用演进（spa 案例）

## 本案例教什么

以博客为例演示前端应用形态的演进：从「没有 Web 技术时用文件系统管内容」的前史起步，经静态多页、模板引擎、前端路由、完整 CRUD、数据层抽象，进入 ES 模块化，再换持久化（localStorage）、连后端（Ajax/REST）、异步现代化（async/await），收在构建工具时代（gulp/bower 为打包器时代历史原样项目）。主链为 ES6 原生实现，jquery 等变体挂分支对照。

## 版本导览

主链：

| # | 版本 | 概念要点 |
| --- | --- | --- |
| 00 | [文件系统管理内容](#v=spa/file) | 前史：没有任何 Web 技术时怎么管内容（不可运行） |
| 01 | [静态网站](#v=spa/static) | 纯 HTML 多页互跳 |
| 02 | [前端模板引擎](#v=spa/template) | ejs：结构与数据分离 |
| 03 | [前端路由与单页应用](#v=spa/router) | hash 路由，列表+详情共用一个 HTML |
| 04 | [完整增删改查](#v=spa/crud) | 补齐新增/编辑/删除的路由与表单 |
| 05 | [数据层抽象](#v=spa/db) | 数据操作抽成 lib/db.js，五接口契约 |
| 06 | [ES 模块](#v=spa/es-modules) | 五个按序 script 标签换一个 module 入口 |
| 07 | [本地存储](#v=spa/localstorage) | db.js 换 localStorage 实现，刷新不丢 |
| 08 | [Ajax 与 REST API](#v=spa/ajax-rest) | db.js 换 fetch 调 REST 接口 |
| 09 | [async/await](#v=spa/async-await) | 异步代码写成同步的样子 |
| 10 | [构建工具 gulp](#v=spa/gulp) | 引入构建过程，页面只引产物 |

分支（非整数 seq，与主链版本对照）：

| # | 版本 | 与谁对照 |
| --- | --- | --- |
| 07.01 | [jquery 视图变体](#v=spa/jquery-view) | 视图层换 jQuery，对照 07 的原生实现 |
| 08.01 | [$.ajax 变体](#v=spa/jquery-ajax) | 数据层换 $.ajax，对照 08 的 fetch |
| 10.01 | [包管理 bower](#v=spa/bower) | 依赖安装自动化，对照 10 的手工拷贝 |

## 重点与边界

- 重点：一版只引入一个概念；06 是分水岭——之前传统按序 script 与全局变量，之后全 ESM；数据层换实现不换文件名（lib/db.js），相邻版本可左右对照
- 边界：表单与 Ajax 的交互细节归 form-ajax 案例；定位与布局归 position 案例
