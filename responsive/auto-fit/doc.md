# 自适应卡片墙

## 本版本引入的概念

**auto-fit 卡片墙**：一行轨道定义，让列数本身成为浏览器算出来的结果——

```css
.cards{ grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
```

拆开读：`minmax(160px, 1fr)` 说「每列至少 160 像素、有多余空间就按份分」；`repeat(auto-fit, …)` 说「这个轨道重复多少次，你自己看着办——放得下就尽量多排」。于是容器多宽，列数就自动是多少：375 手机一列、700 上下两三列、桌面四五列，**全程连续变化，没有一个断点**。

与断点方案的对照（本案例两组版本的正面对决）：

| | 断点重排（媒体查询两版） | auto-fit 卡片墙（本版） |
| --- | --- | --- |
| 形态切换 | 跳变（跨过断点瞬间换栏） | 连续（宽度渐变列数渐变） |
| 谁来决定列数 | 作者逐个断点写 | 浏览器按可用宽度算 |
| 适用 | 形态大改（双栏并单栏） | 同构内容重排（列表、卡片、图墙） |

选型经验：**结构性重排用断点，同构内容用 auto-fit**；本页两者并存——侧栏的并合仍靠断点，卡片墙不需要。

## 本版本的改动

- 主栏图片下新增 `.cards` 卡片墙（六张同名 `.card`，内容是本案例的概念小卡）
- 样式表新增 `.cards`（auto-fit 轨道）与 `.card`（白底内边距）两条规则

## 关键代码走读

`minmax` 的两个参数正是「内容的最小可读宽度」与「分配剩余空间的意愿」——把断点版里人工判断的「多窄以下没法看」（700 那个数）直接写进了轨道定义。断点没有消失，它变成了每一列的 160 像素下限，由浏览器对每一个宽度现场求值。

## 试试

1. 运行后缓慢拖动窗口宽度，只看卡片墙：列数一格一格地增减，没有任何瞬间跳变
2. 对照上两版拖同样范围：侧栏在 700 处跳变（断点），卡片墙全程连续（无断点）——两种节奏并存于同一页面
3. 把 `160px` 改成 `240px`（编辑模式），再拖：列数变化的门槛随下限走

## 思考题

- `auto-fit` 与 `auto-fill` 的差别在空轨道：卡片只有三张而容器很宽时，两者表现有何不同？（提示：空轨道占不占位）
- 侧栏的并合能用 auto-fit 解决吗？为什么结构性重排必须回到断点？

## 参考

+ MDN repeat()/auto-fit [https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat)
+ css-tricks 自动填充与自动适应 [https://css-tricks.com/auto-sizing-columns-css-grid-auto-repeat-vsminmax/](https://css-tricks.com/auto-sizing-columns-css-grid-auto-repeat-vsminmax/)
