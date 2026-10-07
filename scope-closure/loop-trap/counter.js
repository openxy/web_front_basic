// 计数器：createCounter 工厂返回带私有 n 的函数——闭包让 n 外不可达、内不失联
(() => {
    function createCounter() {
        var n = 0;                    // n 只是个函数局部变量……函数返回后它去哪了？
        return function () {
            n++;
            return n;
        };
    }
    var next = createCounter();
    function render() {
        document.querySelector('#count').textContent = next();
    }
    document.querySelector('#inc').addEventListener('click', render);
})();
