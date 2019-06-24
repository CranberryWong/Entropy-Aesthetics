_satellite.pushAsyncScript(function(event, target, $variables){
  (function(){ var cX=cX||{};cX.callQueue=cX.callQueue||[];var cx_props=cx_props||{};cx_props.k=[];cX.callQueue.push(["invoke",function(){var h={},i={};var b=40;try{var l=cX.library._findRealReferrer().split("/")[2];
if(l&&location.hostname!==l){h.referrer_host=i.referrer_host_S=l.slice(0,b);}}catch(f){}if(location.search){location.search.substring(1).split("&").forEach(function(q){try{var p=q.split("=");
if(p[0].slice(0,3)==="cx_"){if(p[1]){i[p[0].replace(/^cx_/,"")+"_S"]=decodeURIComponent(p[1]).slice(0,b);}else{if(!p[1]||p[1].length==0){i[p[0].replace(/^cx_/,"")+"_S"]="novalue";
}}}else{if(p[1]){h[p[0].toLowerCase()]=i[p[0].toLowerCase()+"_S"]=decodeURIComponent(p[1]).slice(0,b);}else{h[p[0].toLowerCase()]=i[p[0].toLowerCase()+"_S"]="novalue";
}}}catch(r){}});}if(!cX.getUserId(false)){h.newuser=i.newuser_S="true";}else{try{var m=new Date().getTime()-parseInt(cX.library.m_atfr.match(/altm=(\d+)/)[1]);
if(m>=1000*60*30){cX.stopAllSessionAnnotations();var o=Math.floor(m/(1000*60*60*24));if(o<1){h.elapsed=i.elapsed_S="\u0031\u65E5\u4EE5\u5185";}else{if(o<7){h.elapsed=i.elapsed_S=String(o)+"\u65E5\u3076\u308A";
}else{if(o<31){h.elapsed=i.elapsed_S=String(Math.floor(o/7))+"\u9031\u9593\u3076\u308A";}else{if(o<365){h.elapsed=i.elapsed_S=String(Math.floor(o/31))+"\u30F6\u6708\u3076\u308A";
}else{h.elapsed=i.elapsed_S="1\u5E74\u4EE5\u4E0A";}}}}}}catch(f){}}var a=function(){return localStorage.getItem("cx_visited_site")?JSON.parse(localStorage.getItem("cx_visited_site")):{};
};var d=function(){var e=a();e[location.host]="true";localStorage.setItem("cx_visited_site",JSON.stringify(e));h.newuser_site=i.newuser_site_S=location.host;
};var k=function(){return localStorage.getItem("cx_last_visited")?JSON.parse(localStorage.getItem("cx_last_visited")):{};};var g=function(){var e=k();e[location.host]=new Date().getTime();
localStorage.setItem("cx_last_visited",JSON.stringify(e));};if(!cX.getUserId(false)){try{if(typeof window.localStorage==="object"&&typeof window.localStorage.setItem==="function"){d();
}}catch(f){}}else{try{if(typeof window.localStorage==="object"&&typeof window.localStorage.setItem==="function"){var j=a();if(!(location.host in j)){d();
}}}catch(f){}try{var c=k();if(location.host in c){var m=new Date().getTime()-parseInt(c[location.host]);if(m>=1000*60*30){var o=Math.floor(m/(1000*60*60*24));
if(o<1){h.elapsed_site=i.elapsed_site_S="\u0031\u65E5\u4EE5\u5185";}else{if(o<7){h.elapsed_site=i.elapsed_site_S=String(o)+"\u65E5\u3076\u308A";}else{if(o<31){h.elapsed_site=i.elapsed_site_S=String(Math.floor(o/7))+"\u9031\u9593\u3076\u308A";
}else{if(o<365){h.elapsed_site=i.elapsed_site_S=String(Math.floor(o/31))+"\u30F6\u6708\u3076\u308A";}else{h.elapsed_site=i.elapsed_site_S="1\u5E74\u4EE5\u4E0A";
}}}}}g();}}catch(f){}}var n=document.referrer;if(n.match(/faeb92b469b40c9d72e4-dc920caace12a27e58d45a42e86d29a2\.ssl\.cf2\.rackcdn\.com\/generic_v[0-9]+\.html/)||n.match(/cdn\.cxpublic\.com\/generic_v[0-9]+\.html/)){i.cx_source_S="cxrecs";
}if(Object.keys(h).length>0){cX.setCustomParameters(h);}if(Object.keys(i).length>0){cX.startSessionAnnotation(i);}try{"newuser_S" in cX.library._getSessionAnnotations()&&cx_props.k.push("newuser");
}catch(f){}}]); })();
(function(){
var cX = window.cX || {}; cX.callQueue = cX.callQueue || [];
//keys[0]:prefix,keys[1]:Local Storage Key,keys[2]:Cookie Name
id = window.bpTrackVars.userId;
cX.callQueue.push(['invoke',function() {
cX.setSiteId(window.bpTrackVars.config.cx.siteId);
if(bpTrackVars.userId){
    cX.addExternalId({'id':id,'type':'nikkeiid'});
    cX.sendPageViewEvent();
}else{
    cX.sendPageViewEvent();
}
}])})();
(function(d,s,e,t){e=d.createElement(s);e.type='text/java'+s;e.async='async';
e.src='http'+('https:'===location.protocol?'s://s':'://')+'cdn.cxense.com/cx.js';
t=d.getElementsByTagName(s)[0];t.parentNode.insertBefore(e,t);})(document,'script');
});
