# 更新：gulpfile.js（构建管线前面接上一段：自动收集 bower 依赖）

`gulp`（10）的分支，变化集中在任务源头的取材方式：

- 新增 `bower.json`：bower 的依赖声明文件（`dependencies` 列 jquery/director，对照 npm 的 package.json）——`bower install` 按 it 拉包进 `bower_components/`
- 任务里两股流：`gulp.src('./bower.json').pipe(mainBowerFiles())` 从装好的包里**挑出各库的主文件**，与自家 `js/*.js` 经 `mergeStream` 合流，再走原来的 uglify → concat → dist

对照 10 版：库文件（jquery.js、director.js）从「手工拷进 js/ 目录」（看 10 版 diff 里 js/ 目录下的库文件）变成「声明 + 命令自动获取」——手工拷贝忘更新、版本对不上的问题从此交给工具。bower 本身已被 npm/webpack 时代淘汰，读它的价值在「依赖声明 → 自动获取 → 进构建」这套思想：今天的 package.json + 构建工具同构。
