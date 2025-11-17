# 博客单页应用 (SPA) 项目

## 项目概述

这是一个基于纯 JavaScript 实现的单页博客应用，提供了三种数据存储方式：
* 本地存储同步版本： index_sync.html
* RESTful API 异步回调版本 index_json.html
* RESTful API async/await 版本 index_sync_await.html

该项目展示了如何使用客户端路由、模板引擎和不同的数据存储后端构建一个功能完整的博客系统。

### 技术栈

- **前端**: 纯 JavaScript (ES6+)
- **路由**: 自定义基于哈希的路由系统 (simple_hash_router.js)
- **模板引擎**: EJS (通过本地 ejs.js 加载)
- **数据存储**:
  - localStorage (通过 db_sync.js 封装)
  - RESTful API 回调版本 (通过 db_json.js 封装，使用 json-server)
  - RESTful API async/await 版本 (通过 db_json_await.js 封装，使用 json-server)
- **可选依赖**: jQuery (view.jquery.js 提供了 jQuery 版本)
- **网络请求**: Fetch API (用于 RESTful API 版本)
- **异步处理**: 回调函数和 async/await 两种模式

## 项目结构

```
blog-spa/
├── index.html              # 主页面 (使用本地存储)
├── index_json.html         # API版本主页面 (使用RESTful API回调模式)
├── index_json_await.html   # API版本主页面 (使用RESTful API async/await模式)
├── app.js                  # 主应用逻辑 (本地存储版本)
├── app_json.js             # 主应用逻辑 (RESTful API回调模式)
├── app_json_await.js       # 主应用逻辑 (RESTful API async/await模式)
├── todo.md                 # 待开发功能列表
├── IFLOW.md                # 项目文档
├── css/                    # 样式目录 (当前为空)
├── data/
│   └── posts.json          # API版本的数据存储文件 (已包含示例数据)
├── lib/
│   ├── simple_hash_router.js # 自定义哈希路由实现
│   ├── view.js             # 视图渲染工具 (原生JS版本)
│   ├── view.jquery.js      # 视图渲染工具 (jQuery版本)
│   ├── view_es6_js         # 视图渲染工具 (ES6版本)
│   ├── db_sync.js         # localStorage数据库封装
│   ├── db_json.js          # RESTful API数据库封装 (回调模式)
│   ├── db_json_await.js    # RESTful API数据库封装 (async/await模式)
│   ├── db_json_jquery.js   # RESTful API数据库封装 (jQuery版本)
│   └── ejs.js              # EJS模板引擎 (本地备份)
└── view/post/              # 博客文章模板
    ├── edit.tpl           # 编辑文章模板
    ├── index.tpl          # 文章列表模板
    ├── new.tpl            # 新建文章模板
    └── show.tpl           # 显示文章模板
```

## 功能特性

- **文章管理**: 创建、读取、更新、删除博客文章
- **客户端路由**: 基于哈希的路由系统，支持参数化路由
- **模板渲染**: 使用 EJS 模板引擎动态渲染内容
- **多种数据存储模式**:
  - 本地存储版本 (localStorage)
  - RESTful API 回调版本 (需要 json-server 后端)
  - RESTful API async/await 版本 (需要 json-server 后端)
- **单页应用**: 无需页面刷新的用户体验
- **现代网络请求**: API 版本使用 Fetch API 处理异步操作
- **异步处理模式**: 支持回调函数和 async/await 两种异步处理方式
- **缓存控制**: 设置了禁用浏览器缓存的 meta 标签

## 运行方式

### 本地存储同步版本 (index_sync.html)

1. 直接在浏览器中打开 `index.html` 文件
2. 或者使用本地服务器运行 (推荐):
   ```bash
   # 使用 Python
   python -m http.server 8000

   # 使用 Node.js
   npm i -g http-server
   http-server -c-1

   # 使用 PHP
   php -S localhost:8000
   ```

### RESTful API async 回调版本 (index_json.html)

1. 安装 json-server:
   ```bash
   npm install -g json-server
   ```

2. 数据文件 `data/posts.json` 已存在并包含示例数据，格式如下:
   ```json
   {
     "posts": [
       {
         "id": "137d",
         "created_at": "2025-10-19",
         "title": "第2篇帖子",
         "body": "这里是我的第2篇日志"
       }
     ]
   }
   ```

3. 启动 API 服务器 (端口 3000):
   ```bash
   json-server --watch --port 3000 data/posts.json
   ```

4. 在浏览器中打开 `index_json.html`

### RESTful API async/await 版本 (index_json_await.html)

1. 安装 json-server:
   ```bash
   npm install -g json-server
   ```

2. 数据文件 `data/posts.json` 已存在并包含示例数据，格式同上

3. 启动 API 服务器 (端口 3000):
   ```bash
   json-server --watch --port 3000 data/posts.json
   ```

