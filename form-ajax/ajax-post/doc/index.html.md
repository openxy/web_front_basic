# 更新：index.html（数据真的发出去了：fetch POST JSON）

前半段不动，提交回调里追加真正的发送：

- `fetch(API + '/users', { method: 'POST', headers: {...}, body: JSON.stringify(...) })`——`API = 'http://localhost:3000'` 是模拟层拦截的基址（版本目录 `mock.json` 声明，种子数据在 `data/users.json`；运行页右下角有「模拟环境」角标）。**代码写的是真实世界形态**：学生下载版本目录后 `npx json-server data/users.json` 即可本机复现
- 应答处理三连：`resp.ok` 不通过就 throw；`resp.json()` 把应答体解析成对象；第二个 `.then` 才拿到数据；`.catch` 兜住全程错误

原课程同一步用 XHR 手工序列化写了 238 行（open/send/onreadystatechange/拼接请求体）；fetch 版三行发三行收——对照的意义不在贬低旧技术，而在看清**接口约定的进步把哪些手工活收走了**。

提交期间页面还是能乱点、重复提交照发不误——等待与防重见 `async` 版。
