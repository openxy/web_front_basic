# CSS 布局演化（css-layout 案例）

## 本案例教什么

同一个经典页面骨架（页头导航 + 主栏侧栏 + 页脚），八代版本换八种布局技术，走完「表格 → display:table → 浮动 → 960 栅格 → flex → grid」的布局演化史。每一种新方案都是对前一种缺陷的回答：表格布局语义污染、display:table 能力陈旧、浮动细节繁琐、960 固定不响应，直到 flex 给容器装上十字轴、grid 把二维网格做进语言本身。第 2 版到第 7 版 HTML 一字未动、只换样式——「布局与结构分离」由这六份相同的结构亲自演示。

依《Web 前端开发技术·06 前现代布局 / 弹性盒子布局 / 栅格盒子布局》三篇新写（原课程目录无对应文件）。浮动的文字环绕与高度塌陷清除机理在 position 案例的浮动四部曲，本案例聚焦它被挪用做**布局**的这条线。

## 版本导览

| # | 版本 | 概念要点 |
| --- | --- | --- |
| 01 | [表格布局](#v=css-layout/table) | 语义标记凑骨架：等高天然、语义污染 |
| 02 | [表格特性回归样式层](#v=css-layout/table-css) | display:table：div 也能等高列 |
| 03 | [浮动多栏](#v=css-layout/float) | float 百分比栏 + clearfix 兜底 |
| 04 | [栅格系统 960](#v=css-layout/grid-960) | 预计算类名：container/column/gutter |
| 05 | [弹性容器与十字轴](#v=css-layout/flex) | justify-content / align-items |
| 06 | [子项弹性分配](#v=css-layout/flex-item) | flex:3/flex:1 按份分空间 |
| 07 | [网格轨道](#v=css-layout/grid) | grid-template-columns、fr、gap |
| 08 | [跨格落位与整页网格](#v=css-layout/grid-span) | grid-column/grid-row，三代对比收束 |

## 重点与边界

- 重点：每代解决了什么、又留下什么；等高列与栏间距在八代里的不同答案（贴住 → 剩余百分比 → gutter margin → gap）；「一维用 Flex、二维用 Grid」的选型经验
- 边界：浮动本身与塌陷清除的机理（见 position 案例浮动四部曲）、响应式设计与媒体查询、CSS 框架（bootstrap/tailwind）不在本案例
