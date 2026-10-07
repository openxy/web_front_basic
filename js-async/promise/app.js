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

// 分片计算封装成函数：返回 Promise，做完 resolve——接续方式由调用方决定
function compute() {
    return new Promise(resolve => {
        const start = Date.now();
        function step() {
            const segStart = Date.now();
            while (Date.now() - segStart < 50) {}    // 本段只忙等 50ms
            if (Date.now() - start < 1000) {
                setTimeout(step, 0);                 // 让出主线程：「下一段」排到队列稍后再跑
            } else {
                resolve();                           // 通知外面：这一环完成
            }
        }
        step();
    });
}

document.querySelector('#run').addEventListener('click', () => {
    compute()
        .then(() => log('任务 A 完成'))
        .then(() => compute())                       // 返回新 Promise，链会等它完成再走下一步
        .then(() => log('任务 B 完成'))
        .then(() => compute())
        .then(() => log('任务 C 完成（三连结束）'))
        .catch(() => log('某一步出错了'));           // 链上任何一环出错都落到这一处收口
});
