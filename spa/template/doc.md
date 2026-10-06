
# 前端模板引擎

## 本版本引入的概念

**前端模板引擎（ejs）**：

- `view/post/index.tpl` 是模板：写死结构，`<% %>` 里是逻辑，`<%= %>` 处填数据
- `lib/view.js` 里的 `render_view(tplName, data)` 负责取模板、编译、填入 `#main`
- 数据在本版的 `app.js` 里是一个写死的数组

本版只有一页：只读的文章列表。

## 操作

- 打开 `index.html`，对照 `view/post/index.tpl` 看：表格每一行是怎么从 `data.forEach` 来的

## 局限

- 只有一个页面：点「详情/新增」没反应（链接指向的 hash 路由还没有实现）
- 数据写死在代码里，增删改无从谈起

## 思考

多个页面（列表/详情/新建/编辑）共用一套 JS，怎么根据地址栏显示不同页面？——前端路由，`router` 版。

## 参考

index.html 头部的几行 meta 用于禁止浏览器缓存——模板经 fetch 加载，调试时缓存会让人看到旧模板（原课程注释所附：<https://zhuanlan.zhihu.com/p/83091549>）。
