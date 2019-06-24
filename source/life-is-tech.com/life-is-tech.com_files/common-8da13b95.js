/*
 * searchua
 * version: 0.1.0
 * lastupdate: 2014-01-20
 * author: Masaki Hongo
 * git: https://github.com/masakihongo/searchUA
 * license: MIT
 */
!function(e,i){"use strict";e.ua={};var o=e.ua;o.name=e.navigator.userAgent.toLowerCase(),o.isIE=o.name.indexOf("msie")>=0||o.name.indexOf("trident")>=0,o.isiPhone=o.name.indexOf("iphone")>=0,o.isiPod=o.name.indexOf("ipod")>=0,o.isiPad=o.name.indexOf("ipad")>=0,o.isiOS=o.isiPhone||o.isiPod||o.isiPad,o.isAndroid=o.name.indexOf("android")>=0,o.isTablet=o.isiPad||o.isAndroid&&o.name.indexOf("mobile")<0,o.isIE&&(o.verArray=/(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(o.name),o.verArray&&(o.ver=parseInt(o.verArray[2],10))),o.isiOS&&(o.verArray=/(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(o.name),o.verArray&&(o.ver=parseInt(o.verArray[2],10))),o.isAndroid&&(o.verArray=/(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(o.name),o.verArray&&(o.ver=parseInt(o.verArray[2],10))),o.isIE&&i("body").addClass("ie ie_"+o.ver),o.isiPhone&&i("body").addClass("iPhone"),o.isiPod&&i("body").addClass("iPod"),o.isiPad&&i("body").addClass("iPad"),o.isiOS&&i("body").addClass("iOS iOS_"+o.ver),o.isAndroid&&i("body").addClass("android android_"+o.ver),o.isTablet&&i("body").addClass("tablet")}(this,jQuery),ua.isIE&&$("body").addClass("ie ie_"+ua.ver),ua.isiPhone&&$("body").addClass("iPhone"),ua.isiPod&&$("body").addClass("iPod"),ua.isiPad&&$("body").addClass("iPad"),ua.isiOS&&$("body").addClass("iOS iOS_"+ua.ver),ua.isAndroid&&$("body").addClass("android android_"+ua.ver),ua.isTablet&&$("body").addClass("tablet");
// header
var header=$("header");$(window).scroll(function(){$(window).scrollTop()>300?header.addClass("header-scroll"):header.removeClass("header-scroll")}),
// video
"undefined"!=typeof window.orientation&&($("video").remove(),$(".screen").addClass("device-bg")),
// pre-loader
$(function(){$(".pre-loader").fadeOut(1e3)}),
// video muted
$("video").prop("muted",!0),
// hover fade
$("a img, .fade").hover(function(){$(this).stop().fadeTo(200,.6)},function(){$(this).stop().fadeTo(200,1)}),
// rollover
$(".rollover").mouseover(function(){$(this).attr("src",$(this).attr("src").replace(/^(.+)(\.[a-z]+)$/,"$1_on$2"))}).mouseout(function(){$(this).attr("src",$(this).attr("src").replace(/^(.+)_on(\.[a-z]+)$/,"$1$2"))}).each(function(){$("<img>").attr("src",$(this).attr("src").replace(/^(.+)(\.[a-z]+)$/,"$1_on$2"))}),
//side-nav
$(function(){
// scroll top
var e=$(".pagetop"),i=$(".side-entry"),o=$(".camp-side-nav"),t=$(".online-side-nav"),s=$(".school-side-nav");t.hide(),i.hide(),o.hide(),$(window).scroll(function(){$(this).scrollTop()>1e3?(i.fadeIn(),o.fadeIn(),t.fadeIn(),s.fadeIn()):(i.fadeOut(),o.fadeOut(),t.fadeOut(),s.fadeOut())}),e.click(function(){return $("body,html").animate({scrollTop:0},700),!1});var n=new Array(8);$("section").each(function(e,i){n[e]=$(this).offset().top}),console.log(n),$(document).scroll(function(e){for(var i=n.length-1;i>=0;i--)if(n[i]-70<$(document).scrollTop()){o.find("i").css("color","#000"),t.find("i").css("color","#000"),s.find("i").css("color","#000"),i>1&&8>i&&(o.find("i").eq(i-2).css("color","rgb(255, 76, 76)"),t.find("i").eq(i-1).css("color","#2E7EBD"),s.find("i").eq(i-1).css("color","#FBB03B"));break}})}),
// scroll
$(function(){$("a[href^=#]").click(function(){var e=1e3,i=$(this).attr("href"),o=$("#"==i||""==i?"html":i),t=o.offset().top;return $("body,html").animate({scrollTop:t-120},e,"swing"),!1})}),
// colorful
$(".top-title strong").addClass("colorful"),$("section > h1, .service-inner h1").addClass("colorful"),$(".colorful").children().addBack().contents().each(function(){if(3==this.nodeType){var e=$(this);e.replaceWith(e.text().replace(/(\S)/g,"<span>$&</span>"))}}),
// tabs
$(".tab > li").click(function(){var e=$(".tab > li").index(this);$(".content > li").css("display","none"),$(".content > li").eq(e).css({display:"block",overflow:"hidden"}),$(".tab > li").removeClass("active"),$(this).addClass("active")}),
// event hover
$(".event-current-list li").each(function(){$(this).hoverdir()}),
// lightbox
$("a.lightbox").click(function(){var e=920,i=500,o=Number($("body").width()/2-e/2),t=Number($("body").height()/2-i/2);window.open(this.rel,this.title,"width="+e+", height="+i+", scrollbars=1, left="+o+", top="+t)}),
// accordion
$(document).ready(function(){var e=$(".sp-nav ul");e.hide(),$(".sp-nav small").on("click",function(){e.slideToggle(200)})}),
//press
/**
 * jquery.hoverdir.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
function(e,i,o){"use strict";e.HoverDir=function(i,o){this.$el=e(o),this._init(i)},
// the options
e.HoverDir.defaults={speed:300,easing:"ease",hoverDelay:0,inverse:!1},e.HoverDir.prototype={_init:function(i){
// options
this.options=e.extend(!0,{},e.HoverDir.defaults,i),
// transition properties
this.transitionProp="all "+this.options.speed+"ms "+this.options.easing,
// support for CSS transitions
this.support=Modernizr.csstransitions,
// load the events
this._loadEvents()},_loadEvents:function(){var i=this;this.$el.on("mouseenter.hoverdir, mouseleave.hoverdir",function(o){var t=e(this),s=t.find("div"),n=i._getDir(t,{x:o.pageX,y:o.pageY}),a=i._getStyle(n);"mouseenter"===o.type?(s.hide().css(a.from),clearTimeout(i.tmhover),i.tmhover=setTimeout(function(){s.show(0,function(){var o=e(this);i.support&&o.css("transition",i.transitionProp),i._applyAnimation(o,a.to,i.options.speed)})},i.options.hoverDelay)):(i.support&&s.css("transition",i.transitionProp),clearTimeout(i.tmhover),i._applyAnimation(s,a.from,i.options.speed))})},
// credits : http://stackoverflow.com/a/3647634
_getDir:function(e,i){
// the width and height of the current div
var o=e.width(),t=e.height(),
// calculate the x and y to get an angle to the center of the div from that x and y.
// gets the x value relative to the center of the DIV and "normalize" it
s=(i.x-e.offset().left-o/2)*(o>t?t/o:1),n=(i.y-e.offset().top-t/2)*(t>o?o/t:1),
// the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
// first calculate the angle of the point,
// add 180 deg to get rid of the negative values
// divide by 90 to get the quadrant
// add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
a=Math.round((Math.atan2(n,s)*(180/Math.PI)+180)/90+3)%4;return a},_getStyle:function(e){var i,o,t={left:"0px",top:"-100%"},s={left:"0px",top:"100%"},n={left:"-100%",top:"0px"},a={left:"100%",top:"0px"},r={top:"0px"},d={left:"0px"};switch(e){case 0:
// from top
i=this.options.inverse?s:t,o=r;break;case 1:
// from right
i=this.options.inverse?n:a,o=d;break;case 2:
// from bottom
i=this.options.inverse?t:s,o=r;break;case 3:
// from left
i=this.options.inverse?a:n,o=d}return{from:i,to:o}},
// apply a transition or fallback to jquery animate based on Modernizr.csstransitions support
_applyAnimation:function(i,o,t){e.fn.applyStyle=this.support?e.fn.css:e.fn.animate,i.stop().applyStyle(o,e.extend(!0,[],{duration:t+"ms"}))}};var t=function(e){i.console&&i.console.error(e)};e.fn.hoverdir=function(i){var o=e.data(this,"hoverdir");if("string"==typeof i){var s=Array.prototype.slice.call(arguments,1);this.each(function(){return o?e.isFunction(o[i])&&"_"!==i.charAt(0)?void o[i].apply(o,s):void t("no such method '"+i+"' for hoverdir instance"):void t("cannot call methods on hoverdir prior to initialization; attempted to call method '"+i+"'")})}else this.each(function(){o?o._init():o=e.data(this,"hoverdir",new e.HoverDir(i,this))});return o}}(jQuery,window),$(function(){$(".view-materials").hide(),$(".license-agree").click(function(){return $(".license").fadeOut("slow"),$(".view-materials").show(),!1})});