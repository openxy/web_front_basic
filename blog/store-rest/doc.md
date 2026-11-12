# REST 接口

## 本版本引入的概念

存储介质从本机换到「服务器」：`lib/store.js` 三个接口**同名同参数**，实现换成 `fetch` 调 REST API——但返回值从数据变成了 **Promise**，于是全站调用方被迫改写成 `async/await`。同步与异步的分野在这一版变成改造现场。

七动作的兑现（对照 resource 的接口表）：

| 资源接口表（史前形态） | 本版的 REST | 动词 |
| --- | --- | --- |
| /posts/index.html（列表接口） | `GET /posts` | index |
| /posts/show-1.html（详情接口） | `GET /posts/1` | show |
| （表单页） | `GET /posts/new`、`GET /posts/1/edit` | new / edit |
| /posts/create.php | `POST /posts` | create |
| /posts/update.php | `PUT /posts/1` | update |
| /posts/delete.php | `DELETE /posts/1` | destroy |

URL 从「带扩展名的文件路径」收敛成「名词集合 + 动词」——`.html`/`.php` 都退役了，资源就是名词，动作就是动词，这就是 resourceful 路由的最终形态。

三拍：

+ **是什么**：接口不变（`fetchResource/saveResource/deleteResource`），介质换成 HTTP。数据种子挪进 `data/posts.json`、`data/comments.json`，由 json-server 风格的接口伺服；教学站里由**接口模拟层**拦截请求（运行页右下角有「模拟环境」角标），代码写的都是真实世界形态
+ **怎么兑现**：网络请求发出后 JS 不等结果，先返回 Promise 占位；`await` 把「等待」写回代码里。于是所有用到数据的地方都得是 `async` 函数——连站点模板取侧栏计数也躲不掉（`renderPage` 被迫 async 化）。这就是异步的传染性：一个接口变了，整条调用链改姿势
+ **为什么**：同步接口在本地瞬间返回，装作等待不存在；网络请求动辄几十毫秒，模型必须诚实地把「等待」暴露出来。JS 单线程不能干等（页面会冻住），Promise/await 是单线程世界里表达等待的方案

## 与上一版的 diff

`lib/store.js` 整文件换实现；`lib/data.js` 退役（种子进 `data/`）；8 个页面脚本改 `async/await` 姿势；`mock.json` 声明接口模拟配置。界面与交互体验几乎不变——变的只有数据的来路。

## 观察

- F12 → Network：每次进页面都有 `GET /posts` 请求；提交评论有 `POST /comments`
- 后台删一篇诗文：Network 里出现 `DELETE /posts/N`——上一版「缺的三个数据动作」全部到位
- 本机下载版本目录后 `npx json-server --watch --port 3000 data/posts.json`，同一个前端直接连上真后端

## 思考

+ `fetchResource` 返回 Promise 而不是数据，调用方必须 `await`——如果某个页面忘了 await，会渲染出什么？（提示：`[object Promise]`）
+ 接口模拟层拦截了请求，数据也存在模拟的存储里。它算不算「作弊」？什么样的教学场景必须用真后端？
