import $ from 'jquery';

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
