# 解读：index.html（960 栅格的声明式类名）

主体两栏的类名从 `main/side` 各自多挂一个约定类：`class="page container_12"`、`class="main grid_8"`、`class="side grid_4"`。样式相应分成两层：

- 预计算块（栅格约定）：`.container_12` 给容器 960px；`.container_12 .grid_8/.grid_4` 把「占 8 列 / 4 列」预先算成 620px/300px 写死；`.grid_8,.grid_4` 的 `float:left` 加左右各 10px margin——底层还是上一版的浮动，gutter 靠 margin 拼
- 皮肤块（站点自有）：`.main/.side` 只剩背景色

真实 960.css 把 grid_1 到 grid_12 全部预计算好（12 列每列 60px、间距 20px，`960 = 10 + 60×12 + 20×11 + 10`），本页只写了用到的两条。clearfix 原样保留——浮动没退场，税照交。
