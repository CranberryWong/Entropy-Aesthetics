(function(){if(typeof truste=="undefined"){truste={}}if(typeof truste.util=="undefined"){truste.util={}
}truste.eu={bindMap:{domain:"bloomberg-test.com"},noticeLP:{pcookie:undefined}};truste.util.createCookie=function(c,j,f,k){if(k){truste.util.createCookieStorage(c,j,f)
}var d="; expires=";if(!f){var e=new Date();e.setDate(e.getDate()+395);d+=e.toGMTString()}else{if(f=="0"){d=""
}else{d+=f}}var i=truste.eu.bindMap.domain,m=self.location.hostname;var h=!!m.match(/^\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}$/)||m=="localhost";
var g=new RegExp("[.]"+i+"$|^"+i+"$");var l=i&&g.test(m)?i:(h?m:m.replace(/^www\./,""));if(typeof truste.eu.noticeLP.pcookie!="undefined"){document.cookie=c+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;domain="+(h?"":".")+l.replace(/^\./,"");
var a=(function(){var b=0,o=l,q=o.split("."),n="_gd"+(new Date()).getTime();while(b<(q.length-1)&&document.cookie.indexOf(n+"="+n)==-1){o=q.slice(-1-(++b)).join(".");
document.cookie=n+"="+n+";domain="+o+";"}document.cookie=n+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+o+";";
return o})();l=a}self.document.cookie=c+"="+j+d+"; path=/;domain="+(h?"":".")+l.replace(/^\./,"")};truste.util.createCookie("notice_behavior","none","0")
})();