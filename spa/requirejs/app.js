// app.js —— RequireJS/AMD 版入口：先配模块路径，再以依赖数组声明启动（模块体与 ES 模块版一字未动）
requirejs.config({
  baseUrl: '.',
  paths: {
    ejs: 'lib/ejs'    // 模块 id「ejs」→ 实际文件（当年常指 CDN 或 bower 组件）
  }
});

// 依赖数组列出三个模块，加载完成后工厂函数按序收到它们
requirejs(['lib/simple_hash_router', 'lib/view', 'lib/db'],
  function (Router, view, db) {
    const { render_view } = view;
    const { db_all, db_find, db_create, db_update, db_destroy } = db;

// AMD 模块同样不进全局；view.js 的表单拦截经 window 回调进来，需显式挂载
window.after_form_submit_callback = after_form_submit_callback;

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
  let data = db_all();
  render_view('post/index',data)
}

function posts_new(){
  render_view('post/new')
}

function posts_show(id){
  let data = db_find(id);
  render_view('post/show',data)
}

function posts_edit(id){
  let data = db_find(id);
  render_view('post/edit',data)
}

function posts_delete(id){
  //删除是危险操作，一般应提供一个删除表单，请用户确认是否删除。此处从简，留给同学们实现
  //renderTemplate('#main','post/delete','posts',id)
  db_destroy(id)
  posts_index()
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
  db_create(post) 
  window.location = `#/`
}

function posts_update(post) {
  db_update(post);
  window.location = `#/posts/${post['id']}`
}
  });
