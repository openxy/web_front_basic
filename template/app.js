// app.js —— 02-template 版
// 本版本只引入一个概念：前端模板引擎。
// 数据硬编码在内存里，页面只有一个只读的文章列表。

const posts = [
  {id: "1001", created_at: "2022-01-01", title: "第1篇帖子", body: "这是我的第1篇日志"},
  {id: "1002", created_at: "2022-01-02", title: "第2篇帖子", body: "这是我的第2篇日志"}
];

// 渲染文章列表：把数据交给模板，由模板生成 html 并填入 #main
function posts_index(){
  render_view('post/index', posts)
}

// 没有路由，直接执行
posts_index();
