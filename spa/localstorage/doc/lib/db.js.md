# 更新：lib/db.js（同一个文件，换掉内部实现）

对比左右两栏可以看到：五个函数名 `db_all` / `db_find` / `db_create` / `db_update` / `db_destroy` 一个都没变，变的是函数体内部——存储介质从内存数组换成了 localStorage。

- 05 版：数据放在一个数组变量里，刷新就没了。
- 07 版：每篇帖子 `JSON.stringify` 后按 id 存进 localStorage，刷新后数据还在。

这就是上一版定下接口约定的回报：文件名不变、函数名不变，`app.js` 一行不用改，就把「内存实现」换成了「持久化实现」。后面 08 版再把它换成走 HTTP 请求，用的也是同一个套路。

这套实现藏着一个要到多张表才暴露的缺陷：`db_all` 把整个 localStorage 当一张表遍历，键空间里只有 posts 一种数据——系统里若再有第二种内容（比如用户），键就混了。真要多表，得上 IndexedDB，或用 [localForage](https://github.com/localForage/localforage/) 这类封装库。这层意思原课程写在代码注释里，按本站「讲解归文档」的方针移到这里。

## 参考

调试 localStorage（原课程注释所附出处）：F12 的 Application 面板可以直接查看、编辑 localStorage（<https://www.html.cn/doc/chrome-devtools/manage-data/local-storage/>）；页面跳转会清掉 console 日志，勾选 Preserve log 可保留（<https://blog.csdn.net/qq_35421305/article/details/115325546>）；更多调试工具介绍（<https://zhuanlan.zhihu.com/p/62177097>）。
