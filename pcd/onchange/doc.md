# onchange 联动

## 本版本引入的概念

**change 事件**：下拉框选中项变化时触发（`addEventListener('change', …)`；原课程写法是 DOM0 的 `e.onchange = function(){}`，行为一致，现代写法可叠加多个监听器）。

**selectedIndex**：select 当前选中项的序号（0 起）。选中项的序号正是索引路径的一段：河北省是第 3 项，序号 2，它的城市列表就在键 `"0_2"`——上一版的数据规律直接变成取数公式。

## 本版本的改动

- 新增第二个下拉 `#city`
- `fillCity()`：清空旧选项，按 `'0_' + province.selectedIndex` 取城市列表填充
- `province` 绑 `change` → `fillCity`

## 关键代码走读

- `city.innerHTML = ''`：填充前先清空，否则每换一次省，城市越积越多——动态填充列表的铁律是「先清后填」
- `pcdData['0_' + province.selectedIndex] ?? []`：查不到按空表处理（上级列表为空时下级自然也空）
- 初始先手动调一次 `fillCity()`：页面打开时默认选中的北京市，城市不能是空的——事件只管「变」，初始态自己负责

## 对照要点（与原课程 pcd.js）

- 原课程在构造函数里 `e.onchange = function(evt){ … o.change(…) }`，还要处理 `evt.target` 与 `event.srcElement` 的兼容——现代浏览器只需要 `addEventListener`，事件对象也只剩一个标准入口
- 原课程取触发者 id 再 `indexOf` 换算层级；这里直接在绑定时用闭包把「我是第几级」记住（下一版把它做成通用规则）

## 思考题

- 把 `fillCity()` 里的清空那行删掉，选几个省看看城市框变成了什么？
- 为什么初始也要调 `fillCity()`？`change` 事件在页面加载时会触发吗？
