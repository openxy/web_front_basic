# 更新：index.html（changeCell 里多绑一个 blur，末尾新增 updateCell）

- **`changeCell` 里多一行**：`input.addEventListener('blur', ...)`。blur（失焦）不冒泡，tbody 的委托接不住它——这类事件只能在元素**诞生那一刻**由创建者亲手绑上，这就是「动态事件」的含义：绑定时点跟着元素生命周期走，不跟页面加载走。
- **新函数 `updateCell`**：失焦后处理提交。`trim()` 后空值拦下——红字提示、`focus()` 把焦点抢回，编辑不结束；非空则造一个新 td（`.edit` 类照带，保证下一轮点击还能进编辑），`input.replaceWith(td)` 换回去，提示清空。

提交完成后 td 的点击仍走 tbody 那个委托监听器，无需任何重绑——点击与失焦两类事件，分别用了委托和动态绑定两种接法。

键盘上想按回车直接提交？见 `keyboard-event` 版。
