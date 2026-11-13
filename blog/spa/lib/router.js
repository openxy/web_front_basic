// 单页应用：一张路由表收编全部页面。hash 即地址（#/posts/1），hashchange 即导航
// 站点地图（#/sitemap）直接由本表生成——路由表是 URL 布局的单一事实源
const ROUTES = [
  { path: /^\/$/, sample: '/', title: '首页', active: '首页', view: viewHome },
  { path: /^\/posts$/, sample: '/posts', title: '诗文列表', active: '文章', view: viewPosts },
  { path: /^\/posts\/new$/, sample: '/posts/new', title: '新建诗文', active: '文章', view: viewPostNew },
  { path: /^\/posts\/([\w-]+)\/edit$/, sample: '/posts/1/edit', title: '编辑诗文', active: '文章', view: viewPostEdit },
  { path: /^\/posts\/([\w-]+)$/, sample: '/posts/1', title: '诗文', active: '文章', view: viewPostShow },
  { path: /^\/tags$/, sample: '/tags', title: '标签', active: '标签', view: viewTags },
  { path: /^\/login$/, sample: '/login', title: '登录', active: '登录', view: viewLogin },
  { path: /^\/admin\/posts$/, sample: '/admin/posts', title: '博文管理', active: '博文管理', view: viewAdminPosts },
  { path: /^\/admin\/comments$/, sample: '/admin/comments', title: '评论管理', active: '评论管理', view: viewAdminComments },
  { path: /^\/about$/, sample: '/about', title: '关于本站', active: '关于', view: viewAbout },
  { path: /^\/sitemap$/, sample: '/sitemap', title: '站点地图', active: '站点地图', view: viewSitemap },
]

const ROOT = '.'
const PAGE_SIZE = 5

function parseHash() {
  const raw = location.hash.slice(1) || '/'
  const [path, query] = raw.split('?')
  return { path, params: new URLSearchParams(query || '') }
}

async function route() {
  const { path, params } = parseHash()
  const match = ROUTES.find(r => r.path.test(path))
  if (!match) {
    document.title = '页面不存在 - 诗豪小筑'
    await renderPage(ROOT, '', `<section class="post-index">
<h1>页面不存在</h1>
<p class="meta">请从<a href="#/">首页</a>进入，或看<a href="#/sitemap">站点地图</a>。</p>
</section>`)
    return
  }
  document.title = match.title + ' - 诗豪小筑'
  const args = path.match(match.path).slice(1)
  await match.view(params, ...args)
}

// ---- 前台视图 ----

async function viewHome(params) {
  const posts = await fetchResource('post')
  const state = { page: 0 }

  function renderList() {
    const sorted = sortPosts(posts)
    const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
    if (state.page > pages - 1) state.page = pages - 1
    const slice = sorted.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE)

    document.getElementById('post-list').innerHTML = slice.map(p => renderPostCard(ROOT, p)).join('\n\n')
    document.getElementById('pager').innerHTML = renderPager(pages, state.page)
  }

  await renderPage(ROOT, '首页', `<section class="post-list">
<h1>最新诗文</h1>

<div id="post-list"></div>
<nav class="pager" id="pager"></nav>
</section>`)

  // 页码按钮动态生成，监听器挂在容器上（事件委托），新增删除按钮都不用重挂
  document.getElementById('pager').addEventListener('click', e => {
    const page = e.target.dataset.page
    if (page !== undefined) {
      state.page = Number(page)
      renderList()
    }
  })

  renderList()
}

