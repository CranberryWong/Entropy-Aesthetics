/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-csstransforms3d-csstransitions-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
function getScrollTop(){scrollBottom=$(window).scrollTop()+$(window).height(),scrollBottom>=4e3?infoBottom.fadeOut():infoBottom.fadeIn()}window.Modernizr=function(e,t,n){function o(e){y.cssText=e}function i(e,t){return typeof e===t}function r(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var o in e){var i=e[o];if(!r(i,"-")&&y[i]!==n)return"pfx"==t?i:!0}return!1}function s(e,t,o){for(var r in e){var a=t[e[r]];if(a!==n)return o===!1?e[r]:i(a,"function")?a.bind(o||t):a}return!1}function d(e,t,n){var o=e.charAt(0).toUpperCase()+e.slice(1),r=(e+" "+w.join(o+" ")+o).split(" ");return i(t,"string")||i(t,"undefined")?a(r,t):(r=(e+" "+x.join(o+" ")+o).split(" "),s(r,t,n))}var l,c,u,f="2.8.3",p={},h=t.documentElement,v="modernizr",m=t.createElement(v),y=m.style,b=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),g="Webkit Moz O ms",w=g.split(" "),x=g.toLowerCase().split(" "),$={},C=[],A=C.slice,P=function(e,n,o,i){var r,a,s,d,l=t.createElement("div"),c=t.body,u=c||t.createElement("body");if(parseInt(o,10))for(;o--;)s=t.createElement("div"),s.id=i?i[o]:v+(o+1),l.appendChild(s);return r=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),l.id=v,(c?l:u).innerHTML+=r,u.appendChild(l),c||(u.style.background="",u.style.overflow="hidden",d=h.style.overflow,h.style.overflow="hidden",h.appendChild(u)),a=n(l,e),c?l.parentNode.removeChild(l):(u.parentNode.removeChild(u),h.style.overflow=d),!!a},S=function(){function e(e,r){r=r||t.createElement(o[e]||"div"),e="on"+e;var a=e in r;return a||(r.setAttribute||(r=t.createElement("div")),r.setAttribute&&r.removeAttribute&&(r.setAttribute(e,""),a=i(r[e],"function"),i(r[e],"undefined")||(r[e]=n),r.removeAttribute(e))),r=null,a}var o={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),O={}.hasOwnProperty;u=i(O,"undefined")||i(O.call,"undefined")?function(e,t){return t in e&&i(e.constructor.prototype[t],"undefined")}:function(e,t){return O.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=A.call(arguments,1),o=function(){if(this instanceof o){var i=function(){};i.prototype=t.prototype;var r=new i,a=t.apply(r,n.concat(A.call(arguments)));return Object(a)===a?a:r}return t.apply(e,n.concat(A.call(arguments)))};return o}),$.csstransforms=function(){return!!d("transform")},$.csstransforms3d=function(){var e=!!d("perspective");return e&&"webkitPerspective"in h.style&&P("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},$.csstransitions=function(){return d("transition")};for(var T in $)u($,T)&&(c=T.toLowerCase(),p[c]=$[T](),C.push((p[c]?"":"no-")+c));return p.addTest=function(e,t){if("object"==typeof e)for(var o in e)u(e,o)&&p.addTest(o,e[o]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof enableClasses&&enableClasses&&(h.className+=" "+(t?"":"no-")+e),p[e]=t}return p},o(""),m=l=null,p._version=f,p._prefixes=b,p._domPrefixes=x,p._cssomPrefixes=w,p.hasEvent=S,p.testProp=function(e){return a([e])},p.testAllProps=d,p.testStyles=P,p.prefixed=function(e,t,n){return t?d(e,t,n):d(e,"pfx")},p}(this,this.document),function(e,t,n){function o(e){return"[object Function]"==m.call(e)}function i(e){return"string"==typeof e}function r(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function s(){var e=y.shift();b=1,e?e.t?h(function(){("c"==e.t?f.injectCss:f.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),s()):b=0}function d(e,n,o,i,r,d,l){function c(t){if(!p&&a(u.readyState)&&(g.r=p=1,!b&&s(),u.onload=u.onreadystatechange=null,t)){"img"!=e&&h(function(){x.removeChild(u)},50);for(var o in S[n])S[n].hasOwnProperty(o)&&S[n][o].onload()}}var l=l||f.errorTimeout,u=t.createElement(e),p=0,m=0,g={t:o,s:n,e:r,a:d,x:l};1===S[n]&&(m=1,S[n]=[]),"object"==e?u.data=n:(u.src=n,u.type=e),u.width=u.height="0",u.onerror=u.onload=u.onreadystatechange=function(){c.call(this,m)},y.splice(i,0,g),"img"!=e&&(m||2===S[n]?(x.insertBefore(u,w?null:v),h(c,l)):S[n].push(u))}function l(e,t,n,o,r){return b=0,t=t||"j",i(e)?d("c"==t?C:$,e,t,this.i++,n,o,r):(y.splice(this.i++,0,e),1==y.length&&s()),this}function c(){var e=f;return e.loader={load:l,i:0},e}var u,f,p=t.documentElement,h=e.setTimeout,v=t.getElementsByTagName("script")[0],m={}.toString,y=[],b=0,g="MozAppearance"in p.style,w=g&&!!t.createRange().compareNode,x=w?p:v.parentNode,p=e.opera&&"[object Opera]"==m.call(e.opera),p=!!t.attachEvent&&!p,$=g?"object":p?"script":"img",C=p?"script":$,A=Array.isArray||function(e){return"[object Array]"==m.call(e)},P=[],S={},O={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};f=function(e){function t(e){var t,n,o,e=e.split("!"),i=P.length,r=e.pop(),a=e.length,r={url:r,origUrl:r,prefixes:e};for(n=0;a>n;n++)o=e[n].split("="),(t=O[o.shift()])&&(r=t(r,o));for(n=0;i>n;n++)r=P[n](r);return r}function a(e,i,r,a,s){var d=t(e),l=d.autoCallback;d.url.split(".").pop().split("?").shift(),d.bypass||(i&&(i=o(i)?i:i[e]||i[a]||i[e.split("/").pop().split("?")[0]]),d.instead?d.instead(e,i,r,a,s):(S[d.url]?d.noexec=!0:S[d.url]=1,r.load(d.url,d.forceCSS||!d.forceJS&&"css"==d.url.split(".").pop().split("?").shift()?"c":n,d.noexec,d.attrs,d.timeout),(o(i)||o(l))&&r.load(function(){c(),i&&i(d.origUrl,s,a),l&&l(d.origUrl,s,a),S[d.url]=2})))}function s(e,t){function n(e,n){if(e){if(i(e))n||(u=function(){var e=[].slice.call(arguments);f.apply(this,e),p()}),a(e,u,t,0,l);else if(Object(e)===e)for(d in s=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(d)&&(!n&&!--s&&(o(u)?u=function(){var e=[].slice.call(arguments);f.apply(this,e),p()}:u[d]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(f[d])),a(e[d],u,t,d,l))}else!n&&p()}var s,d,l=!!e.test,c=e.load||e.both,u=e.callback||r,f=u,p=e.complete||r;n(l?e.yep:e.nope,!!c),c&&n(c)}var d,l,u=this.yepnope.loader;if(i(e))a(e,0,u,0);else if(A(e))for(d=0;d<e.length;d++)l=e[d],i(l)?a(l,0,u,0):A(l)?f(l):Object(l)===l&&s(l,u);else Object(e)===e&&s(e,u)},f.addPrefix=function(e,t){O[e]=t},f.addFilter=function(e){P.push(e)},f.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",u=function(){t.removeEventListener("DOMContentLoaded",u,0),t.readyState="complete"},0)),e.yepnope=c(),e.yepnope.executeStack=s,e.yepnope.injectJs=function(e,n,o,i,d,l){var c,u,p=t.createElement("script"),i=i||f.errorTimeout;p.src=e;for(u in o)p.setAttribute(u,o[u]);n=l?s:n||r,p.onreadystatechange=p.onload=function(){!c&&a(p.readyState)&&(c=1,n(),p.onload=p.onreadystatechange=null)},h(function(){c||(c=1,n(1))},i),d?p.onload():v.parentNode.insertBefore(p,v)},e.yepnope.injectCss=function(e,n,o,i,a,d){var l,i=t.createElement("link"),n=d?s:n||r;i.href=e,i.rel="stylesheet",i.type="text/css";for(l in o)i.setAttribute(l,o[l]);a||(v.parentNode.insertBefore(i,v),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},/*
 * searchua
 * version: 0.1.0
 * lastupdate: 2014-01-20
 * author: Masaki Hongo
 * git: https://github.com/masakihongo/searchUA
 * license: MIT
 */
!function(e,t){"use strict";e.ua={};var n=e.ua;n.name=e.navigator.userAgent.toLowerCase(),n.isIE=n.name.indexOf("msie")>=0||n.name.indexOf("trident")>=0,n.isiPhone=n.name.indexOf("iphone")>=0,n.isiPod=n.name.indexOf("ipod")>=0,n.isiPad=n.name.indexOf("ipad")>=0,n.isiOS=n.isiPhone||n.isiPod||n.isiPad,n.isAndroid=n.name.indexOf("android")>=0,n.isTablet=n.isiPad||n.isAndroid&&n.name.indexOf("mobile")<0,n.isIE&&(n.verArray=/(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(n.name),n.verArray&&(n.ver=parseInt(n.verArray[2],10))),n.isiOS&&(n.verArray=/(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(n.name),n.verArray&&(n.ver=parseInt(n.verArray[2],10))),n.isAndroid&&(n.verArray=/(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(n.name),n.verArray&&(n.ver=parseInt(n.verArray[2],10))),n.isIE&&t("body").addClass("ie ie_"+n.ver),n.isiPhone&&t("body").addClass("iPhone"),n.isiPod&&t("body").addClass("iPod"),n.isiPad&&t("body").addClass("iPad"),n.isiOS&&t("body").addClass("iOS iOS_"+n.ver),n.isAndroid&&t("body").addClass("android android_"+n.ver),n.isTablet&&t("body").addClass("tablet")}(this,jQuery),ua.isIE&&$("body").addClass("ie ie_"+ua.ver),ua.isiPhone&&$("body").addClass("iPhone"),ua.isiPod&&$("body").addClass("iPod"),ua.isiPad&&$("body").addClass("iPad"),ua.isiOS&&$("body").addClass("iOS iOS_"+ua.ver),ua.isAndroid&&$("body").addClass("android android_"+ua.ver),ua.isTablet&&$("body").addClass("tablet"),function(e,t,n){"use strict";e.HoverDir=function(t,n){this.$el=e(n),this._init(t)},
// the options
e.HoverDir.defaults={speed:300,easing:"ease",hoverDelay:0,inverse:!1},e.HoverDir.prototype={_init:function(t){
// options
this.options=e.extend(!0,{},e.HoverDir.defaults,t),
// transition properties
this.transitionProp="all "+this.options.speed+"ms "+this.options.easing,
// support for CSS transitions
this.support=Modernizr.csstransitions,
// load the events
this._loadEvents()},_loadEvents:function(){var t=this;this.$el.on("mouseenter.hoverdir, mouseleave.hoverdir",function(n){var o=e(this),i=o.find("div"),r=t._getDir(o,{x:n.pageX,y:n.pageY}),a=t._getStyle(r);"mouseenter"===n.type?(i.hide().css(a.from),clearTimeout(t.tmhover),t.tmhover=setTimeout(function(){i.show(0,function(){var n=e(this);t.support&&n.css("transition",t.transitionProp),t._applyAnimation(n,a.to,t.options.speed)})},t.options.hoverDelay)):(t.support&&i.css("transition",t.transitionProp),clearTimeout(t.tmhover),t._applyAnimation(i,a.from,t.options.speed))})},
// credits : http://stackoverflow.com/a/3647634
_getDir:function(e,t){
// the width and height of the current div
var n=e.width(),o=e.height(),
// calculate the x and y to get an angle to the center of the div from that x and y.
// gets the x value relative to the center of the DIV and "normalize" it
i=(t.x-e.offset().left-n/2)*(n>o?o/n:1),r=(t.y-e.offset().top-o/2)*(o>n?n/o:1),
// the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
// first calculate the angle of the point,
// add 180 deg to get rid of the negative values
// divide by 90 to get the quadrant
// add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
a=Math.round((Math.atan2(r,i)*(180/Math.PI)+180)/90+3)%4;return a},_getStyle:function(e){var t,n,o={left:"0px",top:"-100%"},i={left:"0px",top:"100%"},r={left:"-100%",top:"0px"},a={left:"100%",top:"0px"},s={top:"0px"},d={left:"0px"};switch(e){case 0:
// from top
t=this.options.inverse?i:o,n=s;break;case 1:
// from right
t=this.options.inverse?r:a,n=d;break;case 2:
// from bottom
t=this.options.inverse?o:i,n=s;break;case 3:
// from left
t=this.options.inverse?a:r,n=d}return{from:t,to:n}},
// apply a transition or fallback to jquery animate based on Modernizr.csstransitions support
_applyAnimation:function(t,n,o){e.fn.applyStyle=this.support?e.fn.css:e.fn.animate,t.stop().applyStyle(n,e.extend(!0,[],{duration:o+"ms"}))}};var o=function(e){t.console&&t.console.error(e)};e.fn.hoverdir=function(t){var n=e.data(this,"hoverdir");if("string"==typeof t){var i=Array.prototype.slice.call(arguments,1);this.each(function(){return n?e.isFunction(n[t])&&"_"!==t.charAt(0)?void n[t].apply(n,i):void o("no such method '"+t+"' for hoverdir instance"):void o("cannot call methods on hoverdir prior to initialization; attempted to call method '"+t+"'")})}else this.each(function(){n?n._init():n=e.data(this,"hoverdir",new e.HoverDir(t,this))});return n}}(jQuery,window),/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
function(e){e.fn.fitText=function(t,n){
// Setup options
var o=t||1,i=e.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},n);return this.each(function(){
// Store the object
var t=e(this),n=function(){t.css("font-size",Math.max(Math.min(t.width()/(10*o),parseFloat(i.maxFontSize)),parseFloat(i.minFontSize)))};
// Call once to set.
n(),
// Call on resize. Opera debounces their resize by default.
e(window).on("resize.fittext orientationchange.fittext",n)})}}(jQuery),window.onload=function(){$(function(){$(".pre-loader").fadeOut(1e3)})},
// fit text
// $("#key-visual h1").fitText(1.4);
// colorful
// $('.top-title strong').addClass('colorful');
// $(".colorful").children().addBack().contents().each(function(){
// 	if (this.nodeType == 3) {
// 		var $this = $(this);
// 		$this.replaceWith($this.text().replace(/(\S)/g, "<span>$&</span>"));
// 	}
// });
//hover fade
$("a img, .fade").hover(function(){$(this).stop().fadeTo(200,.6)},function(){$(this).stop().fadeTo(200,1)}),
// scroll blocks
$('a[href*="#"]').click(function(e){if(!$(this).hasClass("noscr")){e.preventDefault();var t=this.href,n=t.split("#"),o=n[1],i=$("#"+o).offset(),r=i.top;$("html, body").animate({scrollTop:r-60},700,"linear")}}),
// video
"undefined"!=typeof window.orientation&&($("video").remove(),$(".screen").addClass("device-bg"));
// scroll top
var topBtn=$(".pagetop");topBtn.hide(),$(window).scroll(function(){$(this).scrollTop()>1e3?topBtn.fadeIn():topBtn.fadeOut()}),topBtn.click(function(){return $("body,html").animate({scrollTop:0},700),!1}),
// social button
$("#social-btn > li").hover(function(){$(this).find(".popSns").show()},function(){$(this).find(".popSns").hide()}),$(window).scroll(function(){$(window).scrollTop()>450?header.addClass("header-scroll"):header.removeClass("header-scroll")});var scrollBottom,infoBottom=$(".bottom-fixed");$(window).on("load scroll resize",getScrollTop),
// event hover
$(".event-lineup-box li").each(function(){$(this).hoverdir()});
// header
var header=$("header");$(window).scroll(function(){$(window).scrollTop()>450?header.addClass("header-scroll"):header.removeClass("header-scroll")}),
// accordion
window.onload(function(){var e=$(".sp-nav ul");
// spNav.hide();
$(".sp-nav small").on("click",function(){e.slideToggle(200)})});