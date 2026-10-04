
# 数据层抽象

## 本版本引入的概念

**数据层**（`lib/db.js`，新写）：内存数组实现五个接口 `db_all / db_find / db_create / db_update / db_destroy`。与 `crud` 的 diff 就是把 `app.js` 里的 `find_post` / `next_id` / `push` / `splice` 搬进 `lib/db.js`，控制器改为调用 `db_*`——**分层**：视图（view.js）、控制器（app.js）、数据（db.js）各司其职。

这五个接口是后续所有版本的数据层契约：07 换 localStorage、08 换 REST 接口，都只换 `lib/db.js` 的内部实现。

## 操作

- 功能与 `crud` 完全相同：新增/编辑/删除照常——行为没变，变的是结构
- 对照与 `crud` 的 diff：左右并排看 `app.js` 瘦了多少、`lib/db.js` 装走了什么

## 局限

- 数据仍在内存：刷新即失（本版解决的是结构问题，不是持久化）

## 思考

浏览器里哪里能存住数据？——localStorage，`localstorage` 版。
