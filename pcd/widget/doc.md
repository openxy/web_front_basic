# 封装成控件

## 本版本引入的概念

**控件封装**：三段过程代码（填省、绑事件、级联刷）收进 `pcd.js` 的 `class PCD`。使用方只交出两样东西——数据与各级 select 的 id 列表，其余（绑事件、初始化、级联规则）全部收进构造器。三个空 select 加一行 `new PCD(...)`，页面就活了。

**this 与事件回调**：事件回调触发时，普通 `function` 里的 `this` 不再指向实例。原课程为此先存一份 `var o = this` 再在闭包里用 `o`——箭头函数不绑定自己的 this，直接写 `this.fill(...)` 就行，这个经典陷阱在现代 JS 里被语法本身拆掉了。

## 本版本的改动

- 新文件 `pcd.js`：`class PCD`，构造器收 `(data, ids)`，`fill` 从上一版整体搬入成为方法
- `index.html`：脚本缩成 `new PCD(pcdData, ['province', 'city', 'district'])`

## 关键代码走读

- `ids.slice(0, -1).forEach((id, i) => …)`：绑事件的循环只走到倒数第二级——末级没有下级可刷。`slice(0, -1)` 是「去掉最后一个」的地道写法
- 箭头函数 `() => this.fill(i + 1)`：`this` 按词法作用域指向新造的实例，`i` 是 forEach 回调参数——两个变量都不用自己存
- `this.fill(0)` 放在构造器末尾：new 的那一刻初始化即完成，使用方不需要知道「还要先调一次填充」
- 一个冷知识：`class` 声明是全局词法绑定，不挂到 `window`（`function` 声明会）——控制台里 `typeof PCD` 有值、`window.PCD` 却是 undefined；跨 `<script>` 依然可见，页面里 `new PCD(...)` 照常工作

## 对照要点（与原课程 pcd.js）

- 原课程 `function PCD(data, ids, prompts){ … }` + `PCD.prototype.change = function(v){…}`，本版 class 语法是同一件事的现代表述：constructor 即构造函数，方法即原型方法
- 原课程开头还给 `Array.prototype.indexOf` 打兼容垫片（IE8 时代），现代浏览器早已原生——垫片整段删去
- 原课程 `new Option(...)` 填充的手法保留原样——它至今仍是标准 API

## 思考题

- 把箭头函数换成 `function () { this.fill(i + 1) }` 会怎样？（`this` 变成触发事件的元素——select 身上没有 fill，报错；这正是 `var o = this` 存在过的原因）
- 同一页面要两组三级联动（收货地址+办公地址）怎么办？（两组 select、new 两次——封装的红利在此：过程代码不会跟着翻倍）
