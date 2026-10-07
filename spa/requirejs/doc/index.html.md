# index.html 解读

与第 6 版（es-modules）的差异在 head：import map 块换成一行 `<script src="lib/require.js" data-main="app">`。require.js 是自托管的加载器（当年项目常态），data-main 指向入口模块——加载器先就位，再异步拉起 app.js 及其依赖树。body 一字未动。
