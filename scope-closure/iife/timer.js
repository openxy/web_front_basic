// 秒表：每秒 count 加一（秒数），刷新显示（IIFE 包住，count 是本文件私有的）
(() => {
    var count = 0;
    setInterval(() => {
        count++;
        document.querySelector('#sec').textContent = count;
    }, 1000);
})();
