---
title: async/await
seq: 9
parent: ajax-rest
summary: 数据层与控制器改为 async/await：异步代码写成同步的样子
entry: index.html
runtime: shim
---

# async/await

## 本版本引入的概念

**Promise 与 async/await**：`lib/db.js` 的五个接口改为 `async function`，控制器 `app.js` 用 `const data = await db_all()` 直接拿数据，try/catch 统一处理失败。

本版主体即原课程代码的 `index_json_await` 一线原样入册（仅文件名统一为 `index.html` / `lib/db.js` / `app.js`）。

## 对照要点

- 07 的 `db_all(function(data){...})` vs 08 的 `data = await db_all()`：回调 vs 同步书写
- 07 的 `app.js` 每个控制器函数里都嵌一层回调；08 的 `app.js` 平铺直叙
- db 层接口签名变了（回调参数消失），所以控制器必须配套更换——接口即契约

与 `ajax-rest` 的 diff 恰好是 `lib/db.js`、`app.js` 两个文件，左右对照即可看清两种风格的全部差别。

## 运行环境说明

同 07：在线运行为浏览器内模拟 json-server（角标可辨），源代码不含模拟代码。
