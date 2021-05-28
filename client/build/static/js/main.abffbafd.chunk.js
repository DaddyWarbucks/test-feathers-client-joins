(this.webpackJsonppublic=this.webpackJsonppublic||[]).push([[0],{116:function(e,t){},125:function(e,t,a){var r={"./":3,"./comments":64,"./comments.js":64,"./index":3,"./index.js":3,"./package":68,"./package.json":68,"./posts":69,"./posts.js":69,"./users":70,"./users.js":70,"./yarn.lock":171};function n(e){var t=s(e);return a(t)}function s(e){if(!a.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}n.keys=function(){return Object.keys(r)},n.resolve=s,e.exports=n,n.id=125},169:function(e,t){},180:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(71),o=a.n(s),c=a(1),i=a.n(c),l=a(6),u=a(15),h=a(16),m=a(79),d=a(81),f=a(7),p=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var r;Object(u.a)(this,a),(r=t.call(this,e)).componentDidMount=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.authenticate({strategy:"local",email:"na@example.com",password:"password"});case 2:r.loadPosts();case 3:case"end":return e.stop()}}),e)}))),r.loadPosts=Object(l.a)(i.a.mark((function e(){var t,a,n,s,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.setState({loading:!0}),e.prev=1,e.next=4,f.a.service("server/profile").create({});case 4:return e.next=6,f.a.service("client/profile").create({});case 6:return t=(new Date).getTime(),e.next=9,f.a.service("api/posts").find({query:{$sort:{_id:1},$limit:r.state.limit},method:r.state.method,joinLocation:r.state.joinLocation});case 9:return a=e.sent,n=(new Date).getTime(),e.next=13,f.a.service("server/profile").find();case 13:return s=e.sent,e.next=16,f.a.service("client/profile").find();case 16:o=e.sent,r.setState({posts:a,duration:n-t,serverProfile:s,clientProfile:o,loading:!1,error:null}),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(1),r.setState({error:e.t0,loading:!1});case 23:case"end":return e.stop()}}),e,null,[[1,20]])})));var n=new URLSearchParams(window.location.search).get("provider")||"socket";return r.state={docsOpen:!1,loading:!0,error:null,serverProfile:null,clientProfile:null,posts:null,duration:null,useBatch:!1,limit:100,method:"primary",joinLocation:"client",provider:n},r}return Object(h.a)(a,[{key:"render",value:function(){var e=this,t=this.state,a=t.docsOpen,r=t.loading,s=t.error,o=t.serverProfile,c=t.clientProfile,i=t.posts,l=t.duration,u=t.useBatch,h=t.limit,m=t.method,d=t.joinLocation,p=t.provider;return n.a.createElement("div",{className:"container-fluid mt-4"},n.a.createElement("p",{className:"lead"},"This is a basic example app that compares doing joins/population on the client vs on the server. It is also a test bed and exmaple of a new v2 for"," ",n.a.createElement("a",{href:"https://github.com/feathersjs-ecosystem/batch-loader/tree/v2",target:"_blank",rel:"noopener noreferrer"},"feathers-dataloader"),". See also the"," ",n.a.createElement("a",{href:"https://github.com/feathersjs-ecosystem/batch-loader/issues/18",target:"_blank",rel:"noopener noreferrer"},"v2 RFC")," ","and leave some feedback! You can also checkout the"," ",n.a.createElement("a",{href:"https://github.com/DaddyWarbucks/test-feathers-client-joins",target:"_blank",rel:"noopener noreferrer"},"source code")," ","for this project. Specifically, see the ",n.a.createElement("code",null,"shared")," ","direcotry."),n.a.createElement("div",{className:"card mb-4 card-light"},n.a.createElement("div",{className:"card-header d-flex justify-content-between"},n.a.createElement("h3",{className:"mb-0"},"Docs"),n.a.createElement("button",{className:"btn btn-primary",onClick:function(){e.setState({docsOpen:!a})}},a?"Hide":"Show")),n.a.createElement("div",{className:"card-body ".concat(a?"":"d-none")},n.a.createElement("p",null,"This is a basic example app that compares doing joins/population on the client vs on the server. It is also a test bed and exmaple of a new v2 for"," ",n.a.createElement("a",{href:"https://github.com/feathersjs-ecosystem/batch-loader/tree/v2",target:"_blank",rel:"noopener noreferrer"},"feathers-dataloader"),". See also the"," ",n.a.createElement("a",{href:"https://github.com/feathersjs-ecosystem/batch-loader/issues/18",target:"_blank",rel:"noopener noreferrer"},"v2 RFC")," ","and leave some feedback! You can also checkout the"," ",n.a.createElement("a",{href:"https://github.com/DaddyWarbucks/test-feathers-client-joins",target:"_blank",rel:"noopener noreferrer"},"source code")," ","for this project. Specifically, see the ",n.a.createElement("code",null,"shared")," ","direcotry."),n.a.createElement("p",null,"The app makes one request to"," ",n.a.createElement("code",null,"app.service('api/posts').find()"),". The posts then join a"," ",n.a.createElement("code",null,"user")," and ",n.a.createElement("code",null,"comments"),". Each user then joins on a ",n.a.createElement("code",null,"bio"),", and each comment subsequently joins on its"," ",n.a.createElement("code",null,"user")," (and subsequently its bio)."),n.a.createElement("ul",null,n.a.createElement("li",{className:"mb-2"},"10,000 posts, each with random ",n.a.createElement("code",null,"user_id")),n.a.createElement("li",{className:"mb-2"},"50,000 comments, each with random ",n.a.createElement("code",null,"user_id")," and"," ",n.a.createElement("code",null,"post_id")),n.a.createElement("li",{className:"mb-2"},"5,000 users, each with corresponding ",n.a.createElement("code",null,"bio_id")),n.a.createElement("li",{className:"mb-2"},"5,000 bios")),n.a.createElement("p",null,'These relationships represent a good example of nested joins where some of those joins are "repeating" resources, such as the post joining its author and comments joinging their user. This is an excellent usecase for ',n.a.createElement("code",null,"feathers-datalader"),"."),n.a.createElement("ul",null,n.a.createElement("li",{className:"mb-2"},"The app also uses"," ",n.a.createElement("a",{href:"https://github.com/feathersjs-ecosystem/feathers-batch",target:"_blank",rel:"noopener noreferrer"},"feathers-batch"),', which is a clever way of allowing the client to specify which joins to do, but actually executes that code on the server. Note that when using feathers-batch, you will see lots of client side calls, but its imporant to understand that these calls are not actual HTTP requests. The service was called, but it did not make a socket/rest request. It simply created "intructions" for feathers-batch.'),n.a.createElement("li",{className:"mb-2"},"The app uses authentication. This means that there are additional requests to"," ",n.a.createElement("code",null,"app.service('api/users').get(authedUserId)")," in the authentication hooks. Note the difference this makes when using the different join types."),n.a.createElement("li",{className:"mb-2"},"For simplicty in this example, the app uses NeDB as its database. NeDB is a filesystem database where the records are just flat JSON files. But, its important to note that it is not making an HTTP request to some database server that lives on another machine. As impressive as the different loading techniques are, it should be noted that on a production database there would be a corresponding number of HTTP requests (think about all thos .get() requests...). The potential resources and performance benefits are quite large.")))),s&&n.a.createElement("div",{className:"alert alert-danger"},s.message),n.a.createElement("div",{className:"row mb-4"},n.a.createElement("div",{className:"col-sm-auto"},n.a.createElement("h4",null,"Provider"),n.a.createElement("div",{className:"btn-group mb-2"},n.a.createElement("a",{className:"btn btn-secondary ".concat("socket"===p?"active":""),href:"/?provider=socket"},"Socket"),n.a.createElement("a",{className:"btn btn-secondary ".concat("rest"===p?"active":""),href:"/?provider=rest"},"REST")),n.a.createElement("p",null,"Configure the client to make ",n.a.createElement("br",null)," calls via Socket or REST")),n.a.createElement("div",{className:"col-sm-auto"},n.a.createElement("h4",null,"Join Location"),n.a.createElement("div",{className:"btn-group mb-2"},n.a.createElement("button",{disabled:r,className:"btn btn-info ".concat("client"!==d||u?"":"active"),onClick:function(){e.setState({joinLocation:"client",useBatch:!1},(function(){e.loadPosts(),f.a.set("useBatch",!1)}))}},"Client"),n.a.createElement("button",{disabled:r,className:"btn btn-info ".concat("server"===d?"active":""),onClick:function(){e.setState({joinLocation:"server",useBatch:!1},(function(){e.loadPosts(),f.a.set("useBatch",!1)}))}},"Server"),n.a.createElement("button",{disabled:r,className:"btn btn-info ".concat(u?"active":""),onClick:function(){e.setState({joinLocation:"client",useBatch:!0},(function(){e.loadPosts(),f.a.set("useBatch",!0)}))}},"feathers-batch")),n.a.createElement("p",null,"Choose between doing joins on the ",n.a.createElement("br",null)," client or the server. See also"," ",n.a.createElement("a",{href:"https://github.com/feathersjs-ecosystem/feathers-batch",target:"_blank",rel:"noopener noreferrer"},"feathers-batch"),".")),n.a.createElement("div",{className:"col-sm-auto"},n.a.createElement("h4",null,"Methods"),n.a.createElement("div",{className:"btn-group mb-2"},n.a.createElement("button",{disabled:r,className:"btn btn-success ".concat("primary"===m?"active":""),onClick:function(){e.setState({method:"primary"},e.loadPosts)}},"Service"),n.a.createElement("button",{disabled:r,className:"btn btn-success ".concat("cached"===m?"active":""),onClick:function(){e.setState({method:"cached"},e.loadPosts)}},"Cached Service"),n.a.createElement("button",{disabled:r,className:"btn btn-success ".concat("load"===m?"active":""),onClick:function(){e.setState({method:"load"},e.loadPosts)}},"DataLoader")),n.a.createElement("p",null,"User feathers get/find methods. Or use the ",n.a.createElement("br",null)," dataloader's cached get/find or load/loadMany methods.")),n.a.createElement("div",{className:"col-sm-auto"},n.a.createElement("h4",null,"Limit"),n.a.createElement("input",{type:"text",className:"form-control mb-2",value:h,onChange:function(t){var a=t.target.value;e.setState({limit:a},(function(){a&&e.loadPosts()}))}}),n.a.createElement("p",null,"Set a limit all the way up to 10,000"))),n.a.createElement("div",{className:"mb-4 p-3 bg-light rounded"},n.a.createElement("h3",null,"Duration:"," ",r?n.a.createElement("div",{className:"spinner-border",style:{width:"2rem",height:"2rem"}}):n.a.createElement("span",{className:"text-success"},l,"ms"))),n.a.createElement("div",{className:"row mb-4"},n.a.createElement("div",{className:"col"},n.a.createElement("h4",null,"Server Profile"),o&&n.a.createElement("pre",{className:"p-3 bg-light rounded"},JSON.stringify(o,null,2))),n.a.createElement("div",{className:"col"},n.a.createElement("h4",null,"Client Profile"),c&&n.a.createElement("pre",{className:"p-3 bg-light rounded"},JSON.stringify(c,null,2)))),n.a.createElement("div",null,n.a.createElement("div",{className:"mb-4"},n.a.createElement("h4",null,"Results"),i&&n.a.createElement("pre",{className:"p-3 bg-light rounded"},JSON.stringify(i,null,2)))))}}]),a}(n.a.Component);o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(p,null)),document.getElementById("root"))},7:function(e,t,a){"use strict";(function(e){var r=a(1),n=a.n(r),s=a(26),o=a(6),c=a(18),i=a(82),l=a(72),u=a.n(l),h=a(19),m=a.n(h),d=a(27),f=a.n(d),p=a(73),b=a(74),v=a(75),E=a(76),g=a(77),k=a(78);e.hrtime=a(176);var j=a(177),y=j.profiler,w=j.getProfile,N=j.clearProfile,S=m()(),O=new URLSearchParams(window.location.search).get("provider")||"socket",x="production"===Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).ENV?"/":"http://localhost:3030";"rest"===O?S.configure(m.a.rest(x).fetch(fetch)):S.configure(m.a.socketio(u()(x),{timeout:1e5})),S.configure(m.a.authentication()),S.mixins.push((function(e){e.loaderFactory=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e.find)throw new Error("Cannot call the loaderFactory() method on this service because it does not have a find() method.");var a=t.params,r=void 0===a?{}:a,l=Object(i.a)(t,["params"]),u=Object(c.a)({id:"_id",multi:!1},l),h=Object(c.a)({paginate:!1},r);return new f.a(function(){var t=Object(o.a)(n.a.mark((function t(a){var r;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.find(Object(c.a)({},h,{query:Object(c.a)(Object(s.a)({},u.id,{$in:f.a.getUniqueKeys(a)}),h.query)}));case 2:return r=t.sent,t.abrupt("return",f.a.getResultsByKey(a,r.data?r.data:r,(function(e){return e[u.id]}),u.multi?"[!]":"!"));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}})),S.configure(v.a),S.configure(E.a),S.configure(g.a),S.configure(k.a),S.configure(y({logger:null,stats:"total"})),S.set("profiler",{getProfile:w,clearProfile:N}),S.hooks(p.a),S.configure(Object(b.a)({batchService:"api/batch",exclude:["server/profile","client/profile","authentication"]})),S.setup(S),t.a=S}).call(this,a(5))},73:function(e,t,a){"use strict";var r=a(3);t.a={before:{all:[r.setupLoader,r.paramsForServer],find:[],get:[],create:[],update:[],patch:[],remove:[]},after:{all:[],find:[],get:[],create:[],update:[],patch:[],remove:[]},error:{all:[function(e){console.error(e.error)}],find:[],get:[],create:[],update:[],patch:[],remove:[]}}},74:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var r=a(80),n=a(1),s=a.n(n),o=a(6),c=a(15),i=a(16),l=a(172).convert,u=function(){function e(t,a){Object(c.a)(this,e),this.app=t,this.batches=[],this.timeout=null,this.options=a}return Object(i.a)(e,[{key:"addBatchCall",value:function(e){var t=this;this.batches.push(e),null===this.timeout&&(this.timeout=setTimeout((function(){return t.flush()}),this.options.timeout||50))}},{key:"flush",value:function(){var e=Object(o.a)(s.a.mark((function e(){var t,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.batches,this.batches=[],this.timeout=null,a=this.options.batchService,e.next=6,this.app.service(a).create({calls:t.map((function(e){return e.payload}))});case 6:r=e.sent,t.forEach((function(e,t){var a=r[t];"fulfilled"===a.status?e.resolve(a.value):e.reject(l(a.reason))}));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),h=function(e){var t=e.params.query,a=void 0===t?{}:t;switch(e.method){case"get":case"remove":return[e.id,a];case"update":case"patch":return[e.id,e.data,a];case"create":return[e.data,a];default:return[a]}},m=function(e){return function(t){if("string"!==typeof e.batchService)throw new Error("`batchService` name option must be passed to batchClient");var a=(e.exclude||[]).concat(e.batchService),n=new u(t,e),c=function(){var e=Object(o.a)(s.a.mark((function e(o){var c,i,l,u,m;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=o.method,i=o.path,t.get("useBatch")){e.next=3;break}return e.abrupt("return",o);case 3:if(!a.includes(i)){e.next=5;break}return e.abrupt("return",o);case 5:return l=h(o),u=[c,i].concat(Object(r.a)(l)),m=new Promise((function(e,t){return n.addBatchCall({resolve:e,reject:t,payload:u})})),e.next=10,m;case 10:return o.result=e.sent,e.abrupt("return",o);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.hooks({before:c})}}},75:function(e,t,a){"use strict";var r=a(3);t.a=function(e){e.service("api/posts").hooks({before:{all:[]},after:{all:[Object(r.switchHook)("posts","client")]}})}},76:function(e,t,a){"use strict";var r=a(1),n=a.n(r),s=a(6),o=a(15),c=a(16);t.a=function(e){var t=function(){function e(t,a){Object(o.a)(this,e),this.options=t||{}}return Object(c.a)(e,[{key:"setup",value:function(e){this.app=e,this.profiler=e.get("profiler")}},{key:"find",value:function(){var e=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.profiler.getProfile());case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(s.a)(n.a.mark((function e(t,a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.profiler.getProfile()&&this.profiler.clearProfile(),e.abrupt("return",{});case 2:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()}]),e}();return e.use("client/profile",new t),e.service("client/profile").hooks({after:{all:[function(e){return delete e._log,delete e.result["client/profile"],delete e.result["server/profile"],e}]}}),e}},77:function(e,t,a){"use strict";var r=a(3);t.a=function(e){e.service("api/comments").hooks({before:{all:[]},after:{all:[Object(r.switchHook)("comments","client")]}})}},78:function(e,t,a){"use strict";var r=a(3);t.a=function(e){e.service("api/users").hooks({before:{all:[]},after:{all:[Object(r.switchHook)("users","client")]}})}},83:function(e,t,a){e.exports=a(180)}},[[83,1,2]]]);
//# sourceMappingURL=main.abffbafd.chunk.js.map