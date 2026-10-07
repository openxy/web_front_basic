// 计数器：点一次「加一」，count 加一并刷新显示
var count = 0;
function render() {
    document.querySelector('#count').textContent = count;
}
document.querySelector('#inc').addEventListener('click', () => {
    count++;
    render();
});
render();
