// 时钟每 100ms 刷新一次：主线程的「心跳监测仪」
const clock = document.querySelector('#clock');
setInterval(() => {
    const now = new Date();
    const p = n => String(n).padStart(2, '0');
    clock.textContent = `${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}.${Math.floor(now.getMilliseconds() / 100)}`;
}, 100);

const logEl = document.querySelector('#log');
function log(msg) {
    const li = document.createElement('li');
    li.textContent = `${clock.textContent}  ${msg}`;
    logEl.appendChild(li);
}

// 长任务：总计忙等 3 秒
document.querySelector('#run').addEventListener('click', () => {
    log('开始分片计算（3 秒）');
    const start = Date.now();
    function step() {
        const segStart = Date.now();
        while (Date.now() - segStart < 50) {}    // 本段只忙等 50ms
        if (Date.now() - start < 3000) {
            setTimeout(step, 0);                 // 让出主线程：「下一段」排到队列稍后再跑
        } else {
            log('计算完成');
        }
    }
    step();
});
