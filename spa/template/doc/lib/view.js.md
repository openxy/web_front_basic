# 新增：lib/view.js（视图工具函数——原课程文件原样入册）

三个角色撑起「结构与数据分离」：

- **`render_view(tplName, data)`**：核心。`fetch` 取回 `view/post/*.tpl` 模板文本，`ejs.compile(tpl)({data})` 编译并填数据，结果写进 `#main` 的 innerHTML——页面局部更新，整页不重载。fetch 加载模板正是本站运行必须经 http:// 托管的原因（file:// 下 fetch 直接失败）
- **`fetch_form()`**：按 name 把表单控件的值收成 post 对象（`?.` 可选链处理编辑页才有的 id 字段）
- **DOMContentLoaded 里的 submit 拦截**：`#main` 里的表单一律 preventDefault，收完值交给全局回调 `after_form_submit_callback(post)`——**控制器在 app.js 里定义这个函数来接活**，view.js 不关心提交后干什么

注意这个文件的注释与代码风格与前后版本不同——它是原课程文件原样入册，教学点之一就是读「带出处」的代码；文件头版本标签以下的原样保留也是全语料「原课程文件不动」原则的实例。
