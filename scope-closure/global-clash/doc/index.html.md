# index.html 解读

两个数字窗（#count 计数、#sec 秒表）加一个按钮；底部按序引入 counter.js 与 timer.js。传统 script（不带 type="module"）的每个文件都把自己摊在同一张全局桌面上——事故的埋点在两个 js 文件，页面本身只是舞台。
