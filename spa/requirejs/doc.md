# RequireJS 与 AMD

## 此路曾经通：ESM 之前的浏览器模块化

主链第 6 版用浏览器原生的 ES 模块（import/export + import map）收掉了全局 script 时代。但 ESM 落地是 2015 年之后的事——在那之前的十年里，浏览器没有任何模块系统，「几十个 script 按序加载 + 全局变量拼凑」就是日常。本分支回到那个年代，看当时的工业解法：**RequireJS 与它实现的 AMD 规范**（Asynchronous Module Definition，异步模块定义）。

## AMD 的形态

一个模块 = 一个 `define`：

```js
define(['ejs'], function (ejs) {   // 依赖数组：本模块需要谁
  // ……工厂函数：依赖加载完成后执行，函数体就是模块私有作用域
  return { render_view };          // 返回值 = 模块对外暴露的接口
});
```

与 ES 模块逐点对照（同一应用改写，差异面板里左右可查）：

| | ES 模块（第 6 版） | AMD（本版） |
| --- | --- | --- |
| 声明依赖 | `import` 语句 | 依赖数组（字符串） |
| 暴露接口 | `export` | 工厂返回值 |
| 入口 | `<script type="module" src="app.js">` | `<script src="lib/require.js" data-main="app">` |
| 依赖解析 | 浏览器原生（import map 定名字） | 加载器自己算（requirejs.config paths 定名字） |
| 加载时机 | 静态可分析、声明式提升 | 异步回调，加载完成才执行工厂 |

AMD 没有 language-level 支持，全靠 `lib/require.js` 这个加载器在运行时干活：读依赖数组 → 异步拉文件 → 依序执行工厂。所以 index.html 里第一行 script 引的是**加载器本身**，`data-main="app"` 告诉它从哪个模块开始。加载器自托管在版本目录里（require.js、ejs 的 UMD 版），是当年项目的常态——没有构建过程，一切在浏览器里发生。

## 异步加载踩到的坑

view.js 里有一处与 ES 模块版的真实差异值得盯住：模块加载是异步的，等它执行时 `DOMContentLoaded` 可能**已经过去了**，只挂 DOMContentLoaded 监听会永远等不到。所以初始化要两头防：还在解析就等事件，已经就绪就直接执行。ES 模块的 defer 语义天然保证「文档解析完、DOMContentLoaded 前」执行，不需要这层心眼——语言级方案替你扛了运行时方案要自己扛的事。

## 为什么它退场了

AMD 解决了「浏览器里怎么模块化」，但代价是：格式啰嗦（依赖数组与形参两处对齐）、加载器必须先行、运行时解析无法做静态优化（tree-shaking、循环依赖处理都难）。ES 模块把它连本带利收编：语法进语言、解析进浏览器。RequireJS 2015 年后迅速退役，本分支是它的标本——「此路曾经通，且通了十年」。

## 试试

1. 运行：与第 6 版行为完全一致（列表、详情、新建、编辑）——模块方案换了，应用没换
2. 与 es-modules 版并排看差异面板：app.js 与 lib/ 三个文件的每处 import/export ↔ define/return 一一对应
3. 编辑模式把 app.js 依赖数组里的 'lib/db' 删掉（形参留着）：刷新后什么坏了？（依赖没声明，工厂拿不到）

## 思考题

- 依赖数组为什么必须写字符串，而不能写 `require('lib/db')` 当场调用？（提示：加载器要先看全依赖才能并行拉文件）
- import map 与 requirejs.config 的 paths，解决的是同一个什么问题？
