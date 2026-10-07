# 响应式布局（responsive 案例）

## 本案例教什么

同一副页面骨架（承接 css-layout 案例的 grid 版），七代版本回答一个问题：**一套代码，怎么在多宽的屏幕上都好用**。从固定 960 的桌面假设出发，经流体布局、图片响应式、媒体查询断点、移动优先，到 auto-fit 无断点卡片墙收束——每代解决前一代的遗留：横滚条消失了又回来（图片撑破容器），两栏挤成了再并回单栏，断点跳变最终让位给连续换行。

依《Web 前端开发技术·06 响应式设计 / 媒体查询》两篇新写；断点选择、移动优先与 auto-fit 的对照是本案例的独立展开。

## 版本导览

| # | 版本 | 概念要点 |
| --- | --- | --- |
| 01 | [固定宽度](#v=responsive/fixed) | 960 写死的桌面假设：窄窗即横滚 |
| 02 | [流体布局](#v=responsive/fluid) | max-width 给上限，页面随窗口伸缩 |
| 03 | [图片撑破容器](#v=responsive/img-overflow) | 事故现场：容器流体了，内容没跟上 |
| 04 | [图片响应式](#v=responsive/responsive-img) | img 两行基本式：max-width:100% |
| 05 | [媒体查询断点](#v=responsive/media-query) | @media 按视口宽度切换版式（桌面优先） |
| 06 | [移动优先](#v=responsive/mobile-first) | 基础写最窄、min-width 向上增强，断点由内容定 |
| 07 | [自适应卡片墙](#v=responsive/auto-fit) | repeat(auto-fit,minmax()) 无断点连续换行，收束对比 |

## 重点与边界

- 重点：每代解决什么遗留、又留下什么；断点跳变与 auto-fit 连续换行的对照；「会伸缩」与「好用」的区别
- 边界：响应式图片的 srcset/sizes（按分辨率选图文件）、容器查询、真机调试流程不在本案例；布局技术本身（浮动/flex/grid）见 css-layout 案例
