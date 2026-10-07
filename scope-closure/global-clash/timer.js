// 秒表：每秒 count 加一（秒数），刷新显示
var count = 0;
setInterval(() => {
    count++;
    document.querySelector('#sec').textContent = count;
}, 1000);
