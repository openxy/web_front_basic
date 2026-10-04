/*
## 说明
本文件为 fetch 回调版本，后端使用json-server。
与 lib/db.js（09 版）仅差调用风格：本版用 .then() 回调链，09 版用 async/await。
回调签名与 07.01 分支的 $.ajax 版（lib/db.js）完全一致，app.js 无需改动即可切换。

## 启动
```
json-server --watch --port 3000 data/posts.json
```
*/

// API 基础URL
const API_BASE_URL = 'http://localhost:3000';

// 获取所有文章
function db_all(callback) {
  fetch(`${API_BASE_URL}/posts?_sort=id`)
    .then(response => {
      if (!response.ok) { throw new Error('获取所有文章失败'); }
      return response.json();
    })
    .then(posts => callback(posts))
    .catch(error => console.error('获取所有文章失败:', error));
}

// 根据ID查找文章
function db_find(id, callback) {
  fetch(`${API_BASE_URL}/posts/${id}`)
    .then(response => {
      if (!response.ok) { throw new Error(`文章 ${id} 未找到`); }
      return response.json();
    })
    .then(post => callback(post))
    .catch(error => console.error(`查找文章 ${id} 失败:`, error));
}

// 创建新文章
function db_create(post, callback) {
  const today = new Date();
  post["created_at"] = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
    .then(response => {
      if (!response.ok) { throw new Error('创建文章失败'); }
      return response.json();
    })
    .then(newPost => callback(newPost))
    .catch(error => console.error('创建文章失败:', error));
}

// 更新现有文章
function db_update(post, callback) {
  fetch(`${API_BASE_URL}/posts/${post["id"]}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
    .then(response => {
      if (!response.ok) { throw new Error('更新文章失败'); }
      return response.json();
    })
    .then(updatedPost => callback(updatedPost))
    .catch(error => console.error('更新文章失败:', error));
}

// 删除文章
function db_destroy(id, callback) {
  fetch(`${API_BASE_URL}/posts/${id}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) { throw new Error('删除文章失败'); }
      callback();
    })
    .catch(error => console.error(`删除文章 ${id} 失败:`, error));
}

export { db_all, db_find, db_create, db_update, db_destroy };
