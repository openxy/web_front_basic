// db.js —— 05-db 版数据层（内存数组实现）
// 五个接口 db_all / db_find / db_create / db_update / db_destroy 是数据层的标准契约，
// 后续版本（07 起）只更换本文件的内部实现，app.js 无需改动即可切换。
// 内存数组不持久：刷新页面数据即回到初始状态（这正是 07 版要解决的问题）。

let db = {
  posts: [
    {id: "1001", created_at: "2022-01-01", title: "第1篇帖子", body: "这是我的第1篇日志"},
    {id: "1002", created_at: "2022-01-02", title: "第2篇帖子", body: "这是我的第2篇日志"}
  ]
};

function db_all(){
  return db.posts.slice().sort(function(p1,p2){
    return p1["id"] - p2["id"] ;
  });
}

function db_find(id){
  return db.posts.find(function(p){ return String(p["id"]) === String(id) });
}

// 获取最大的id，以防止冲突。模拟mysql中的自增长id。
function db_get_last_key(){
  let max = 0
  for ( let post of db.posts ){
    let key = parseInt(post["id"])
    if(key > max){max = key}
  }
  return max + 1
}

function db_create(post){
  let today = new Date()
  post["created_at"] = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  post["id"] = db_get_last_key()
  db.posts.push(post)
}

function db_update(post){
  let i = db.posts.findIndex(function(p){ return String(p["id"]) === String(post["id"]) })
  if(i > -1){ db.posts[i] = post }
}

function db_destroy(id){
  db.posts = db.posts.filter(function(p){ return String(p["id"]) !== String(id) })
}

export { db_all, db_find, db_create, db_update, db_destroy };
