/*
## 说明
本文件为 async/await 版本，后端使用json-server

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
* 本版本使用 async/await 模式，调用时需使用 await 或 .then()
*/

// API 基础URL
const API_BASE_URL = 'http://localhost:3000';

// 获取所有文章
async function db_all() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?_sort=id`);
    if (!response.ok) {
      throw new Error('获取所有文章失败');
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('获取所有文章失败:', error);
    throw error;
  }
}

// 根据ID查找文章
async function db_find(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error(`文章 ${id} 未找到`);
    }
    const post = await response.json();
    return post;
  } catch (error) {
    console.error(`查找文章 ${id} 失败:`, error);
    throw error;
  }
}

// 创建新文章
async function db_create(post) {
  try {
    const today = new Date();
    post.created_at = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    });
    
    if (!response.ok) {
      throw new Error('创建文章失败');
    }
    
    const newPost = await response.json();
    return newPost;
  } catch (error) {
    console.error('创建文章失败:', error);
    throw error;
  }
}

// 更新现有文章
async function db_update(post) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    });
    
    if (!response.ok) {
      throw new Error('更新文章失败');
    }
    
    const updatedPost = await response.json();
    return updatedPost;
  } catch (error) {
    console.error('更新文章失败:', error);
    throw error;
  }
}

// 删除文章
async function db_destroy(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('删除文章失败');
    }
    
    await response.json();
    return;
  } catch (error) {
    console.error(`删除文章 ${id} 失败:`, error);
    throw error;
  }
}
