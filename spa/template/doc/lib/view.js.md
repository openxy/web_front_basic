# 新增：lib/view.js（视图工具函数）

三个角色撑起「结构与数据分离」：

- **`render_view(tplName, data)`**：核心。`fetch` 取回 `view/post/*.tpl` 模板文本，`ejs.compile(tpl)({data})` 编译并填数据，结果写进 `#main` 的 innerHTML——页面局部更新，整页不重载。fetch 加载模板正是本站运行必须经 http:// 托管的原因（file:// 下 fetch 直接失败）
- **`fetch_form()`**：按 name 把表单控件的值收成 post 对象（`?.` 可选链处理编辑页才有的 id 字段）
- **DOMContentLoaded 里的 submit 拦截**：`#main` 里的表单一律 preventDefault，收完值交给全局回调 `after_form_submit_callback(post)`——**控制器在 app.js 里定义这个函数来接活**，view.js 不关心提交后干什么

这个文件逻辑原样来自原课程，代码风格与前后版本略有不同。原课程散在代码间的讲解注释与出处链接，按本站「代码保持干净、讲解归文档」的方针已移出代码：短说明留在原处，链接收进下面「参考」。

## 参考

- 可选链运算符 `?.`（`fetch_form` 里处理编辑页才有的 id 字段）：[MDN: Optional chaining](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- submit 事件拦截（原课程注释所附出处）：<https://blog.csdn.net/BIGC_Leo/article/details/151155172>、<https://www.cnblogs.com/7qin/p/10660678.html>、<https://juejin.cn/post/7479084726709059603>
