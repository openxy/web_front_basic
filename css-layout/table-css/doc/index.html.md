# 解读：index.html（display:table 回归样式层）

与上一版的差异全部在「标记换掉、视觉不变」：table/tr/td 换成三层 div，等高两栏改由三条声明接管。

- `.page { display:table }`：容器当表格——布局特性回归样式层的第一步
- `.main/.side { display:table-cell; vertical-align:top }`：子项当单元格，同一行自动等高；`vertical-align:top` 接替上一版 `.page td` 那条规则（单元格内容默认垂直居中，要改成顶部对齐）
- `.hd,.ft { width:600px; margin:0 auto }`：页头页脚移出表格后自己居中——只有需要等高的两栏才值得动用表格特性

这份 div 结构将一字不改地用到第 7 版：布局演化史的后半段，全部发生在 `<style>` 里。
