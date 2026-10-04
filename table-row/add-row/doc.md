# 增加一行

## 本版本引入的概念

**行内事件绑定**：`onclick` 写在 HTML 属性里，值是一段 JS 调用。浏览器解析到这个属性，监听器就挂好了——不需要任何代码去「找元素」。

**jQuery 入场**：`$` 是全局函数，`append` 接受 HTML 字符串直接变成 DOM。依赖经 head 里的 import map 声明（CDN 形态），课程代码本身仍是传统全局风格——所以有一座小桥：模块脚本把导入的 jQuery 挂到 `window.$`，供行内 onclick 与普通脚本使用。

## 本版本的改动

- head 加 import map（声明 jquery）与桥脚本（`window.$ = $`）
- 「增加一行」链接加 `onclick="AddRow();"`
- 页尾 `<script>` 定义 `AddRow()`：行号计数器 `row_last_num` 自增，拼出整行 HTML 字符串，`$("tbody").append(...)` 一次性塞进表格

## 关键代码走读

- `row_last_num += 1`：全局计数器只增不减，给每行一个不重复的 `id='tr1'`、`id='tr2'`……
- 拼字符串时引号要换着用：外层双引号、属性单引号，这是字符串拼 HTML 的日常
- 生成的行里「删除」链接还什么都没接——摆设，下一版的事

## 对照要点

- 与上一版比：同一个链接，从跳锚点变成真增行——差别只在 `onclick` 属性与一个函数
- jQuery 的 `append` 收 HTML 字符串；原生等价物是 `insertAdjacentHTML` / `createElement` 一层层拼

## 思考题

- 删掉中间某行后再增行，`row_last_num` 会给出什么 id？为什么这无害（也为什么留着它）？
- 桥脚本为什么必须存在？把 `window.$ = $` 删掉，点「增加一行」会发生什么？
