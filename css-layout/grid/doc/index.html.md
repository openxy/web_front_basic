# 解读：index.html（网格轨道接管多栏）

改动集中在 `.page` 一块：`display:flex` 换成 `display:grid`，加 `grid-template-columns:3fr 1fr`（两条列轨道，剩余空间按 3:1 分）和 `gap:12px`（轨道间距）。

`.main/.side` 的 `flex:3/flex:1` 与 `margin-right:12px` 全部删除——子项一行布局样式都不剩，宽度由轨道决定、间距由 gap 决定。第 3 版以来栏间距的三种拼法（剩余百分比、gutter margin、margin-right）到此统一成一个属性。

本页只有一条行轨道，grid 的二维能力在下一版才展开。
