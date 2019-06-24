!function(a,b,c){"use strict";var d={};d.version="1.0.0",d.get_cookies=function(){for(var a=c.cookie.split(";"),b={},d=0,e=a.length;d<e;d++)a[d]=a[d].replace(/^\s+|\s+$/g,""),b[a[d].split("=")[0]]=a[d].split("=")[1];return b},d.set_cookie=function(a,b,d){var e=new Date;e.setTime(e.getTime()+24*d*60*60*1e3);var f="; expires="+e.toGMTString();c.cookie=a+"="+b+f+"; path=/"},d.generate_uuid=function(){var a=(new Date).getTime(),b="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var c=(a+16*Math.random())%16|0;return a=Math.floor(a/16),("x"===b?c:7&c|8).toString(16)});return b},d.get_client_id=function(){var a=d.get_cookies()._d2js||d.generate_uuid();return d.set_cookie("_d2js",a,365),a},d.base64_encode=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a=unescape(encodeURIComponent(a));for(var c,d,e,f,g,h,i,j="",k=0;k<a.length;)c=a.charCodeAt(k++),d=a.charCodeAt(k++),e=a.charCodeAt(k++),f=c>>2,g=(3&c)<<4|d>>4,h=(15&d)<<2|e>>6,i=63&e,isNaN(d)?h=i=64:isNaN(e)&&(i=64),j=j+b.charAt(f)+b.charAt(g)+b.charAt(h)+b.charAt(i);return j},d.stringify=function(a){var c;if(b.JSON&&b.JSON.stringify)c=JSON.stringify(a);else{var d=function(a){var b=typeof a;if("object"!=b||null===a)return"string"==b&&(a='"'+a.split('"').join('\\"')+'"'),String(a);var c,e,f=[],g=a&&a.constructor==Array;for(c in a)e=a[c],b=typeof e,"string"==b?e='"'+e.split('"').join('\\"')+'"':"object"==b&&null!==e&&(e=d(e)),f.push((g?"":'"'+c+'":')+String(e));return(g?"[":"{")+String(f)+(g?"]":"}")};c=d(a)}return c},d.create_script_tag=function(a){var b=c.createElement("script");b.type="text/javascript",b.async=!0,b.src=a;var d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)},d.fire_gtm_event=function(a,c){var d;for(var e in c)c.hasOwnProperty(e)&&(d={},d[e]=c[e],b[a].push(d))},b[a].callback=b[a].callback||{},b[a].prototype.init=function(){var c={ts:(new Date).getTime(),id:"tij"+(new Date).getTime()+(1e3+Math.floor(9e3*Math.random())),data:{},debug:!1,d2id:void 0,imid:void 0,sids:[],td_host:"in.treasuredata.com",td_api_key:void 0,td_db:void 0,td_tb:"pageviews",gtm_dl:void 0,gtm_ev_name:"im-ready",gtm_ev_name_d2:"d2-ready",im_api_token:void 0};for(var d in c)c.hasOwnProperty(d)&&(this[d]=this[d]||c[d]);b[a].callback[this.id]=this},b[a].prototype.log=function(a){this.debug&&(a="[debug]["+this.id+"]"+a,b.console&&b.console.log(a))},b[a].prototype.td_send_d2id=function(b,c){this.td_tb=b||this.td_tb,c=c||{};for(var e in c)c.hasOwnProperty(e)&&(this.data[e]=c[e]);var f="//sync.d2-apps.net/sync/get?callback="+encodeURIComponent(a+".callback."+this.id+".d2_callback");d.create_script_tag(f),this.log("loading d2id")},b[a].prototype.d2_callback=function(a){if(this.log("loaded imid,sids"),a.d2id&&(this.d2id=a.imid,this.data.d2id=a.d2id,this.log("d2id:"+this.data.d2id)),this.gtm_dl&&b[this.gtm_dl]){var c={d2id:this.d2id,event:this.gtm_ev_name_d2};this.log("fire gtm event"),d.fire_gtm_event(this.gtm_dl,c)}this.im_api_token?this.td_send_imid(this.td_tb,this.data):this.td_send(this.td_tb,this.data)},b[a].prototype.td_send_imid=function(b,c){if(this.td_tb=b||this.td_tb,c=c||{},!this.im_api_token)return void this.log("[error] im_api_token not found");for(var e in c)c.hasOwnProperty(e)&&(this.data[e]=c[e]);var f="//sync.im-apps.net/imid/segment?token="+this.im_api_token+"&callback="+encodeURIComponent(a+".callback."+this.id+".im_callback");d.create_script_tag(f),this.log("loading imid,sids")},b[a].prototype.im_callback=function(a){if(this.log("loaded imid,sids"),a.imid&&(this.imid=a.imid,this.data.imid=a.imid,this.log("imid:"+this.data.imid)),a.segment_eids&&(this.sids=a.segment_eids,this.data.segment_eids=a.segment_eids.join("|"),this.log("sids:"+this.data.segment_eids)),this.gtm_dl&&b[this.gtm_dl]){var c={imid:this.imid,segment_eids:this.sids.join("|"),event:this.gtm_ev_name};this.log("fire gtm event"),d.fire_gtm_event(this.gtm_dl,c)}this.td_send(this.td_tb,this.data)},b[a].prototype.td_send=function(e,f){if(this.td_tb=e||this.td_tb,f=f||{},!(this.td_api_key&&this.td_db&&this.td_tb))return void this.log("[error] td_api_key,td_db,td_tb are required");var g=this.data;for(var h in f)f.hasOwnProperty(h)&&(g[h]=f[h]);g.td_client_id=d.get_client_id(),g.td_charset=(c.characterSet||c.charset||"-").toLowerCase(),g.td_language=function(){var a=b.navigator;return(a&&(a.language||a.browserLanguage)||"-").toLowerCase()}(),g.td_color=b.screen?b.screen.colorDepth+"-bit":"-",g.td_screen=b.screen?b.screen.width+"x"+b.screen.height:"-",g.td_title=c.title,g.td_url=function(){var a=c.location.href,b=a.indexOf("#");return-1===b?a:a.slice(0,b)}(),g.td_host=c.location.host,g.td_path=c.location.pathname,g.td_referrer=c.referrer,g.td_ip="td_ip",g.td_browser="td_browser",g.td_browser_version="td_browser_version",g.td_os="td_os",g.td_os_version="td_os_version",g.td_viewport="-",this.log("sending td");var i=d.stringify(g);this.log(i);var j="//"+this.td_host+"/js/v3/event/"+this.td_db+"/"+this.td_tb;j=j+"?api_key="+encodeURIComponent(this.td_api_key)+"&data="+encodeURIComponent(d.base64_encode(i)),j=j+"&modified="+this.ts+"&callback="+encodeURIComponent(a+".callback."+this.id+".td_callback"),d.create_script_tag(j)},b[a].prototype.td_callback=function(a){a.created?this.log("td send success!"):this.log("td send failed!!")},function(){for(var c,d,e=0;e<b[a].instances.length;e++){c=b[a].instances[e],c.init();for(var f=0,g=["td_send","td_send_imid","td_send_d2id"];f<g.length;f++)if(d="tmp_"+g[f],c[d])for(var h=0;h<c[d].length;h++)c[g[f]].apply(c,c[d][h])}}()}("D2JS",window,document);