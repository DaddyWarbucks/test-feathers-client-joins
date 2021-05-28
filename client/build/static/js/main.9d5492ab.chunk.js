(this.webpackJsonppublic=this.webpackJsonppublic||[]).push([[0],{108:function(e,t){},118:function(e,t,a){var r={"./":4,"./categories":57,"./categories.js":57,"./index":4,"./index.js":4,"./package":61,"./package.json":61,"./posts":62,"./posts.js":62,"./users":63,"./users.js":63};function n(e){var t=c(e);return a(t)}function c(e){if(!a.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}n.keys=function(){return Object.keys(r)},n.resolve=c,e.exports=n,n.id=118},157:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(64),s=a.n(c),o=a(1),i=a.n(o),l=a(5),u=a(12),d=a(13),f=a(72),h=a(74),m=a(6),p=function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(e){var r;Object(u.a)(this,a),(r=t.call(this,e)).componentDidMount=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.authenticate({strategy:"local",email:"na@example.com",password:"password"});case 2:r.loadPosts();case 3:case"end":return e.stop()}}),e)}))),r.loadPosts=Object(l.a)(i.a.mark((function e(){var t,a,n,c,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.setState({loading:!0}),e.prev=1,e.next=4,m.a.service("server/profile").create({});case 4:return e.next=6,m.a.service("client/profile").create({});case 6:return t=(new Date).getTime(),e.next=9,m.a.service("api/posts").find({query:{$sort:{_id:1},$limit:100},method:r.state.method,joinLocation:r.state.joinLocation});case 9:return a=e.sent,n=(new Date).getTime(),e.next=13,m.a.service("server/profile").find();case 13:return c=e.sent,e.next=16,m.a.service("client/profile").find();case 16:s=e.sent,r.setState({posts:a,duration:n-t,serverProfile:c,clientProfile:s,loading:!1,error:null}),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(1),r.setState({error:e.t0,loading:!1});case 23:case"end":return e.stop()}}),e,null,[[1,20]])})));var n=new URLSearchParams(window.location.search).get("provider")||"socket";return r.state={loading:!0,error:null,serverProfile:null,clientProfile:null,posts:null,duration:null,useBatch:!1,method:"primary",joinLocation:"client",provider:n},r}return Object(d.a)(a,[{key:"render",value:function(){var e=this,t=this.state,a=t.loading,r=t.error,c=t.serverProfile,s=t.clientProfile,o=t.posts,i=t.duration,l=t.useBatch,u=t.method,d=t.joinLocation,f=t.provider;return n.a.createElement("div",{className:"container mt-4"},n.a.createElement("div",{className:"mb-4"},n.a.createElement("h4",null,"Provider"),n.a.createElement("div",{className:"btn-group mb-2"},n.a.createElement("a",{className:"btn btn-secondary ".concat("socket"===f?"active":""),href:"/?provider=socket"},"Socket"),n.a.createElement("a",{className:"btn btn-secondary ".concat("rest"===f?"active":""),href:"/?provider=rest"},"REST")),n.a.createElement("p",{className:"lead"},"Configure the feathers-client to make calls either via Socket or REST")),n.a.createElement("div",{className:"mb-4"},n.a.createElement("h4",null,"Join Location"),n.a.createElement("div",{className:"btn-group mb-2"},n.a.createElement("button",{disabled:a,className:"btn btn-primary ".concat("client"!==d||l?"":"active"),onClick:function(){e.setState({joinLocation:"client",useBatch:!1},(function(){e.loadPosts(),m.a.set("useBatch",!1)}))}},"Client"),n.a.createElement("button",{disabled:a,className:"btn btn-primary ".concat("server"===d?"active":""),onClick:function(){e.setState({joinLocation:"server",useBatch:!1},(function(){e.loadPosts(),m.a.set("useBatch",!1)}))}},"Server"),n.a.createElement("button",{disabled:a,className:"btn btn-primary ".concat(l?"active":""),onClick:function(){e.setState({joinLocation:"client",useBatch:!0},(function(){e.loadPosts(),m.a.set("useBatch",!0)}))}},"feathers-batch")),n.a.createElement("p",{className:"lead"},"Choose between doing the joins on the client or the server. See also"," ",n.a.createElement("a",{href:"https://github.com/feathersjs-ecosystem/feathers-batch",target:"_blank",rel:"noopener noreferrer"},"feathers-batch"))),n.a.createElement("div",{className:"mb-4"},n.a.createElement("h4",null,"Methods"),n.a.createElement("div",{className:"btn-group mb-2"},n.a.createElement("button",{disabled:a,className:"btn btn-primary ".concat("primary"===u?"active":""),onClick:function(){e.setState({method:"primary"},e.loadPosts)}},"Get/Find"),n.a.createElement("button",{disabled:a,className:"btn btn-primary ".concat("cached"===u?"active":""),onClick:function(){e.setState({method:"cached"},e.loadPosts)}},"Cached Get/Find"),n.a.createElement("button",{disabled:a,className:"btn btn-primary ".concat("load"===u?"active":""),onClick:function(){e.setState({method:"load"},e.loadPosts)}},"Load/LoadMany")),n.a.createElement("ul",null,n.a.createElement("li",{className:"lead"},"Get/Find - Use standard Feathers .get() and .find() methods"),n.a.createElement("li",{className:"lead"},"Cached Get/Find - Use feathers-dataloader cached .get() and .find() methods"),n.a.createElement("li",{className:"lead"},"Load/LoadMany - Use feathers-dataloader .load() and .loadMany() methods"))),r&&n.a.createElement("div",{className:"alert alert-danger"},r.message),n.a.createElement("div",{className:"mb-4 p-3 bg-light"},n.a.createElement("h3",null,"Duration:"," ",a?n.a.createElement("div",{className:"spinner-border",style:{width:"2rem",height:"2rem"}}):n.a.createElement("span",{className:"text-success"},i,"ms"))),n.a.createElement("div",{className:"row mb-4"},n.a.createElement("div",{className:"col"},n.a.createElement("h4",null,"Server Profile"),c&&n.a.createElement("pre",{className:"p-3 bg-light"},JSON.stringify(c,null,2))),n.a.createElement("div",{className:"col"},n.a.createElement("h4",null,"Client Profile"),s&&n.a.createElement("pre",{className:"p-3 bg-light"},JSON.stringify(s,null,2)))),n.a.createElement("div",null,n.a.createElement("div",{className:"mb-4"},n.a.createElement("h4",null,"Results"),o&&n.a.createElement("pre",{className:"p-3 bg-light"},JSON.stringify(o,null,2)))))}}]),a}(n.a.Component);s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(p,null)),document.getElementById("root"))},6:function(e,t,a){"use strict";(function(e){var r=a(1),n=a.n(r),c=a(25),s=a(5),o=a(18),i=a(75),l=a(65),u=a.n(l),d=a(19),f=a.n(d),h=a(17),m=a.n(h),p=a(66),v=a(67),b=a(68),g=a(69),E=a(70),k=a(71);e.hrtime=a(152);var y=a(153),j=y.profiler,w=y.getProfile,N=y.clearProfile,O=f()();"rest"===(new URLSearchParams(window.location.search).get("provider")||"socket")?O.configure(f.a.rest("http://localhost:3030").fetch(fetch)):O.configure(f.a.socketio(u()("http://localhost:3030"))),O.configure(f.a.authentication()),O.mixins.push((function(e){e.loaderFactory=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e.find)throw new Error("Cannot call the loaderFactory() method on this service because it does not have a find() method.");var a=t.params,r=void 0===a?{}:a,l=Object(i.a)(t,["params"]),u=Object(o.a)({id:"_id",multi:!1},l),d=Object(o.a)({paginate:!1},r);return new m.a(function(){var t=Object(s.a)(n.a.mark((function t(a){var r;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.find(Object(o.a)({},d,{query:Object(o.a)(Object(c.a)({},u.id,{$in:m.a.getUniqueKeys(a)}),d.query)}));case 2:return r=t.sent,t.abrupt("return",m.a.getResultsByKey(a,r.data?r.data:r,(function(e){return e[u.id]}),u.multi?"[!]":"!"));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}})),O.configure(b.a),O.configure(g.a),O.configure(E.a),O.configure(k.a),O.configure(j({logger:null,stats:"total"})),O.set("profiler",{getProfile:w,clearProfile:N}),O.hooks(p.a),O.configure(Object(v.a)({batchService:"api/batch",exclude:["server/profile","client/profile","authentication"]})),O.setup(O),t.a=O}).call(this,a(7))},66:function(e,t,a){"use strict";var r=a(4);t.a={before:{all:[r.setupLoader,r.paramsForServer],find:[],get:[],create:[],update:[],patch:[],remove:[]},after:{all:[],find:[],get:[],create:[],update:[],patch:[],remove:[]},error:{all:[function(e){console.error(e.error)}],find:[],get:[],create:[],update:[],patch:[],remove:[]}}},67:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var r=a(73),n=a(1),c=a.n(n),s=a(5),o=a(12),i=a(13),l=a(10).convert,u=function(){function e(t,a){Object(o.a)(this,e),this.app=t,this.batches=[],this.timeout=null,this.options=a}return Object(i.a)(e,[{key:"addBatchCall",value:function(e){var t=this;this.batches.push(e),null===this.timeout&&(this.timeout=setTimeout((function(){return t.flush()}),this.options.timeout||50))}},{key:"flush",value:function(){var e=Object(s.a)(c.a.mark((function e(){var t,a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.batches,this.batches=[],this.timeout=null,a=this.options.batchService,e.next=6,this.app.service(a).create({calls:t.map((function(e){return e.payload}))});case 6:r=e.sent,t.forEach((function(e,t){var a=r[t];"fulfilled"===a.status?e.resolve(a.value):e.reject(l(a.reason))}));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),d=function(e){var t=e.params.query,a=void 0===t?{}:t;switch(e.method){case"get":case"remove":return[e.id,a];case"update":case"patch":return[e.id,e.data,a];case"create":return[e.data,a];default:return[a]}},f=function(e){return function(t){if("string"!==typeof e.batchService)throw new Error("`batchService` name option must be passed to batchClient");var a=(e.exclude||[]).concat(e.batchService),n=new u(t,e),o=function(){var e=Object(s.a)(c.a.mark((function e(s){var o,i,l,u,f;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=s.method,i=s.path,t.get("useBatch")){e.next=3;break}return e.abrupt("return",s);case 3:if(!a.includes(i)){e.next=5;break}return e.abrupt("return",s);case 5:return l=d(s),u=[o,i].concat(Object(r.a)(l)),f=new Promise((function(e,t){return n.addBatchCall({resolve:e,reject:t,payload:u})})),e.next=10,f;case 10:return s.result=e.sent,e.abrupt("return",s);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.hooks({before:o})}}},68:function(e,t,a){"use strict";var r=a(4);t.a=function(e){e.service("api/posts").hooks({before:{all:[]},after:{all:[Object(r.switchHook)("posts","client")]}})}},69:function(e,t,a){"use strict";var r=a(1),n=a.n(r),c=a(5),s=a(12),o=a(13);t.a=function(e){var t=function(){function e(t,a){Object(s.a)(this,e),this.options=t||{}}return Object(o.a)(e,[{key:"setup",value:function(e){this.app=e,this.profiler=e.get("profiler")}},{key:"find",value:function(){var e=Object(c.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.profiler.getProfile());case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(c.a)(n.a.mark((function e(t,a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.profiler.getProfile()&&this.profiler.clearProfile(),e.abrupt("return",{});case 2:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()}]),e}();return e.use("client/profile",new t),e.service("client/profile").hooks({after:{all:[function(e){return delete e._log,delete e.result["client/profile"],delete e.result["server/profile"],e}]}}),e}},70:function(e,t,a){"use strict";var r=a(4);t.a=function(e){e.service("api/categories").hooks({before:{all:[]},after:{all:[Object(r.switchHook)("categories","client")]}})}},71:function(e,t,a){"use strict";var r=a(4);t.a=function(e){e.service("api/users").hooks({before:{all:[]},after:{all:[Object(r.switchHook)("users","client")]}})}},76:function(e,t,a){e.exports=a(157)}},[[76,1,2]]]);
//# sourceMappingURL=main.9d5492ab.chunk.js.map