4. 在浏览器中打开 `index_json_await.html`

## 路由结构

两个版本共享相同的路由结构:
- `/` - 首页 (文章列表)
- `/posts/new` - 创建新文章
- `/posts/:id` - 查看文章详情
- `/posts/:id/edit` - 编辑文章
- `/posts/:id/delete` - 删除文章

## 数据库 API

### 本地存储 API (db_sync.js)

- `db_all()` - 获取所有文章
- `db_find(id)` - 根据ID查找文章
- `db_create(post)` - 创建新文章
- `db_update(post)` - 更新现有文章
- `db_destroy(id)` - 删除文章
- `db_get_last_key()` - 获取最大ID，用于自增长ID

### RESTful API (db_json.js) - 异步回调模式

所有函数使用回调模式: `function(result)`

- `db_all(callback)` - 获取所有文章
- `db_find(id, callback)` - 根据ID查找文章
- `db_create(post, callback)` - 创建新文章
- `db_update(post, callback)` - 更新现有文章
- `db_destroy(id, callback)` - 删除文章

**注意**: API 版本使用 Fetch API 实现异步请求，基础URL为 `http://localhost:3000`

### RESTful API (db_json_await.js) - async/await 模式

所有函数使用 async/await 模式，返回 Promise:

- `await db_all()` - 获取所有文章
- `await db_find(id)` - 根据ID查找文章
- `await db_create(post)` - 创建新文章
- `await db_update(post)` - 更新现有文章
- `await db_destroy(id)` - 删除文章

**注意**: 使用 async/await 模式时，调用函数需要使用 await 或 .then() 处理返回的 Promise

## 开发说明

### 代码版本

项目提供了三个版本的主要应用逻辑:
- `app.js` + `.js` - 使用 localStorage
- `app_json.js` + `db_json.js` - 使用 RESTful API (回调模式)
- `app_json_await.js` + `db_json_await.js` - 使用 RESTful API (async/await模式)

### 模板系统

模板文件位于 `view/post/` 目录下，使用 EJS 语法:
- `<%= %>` - 输出转义后的内容
- `<% %>` - 执行 JavaScript 代码

### 路由实现

哈希路由系统 (`simple_hash_router.js`) 支持参数化路由，如 `/posts/:id`，会自动提取参数并传递给处理函数。

### 异步处理

项目提供了多种异步处理方式:
- 回调模式: `app_json.js` + `db_json.js` 使用 Fetch API 和回调函数处理异步操作
- async/await 模式: `app_json_await.js` + `db_json_await.js` 使用现代的 async/await 语法处理异步操作，代码更清晰易读

### 待开发功能

根据 `todo.md` 文件，以下功能正在计划中:
- 客户端的数据检验
- ESM (ES Modules) 封装
- 删除表单采用JS动态生成

### 扩展建议

1. **样式**: 当前 CSS 目录为空，可以添加样式美化界面
2. **数据验证**: 添加客户端和服务端数据验证逻辑
3. **错误处理**: 完善错误处理机制和用户提示
4. **编辑器**: 为文章内容添加富文本编辑器
5. **分页**: 为文章列表添加分页功能
6. **搜索**: 添加文章搜索功能
7. **用户系统**: 添加用户认证和权限管理
8. **模块化**: 使用 ES Modules 重构代码

## 调试提示

1. 使用浏览器开发者工具 (F12) 的 Application 面板查看和管理 localStorage
2. 在 Console 面板勾选 "Preserve log" 以保留页面跳转时的日志
3. API 版本可以在 Network 面板查看 HTTP 请求状态
4. 代码中包含了一些调试注释，可以帮助理解实现细节
5. API 版本启动前请确保 json-server 正在运行在端口 3000

## 版本差异

| 特性 | 本地存储版本 | API版本(回调) | API版本(async/await) |
|------|------------|---------|-------------------|
| 数据持久化 | localStorage | RESTful API | RESTful API |
| 异步处理 | 同步 | Fetch API + 回调 | Fetch API + async/await |
| 依赖 | 仅前端 | 需要json-server后端 | 需要json-server后端 |
| 数据共享 | 仅限当前浏览器 | 可跨设备共享 | 可跨设备共享 |
| 适用场景 | 原型开发、演示 | 生产环境 | 生产环境 |
| 文件名前缀 | db_sync.js | db_json.js | db_json_await.js |
| 代码风格 | 传统同步 | 回调函数 | 现代异步语法 |

## 注意事项

1. **API 版本端口**: 确保 json-server 运行在端口 3000，与代码中的配置一致
2. **数据格式**: 请确保 `data/posts.json` 文件格式正确，否则会导致 API 请求失败
3. **浏览器缓存**: 项目已设置禁用缓存的 meta 标签，但开发时仍建议使用硬刷新 (Ctrl+F5)
4. **ID 生成**: 本地存储版本使用数字 ID，API 版本使用字符串 ID
