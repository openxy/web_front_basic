# 更新：index.html（图片挪进 #photo 容器，新增角标徽章 .badge）

结构变化：`<div id="photo">` 包住图片与徽章 `<span class="badge">1</span>`。三条定位规则：

- `#photo`：absolute，把组合钉在页面右上（原点 = 已定位的 `#page`）
- `#photo img`：**relative + z-index:1**——不为偏移，只为「已定位」：只有已定位元素才参加 z 轴竞赛
- `.badge`：absolute（原点 = 最近的已定位祖先 `#photo`，`top:-8px; right:-8px` 探出图片角），z-index:2

z-index 只在**已定位元素之间**比大小：2 压 1，徽章盖在图片上。把徽章的 z-index 改成 `-1`，它就钻到图片背后（注释里留了这个实验）。非定位元素不参赛——这就是图片那行 relative 的用意。

「图片 + 角标」是 z-index 的最小实现：绝对定位负责钉位置，z-index 负责分层次。
