/*
  调试提示：
  1、 浏览器的devtools(F12)允许对Localstorage进行调试，在application面板中  https://www.html.cn/doc/chrome-devtools/manage-data/local-storage/
  2、 当存在页面跳转时，console里的日志通常会被跳过，注意勾选console面板中preserve log选项 https://blog.csdn.net/qq_35421305/article/details/115325546
  3、 更多调试工具信息  https://zhuanlan.zhihu.com/p/62177097
*/

//此处的缺陷是，仅支持一种内容类型或数据表即post，如果系统中存在两种内容类型如帖子和用户，则难以处理。
//解决方案可以考虑使用indexDB或WebSql等存储方式。以及使用https://github.com/localForage/localForage/ 这类的通用库。
function db_all(){
  let posts = []
  for ( let i = 0, len = localStorage.length; i < len; ++i ) {
    let post  = localStorage.getItem( localStorage.key( i ) )         
    posts[i] = JSON.parse(post)
  }
  return posts.sort(function(p1,p2){
    return p1["id"] - p2["id"] ;
  });
}

function db_find(id){
  let post = localStorage.getItem(id)
  return JSON.parse(post)
}

// 获取最大的id，以防止冲突。模拟mysql中的自增长id。
function db_get_last_key(){
  let max = 0
  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    let key = parseInt(localStorage.key(i))
    if(key > max){max = key}
  }
  return max + 1
}

function db_create(post){       
  let today = new Date()
  post["created_at"] = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  post["id"] = db_get_last_key()
  return localStorage.setItem(post["id"], JSON.stringify(post))        
}

function db_update(post){   
  let old_post = db_find(post["id"])
  let new_post = Object.assign({}, old_post, post);
  return localStorage.setItem(post["id"], JSON.stringify(new_post))        
}

function db_destroy(id){   
  localStorage.removeItem(id)
}
export { db_all, db_find, db_create, db_update, db_destroy };
