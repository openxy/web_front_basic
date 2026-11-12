// 数据存储层：REST API 异步实现（json-server 风格；教学站里由接口模拟层拦截，下载后可真连）
// 与 store-sync 版同名同参数，只是返回 Promise——调用方全部改写为 async/await
// 数据种子在 data/posts.json 与 data/comments.json（本机复现：npx json-server --port 3000 data/posts.json）
const API_BASE_URL = 'http://localhost:3000'

function fetchResource(type, id) {
  const url = id ? `${API_BASE_URL}/${type}s/${id}` : `${API_BASE_URL}/${type}s`
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`请求失败：${res.status}`)
    return res.json()
  })
}

function saveResource(type, resource) {
  const hasId = !!resource.id
  return fetch(hasId ? `${API_BASE_URL}/${type}s/${resource.id}` : `${API_BASE_URL}/${type}s`, {
    method: hasId ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resource),
  }).then(res => {
    if (!res.ok) throw new Error(`保存失败：${res.status}`)
    return res.json()
  })
}

function deleteResource(type, id) {
  return fetch(`${API_BASE_URL}/${type}s/${id}`, { method: 'DELETE' }).then(res => {
    if (!res.ok) throw new Error(`删除失败：${res.status}`)
  })
}
