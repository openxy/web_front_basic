# 更新：index.html（用户名失焦即查重，新增 blur 监听一段）

新增的是**第二条事件线**：提交线之外，用户名输入框自己挂了 blur（失焦）监听：

- `fetch(\`${API}/users/${encodeURIComponent(name)}\`)`——GET 单条记录的路由；`encodeURIComponent` 处理特殊字符，拼 URL 的卫生习惯
- **状态码即答案**：`resp.ok`（2xx）说明查到了 = 已占用；404 说明查无此人 = 可用。不用读应答体，一个 GET 把「提交等报错」压成「填完就知道」
- 提示复用 validate 那套 `<span class="tip">`，`classList.toggle('ok', !taken)` 切颜色区分两种结局；格式不对时直接 return，交给提交时的 validate，两套提示不打架

至此六版闭环：原生提交的痛 → 接管 → 发送 → 异步体验 → 本地校验 → 服务端可查的即时反馈。一个注册表单该有的工程件数全齐，每版只加一件。
