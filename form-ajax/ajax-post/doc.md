# fetch 发送 JSON

## 本版本引入的概念

**fetch POST**：`fetch(url, { method, headers, body })` 把数据发给接口，返回的 Promise 依次 resolve 出应答对象与解析后的 JSON。前后端从此只交换 JSON，页面不刷新——Ajax 的本义（Asynchronous JavaScript and XML）如今实义是 JSON。

**接口地址**：本版对接 `POST http://localhost:3000/users`（json-server 风格的 REST：POST /集合名 = 新建一条）。在线运行时，教学站的模拟层拦截这个基址并应答（见版本目录 `mock.json` 与种子 `data/users.json`）；本地复现可以起一个真的 json-server，源代码一行不用改。

## 本版本的改动

- `API` 常量 + fetch 调用：`headers` 声明 `Content-Type: application/json`，`body` 是 `JSON.stringify` 的对象
- 三段 `.then`/`.catch`：查 `resp.ok` → 解析 `resp.json()` → 显示回话

## 关键代码走读

- `if (!resp.ok) throw`：fetch 只在网络层面失败才 reject，HTTP 404/500 都算「成功返回」——状态码要自己看，这是 fetch 与 XHR 最大的心性差异
- `body: JSON.stringify({ id: data.name, … })`：用户名直接当主键 id（模拟层按 json-server 语义：POST 时带 id 就用你给的），下一版的查重正好靠 `GET /users/id`
- `.catch` 兜住链上任何一步抛出的错：网络、状态码、JSON 解析，一处收口

## 对照要点（与原课程 form_ajax.htm + ajax.js）

- 原课程三件套：createXHR（IE/ActiveX 兼容）、serialize（手写序列化）、onreadystatechange 状态机（readyState==4 && status 200~304）——现代浏览器里 fetch + FormData 把三件套收成三行
- 原课程 setRequestHeader('X-Requested-With') 让 PHP 分辨「是不是 Ajax」；本线的模拟层按 URL 前缀拦截，不需要这个暗号
- 原课程 enctype="multipart/form-data"（为文件上传而设）删掉了：JSON 方式不传文件，默认表单编码用不上

## 思考题

- 应答不是合法 JSON 时 `.json()` 会怎样？（reject，落进 catch——错误处理统一在链尾）
- 想给用户名查重，接口应该怎么设计？（GET /users/名字：200 已存在、404 不存在——正是最后一版要做的）
