# app.js 解读

与上一版的 diff：每个条目在「改」按钮旁加「删」按钮。DELETE `/posts/${p.id}` 不带请求体，应答 204 也**没有应答体**——所以这里只 await fetch 本身，不调 `res.json()`（空体解析会抛错）。成功后 loadPosts 重刷。其余与上一版相同。
