# 更新：index.html（回调链改 async/await，等待期可观察）

发送逻辑不变，写法与周边管理升级：

- 回调标 `async`，`.then` 链改写成一串 `await`：`await wait(2000)` → `await fetch` → `await resp.json()`，视觉上从上往下就是执行顺序（原课程在服务端 sleep(8) 制造慢网络；模拟层没有延迟，`wait` 在客户端自己等 2 秒）
- **等待期的三个配套**：按钮 `disabled` 防重复提交；`setInterval` 每秒刷新「已等 N 秒」；`try/finally`——成败都得收的尾（停计数器、解禁按钮）放 finally
- 关键观察：计数器在走、表单还能改字——`await` 让出的是**当前函数**的控制权，页面其他一切照常运转，这就是「异步代码写成同步的样子、但不阻塞页面」的直译

`.then` 与 `await` 是同一机制的两种写法（各版本里两种都有出现）；`wait` 这个「Promise 包 setTimeout」的小函数是造延迟的标准手势。
