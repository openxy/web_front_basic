// 页面模板库：站点模板（站点头/导航/侧栏/站点底）+ 内容模板（列表卡、列表行、诗文详情）
// 页面实例 = 站点模板 + 内容模板 + 动态内容；各页面脚本只负责取数与拼装
// 依赖 lib/data.js 的全局 DATA（侧栏分类计数由数据算出，不再手写）

function siteNav(ROOT, active) {
  const items = [
    ['index.html', '首页'],
    ['posts/index.html', '文章'],
    ['tags/index.html', '标签'],
    ['about.html', '关于'],
    ['sitemap.html', '站点地图'],
  ]
  const lis = items
    .map(([href, label]) => `<li><a class="${label === active ? 'active' : ''}" href="${ROOT}/${href}">${label}</a></li>`)
    .join('\n')
  // 登录态入口：cookie 里有人就亮身份，没人就给登录链接
  const user = getCookie('user')
  const authItem = user
    ? `<li class="auth">当前用户：${user} · <a href="${ROOT}/login.html?logout=1">退出登录</a></li>`
    : `<li class="auth"><a href="${ROOT}/login.html">登录</a></li>`
  return `<header class="site-header">
<p class="site-title">诗豪小筑</p>
<nav>
<ul>
${lis}
${authItem}
</ul>
</nav>
</header>`
}

function siteSidebar(ROOT) {
  const cats = ['诗', '词', '文']
    .map(c => {
      const n = DATA.posts.filter(p => p.category === c).length
      return `<li><a href="${ROOT}/posts/index.html?category=${c}">${c}（${n}）</a></li>`
    })
    .join('\n')
  return `<aside class="sidebar">
<h2>分类导航</h2>
<ul>
${cats}
</ul>
</aside>`
}

// 站点模板：把导航、主内容、侧栏、站点底拼成一页
function renderPage(ROOT, active, mainHtml) {
  document.body.innerHTML = `${siteNav(ROOT, active)}

<div class="site-body">
<main>
${mainHtml}
</main>

${siteSidebar(ROOT)}
</div>

<footer class="site-footer"><p>诗豪小筑 · 个人博客演示项目 · 内容取材刘禹锡诗文</p></footer>`
}

function sortPosts(posts) {
  return [...posts].sort((a, b) => (b.pinned - a.pinned) || (b.year - a.year))
}

function tagCounts(posts) {
  const counts = {}
  posts.forEach(post => {
    post.tags.forEach(t => { counts[t] = (counts[t] || 0) + 1 })
  })
  return counts
}

function renderPostCard(ROOT, p) {
  return `<article class="post${p.pinned ? ' pinned' : ''}">
<h2><a href="${ROOT}/posts/show.html?id=${p.id}">${p.title}</a></h2>
<p class="meta">${p.pinned ? '<mark>置顶</mark> · ' : ''}<time>${p.date}</time> · ${p.category}</p>
<p class="excerpt">${p.excerpt}</p>
</article>`
}

function renderPostRow(ROOT, post) {
  return `<li><a href="${ROOT}/posts/show.html?id=${post.id}">${post.title}</a>（${post.category} · ${post.date}）</li>`
}

function renderPostFull(ROOT, post, comments) {
  const figure = post.figure
    ? `<figure class="poem-fig">
<img src="${ROOT}/${post.figure.src}" alt="${post.figure.alt}">
<figcaption>${post.figure.caption}</figcaption>
</figure>

`
    : ''
  const notes = post.annotation.notes
    .map(([term, def]) => `<dt>${term}</dt>
<dd>${def}</dd>`)
    .join('\n')
  const commentItems = comments.length
    ? comments.map(c => `<li><strong>${c.author}</strong>（${c.date}）：${c.body}</li>`).join('\n')
    : '<li>还没有评论，来写第一条。</li>'

  return `<header>
<h1>${post.title}</h1>
<p class="meta">${post.pinned ? '<mark>置顶</mark> · ' : ''}<time>${post.date}</time> · ${post.category} · 标签：${post.tags.map(t => `<a href="${ROOT}/posts/index.html?tag=${t}">${t}</a>`).join('、')}</p>
</header>

${figure}<div class="poem-body">
${post.body}
</div>

<section class="annotation">
<h2>题解</h2>
<p>${post.annotation.jieti}</p>
<h2>注释</h2>
<dl>
${notes}
</dl>
<p class="source">出处：${post.annotation.source}</p>
</section>

<section class="comments">
<h2>评论</h2>
<ul>
${commentItems}
</ul>

<form action="#" method="post">
<fieldset>
<legend>发表评论</legend>
<p><label for="author">称呼</label> <input id="author" name="author" type="text" required></p>
<p><label for="body">留言</label> <textarea id="body" name="body" rows="4" required></textarea></p>
<p><button type="submit">提交评论</button></p>
</fieldset>
</form>
</section>`
}

