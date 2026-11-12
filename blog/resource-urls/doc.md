# 资源式 URL 布局

## 本版本引入的概念

Web 是面向资源设计的：把内容、功能和页面看作一个整体就是**资源**，每个资源有唯一的 URL 标识。这一版不做任何新功能，只做一次重构——把上一版平铺的页面按资源归位：

```
v2（平铺）                 v3（资源式）
/index.html                /index.html
/posts.html                /posts/index.html
/post-1.html … post-8.html /posts/show-1.html … show-8.html
/tags.html                 /tags/index.html
/img/*.svg                 /assets/img/*.svg
```

三拍看这次重构：

+ **是什么**：URL 布局与文件布局此刻完全重合（纯静态站的宿命）。`/posts/` 是博文资源，`/posts/index.html` 是列表接口，`/posts/show-1.html` 是 1 号实例的详情接口；`/assets/` 是静态资源，与页面分离
+ **怎么兑现**：纯静态服务器只认文件路径，所以 `show-1.html` 带 `.html` 扩展名、`?id=` 之类的动态形式也用不了。到 v12 换上真接口，URL 才收敛成 `/posts/1` 的样子
+ **为什么**：Rails 这类后端框架给每个资源默认配好七个动作（index / show / new / create / edit / update / destroy）各占一个 URL——本站的 URL 布局就是它的静态版雏形。布局先行、后端后补，改造成本最小

顺带立起**站点地图页**（`sitemap.html`）：全站 URL 的一份清单，页面本体也是 URL 布局的「执法记录」——布局怎么动，它就怎么跟着动。

## 与上一版的 diff

13 个文件移动/改名加 1 个新页面；HTML 里所有 `href`、`img src` 随路径改写。诗文的正文一个字没动——重构只动「地址」，不动「内容」。

## 观察

- 打开 `sitemap.html`：全站 URL 一页看全
- 深层页面里返回首页的链接写的是 `../index.html`——目录深了一层，相对路径就要「爬」一层

## 思考

+ 为什么把详情页从 `post-1.html` 改名 `posts/show-1.html`？`posts/` 这个目录名对应的是内容类型还是单个页面？
+ 标签页里的每个标签值得一个 `tags/show-秋思.html` 吗？（提示：标签是博文的子集视图，不是独立的内容类型）
