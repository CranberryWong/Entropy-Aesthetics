window.SPR=function(){function z(a,d){var c=this;c.G=[];c.A=a||{};c.Nc=b.uc;c.pa=!1;c.mc=d||b.Xb;p.Sb(c.mc);g.a(a[b.qa]);a[b.c]=a[b.c]||q.current[b.c];a[b.url]=a[b.url]||e.ia();a[b.title]||(a[b.title]=e.ha(a[b.url]));if(a[b.url])c.a=function(){if(c.ic())return c.Ob(),c;g[b.error](c.wb());return null},c[b.xc]=function(a){c.jc(a)?c.Pb(a):c.tb(a);return c},c[b.pc]=function(a){c.gc(a)?c.Nb(a):c.sb();return c},c[b.Cc]=function(a){c.kc(a)?c.Qb(a):c.ub();return c},c[b.nc]=function(){c.pa||(c.m(c.ea(c.ea())),
c[b.Ea](100),c.pa=!0);return c},c[b.Ea]=function(a){if(f.contains(c.G,a))return null;if(f.contains(f.V,a)){var d=c.g();d[b.i]=b.Fa;d[b.Fa]=c.ab(a);c.m(d)}else g[b.error](b.ib);return c},c.ab=function(a){var d,n=f.V,e={};if(!f.contains(n,a))g[b.error](b.sa);else if(!f.contains(c.G,a))for(d=0;d<n.length;d+=1){var l=n[d];a>=l&&!f.contains(c.G,l)&&(c.G.push(l),e[l]=!0,g[b.info](b.za+l))}return e},c.m=function(a){p.f(b.h,b.rc,a)},c.Ob=function(){c.m(c.gb())},c.Qc=function(){return q.current},c.g=function(){return v.ba(c.A)},
c.gb=function(){var a=c.g();a[b.i]=b.tc;return a},c.ic=function(){var a;for(a=0;a<r.length;a+=1)if(!c.A[r[a]])return!1;return!0},c.wb=function(){var a,d=[];for(a=0;a<r.length;a+=1)c.A[r[a]]||d.push(r[a]);return b.kb+d.join(", ")},c.Pb=function(a){c.m(c.ac(a))},c.jc=function(a){return a===b.Ac||a===b.Bc},c.ac=function(a){var d=c.g();d[b.i]=b.yc;d[b.zc]=a;return d},c.tb=function(a){if(a)g[b.error](a+b.lb);else g[b.error](b.ec)},c.ea=function(){var a=c.g();a[b.i]=b.oc;return a},c.Nb=function(a){c.m(c.Ya(a))},
c.Ya=function(a){var d=c.g();d[b.i]=b.qc;d[b.vc]=a;return d},c.gc=function(a){return!isNaN(a)},c.sb=function(){g[b.error](b.hb)},c.Qb=function(a){c.m(c.bc(a))},c.bc=function(a){var d=c.g();d[b.i]=b.Dc;d[b.wc]=a;return d},c.kc=function(a){return!isNaN(a)&&c.lc(a)},c.lc=function(a){return f.Qa(f.Ec,a)},c.ub=function(){g[b.error](b.jb)};else g[b.error](b.Y+b.ja)}var b={h:"edge.simplereach.com",version:"2.15.0",Oa:"d8rk54i4mohrb.cloudfront.net",fb:"/n",cc:"/t",rc:"/v",ka:"/event",Ma:"/pixel?bad=true&error=",Lc:"/iframe.html",
Pa:"/container.html",Aa:"000000000000000000000000",Y:"SPR-ERROR: ",ja:"100 - Missing url",Fb:"__reach_config",Na:"cache_buster",xa:"__srret",Da:"__srui",J:"0",zb:"1",eb:"img",Ab:"1px",width:"width",aa:"undefined",error:"error",xb:"off",info:"info",D:"SPR_DEBUG",Yb:"//",Z:"string",referrer:"referrer",uid:"uid",L:"callback",f:"jsonp",url:"url",title:"title",c:"pid",ra:"ignore_metadata",ya:"s",r:"r",t:"t",e:"e",x:"x",n:"n",fc:"v",qa:"ignore_errors",Eb:"preview",K:"authors",N:"channels",$:"tags",v:"date",
Mc:"inframe",Ja:"ajax",Zb:"social_tracking",Kc:"iframe",Sa:"custom_tracking",Gb:"reach_tracking",l:"ref_url",U:"page_url",Vc:"user_id",vb:"manual_scroll_depth",ga:"content_height",Pc:"rd",Jc:"fb",Fc:"de",Bb:"pi",Ra:"csd",Cb:"partners-api.pinterest.com",Db:"/v1/urls/count.json",sa:"[error] Invalid amount please send scroll depths of only: 25, 50, 75 or 100",za:"[info] sending scrollDepth of: ",Mb:"[info] scroll depth not activated, not sending data",Xb:"SimplereachVideo",i:"event_name",kb:"Missing params please provide a ",
lb:" is not a valid start event type.",ec:"Cannot have an undefined start type. Please provide a start type.",hb:"Please pass a valid number",ib:"[error] Invalid quartile please send quartiles of only: 25, 50, 75 or 100",Rc:"[error] Quartile for this video already sent",jb:"Please pass a valid threshold number",sc:"video_id",rb:"length",description:"description",Uc:"thumbnail_url",Sc:"source_url",va:"networks",uc:"video",xc:"start",pc:"elapsed",nc:"complete",Ea:"quartile",Cc:"elapsedThreshold",tc:"init",
yc:"start",qc:"elapsed",Fa:"quartile",oc:"complete",Dc:"elapsed_threshold",zc:"start_type",Ac:"auto",Bc:"click",vc:"seconds_elapsed",wc:"threshold"},f={Kb:function(){return Math.random().toString(36).replace(/[^a-z]+/g,"")},returnValue:function(a){return a},S:function(a){return Array.isArray?Array.isArray(a):"[object Array]"===Object.prototype.toString.call(a)},log:function(a){window.console&&console.log(a)},nb:function(a){return"[object String]"===Object.prototype.toString.call(a)},I:function(a){var b=
{},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},ua:function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a},contains:function(a,b){return-1!==(a.join(",")+",").indexOf(b+",")},Qa:function(a,b){if(!isNaN(b)&&!this.nb(b))for(var c=0;c<=a.length;c++)if(a[c]===b)return!0;return!1},P:function(a){typeof a===b.Z&&(a=a.split(","));if(this.S(a)){for(var d=0;d<a.length;d+=1)typeof a[d]===b.Z&&(a[d]=a[d].replace(/^\s*/,"").replace(/\s*$/,"").replace(/\|/,""));return a.join("|")}},w:function(){},
ma:function(){return window.location.protocol+"//"},V:[25,50,75,100],Ec:[3,15,30,45]},t={encode:function(a,b){var c=[];if(f.S(a))for(var d=0,h;d<a.length;d+=1)h=a[d],/\[\]$/.test(b)?c.push(encodeURIComponent(b)+"="+encodeURIComponent(h)):c.push(this.encode(h,b+"["+("object"===typeof h?d:"")+"]"));else if("object"!==typeof a||null===a||"nodeType"in a)c.push(encodeURIComponent(b)+"="+encodeURIComponent(a));else for(d in a)Object.prototype.hasOwnProperty.call(a,d)&&(b?c.push(this.encode(a[d],b+"["+d+
"]")):c.push(this.encode(a[d],d)));return c.join("&")},decode:function(a){var d={},c=0,n={"true":!0,"false":!1,"null":null};for(a=a.replace(/\+/g," ").split("&");c<a.length;c+=1){var h=a[c].split("="),e=decodeURIComponent(h[0]),g=d,l=0,m=e.split("]["),k=m.length-1;/\[/.test(m[0])&&/\]$/.test(m[k])?(m[k]=m[k].replace(/\]$/,""),m=m.shift().split("[").concat(m),k=m.length-1):k=0;if(2===h.length)if(h=(h=decodeURIComponent(h[1]))&&!isNaN(h)?+h:h===b.aa?void 0:void 0!==n[h]?n[h]:h,k)for(;l<=k;l+=1)e=""===
m[l]?g.length:m[l],g=g[e]=l<k?g[e]||(m[l+1]&&isNaN(m[l+1])?{}:[]):h;else f.S(d[e])?d[e].push(h):d[e]=void 0!==d[e]?[d[e],h]:h;else e&&(d[e]=void 0)}return d}},u={wa:{},oa:function(a){var b=document.cookie||"",c=this.wa[a];c||(c=a.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1"),c=new RegExp("(?:^|;)\\s?"+c+"=(.*?)(?:;|$)","i"),this.wa[a]=c);return(a=b.match(c))&&decodeURIComponent(a[1])},X:function(a,b,c){var d="";c&&(d="; expires="+c.toGMTString());document.cookie=a+"="+b+d+"; path=/"},Gc:function(a){this.X(a,
"",new Date(1982,5,13))}},q={current:{}},g={la:!1,info:f.w,error:f.log,a:function(){window[b.D]&&(this.la=!0,window[b.D][b.info]&&(this[b.info]=window[b.D][b.info]),window[b.D][b.error]&&(this[b.error]=window[b.D][b.error]))},reset:function(){this.la=!1;this[b.info]=f.w;this[b.info]=f.log},Ub:function(a){var d=document.createElement(b.eb);d.src=f.ma()+b.h+b.Ma+a.message;d.setAttribute(b.width,b.Ab);document.body?document.body.appendChild(d):document.head.appendChild(d)},Vb:function(a){a===b.info?
(this[b.info]=f.log,this[b.error]=f.log):a===b.error?(this[b.info]=f.w,this[b.error]=f.log):(this[b.info]=f.w,this[b.error]=f.w)}},e={J:0,u:{x:0,y:0},R:!0,a:function(){function a(){e.R=document[h]?!1:!0}function b(){e.flush();window.removeEventListener("DOMContentLoaded",b,!1)}function c(){/loaded|interactive|complete/.test(document.readyState)&&(document.detachEvent("onreadystatechange",c),g&&(g=!1,e.flush()))}var e=this;e.J=0;this.yb(window,"mousemove",function(a){e.u={x:a.clientX,y:a.clientY}});
if("undefined"!==typeof document.hidden){var h="hidden";var f="visibilitychange"}else"undefined"!==typeof document.mozHidden?(h="mozHidden",f="mozvisibilitychange"):"undefined"!==typeof document.msHidden?(h="msHidden",f="msvisibilitychange"):"undefined"!==typeof document.webkitHidden&&(h="webkitHidden",f="webkitvisibilitychange");"undefined"!==typeof document.addEventListener&&"undefined"!==typeof h&&document.addEventListener(f,a,!1);var g=!0;window.addEventListener?window.addEventListener("DOMContentLoaded",
b,!1):document.attachEvent&&document.attachEvent("onreadystatechange",c)},Ga:function(a,b){var c=document.createElement("iframe"),d=document.body;c.setAttribute("name","spr");c.src=a;c.setAttribute("height","1");c.setAttribute("width","1");c.setAttribute("visible","false");c.setAttribute("id","spr-iframe-"+b);c.style.display="none";d||(d=this.b("BODY")[0]);d||(d=this.b("HEAD")[0]);g.info(a);d.appendChild(c);return c},Ua:function(){for(var a=this.b("meta"),b=0;b<a.length;b+=1)if("og:url"===a[b].getAttribute("property"))return a[b].content;
return!1},Ta:function(){for(var a=this.b("link"),b=0;b<a.length;b+=1)if("canonical"===a[b].rel)return a[b].href;return!1},Va:function(){for(var a=this.b("meta"),b=0;b<a.length;b+=1)if("twitter:url"===a[b].getAttribute("name"))return a[b].content;return!1},Wa:function(){return window.location.protocol+"//"+window.location.hostname+window.location.pathname},ia:function(){return this.Ta()||this.Ua()||this.Va()||this.Wa()},na:function(){return document.referrer},ha:function(a){for(var b=this.b("meta"),
c=0;c<b.length;c+=1)if("og:title"===b[c].getAttribute("property")||"twitter:title"===b[c].getAttribute("name"))return b[c].content;return document.title||a||!1},Hb:function(a){var b=document.body,c=this.b("BODY")[0],e=this.b("HEAD")[0];b&&b.contains(a)?b.removeChild(a):c&&c.contains(a)?c.removeChild(a):e&&e.contains(a)&&e.removeChild(a);return a},Ha:function(a){var b=this,c=document.createElement("script");c.type="text/javascript";c.setAttribute("async",!0);c.setAttribute("name","spr");c.setAttribute("id",
"spr-script");c.src=a;g.info(a);this.T(function(){setTimeout(function(){b.b("HEAD")[0].appendChild(c)},1)});return c},j:[],ready:/loaded|interactive|complete/.test(document.readyState),flush:function(){var a=this.j.shift();for(this.ready=!0;a;)a(),a=this.j.shift()},T:function(a){/loaded|interactive|complete/.test(document.readyState)?(this.j.push(a),this.flush()):document.documentElement.doScroll?window.self===window.top?function c(){if(!document.uniqueID&&document.expando)return this.j.push(a);try{document.documentElement.doScroll("left"),
a()}catch(n){setTimeout(c,0)}}():this.j.push(a):this.j.push(a)},yb:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c);return a},xb:function(a,b,c){a.addEventListener?a.removeEventListener(b,c,!1):a.detachEvent("on"+b,c);return a},H:function(){return(window.pageYOffset?window.pageYOffset:document.documentElement?document.documentElement.scrollTop:0)-this.J},b:function(a){var b=[],c=0,e;if(!a)return[];if("string"!==typeof a)return[a];switch(a.charAt(0)){case "#":b.push(document.getElementById(a.substring(1)));
break;case ".":var f=document.getElementsByTagName("*");for(e=" "+a.substring(1)+" ";c<f.length;c+=1)a=(" "+f[c].className+" ").replace(/[\n\t\r]/g," "),-1<a.indexOf(e)&&b.push(f[c]);break;default:b=document.getElementsByTagName(a)}return b}},v={ba:function(a){var d;var c=f.I(a);c[b.K]&&(c[b.K]=f.P(c[b.K]));c[b.N]&&(c[b.N]=f.P(c[b.N]));c[b.$]&&(c[b.$]=f.P(c[b.$]));c[b.v]&&typeof c[b.v]!==b.Z&&(c[b.v]=c[b.v].toString());c[b.referrer]=""==c[b.l]?"":this.W(c[b.referrer]);c[b.l]=this.W(c[b.l]);c[b.U]=
c[b.U]||window.location.toString();c[b.uid]?c[b.uid]=c[b.uid]:(d=this.cb())&&(c[b.uid]=d);c[b.url]&&(c[b.url]=this.Lb(c[b.url]),a[b.url]=c[b.url]);return c},W:function(a){""!==a&&(a=a||e.na());return a},cb:function(){return u.oa(b.Da)},Lb:function(a){if(0===a.indexOf("http%253A")||0===a.indexOf("https%253A"))a=decodeURIComponent(a);if(0===a.indexOf("http%3")||0===a.indexOf("https%3"))a=decodeURIComponent(a);return a}},p={callbacks:{},M:"SPR",Sb:function(a){this.M=a},f:function(a,d,c,g,h){g=g||function(){};
h||(h="cb");var k="cb"+f.Kb(),n=this;c[h]=this.M+".API.callbacks."+k;h=f.ma();"file://"===h&&(h="http://");c[b.fc]=b.version;c=t.encode(c);var l=e.Ha(h+a+d+"?"+c);n.callbacks[k]=function(a){setTimeout(function(){l.parentNode&&l.parentNode.removeChild(l)},0);g(a);try{delete n.callbacks[k]}catch(D){n.callbacks[k]=null}}}},w={Oc:!1,Ic:!0,o:0,Ba:5E3,dc:12E5,interval:null,reset:function(){e.J=e.H();window.clearInterval(this.interval)},track:function(a){var d=this,c;d.interval=setInterval(function(){e.R&&
(d.o+=d.Ba);d.Ca()&&(d.o=0);c=f.I(a);c[b.t]=d.o;c[b.e]=d.mb()?5E3:0;c[b.ya]=e.H();0===c[b.c]&&(c[b.c]=b.Aa);e.R&&!d.Ca()&&d.hc(c)&&0<c[b.e]&&(d.o=0,p.f(b.h,b.cc,c));d.pb=e.u.x;d.qb=e.u.y;d.ob=e.H()},d.Ba)},mb:function(){return!0!==this.Za?this.Za=!0:this.pb!==e.u.x||this.qb!==e.u.y||this.ob!==e.H()?!0:!1},Ca:function(){return this.o>=this.dc},hc:function(a){return a[b.url]&&a[b.c]}},k=f.V,y={F:[],data:{},response:null,options:null,Tc:!1,a:function(a,d){this.reset();this.options=d;this.response=a;
var c=this;e.T(function(){c.height=c.$a();c.C||(c.C=function(){c.ca()});q.current[b.vb]?c.Ib():c.Ia()})},Ia:function(){typeof document.addEventListener!==b.aa?document.addEventListener("scroll",this.C,!1):window.attachEvent("onscroll",this.C);this.ca()},Ib:function(){typeof document.removeEventListener!==b.aa?document.removeEventListener("scroll",this.C,!1):window.detachEvent("onscroll",this.C)},ca:function(){var a=this.bb()+Math.min(document.documentElement.clientHeight,window.innerHeight||0),b=
0;a>=this.height?b=k[3]:b=a/this.height*100;97<=b?this.B(k[3]):b>=k[2]?this.B(k[2]):b>=k[1]?this.B(k[1]):b>=k[0]&&this.B(k[0])},$a:function(){if(q.current[b.ga])var a=q.current[b.ga];else{a=document.body;var d=document.documentElement;a=Math.max(a.scrollHeight,a.offsetHeight,d.clientHeight,d.scrollHeight,d.offsetHeight)}return a},bb:function(){var a="CSS1Compat"===(document.compatMode||"");return void 0!==window.pageYOffset?window.pageYOffset:a?document.documentElement.scrollTop:document.body.scrollTop},
B:function(a){this.data={};if(!f.contains(k,a))g[b.error](b.sa);else if(!f.contains(this.F,a))if(this.Tb(a),this.response[b.Ra])this.Rb();else g[b.info](b.Mb)},Tb:function(a){var d;for(d=0;d<k.length;d+=1){var c=k[d];a>=c&&!f.contains(this.F,c)&&(this.F.push(c),this.data[c]=!0,g[b.info](b.za+c))}},A:function(){return f.ua({event:"csd",sd:this.data},this.options)},Rb:function(){if(!this.response.error){var a=this.A();p.f(b.h,b.ka,a)}},reset:function(){this.F=[]}},A={va:[{name:b.Bb,Ka:b.Cb,La:b.Db,
L:b.L}],Jb:function(a,b){return{url:b}},$b:function(a,d){return function(c){c={event:b.ya,url:a.url,cid:a.id,pid:a.pid,sn:a.name,data:c};f.ua(c,d);p.f(b.h,b.ka,c)}},s:function(a,b){for(var c=this.va,d,e=0;e<c.length;e+=1){d=c[e];var g=f.I(a);g.name=d.name;a[d.name]&&p.f(d.Ka,d.La,this.Jb(d.name,g.url),this.$b(g,b),d.L)}}},B={track:function(a){var d=this;0===a[b.c]&&(a[b.c]=b.Aa);p.f(b.h,b.fb,a,function(c){y.a(c,a);if(c.error)g[b.error](b.Y+c.error.code+" - "+c.error.message);else c.uid&&d.Wb(c.uid),
!1!==a[b.Zb]&&A.s(c,a)})},Wb:function(a){u.X(b.Da,a,new Date(2042,5,13))}},x={Hc:{},O:{},da:!1,a:function(){try{e.a();var a=window[b.Fb];u.oa(b.xa)?this.ta=!0:this.ta=!1;u.X(b.xa,b.zb,new Date(2042,5,13));this.s(a)}catch(d){e.T(function(){g.Ub(d)})}},s:function(a){if(a){var d;q.current=a;this.O=f.I(q.current);this.O[b.r]=this.ta;(d=this.O[b.Ja]&&this.da)||(a[b.url]=a[b.url]||e.ia());if(a[b.url])g.a(a[b.qa]),d&&(a.hasOwnProperty(b.ra)||(a[b.ra]=!0),a[b.U]=a[b.l]=a[b.referrer]=a.url),a[b.title]||(a[b.title]=
e.ha(a[b.url])),w.reset(),d=v.ba(a),d[b.Eb]||(!1!==a[b.Gb]&&(B.track(d),w.track(d)),!1!==a[b.Sa]&&this.Xa(d)),this.da=!0;else g[b.error](b.Y+b.ja)}else g[b.error]("Params not passed to collect")},Xa:function(a){a[b.referrer]=a[b.referrer]||e.na();a[b.l]=v.W(a[b.l]);a[b.Na]=(new Date).getTime();a=t.encode(a);this.fa&&e.Hb(this.fa);this.fa=e.Ga(b.Yb+b.Oa+b.Pa+"?"+a,b.x)}},r=[b.c,b.sc,b.rb,b.v],C={create:function(a,b){return new z(a,b)},a:function(a,b){return this.create(a,b).a()}};return{Reach:{collect:function(a){x.s(a)}},
QS:{decode:t.decode},debug:g,setLogLevel:function(a){g.Vb(a)},API:p,collect:function(a){x.s(a)},decode:t.decode,init:function(){x.a()},iframeCollect:function(){},stop:function(){w.reset()},scrollDepthReached:function(a){y.B(a)},video:function(a){return C.a(a,p.M)}}}();window.SPR.init();