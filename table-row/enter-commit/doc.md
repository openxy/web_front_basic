# 回车提交

上一版做完了失焦提交，但键盘用户够不着「失焦」——按回车没有任何反应（这正是原课程代码里 `//todo` 留下的作业）。本版把它补上：一行判断，加一次主动失焦。

## 本版本引入的概念

**键盘事件**：`onkeydown` 在按键按下时触发，`event.key` 是按键名（`'Enter'`、`'a'`、`'Backspace'`……）。

**单一路径原则**：回车不另写一套提交逻辑，只让输入框**真正失焦一次**（`event.target.blur()`）——浏览器原生失焦会照常触发 onblur，UpdateCell 还是那条唯一的提交路。触发路可以有很多条（点到别处、按回车），提交路只保留一条。

## 本版本的改动

- `ChangeCell` 里生成的 input 字符串加上 `onkeydown='EnterCell(event);'`
- 新增 `EnterCell(event)`：回车则 `event.target.blur()`；原 `//todo` 注释完成使命，移除

## 关键代码走读

- `event.target.blur()`：原生 blur() 方法派发一次真实的失焦事件，行内 onblur 照常接住——不是绕过 UpdateCell，而是走进它
- 空值时按回车：blur → UpdateCell 空值分支 → focus 抢回 + 红字提示，编辑继续——校验逻辑零改动，自动罩住新触发路
- 反面方案：在 EnterCell 里把提交三行再写一遍——两份提交逻辑从此各自漂移，谁也保证不了永远同步。让所有触发路汇进一个出口，这类问题失去发生的土壤

## 对照要点

| | 上一版（失焦提交） | 本版（回车提交） |
|---|---|---|
| 触发方式 | 点到别处 | 增加按回车 |
| 提交逻辑 | UpdateCell 一份 | 仍是 UpdateCell 一份 |
| 改动量 | — | input 字符串一个属性 + 五行函数 |

## 思考题

- EnterCell 里不调 `blur()` 而是直接调 `UpdateCell(event)`，页面表现有差别吗？两种写法各自把「提交只有一条路」守在哪里？
- 老浏览器用 `event.keyCode`（13 = 回车）判按键，`event.key` 是什么时代的写法？为什么新代码不必再管 keyCode？
