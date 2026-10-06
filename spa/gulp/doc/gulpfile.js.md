# 新增：gulpfile.js（构建过程本身——这个版本的真正主角）

任务体就是一条流（stream）管线，读作流水线四道工序：

```js
gulp.src('./js/*.js')   // ① 源：js/ 目录下全部脚本（main.js + 各库）
  .pipe(uglify())      // ② 压缩：去空白缩变量名
  .pipe(concat('app.js')) // ③ 合并：拼成单文件
  .pipe(gulp.dest('./dist')) // ④ 落盘：dist/app.js
```

配合 `package.json`（devDependencies 记工具、scripts 记 `gulp` 命令）与 readme 的启动说明，构成完整的「拉下来能构建」闭环——`dist/app.js` 是构建产物，刷新它请重跑 gulp 而不是手改（本站编辑后运行也因它失效而关闭）。

为什么值得引入：HTTP/1.1 时代多文件 = 多请求往返，压缩合并直接压加载时间。代价也随之而来——**源码与上线物分离**（对照 index.html 的 diff：引用从 app.js 变 dist/app.js），「所见即所得」被构建过程打破。这个代价在后面的模块打包器时代成为默认前提。
