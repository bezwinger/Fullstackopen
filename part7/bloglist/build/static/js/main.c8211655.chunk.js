(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{122:function(e,t,n){e.exports=n(417)},417:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),l=n(117),o=n.n(l),c=n(121),u=n(5),i=n.n(u),s=n(17),d=n(6),g=(n(128),function(e){var t=e.blog,n=e.like,l=e.destroyBlog,o=Object(a.useState)(!1),c=Object(d.a)(o,2),u=c[0],i=c[1],s={display:u?"none":""},g={display:u?"":"none"},p=function(){i(!u)};return r.a.createElement("div",{className:"blog",style:{paddingTop:10,paddingLeft:2,border:"solid",borderWidth:1,marginBottom:5}},r.a.createElement("div",{style:s,className:"hiden"},t.title," ",t.author,r.a.createElement("button",{onClick:p},"show")),r.a.createElement("div",{style:g,className:"shown"},"Title:  ",t.title,"  ",r.a.createElement("br",null),"Url:    ",t.url,"    ",r.a.createElement("br",null),"Likes:  ",t.likes,"  ",r.a.createElement("button",{onClick:function(){n(t.id)}},"like")," ",r.a.createElement("br",null),"Author: ",t.author," ",r.a.createElement("br",null),r.a.createElement("button",{onClick:p},"hide"),console.log("snitch nigger",JSON.parse(window.localStorage.getItem("loggedBlogappUser")).userId),JSON.parse(window.localStorage.getItem("loggedBlogappUser")).userId===t.user.id?r.a.createElement("button",{onClick:function(){l(t)}},"destroy"):null))}),p=function(e){var t=e.createBlog,n=Object(a.useState)(""),l=Object(d.a)(n,2),o=l[0],c=l[1],u=Object(a.useState)(""),i=Object(d.a)(u,2),s=i[0],g=i[1],p=Object(a.useState)(""),m=Object(d.a)(p,2),f=m[0],b=m[1];return r.a.createElement("div",null,r.a.createElement("h2",null,"Create a new Blog"),r.a.createElement("form",{id:"form",onSubmit:function(e){e.preventDefault(),t({title:o,author:s,url:f})}},r.a.createElement("div",null,"Title:",r.a.createElement("input",{id:"title",value:o,onChange:function(e){c(e.target.value)}})),r.a.createElement("div",null,"Author:",r.a.createElement("input",{id:"author",value:s,onChange:function(e){g(e.target.value)}})),r.a.createElement("div",null,"Url:",r.a.createElement("input",{id:"url",value:f,onChange:function(e){b(e.target.value)}})),r.a.createElement("button",{id:"submit",type:"submit"},"save")))},m=function(e){var t=e.handleSubmit,n=e.handleUsernameChange,a=e.handlePasswordChange,l=e.username,o=e.password;return r.a.createElement("div",null,r.a.createElement("h2",null,"Login"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"username",r.a.createElement("input",{id:"username",value:l,onChange:n})),r.a.createElement("div",null,"password",r.a.createElement("input",{id:"password",type:"password",value:o,onChange:a})),r.a.createElement("button",{id:"login-button",type:"submit"},"login")))},f=r.a.forwardRef((function(e,t){var n=Object(a.useState)(!1),l=Object(d.a)(n,2),o=l[0],c=l[1],u={display:o?"none":""},i={display:o?"":"none"},s=function(){c(!o)};return Object(a.useImperativeHandle)(t,(function(){return{toggleVisibility:s}})),r.a.createElement("div",null,r.a.createElement("div",{style:u},r.a.createElement("button",{onClick:s},e.buttonLabel)),r.a.createElement("div",{style:i},e.children,r.a.createElement("button",{onClick:s},"cancel")))}));f.displayName="Togglable";var b=f,v=n(21),h=n.n(v),E="/api/blogs",w=null,O={getAll:function(){return h.a.get(E).then((function(e){return e.data}))},create:function(){var e=Object(s.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:w}},e.next=3,h.a.post(E,t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(e,t){return h.a.put("".concat(E," /").concat(e),t).then((function(e){return e.data}))},setToken:function(e){w="bearer ".concat(e)},like:function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.patch("".concat(E,"/").concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),destroy:function(){var e=Object(s.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("destroy2",t),n={headers:{Authorization:w}},e.next=4,h.a.delete("".concat(E,"/").concat(t),n);case 4:return a=e.sent,e.abrupt("return",a.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},j={login:function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},k=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],l=t[1],o=Object(a.useState)(!0),u=Object(d.a)(o,2),f=(u[0],u[1],Object(a.useState)(null)),v=Object(d.a)(f,2),h=(v[0],v[1]),E=Object(a.useState)(""),w=Object(d.a)(E,2),k=w[0],y=w[1],S=Object(a.useState)(""),C=Object(d.a)(S,2),x=C[0],B=C[1],I=Object(a.useState)(null),N=Object(d.a)(I,2),T=N[0],U=N[1],A=Object(a.useRef)();Object(a.useEffect)((function(){O.getAll().then((function(e){return l(e)}))}),[]),Object(a.useEffect)((function(){var e=window.localStorage.getItem("loggedBlogappUser");if(e){var t=JSON.parse(e);U(t),console.log(t),O.setToken(t.token)}}),[]);var J=function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,j.login({username:k,password:x});case 4:n=e.sent,window.localStorage.setItem("loggedBlogappUser",JSON.stringify(n)),O.setToken(n.token),U(n),y(""),B(""),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),h("Wrong credentials"),setTimeout((function(){h(null)}),5e3);case 16:console.log("logging in with",k,x);case 17:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(s.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.create(t);case 2:a=e.sent,l(n.concat(a)),A.current.toggleVisibility();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(e){console.log(e),O.like(e),l(n.map((function(t){return t.id===e?Object(c.a)({},t,{likes:t.likes+1}):t})))},z=function(e){console.log("destroy",e),window.confirm("Destroy blog ".concat(e.title," by ").concat(e.author,"???"))&&(console.log(e.id,T.id,T),O.destroy(e.id),l(n.filter((function(t){return t.id!==e.id}))))};return r.a.createElement("div",null,r.a.createElement("h1",null,"blogs"),null===T?r.a.createElement(b,{buttonLabel:"login"},r.a.createElement(m,{username:k,password:x,handleUsernameChange:function(e){var t=e.target;return y(t.value)},handlePasswordChange:function(e){var t=e.target;return B(t.value)},handleSubmit:J})):r.a.createElement("div",null,r.a.createElement("div",null,T.name," is logged in",r.a.createElement("button",{id:"logout",onClick:function(){window.localStorage.clear(),U(null)}},"logout")),r.a.createElement(b,{buttonLabel:"new blog",ref:A},r.a.createElement(p,{createBlog:L})),console.log(n),n.sort((function(e,t){return t.likes-e.likes})).map((function(e){return r.a.createElement(g,{key:e.id,blog:e,like:D,destroyBlog:z})}))))};o.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[122,1,2]]]);
//# sourceMappingURL=main.c8211655.chunk.js.map