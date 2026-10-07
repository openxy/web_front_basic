# lib/view.js 解读

两处与第 6 版的实质差异。其一：`import ejs from 'ejs'` 变成 `define(['ejs'], function (ejs) {...})`，ejs 现在是 UMD 文件（lib/ejs.js），由加载器按 paths 配置拉起。其二：表单监听的初始化从「只挂 DOMContentLoaded」改为「两头防」——AMD 模块异步加载，执行到这里时 DOM 可能已就绪、DOMContentLoaded 早已过去，只挂事件会永远等不到。这是运行时加载器与语言级方案（defer 语义）的一处真实差别，也是本版最值得记住的坑。