function renderPager(pages, page) {
  if (pages <= 1) return ''
  const buttons = []
  for (let i = 0; i < pages; i++) {
    buttons.push(`<button type="button" data-page="${i}" ${i === page ? 'class="current"' : ''}>${i + 1}</button>`)
  }
  return buttons.join('\n')
}

function adminNav(ROOT, active) {
  const items = [
    ['admin/posts/index.html', '博文管理'],
    ['admin/comments/index.html', '评论管理'],
    ['index.html', '返回前台'],
  ]
  const lis = items
    .map(([href, label]) => `<li><a class="${label === active ? 'active' : ''}" href="${ROOT}/${href}">${label}</a></li>`)
    .join('\n')
  return `<header class="site-header">
<p class="site-title">诗豪小筑 · 后台</p>
<nav>
<ul>
${lis}
</ul>
</nav>
</header>`
}

// 后台站点模板：无侧栏、单栏工整版式，与前台站点模板同源不同形
function renderAdminPage(ROOT, active, mainHtml) {
  // 门禁：后台页共用本模板，cookie 里没有登录用户就一律先送回登录页
  if (!getCookie('user')) {
    location.href = `${ROOT}/login.html`
    return
  }
  document.body.innerHTML = `${adminNav(ROOT, active)}

<main class="admin-main">
${mainHtml}
</main>

<footer class="site-footer"><p>诗豪小筑 · 后台管理 · 数据改动只在本页内存，刷新即失（v11 落库）</p></footer>`
}

function renderAdminPostRow(ROOT, post) {
  return `<tr>
<td>${post.id}</td>
<td><a href="${ROOT}/posts/show.html?id=${post.id}">${post.title}</a></td>
<td>${post.category}</td>
<td>${post.date}</td>
<td>${post.pinned ? '置顶' : '—'}</td>
<td>
<a href="edit.html?id=${post.id}">编辑</a>
<button type="button" class="btn small secondary" data-action="pin" data-id="${post.id}">${post.pinned ? '取消置顶' : '置顶'}</button>
<button type="button" class="btn small warn" data-action="delete" data-id="${post.id}">删除</button>
</td>
</tr>`
}

function renderAdminCommentRow(ROOT, comment) {
  const post = DATA.posts.find(p => p.id === comment.postId)
  return `<tr>
<td>${comment.id}</td>
<td>${post ? post.title : '（诗文已删）'}</td>
<td>${comment.author}</td>
<td>${comment.body}</td>
<td>${comment.date}</td>
<td><button type="button" class="btn small warn" data-action="delete" data-id="${comment.id}">删除</button></td>
</tr>`
}

function renderPostForm(post) {
  post = post || { title: '', category: '诗', tags: [], date: '', excerpt: '', body: '', pinned: false, annotation: { jieti: '', source: '' } }
  const lines = post.body.split('<p>').map(s => s.replace('</p>', '')).filter(Boolean).join('\n')
  return `<form id="post-form" class="admin-form">
<p class="error" id="form-error"></p>
<p class="field"><label for="title">标题</label> <input id="title" name="title" type="text" maxlength="64" required value="${post.title}"> <span class="meta">必填，不超过 64 字</span></p>
<p class="field"><label for="category">分类</label> <select id="category" name="category">
${['诗', '词', '文'].map(c => `<option value="${c}" ${c === post.category ? 'selected' : ''}>${c}</option>`).join('\n')}
</select> <span class="meta">一篇只属一个分类</span></p>
<p class="field"><label for="tags">标签</label> <input id="tags" name="tags" type="text" value="${post.tags.join(' ')}"> <span class="meta">选填，空格分隔</span></p>
<p class="field"><label for="date">年代</label> <input id="date" name="date" type="text" value="${post.date}" placeholder="如：公元805年（永贞元年）"></p>
<p class="field"><label for="excerpt">摘要</label> <input id="excerpt" name="excerpt" type="text" value="${post.excerpt}"></p>
<p class="field"><label for="body">正文</label> <textarea id="body" name="body" rows="10" required>${lines}</textarea> <span class="meta">一行一句</span></p>
<p class="field"><label for="jieti">题解</label> <textarea id="jieti" name="jieti" rows="3">${post.annotation.jieti}</textarea></p>
<p class="field"><label for="source">出处</label> <input id="source" name="source" type="text" value="${post.annotation.source}"></p>
<p class="field"><label for="pinned">置顶</label> <input id="pinned" name="pinned" type="checkbox" ${post.pinned ? 'checked' : ''}></p>
<p><button type="submit" class="btn">保存</button> <a href="index.html">返回列表</a></p>
</form>`
}
