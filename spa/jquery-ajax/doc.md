---
title: $.ajax 变体
seq: 8.01
parent: ajax-rest
summary: `ajax-rest` 的分支：用 jQuery $.ajax 实现同一套 REST 数据层，与 fetch 版对照
entry: index.html
runtime: shim
---

# $.ajax 变体（`ajax-rest` 的分支）

## 本版本引入的概念

**$.ajax**：jQuery 对 XHR 的封装。本分支的 `lib/db.js` 与 07 主链的 `lib/db.js`（fetch 实现）实现完全相同的五个接口，只是 HTTP 客户端不同；两文件同名，分支差异面板里可直接左右对照。

本版即原课程代码的 `index_json.html` 一线原样入册（仅文件名统一为 `index.html` / `lib/db.js` / `app.js`）。

## 对照要点

- `$.ajax({url, method, success, error})` vs `fetch(url, {method}).then()`：选项对象 + 回调 vs Promise
- 前者自动解析 JSON、区分 success/error 两个回调；后者统一为 resolved/rejected，需要手动 `response.json()` 和 `response.ok` 判断

## 运行环境说明

同 07：原课程需本地 json-server；本教学软件在线运行为浏览器内模拟环境（角标可辨），源代码不含模拟代码。
