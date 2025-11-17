// app_json_await.js - 使用异步RESTful API版本，适配async/await模式

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
async function posts_index() {
  try {
    const data = await db_all();
    render_view('post/index', data);
  } catch (error) {
    console.error('获取文章列表失败:', error);
  }
}

// 显示新建文章表单
function posts_new() {
  render_view('post/new');
}

// 异步显示单篇文章
async function posts_show(id) {
  try {
    const data = await db_find(id);
    render_view('post/show', data);
  } catch (error) {
    console.error('获取文章详情失败:', error);
  }
}

// 异步显示编辑文章表单
async function posts_edit(id) {
  try {
    const data = await db_find(id);
    render_view('post/edit', data);
  } catch (error) {
    console.error('获取编辑文章数据失败:', error);
  }
}

// 异步删除文章
async function posts_delete(id) {
  try {
    await db_destroy(id);
    posts_index(); // 删除成功后返回列表页
  } catch (error) {
    console.error('删除文章失败:', error);
  }
}

// 拦截表单提交后的回调callback
async function after_form_submit_callback(post) {
  try {
    if(!post.id) {
      await posts_create(post);
    } else {
      await posts_update(post);
    }
  } catch (error) {
    console.error('提交表单失败:', error);
  }
}

async function posts_create(post) {
  // 此处也可以直接调用posts_index()来更新页面，但地址栏的地址不会变化。
  // 而使用http客户端重定向，则相当于完整地执行一个页面跳转流程，而不仅仅是页面的更新。
  try {
    await db_create(post);
    window.location = '#/'
  } catch (error) {
    console.error('创建文章失败:', error);
  }
}

async function posts_update(post) {
  try {
    await db_update(post);
    window.location = `#/posts/${post.id}`
  } catch (error) {
    console.error('更新文章失败:', error);
  }
}


