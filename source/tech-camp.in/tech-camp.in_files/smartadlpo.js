/*
 adlpo.js version 2.3.1
 Copyright Data Artist Inc. All Rights Reserved.
 Released on Dec. 8 2016
 code UTF-8
 LastModified 2017-06-07 11:31:53
*/
function adlpoMain(a){for(var b=[],c=0;c<arguments.length;c++)b[c]="arguments["+c+"]";eval("adlpoSetup._in("+b.join(",")+");")}function _adlpoocA(){for(var a in ADLPOs)ADLPOs[a].finalize()}function _adlpooctbi(a){ADLPOs[a].activate();ADLPOs[a].isActivated()||(_adlpooe.disable(),ADLPOs[a].finalize())}function _adlpogrdurl(){return 0<adlpoClkUrl1.length?0<adlpoCp.length?adlpoClkUrl1+"&"+adlpoCp+"="+encodeURIComponent(adlpoDefUrl):adlpoClkUrl1+encodeURIComponent(adlpoDefUrl):adlpoDefUrl}
function _adlpogurlp(){var a=[],b;if(b=location.search){b=b.replace("?","").split("&");for(var c=0;c<b.length;c++){var d=b[c].split("=");a[d[0]]=d[1]}}else return!1;return a}function _adlpoake(a,b){return!b||b.constructor!==Array&&b.constructor!==Object?!1:a in b}function _adlpowrite(a){adlpodoc.write(a)}
function optout(){try{"undefined"!=typeof localStorage&&(adlpoCookie=adlpoLocalStorage,adlpoCookie._in(_adlpockna),adlpoCookie.isEnable()&&(adlpoCookie.clear(),adlpoCookie.setCookie(_adlpotoof,1,_adlpouiet)))}catch(a){}}
if("undefined"==typeof _adlpotgcn){var adlpoCookie={name:null,domain:null,cookies:[],_in:function(a,b){this.name=a;var c="",d=/([^.]+\.([^.]{2,3}\.[^.]{2,3}|[^.]+))$/.exec(b);null!=d&&(c="."+d[1]);this.domain=""==b?"":"; domain="+c;this.loadCookies()},isEnable:function(){this.setCookie(_adlpoocce,"true",60);this.loadCookies();return"true"==this.getCookie(_adlpoocce)},setCookie:function(a,b,c){"undefined"!=typeof a&&"undefined"!=typeof b&&"undefined"!=typeof c&&(this.cookies[a]={name:a,value:escape(b),
expireOn:Math.ceil(c+(new Date).getTime()/1E3)},this.saveCookies())},getCookie:function(a){a=this.cookies[a];return"undefined"==typeof a||null==a?null:unescape(a.value)},getExtraCookie:function(a){var b=null;(new RegExp("(?:^|\\s|;)"+a+"=(.*?)(?:;|$)")).test(adlpodoc.cookie)&&(b=RegExp.$1);return b},deleteCookie:function(a){var b={};for(i in this.cookies)i!=a&&(b[i]=this.cookies[i]);this.cookies=b;this.saveCookies()},loadCookies:function(){this.cookies={};var a=adlpodoc.cookie.indexOf(this.name+"=");
if(-1!=a){var b=adlpodoc.cookie.indexOf(";",a);-1==b&&(b=adlpodoc.cookie.indexOf(",",a),-1==b&&(b=adlpodoc.cookie.length));a=adlpodoc.cookie.substring(a+this.name.length+1,b).split("|");b=Math.ceil((new Date).getTime()/1E3);for(i in a){var c=Number(i);isNaN(c)||(c=a[c].split("#"),b<=c[2]&&(this.cookies[c[0]]={name:c[0],value:c[1],expireOn:c[2]}))}}},saveCookies:function(){var a=[],b=0;for(i in this.cookies)null!=this.cookies[i]&&(a[a.length]=this.cookies[i].name+"#"+this.cookies[i].value+"#"+this.cookies[i].expireOn,
b<this.cookies[i].expireOn&&(b=this.cookies[i].expireOn));b=new Date(1E3*b);adlpodoc.cookie=this.name+"="+a.join("|")+"; expires="+b.toGMTString()+"; path=/"+this.domain}},adlpoLocalStorage={name:null,domain:null,cookies:[],_in:function(a){this.name=a;this.loadCookies()},isEnable:function(){this.setCookie(_adlpoocce,"true",60);this.loadCookies();return"true"==this.getCookie(_adlpoocce)&&"1"!==this.getCookie(_adlpotoof)?!0:!1},setCookie:function(a,b,c){"undefined"!=typeof a&&"undefined"!=typeof b&&
"undefined"!=typeof c&&(this.cookies[a]={name:a,value:escape(b),expireOn:Math.ceil(c+(new Date).getTime()/1E3)},this.saveCookies())},getCookie:function(a){a=this.cookies[a];return"undefined"==typeof a||null==a?null:unescape(a.value)},getExtraCookie:function(a){return localStorage.getItem(a)},deleteCookie:function(a){var b={};for(i in this.cookies)i!=a&&(b[i]=this.cookies[i]);this.cookies=b;this.saveCookies()},loadCookies:function(){this.cookies={};var a=localStorage.getItem(this.name);if(null!=a){var a=
a.split("|"),b=Math.ceil((new Date).getTime()/1E3);for(i in a){var c=Number(i);isNaN(c)||(c=a[c].split("#"),b<=c[2]&&(this.cookies[c[0]]={name:c[0],value:c[1],expireOn:c[2]}))}}},saveCookies:function(){var a=[];for(i in this.cookies)null!=this.cookies[i]&&(a[a.length]=this.cookies[i].name+"#"+this.cookies[i].value+"#"+this.cookies[i].expireOn);localStorage.setItem(this.name,a.join("|"))},clear:function(){localStorage.clear()}},adlpoPc={cookieName:null,expireTime:null,id:null,_in:function(a,b,c){this.cookieName=
b;this.expireTime=c;this.id=adlpoCookie.getCookie(b);if(null==this.id||0==this.id.length)this.id=a;adlpoCookie.setCookie(this.cookieName,this.id,this.expireTime)},getId:function(){adlpoCookie.setCookie(_adlpopcid,this.id,this.expireTime);return this.id},forceId:function(a){return this.id!=a?(this.id=a,adlpoCookie.setCookie(this.cookieName,this.id,this.expireTime),!0):!1}},adlpoPlatform={ie:null,mac:null,supported:null,_in:function(){this.ie=-1!=window.navigator.appVersion.indexOf("MSIE");this.mac=
-1!=window.navigator.appVersion.indexOf("Mac");var a=-1!=window.navigator.userAgent.indexOf("Opera"),b=-1!=window.navigator.userAgent.indexOf("Konqueror"),c=this.ie&&-1!=window.navigator.appVersion.indexOf("MSIE 4."),d="Netscape"==navigator.appName&&4==parseInt(navigator.appVersion);a&&(a=!a);this.supported=!(d||c||a||b)},isSupported:function(){return this.supported},isLocalStorageSupported:function(){-1!=window.navigator.userAgent.indexOf("Firefox")&&(this.supported=null);return this.supported},
supportsReplace:function(){return!(this.ie&&this.mac)}},adlpoSafeOnload={temp:[],orderFirst:null,orderMiddle:null,orderLast:null,el:null,actionStarted:!1,ev:null,_in:function(a){this.orderFirst=0;this.orderMiddle=500;this.orderLast=1E3;this.el=a;"undefined"==typeof _Functions&&(_Functions=[]);a=_Functions.length;_Functions[a]=this;this.ev=new Function("event","_Functions["+a+"].action(event);");this.setup()},add:function(a){this.sortedAdd(a,this.orderMiddle)},sortedAdd:function(a,b){var c=[];c.order=
b;c.action=a;this.temp[this.temp.length]=c},setup:function(){this.el.onload!=this.ev&&(this.el.onload&&this.add(this.el.onload),this.el.onload=this.ev)},action:function(a){if(1!=this.actionStarted){this.actionStarted=!0;this.temp.sort(this.orderSort);for(var b=0;b<this.temp.length;b++)this.temp[b].action.apply(this.el,arguments);this.el.onload=this.ev}},orderSort:function(a,b){return a.order-b.order}},adlpoOe={platform:null,safe:null,status:!0,_in:function(a){this.platform=adlpoPlatform;this.platform._in();
this.status=this.platform.isSupported();null!=adlpoUser.getPageParameter(a)&&(this.status=!1);if(!adlpoCookie.isEnable())try{"undefined"!==typeof localStorage&&this.platform.isLocalStorageSupported()?(adlpoCookie=adlpoLocalStorage,adlpoCookie._in(_adlpockna),adlpoCookie.isEnable()?(_adlpoopid=adlpoPc,_adlpoopid._in(adlpoUser._ogi(),_adlpopcid,_adlpouiet)):this.status=!1):this.status=!1}catch(b){this.status=!1}"true"==adlpoCookie.getCookie(_adlpoodc)&&(this.status=!1);this.isAdmin()&&this.enable()},
isEnabled:function(){return this.status},getAdlpoSafeOnload:function(){null==this.safe&&(this.safe=adlpoSafeOnload,this.safe._in(window));return this.safe},disable:function(a){"undefined"==typeof a&&(a=600);this.isAdmin()||(this.status=!1,adlpoCookie.setCookie(_adlpoodc,"true",a))},enable:function(){this.status=!0;adlpoCookie.deleteCookie(_adlpoodc)},isAdmin:function(){return-1!=adlpodoc.location.href.indexOf(_adlpooea)},limitTraffic:function(a,b){if("undefined"!=typeof a){var c=adlpoCookie.getCookie(_adlpootsc);
if(this.isAdmin())c=!0,adlpoCookie.setCookie(_adlpootlc,a,b),adlpoCookie.setCookie(_adlpootsc,c,b);else if(null==c||adlpoCookie.getCookie(_adlpootlc)!=a)c=100*Math.random()<=a,adlpoCookie.setCookie(_adlpootlc,a,b),adlpoCookie.setCookie(_adlpootsc,c,b);c?this.enable():this.disable()}}},adlpoSetup={_in:function(a){if(adlpoPlatform.isSupported()){_adlpooe.safe.setup();for(var b=[],c=!1,d=!1,k="",m=1;m<arguments.length;m++)"pr=at"==arguments[m]&&(c=!0),"pr=ux"==arguments[m]&&(d=!0),arguments[m].match(/^img=([0-9a-zA-Z_-]+)$/)&&
(k=RegExp.$1),b[m]=arguments[m];1==c?(d=0==a.length?_adlpopgdt:a,c=d+_adlpotgcn,d=_adlpopage+"="+d):1==d?(d=a,c=d+_adlpotgcn,d=_adlpofnct+"="+d):(d=a,c=d+_adlpotgcn,d=_adlpoarea+"="+d);b[0]=d;d=new ADLPOORB;d._in(c,b);0<k.length&&d.setInsertId(k);!1!==d.url&&d.put();_adlpotgcn++}},defaultDisplayNone:function(){_adlpowrite("<style>."+_adlpodflt+" { visibility:hidden; }</style>")}},adlpoUser={_ogi:function(){return(new Date).getTime()+"-"+Math.floor(999999*Math.random())+"-"+Math.floor(999999*Math.random())},
getPageParameter:function(a){var b=null;a=(new RegExp(a+"=([^&]*)")).exec(document.location);null!=a&&2<=a.length&&(b=a[1]);return b}},adlpodoc=document,_adlpotgcn=1,_adlpoatid=492,_adlposurl="http://t.adlpo.com/script/c.js",_adlpoot=5E3;if("undefined"==typeof _adlpouiet)var _adlpouiet=7776E3;"undefined"==typeof _adlpoot&&(_adlpoot=5E3);if("undefined"==typeof _adlpootlp)var _adlpootlp;if("undefined"==typeof _adlpootd)var _adlpootd=7776E3;if("undefined"==typeof _adlpockdm){var _adlpockdm="",_adlpodre=
/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;_adlpodre.exec(adlpodoc.location.host)||(_adlpockdm=adlpodoc.location.hostname)}if("undefined"==typeof _adlpodidv)var _adlpodidv=Math.floor(99999999*Math.random());var _adlpopcid="PC",_adlpockna="adlpo",_adlpoocce="check",_adlpomdnm="md",_adlpomdvl="cdl",_adlpomdvc="tcv",_adlpomdvt="tat",_adlpomdvp="cpv",_adlpomdvx="xud",_adlpomdga="sga",_adlpomdgi="ggi",_adlpoacnt="aci",_adlpouqid="ud",_adlpopqid="pud",_adlpohost="hs",_adlpourl="ul",_adlporefr="rf",
_adlpoarea="ar",_adlpochar="ch",_adlpopage="tp",_adlpofnct="fn",_adlpoarct="ct",_adlpousag="ua",_adlpopltf="pf",_adlporqtm="rt",_adlporqsc="rs",_adlporqcl="cs",_adlpordu1="r1",_adlpoapu1="a1",_adlpordit="ri",_adlpochnp="cp",_adlpodidn="dy",_adlporsct="rct",_adlpotoof="too",_adlpoarcnt=0,ADLPOs={},_adlpoimpt="ADLPOImported-",_adlpomakr="ADLPOMarker-",_adlpodflt="ADLPODefault",_adlpopgdt="DefaultPageID",_adlpoodc="disable",_adlpootlc="level",_adlpootsc="traffic",_adlpooea="envId";adlpoCookie._in(_adlpockna,
_adlpockdm);var _adlpoopid=adlpoPc;_adlpoopid._in(adlpoUser._ogi(),_adlpopcid,_adlpouiet);var _adlpooe=adlpoOe;_adlpooe._in("ADLPOORBDisable");_adlpooe.platform.isSupported()&&(null==_adlpooe.safe&&_adlpooe.getAdlpoSafeOnload(),_adlpooe.safe.add(_adlpoocA),_adlpooe.limitTraffic(_adlpootlp,_adlpootd),_adlpooe.isEnabled()&&adlpoSetup.defaultDisplayNone());var adlpoOfferContent={show:function(a){if(a.importDiv())for(var b=a.importDiv(),c=document.cookie.split("; "),d=0;d<c.length;d++){var k=c[d].split("=");
if("adlpo"==k[0]){escape(k[1]);break}}else b=a.importDiv();return a.showContent(b)}}}function ADLPOORB(){}
ADLPOORB.prototype={id:null,url:null,timeout:null,activated:0,defaultDiv:null,offer:null,time:[],activateCount:0,error:null,insert_id:new String,allowTimeout:!0,_in:function(a,b){b[b.length]=_adlpoarct+"="+ ++_adlpoarcnt;this.id=a;this.url=this.buildUrl(b);this.offer=adlpoOfferContent;ADLPOs[a]&&(this.put=this.putNothing,this.activateAction=this.hide);ADLPOs[a]=this},setInsertId:function(a){this.insert_id=a},put:function(){if(_adlpooe.isEnabled())if(0<this.insert_id.length){var a='<img src="'+this.url+
'" width="1" height="1">';adlpodoc.getElementById(this.insert_id).innerHTML=a}else this.putMarker(),this.allowTimeout&&ADLPOs[this.id].startTimeout(_adlpoot),_adlpowrite('<script type="text/javascript" src="'+this.url+'">\x3c/script>');else this.insert_id?this.putMarker():_adlpowrite('<div id="'+this.markerName()+'"></div>')},putNothing:function(){_adlpowrite('<div id="'+this.markerName()+'"></div>')},putMarker:function(){_adlpowrite('<div id="'+this.markerName()+'" style="visibility:hidden;display:none"></div>')},
hide:function(){var a=adlpodoc.getElementById(this.markerName());null!=a&&(a.style.visibility="hidden",a.style.display="none");a=this.getDefaultDiv();return null!=a?(a.style.visibility="visible",a.style.display="",1):0},show:function(){return this.offer.show(this)},activateAction:function(){return this.show()},showContent:function(a){if(null==a)return 0;var b=this.getDefaultDiv();if(_adlpooe.platform.supportsReplace())if(null!=b)b.parentNode.replaceChild(a,b);else{var c=adlpodoc.getElementById(this.markerName());
if(null==c)return 0;this.visible(c)}else{c=adlpodoc.getElementById(this.markerName());if(null==c)return 0;null!=b&&this.invisible(b);this.visible(c)}this.visible(a);return 1},invisible:function(a){a.style.visibility="hidden";a.style.display="none"},visible:function(a){a.style.visibility="visible";a.style.display=""},startTimeout:function(a){this.timeout=window.setTimeout('_adlpooctbi("'+this.id+'")',a)},cancelTimeout:function(){null!=this.timeout&&(window.clearTimeout(this.timeout),this.timeout=null)},
getDefaultDiv:function(){if(null!=this.defaultDiv)return this.defaultDiv;for(var a=adlpodoc.getElementById(this.markerName());null!=a;){if(1==a.nodeType&&"DIV"==a.nodeName)if(0<a.className.indexOf(_adlpomakr))break;else if(a.className==_adlpodflt)return this.defaultDiv=a;a=a.previousSibling}return null},activate:function(){if(this.activated)return this.activated;this.activateAction()&&(this.cancelTimeout(),this.activated=1);return this.activated},isActivated:function(){return this.activated},markerName:function(){return _adlpomakr+
this.id},importName:function(){return _adlpoimpt+this.id},importDiv:function(){return adlpodoc.getElementById(this.importName())},finalize:function(){this.cancelTimeout();this.activate()||this.hide()},parameters:function(){var a=this.url,b=a.indexOf("?");if(-1==b||b==a.length-1)return[];for(var a=a.substring(b+1).split("&"),b=[],c=0;c<a.length;c++){var d=a[c].split("=");2>d.length||""==d[0]||""==d[1]||(b[d[0]]=d[1])}return b},setActivateAction:function(a){this.activateAction=a},setOffer:function(a){this.offer=
a},getAttribute:function(){return""+("&"+_adlpousag+"="+escape(navigator.userAgent))},encode:function(a){this.encodeCheck(a)||(a=encodeURIComponent(a));return a},encodeCheck:function(a){for(var b=1;b<=a.length-1;b++){var c=a.charAt(b);if("?"==c||"="==c||"&"==c||"#"==c||":"==c||"/"==c)return!1}return!0},buildUrl:function(a){var b=_adlposurl,c=!1,d=!1,k=!1,m=!1,l=!1,f=!1,e=!1,n=!1,h=adlpodoc.URL;"https:"==adlpodoc.location.protocol&&(b=b.replace("http:","https:"));for(var b=b+("?"+_adlpoacnt+"="+_adlpoatid),
b=b+("&"+_adlpohost+"="+adlpodoc.location.hostname),g=0;g<a.length;g++){if("pr=cv"==a[g])c=!0;else if("pr=at"==a[g])d=!0;else if("pr=ux"==a[g])m=!0;else if("lc=ad"==a[g])l=!0;else if(a[g].match(/^img=([0-9a-zA-Z_-]+)$/))f=!0;else if("setga"==a[g]){e=!0;this.allowTimeout=!1;continue}else if("getguid"==a[g]){n=!0;this.allowTimeout=!1;continue}b+="&"+a[g]}-1<h.indexOf("ADLPOPreview")&&(k=!0);if(k){if(b+="&"+_adlpomdnm+"="+_adlpomdvp,d||c||m||e||n)return!1}else b=d?b+("&"+_adlpomdnm+"="+_adlpomdvt):c?
b+("&"+_adlpomdnm+"="+_adlpomdvc):m?b+("&"+_adlpomdnm+"="+_adlpomdvx):e?b+("&"+_adlpomdnm+"="+_adlpomdga):n?b+("&"+_adlpomdnm+"="+_adlpomdgi):b+("&"+_adlpomdnm+"="+_adlpomdvl);(c||d)&&f&&(b+="&"+_adlporsct+"=img");l&&(b+="&"+_adlpochar+"="+(document.charset?document.charset:document.characterSet?document.characterSet:"UTF-8"),0<adlpoClkUrl1.length&&(b+="&"+_adlpordu1+"="+this.encode(adlpoClkUrl1)),0<adlpoApiUrl1.length&&(b+="&"+_adlpoapu1+"="+this.encode(adlpoApiUrl1)),1==adlpoRedIntr&&(b+="&"+_adlpordit+
"=1"),0<adlpoCp.length&&(b+="&"+_adlpochnp+"="+adlpoCp),_adlpoake("pf",adlpoUrlParam)&&(b+="&"+_adlpopltf+"="+adlpoUrlParam.pf));b+=this.getAttribute();b+="&"+_adlpodidn+"="+_adlpodidv;(a=adlpoCookie.getExtraCookie("dauid"))&&(b+="&dauid="+encodeURIComponent(a));a=encodeURIComponent(adlpodoc.referrer);d=encodeURIComponent(adlpodoc.location);k=(new Date).getTime();if(c)try{var p=adlpoDmp.getRecommendIdList();if(0<p.length)for(var g=0,q=p.length;g<q;g++)b+="&reco["+p[g].cid+"]="+encodeURIComponent(p[g].id)}catch(r){}return b+
"&"+_adlpouqid+"="+_adlpoopid.getId()+"&"+_adlpopqid+"="+_adlpoopid.getId()+"&"+_adlpourl+"="+d+"&"+_adlporefr+"="+a+"&"+_adlporqtm+"="+k+"&"+_adlporqsc+"="+_adlporqcl}};var adlpoUrlParam=_adlpogurlp(),adlpoClkUrl1="",adlpoApiUrl1="",adlpoRedIntr="",adlpoCp="";_adlpoake("clkurl1",adlpoUrlParam)&&(adlpoClkUrl1=decodeURIComponent(adlpoUrlParam.clkurl1));_adlpoake("apiurl1",adlpoUrlParam)&&(adlpoApiUrl1=decodeURIComponent(adlpoUrlParam.apiurl1));_adlpoake("ri",adlpoUrlParam)&&(adlpoRedIntr=decodeURIComponent(adlpoUrlParam.ri));
_adlpoake("cp",adlpoUrlParam)&&(adlpoCp=decodeURIComponent(adlpoUrlParam.cp));
var adlpoDefUrl="",adlpoRedirectUrl=_adlpogrdurl(),adlpoDmp={putRecommendId:function(a,b){var c=this._removeCid(this._getIdList(),a);c.push({cid:a,id:b});5<c.length&&(c=c.slice(c.length-5));this._saveIdList(c)},removeRecommendId:function(){var a=this._removeCid(this._getIdList(),arguments);this._saveIdList(a)},getRecommendIdList:function(){return this._getIdList()},_getIdList:function(){var a=adlpoCookie.getCookie("recoId");return null===a||""===a?[]:a.split(",").map(function(a){a=a.split("\\");return{cid:a[0],
id:a[1]}})},_saveIdList:function(a){a=a.map(function(a){return a.cid+"\\"+a.id}).join(",");""===a?adlpoCookie.deleteCookie("recoId"):adlpoCookie.setCookie("recoId",a,_adlpouiet)},_removeCid:function(a,b){"object"!==typeof b&&(b=[b]);for(var c=[],d=0,k=b.length;d<k;d++)for(var m=b[d]+"",l=0,f=a.length;l<f;l++)if(a[l].cid===m){c.push(l);break}c.reverse();d=0;for(k=c.length;d<k;d++)a.splice(c[d],1);return a}},AdlpoEvents={_listeners:{},addListener:function(a,b){if("function"!==typeof b)throw new TypeError("listener is not function.");
if("undefined"===typeof this._listeners[a])this._listeners[a]=[];else if(!(this._listeners[a]instanceof Array))throw Error("unusable event name : "+a);this._listeners[a].push(b)},emit:function(a,b){if("undefined"!==typeof this._listeners[a])for(var c=0,d=this._listeners[a].length;c<d;c++)try{this._listeners[a][c](b)}catch(k){console.error(k)}}};
(function(){for(var a=[{id:"3255",match_url:"http\\://briefing\\.tech\\-camp\\.in/",match_type:"0",is_with_parameter:"0",character_code:"UTF-8",decision_type:"1",decision_text:"setsumeikai",area_count:"10",is_use_dmp:"0",is_with_dmp_suffix:"1",customs:[]},{id:"3473",match_url:"http\\://briefing\\.tech\\-camp\\.in/",match_type:"0",is_with_parameter:"0",character_code:"UTF-8",decision_type:"1",decision_text:"FirstView",area_count:"2",is_use_dmp:"0",is_with_dmp_suffix:"1",customs:[]},{id:"3523",match_url:"http\\://briefing\\.tech\\-camp\\.in/",
match_type:"0",is_with_parameter:"0",character_code:"UTF-8",decision_type:"0",decision_text:"",area_count:"1",is_use_dmp:"0",is_with_dmp_suffix:"1",customs:[]}],b=[{id:"3192",match_url:"https\\://tech\\-camp\\.in/briefings/new",match_type:"0",is_with_parameter:"0",decision_type:"1",decision_text:"setsumeikai"},{id:"3197",match_url:"https\\://tech\\-camp\\.in/briefings/notice",match_type:"0",is_with_parameter:"0",decision_type:"1",decision_text:"fin"}],c=[],d=[],k=function(a,b,c){if(-1!=a.indexOf("//finder3.userdive.com/"))if(b=
b.replace("\\",""),"http"==b.substr(0,4).toLowerCase()){var d=b.indexOf("://");-1!=d&&(b=b.substr(d+3))}else"//"==b.substr(0,2)&&(b=b.substr(2));d=!1;switch(c){case "0":b=new RegExp(".*"+b+".*");d=null!==a.match(b)?!0:!1;break;case "1":-1!=a.indexOf("//finder3.userdive.com/")?(b=new RegExp(b),d=null!==a.match(b)?!0:!1):d=0===a.indexOf(b)?!0:!1;break;case "2":-1!=a.indexOf("//finder3.userdive.com/")?(b=new RegExp(b),d=null!==a.match(b)?!0:!1):d=a==b?!0:!1;break;case "3":b=new RegExp(b),d=null!==a.match(b)?
!0:!1}return d},m=function(a){for(var b=0<a.length?",":"",c=0;c<a.length;++c)b+="'ca["+a[c].name+"]='+(function(){try{return "+a[c].value+";}catch(e){}return '';})()",c<a.length-1&&(b+=",");return b},l="<script type='text/javascript'>var adlpoAreaUrl=document.location.href.split('://')[1].split('?')[0].replace(/[^0-9a-zA-Z]/g, '_');\x3c/script>",f=0;f<a.length;++f){var e=a[f],n=m(e.customs),h=-1,g=0==e.is_with_parameter?document.location.href.split(/[\?\#]/)[0]:document.location.href,h=g.indexOf("ADLPOPreview");
0<=h&&--h;if(k(0<h?g.substring(0,h):g,e.match_url,e.match_type)){"1"==e.is_use_dmp&&(l+="<script type='text/javascript'>",l+="var adlpoSegmentList = [];(function(){var fn = 'fo' + (+new Date);window[fn] = function(data) {try {var jsStr = JSON.stringify(data);var jsObject = JSON.parse(jsStr);for(var i=0;i<jsObject.segments.length;i++){adlpoSegmentList.push(jsObject.segments[i].segment_id)}} catch (e) {}");for(a=1;a<=e.area_count;++a)m=f="","0"==e.decision_type?(f="adlpoAreaUrl+'_"+a+"'",m="adlpoAreaUrl+'_dmp_"+
a+"'"):(f="'"+e.decision_text+"_"+a+"'",m="'"+e.decision_text+"_dmp_"+a+"'"),0==e.is_with_dmp_suffix&&(m=f),"1"==e.is_use_dmp?(f="",f+="<div class='ADLPODefault'></div>",f+="<script type='text/javascript'>",f+="adlpoMain("+m+",'lc=os','ch="+e.character_code+"','ca[dmp]='+encodeURIComponent('|'+adlpoSegmentList.join('|')+'|'),'ca[dmp_id]=1'"+n+");",f+="\x3c/script>",l+="_adlpowrite('"+f.replace(/'/g,"\\'").replace(/script/g,"scr' + 'ipt")+"');"):(l+="<div class='ADLPODefault'></div>",l+="<script type='text/javascript'>adlpoMain("+
f+",'lc=os','ch="+e.character_code+"'"+n+");\x3c/script>");"1"==e.is_use_dmp&&(l+='};var url = \'//cnt.fout.jp/segapi/audience?cvid=mHDmdffSCFxfWgmjsQ&callback=\' + fn;_adlpowrite("<scr"+"ipt type=\'text/javascript\' src=\'"+url+"\' ></scr"+"ipt>");}());',l+="\x3c/script>");break}}for(f=0;f<b.length;++f)if(e=b[f],h=-1,g=0==e.is_with_parameter?document.location.href.split(/[\?\#]/)[0]:document.location.href,h=g.indexOf("ADLPOPreview"),0<=h&&--h,k(0<h?g.substring(0,h):g,e.match_url,e.match_type)){b=
"";b="0"==e.decision_type?"adlpoAreaUrl":"'"+e.decision_text+"'";l+="<script type='text/javascript'>";l+="adlpoMain("+b+",'pr=cv');";l+="\x3c/script>";break}for(f=0;f<c.length;++f)if(e=c[f],h=-1,g=0==e.is_with_parameter?document.location.href.split(/[\?\#]/)[0]:document.location.href,h=g.indexOf("ADLPOPreview"),0<=h&&--h,k(0<h?g.substring(0,h):g,e.match_url,e.match_type)){c="";c="0"==e.decision_type?"''":"'"+e.decision_text+"'";l+="<script type='text/javascript'>adlpoMain("+c+",'pr=at','lc=os','tt="+
e.traffic_tag_id+"');\x3c/script>";break}for(f=0;f<d.length;++f)if(e=d[f],h=-1,g=0==e.is_with_parameter?document.location.href.split(/[\?\#]/)[0]:document.location.href,h=g.indexOf("ADLPOPreview"),0<=h&&--h,k(0<h?g.substring(0,h):g,e.match_url,e.match_type)){l+="<script type='text/javascript'>adlpoMain('', 'setga');\x3c/script>";break}_adlpowrite(l)})();