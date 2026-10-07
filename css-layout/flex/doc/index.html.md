# 解读：index.html（页头变 flex 容器）

改动只在 `.hd` 一块：上下 padding 换成 `height:44px`，加 `display:flex; justify-content:space-between; align-items:center`。

- `display:flex`：页头成为 flex 容器，`<b>` 和两个 `<span>`（第 1 版原样保留的行内标记）即刻横排成三段
- `justify-content:space-between`：主轴两端对齐——Logo 贴左、登录贴右，中间的菜单居中
- `align-items:center`：交叉轴垂直置中，三段内容在 44px 的条里齐齐站中线——`height` 是给置中准备的舞台

主体两栏的 960 栅格原样未动：本版的概念是容器轴线，只拿对齐难题开刀。
