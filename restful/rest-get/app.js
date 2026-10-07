// 本机复现：npx json-server data/posts.json（监听 3000 端口，教学站内由模拟层代劳）
const API = 'http://localhost:3000';

// GET /posts：资源集合的列表，固定按 id 升序
async function loadPosts() {
    const res = await fetch(`${API}/posts`);
    const posts = await res.json();
    const list = document.querySelector('#list');
    list.innerHTML = '';
    for (const p of posts) {
        const li = document.createElement('li');
        li.textContent = `#${p.id} ${p.title}`;
        list.appendChild(li);
    }
}
loadPosts();
