// 省市区三级联动控件：传入数据与各级 select 的 id，自己绑事件、自己初始化。
// 用法：new PCD(pcdData, ['province', 'city', 'district'])
class PCD {
  constructor(data, ids) {
    this.data = data;
    this.ids = ids;
    // 每一级变化，从下一级起全部重刷（末级没有下级，不绑）
    ids.slice(0, -1).forEach((id, i) => {
      document.getElementById(id).addEventListener('change', () => this.fill(i + 1));
    });
    this.fill(0); // 初始化第一级，触发整条链
  }

  // 从第 from 级填到末级：第 v 级的键 = "0" + 前 v 级各自的选中序号
  fill(from) {
    for (let v = from; v < this.ids.length; v++) {
      let sid = '0';
      for (let i = 0; i < v; i++) {
        sid += '_' + document.getElementById(this.ids[i]).selectedIndex;
      }
      const names = this.data[sid] ?? [];
      const select = document.getElementById(this.ids[v]);
      select.innerHTML = '';
      for (const name of names) select.add(new Option(name, name));
    }
  }
}
