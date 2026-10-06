// 以下是视图view相关的工具函数

// 局部更新页面：加载模板
function render_view(tplName,data=null){
  // 字符串插值
  path = `./view/${tplName}.tpl`;

  fetch(path)
    .then(response => response.text())
    .then(tpl => {
      console.log(tpl);
      // 这里使用了链式调用,可以节省一个本地变量
      // {data:data} 指将此处的data变量映射为模板文件里的data变量，对于json内容为数组的尤其有用（json内容为对象的，则可以直接通过对象属性名访问）
      result = ejs.compile(tpl)(  {data:data}  )
      document.querySelector('#main').innerHTML = result;
    })
    .catch(error => {
      console.error('获取数据失败:', error);
    });

}


// 获取表单数据的值
function fetch_form(){
  let post = {} ;
  id_input = document.querySelector('[name=id]');
  if(id_input){
    post["id"] =  id_input.value;  
  }  
  // 可选链运算符，允许对象为null时仍可调用其方法，但一律返回为空
  post["created_at"] = document.querySelector('[name=created_at]')?.value;
  
  post["title"] = document.querySelector('[name=title]').value;
  post["body"] = document.querySelector('[name=body]').value;
  return post;
}


// 拦截form的默认事件，实现单页刷新效果
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('main').addEventListener('submit',function(e){
    if(e.target && e.target.nodeName.toUpperCase() === 'FORM') {
      let post = fetch_form();
      after_form_submit_callback(post);      
      e.preventDefault(); // Prevent the default form submission
      return false;
    }
  });

});
