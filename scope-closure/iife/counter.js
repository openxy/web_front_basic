// 计数器：点一次「加一」，count 加一并刷新显示（IIFE 包住，count 是本文件私有的）
(() => {
    var count = 0;
    function render() {
        document.querySelector('#count').textContent = count;
    }
    document.querySelector('#inc').addEventListener('click', () => {
        count++;
        render();
    });
    render();
})();
