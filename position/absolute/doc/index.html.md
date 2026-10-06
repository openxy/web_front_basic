# 更新：index.html（两处各加一行：容器升级、图片转型）

```css
#page{ ... position: relative; }      /* 新增：容器成为「已定位元素」 */
#absolute img{
    position: absolute;               /* 新增：图片脱离文档流 */
    top:60px;
    right:60px;
}
```

- 图片 `position: absolute` 后脱离文档流：block/inline 规则对它失效（转型为块盒），**文档流当它不存在**——上下段落紧挨，灰边框直接穿过图片所在区域。
- 原点不再是自己的原位置，而是**最近的非静态（已定位）祖先**——这里就是刚升为 relative 的 `#page`，`top:60px; right:60px` 即距它右上角各 60px。

`#page` 加 `position: relative` 却不给偏移量，是常用手法：不为挪动，只为给后代的绝对定位提供一个稳定的原点容器（`#page` 还加了 `height:1000px`，把页面拉长，滚动时便于观察原点跟文档走）。