async function viewPosts(params) {
  const state = {
    category: params.get('category') || '',
    tag: params.get('tag') || '',
    sort: 'pinned',
    page: 0,
  }
  const allPosts = await fetchResource('post')

  function currentPosts() {
    let posts = state.sort === 'pinned' ? sortPosts(allPosts) : [...allPosts].sort((a, b) => b.year - a.year)
    if (state.category) posts = posts.filter(p => p.category === state.category)
    if (state.tag) posts = posts.filter(p => p.tags.includes(state.tag))
    return posts
  }

  function renderList() {
    const posts = currentPosts()
    const pages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
    if (state.page > pages - 1) state.page = pages - 1
    const slice = posts.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE)

    let label
    if (state.category) label = `分类「${state.category}」共 ${posts.length} 篇`
    else if (state.tag) label = `标签「${state.tag}」共 ${posts.length} 篇`
    else label = `共 ${posts.length} 篇`

    document.getElementById('post-summary').textContent = label
    document.getElementById('post-toc').innerHTML = posts.length
      ? slice.map(p => renderPostRow(ROOT, p)).join('\n')
      : '<li>没有符合条件的诗文。</li>'
    document.getElementById('pager').innerHTML = renderPager(pages, state.page)
  }

  function optionList(values, current) {
    return ['<option value="">全部</option>']
      .concat(values.map(v => `<option value="${v}" ${v === current ? 'selected' : ''}>${v}</option>`))
      .join('\n')
  }

  await renderPage(ROOT, '文章', `<section class="post-index">
<h1>诗文列表</h1>
<p class="meta" id="post-summary"></p>
<div class="filter-bar">
<label>分类 <select id="filter-category">${optionList(['诗', '词', '文'], state.category)}</select></label>
<label>标签 <select id="filter-tag">${optionList(Object.keys(tagCounts(allPosts)), state.tag)}</select></label>
<label>排序 <select id="filter-sort">
<option value="pinned" selected>置顶优先</option>
<option value="year" ${state.sort === 'year' ? 'selected' : ''}>纯按年代</option>
</select></label>
</div>
<ul class="post-toc" id="post-toc"></ul>
<nav class="pager" id="pager"></nav>
</section>`)

  document.getElementById('filter-category').addEventListener('change', e => {
    state.category = e.target.value
    state.page = 0
    renderList()
  })

  document.getElementById('filter-tag').addEventListener('change', e => {
    state.tag = e.target.value
    state.page = 0
    renderList()
  })

  document.getElementById('filter-sort').addEventListener('change', e => {
    state.sort = e.target.value
    state.page = 0
    renderList()
  })

  document.getElementById('pager').addEventListener('click', e => {
    const page = e.target.dataset.page
    if (page !== undefined) {
      state.page = Number(page)
      renderList()
    }
  })

  renderList()
}

async function viewPostShow(params, id) {
  let post
  try {
    post = await fetchResource('post', id)
  } catch (err) {
    await renderPage(ROOT, '文章', `<article class="post-full">
<h1>诗文不存在</h1>
<p class="meta">请从<a href="#/posts">诗文列表</a>进入。</p>
</article>`)
    return
  }

  function commentsOf(comments) {
    return comments.filter(c => c.postId === id)
  }

  function renderComments(comments) {
    const items = comments.length
      ? comments.map(c => `<li><strong>${c.author}</strong>（${c.date}）：${c.body}</li>`).join('\n')
      : '<li>还没有评论，来写第一条。</li>'
    document.querySelector('.comments ul').innerHTML = items
  }

  const comments = commentsOf(await fetchResource('comment'))
  await renderPage(ROOT, '文章', `<article class="post-full">
${renderPostFull(ROOT, post, comments)}
</article>`)

  document.getElementById('post-full').addEventListener('submit', async e => {
    e.preventDefault()
    const form = e.target
    const body = form.body.value.trim()
    if (!body) return
    await saveResource('comment', { postId: id, author: form.author.value.trim() || '匿名', body, date: new Date().toLocaleDateString('zh-CN') })
    form.reset()
    renderComments(commentsOf(await fetchResource('comment')))
  })
}

async function viewTags(params) {
  const posts = await fetchResource('post')
  const counts = tagCounts(posts)
  const tags = Object.keys(counts).sort((a, b) => counts[b] - counts[a])
  await renderPage(ROOT, '标签', `<section class="tag-list">
<h1>标签</h1>
<p class="meta">按热度（关联篇数）降序</p>
<ul>
${tags.map(t => `<li><a href="#/posts?tag=${t}">${t}</a>（${counts[t]} 篇）</li>`).join('\n')}
</ul>
</section>`)
}

