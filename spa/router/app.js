// app.js —— 03-router 版
// 本版本只引入一个概念：前端路由。
// 数据仍写死在内存里，视图只有列表与详情两页。

const posts = [
  {id: "1001", created_at: "2022-01-01", title: "第1篇帖子", body: "这是我的第1篇日志"},
  {id: "1002", created_at: "2022-01-02", title: "第2篇帖子", body: "这是我的第2篇日志"}
];

// Define routes and initialize the router
const routes = {
  '/': home,
  '/posts/:id': posts_show
};

const router = new Router(routes);

// define controllers for posts
function home(){
  posts_index()
}

function posts_index(){
  render_view('post/index', posts)
}

function posts_show(id){
  const post = posts.find(function(p){ return String(p["id"]) === String(id) })
  render_view('post/show', post)
}
