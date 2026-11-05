# 模态框预览

## 本版本引入的概念

**用 e.target 区分「点的是谁」**（依教程《事件传播》）：同一块遮罩上，点遮罩自身关闭、点预览内容不关闭——`event.target === overlay` 一比便知；同一个容器监听器里，点赞按钮与图片预览各管各的——`closest('.like')` 甄别后早返回。两处都不需要 `stopPropagation`：甄别目标比截停传播更精确，也不剥夺别的监听器收事件的权利。

## 本版本的改动

- 每张图加点赞按钮 `.like`；容器监听器开头加点赞分支：改按钮数字后早返回
- 点图在原高亮之外再调 `openPreview(fig)`：大图与标题填进模态框，遮罩 `show`
- 遮罩监听器：`event.target === overlay` 才关闭——点在预览内容上时 target 是 img/figcaption，不匹配

## 关键代码走读

- 点赞分支放在 figure 分支之前：`.like` 在 `figure` 内部，若先判 figure，点赞会被当成「点了图」弹出大图——甄别顺序从内向外
- `fig.querySelector('img').src`：预览大图直接复用点中小图的 src，图片数据不必二次查找；放大由 CSS 负责
- 遮罩关闭不用 `stopPropagation` 而用 target 比对：截停传播会连「点内容」的事件一起拦在遮罩之外，而遮罩本来就该只回应「点自己」

## 思考题

- 点赞分支里去掉 `return`，点赞时会怎样？（先猜再试：figure 分支会接着执行）
- 若把遮罩监听器改成 `overlay.addEventListener('click', () => overlay.classList.remove('show'))` 不判 target，还能关掉吗？代价是什么？
- 给预览内容加一个「点内容也不关闭但点关闭按钮关闭」的 × 按钮，你会用 target 比对还是 closest 甄别？为什么？
