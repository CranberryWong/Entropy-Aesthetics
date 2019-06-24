(function(window, document){
    if(!window.LDBlogCategorizePlugin){
        
        //Utility
        var $ = {
            bind: function(obj, type, fn){
                obj.addEventListener ?
                    obj.addEventListener(type, fn, false) :
                    obj.attachEvent('on'+type, fn);
            },
            get: function(id){
                return document.getElementById(id);
            },
            each: function(array, fn) {
                for ( var i = 0, l = array.length; i < l; i++ ) {
                    var r = fn(i, array[i], array);
                    if (r === false) {return;}
                }
            },
            map: function(array, fn){
                var res = [];
                $.each(array, function(i, v, a){
                    res.push(fn(i, v, a));
                });
                return res;
            },
            filter: function(array, fn){
                var res = [];
                $.each(array, function(i, v, a){
                    if(fn(i, v, a)){res.push(v)};
                });
                return res;
            },
            ready: function(fn){
                $.bind(window, 'load', fn);
            },
            hasClass: function (el, className) {
                var reg = new RegExp('(^|\\s+)' + className + '($|\\s+)');
                return reg.test(el.className);
            },
            addClass: function (el, className) {
                if ( !$.hasClass(el, className) ) {
                    el.className += ( el.className ? ' ' : '' ) + className;
                }
            },
            removeClass: function (el, className) {
                var reg = new RegExp('(^|\\s+)' + className + '($|\\s+)');
                el.className = el.className.replace(reg, ' ');
            },
            toggleClass: function (el, className) {
                $.hasClass(el, className)
                    ? $.removeClass(el, className)
                    : $.addClass(el, className);
            },
            find: function(el, tagName, className) {
                var c = el.getElementsByTagName(tagName || '*');
                if (className) {
                    return $.filter(c, function(_, e){
                        return $.hasClass(e, className);
                    });
                } else {
                    return c;
                }
            },
            show: function(el){
                el.style.display = 'block';
            },
            hide: function(el){
                el.style.display = 'none';
            }
        };

        window.LDBlogCategorizePlugin = function(pluginId){
            var self = this;
            self.pluginId = pluginId;
            $.ready(function(){self.init()});
        };
        
        LDBlogCategorizePlugin.prototype.init = function(){
            var self = this;

            var div = $.get('plugin-categorize-' + self.pluginId);
            var side = $.find(div, 'div', 'side')[0];
            var categories = $.find(side, 'div', 'sidebody');

            var hierarchy = (function(){
                var hierarchy = [];
                var current = null;
                $.each(categories, function(_, category){
                    var isParent = $.hasClass(category, 'category-parent');
                    if (isParent) {
                        current = {parent: category, children: []};
                        hierarchy.push(current);
                    } else {
                        current.children.push(category);
                    }
                });
                return hierarchy;
            })();
            $.each(hierarchy, function(i, h){
                var parent = h.parent;
                var children = h.children;
                var toggle = $.find(parent, 'a', 'category-toggle')[0];

                if (children.length === 0) {
                    $.hide(toggle);
                    return;
                }
                
                $.bind(toggle, 'click', function(){
                    var expanded = $.hasClass(toggle, 'expanded');
                    $.each(children, function(_, child){
                        $[expanded ? 'hide' : 'show'](child);
                    });
                    toggle.innerHTML = (expanded ? '[+]' : '[-]');
                    $.toggleClass(toggle, 'expanded');
                });
            });
        }
    }
    
})(window, document);
