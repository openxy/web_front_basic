
# 包管理 bower（10 的分支）

## 本版本引入的概念

**包管理器（bower）**：`bower.json` 声明依赖（jquery、director），`bower install` 自动下载到 `bower_components/`；gulpfile 用 `mainBowerFiles()` 在构建时自动收集依赖，与自有源码合并成 `dist/app.js`。

```
npm i -g bower && bower install   # 装依赖
gulp compress                     # 构建时自动并入依赖
```

对照 09：不再手工维护 `js/` 里的第三方库副本。注释里保留了时代的痕迹——ejs 不支持 bower，只能继续手工放。

## 本软件中的运行说明

同 09：在线运行使用已提交的 `dist/app.js` 预构建产物；`bower_components/` 未提交也不需要。编辑后运行对本版禁用（构建期概念，见 09 的说明）。

## 延伸

bower 已停止维护，如今前端依赖管理由 npm 统一承担（package.json + npm install）——思想一脉相承：**声明式依赖 + 自动安装**。
