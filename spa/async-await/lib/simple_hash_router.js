// 基于hash的简单路由

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
