# 删除：app.js（源码不再直接上线）

这个版本删掉了 `app.js`，不是功能没了，而是它的角色变了：

- `async-await` 版以前：`app.js` 是手写的源码，浏览器直接加载它。
- 10 版起：源码拆进 `js/` 目录（逻辑在 `js/main.js`，第三方库各归各位），由 gulp 压缩合并成 `dist/app.js`，页面只引用这份构建产物。

所以差异面板里 `app.js` 显示为删除、`dist/app.js` 显示为新增——「源码」和「上线文件」从同一份东西变成了两份东西，中间隔了一个构建过程。

连带后果：在浏览器里改源码不再影响运行结果，所以本版关闭了「编辑后运行」（`doc.md` 里 `edit_run: false`）。

## 参考

`js/main.js` 的路由从手写 Router 换成 [director](https://github.com/flatiron/director) 库（flatiron 出品，监听并解析 hash）。原课程注释所附的中文教程：<https://www.cnblogs.com/Showshare/p/director-chinese-tutorial.html>。
