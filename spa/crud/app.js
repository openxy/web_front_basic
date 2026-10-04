// app.js —— 04-crud 版
// 在 03 的基础上补齐增删改。本版数据仍是 app.js 里的一个数组，
// 对它的查找、自增 id、push/splice 全部内联在控制器里——这正是 05 版要抽出去的部分。

const posts = [
  {id: "1001", created_at: "2022-01-01", title: "第1篇帖子", body: "这是我的第1篇日志"},
  {id: "1002", created_at: "2022-01-02", title: "第2篇帖子", body: "这是我的第2篇日志"}
];

// Define routes and initialize the router
const routes = {
  '/': home,
  '/posts/new': posts_new,
  '/posts/:id': posts_show,
  '/posts/:id/edit': posts_edit,
  '/posts/:id/delete': posts_delete
};

const router = new Router(routes);

// define controllers for posts
function home(){
  posts_index()
}

function posts_index(){
  render_view('post/index', posts)
}

function posts_new(){
  render_view('post/new')
}

function posts_show(id){
  render_view('post/show', find_post(id))
}

function posts_edit(id){
  render_view('post/edit', find_post(id))
}

function posts_delete(id){
  //删除是危险操作，一般应提供一个删除表单，请用户确认是否删除。此处从简，留给同学们实现
  const i = posts.findIndex(function(p){ return String(p["id"]) === String(id) })
  if(i > -1){ posts.splice(i, 1) }
  posts_index()
}

// ---- 以下都是直接摆弄 posts 数组的数据操作，混在控制器里 ----

function find_post(id){
  return posts.find(function(p){ return String(p["id"]) === String(id) })
}

// 获取最大的id，以防止冲突。模拟mysql中的自增长id。
function next_id(){
  let max = 0
  for ( let post of posts ){
    let key = parseInt(post["id"])
    if(key > max){max = key}
  }
  return max + 1
}

// 拦截表单提交后的回调callback
function after_form_submit_callback(post) {
  if(!post['id']) {
    posts_create(post);
  } else {
    posts_update(post);
  }
}

function posts_create(post) {
  // 此处也可以直接调用posts_index()来更新页面，但地址栏的地址不会变化。
  // 而使用http客户端重定向，则相当于完整地执行一个页面跳转流程，而不仅仅是页面的更新。
  today = new Date()
  post["created_at"] = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  post["id"] = next_id()
  posts.push(post)
  window.location = `#/`
}

function posts_update(post) {
  const i = posts.findIndex(function(p){ return String(p["id"]) === String(post["id"]) })
  if(i > -1){ posts[i] = post }
  window.location = `#/posts/${post['id']}`
}
