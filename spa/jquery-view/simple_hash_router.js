// 基于hash的简单路由
// 使用# https://basescripts.com/implementing-a-simple-client-side-router-in-javascript
// 使用pushstate,https://sangwin.medium.com/how-to-work-with-routing-in-plain-javascript-ece09fbcd008
//https://github.com/daleighan/vanilla-js-router

// 客户端路由库，方便处理对hash的监听和解析 https://github.com/flatiron/director    
// https://www.cnblogs.com/Showshare/p/director-chinese-tutorial.html

class Router {
  constructor(routes) {
    // 将路由模式转换为正则表达式
    let regex_routes = {};
    for(let pattern of Object.keys(routes)){    
       let regexPattern = pattern.replace(/:\w+/g, '([0-9a-z]+)');    
       regex_routes[regexPattern] = routes[pattern];      
    };      
    
    this.routes = regex_routes;
    window.addEventListener('hashchange', this.handleRouteChange.bind(this));
    this.handleRouteChange();
  }    

  handleRouteChange() {
    // x.com/#/posts/7/edit => #/posts/7/edit
    const path = window.location.hash.slice(1) || '/';

    let isMatch = false;
    let match = [];
    let routes = this.routes;
    for(let regexPattern of Object.keys(routes)){        
      let regex = new RegExp(`^${regexPattern}$`);
      match = path.match(regex);
      if(match){
        isMatch = true;
        console.log(routes[regexPattern])
        let route = routes[regexPattern]        
        route(match[1]);
        break;
      }   
    }
    
    if(!isMatch){    
      document.getElementById('main').innerHTML = '404 Not Found';      
    }
  }
}  

export { Router };
