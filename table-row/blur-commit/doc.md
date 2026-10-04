# 失焦提交

## 本版本引入的概念

**失焦提交**：`onblur` 在输入框失去焦点时触发——点到别处，就是「填完了」。编辑的结束不靠按钮，靠焦点转移。

**空值校验**：`elem.val()` 拿到输入，为空则不放行：`elem.focus()` 把焦点抢回来，`.info` 红字提示。不填完别想走。

**重生必重绑**：提交成功后 input 换回新 td——新 td 是白纸，必须在生成它的字符串里把 `onclick='ChangeCell(this);'` 写回去。替换即失忆的另一面：想让它可编辑，就在它诞生时把事件带上。

## 本版本的改动

- `ChangeCell` 里生成的 input 字符串加上 `onblur='UpdateCell(event);'`
- 新增 `UpdateCell(event)`：非空则换回带 onclick 的 td，空则拦下并提示

## 关键代码走读

- `event.target`：onblur 发生在 input 上，target 就是它自己
- 成功分支：`elem.replaceWith("<td onclick='ChangeCell(this);'>" + temp + "</td>")`——注意 onclick 是字符串的一部分，拼进去才存在。删掉它试试：这一格从此点不开
- 失败分支：`elem.focus()` 立即抢回焦点，编辑态不结束；`info = '字段不得为空！'` 经 `$('.info').text(info)` 显示（成功路径 info 是空串，同一句顺带清掉旧提示——一个变量两条路径共用）
- `//todo: 当键盘输入回车时，完成当前输入`——原课程留下的作业，下一版补

## 对照要点

- 与上一版比：input 字符串多一个属性，外加一个新函数，编辑闭环完成：`td --点击--> input --失焦--> 新 td`
- 每次 replaceWith 都伴随一次旧事件死亡、新事件诞生。串起来看，行内 onclick 的事件生命周期完全由「生成它的字符串」决定

## 思考题

- 把成功分支里拼 td 的 onclick 属性删掉，这一格之后还能编辑吗？整行删掉再加新行呢？
- `$('.info').text(info)` 放在函数末尾、两条路径之后——为什么不能只放在空值分支里？
