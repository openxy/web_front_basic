# 个人博客（blog 案例）——从一页 HTML 到全栈单页应用

## 本案例教什么

一个完整的个人博客「诗豪小筑」（内容取材刘禹锡诗文），串接《Web前端开发技术》全课程：前半程用纯 HTML/CSS 把前台立起来（语义结构 → 多页 → 资源式 URL → 样式 → 布局 → 响应式），后半程用 JavaScript 补上后台与数据（渲染 → 模板 → 事件 → 后台管理 → 存储同步版 → REST 异步版），最后 hash 路由合体为单页应用。它是个**综合展示**案例：局部概念与 css-layout、spa、form-ajax 等案例重叠，但粗粒度、重整体结构——学生做个人项目（第 16 周验收）时，把它当参考工程看「一个站是怎么长起来的」。

设计方法线：内容类型分析 → 资源设计（URL 即接口，Rails resourceful 风格）→ 站点模板与内容模板 → 区块划分 → 访客/站长角色分野，在对应版本的 doc.md 里成拍。

## 版本导览

主链：

| # | 版本 | 概念要点 |
| --- | --- | --- |
| 01 | [首页骨架](#v=blog/first-page) | 内容类型 Post 先行分字段；语义区块就位，样式与链接是后续钩子 |
| 02 | [多页成型](#v=blog/site-pages) | 列表/详情/标签/关于五类页面互跳；评论表单控件；平铺 URL 是反面初稿 |
| 03 | [资源式 URL 布局](#v=blog/resource-urls) | 页面按资源归位（posts/index、posts/show-N、assets 三件套）；站点地图页立起 |
| 04 | [全站样式](#v=blog/css-basics) | 一份共享 style.css：选择器、盒子模型；结构层零改动 |
| 05 | [布局与区块](#v=blog/layout) | grid 两栏 + 分类导航侧栏；站点头/底/导航与分类菜单按区块划分 |
| 06 | [响应式](#v=blog/responsive) | 8 行媒体查询完成移动适配，HTML 字节不动 |
| 07 | [数据与渲染](#v=blog/js-render) | 数据进 lib/data.js，页面改 JS 渲染；十个详情页并成一个模板页 |
| 08 | [页面模板](#v=blog/js-template) | 站点模板 + 内容模板收进 lib/view.js；页面 = 模板 + 数据 |
| 09 | [事件与交互](#v=blog/js-events) | 筛选条与分页器：事件监听、事件委托、状态对象驱动局部重渲 |
| 10 | [后台管理](#v=blog/admin) | admin/ 三页：表格增删改置顶、表单校验、评论管理；访客/站长分野（纯内存，刷新即失） |
| 11 | [本地存储](#v=blog/store-sync) | lib/store.js（localStorage 同步实现、自增 id、种子播种）；前台评论兑现 |
| 12 | [REST 接口](#v=blog/store-rest) | store.js 同名接口换 fetch 调 REST（模拟接口），调用方全改 async/await；七动作兑现 |
| 13 | [单页应用](#v=blog/spa) | hash 路由一张表收编前后台；站点地图由路由表生成；URL 收敛为 #/posts/1 形态 |

## 重点与边界

- 重点：URL 布局是贯穿线——平铺 → 资源式静态（show-1.html）→ 查询参数（show.html?id=1）→ REST（/posts/1）→ hash 路由（#/posts/1），每版 doc.md 都交代当版形态；存储先同步后异步（v11→v12 的调用方全量改写是异步教学的现场）；`lib/store.js` 与 `lib/view.js` 换实现不换文件名
- 与单一概念案例的分工：布局细节看 css-layout/position/responsive，事件与异步细节看 js-async/table-row，模板引擎看 spa/template，路由机制看 spa/router——本案例一律粗粒度带过
- 边界：登录认证（HTTP Basic Auth）不覆盖——静态与模拟接口环境下无法真实兑现，属后端话题；构建工具与组件框架不进主线（指路 spa/gulp 与第 14 周）；评论无鉴权、模拟接口忽略查询参数（筛选全在客户端）
- 依《Web前端开发技术》教程的 blog/ 设计稿（内容类型/资源/模板/区块/角色）与个人博客功能清单起草；内容取材刘禹锡诗文（公版，字段映射：诗体=分类、题材=标签、年代=日期）
