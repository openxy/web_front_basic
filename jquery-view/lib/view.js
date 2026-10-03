// 本文件为使用jquery的版本，更为简洁
import $ from 'jquery';
import ejs from 'ejs';

// 获取表单数据的值
// 用于局部更新页面：加载模板
function render_view(tplName,data=null){
  //console.log(data)
  // 字符串插值
  let path = `./view/${tplName}.tpl`;

  $.get(path, function(tpl){
    // 这里使用了链式调用,可以节省一个本地变量
    // {data:data} 指将此处的data变量映射为模板文件里的data变量，对于json内容为数组的尤其有用（json内容为对象的，则可以直接通过对象属性名访问）
    let result = ejs.compile(tpl)(  {data:data}  )
    $('#main').html(result);

  });
}


// 获取表单的内容
function fetch_form(){
  let post = {}   ;
  post["id"] = $('input[name=id]').val();
  post["title"] = $('input[name=title]').val();
  post["body"] = $('textarea[name=body]').val();
  post["created_at"] = $('input[name=created_at]').val();  
  return post;
}

// https://stackoverflow.com/questions/18545941/jquerys-on-method-combined-with-the-submit-event
$(document).on('submit','form', function( event ) {
    //console.log( "Handler for `submit` called." );

    let post = fetch_form();
    after_form_submit_callback(post);    
    event.preventDefault(); // Prevent the default form submission
    return false;

});

export { render_view, fetch_form };
