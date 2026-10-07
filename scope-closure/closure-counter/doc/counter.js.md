# counter.js 解读

与上一版的 diff：IIFE 内部从裸变量 count 换成 `createCounter()` 工厂。`n` 声明在工厂里，工厂返回的函数每调一次 `n++` 再返回——这个返回的函数就是闭包：捕获了 n 所在的环境。render 与按钮监听改为调 `next()`，初始 0 由 HTML 原文承担（所以这版没有开屏 render）。timer.js 与 index.html 无改动。
