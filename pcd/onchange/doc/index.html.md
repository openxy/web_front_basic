# 更新：index.html（新增市级下拉，两级第一次联动）

脚本三个角色：

- `fillProvince()`：读 `pcdData['0']` 填省级（上一版的原样搬运）
- `fillCity()`：**清空后**按省的选中序号拼键取数填市——`'0_' + province.selectedIndex`，河北省选中序号 2，键就是 `"0_2"`；`?? []` 兜底（查不到按空列表）
- 绑定：`province.addEventListener('change', fillCity)`——change 在选中项变化时触发，这是联动的引擎

两个细节别放过：`city.innerHTML = ''` 必须先清再填，否则每次改选选项越积越多；脚本末尾先手动调一次 `fillProvince(); fillCity()`，让页面打开就有初始状态（初始选中第 1 项北京市，市列表就是它的城市）。

两级各写一个填充函数，到三级就会长出三份近似代码——收敛成递推见 `cascade` 版。
