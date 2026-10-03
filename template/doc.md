---
title: 前端模板引擎
seq: 2
parent: static
summary: 引入 ejs 模板：结构与数据分离，一份模板渲染任意数据
entry: index.html
runtime: static
---

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
