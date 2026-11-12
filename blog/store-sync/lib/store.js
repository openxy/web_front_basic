// 数据存储层：localStorage 同步实现（键名 = 类型_id，模拟自增 id）
// 全站的数据读写只走本模块；lib/data.js 退居种子数据，首次加载播种一次
function getRealKey(type, id) {
  return type + '_' + String(id)
}

function getLastId(type) {
  let lastId = 0
  Object.keys(localStorage).forEach(function (key) {
    const [theType, theId] = key.split('_')
    const id = parseInt(theId)
    if (theType === type && id > lastId) lastId = id
  })
  return lastId + 1
}

function saveResource(type, resource) {
  if (!resource.id) {
    resource.id = getLastId(type)
  }
  localStorage.setItem(getRealKey(type, resource.id), JSON.stringify(resource))
  return resource
}

function fetchResource(type, id) {
  if (id) {
    return JSON.parse(localStorage.getItem(getRealKey(type, id)))
  }
  return Object.keys(localStorage)
    .filter(key => key.startsWith(type + '_'))
    .map(key => JSON.parse(localStorage.getItem(key)))
    .sort((a, b) => a.id - b.id)
}

function deleteResource(type, id) {
  localStorage.removeItem(getRealKey(type, id))
}

function seed() {
  if (localStorage.getItem('post_1')) return
  DATA.posts.forEach(p => saveResource('post', p))
  DATA.comments.forEach(c => saveResource('comment', c))
}

seed()
