# 固定宽度

## 本版本引入的概念

**固定宽度布局（fixed width）**：页面主结构用像素写死宽度。960 像素是栅格时代的版心标准——上一案例 css-layout 的栅格版正是这个形态，本案例直接继承那副骨架，开始回答下一个问题：屏幕不止一种宽度，页面怎么办。

页面标配的两行 `<meta>` 顺带交代：`charset` 定字符编码，`viewport` 告诉手机浏览器「按设备宽度渲染、初始不缩放」。桌面窗口观察不到后者的作用，真机或浏览器设备模拟模式才可见——它影响的是手机上的初始形态，桌面版式由样式表决定。

## 本版本的改动

- `.hd`、`.ft`、`.page` 三处宽度全部写死 `width: 960px`，`margin: 0 auto` 让版心在更宽的窗口里居中
- 两栏骨架 `3fr 1fr` 沿用 grid（布局技术在上一案例已讲清，本案例专注「宽度」这一维）

## 关键代码走读

```css
.hd,.ft{ width:960px; margin:0 auto; }
.page { width:960px; margin:0 auto; display:grid; grid-template-columns:3fr 1fr; gap:12px; }
```

固定宽度的隐含假设：**访问者的视口至少和版心一样宽**。窗口宽于 960 时一切正常；窄于 960 时，容器不肯缩，浏览器只能给出横向滚动条。

## 试试

1. 点击「运行」，把运行面板拖窄到 960 像素以内：页面右侧被裁掉，横向滚动条出现
2. 再拖窄到手机常见的 375 像素：要左右拖动滚动条才能看全页面——在手机上没人有耐心这样做
3. 拖宽回 1200 像素以上：版心居中，两侧留白，一切如常

## 思考题

- 固定宽度在什么条件下并不算缺陷？（提示：内部管理系统、大屏数据看板）
- 版心为什么选 960 而不是 1024 或 800？（回顾 css-layout 栅格版的算式）

## 参考

+ MDN 响应式设计 [https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design)
