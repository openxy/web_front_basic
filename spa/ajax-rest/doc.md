
# Ajax 与 REST API

## 本版本引入的概念

**前后端分离**：数据不再本地存，而是住在后端（json-server），前端经 HTTP 接口读写。

**REST 约定**：资源即 URL、方法即动作——

| 操作 | 方法 + URL |
|---|---|
| 列表 | GET `/posts?_sort=id` |
| 详情 | GET `/posts/:id` |
| 新建 | POST `/posts` |
| 更新 | PUT `/posts/:id` |
| 删除 | DELETE `/posts/:id` |

**数据层**：`lib/db.js`（fetch 回调实现，新写）用 `fetch` + `.then()` 回调链实现同一套 db 接口；回调签名与 07.01 分支的 $.ajax 版一致。接口从「同步返回」变成「回调交付」，控制器 `app.js` 随之回调化：要在回调里拿到数据后再渲染。

与 `localstorage` 的 diff：`lib/db.js`、`app.js` 两个文件更新，新增种子数据 `data/posts.json`——存储从本机搬到了服务器，分层结构不变。

## 运行环境说明

原课程需本地启动 json-server（`json-server --watch --port 3000 data/posts.json`）。本教学软件内置了模拟层：在线运行时上述接口由浏览器内的模拟 json-server 应答（数据种子为 `data/posts.json`，写操作存在本机），运行窗口有「模拟环境」角标；示例源代码本身不含任何模拟代码。

## 思考

回调一层套一层（取数据→渲染→再取数据）会越来越深，怎么把异步代码写得像同步？——async/await，`async-await` 版。
