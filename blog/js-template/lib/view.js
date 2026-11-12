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
  return `<header class="site-header">
<p class="site-title">诗豪小筑</p>
<nav>
<ul>
${lis}
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
