# 前端教学案例集

本仓库是案例仓：**仓根下每个目录是一个教学案例**（案例 = 代码版本的集合 = 一个教学单元），案例下每个目录是一个案例版本（简称版本）。渐进式版本演示前端开发技术的演进：一个版本只引入一个技术概念。

配套的在线教学应用（版本浏览 / 差异对比 / 在线运行 / 案例文档）是另一个私有仓库，本仓发布于 https://demo.openxy.com/openxy/web_front_basic/ 。

## 案例目录

| 案例 | 教什么 | 版本数 |
| --- | --- | --- |
| [`css-layout/`](css-layout/README.md) | CSS 布局演化：表格→display:table→浮动→960 栅格→flex→grid，同一骨架八代重写 | 8 |
| [`spa/`](spa/README.md) | 博客应用形态演进主线：文件→静态→模板→路由→CRUD→数据层→ESM→存储→REST→async→构建（另 3 个 jQuery/bower 分支） | 14 |
| [`position/`](position/README.md) | CSS 定位与浮动：四种定位机制 + z 轴 + 浮动四部曲（原课程页面原样入册） | 9 |
| [`responsive/`](responsive/README.md) | 响应式布局：固定宽度→流体→图片事故→媒体查询→移动优先→auto-fit，承接 css-layout 骨架 | 7 |
| [`restful/`](restful/README.md) | REST 动词演化：GET 列表/单个→POST→PUT→DELETE→状态码与错误处理 | 6 |
| [`scope-closure/`](scope-closure/README.md) | 作用域与闭包：全局撞名事故→IIFE→闭包工厂→循环陷阱→let 修复→模块收束 | 6 |
| [`js-async/`](js-async/README.md) | 单线程异步：同步冻屏→分片让出→回调→Promise→async/await→并行聚合 | 6 |
| [`pcd/`](pcd/README.md) | 省市区三级联动：数据组织→事件联动→级联→封装→细节修正 | 5 |
| [`table-row/`](table-row/README.md) | 表格行编辑：事件绑定→委托→元素替换→动态事件→键盘事件 | 5 |
| [`form-ajax/`](form-ajax/README.md) | 表单与 Ajax：逐版用 JS 接管原生表单的提交、请求、反馈 | 6 |

每个案例目录的 `README.md` 是该案例的总览（教什么、版本导览、重点与边界）；本文件是案例集总览。

## 布局规范（二选一，不允许混杂）

- **多案例**（本仓现状）：仓根下全是案例目录，版本目录 = 案例目录的直接子目录（不嵌套），如 `spa/template/`
- **单案例**（浅案例仓）：版本目录直接放仓根（适合只有一个案例的仓），此时仓根 `README.md` 同时是案例集与该案例的总览

保留名（不进代码树/diff/快照）：每版本 `mock.json`（接口模拟配置）；仓根 `docs/`（配套教程，与示例代码同仓演进）；案例目录 `README.md`（案例总览，可选）。

## 怎么用

- 案例内每个目录是一个版本，目录名即版本名（slug）；顺序与挂靠关系见仓根 `versions.yaml`（结构元信息唯一事实源；`parent` 写同案例内的 slug）
- 任一版本目录都可独立运行：下载该目录，起任意静态服务器（如 `python3 -m http.server`）即可——例如 `spa/es-modules/` 的外部依赖经 import map 指 CDN，浏览器原生零构建

## 文件名跨版本统一

同一案例内，同类文件在所有版本中同名（`lib/db.js`、`app.js`、`index.html`、`lib/view.js`），实现换了、文件名不换——相邻版本的演进就是「同名文件更新」，可逐行对照。原课程文件内容原样入册，仅文件名统一。

## 案例文档

每版 `doc.md` 是该版本的案例文档（引入什么概念、与上一版的差异、思考题；失败分支用「此路不通」一节拆解症状与根源）；部分版本 `doc/` 下有按代码路径的文件级解读（`doc/lib/db.js.md` 对应 `lib/db.js`）。

> 运行 Web 代码应使用 Web 服务器方式（`http://`），不应直接 `file://` 打开。
