// 省市区三级联动控件：传入数据与各级 select 的 id，自己绑事件、自己初始化。
// 用法：new PCD(pcdData, ['province', 'city', 'district'], ['省份', '地级市', '区县'])
// 第三参 prompts 可选：每级列表第一项的提示文字，如「省份」「请选择」。
class PCD {
  constructor(data, ids, prompts = []) {
    this.data = data;
    this.ids = ids;
    this.prompts = prompts;
    // 每一级变化，从下一级起全部重刷（末级没有下级，不绑）
    ids.slice(0, -1).forEach((id, i) => {
      document.getElementById(id).addEventListener('change', () => this.fill(i + 1));
    });
    this.fill(0); // 初始化第一级，触发整条链
  }

  // 从第 from 级填到末级：第 v 级的键 = "0" + 前 v 级各自的选中序号。
  // 有提示项时选项 0 是提示、数据从 1 起——拼索引路径要整体减 1
  fill(from) {
    const offset = this.prompts.length > 0 ? 1 : 0;
    for (let v = from; v < this.ids.length; v++) {
      let sid = '0';
      for (let i = 0; i < v; i++) {
        sid += '_' + (document.getElementById(this.ids[i]).selectedIndex - offset);
      }
      const names = this.data[sid] ?? []; // 上级停在提示项时序号为 -1，键查不到，按空列表处理
      const select = document.getElementById(this.ids[v]);
      select.innerHTML = '';
      if (this.prompts[v]) select.add(new Option(this.prompts[v], ''));
      for (const name of names) select.add(new Option(name, name));
    }
  }
}
