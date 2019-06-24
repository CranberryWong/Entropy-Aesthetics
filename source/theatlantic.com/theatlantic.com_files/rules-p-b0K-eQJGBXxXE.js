/*
 Quantcast measurement tag
 Copyright (c) 2008-2018, Quantcast Corp.
*/
(function(h,f,e){var k=function(c){return c.replace(/^[\s\ufeff\xA0]+|[\s\ufeff\xA0]+$/g,"")},l=function(c,b){if(!b)return b;var d,a;d=-1!==c.toLowerCase().indexOf("tag")||-1!==c.toLowerCase().indexOf("keyword")||0===c.toLowerCase().indexOf("qc:");a=-1===c.toLowerCase().indexOf("tag")&&-1===c.toLowerCase().indexOf("keyword")&&0===c.toLowerCase().indexOf("qc:")?!1:!0;a&&(b=b.replace(/\.+/g," "));if(d){a=b.split(",");for(d=0;d<a.length;d++)a[d]=k(a[d]);return a}return k(b.replace(/,+/g," "))};f=function(c,
b,d){b=document.getElementsByTagName("meta");for(var a,f,g=[],e=0;e<b.length;e++)a=b[e],f=a.getAttribute("name")||a.getAttribute("property"),f==d&&(g=g.concat(l(d,a.getAttribute("content"))));0<g.length?c(g):c(!1)};e=function(c,b){var d=[],a;if("array"==={}.toString.call(b).match(/\s([a-zA-Z]+)/)[1].toLowerCase()){for(a=0;a<b.length;a++)d.push(c+"."+b[a]);return{labels:d.join(",")}}return{labels:c+"."+b}};__qc.apply(null,["rules",[h,null,[[e,"category"]],[[f,"exactmatch","article:tag"]]],[h,null,
[[e,"category"]],[[f,"exactmatch","article:section"]]]])})("p-b0K-eQJGBXxXE",window,document);