# index.html 解读

本版骨架承接 css-layout 案例的 grid 版：页头（.hd，flex 两端对齐）+ 两栏（.page，grid `3fr 1fr`）+ 页脚（.ft）。差异只有一处方向性的：三处宽度从上一案例的 `max-width: 960px` 改回 `width: 960px` 写死——刻意退回栅格时代的固定形态，作为本案例的起点（要讲清楚「为什么响应」，先要有「不响应」的现场）。

`<meta name="viewport" content="width=device-width, initial-scale=1">` 从本版起随骨架携带：手机浏览器默认按 980 像素虚拟视口渲染再整体缩放，这行声明把视口宽度锚定为设备真实宽度。它的作用发生在手机上，桌面运行面板里观察不到。
