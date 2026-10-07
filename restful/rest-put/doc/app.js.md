# app.js 解读

与上一版的 diff：loadPosts 的循环里每条帖子多一个「改」按钮。点击后 PUT `/posts/${p.id}`，请求体是**完整对象**——id、改后的 title、没动的 body 全带上；应答 200 后 loadPosts 重拉。index.html 无改动。全量替换的「漏送即清掉」在 doc.md 的试试里动手验证。
