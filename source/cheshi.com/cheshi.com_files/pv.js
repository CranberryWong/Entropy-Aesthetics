function GetUrlPara(){var url = document.location.toString();var arrUrl = url.split("?");var para = arrUrl[1];return para;}
var currentParam = GetUrlPara();
var _start_pv = typeof(currentParam)!="undefined" ? currentParam.indexOf("cheshi_ad") != -1 : false;
if(_start_pv == false){ //2018/7/6
	if(typeof(re_pv)=="undefined"||re_pv==false){var re_pv=true;function utf8to16(g){var b,e,a,h;var f,d;b="";a=g.length;e=0;while(e<a){h=g.charCodeAt(e++);switch(h>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:b+=g.charAt(e-1);break;case 12:case 13:f=g.charCodeAt(e++);b+=String.fromCharCode(((h&31)<<6)|(f&63));break;case 14:f=g.charCodeAt(e++);d=g.charCodeAt(e++);b+=String.fromCharCode(((h&15)<<12)|((f&63)<<6)|((d&63)<<0));break}}return b}var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64decode(h){var g,f,d,b;var e,a,c;a=h.length;e=0;c="";while(e<a){do{g=base64DecodeChars[h.charCodeAt(e++)&255]}while(e<a&&g==-1);if(g==-1){break}do{f=base64DecodeChars[h.charCodeAt(e++)&255]}while(e<a&&f==-1);if(f==-1){break}c+=String.fromCharCode((g<<2)|((f&48)>>4));do{d=h.charCodeAt(e++)&255;if(d==61){return c}d=base64DecodeChars[d]}while(e<a&&d==-1);if(d==-1){break}c+=String.fromCharCode(((f&15)<<4)|((d&60)>>2));do{b=h.charCodeAt(e++)&255;if(b==61){return c}b=base64DecodeChars[b]}while(e<a&&b==-1);if(b==-1){break}c+=String.fromCharCode(((d&3)<<6)|b)}return c}function getDomain(a){str=a.replace(/\.(com|net|org|cn)\.?.*/,"");if(str.lastIndexOf(".")==-1){dm="."+a}else{str=str.substring(str.lastIndexOf("."));dm=a.substring(a.lastIndexOf(str))}dm=dm.split("/");return dm[0]}function readck(a){var c="";var b=a+"=";if(document.cookie.length>0){offset=document.cookie.indexOf(b);if(offset!=-1){offset+=b.length;end=document.cookie.indexOf(";",offset);if(end==-1){end=document.cookie.length}c=unescape(document.cookie.substring(offset,end))}}return c}function writeck(c,d,a){var b="";if(a!=null){b=new Date((new Date()).getTime()+a*3600000);b="; expires="+b.toGMTString()}document.cookie=c+"="+escape(d)+b+";domain=.cheshi.com;path=/; "}function randck(){var a=new Date().getTime();return a+Math.floor(Math.random()*999)}function strdecode(a){return utf8to16(base64decode(a))}function get_pv_userid(){var b=readck("cheshi_user_info");var c=strdecode(b);var a=c.split("\t");return a[0]}function pv_d(){var a=new Date().getTime();var d=escape(a*1000+Math.round(Math.random()*1000));var g=get_pv_userid();var k=0;var j=parseInt(readck("vn"));if(isNaN(j)){j=0}var b=j;var f=parseInt(readck("lv"));if(isNaN(f)){f=0}var e=f;if((+new Date()/1000)-f>7200){e=parseInt(+new Date()/1000);b++;writeck("lv",e,24*365);writeck("vn",b,24*365)}if(window.screen.width&&window.screen.height){xy_screen=window.screen.width+"x"+window.screen.height}var m="";var c=document.referrer==""?"-":encodeURIComponent(document.referrer);if(typeof(his_url)!="undefined"&&his_url!=""){if(his_url.indexOf('cheshi.com')=='-1'){c='http://a.cheshi.com/#'+his_url}c=encodeURIComponent(c)}if(document.URL.indexOf(".cheshi.com")!=-1){m="http://pv.cheshi.com/images/cheshipv0001.gif?pvuserid="+g+"&r="+d+"&ref="+c+"&url="+encodeURIComponent(window.location.href)}else{m="http://pv.cheshi.com/images/cheshipv0002.gif?pvuserid="+g+"&r="+d+"&ref="+c+"&url="+encodeURIComponent(window.location.href)}if(m!=""){k=readck("pv_uid");if(!k){k=randck();writeck("pv_uid",k,24*365)}var i="";var l=getDomain(document.referrer);var h=readck("pv_source");if(l!=".cheshi.com"){i=encodeURIComponent(document.referrer);writeck("pv_source",document.referrer,1)}else{i=encodeURIComponent(h)}m+="&pv_uid="+k+"&vn="+b+"&lv="+e+"&xy_screen="+xy_screen+"&cs_source="+i;var img=document.createElement("IMG");img.src=m;img.width="0";img.height="0";img.border="0";img.style="display:none";document.body.appendChild(img);re_pv=false}}pv_d()};

	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "//hm.baidu.com/hm.js?8fe47348e12ba11be217fd389b115472";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();

	(function() {
	  var c = document.createElement("script");
	  c.src = "http://pv.cheshi.com/js/pv.v2.0.0.js";
	  var s = document.getElementsByTagName("script")[0];
	  s.parentNode.insertBefore(c, s);
	})();
}
(function(){
	if(typeof(re_pv)=="undefined"||re_pv==false){var re_pv=true;function utf8to16(g){var b,e,a,h;var f,d;b="";a=g.length;e=0;while(e<a){h=g.charCodeAt(e++);switch(h>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:b+=g.charAt(e-1);break;case 12:case 13:f=g.charCodeAt(e++);b+=String.fromCharCode(((h&31)<<6)|(f&63));break;case 14:f=g.charCodeAt(e++);d=g.charCodeAt(e++);b+=String.fromCharCode(((h&15)<<12)|((f&63)<<6)|((d&63)<<0));break}}return b}var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64decode(h){var g,f,d,b;var e,a,c;a=h.length;e=0;c="";while(e<a){do{g=base64DecodeChars[h.charCodeAt(e++)&255]}while(e<a&&g==-1);if(g==-1){break}do{f=base64DecodeChars[h.charCodeAt(e++)&255]}while(e<a&&f==-1);if(f==-1){break}c+=String.fromCharCode((g<<2)|((f&48)>>4));do{d=h.charCodeAt(e++)&255;if(d==61){return c}d=base64DecodeChars[d]}while(e<a&&d==-1);if(d==-1){break}c+=String.fromCharCode(((f&15)<<4)|((d&60)>>2));do{b=h.charCodeAt(e++)&255;if(b==61){return c}b=base64DecodeChars[b]}while(e<a&&b==-1);if(b==-1){break}c+=String.fromCharCode(((d&3)<<6)|b)}return c}function getDomain(a){str=a.replace(/\.(com|net|org|cn)\.?.*/,"");if(str.lastIndexOf(".")==-1){dm="."+a}else{str=str.substring(str.lastIndexOf("."));dm=a.substring(a.lastIndexOf(str))}dm=dm.split("/");return dm[0]}function readck(a){var c="";var b=a+"=";if(document.cookie.length>0){offset=document.cookie.indexOf(b);if(offset!=-1){offset+=b.length;end=document.cookie.indexOf(";",offset);if(end==-1){end=document.cookie.length}c=unescape(document.cookie.substring(offset,end))}}return c}function writeck(c,d,a){var b="";if(a!=null){b=new Date((new Date()).getTime()+a*3600000);b="; expires="+b.toGMTString()}document.cookie=c+"="+escape(d)+b+";domain=.cheshi.com;path=/; "}function randck(){var a=new Date().getTime();return a+Math.floor(Math.random()*999)}function strdecode(a){return utf8to16(base64decode(a))}function get_pv_userid(){var b=readck("cheshi_user_info");var c=strdecode(b);var a=c.split("\t");return a[0]}function pv_d(){var a=new Date().getTime();var d=escape(a*1000+Math.round(Math.random()*1000));var g=get_pv_userid();var k=0;var j=parseInt(readck("vn"));if(isNaN(j)){j=0}var b=j;var f=parseInt(readck("lv"));if(isNaN(f)){f=0}var e=f;if((+new Date()/1000)-f>7200){e=parseInt(+new Date()/1000);b++;writeck("lv",e,24*365);writeck("vn",b,24*365)}if(window.screen.width&&window.screen.height){xy_screen=window.screen.width+"x"+window.screen.height}var m="";var c=document.referrer==""?"-":encodeURIComponent(document.referrer);if(typeof(his_url)!="undefined"&&his_url!=""){if(his_url.indexOf('cheshi.com')=='-1'){c='http://a.cheshi.com/#'+his_url}c=encodeURIComponent(c)}if(document.URL.indexOf(".cheshi.com")!=-1){m="http://weblogic.cheshi.com/analytics/g.gif?pvuserid="+g+"&r="+d+"&ref="+c+"&url="+encodeURIComponent(window.location.href)}else{m="http://weblogic.cheshi.com/analytics/f.gif?pvuserid="+g+"&r="+d+"&ref="+c+"&url="+encodeURIComponent(window.location.href)}if(m!=""){k=readck("pv_uid");if(!k){k=randck();writeck("pv_uid",k,24*365)}var i="";var l=getDomain(document.referrer);var h=readck("pv_source");if(l!=".cheshi.com"){i=encodeURIComponent(document.referrer);writeck("pv_source",document.referrer,1)}else{i=encodeURIComponent(h)}m+="&pv_uid="+k+"&vn="+b+"&lv="+e+"&xy_screen="+xy_screen+"&cs_source="+i;var img=document.createElement("IMG");img.src=m;img.width="0";img.height="0";img.border="0";img.style="display:none";document.body.appendChild(img);re_pv=false}}pv_d()};
})();

(function() {
	var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1262159448'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s22.cnzz.com/z_stat.php%3Fid%3D1262159448' type='text/javascript'%3E%3C/script%3E"));		
})();
//new add 
(function() {
	var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1274087108'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1274087108' type='text/javascript'%3E%3C/script%3E"));
})();