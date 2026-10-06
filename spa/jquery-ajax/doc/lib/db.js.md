# 更新：lib/db.js（$.ajax 实现同一套 REST——08 的对照分支）

`ajax-rest`（08）的分支：数据层换 jQuery 的 `$.ajax` 重写一遍。每个函数形态：

```js
$.ajax({
  url: ..., method: 'GET',
  success: function(posts) { callback(posts); },
  error: function(xhr, status, error) { console.error(...); }
});
```

关键设计：**回调签名与 08 的 fetch 版逐字一致**（`db_all(callback)` 等，文件头注释明说）——所以 app.js 一行不用改，两个分支随便切。配置对象 + success/error 回调是 $.ajax 的经典形态，与 fetch 的 Promise 链是两代异步风格；下一版（09）async/await 再换一代，三版连看就是异步 API 的三代史。

文件头 `import $ from 'jquery'` 与 07.01 分支同款（import map 声明依赖）。
