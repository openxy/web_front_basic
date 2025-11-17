// app_json.js - 使用异步RESTful API版本，适配回调模式

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
function home() {
  posts_index();
}

// 异步获取文章列表
function posts_index() {
  db_all(function(data) {
    render_view('post/index', data);
  });
}

// 显示新建文章表单
function posts_new() {
  render_view('post/new');
}

// 异步显示单篇文章
function posts_show(id) {
  db_find(id, function(data) {
    render_view('post/show', data);
  });
}

// 异步显示编辑文章表单
function posts_edit(id) {
  db_find(id, function(data) {
    render_view('post/edit', data);
  });
}

// 异步删除文章
function posts_delete(id) {
  db_destroy(id, function() {
    posts_index(); // 删除成功后返回列表页
  });
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
  db_create(post, function(data) {
    window.location = '#/'
  });
}

function posts_update(post) {
  db_update(post, function(data) {
    window.location = `#/posts/${post['id']}`
  });
}


