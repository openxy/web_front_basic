# app.js 解读

与第 6 版的对应关系：`import` 三行变成 `requirejs([...], function (Router, view, db) {...})` 的依赖数组加形参；模块体（路由表、控制器、表单回调）原样搬进工厂函数。开头的 `requirejs.config` 是本版新增的路径配置：模块 id「ejs」映射到本地 UMD 文件（当年常指 CDN 或 bower 组件）。`window.after_form_submit_callback` 的显式挂载与 ES 模块版同理：模块不进全局，view.js 的表单拦截要经 window 回调进来。
