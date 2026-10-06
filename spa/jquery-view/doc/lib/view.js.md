# 更新：lib/view.js（视图层换 jQuery，与原生版逐处对照）

`localstorage`（07）的分支：数据层不动，视图层重写为 jQuery。逐处对照着看最有收获：

- 取模板：`$.get(path, cb)` ↔ `fetch(path).then(r => r.text()).then(...)`
- 写 DOM：`$('#main').html(result)` ↔ `document.querySelector('#main').innerHTML = result`
- 收表单：`$('input[name=title]').val()` ↔ `document.querySelector('[name=title]').value`
- 文件头多了 `import $ from 'jquery'`——依赖经 import map 声明，与前几版 ejs 同一套机制

jQuery 的历史价值就在这些「短一点、少打字」：2010 年代它把跨浏览器差异与冗长的 DOM API 收进 `$`。今天 `querySelector`/`fetch` 原生追平了大部分，短式写法的收益随之缩水——对照完两边，各自的存在感就清楚了。文件首行注释自评「更为简洁」，读的时候自己掂量这个判断还剩几成。
