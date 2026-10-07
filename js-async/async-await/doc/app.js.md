# app.js 解读

与上一版的 diff 只有一处：点击处理。函数标 async，五节 then 链变成三段 `await compute()` 加日志——await 右边的 Promise 完成前，函数暂停在这一行，主线程照常跑别的事（时钟不停）。错误处理从末尾 `.catch` 变成 try/catch，形状回归同步代码。compute 与 index.html 一字未动。
