# restful：一套资源的四个动词

## 本案例教什么

围绕一套资源 `/posts`，六版把 REST 的常用动词各上一版：GET 读列表、GET 读单个、POST 新建、PUT 全量更新、DELETE 删除，最后用状态码与错误处理收束。每一版只加一个动词、只动一个文件，相邻两版的 diff 就是概念本身——「URL 指资源、方法表意图、JSON 做表示」不是背出来的，是六次fetch 选项的增量攒出来的。

运行环境是接口模拟（runtime: shim）：教学站里请求被模拟层接住（右下角「模拟环境」角标，数据落 localStorage）；示例代码写的是真实世界形态——下载任一版本目录，`npx json-server data/posts.json` 即可在本机原样复现。

## 版本导览

| 版本 | 标题 | 一句话 |
| --- | --- | --- |
| 1 | [GET 列表](#v=restful/rest-get) | fetch GET /posts：URL 即资源地址，方法即意图 |
| 2 | [GET 单个资源](#v=restful/rest-get-id) | /posts/:id 路径参数定位个体：读集合是目录，读单个是档案 |
| 3 | [POST 新建](#v=restful/rest-post) | JSON 序列化送表示，id 由服务器生成，201 应答回新资源 |
| 4 | [PUT 全量更新](#v=restful/rest-put) | 整个对象送回替换，漏送的字段被清掉；与 POST 的幂等对照 |
| 5 | [DELETE 删除](#v=restful/rest-delete) | 一发资源即逝，204 无应答体；CRUD 四动词凑齐 |
| 6 | [状态码与错误处理](#v=restful/rest-error) | 404 看 res.ok、断网归 try/catch：HTTP 状态码是唯一真相 |

## 重点与边界

- 重点：资源与方法的一一对应、路径参数、Content-Type 与 JSON 序列化、幂等性（PUT/DELETE 与 POST 的对照）、两层错误（HTTP 状态码 vs 网络异常）
- 边界：模拟层是 json-server 风格（查询参数被忽略、列表恒按 id 排序）；不讲 PATCH、HEAD、OPTIONS 与缓存语义，不讲 REST 成熟度模型
- 配套教程：《Web 前端开发技术》第 12 章 restful——教程讲概念与信封约定，本案例给可跑的动词演化；[spa 案例](#p=spa) 的 ajax-rest 版是同一主题在完整应用里的样子
