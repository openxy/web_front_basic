# app.js 解读

与上一版的 diff 集中在两处。`compute` 去掉 `onDone` 形参，改为返回 `new Promise(resolve => {...})`：原来调 `onDone()` 的位置改调 `resolve()`——「做完啦」从调用别人的函数，变成通知自己返回的那个对象。点击处理从三层嵌套摊平成 then 链：`.then(() => compute())` 靠箭头函数不带花括号的隐式 return 把新 Promise 交给链条；末尾一个 `.catch` 接住链上任何一环的异常。index.html 无改动。
