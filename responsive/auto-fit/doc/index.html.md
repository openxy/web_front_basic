# index.html 解读

两处新增：主栏图片之后的 `.cards` 卡片墙（六张 `.card`，内容为前几版概念的小结卡——卡片墙本身就是本案例概念的实物陈列），与样式表 `.side` 规则后新增的 `.cards`/`.card` 两条规则。核心一行 `grid-template-columns:repeat(auto-fit,minmax(160px,1fr))`：`minmax` 给每列 160 像素的可读下限，`auto-fit` 让列数由容器宽度现场决定——断点版的「人工判断最窄可读宽度」被写进轨道定义，交给浏览器逐宽度求值。
