# 登录与门禁

## 本版本引入的概念

后台在上一版出现时就留了个洞：管理页谁都能打开。本版补上门禁，登录取 Web 最经典的形态——**登录态就是一颗 cookie**。

三拍：

+ **是什么**：cookie 是浏览器按域名存储的小段键值文本，页面脚本经 `document.cookie` 读写；「当前登录的是谁」就存在这么一颗 `user=admin` 的 cookie 里
+ **怎么兑现**：登录表单校验账号密码（演示账号硬编码 `admin / admin`），通过即 `setCookie` 写票（`path=/` 让全站可见，`max-age=86400` 存一天），随后整页跳转后台。每个后台页面都经 `renderAdminPage` 出场——门禁就收在它开头：`getCookie` 查不到票，整页跳回登录页。写票（登录页）与查票（门禁）共用 `lib/auth.js` 一处实现
+ **为什么**：门禁放在站点模板而不是三个后台页各查一遍——模板是所有后台内容的必经之路，一处检查处处生效，和「站点模板让各页变薄壳」是同一个道理。cookie 里的登录态是持久的：刷新、关掉再回来（一天内）都还登着，这正是 cookie 与后面 localStorage（v13）的分工现场——身份状态走 cookie，业务数据走 localStorage

## 与上一版的 diff

新增 `lib/auth.js`（setCookie/getCookie 两函数）与 `login.html`（登录表单页）；`lib/view.js` 的导航挂上「登录」入口、`renderAdminPage` 顶部加门禁两行；`style.css` 追加登录表单样式段。其余不动。

## 观察

+ 直接打开 `admin/posts/index.html`：被送回登录页（门禁生效）
+ 输入 admin/admin：跳进后台；F12 → 应用 → Cookies 能看到 `user=admin`；刷新后台，仍然登着
+ 密码打错：行内红字提示，不跳转
+ 未登录时硬闯后台页，控制台会有一条脚本报错：跳转已经发出，但本页脚本还会跑到撞上不存在的元素——「重定向不中断脚本」的真实形状；真实项目会把余下逻辑包进函数提前 return

## 思考

+ 账号密码写在前端脚本里安全吗？任何人「查看源代码」就看到 admin/admin，改一下 cookie 也能伪造登录——真实的登录必须由服务器校验（`POST /login`），会话凭证由服务器 `Set-Cookie` 下发，前端只负责带票。本版是静态站点里能走到的最远一步
+ 退出登录该做什么？（删 cookie——下一版兑现）

## 参考

+ MDN：HTTP cookies（developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies）
+ MDN：Document.cookie（developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie）
