!function(a){var b=function(b){for(var c=b.split("."),d=a;c.length>0;){var e=c.pop();if(void 0===d[e]&&(d[e]={}),"object"!=typeof d[e])return null;d=d[e]}return d};if(b("media_line_me")&&b("media.line.naver.jp")){var c={bind:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},getThisScriptElement:function(){var a=document.getElementsByTagName("script");return a[a.length-1]},each:function(a,b){for(var c=0,d=a.length;c<d;c++){if(!1===b(c,a[c],a))return}},attr:function(a,b){for(var c in b)a.setAttribute(c,b[c])},map:function(a,b){var d=[];return c.each(a,function(a,c,e){d.push(b(a,c,e))}),d},filter:function(a,b){var d=[];return c.each(a,function(a,c,e){b(a,c,e)&&d.push(c)}),d},ready:function(a){c.bind(window,"load",a)},isSmartphone:function(){return navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/i)},getScript:function(a,b,c){var d=document.createElement("script");d.type="text/javascript",d.charset="utf-8",d.src=a,d.onload=function(){c()},b.appendChild(d)}},d={constant:{LINE_BASE_URL:"//line.me/R/msg/text/",IMG_BASE_URL:"//media.line.me/img/button/",ALT:{ja:"LINEで送る",en:"LINE it!","zh-hans":"LINE it!","zh-hant":"LINE it!"},IMG_SIZE:{ja:{a:[82,20],b:[20,20],c:[30,30],d:[40,40],e:[36,60]},en:{a:[78,20],b:[20,20],c:[30,30],d:[40,40],e:[36,60]},"zh-hans":{a:[84,20],b:[20,20],c:[30,30],d:[40,40],e:[36,60]},"zh-hant":{a:[84,20],b:[20,20],c:[30,30],d:[40,40],e:[36,60]}}},insertButton:function(a,b,d){var e=this,f=e.validate(a);if(f.pc||c.isSmartphone()){var g=d.parentNode===b?d:void 0;try{b.insertBefore(e.createButton(f),g),c.getScript("https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js",b,function(){LineIt.loadButton()})}catch(a){"th"!=f.lang&&"id"!=f.lang||(f.lang="en"),b.insertBefore(e.createTag(f),g);var h=null;try{h=JSON.stringify(a)}catch(a){}try{var i=new XMLHttpRequest;i.open("POST","https://nelo2-col.linecorp.com/_store"),i.setRequestHeader("Content-type","application/json"),i.responseType="json",i.send(JSON.stringify({projectName:"LINE-WEB-CDN-LINE_SOCIAL_PLUGIN-release",projectVersion:"1.3.2",body:"legacy button tracking",host:window.location.host,url:window.location.href,logSource:"http",logType:"LEGACY-BUTTON",error:h}))}catch(a){}}}},validate:function(a){var b={lang:/^(ja|en|zh-han[st]|th|id)$/,type:/^(a|b|c|d|e)$/,text:/^[\s\S]+$/},c={lang:"ja",type:"a",text:null};if(!a)return c;for(var d in c)a[d]&&"string"==typeof a[d]&&a[d].match(b[d])&&(c[d]=a[d]);return c.withUrl=!!a.withUrl,c.pc=!!a.pc,c},createTag:function(a){var b=this,d=b.constant.IMG_SIZE[a.lang][a.type],e=document.createElement("a");c.attr(e,{href:b.createUrl(a)});var f=document.createElement("img");return c.attr(f,{src:b.createImageUrl(a),width:d[0],height:d[1],alt:b.constant.ALT[a.lang]}),e.appendChild(f),e},createButton:function(a){var b=document.createElement("div");return b.className="line-it-button",b.style.display="none",b.setAttribute("data-lang",a.lang),b.setAttribute("data-type","share-"+a.type),b},createUrl:function(a){var b=this,c=b.text(a);return[b.constant.LINE_BASE_URL,encodeURIComponent(c).replace(/\+/g,"%20")].join("?")},text:function(a){var b;return a.text?(b=[a.text],a.withUrl&&b.push(document.location.href)):b=[document.title,document.location.href],b.join("\n")},createImageUrl:function(a){var b=this,c=b.constant,d=c.IMG_SIZE[a.lang][a.type];return[c.IMG_BASE_URL,a.lang,"/",d[0],"x",d[1],".png"].join("")}};a.media_line_me.LineButton=a.jp.naver.line.media.LineButton=function(a){var b=c.getThisScriptElement(),e=b.parentNode;"head"!==e.tagName.toLowerCase()&&c.ready(function(){d.insertButton(a,e,b)})}}}(this);