async function viewAbout(params) {
  await renderPage(ROOT, '关于', `<section class="about">
<h1>关于本站</h1>

<figure class="about-fig">
<img src="assets/img/portrait.svg" alt="诗人小像（示意）">
<figcaption>诗豪小像（示意画）</figcaption>
</figure>

<p>刘禹锡（772—842），字梦得，洛阳人，中唐著名诗人，有「诗豪」之称。与柳宗元并称「刘柳」，晚年与白居易唱和，并称「刘白」。</p>

<p>永贞元年（805年）参与王叔文革新，失败后被贬朗州，此后辗转连州、夔州、和州等地，外放二十余年。长期贬谪没有压垮他，反而成就了秋词、竹枝词、金陵怀古等一批最有生命力的作品。</p>

<p>本站以他的诗文为内容样本，演示一个个人博客从静态页面到单页应用的完整演进，详见<a href="#/sitemap">站点地图</a>。</p>
</section>`)
}

// ---- 登录 ----

async function viewLogin(params) {
  // 退出链接带 logout 参数进门：先删 cookie，导航随后按未登录渲染
  if (params.has('logout')) clearCookie('user')

  await renderPage(ROOT, '登录', `<section class="post-index">
<h1>登录</h1>
<p class="meta">演示账号：admin / admin。登录后进入后台管理。</p>
<form id="login-form" class="login-form" method="post" action="#">
<fieldset>
<legend>站长登录</legend>
<p class="error" id="login-error"></p>
<p><label for="username">用户名</label> <input id="username" name="username" type="text" required></p>
<p><label for="password">密码</label> <input id="password" name="password" type="password" required></p>
<p><button type="submit">登录</button></p>
</fieldset>
</form>
</section>`)

  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault()
    const form = e.target
    if (form.username.value === 'admin' && form.password.value === 'admin') {
      setCookie('user', form.username.value)
      location.hash = '#/admin/posts'
    } else {
      document.getElementById('login-error').textContent = '用户名或密码不对'
    }
  })
}

// ---- 后台视图 ----

async function viewAdminPosts(params) {
  const state = { keyword: '', category: '' }

  async function renderTable() {
    let posts = await fetchResource('post')
    if (state.keyword) posts = posts.filter(p => p.title.includes(state.keyword))
    if (state.category) posts = posts.filter(p => p.category === state.category)
    document.getElementById('admin-summary').textContent = `共 ${posts.length} 篇`
    document.getElementById('admin-tbody').innerHTML = posts.map(p => renderAdminPostRow(ROOT, p)).join('\n')
  }

  await renderAdminPage(ROOT, '博文管理', `<section>
<h1>博文管理</h1>
<p class="meta" id="admin-summary"></p>
<p class="filter-bar">
<input id="search" type="text" placeholder="按标题搜索">
<select id="filter-category"><option value="">全部分类</option>${['诗', '词', '文'].map(c => `<option>${c}</option>`).join('')}</select>
<a class="btn" href="#/posts/new">新建诗文</a>
</p>
<table class="admin-table">
<thead><tr><th>id</th><th>标题</th><th>分类</th><th>年代</th><th>置顶</th><th>操作</th></tr></thead>
<tbody id="admin-tbody"></tbody>
</table>
</section>`)

  document.getElementById('search').addEventListener('input', e => {
    state.keyword = e.target.value.trim()
    renderTable()
  })

  document.getElementById('filter-category').addEventListener('change', e => {
    state.category = e.target.value
    renderTable()
  })

  document.getElementById('admin-tbody').addEventListener('click', async e => {
    const btn = e.target.closest('button')
    if (!btn) return
    const id = btn.dataset.id
    if (btn.dataset.action === 'delete') {
      await deleteResource('post', id)
    } else if (btn.dataset.action === 'pin') {
      const post = await fetchResource('post', id)
      post.pinned = !post.pinned
      await saveResource('post', post)
    }
    renderTable()
  })

  renderTable()
}

