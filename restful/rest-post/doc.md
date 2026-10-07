# POST 新建

## 本版本引入的概念

**POST = 在集合里新建一件**。同一个地址 `/posts`，上一版用 GET 读列表，这版用 POST 加新的——REST 的表达力就在这：URL 指资源，方法表意图，地址不变、动词不同、行为不同。

三个配套细节：请求头 `Content-Type: application/json` 声明表示格式；请求体 `JSON.stringify` 把对象序列化成 JSON 文本；应答 **201**（Created）带上的正是新建好的资源——**id 由服务器生成**，客户端只提交内容，不越权定身份。

## 本版本的改动

index.html 顶部加一个标题加正文的表单；app.js 加 submit 监听：preventDefault 拦下原生提交，POST 成功后清空表单、重拉列表、顺带把详情区切到新帖。

## 试试

1. 新建一条：列表出现第 5 条（id 是服务器发的，不是你填的），详情区直接显示它
2. 连建三条再刷新页面：都在——数据落在服务端（教学站里是 localStorage 模拟）
3. 本机 json-server 复现时看 Network：请求方法 POST、状态 201

## 思考题

- 客户端不自造 id，除了「不越权」还有什么好处？（提示：两个客户端同时新建）
- GET 也带 body 行不行？为什么 HTTP 不鼓励？
