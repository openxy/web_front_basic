---
title: 完整增删改查（CRUD）
seq: 4
parent: router
summary: 补齐新增/编辑/删除的路由与表单；数据操作仍内联在 app.js
entry: index.html
runtime: static
---

# 完整增删改查（CRUD）

## 本版本引入的概念

**表单与控制器的配合**：`view/post/new.tpl` / `edit.tpl` 提供表单；`lib/view.js` 拦截表单提交（不刷新页面），把表单值整理成对象交给 `after_form_submit_callback`，由它分派 `posts_create` / `posts_update`，完成后改写 hash，走一次完整的「页面跳转」流程。

与 `router` 的 diff 很小：`app.js` 加三条路由与对应控制器，外加两个表单模板。

**注意**：`find_post` / `next_id` / `push` / `splice` 这些数据操作全部内联在 `app.js` 里——控制器同时干着「管流程」和「管数据」两件事。

## 操作

- 新增一篇 → 详情 → 编辑 → 删除，全程观察地址栏与列表变化
- 刷新页面：一切回到两篇初始数据

## 局限

- 数据细节混在控制器里：换一种存法就得改 app.js
- 数据在内存：刷新即失

## 思考

把「管数据」的部分收拢成独立文件、约定五个标准接口，控制器只管流程——数据层抽象，`db` 版。
