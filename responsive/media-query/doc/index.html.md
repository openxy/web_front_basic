# index.html 解读

与图片响应式版的 diff 只在样式表末尾：新增 `@media (max-width:700px)` 块，内含一条 `.page{ grid-template-columns:1fr }`。媒体块放在基础规则之后，窄屏时以其覆盖基础的双栏定义——级联里「后写的赢」在这里就是生效逻辑。grid 单列之下侧栏自动落到主栏下一行，无需再写任何落位规则。
