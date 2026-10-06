# 更新：index.html（委托多接一类事件，末尾新增 changeCell）

两处变化：

- **tbody 监听器加了第二个分支**：删完链接再看 `closest('td.edit')`——数据单元格带 `.edit` 类（`addRow` 生成的行里已加上），操作列不带。命中就调 `changeCell(td)`。点删除、点编辑、点空白，一个监听器里分三路。
- **新函数 `changeCell`**：`createElement` 造一个 input，`value = td.textContent` 把原文字先拷进去（编辑不是从零重写），然后 `td.replaceWith(input)`——原地换下 td、换上 input，位置不变，身份变了。最后 `input.focus()` 让用户直接打字。

`replaceWith` 与 `insertAdjacentHTML` 的分工：后者拼 HTML 字符串适合批量插入，前者直接换节点引用适合精确替换。

本版 input 失焦后什么也不发生，原文字回不来了——失焦提交见 `dynamic-event` 版。
