
# 构建工具 gulp

## 本版本引入的概念

**构建（build）**：开发时的源码（`js/*.js`）不能直接上线——体积大、请求多。gulp 定义 `compress` 任务：把所有 js 压缩（uglify）合并（concat）成一个 `dist/app.js`，`index.html` 只引用它。

```
gulp            # 查看任务
gulp compress   # 执行压缩合并，生成 dist/app.js
```

**注意**：本目录的 `js/main.js` 是课程早期的独立实现线（自带 jquery/director/localforage），与 `template`–`async-await` 主链代码无连续性；本版的重点是「构建过程」这一概念，不是代码演进。模板目录沿用主链的 `view/` 命名（原课程的 `tpl/`），因此与 `async-await` 的 diff 里 `view/post/index.tpl`、`show.tpl` 显示为未变——模板没变，变的是引用方式。

## 本软件中的运行说明

在线运行使用**已提交的预构建产物** `dist/app.js`（浏览器内不执行 gulp）。因此编辑模式下修改 `js/*.js` 源码**不会**改变运行结果——「编辑后运行」对本版禁用，这正是「构建期 vs 运行期」的教学点。

## 思考

构建解决了上线路径，但第三方依赖（jQuery 等）仍要手工下载放进 `js/`。依赖能不能也自动管理？——包管理器，10.01 分支。
