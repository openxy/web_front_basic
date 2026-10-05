import $ from 'jquery';

/*
## 说明
本文件为异步版本，后端使用json-server

## 安装
* node.js 环境
* 安装json-server: npm i -g json-server
* 创建data/posts.json文件,内容
{
  "posts": [
    
  ]
}

## 启动
在项目根目录下，启动json-server做为api服务器，以下指定端口
```
json-server --watch --port 3000 data/posts.json
```
在浏览器中检查 http://localhost:3000/ 是否能成功访问

## 注意
* 请务必对posts.json文件的数据格式进行校验，否则使用ajax装载时，会报错误！
* 在线 json validator 工具 http://www.piliapp.com/json/validator/
*/

// API 基础URL
const API_BASE_URL = 'http://localhost:3000';

// 获取所有文章
function db_all(callback) {
  $.ajax({
    url: `${API_BASE_URL}/posts?_sort=id`,
    method: 'GET',
    success: function(posts) {
      callback(posts);
    },
    error: function(xhr, status, error) {
      console.error('获取所有文章失败:', error);
    }
  });
}

// 根据ID查找文章
function db_find(id, callback) {
  $.ajax({
    url: `${API_BASE_URL}/posts/${id}`,
    method: 'GET',
    success: function(post) {
      callback(post);
    },
    error: function(xhr, status, error) {
      console.error(`查找文章 ${id} 失败:`, error);
    }
  });
}

// 创建新文章
function db_create(post, callback) {
  const today = new Date();
  post["created_at"] = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  $.ajax({
    url: `${API_BASE_URL}/posts`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(post),
    success: function(newPost) {
      callback(newPost);
    },
    error: function(xhr, status, error) {
      console.error('创建文章失败:', error);
    }
  });
}

// 更新现有文章
function db_update(post, callback) {
  $.ajax({
    url: `${API_BASE_URL}/posts/${post["id"]}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(post),
    success: function(updatedPost) {
      callback(updatedPost);
    },
    error: function(xhr, status, error) {
      console.error('更新文章失败:', error);
    }
  });
}

// 删除文章
function db_destroy(id, callback) {
  $.ajax({
    url: `${API_BASE_URL}/posts/${id}`,
    method: 'DELETE',
    success: function(result) {
      callback();
    },
    error: function(xhr, status, error) {
      console.error(`删除文章 ${id} 失败:`, error);
    }
  });
}

export { db_all, db_find, db_create, db_update, db_destroy };
