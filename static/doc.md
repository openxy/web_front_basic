---
title: 静态网站
seq: 1
parent: file
summary: 用纯 HTML 多页面组织博客，每个页面一个文件，链接互相跳转
entry: index.html
runtime: static
---

# 静态网站

## 本版本引入的概念

**静态多页网站**：index / show / new / edit / delete 各是独立的 HTML 文件，内容全部硬编码，页面间用 `<a href>` 跳转。

## 操作

- 打开 `index.html` 查看帖子列表
- 点击标题进入 `show-1.html` 等详情页

## 局限（推动下一版本的问题）

- 「新增/编辑/删除」页面是假的：表单提交后什么也不会发生，内容改不了
- 每篇帖子都要手工写一个 HTML 文件，重复劳动
- 页面结构高度重复：列表、详情的 HTML 骨架其实一样，只有数据不同

## 思考

结构相同、只有数据不同的页面，能不能写一次结构、填不同数据？——模板引擎，`template` 版。
