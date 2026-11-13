// 登录态：一颗 cookie。登录时写入，门禁与页面显示时读取
function setCookie(name, value) {
  document.cookie = `${name}=${value}; path=/; max-age=86400`
}

function getCookie(name) {
  const pair = document.cookie.split('; ').find(item => item.startsWith(name + '='))
  return pair ? pair.slice(name.length + 1) : ''
}

function clearCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0`
}
