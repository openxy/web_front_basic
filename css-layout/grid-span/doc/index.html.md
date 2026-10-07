# 解读：index.html（整页一张网格）

结构六代以来第一次动：页头页脚挪进 `.page`，主栏下新增「相关阅读」，整页成为一张 `3fr 1fr` 的网格。

- `.hd,.ft { grid-column:1/3 }`：横跨两列（两条轨道三条格线，从第 1 条到第 3 条）；原 `.hd,.ft` 的 `max-width/margin` 居中声明删掉——网格子项默认拉伸填满轨道
- `.side { grid-column:2; grid-row:2/4 }`：显式落位第 2 列、纵跨第 2–3 行，与左列主栏加相关阅读同高
- `.main/.extra` 不写任何布局样式：显式格子（hd/side/ft）先占位，自动子项顺着空格流排——main 落 r2c1，extra 绕开被 side 占的 r2c2 落 r3c1
- `gap:12px` 此刻行列两向生效：页头与主体之间那条缝也是它

页头内部仍是第 5 版的 flex——grid 搭骨架、flex 排行内，一维二维组合是常态。
