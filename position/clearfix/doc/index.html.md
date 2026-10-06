# 更新：index.html（空元素拿掉，清除逻辑搬进 CSS）

两处变化：HTML 里那个 `<div style="clear:right">` 删掉，section 改挂 `class="clearfix"`；CSS 里新增：

```css
.clearfix::before,
.clearfix::after{ content:" "; display:table; }
.clearfix::after{ clear:both; }
```

原理：`::after` 伪元素在 section 内容末尾**生成**一段空内容，对它设 `clear`——等价于上一版手写的空 div，但元素由 CSS 代办，HTML 结构零侵入（对比上一版 diff：body 里少了一行，style 里多了一段）。

`::before` 配一对并 `display:table` 是防外边距塌陷的经典补法（Bootstrap 等框架同款）。`clear:both` 左右通吃，这个类可以复用在任何容器上——它也成了本案例唯一一段「新写的可复用 CSS」。
