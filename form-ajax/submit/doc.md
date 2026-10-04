# 接管表单提交

## 这个项目是什么

「表单与 Ajax」是多版本演进的教学项目。原课程（form.html / form_ajax*.htm / user_register.html）铺了九种表单控件、自带 EventUtil/ajax/json2/jQuery 四个库、后端是一组 PHP；本线聚焦 JS 数据流，重构为现代原生 JavaScript：控件砍到三个（用户名 + 两次密码），库全部去掉，后端换成教学站的接口模拟层。五版演进：接管提交 → fetch 发 JSON → 异步 → 校验 → 失焦查重。

## 本版本引入的概念

**submit 事件与默认行为**：点 `type="submit"` 的按钮（或在输入框回车）触发表单的 submit 事件，默认行为是把表单数据发送到 `action` 地址、整页跳转。`event.preventDefault()` 拦下默认行为，提交这件事就归 JS 管了。

**FormData**：`new FormData(form)` 一把收齐所有带 `name` 属性的控件的当前值；`Object.fromEntries()` 再把这份键值对列表变成普通对象。原课程 ajax.js 里 238 行的手写 `serialize(form)`（逐控件 switch type、encodeURIComponent、拼 `&`）就是这两步的前身。

## 本版本的改动

- 表单：用户名 + 密码 + 确认密码 + 提交按钮（原课程九种控件的教学属于「表单控件」一讲，本线只留够用的）
- 脚本：submit 监听器 → preventDefault → FormData 收集 → JSON.stringify 展示

## 关键代码走读

- `action="/register"` 保留着：不接管时它就是要跳去的地址；preventDefault 之后它只是一句「本该去哪」的注释
- `maxlength`、`autocomplete="off"` 是 HTML 层的原生约束——能在 HTML 拦住的事不劳驾 JS
- 密码框的值 collect 时就是明文——这是提交给服务器的数据，不是显示给人的

## 对照要点（与原课程 form.html）

- 原课程 `onsubmit="alert('我被送到服务端去啦！')"` 行内绑定会先于默认行为执行，但拦不住跳转；本版 preventDefault 真拦下
- 原课程逐控件 `alert(f.textTest.value)` 地「看」表单值；FormData 一次看全

## 思考题

- 把 preventDefault 那行注释掉点提交，发生了什么？（跳到 /register——本站没有这个地址，404）
- input 不写 name 属性，它的值还收得进来吗？（收不进来——name 是键， FormData 只认它）
