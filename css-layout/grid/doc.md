# 网格轨道

## 本版本引入的概念

**CSS Grid 的轨道（track）**：栅格系统曾经靠 float 加预计算类名拼装（第 4 版的 620px 写死）；如今标准把二维网格做进了语言本身。`display:grid` 让容器成为网格容器，`grid-template-columns` 定义**列轨道**，子项自动落入轨道围成的格子。两行核心声明：

- `grid-template-columns:3fr 1fr`：定义两条列轨道。`fr` 是**份额**单位（fraction）——「剩下的空间按份分」。对比 960 的 `width:620px` 写死，fr 是声明式的；混搭也行：`200px 1fr 2fr`（第一列固定，余下按 1:2 分）。`repeat(3, 1fr)` 是 `1fr 1fr 1fr` 的简写
- `gap:12px`：轨道间距——正是栅格系统的 **gutter**。第 3 版用剩余百分比当缝、第 4 版用左右各 10px 的 margin 拼、第 6 版用 margin-right 拼，如今一个属性

行轨道可以不写：默认自动生成（每行高度随内容），要控制就配 `grid-template-rows`。

## 本版本的改动

- `.page`：`display:flex` 换 `display:grid`，新增 `grid-template-columns:3fr 1fr` 与 `gap:12px`
- `.main/.side`：`flex:3/flex:1` 与 `margin-right` 全部删除——**子项一行样式都不用写**，宽度由轨道决定，间距由 gap 决定
- HTML 仍一字未动：从第 2 版到本版，六代布局技术在同一份结构上轮替

## 关键代码走读

- `3fr 1fr` 与上一版 `flex:3/flex:1` 视觉等价，但语义升级了：flex 是「子项各自声明怎么分」，grid 是「容器先画好轨道、子项只管落位」——布局的**规划权**收回到容器
- 本页只有一列行轨道，二维威力显不出来——下一版让页头页脚横跨、侧栏纵跨，才是 grid 的主场
- 等高、弹性、间距、对齐，四样全齐：第 3 版的四宗罪清单可以正式销案了

## 试试

- 改成 `grid-template-columns:repeat(3, 1fr)`：两栏变三栏（侧栏被挤到第二行第一格）——轨道改一处，全页重排
- 改成 `200px 1fr`：第一列固定 200px、第二列吃掉剩余——固定与按份混搭
- `gap` 改成 `4px 24px`：列距 4px、行距 24px（两个值分别是列间距与行间距）

## 思考题

- fr 与百分比有什么区别？（百分比以容器全宽为基数互不通信，fr 按「扣除固定轨道后的剩余空间」按份分——`200px 1fr 2fr` 里两个 fr 不用知道 200px 是多少）
- 一维场景（导航条）用 grid 还是 flex？（都行，但 flex 一行 `justify-content` 就够；grid 的优势在多行多列的二维对齐——经验：**一维用 Flex，二维用 Grid**）

## 参考

+ [MDN 网格布局](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Grids)
+ [A Complete Guide to Grid（css-tricks）](https://css-tricks.com/snippets/css/complete-guide-grid/)
+ [CSS Grid 教程（阮一峰）](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
+ 练手游戏 [Grid Garden](https://cssgridgarden.com/)
