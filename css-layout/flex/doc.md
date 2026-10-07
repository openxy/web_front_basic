# 弹性容器与十字轴

## 本版本引入的概念

**弹性盒子（Flex Box）的容器轴线**：2009 年 W3C 提出弹性盒子，思路一换天地宽——容器获得一对**轴线**：主轴（默认横向）与交叉轴（垂直于主轴），子元素沿轴排布、对齐、分配空间。传统盒子模型里最琐碎的对齐难题，在 flex 容器上成了两行声明的事：

- `justify-content` 管主轴分布：`flex-start` / `center` / `space-between` / `space-around`
- `align-items` 管交叉轴对齐：`center`（垂直置中）/ `stretch`（拉伸等高）/ `baseline`（基线对齐）

本版把第 1 版起就顺排贴左的页头变成真正的导航条：`display:flex` 让 Logo、菜单、登录即刻横排，`justify-content:space-between` 两端对齐，`align-items:center` 在 44px 高的条里垂直置中——前四版无解的「Logo 靠左、登录靠右、整行置中」，一次清账。

传统盒子的三宗罪，到这里销掉两宗：对齐靠补丁（text-align 只管盒子内内容、`margin:0 auto` 不支持垂直方向）；弹性不足（下一版解决）。根源在于传统盒子的定位基线源自**字体**（它是字符盒子），flex 把基线还给**容器**。

## 本版本的改动

- `.hd` 新增四行：`display:flex`、`justify-content:space-between`、`align-items:center`，并把上下 padding 换成固定 `height:44px`（有高度，垂直置中才看得见）
- 页头里的 `<b>MySite</b>` 和两个 `<span>` 从第 1 版原样保留至今——它们此刻自动升格为 flex 子项，HTML 一行未动
- 主体两栏仍是 960 栅格：flex 先拿最痛的对齐开刀，接管多栏是下一版的事

## 关键代码走读

- `display:flex` 声明在**容器**上，子项即刻横排——不需要浮动，不需要清除，不需要算宽度
- `justify-content` 与 `align-items` 永远一个管主轴一个管交叉轴，主轴方向可由 `flex-direction`（`row` 横 / `column` 纵）切换——换轴后两个属性管的方向跟着换
- 置中的对象是**盒子自身**：别再拿 `text-align:center` 硬套——它只管盒子内部文字的水平对齐，管不了盒子

## 试试

- `justify-content` 换成 `space-around`：三段的间距形态变了（每段左右均分空隙，首尾不再贴边）
- `align-items` 换成 `baseline`：三个子项按文字基线对齐，Logo 与链接的文字底边齐平
- 给 `.hd` 加 `flex-direction:column`：主轴换成纵向，三个子项竖着排——横竖布局同一套词汇

## 思考题

- 为什么 `margin:0 auto` 能水平居中却不能垂直居中？（auto 的本质是把「可计算的剩余空间」交给浏览器平分；水平方向宽度确定有剩可分，垂直方向高度不定时 auto 无从算起）
- 本版只动了页头，主体两栏还留在 960 栅格——为什么说「flex 先解决对齐」是历史事实而非偷懒？（导航条、工具栏这类一维对齐场景是 flex 的成名作；多栏弹性分配是下一版的概念）

## 参考

+ [MDN 弹性盒子](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)
+ [A Complete Guide to Flexbox（css-tricks）](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
+ 练手游戏 [Flexbox Froggy](http://flexboxfroggy.com/)
