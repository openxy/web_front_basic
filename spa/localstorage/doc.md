---
title: 本地存储
seq: 7
parent: es-modules
summary: 数据层换成 localStorage：数据持久化，刷新不丢
entry: index.html
runtime: static
---

# 本地存储

## 本版本引入的概念

**localStorage**：`lib/db.js` 用 `localStorage.getItem/setItem` 实现同一套 db 接口。每篇帖子以 id 为 key 存一个 JSON 字符串。

本版与前版的 diff 只剩 `lib/db.js` 一个文件（`index.html` 一行都不用改），左右对照即是全部变化——**分层的好处**：换存储介质，app.js 与视图层完全不用动。

## 操作

- 新增几篇帖子，刷新页面：数据还在
- F12 → Application → Local Storage 面板，直接看到每篇帖子的存储形态

## 局限

- 数据只在本机本浏览器：换台电脑、换个浏览器就没有了；也无法让别人看到你的帖子
- localStorage 只能存字符串，容量有限，也没有查询能力

## 思考

要共享数据，就得把存储搬到服务器，前端通过网络接口读写——Ajax + REST API，`ajax-rest` 版。
