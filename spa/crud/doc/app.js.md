# 更新：app.js（路由表补到五条，数据操作开始堆积）

两段变化：

- **路由表**：`/posts/new`、`/posts/:id/edit`、`/posts/:id/delete` 三条补齐——`new` 必须排在 `:id` 前面匹配（Router 按序试正则，`new` 也会被 `([0-9a-z]+)` 捕获）。`posts_delete` 从简直接删后回列表（代码注释里留了「应加确认表单」的练习）
- **数据操作**：`find_post`、`next_id`（模拟自增主键）、以及 `after_form_submit_callback` 里按有无 id 分流 create/update 的 push/splice——**全部内联在控制器文件里**，文件头注释明说这正是下一版要抽出去的部分

本版在功能上是「完整」的博客（列表/详情/新建/编辑/删除全通），在结构上是「有病」的：流程与数据混在一个文件。下一版 `lib/db.js` 应声而出。
