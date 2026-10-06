# 新增：app.js（路由表 + 控制器——单页应用的骨架立起来）

本版连同 `lib/simple_hash_router.js`（Router 类，原课程带来）一起出现。app.js 只有三十行，结构却是此后所有版本的地基：

- **数据**：写死的 `posts` 数组（两篇种子帖）
- **路由表**：`{'/': home, '/posts/:id': posts_show}`——URL 模式到控制器的映射，`/:id` 是占位参数
- **控制器**：`posts_index()` 渲染列表、`posts_show(id)` 渲染详情，各自调 `render_view`

Router 内部（simple_hash_router.js）做两件事：把 `/posts/:id` 转成正则，监听 `hashchange` 后拿 `location.hash` 逐条试匹配，命中就把捕获的 id 传给控制器；全部不匹配写 404。URL 的 `#/posts/1001` 从此决定显示哪个视图——**一个 HTML 里切换多页**，这就是 SPA。

与上一版对照：static 版每页一个文件，本版列表与详情共用 index.html + 两份模板。还缺的 new/edit/delete 三个路由见下一版。
