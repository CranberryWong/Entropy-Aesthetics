(function(){function d(a,b){if(a&&b!=="null"&&b!=="undefined")for(var c in b)if(b.hasOwnProperty(c)&&b[c].test(a))return c;return"unknown"}function e(){var a=document.documentElement.lang?document.documentElement.lang:"unknown";return a!="unknown"&&a.length>2&&!/es-419|pt-br|zh-cn|zh-tw/.test(a)&&(a=a.substr(0,2)),a}function f(){var c=d(a,b);return c=="chrome"?/(crios)\/([\w\.]+)/.test(a)?a.match(/crios\/([\w\.]+)/)[1]:/(crmo)\/([\w\.]+)/.test(a)?a.match(/crmo\/([\w\.]+)/)[1]:/(chrome)\/([\w\.]+)/.test(a)?a.match(/chrome\/([\w\.]+)/)[1]:"unknown":c=="opera"?/\s(opr)\/([\w\.]+)/.test(a)?a.match(/(opr)\/([\w\.]+)/)[2]:/\s(opios)\/([\w\.]+)/.test(a)?a.match(/(opios)\/([\w\.]+)/)[2]:/(opera)[\/\s]+([\w\.]+)/.test(a)?a.match(/version\/([\w\.]+)/)[1]:"unknown":c=="firefox"?/firefox\/([\w\.]+)/.test(a)?a.match(/firefox\/([\w\.]+)/)[1]:"unknown":c=="msie"?/(msie)\s([\w\.]+)/.test(a)?a.match(/(msie)\s([\w\.]+)/)[2]:/\brv[ :]+(\w+)/.test(a)?a.match(/\brv[ :]+(\w+)/)[1]:/edge\/([\w\.]+)/.test(a)?a.match(/edge\/([\w\.]+)/)[1]:"unknown":c=="safari"?/version\/([\w\.]+)/.test(a)?a.match(/version\/([\w\.]+)/)[1]:"unknown":c=="yandex"?/yabrowser\/([\w\.]+)/.test(a)?a.match(/yabrowser\/([\w\.]+)/)[1]:"unknown":"unknown"}function g(){var b=d(a,c);return b=="windows"||b=="osx"||b=="linux"?"desktop":b=="blackberry"||b=="symbian"||b=="firefox os"||b=="chrome os"||b=="windows phone"||b=="android"||b=="ios"?"mobile":"unknown"}function h(){var b=d(a,c);return b=="blackberry"?/version\/([\w\.]+)/.test(a)?a.match(/version\/([\w\.]+)/)[1]:"unknown":b=="symbian"?/series\s60/.test(a)?"symbian":/symbos/.test(a)?"6":/symbianos\/([\w\.]+)/.test(a)?a.match(/symbianos\/([\w\.]+)/)[1]:"unknown":b=="firefox os"?/gecko\/([\w\.]+)/.test(a)?a.match(/gecko\/([\w\.]+)/)[1]:"unknown":b=="chrome os"?/cros\s([\w]+)\s([\w\.]+)/.test(a)?a.match(/cros\s([\w]+)\s([\w\.]+)/)[2]:"unknown":b=="windows phone"?/windows\sphone\sos/.test(a)?a.match(/windows\sphone\sos\s([\w\.]+)/)[1]:/windows\sphone/.test(a)?a.match(/windows\sphone\s([\w\.]+)/)[1]:"unknown":b=="android"?/android\s([\w\.]+)/.test(a)?a.match(/android\s([\w\.]+)/)[1]:"unknown":b=="ios"?/os\s([\d_]+)/.test(a)?a.match(/os\s([\d_]+)/)[1].replace(/_/g,"."):"unknown":b=="linux"?/linux\s([\w\.]+)/.test(a)?a.match(/linux\s([\w\.]+)/)[1]:"unknown":b=="osx"?/os\sx\s([\d_\.]+)/.test(a)?a.match(/os\sx\s([\d_\.]+)/)[1].replace(/_/g,"."):"unknown":b=="windows"?/windows\s95/.test(a)?"95":/windows\s98/.test(a)?"98":/windows\snt\s5\.(1|2)/.test(a)?"xp":/windows\snt\s6\.0/.test(a)?"vista":/windows\snt\s6\.1/.test(a)?"7":/windows\snt\s6\.2/.test(a)?"8":/windows\snt\s6\.3/.test(a)?"8.1":/windows\snt\s10\./.test(a)?"10":"unknown":"unknown"}function i(){var a="unknown";if(typeof document.body=="undefined")return a;var b=document.createElement("DIV");return b.id="adbanner",b.style.position="absolute",b.style.top="-9999px",b.style.left="-9999px",b.appendChild(document.createTextNode("&nbsp;")),document.body.appendChild(b),b&&(a=b.clientHeight==0,document.body.removeChild(b)),a}function j(){var j={name:"unknown",version:"unknown",platform:"unknown",os:"unknown",osVer:"unknown",language:"unknown",adblockState:"unknown"};return a&&(j.name=d(a,b),j.version=f(),j.platform=g(),j.os=d(a,c),j.osVer=h(),j.language=e(),j.adblockState=i()),j}var a=navigator.userAgent.toLowerCase(),b={kindle:/(kindle)\/([\w\.]+)/,avant:/avant\sbrowser?[\/\s]?([\w\.]*)/,chromium:/(chromium)\/([\w\.-]+)/,skyfire:/(skyfire)\/([\w\.-]+)/,vivaldi:/(vivaldi)\/([\w\.-]+)/,yandex:/(yabrowser)\/([\w\.]+)/,ucbrowser:/(uc\s?browser)[\/\s]?([\w\.]+)/,firefox:/(firefox)\/([\w\.-]+)/,netscape:/(navigator|netscape)\/([\w\.-]+)/,coast:/(coast)\/([\w\.]+)/,opera:/(op(era|r|ios))[\/\s]+([\w\.]+)/,msie:/(?:ms|\()(ie)|((trident).+rv[:\s]([\w\.]+).+like\sgecko)|(edge)\/((\d+)?[\w\.]+)/,"android browser":/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/,safari:/version\/([\w\.]+).+?(mobile\s?safari|safari)/,chrome:/(chrome|crmo|crios)\/([\w\.]+)/},c={blackberry:/\((bb)(10);|(blackberry)\w*\/?([\w\.]+)*/,symbian:/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/,"firefox os":/mozilla.+\((mobile|tablet);.+gecko.+firefox/,"chrome os":/(cros)\s[\w]+\s([\w\.]+\w)/,"windows phone":/windows\s(phone|mobile)|iemobile/,android:/android/,ios:/ipad|iphone|ipod/,linux:/(x11|linux|unix)\s?([\w\.]+)*/,osx:/(mac\sos\sx)\s?([\w\s\.]+\w)*/,windows:/windows/};getBrowserInformation=j})()
