---
title: jquery 视图变体
seq: 7.01
parent: localstorage
summary: `localstorage` 的分支：视图层换用 jQuery，与 es6 原生实现对照
entry: index.html
runtime: static
---

# jquery 视图变体（`localstorage` 的分支）

## 本版本引入的概念

**jQuery 版视图层**：本分支的 `lib/view.js` 与主链 06 的 `lib/view.js` 接口完全相同（`render_view` / `fetch_form` / 表单提交钩子），内部一个用 `$.get` / `$('#main').html()`，一个用 `fetch` / `querySelector`。两文件同名，分支差异面板里可直接左右对照。

本版即原课程代码的 `index_sync.html` 一线原样入册（仅文件名统一为 `index.html` / `lib/view.js`），是主链 06 的平行实现：数据层同为 localStorage。

## 对照要点

- `$.get(path, callback)` vs `fetch(path).then(...)`：回调风格 vs Promise 风格
- `$('input[name=id]').val()` vs `document.querySelector('[name=id]').value`：jQuery 选择器 vs 原生 DOM API
- 依赖：本版经 `import $ from 'jquery'` 引入 jQuery（HTML 里的 import map 声明，见 `es-modules` 版说明），主链仍零框架依赖

## 思考

两套视图层可互换，说明什么？——视图层被隔离在很薄的接口后面，这正是分层的意义。
