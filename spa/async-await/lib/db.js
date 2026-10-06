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

export { db_all, db_find, db_create, db_update, db_destroy };
