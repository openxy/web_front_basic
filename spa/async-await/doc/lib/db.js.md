# 更新：lib/db.js（第四次换实现：async/await——签名终于「像回同步」）

对照 08 版逐函数看：`.then(callback(posts))` 改成 `const posts = await response.json(); return posts;`，整个函数体包进 `async`/`try-catch`。

真正的教学点在签名：**callback 参数消失，数据重新从 return 出来**。08 版被迫改成回调式的那批调用方（app.js），这版全部改回 `const posts = await db_all()` 的直白样子——async/await 让异步函数保留同步式的调用形态，「换实现不动调用方」的红利（05 版定接口时设想的样子）到这里才真正兑现。

文件头原先还有原课程的 json-server 启动说明与「务必校验 posts.json 格式」的提醒——数据文件格式损坏是这类前后端分离项目最常见的故障源，值得记住（在线校验工具见参考）。至此 spa 主线的运行时演进到头：模块化（06）+ 持久化（07）+ 前后端分离（08/09）。剩下的 10/10.01 转向工程侧：构建与包管理。

## 参考

JSON 在线校验工具（原课程注释所附）：<http://www.piliapp.com/json/validator/>
