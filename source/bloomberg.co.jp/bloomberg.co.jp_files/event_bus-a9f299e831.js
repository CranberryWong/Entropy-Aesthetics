!function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var e={};t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="",t(t.s=0)}([function(n,t,e){n.exports=e(1)},function(n,t,e){!function(){var n=e(2);window.__bloomberg__.eventBus=window.__bloomberg__.eventBus||new n}()},function(n,t){function e(){this.handlers={},this.memory=[]}e.prototype.subscribe=function(n,t,e){e||(e={}),this.handlers[n]||(this.handlers[n]=[]),this.handlers[n].push(t),!1!==e.replay&&this.memory.filter(function(t){return t.namespace===n}).forEach(function(n){t(n.data)})},e.prototype.publish=function(n,t){this.memory.push({namespace:n,data:t}),this.handlers[n]&&this.handlers[n].forEach(function(n){n(t)})},e.prototype.unsubscribe=function(n,t){this.handlers[n]&&(this.handlers[n]=this.handlers[n].filter(function(n){return n!==t}))},n.exports=e}]);