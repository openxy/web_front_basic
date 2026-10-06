# 更新：lib/db.js（同一个文件名，换了人间：内存数组 → REST 接口）

第三次换实现，五张老面孔（db_all/db_find/db_create/db_update/db_destroy）还在，但**接口签名变了**——存储介质从「本地同步」换成「网络异步」，这是躲不开的代价：

- 每个函数体改成 `fetch(\`${API_BASE_URL}/posts...\`)`：GET 列表、GET/:id、POST、PUT、DELETE，json-server 风格 REST；`.then` 回调链处理应答，错误进 `.catch`
- 结果不再 `return`，改成**多收一个 callback 参数**：`db_all(callback)` 拿到数据后调 `callback(posts)`——同步世界的调用方必须全部改写成回调式，app.js 这版随之每处调用都变了（对照上一版 diff：app.js 是「更新」、本文件也是「更新」）
- 种子数据从代码搬进 `data/posts.json`；文件头注释写明本机复现路径：`npx json-server --watch --port 3000 data/posts.json`（本站运行时由模拟层拦截同址请求）

07 版定下的「函数名不变、app.js 不用改」红利，到异步这一步失效了——救它的是 async/await，见 09 版。
