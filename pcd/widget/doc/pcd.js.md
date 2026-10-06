# 新增：pcd.js（class PCD：三级联动收成可复用控件）

上一版 index.html 里那三段——绑事件、递推填充、初始填充——原样搬进 `class PCD`：

- **构造器** `constructor(data, ids)`：收数据与各级 select 的 id，立即绑事件并 `this.fill(0)` 初始化。**new 的那一刻控件就是活的**，不存在「忘了调 init」的坑
- **事件**：`ids.slice(0, -1)` 给除末级外的每一级绑 change（末级没有下级，不绑），回调 `this.fill(i + 1)` 从下一级刷到末级
- **`fill(from)`**：与上一版逐字相同，只是 `ids`/数据换成了 `this.ids`/`this.data`

页面（index.html）随之缩成一行：`new PCD(pcdData, ['province', 'city', 'district'])`——三个空 select 就活了。这就是封装的分界线：**机制住进类，页面只留装配**。

控件目前每级列表第一项就是真实数据，没法表达「还没选」——加提示项见 `prompts` 版。
