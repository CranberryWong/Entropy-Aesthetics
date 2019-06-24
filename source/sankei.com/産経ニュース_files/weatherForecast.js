/*! (c) 2014 SANKEI DIGITAL INC.
 *  URL: http://www.sankei-digital.co.jp/
 *  name: 株式会社産経デジタル　産経ニュース[PC] - 天気予報ウィジェット
 *  Date: 2017.04.21
 *  version: 1.0.1
 *  note: 
 *  license: 著作権者の許可なく、改変・複製・商用利用・再配布等の行為を禁じる。
 *
*/
!function(a){var b="WeatherCode",c='<dl><dt><span class="locatePref"><a href="#URL">#POINT</a></span></dt><dd><span class="weather">#IMAGE</span><span lang="en" class="maxtemp">#TEMP&#8451;</span></dd></dl>',d='<span class="sprite sprite-#CODE">#ALT</span>',e=function(a,b,d,e){return c.replace("#POINT",a).replace("#URL",b).replace("#IMAGE",d).replace("#TEMP",e)},f=function(a,b){return d.replace("#CODE",$SKD.parseUrl(a).fileNoExt).replace("#ALT",b)},g=function(a){return"/module/sys/weather/"+a+".xml"},h=function(){return/^(\/smp)?\/west\//.test(location.pathname)?"47772":"47662"},i=$("#modWeather").append('<h1 class="speech">今日の天気</h1>'),j=$("<span />");i.append(j);var k=function(a){var c,d;c=a&&/^[0-9]+$/.test(a)?a:d=$.cookie(b);var i=g(c?c:h());$.get(i).then(function(a){var c,g,h,i,k;try{c=$(a).find("weatherData"),g=$SKD.escHTML(c.find("pointNameJpn").text()),h=c.find("areaPageUrl").text(),i=f(c.find("weatherImageSrc").text(),$SKD.escHTML(c.find("pointWeatherJpn").text())),k=$SKD.escHTML(c.find("maxTemp").text())}catch(l){g=i=k="--",h="#"}var m=$(e(g,h,i,k));j.replaceWith(m),j=m,d&&$.cookie(b,d,{expires:730,path:"/"})},function(){var a=$(e("--","#","--","--"));j.replaceWith(a),j=a})};k(),a.update=k}(weatherForecast={});