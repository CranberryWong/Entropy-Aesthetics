var bpsso={c0:[{ts1:"nxt",ts2:"reg_nxt",cn:"",liSize:{w:700,h:600},loSize:{w:700,h:600},rgSize:{w:700,h:600},wdSize:{w:700,h:600},cpSize:{w:700,h:600},nl_jsp:"/err/l1/nxt/"},{ts1:"nxt_charge",ts2:"reg_nxt_charge",cn:"",liSize:{w:700,h:600},loSize:{w:700,h:600},rgSize:{w:700,h:600},wdSize:{w:700,h:600},cpSize:{w:700,h:600},nl_jsp:"/err/l1/nxt_charge/"},{}],c:{},v:{win:null,tid:null},getopt:function(c,a){var b,d;if(c.indexOf("#")>=0){c=c.substring(0,c.indexOf("#"))}if(c=c.split("?")[1]){d=new Array();d=c.split("&");for(b=0;b<d.length;b++){if(d[b].substring(0,a.length+1).toLowerCase()==(a.toLowerCase()+"=")){return(d[b].substring(a.length+1))}}}return("")},throwCookies:function(a){var b=new Date();b.setTime(b.getTime()-1);document.cookie=a+"=; path=/; domain=."+location.hostname+";  expires="+b.toGMTString();document.cookie=a+"=; path=/; domain="+location.hostname+";  expires="+b.toGMTString();document.cookie=a+"=;path=/; expires="+b.toGMTString()},throwSiteCookies:function(){var a,b;b=document.cookie.split(/; ?/);for(a=0;a<b.length;a++){if(b[a].match(new RegExp("^("+bpsso.c.cn+".+)=.+"))){bpsso.throwCookies(RegExp.$1)}}bpsso.throwCookies("ALDONE");bpsso.throwCookies("AnnexDirect");bpsso.throwCookies("_session_id")},liPup:function(a){bpsso.changeProfile(a);bpsso.openWin("login",bpsso.c.ts1,"p",bpsso.c.liSize);return(false)},liMov:function(a){bpsso.changeProfile(a);bpsso.moveWin("login",bpsso.c.ts1,"m",bpsso.getReturnUrl());return(false)},liSmp:function(a){bpsso.changeProfile(a);bpsso.moveWin("login",bpsso.c.ts1,"s",bpsso.getReturnUrl());return(false)},loPup:function(a){bpsso.changeProfile(a);bpsso.openWin("logout","sso_cmn","p",bpsso.c.loSize);return(false)},loMov:function(a){bpsso.changeProfile(a);bpsso.moveWin("logout","sso_cmn","m",bpsso.getReturnUrl());return(false)},loSmp:function(a){bpsso.changeProfile(a);bpsso.moveWin("logout","sso_cmn","s",bpsso.getReturnUrl());return(false)},rgPup:function(a){bpsso.changeProfile(a);bpsso.openWin("regist",bpsso.c.ts2,"p",bpsso.c.rgSize);return(false)},rgMov:function(a){bpsso.changeProfile(a);bpsso.moveWin("regist",bpsso.c.ts2,"m",bpsso.getReturnUrl());bpsso.throwSiteCookies();return(false)},rgSmp:function(a){bpsso.changeProfile(a);bpsso.moveWin("regist",bpsso.c.ts2,"s",bpsso.getReturnUrl());bpsso.throwSiteCookies();return(false)},wdPup:function(a){bpsso.changeProfile(a);bpsso.openWin("withdraw",bpsso.c.ts2,"p",bpsso.c.wdSize);return(false)},wdMov:function(a){bpsso.changeProfile(a);bpsso.moveWin("withdraw",bpsso.c.ts2,"m",bpsso.getReturnUrl());return(false)},wdSmp:function(a){bpsso.changeProfile(a);bpsso.moveWin("withdraw",bpsso.c.ts2,"s",bpsso.getReturnUrl());return(false)},cpPup:function(a){bpsso.changeProfile(a);bpsso.openWin("password","","p",bpsso.c.cpSize);return(false)},cpMov:function(a){bpsso.changeProfile(a);bpsso.moveWin("password",bpsso.c.ts2,"m",bpsso.getReturnUrl());return(false)},cpSmp:function(a){bpsso.changeProfile(a);bpsso.moveWin("password",bpsso.c.ts2,"s",bpsso.getReturnUrl());return(false)},moveWin:function(e,c,b,a){var d=c?("&ts="+c):"";bpsso.throwSiteCookies();location.href="https://g-signon.nikkeibp.co.jp/front/"+e+"/?ct="+b+d+"&ru="+a},openWin:function(e,c,b,a){var d=c?("&ts="+c):"";bpsso.throwSiteCookies();if(bpsso.v.win&&!bpsso.v.win.closed){bpsso.v.win.close()}clearInterval(bpsso.v.tid);bpsso.v.win=window.open("https://g-signon.nikkeibp.co.jp/front/"+e+"/?ct="+b+d,"","width="+a.w.toString()+",height="+a.h.toString()+",scrollbars=yes,resizable=yes");bpsso.v.tid=setInterval(bpsso.winChecker,1000);return(false)},getReturnUrl:function(){var b,a;b=location.href;if(b.indexOf("/mypage/bookmark/add.html")>=0){b=decodeURIComponent(bpsso.getopt(b,"r"));if(b.match(/["'<>]/)){b=location.protocol+"//"+location.host+"/"}}else{if(b.indexOf(bpsso.c.nl_jsp)>=0){b=decodeURIComponent(bpsso.getopt(b,"URL"));if(b.match(/["'<>]/)){b=location.protocol+"//"+location.host+"/"}else{if(!b.match(/^https?:\/\//i)){b=location.protocol+"//"+location.host+b}else{if(!b.match(/^https?:\/\/[^\/]+\.nikkeibp\.co\.jp\//i)){b=location.protocol+"//"+location.host+"/"}}}}else{if(document.querySelector(".login a[data-ru]")){a=document.querySelector(".login a[data-ru]").getAttribute("data-ru");if(a!=""){b=a}}}}return(encodeURIComponent(b))},winChecker:function(){if(bpsso.v.win.closed){clearInterval(bpsso.v.tid);window.location.reload()}},changeProfile:function(c){var b,a;a=c?c:0;for(b in bpsso.c0[a]){bpsso.c[b]=bpsso.c0[a][b]}},addOnunload:function(b){var a;a=window.onunload;if(typeof window.addEventListener=="function"){window.addEventListener("unload",b,false);return(true)}else{if(typeof window.attachEvent=="object"){window.attachEvent("onunload",b);return(true)}}if(typeof window.onunload!="function"){window.onunload=b}else{window.onunload=function(){a();b()}}},outPage:function(){if(bpsso.v.win&&!bpsso.v.win.closed){bpsso.v.win.close()}},init:function(){bpsso.c0.pop();bpsso.changeProfile();bpsso.addOnunload(bpsso.outPage)}};bpsso.init();