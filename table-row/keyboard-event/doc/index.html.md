# 更新：index.html（changeCell 里再绑一个 keydown，共三行新增）

`changeCell` 里新增 keydown 监听器：回调里只判一件事——`event.key === 'Enter'` 就 `input.blur()`。

关键在**主动制造失焦**：回车本身不提交，回车只是触发一次 blur，提交仍然走 blur 那同一条路。触发路径有两条（点别处、按回车），处理逻辑只有一份（`updateCell`），不会出现两处各写一遍提交的重复。

`event.key` 是按键的语义名（`'Enter'`、`'a'`、`'ArrowLeft'`），不用记键码数字；判修饰键用 `event.ctrlKey` 等属性。至此这个单文件案例完整：五个版本把事件绑定 → 委托 → 元素替换 → 动态绑定 → 键盘事件连成一条链。
