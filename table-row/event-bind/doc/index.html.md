# 更新：index.html（页面上唯一的脚本，本版全部概念都在这里）

脚本分两块：顶部一段监听器绑定，下面一个 `addRow` 函数。

- **绑定块**：`getElementById` 拿到「增加一行」链接，`addEventListener('click', ...)` 把行为挂上去。回调第一行 `event.preventDefault()`——链接的默认行为是跳 `#` 锚点，必须在事件对象上拦下，否则地址栏会多一个 `#`。
- **`addRow` 块**：模板字符串拼出一行 `<tr>`（含末列「删除」链接），`insertAdjacentHTML('beforeend', ...)` 接在 tbody 现有内容之后。相比 `innerHTML +=`，它不用整表重新解析。

原课程把 `onclick` 写在 HTML 属性里；这里行为全部收进脚本，结构与行为分离。

本版的「删除」链接只是个样子：点它跳 `#`，没有任何行为——给它接行为的方式见 `delegation` 版。
