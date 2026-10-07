# 解读：index.html（flex 接管多栏）

960 的约定类名全部摘掉（`container_12/grid_8/grid_4` 退场，预计算块整块删除），多栏交给 flex 的两行：

- `.page { display:flex; max-width:960px }`：容器声明横排；`max-width` 取代写死的 960px——页面第一次随窗口伸缩（`.hd/.ft` 同步）
- `.main { flex:3; margin-right:12px }`、`.side { flex:1 }`：剩余空间按 3:1 分配，比例恒成立；栏距暂时仍用 margin 拼（flex 早期没有 gap）
- `.page::after` 的 clearfix 整块删除：没有浮动就没有塌陷，交了三版的税到此为止
- 等高列回归：子项默认 `align-items:stretch`，侧栏背景重新与主栏齐平
