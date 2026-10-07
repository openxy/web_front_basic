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
        const editBtn = document.createElement('button');
        editBtn.textContent = '改';
        editBtn.addEventListener('click', async () => {
            // PUT /posts/:id：全量替换——整个对象都要送回去，漏掉的字段会被清掉
            const res = await fetch(`${API}/posts/${p.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: p.id, title: `${p.title}（改）`, body: p.body }),
            });
            await res.json();    // 200：应答体是替换后的资源
            loadPosts();
        });
        li.appendChild(editBtn);
        const delBtn = document.createElement('button');
        delBtn.textContent = '删';
        delBtn.addEventListener('click', async () => {
            // DELETE /posts/:id：资源即逝，应答 204 没有应答体——不要再 res.json()
            await fetch(`${API}/posts/${p.id}`, { method: 'DELETE' });
            loadPosts();
        });
        li.appendChild(delBtn);
        li.addEventListener('click', () => showPost(p.id));
        list.appendChild(li);
    }
}

// GET /posts/:id：路径参数定位单个资源
async function showPost(id) {
    const detail = document.querySelector('#detail');
    try {
        const res = await fetch(`${API}/posts/${id}`);
        if (!res.ok) {                   // 404 等：fetch 不抛错，状态码交给你判断
            detail.textContent = `查无此帖（${res.status}）`;
            detail.style.color = 'red';
            return;
        }
        const post = await res.json();
        detail.textContent = `#${post.id} ${post.title} —— ${post.body}`;
        detail.style.color = '';
    } catch (e) {                        // 根本到不了服务器（断网/地址错）才走这里
        detail.textContent = `网络异常：${e.message}`;
        detail.style.color = 'red';
    }
}

// POST /posts：把新资源的表示送上去，id 由服务器生成
document.querySelector('#new').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const res = await fetch(`${API}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title.value, body: form.body.value }),
    });
    const post = await res.json();    // 201：应答体即新建好的资源，带着服务器发的 id
    form.reset();
    loadPosts();
    showPost(post.id);
});

// 查任意 id：把错误路径交到用户手上
document.querySelector('#find').addEventListener('submit', (event) => {
    event.preventDefault();
    showPost(event.target.elements.id.value.trim());
});
loadPosts();
