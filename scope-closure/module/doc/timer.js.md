# timer.js 解读

与上一版的 diff：拆掉 IIFE 外壳，代码回到第一版的平铺形状——但 `var count` 这回天生文件私有，不再有第一版的全局桌面。注意它和 counter.js 里的 n 互不相干：模块之间不共享顶层声明，除非显式 import/export。
