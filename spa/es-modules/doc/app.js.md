# 更新：app.js（换加载方式：全局 script → ES 模块入口）

文件逻辑一行没动，变的是「文件之间怎么找到彼此」：

- 顶部三行 `import`：Router、render_view、五个 db_* 各自从自己的模块来。上一版里这些名字靠 `index.html` 里**按序排列的五个 script 标签** + 全局变量串联——顺序错一位就 undefined
- index.html 相应只剩一个 `<script type="module" src="app.js">`，依赖链由 import 递归解析；**import map** 也在这版出现（`ejs` 映射到 CDN，本站构建期镜像为本地）——外部依赖的声明就是这一段 JSON
- `window.after_form_submit_callback = ...`：模块内是严格模式，不再隐式产生全局变量；view.js 的表单拦截靠全局回调进来，必须显式挂到 window——这行是「全局脚本时代的约定」与「模块时代」的接缝

依赖方向从此显式：谁 import 谁，一眼可查（对照上一版：写在 HTML 里的加载顺序）。