async function viewPostNew(params) {
  await renderAdminPage(ROOT, '博文管理', `<section>
<h1>新建诗文</h1>
${renderPostForm(null)}
</section>`)

  document.getElementById('post-form').addEventListener('submit', async e => {
    e.preventDefault()
    const error = document.getElementById('form-error')
    const fd = new FormData(e.target)
    const title = fd.get('title').trim()
    if (!title) { error.textContent = '标题必填'; return }
    if (title.length > 64) { error.textContent = '标题不超过 64 个字'; return }
    const date = fd.get('date').trim() || '年代不详'
    const yearMatch = date.match(/\d{3,4}/)
    await saveResource('post', {
      title,
      date,
      year: yearMatch ? Number(yearMatch[0]) : 0,
      category: fd.get('category'),
      tags: fd.get('tags').split(/\s+/).filter(Boolean),
      pinned: fd.get('pinned') === 'on',
      excerpt: fd.get('excerpt').trim() || title,
      body: fd.get('body').split('\n').map(l => `<p>${l.trim()}</p>`).join(''),
      annotation: { jieti: fd.get('jieti').trim(), notes: [], source: fd.get('source').trim() },
    })
    location.hash = '#/admin/posts'
  })
}

async function viewPostEdit(params, id) {
  let post
  try {
    post = await fetchResource('post', id)
  } catch (err) {
    await renderAdminPage(ROOT, '博文管理', `<section>
<h1>诗文不存在</h1>
<p class="meta">请从<a href="#/admin/posts">博文管理</a>进入。</p>
</section>`)
    return
  }

  await renderAdminPage(ROOT, '博文管理', `<section>
<h1>编辑诗文</h1>
${renderPostForm(post)}
</section>`)

  document.getElementById('post-form').addEventListener('submit', async e => {
    e.preventDefault()
    const error = document.getElementById('form-error')
    const fd = new FormData(e.target)
    const title = fd.get('title').trim()
    if (!title) { error.textContent = '标题必填'; return }
    if (title.length > 64) { error.textContent = '标题不超过 64 个字'; return }
    const date = fd.get('date').trim() || post.date
    const yearMatch = date.match(/\d{3,4}/)
    Object.assign(post, {
      title,
      date,
      year: yearMatch ? Number(yearMatch[0]) : post.year,
      category: fd.get('category'),
      tags: fd.get('tags').split(/\s+/).filter(Boolean),
      pinned: fd.get('pinned') === 'on',
      excerpt: fd.get('excerpt').trim() || title,
      body: fd.get('body').split('\n').map(l => `<p>${l.trim()}</p>`).join(''),
      annotation: { jieti: fd.get('jieti').trim(), notes: post.annotation.notes, source: fd.get('source').trim() },
    })
    await saveResource('post', post)
    location.hash = '#/admin/posts'
  })
}

async function viewAdminComments(params) {
  async function renderTable() {
    const comments = await fetchResource('comment')
    const posts = await fetchResource('post')
    document.getElementById('admin-summary').textContent = `共 ${comments.length} 条`
    document.getElementById('admin-tbody').innerHTML = comments.map(c => renderAdminCommentRow(ROOT, c, posts)).join('\n')
  }

  await renderAdminPage(ROOT, '评论管理', `<section>
<h1>评论管理</h1>
<p class="meta" id="admin-summary"></p>
<table class="admin-table">
<thead><tr><th>id</th><th>来源诗文</th><th>称呼</th><th>内容</th><th>日期</th><th>操作</th></tr></thead>
<tbody id="admin-tbody"></tbody>
</table>
</section>`)

  document.getElementById('admin-tbody').addEventListener('click', async e => {
    const btn = e.target.closest('button')
    if (!btn || btn.dataset.action !== 'delete') return
    await deleteResource('comment', btn.dataset.id)
    renderTable()
  })

  renderTable()
}

// ---- 站点地图：由路由表生成 ----

async function viewSitemap(params) {
  const rows = ROUTES.map(r => `<li><code>#${r.sample}</code> — ${r.title}</li>`).join('\n')
  await renderPage(ROOT, '站点地图', `<section class="sitemap">
<h1>站点地图</h1>
<p>全站路由一览。本页由路由表（lib/router.js 的 ROUTES）直接生成——URL 布局只有一份事实源。</p>
<ul>
${rows}
</ul>
</section>`)
}

window.addEventListener('hashchange', route)
route()
