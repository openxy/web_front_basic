# 解读：index.html（浮动多栏）

HTML 与上一版一字不差，差异全在样式：表格特性换成了浮动拼装。

- `.main { float:left; width:68% }`、`.side { float:right; width:28% }`：两栏各自贴边，剩余 4% 是栏间距
- `.page::after` 的 clearfix 四行：`content:""` 生成一个看不见的盒子，`display:table; clear:both` 让它把两侧浮动的高度记回父元素——没有它，页脚撞进两栏之间（父高度塌陷）
- 等高列消失：侧栏背景只铺到自己内容底部——对照上一版 table-cell 的自动等高，浮动时代的等高要靠假栏等杂技

clearfix 的机理（伪元素生成、clear 的准确含义）在 position 案例的 float-defect / float-clear / clearfix 三版有完整拆解，本案例只引用结论。
