!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("promote-analytics-adapter",[],n):"object"==typeof exports?exports["promote-analytics-adapter"]=n():e["promote-analytics-adapter"]=n()}("undefined"!=typeof self?self:this,function(){return function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n.p="undefined"!=typeof window&&window.__STATICS_BASE_URL__||n.p,n(n.s=28)}([,,,function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.paramsMapper=function(e,n){var t=Object.keys(e);return 0===t.length?e:t.reduce(function(t,r){var o=n[r];return o&&(e[r]||0===e[r])&&(t[o]=e[r]),t},{})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.trackEvent=n.init=void 0;var r=t(7),o=new r.Adapter;n.init=function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).forEach(o.addChannel)},n.trackEvent=function(e,n,t){o.trackEvent(e,n,t)}},function(e,n,t){"use strict";function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(n,"__esModule",{value:!0}),n.channels=n.channelNames=void 0;var o,c=t(10),a=t(11),i=t(12),u=t(13),s=n.channelNames={FACEBOOK_PIXEL:"facebookPixel",GOOGLE_ANALYTICS:"googleAnalytics",GOOGLE_TAG_MANAGER:"googleTagManager",WIX_ANALYTICS:"wixAnalytics"};n.channels=(o={},r(o,s.FACEBOOK_PIXEL,c.channelEvents),r(o,s.GOOGLE_ANALYTICS,a.channelEvents),r(o,s.GOOGLE_TAG_MANAGER,i.channelEvents),r(o,s.WIX_ANALYTICS,u.channelEvents),o)},,function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0}),n.Adapter=void 0;var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),c=t(8),a=t(5);n.Adapter=function(){function e(){var n=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];r(this,e),this._channels=[],this.addChannel=function(e){n.isChannelAlreadyInit(e)||(n.isChannelPredefined(e)?n.populateChannelEvents(e):n.registerChannel(e),n.isChannelValid(e)&&n._channels.push(e))},this.trackEvent=function(e,t,r){(0,c.dispatchEvent)(n._channels,e,t,r)},this.isChannelAlreadyInit=function(e){return n._channels.some(function(n){return n.name===e.name})},t.forEach(this.addChannel)}return o(e,[{key:"isChannelPredefined",value:function(e){return a.channels[e.name]}},{key:"populateChannelEvents",value:function(e){e.events=a.channels[e.name]}},{key:"isChannelValid",value:function(e){var n=e.name,t=e.report,r=e.events&&Object.values(e.events).every(function(e){return"function"==typeof e});return n&&t&&r}},{key:"registerChannel",value:function(e){this.isChannelValid(e)&&(a.channels[e.name]=e.events)}}]),e}()},function(e,n,t){"use strict";function r(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.dispatchEvent=void 0;var o=t(9);n.dispatchEvent=function(e,n,t,c){e.forEach(function(e){(0,o.getArgumentsLists)(n,e,t,c).forEach(function(n){return e.report.apply(e,r(n))})})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.events={},n.getArgumentsLists=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return n.events[e]?n.events[e](t,r):[]}},function(e,n,t){"use strict";function r(e,n){var t={};for(var r in e)n.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}Object.defineProperty(n,"__esModule",{value:!0}),n.channelEvents=void 0;var o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},c=t(3),a={id:"id",price:"value",value:"value",revenue:"value",name:"content_name",category:"content_category",currency:"currency",content_ids:"content_ids",contents:"contents",type:"content_type",num_items:"num_items",quantity:"quantity",label:"content_name"},i=function(e){return(Number.parseFloat(e.tax)||0)+(Number.parseFloat(e.shipping)||0)+e.contents.reduce(function(e,n){return e+Number.parseFloat(n.item_price)*n.quantity},0)},u=function(e){return e.contents&&e.contents[0].currency},s=function(e){var n=e.type,t=void 0===n?"product":n,o=r(e,["type"]),s=Object.assign({},o,{type:t});return s.contents&&(s.contents=s.contents.map(function(e){return e.quantity=e.quantity||1,e.item_price=e.item_price||e.price||0,e}),s.price||s.value||s.revenue||(s.price=i(s).toString()),s.currency||(s.currency=u(s))),(0,c.paramsMapper)(s,a)},d=function(e){if(e.contents&&!e.num_items){var n=o({},e);return n.num_items=n.contents.reduce(function(e,n){return e+=n.quantity||1},0),n}return e},p={PageView:function(){return[["track","PageView"]]},ViewContent:function(e){var n=e.id,t=r(e,["id"]);return[["track","ViewContent",o({},s(t),{content_ids:[n]})]]},AddToCart:function(e){var n=e.id,t=r(e,["id"]);return[["track","AddToCart",o({},s(t),{content_ids:[n]})]]},InitiateCheckout:function(e){return[["track","InitiateCheckout",o({},s(d(e)),{content_ids:e.contents.map(function(e){return e.id})})]]},AddPaymentInfo:function(e){return[["track","AddPaymentInfo",o({},s(d(e)),{content_ids:e.contents.map(function(e){return e.id})})]]},Purchase:function(e){return[["track","Purchase",o({},s(d(e)),{content_ids:e.contents.map(function(e){return e.id})})]]},Lead:function(e){return[["track","Lead",(0,c.paramsMapper)(e,a)]]},CustomEvent:function(e){var n=e.event;return[["trackCustom",void 0===n?"customEvent":n,r(e,["event"])]]}};n.channelEvents=p},function(e,n,t){"use strict";function r(e,n){var t={};for(var r in e)n.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}Object.defineProperty(n,"__esModule",{value:!0}),n.channelEvents=void 0;var o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},c=t(3),a={price:"price",sku:"id",id:"id",currency:"currency",name:"name",category:"category",brand:"brand",variant:"variant",list:"list",quantity:"quantity",step:"step",option:"option",position:"position",coupon:"coupon",affiliation:"affiliation",revenue:"revenue",tax:"tax",shipping:"shipping"};!function(){for(var e=1;e<=200;e++)a["dimension"+e]="dimension"+e,a["metric"+e]="metric"+e}();var i={AddProductImpression:function(e){return[["require","ec"]].concat((e.contents||[]).map(function(e){return["ec:addImpression",(0,c.paramsMapper)(e,a)]})).concat([["send","event","Enhanced Ecommerce","Product Impressions",{nonInteraction:!0}]])},ClickProduct:function(e){var n=e.name?e.name:"(not set)",t=e.list?e.list:"(not set)";return[["require","ec"]].concat([["ec:addProduct",(0,c.paramsMapper)(e,a)]]).concat([["ec:setAction","click",{list:t}]]).concat([["send","event","Enhanced Ecommerce","Product Click",n]])},ViewContent:function(e){var n=e.name?e.name:"(not set)";return[["require","ec"]].concat([["ec:addImpression",(0,c.paramsMapper)(e,a)]]).concat([["ec:setAction","detail"]]).concat([["send","event","Enhanced Ecommerce","View Content",n,{nonInteraction:!0}]])},AddToCart:function(e){var n=e.name?e.name:"(not set)";return[["require","ec"]].concat([["ec:addProduct",(0,c.paramsMapper)(e,a)]]).concat([["ec:setAction","add"]]).concat([["send","event","Enhanced Ecommerce","Add to Cart",n]])},RemoveFromCart:function(e){var n=e.name?e.name:"(not set)";return[["require","ec"]].concat([["ec:addProduct",(0,c.paramsMapper)(e,a)]]).concat([["ec:setAction","remove"]]).concat([["send","event","Enhanced Ecommerce","Remove from Cart",n]])},InitiateCheckout:function(e){var n=(e.contents||[]).map(function(e){return["ec:addProduct",(0,c.paramsMapper)(e,a)]}),t=(0,c.paramsMapper)({step:e.step||1,option:e.option},a);return[["require","ec"]].concat(n).concat([["ec:setAction","checkout",t]]).concat([["send","event","Enhanced Ecommerce","Initiate Checkout"]])},AddPaymentInfo:function(e){return[["require","ec"]].concat([["ec:setAction","checkout_option",(0,c.paramsMapper)({step:e.step||2,option:e.option},a)]]).concat([["send","event","Enhanced Ecommerce","Add Payment Info"]])},CheckoutStep:function(e){var n=(0,c.paramsMapper)({step:e.step||3,option:e.option},a);return[["require","ec"]].concat([["ec:setAction","checkout_option",n]]).concat([["send","event","Enhanced Ecommerce","Checkout Step "+n.step]])},Purchase:function(e){var n=(e.contents||[]).map(function(e){return["ec:addProduct",(0,c.paramsMapper)(e,a)]}),t={};return["id","affiliation","revenue","tax","shipping","coupon"].forEach(function(n){return e[n]&&(t[n]=e[n])}),[["require","ec"]].concat(n).concat([["ec:setAction","purchase",(0,c.paramsMapper)(t,a)]]).concat([["send","event","Enhanced Ecommerce","Purchase"]])},Lead:function(e){var n=e.category,t=void 0===n?"Leads":n,r=e.action,o=void 0===r?"Submitted":r,c=e.label;return[["send","event",t,o,void 0===c?"New Lead":c]]},CustomEvent:function(e){var n=e.event,t=void 0===n?"customEvent":n,i=e.eventAction,u=r(e,["event","eventAction"]);return"pageview"===t.toLowerCase()?[["send","pageview",(0,c.paramsMapper)(u,a)]]:[["send","event",o({eventAction:i||t},u)]]}};n.channelEvents=i},function(e,n,t){"use strict";function r(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function o(e,n){var t={};for(var r in e)n.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}Object.defineProperty(n,"__esModule",{value:!0});var c=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},a={AddProductImpression:function(e){return[[[{event:"productImpression",ecommerce:{impressions:e.contents}}]]]},ClickProduct:function(e){var n=e.list;return[[[{event:"productClick",ecommerce:{click:{actionField:{list:void 0===n?"(not set)":n},products:[o(e,["list"])]}}}]]]},ViewContent:function(e){var n=e.list;return[[[{event:"viewContent",ecommerce:{detail:{actionField:{list:void 0===n?"(not set)":n},products:[o(e,["list"])]}}}]]]},AddToCart:function(e){return[[[{event:"addToCart",ecommerce:{add:{products:[e]}}}]]]},RemoveFromCart:function(e){return[[[{event:"removeFromCart",ecommerce:{remove:{products:[e]}}}]]]},InitiateCheckout:function(e){var n=e.contents,t=void 0===n?[]:n,o=e.step,c=void 0===o?1:o,a=e.option,i=[].concat(r(t));return[[[{event:"checkout",ecommerce:{checkout:{actionField:Object.assign({step:c},a&&{option:a}),products:i}}}]]]},AddPaymentInfo:function(e){var n=e.step,t=void 0===n?2:n,r=e.option;return[[[{event:"checkoutOption",ecommerce:{checkout_option:{actionField:Object.assign({step:t},r&&{option:r})}}}]]]},CheckoutStep:function(e){var n=e.step,t=void 0===n?3:n,r=e.option;return[[[{event:"checkoutOption",ecommerce:{checkout_option:{actionField:Object.assign({step:t},r&&{option:r})}}}]]]},Purchase:function(e){var n=e.contents,t=void 0===n?[]:n,c=o(e,["contents"]),a=[].concat(r(t)),i={};return["id","affiliation","revenue","tax","shipping","coupon"].forEach(function(e){return c[e]&&(i[e]=c[e])}),[[[{event:"purchase",ecommerce:{purchase:{actionField:i,products:a}}}]]]},Lead:function(){return[[[{event:"lead"}]]]},CustomEvent:function(e){var n=e.event,t=void 0===n?"customEvent":n,r=o(e,["event"]);return[[[c({event:t},r)]]]}};n.channelEvents=a},function(e,n,t){"use strict";function r(e,n){var t={};for(var r in e)n.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}function o(e){return e&&(""+e).replace(/\s/g,"")}function c(e){return Object.keys(e).reduce(function(n,t){var r=e[t];return"object"===(void 0===r?"undefined":s(r))&&(r instanceof Number||r instanceof Boolean||r instanceof String?r=r.valueOf():null!==r&&(r=JSON.stringify(r))),n[t]=r,n},{})}function a(e,n,t,r){var o={evt:e,evn:n,data:c(t)};return r&&(o.tbl=r),[[o]]}function i(e){return a("p",e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},arguments[2])}function u(e){return a("c",e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},arguments[2])}Object.defineProperty(n,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d={WAPageView:{name:"PageView",table:"page_views"},AddProductImpression:{table:"stores_events"},ClickProduct:{table:"stores_events"},ViewContent:{table:"stores_events"},AddToCart:{table:"stores_events"},RemoveFromCart:{table:"stores_events"},InitiateCheckout:{table:"stores_events"},AddPaymentInfo:{table:"stores_events"},Purchase:{table:"stores_events"},Lead:{name:function(e){return o(e.label)},table:"lead_events"}},p=Object.keys(d).reduce(function(e,n){var t=d[n],r=t.name,o=t.table;return e[n]=function(e){return"function"==typeof r&&(r=r(e)),i(r||n,e,o)},e},{CustomEvent:function(e){var n=e.event,t=e.targetTable;return u(n,r(e,["event","targetTable"]),t)}});n.channelEvents=p},,,,,,,,,,,,,,,function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.channelNames=n.api=void 0;var r=t(4),o=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}(r),c=t(5);n.api=o,n.channelNames=c.channelNames}])});
//# sourceMappingURL=analytics-event-adapter.bundle.min.js.map