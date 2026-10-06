# 更新：index.html（表单底下多一段 script，共九行）

接管的第一步，只拦不发：

- `form.addEventListener('submit', ...)`——原生提交走的是 form 的 submit 事件，监听它就拦在了源头（比监听按钮 click 更准：回车提交也走这条路）
- `event.preventDefault()`——拦下默认行为：不跳转 action，页面留在原地
- `new FormData(form)` 一把收齐**所有带 name 的控件**；`Object.fromEntries` 再把 FormData 转成普通对象，键就是各控件的 name

收来的数据目前只写进 `<pre id="output">` 展示——「接管成功」的证明。对照上一版：同样的点击，页面不再走掉。数据要去哪、怎么去，是后面四版的事；这一版确立的姿势（submit 监听 + preventDefault + FormData 收集）在后面每一版原样保留。
