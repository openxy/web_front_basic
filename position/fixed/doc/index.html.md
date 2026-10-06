# 更新：index.html（一行机制 + 一个可滚的长页）

```css
#page{ height:3000px; }        /* 拉长页面制造滚动，观察用 */
#fixed img{ position: fixed; bottom:30px; right:30px; }
```

`fixed` 与 `absolute` 写法同款，唯一差别是**原点**：absolute 参考文档区域（跟着内容走），fixed 参考屏幕视区（viewport，浏览器窗口那块可见区域）。页面拉到 3000px 高，怎么滚，图片都钉在窗口右下角 30px——这是「回到底部」悬浮按钮的标准做法。

页面正文里附了四种定位机制的小结表（static/relative/absolute/fixed），至此定位主线走完；后面三版转向另一条线：float。
