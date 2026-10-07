# index.html 解读

与上一版的 diff：三处 script 标签各加 `type="module"`——引入 counter.js / timer.js 的两行，和内联陷阱脚本的一处。模块脚本自动延迟到文档解析完执行（原先靠放 body 末尾保证），内联里的 `var btns` 也随之不进全局。按钮与显示结构不变。
