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

// 分片计算封装成函数：做完调用 onDone——「接着做」交给回调表达
function compute(onDone) {
    const start = Date.now();
    function step() {
        const segStart = Date.now();
        while (Date.now() - segStart < 50) {}    // 本段只忙等 50ms
        if (Date.now() - start < 1000) {
            setTimeout(step, 0);                 // 让出主线程：「下一段」排到队列稍后再跑
        } else {
            onDone();
        }
    }
    step();
}

document.querySelector('#run').addEventListener('click', () => {
    compute(() => {
        log('任务 A 完成');
        compute(() => {
            log('任务 B 完成');
            compute(() => log('任务 C 完成（三连结束）'));
        });
    });
});
