!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){!function(){function t(){e.apply(this,arguments),this.storyElements=this.element.querySelectorAll("article.grid-module-story"),a(this.element,".hub-timestamp"),window.__bloomberg__.eventBus.subscribe("read-content",this.markRead.bind(this))}var e=n(2),r=n(3),o=n(5),i=n(6),a=n(7).relativeTimestamp;t.prototype.markRead=function(t){var e=Array.prototype.slice.call(this.storyElements);o(e,t,i).forEach(function(t){t.setAttribute("data-viewed",!0)})},r(document,"section.grid-module",t),window.__bloomberg__.eventBus.subscribe("zones-lazy-loaded",function(e){r(e.container,"section.grid-module",t)})}()},function(t,e){t.exports=function(t){this.element=t.element,this.element.setAttribute("data-bound","")}},function(t,e,n){var r=n(4);t.exports=function(t,e,n){var o=t.querySelectorAll(e);r(o,function(t){t.hasAttribute("data-bound")||new n({element:t})})}},function(t,e){function n(t,e,n){for(var r=0,o=t.length;r<o;++r)e.call(n,t[r],r)}t.exports=n},function(t,e){t.exports=function(t,e,n){var r=e.length;return t.filter(function(t){for(var o=0;o<r;o++)if(n(t,e[o]))return t})}},function(t,e){function n(t,e){var n;return(t.getAttribute("data-id")===e.id||t.getAttribute("data-bmmr-id")===e.id)&&(!(n=t.getAttribute("data-updated-at"))||new Date(n)<new Date(e.interactedAt))}t.exports=n},function(t,e){function n(t,e){for(var n=t.querySelectorAll(e),o=0;o<n.length;++o)r(n[o])}function r(t,e){if("ja"!==t.getAttribute("data-locale")){var n=new Date(t.dateTime),r=e?new Date(e):new Date,o=Math.round((r.getTime()-n.getTime())/1e3/60),i=Math.round(o/60),a=t.getAttribute("itemprop"),u="dateModified"===a?"updated ":"",c="";o<0||i>=4?c="":o>=0&&o<1?c=u+"less than a minute ago":1===o?c=u+"1 minute ago":o>1&&o<60?c=u+o+" minutes ago":o>=60&&i<2?c=u+"an hour ago":i>=2&&i<4&&(c=u+i+" hours ago"),t.innerHTML=c}}t.exports={relativeTimestamp:n,applyRelativeTimestamp:r}}]);