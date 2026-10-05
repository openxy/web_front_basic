// app.js

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
  data = db_all();
  render_view('post/index',data)
}

function posts_new(){
  render_view('post/new')
}

function posts_show(id){
  data = db_find(id);
  render_view('post/show',data)
}

function posts_edit(id){
  data = db_find(id);
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
