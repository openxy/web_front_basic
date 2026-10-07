# app.js 解读

与上一版的 diff 集中在 showPost：套上 try/catch（网络层），内部先判 `res.ok`（HTTP 层）——404 红字提示并 return，正常才 `res.json()` 渲染并把颜色复原。文件尾新增「查 id」表单的 submit 监听，把任意 id（含不存在的）交给 showPost。列表渲染、POST、PUT、DELETE 原样。
