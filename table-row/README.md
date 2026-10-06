# 表格行编辑（table-row 案例）

## 本案例教什么

原课程 event.html（员工表增删改）改写为现代原生 JS 的五版概念链，主题是：怎么给「页面上不断增生的元素」接行为。零依赖。

## 版本导览

| # | 版本 | 概念要点 |
| --- | --- | --- |
| 01 | [事件绑定](#v=table-row/event-bind) | addEventListener + preventDefault + insertAdjacentHTML |
| 02 | [事件委托](#v=table-row/delegation) | 监听器只挂 tbody 一个，冒泡接住所有行，新增行天然被覆盖 |
| 03 | [元素替换](#v=table-row/element-replace) | closest 甄别可编辑 td，replaceWith 原地换 input |
| 04 | [动态事件](#v=table-row/dynamic-event) | blur 不冒泡委托不了，只能在 input 诞生那刻动态绑 |
| 05 | [键盘事件](#v=table-row/keyboard-event) | keydown 判 event.key，回车 blur() 制造真失焦 |

## 重点与边界

- 重点：事件委托为什么赢；哪些事件委托不了（不冒泡的）；触发路可以多条、提交路只留一条
- 边界：数据仍在内存变量，存储与服务端归 spa 案例的数据层线索
