/*
 ---------------------------------------
SCRIPTS - selectivizr, hoverint,easing, jNice
 ---------------------------------------
 */


/*!
 * selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms of the MIT license.
 * selectivizr.com
 */
(function(j){function A(a){return a.replace(B,h).replace(C,function(a,d,b){for(var a=b.split(","),b=0,e=a.length;b<e;b++){var s=D(a[b].replace(E,h).replace(F,h))+o,l=[];a[b]=s.replace(G,function(a,b,c,d,e){if(b){if(l.length>0){var a=l,f,e=s.substring(0,e).replace(H,i);if(e==i||e.charAt(e.length-1)==o)e+="*";try{f=t(e)}catch(k){}if(f){e=0;for(c=f.length;e<c;e++){for(var d=f[e],h=d.className,j=0,m=a.length;j<m;j++){var g=a[j];if(!RegExp("(^|\\s)"+g.className+"(\\s|$)").test(d.className)&&g.b&&(g.b===!0||g.b(d)===!0))h=u(h,g.className,!0)}d.className=h}}l=[]}return b}else{if(b=c?I(c):!v||v.test(d)?{className:w(d),b:!0}:null)return l.push(b),"."+b.className;return a}})}return d+a.join(",")})}function I(a){var c=!0,d=w(a.slice(1)),b=a.substring(0,5)==":not(",e,f;b&&(a=a.slice(5,-1));var l=a.indexOf("(");l>-1&&(a=a.substring(0,l));if(a.charAt(0)==":")switch(a.slice(1)){case "root":c=function(a){return b?a!=p:a==p};break;case "target":if(m==8){c=function(a){function c(){var d=location.hash,e=d.slice(1);return b?d==i||a.id!=e:d!=i&&a.id==e}k(j,"hashchange",function(){g(a,d,c())});return c()};break}return!1;case "checked":c=function(a){J.test(a.type)&&k(a,"propertychange",function(){event.propertyName=="checked"&&g(a,d,a.checked!==b)});return a.checked!==b};break;case "disabled":b=!b;case "enabled":c=function(c){if(K.test(c.tagName))return k(c,"propertychange",function(){event.propertyName=="$disabled"&&g(c,d,c.a===b)}),q.push(c),c.a=c.disabled,c.disabled===b;return a==":enabled"?b:!b};break;case "focus":e="focus",f="blur";case "hover":e||(e="mouseenter",f="mouseleave");c=function(a){k(a,b?f:e,function(){g(a,d,!0)});k(a,b?e:f,function(){g(a,d,!1)});return b};break;default:if(!L.test(a))return!1}return{className:d,b:c}}function w(a){return M+"-"+(m==6&&N?O++:a.replace(P,function(a){return a.charCodeAt(0)}))}function D(a){return a.replace(x,h).replace(Q,o)}function g(a,c,d){var b=a.className,c=u(b,c,d);if(c!=b)a.className=c,a.parentNode.className+=i}function u(a,c,d){var b=RegExp("(^|\\s)"+c+"(\\s|$)"),e=b.test(a);return d?e?a:a+o+c:e?a.replace(b,h).replace(x,h):a}function k(a,c,d){a.attachEvent("on"+c,d)}function r(a,c){if(/^https?:\/\//i.test(a))return c.substring(0,c.indexOf("/",8))==a.substring(0,a.indexOf("/",8))?a:null;if(a.charAt(0)=="/")return c.substring(0,c.indexOf("/",8))+a;var d=c.split(/[?#]/)[0];a.charAt(0)!="?"&&d.charAt(d.length-1)!="/"&&(d=d.substring(0,d.lastIndexOf("/")+1));return d+a}function y(a){if(a)return n.open("GET",a,!1),n.send(),(n.status==200?n.responseText:i).replace(R,i).replace(S,function(c,d,b,e,f){return y(r(b||f,a))}).replace(T,function(c,d,b){d=d||i;return" url("+d+r(b,a)+d+") "});return i}function U(){var a,c;a=f.getElementsByTagName("BASE");for(var d=a.length>0?a[0].href:f.location.href,b=0;b<f.styleSheets.length;b++)if(c=f.styleSheets[b],c.href!=i&&(a=r(c.href,d)))c.cssText=A(y(a));q.length>0&&setInterval(function(){for(var a=0,c=q.length;a<c;a++){var b=q[a];if(b.disabled!==b.a)b.disabled?(b.disabled=!1,b.a=!0,b.disabled=!0):b.a=b.disabled}},250)}if(!/*@cc_on!@*/true){var f=document,p=f.documentElement,n=function(){if(j.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){return null}}(),m=/MSIE (\d+)/.exec(navigator.userAgent)[1];if(!(f.compatMode!="CSS1Compat"||m<6||m>8||!n)){var z={NW:"*.Dom.select",MooTools:"$$",DOMAssistant:"*.$",Prototype:"$$",YAHOO:"*.util.Selector.query",Sizzle:"*",jQuery:"*",dojo:"*.query"},t,q=[],O=0,N=!0,M="slvzr",R=/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g,S=/@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))[^;]*;/g,T=/\burl\(\s*(["']?)(?!data:)([^"')]+)\1\s*\)/g,L=/^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,B=/:(:first-(?:line|letter))/g,C=/(^|})\s*([^\{]*?[\[:][^{]+)/g,G=/([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,H=/(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,P=/[^\w-]/g,K=/^(INPUT|SELECT|TEXTAREA|BUTTON)$/,J=/^(checkbox|radio)$/,v=m>6?/[\$\^*]=(['"])\1/:null,E=/([(\[+~])\s+/g,F=/\s+([)\]+~])/g,Q=/\s+/g,x=/^\s*((?:[\S\s]*\S)?)\s*$/,i="",o=" ",h="$1";(function(a,c){function d(){try{p.doScroll("left")}catch(a){setTimeout(d,50);return}b("poll")}function b(d){if(!(d.type=="readystatechange"&&f.readyState!="complete")&&((d.type=="load"?a:f).detachEvent("on"+d.type,b,!1),!e&&(e=!0)))c.call(a,d.type||d)}var e=!1,g=!0;if(f.readyState=="complete")c.call(a,i);else{if(f.createEventObject&&p.doScroll){try{g=!a.frameElement}catch(h){}g&&d()}k(f,"readystatechange",b);k(a,"load",b)}})(j,function(){for(var a in z){var c,d,b=j;if(j[a]){for(c=z[a].replace("*",a).split(".");(d=c.shift())&&(b=b[d]););if(typeof b=="function"){t=b;U();break}}}})}}})(this);


/*
* Copyright (C) 2009 Joel Sutherland
* Licenced under the MIT license
* http://www.newmediacampaigns.com/page/jquery-flickr-plugin
*
* Available tags for templates:
* title, link, date_taken, description, published, author, author_id, tags, image*
*/
(function(jQuery) {
    jQuery.fn.jflickrfeed = function(settings, callback) {
        settings = jQuery.extend(true, {
            flickrbase: 'http://api.flickr.com/services/feeds/',
            feedapi: 'photos_public.gne',
            limit: 20,
            qstrings: {
                lang: 'en-us',
                format: 'json',
                jsoncallback: '?'
            },
            cleanDescription: true,
            useTemplate: true,
            itemTemplate: '',
            itemCallback: function(){}
        }, settings);

        var url = settings.flickrbase + settings.feedapi + '?';
        var first = true;

        for(var key in settings.qstrings){
            if(!first)
                url += '&';
            url += key + '=' + settings.qstrings[key];
            first = false;
        }

        return jQuery(this).each(function(){
            var jQuerycontainer = jQuery(this);
            var container = this;
            jQuery.getJSON(url, function(data){
                jQuery.each(data.items, function(i,item){
                    if(i < settings.limit){

                        // Clean out the Flickr Description
                        if(settings.cleanDescription){
                            var regex = /<p>(.*?)<\/p>/g;
                            var input = item.description;
                            if(regex.test(input)) {
                                item.description = input.match(regex)[2]
                                if(item.description!=undefined)
                                    item.description = item.description.replace('<p>','').replace('</p>','');
                            }
                        }

                        // Add Image Sizes
                        // http://www.flickr.com/services/api/misc.urls.html
                        item['image_s'] = item.media.m.replace('_m', '_s');
                        item['image_t'] = item.media.m.replace('_m', '_t');
                        item['image_m'] = item.media.m.replace('_m', '_m');
                        item['image'] = item.media.m.replace('_m', '');
                        item['image_b'] = item.media.m.replace('_m', '_b');
                        delete item.media;

                        // Use Template
                        if(settings.useTemplate){
                            var template = settings.itemTemplate;
                            for(var key in item){
                                var rgx = new RegExp('{{' + key + '}}', 'g');
                                template = template.replace(rgx, item[key]);
                            }
                            jQuerycontainer.append(template)
                        }

                        //itemCallback
                        settings.itemCallback.call(container, item);
                    }
                });
                if(jQuery.isFunction(callback)){
                    callback.call(container, data);
                }
            });
        });
    }
})(jQuery);

    /*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright テつゥ 2008 George McGinley Smith
 * All rights reserved.
 *
*/

    jQuery.easing['jswing']=jQuery.easing['swing'];
    jQuery.extend(jQuery.easing,{
        def:'easeOutQuad',
        swing:function(x,t,b,c,d){
            return jQuery.easing[jQuery.easing.def](x,t,b,c,d)
        },
        easeInQuad:function(x,t,b,c,d){
            return c*(t/=d)*t+b
        },
        easeOutQuad:function(x,t,b,c,d){
            return-c*(t/=d)*(t-2)+b
        },
        easeInOutQuad:function(x,t,b,c,d){
            if((t/=d/2)<1)return c/2*t*t+b;
            return-c/2*((--t)*(t-2)-1)+b
        },
        easeInCubic:function(x,t,b,c,d){
            return c*(t/=d)*t*t+b
        },
        easeOutCubic:function(x,t,b,c,d){
            return c*((t=t/d-1)*t*t+1)+b
        },
        easeInOutCubic:function(x,t,b,c,d){
            if((t/=d/2)<1)return c/2*t*t*t+b;
            return c/2*((t-=2)*t*t+2)+b
        },
        easeInQuart:function(x,t,b,c,d){
            return c*(t/=d)*t*t*t+b
        },
        easeOutQuart:function(x,t,b,c,d){
            return-c*((t=t/d-1)*t*t*t-1)+b
        },
        easeInOutQuart:function(x,t,b,c,d){
            if((t/=d/2)<1)return c/2*t*t*t*t+b;
            return-c/2*((t-=2)*t*t*t-2)+b
        },
        easeInQuint:function(x,t,b,c,d){
            return c*(t/=d)*t*t*t*t+b
        },
        easeOutQuint:function(x,t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t+1)+b
        },
        easeInOutQuint:function(x,t,b,c,d){
            if((t/=d/2)<1)return c/2*t*t*t*t*t+b;
            return c/2*((t-=2)*t*t*t*t+2)+b
        },
        easeInSine:function(x,t,b,c,d){
            return-c*Math.cos(t/d*(Math.PI/2))+c+b
        },
        easeOutSine:function(x,t,b,c,d){
            return c*Math.sin(t/d*(Math.PI/2))+b
        },
        easeInOutSine:function(x,t,b,c,d){
            return-c/2*(Math.cos(Math.PI*t/d)-1)+b
        },
        easeInExpo:function(x,t,b,c,d){
            return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b
        },
        easeOutExpo:function(x,t,b,c,d){
            return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b
        },
        easeInOutExpo:function(x,t,b,c,d){
            if(t==0)return b;
            if(t==d)return b+c;
            if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;
            return c/2*(-Math.pow(2,-10*--t)+2)+b
        },
        easeInCirc:function(x,t,b,c,d){
            return-c*(Math.sqrt(1-(t/=d)*t)-1)+b
        },
        easeOutCirc:function(x,t,b,c,d){
            return c*Math.sqrt(1-(t=t/d-1)*t)+b
        },
        easeInOutCirc:function(x,t,b,c,d){
            if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;
            return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b
        },
        easeInElastic:function(x,t,b,c,d){
            var s=1.70158;
            var p=0;
            var a=c;
            if(t==0)return b;
            if((t/=d)==1)return b+c;
            if(!p)p=d*.3;
            if(a<Math.abs(c)){
                a=c;
                var s=p/4
            }else var s=p/(2*Math.PI)*Math.asin(c/a);
            return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b
        },
        easeOutElastic:function(x,t,b,c,d){
            var s=1.70158;
            var p=0;
            var a=c;
            if(t==0)return b;
            if((t/=d)==1)return b+c;
            if(!p)p=d*.3;
            if(a<Math.abs(c)){
                a=c;
                var s=p/4
            }else var s=p/(2*Math.PI)*Math.asin(c/a);
            return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b
        },
        easeInOutElastic:function(x,t,b,c,d){
            var s=1.70158;
            var p=0;
            var a=c;
            if(t==0)return b;
            if((t/=d/2)==2)return b+c;
            if(!p)p=d*(.3*1.5);
            if(a<Math.abs(c)){
                a=c;
                var s=p/4
            }else var s=p/(2*Math.PI)*Math.asin(c/a);
            if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
            return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b
        },
        easeInBack:function(x,t,b,c,d,s){
            if(s==undefined)s=1.70158;
            return c*(t/=d)*t*((s+1)*t-s)+b
        },
        easeOutBack:function(x,t,b,c,d,s){
            if(s==undefined)s=1.70158;
            return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b
        },
        easeInOutBack:function(x,t,b,c,d,s){
            if(s==undefined)s=1.70158;
            if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b
        },
        easeInBounce:function(x,t,b,c,d){
            return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b
        },
        easeOutBounce:function(x,t,b,c,d){
            if((t/=d)<(1/2.75)){
                return c*(7.5625*t*t)+b
            }else if(t<(2/2.75)){
                return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b
            }else if(t<(2.5/2.75)){
                return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b
            }else{
                return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b
            }
        },
        easeInOutBounce:function(x,t,b,c,d){
            if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;
            return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b
        }
    });

    /**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
    (function($){
        $.fn.hoverIntent=function(f,g){
            var cfg={
                sensitivity:7,
                interval:100,
                timeout:0
            };

            cfg=$.extend(cfg,g?{
                over:f,
                out:g
            }:f);
            var cX,cY,pX,pY;
            var track=function(ev){
                cX=ev.pageX;
                cY=ev.pageY
            };

            var compare=function(ev,ob){
                ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);
                if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){
                    $(ob).unbind("mousemove",track);
                    ob.hoverIntent_s=1;
                    return cfg.over.apply(ob,[ev])
                }else{
                    pX=cX;
                    pY=cY;
                    ob.hoverIntent_t=setTimeout(function(){
                        compare(ev,ob)
                    },cfg.interval)
                }
            };

            var delay=function(ev,ob){
                ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);
                ob.hoverIntent_s=0;
                return cfg.out.apply(ob,[ev])
            };

            var handleHover=function(e){
                var ev=jQuery.extend({},e);
                var ob=this;
                if(ob.hoverIntent_t){
                    ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)
                }
                if(e.type=="mouseenter"){
                    pX=ev.pageX;
                    pY=ev.pageY;
                    $(ob).bind("mousemove",track);
                    if(ob.hoverIntent_s!=1){
                        ob.hoverIntent_t=setTimeout(function(){
                            compare(ev,ob)
                        },cfg.interval)
                    }
                }else{
                    $(ob).unbind("mousemove",track);
                    if(ob.hoverIntent_s==1){
                        ob.hoverIntent_t=setTimeout(function(){
                            delay(ev,ob)
                        },cfg.timeout)
                    }
                }
            };

            return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)
        }
    })(jQuery);



    /*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

    (function($){
        $.fn.superfish = function(op){

            var sf = $.fn.superfish,
            c = sf.c,
            $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
            over = function(){
                var $$ = $(this), menu = getMenu($$);
                clearTimeout(menu.sfTimer);
                $$.showSuperfishUl().siblings().hideSuperfishUl();
            },
            out = function(){
                var $$ = $(this), menu = getMenu($$), o = sf.op;
                clearTimeout(menu.sfTimer);
                menu.sfTimer=setTimeout(function(){
                    o.retainPath=($.inArray($$[0],o.$path)>-1);
                    $$.hideSuperfishUl();
                    if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){
                        over.call(o.$path);
                    }
                },o.delay);
            },
            getMenu = function($menu){
                var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
                sf.op = sf.o[menu.serial];
                return menu;
            },
            addArrow = function($a){
                $a.addClass(c.anchorClass).append($arrow.clone());
            };

            return this.each(function() {
                var s = this.serial = sf.o.length;
                var o = $.extend({},sf.defaults,op);
                o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
                    $(this).addClass([o.hoverClass,c.bcClass].join(' '))
                    .filter('li:has(ul)').removeClass(o.pathClass);
                });
                sf.o[s] = sf.op = o;

                $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
                    if (o.autoArrows) addArrow( $('>a:first-child',this) );
                })
                .not('.'+c.bcClass)
                .hideSuperfishUl();

                var $a = $('a',this);
                $a.each(function(i){
                    var $li = $a.eq(i).parents('li');
                    $a.eq(i).focus(function(){
                        over.call($li);
                    }).blur(function(){
                        out.call($li);
                    });
                });
                o.onInit.call(this);

            }).each(function() {
                var menuClasses = [c.menuClass];
                if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
                $(this).addClass(menuClasses.join(' '));
            });
        };

        var sf = $.fn.superfish;
        sf.o = [];
        sf.op = {};
        sf.IE7fix = function(){
            var o = sf.op;
            if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
                this.toggleClass(sf.c.shadowClass+'-off');
        };
        sf.c = {
            bcClass     : 'sf-breadcrumb',
            menuClass   : 'sf-js-enabled',
            anchorClass : 'sf-with-ul',
            arrowClass  : 'sf-sub-indicator',
            shadowClass : 'sf-shadow'
        };
        sf.defaults = {
            hoverClass	: 'sfHover',
            pathClass	: 'overideThisToUse',
            pathLevels	: 1,
            delay		: 800,
            animation	: {
                opacity:'show'
            },
            speed		: 'normal',
            autoArrows	: true,
            dropShadows : true,
            disableHI	: false,		// true disables hoverIntent detection
            onInit		: function(){}, // callback functions
            onBeforeShow: function(){},
            onShow		: function(){},
            onHide		: function(){}
        };
        $.fn.extend({
            hideSuperfishUl : function(){
                var o = sf.op,
                not = (o.retainPath===true) ? o.$path : '';
                o.retainPath = false;
                var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
                .find('>ul').hide().css('visibility','hidden');
                o.onHide.call($ul);
                return this;
            },
            showSuperfishUl : function(){
                var o = sf.op,
                sh = sf.c.shadowClass+'-off',
                $ul = this.addClass(o.hoverClass)
                .find('>ul:hidden').css('visibility','visible');
                sf.IE7fix.call($ul);
                o.onBeforeShow.call($ul);
                $ul.animate(o.animation,o.speed,function(){
                    sf.IE7fix.call($ul);
                    o.onShow.call($ul);
                });
                return this;
            }
        });

    })(jQuery);

    (function(a){
        a.fn.supersubs=function(b){
            var c=a.extend({},a.fn.supersubs.defaults,b);
            return this.each(function(){
                var d=a(this);
                var e=a.meta?a.extend({},c,d.data()):c;
                var f=a('<li id="menu-fontsize">&#8212;</li>').css({
                    padding:0,
                    position:"absolute",
                    top:"-999em",
                    width:"auto"
                }).appendTo(d).width();
                a("#menu-fontsize").remove();
                $ULs=d.find("ul");
                $ULs.each(function(l){
                    var k=$ULs.eq(l);
                    var j=k.children();
                    var g=j.children("a");
                    var m=j.css("white-space","nowrap").css("float");
                    var h=k.add(j).add(g).css({
                        "float":"none",
                        width:"auto"
                        }).end().end()[0].clientWidth/f;
                    h+=e.extraWidth;
                    if(h>e.maxWidth){
                        h=e.maxWidth
                    }else{
                        if(h<e.minWidth){
                            h=e.minWidth
                        }
                    }
                    h+="em";
                    k.css("width",h);
                    j.css({
                        "float":m,
                        width:"100%",
                        "white-space":"normal"
                    }).each(function(){
                        var n=a(">ul",this);
                        var i=n.css("left")!==undefined?"left":"right";
                        n.css(i,h)
                    })
                })
            })
        };

        a.fn.supersubs.defaults={
            minWidth:9,
            maxWidth:25,
            extraWidth:0
        }
    })(jQuery);

    jQuery(document).ready(function(){
        jQuery("ul.sf-menu").supersubs({
            minWidth:    8,                                 // minimum width of sub-menus in em units
            maxWidth:    27,                                // maximum width of sub-menus in em units
            extraWidth:  1                                  // extra width can ensure lines don't sometimes turn over
        // due to slight rounding differences and font-family
        }).superfish({
            delay:       100,
            animation:   {
                opacity:'show',
                height:'show'
            },
            speed:       'fast',
            autoArrows:  true
        });
    });

    /*
 * jNice
 * version: 1.0 (11.26.08)
 * by Sean Mooney (sean@whitespace-creative.com)
 * Examples at: http://www.whitespace-creative.com/jquery/jnice/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * To Use: place in the head
 *  <link href="inc/style/jNice.css" rel="stylesheet" type="text/css" />
 *  <script type="text/javascript" src="inc/js/jquery.jNice.js"></script>
 *
 * And apply the jNice class to the form you want to style
 *
 * To Do: Add textareas, Add File upload
 *
 ******************************************** */
    eval(function(p,a,c,k,e,d){
        while(c--){
            if(k[c]){
                p=p.replace(new RegExp('\\b'+c+'\\b','g'),k[c])
            }
        }
        return p
    }('(3($){$.114.56=3(101){5 115=2;5 68=$.63.68;$(112).109(75);37 2.19(3(){$(\'14:111, 14:83, 14:59\',2).19(87);$(\'59\').43(3(){$(2).9(\'32\')}).45(3(){$(2).21(\'32\')});$(\'14:66:73, 14:125\',2).19(88);20(68){$(\'.58\').19(3(){$(2).9(\'122\').48(\'14\').31(\'29\',$(2).29()+11)})}$(\'14:80\',2).19(90);$(\'14:53\',2).19(84);$(\'78\',2).19(3(17){50(2,17)});$(2).121(\'83\',3(){5 82=3(){81(2)};119.120(82,10)});$(\'.49\').31({123:0})})};5 81=3(44){5 61;$(\'.30 78\',44).19(3(){61=(2.18<0)?0:2.18;$(\'34\',$(2).52()).19(3(){$(\'6:39(\'+61+\')\',2).33()})});$(\'6.51, 6.47\',44).21(\'22\');$(\'14:80, 14:53\',44).19(3(){20(2.23){$(\'6\',$(2).52()).9(\'22\')}})};5 84=3(){5 15=$(2).9(\'49\').54(\'<13 26="117 69"></13>\');5 8=15.52();5 6=$(\'<13 26="47"></13>\');8.113(6);6.33(3(){5 15=$(2).9(\'22\').28(\'14\').27(\'23\',57);$(\'14:53[41="\'+15.27(\'41\')+\'"]\').85(15).19(3(){$(2).27(\'23\',35).28(\'.47\').21(\'22\')});37 35});15.33(3(){20(2.23){5 15=$(2).28(\'.47\').9(\'22\').98();$(\'14:53[41="\'+15.27(\'41\')+\'"]\').85(15).19(3(){$(2).27(\'23\',35).28(\'.47\').21(\'22\')})}}).43(3(){6.9(\'32\')}).45(3(){6.21(\'32\')});20(2.23){6.9(\'22\')}};5 90=3(){5 15=$(2).9(\'49\').54(\'<13 26="69"></13>\');5 8=15.52().93(\'<13 26="51"></13>\');5 6=8.48(\'.51\').33(3(){5 6=$(2);5 14=6.28(\'14\')[0];20(14.23===57){14.23=35;6.21(\'22\')}89{14.23=57;6.9(\'22\')}37 35});15.33(3(){20(2.23){6.9(\'22\')}89{6.21(\'22\')}}).43(3(){6.9(\'32\')}).45(3(){6.21(\'32\')});20(2.23){$(\'.51\',8).9(\'22\')}};5 88=3(){5 15=$(2).9(\'143\').54(\'<25 26="58"><25 26="142"></25></25>\');5 8=15.74(\'.58\');15.43(3(){8.9(\'86\')}).45(3(){8.21(\'86\')})};5 87=3(){5 46=$(2).27(\'46\');$(2).145(\'<59 91="\'+2.91+\'" 41="\'+2.41+\'" 76="\'+2.76+\'" 26="\'+2.139+\'" 46="\'+46+\'"><13><13>\'+46+\'</13></13>\')};5 60=3(){$(\'.30 34:73\').65()};5 75=3(72){20($(72.140).74(\'.30\').103===0){60()}};5 50=3(16,17){5 12=$(16);17=17||12.31(\'42\')*1;17=(17)?17:0;12.54($(\'<25 26="69"></25>\').31({42:100-17}));5 29=12.29();12.9(\'49\').79(\'<25 26="30"><25><13 26="71"></13><13 26="77"></13></25><34></34></25>\');5 8=$(16).28(\'.30\').31({29:29+\'95\'});$(\'.71, .30 34\',8).29(29-$(\'.77\',8).29());20($.63.137&&96.63.134<7){12.79($(\'<107 131="135:\\\'\\\';" 136="0" 138="0" 133="132" 128="127" 129="-1" 130="0"></107>\').31({92:12.92()+4+\'95\'}))}55(16);$(\'25\',8).33(3(){5 24=$(2).28(\'34\');20(24.31(\'148\')==\'149\'){60()}24.147();5 102=($(\'6.36\',24).99().105-24.99().105);24.146({141:102});37 35});12.144(3(97){5 18=2.18;126(97.116){104 40:20(18<2.101.103-1){18+=1}70;104 38:20(18>0){18-=1}70;110:37;70}$(\'34 6\',8).21(\'36\').39(18).9(\'36\');$(\'13:39(0)\',8).64($(\'94:39(\'+18+\')\',12).27(\'36\',\'36\').66());37 35}).43(3(){8.9(\'32\')}).45(3(){8.21(\'32\')})};5 55=3(16){5 12=$(16);5 8=12.28(\'.30\');5 24=8.48(\'34\').48(\'67\').108().98().65();$(\'94\',12).19(3(15){24.93(\'<67><6 118="#" 17="\'+15+\'">\'+2.66+\'</6></67>\')});24.48(\'6\').33(3(){$(\'6.36\',8).21(\'36\');$(2).9(\'36\');20(12[0].18!=$(2).27(\'17\')&&12[0].106){12[0].18=$(2).27(\'17\');12[0].106()}12[0].18=$(2).27(\'17\');$(\'13:39(0)\',8).64($(2).64());24.65();37 35});$(\'6:39(\'+12[0].18+\')\',24).33()};5 62=3(16){5 42=$(16).28(\'.30\').31(\'42\');$(16).31({42:42}).21(\'49\');$(16).28(\'.30\').108()};$.56={50:3(16,17){50(16,17)},62:3(16){62(16)},55:3(16){55(16)}};$(3(){$(\'.124-44\').56()})})(96);',10,150,'||this|function||var|a||w|addClass|||s|span|input|i|element|index|selectedIndex|each|if|removeClass|jNiceChecked|checked|u|div|class|attr|siblings|width|jNiceSelectWrapper|css|jNiceFocus|click|ul|false|selected|return||eq||name|zIndex|focus|form|blur|value|jNiceRadio|find|jNiceHidden|SelectAdd|jNiceCheckbox|parent|radio|wrap|SelectUpdate|jNice|true|jNiceInputWrapper|button|SelectHide|sel|SelectRemove|browser|html|hide|text|li|safari|jNiceWrapper|break|jNiceSelectText|event|visible|parents|checkExternalClick|type|jNiceSelectOpen|select|after|checkbox|Reset|action|reset|RadioAdd|not|jNiceInputWrapper_hover|ButtonAdd|TextAdd|else|CheckAdd|id|height|append|option|px|jQuery|e|end|offset||options|offSet|length|case|top|onchange|iframe|remove|mousedown|default|submit|document|prepend|fn|self|keyCode|jRadioWrapper|href|window|setTimeout|bind|jNiceSafari|opacity|wpcf7|password|switch|no|scrolling|tabIndex|frameborder|src|bottom|align|version|javascript|marginwidth|msie|marginheight|className|target|scrollTop|jNiceInputInner|jNiceInput|keydown|replaceWith|animate|slideToggle|display|none'.split('|')))


    /*
 ---------------------------------------
PRETTYPHOTO ACTIVATION
 ---------------------------------------
 */

    jQuery.noConflict();
    jQuery(document).ready(function(jQuery) {
        var thumbnails = 'a:has(img)[href$=".bmp"],a:has(img)[href$=".gif"],a:has(img)[href$=".jpg"],a:has(img)[href$=".jpeg"],a:has(img)[href$=".png"],a:has(img)[href$=".BMP"],a:has(img)[href$=".GIF"],a:has(img)[href$=".JPG"],a:has(img)[href$=".JPEG"],a:has(img)[href$=".PNG"]';
        jQuery(thumbnails).attr({
            rel: function() {
                aParent = jQuery(this).parent().parent().attr('id');
                if(aParent=='replace') {
                    return 'prettyPhoto[gallery]'
                } else {
                    return 'prettyPhoto[mixed]'
                }
            },
            title: function() {
                aTitle = jQuery(this).attr('title');
                if(aTitle=='') {
                    return jQuery(this).find('img').attr('alt')
                }
            }
        });
				/*
        jQuery("a[rel^='prettyPhoto']").prettyPhoto({
            animationSpeed: 'normal',
            padding: 40,
            opacity: 0.8,
            showTitle: true,
            social_tools: false,
            allowresize: true,
            autoplay_slideshow:false,
            overlay_gallery: false
        });
				*/
    });


    /*
 ---------------------------------------
 TOGGLE EFFECT
 ---------------------------------------
 */

    jQuery(document).ready(function(){
        jQuery(".toggle_container").hide();
        jQuery("h3.trigger").click(function(){
            jQuery(this).toggleClass("active").next().slideToggle("normal");
            return false;
        });
    });

    /*
 ---------------------------------------
HOMEPAGE FORM SLIDE PANEL
 ---------------------------------------
 */
jQuery("#carousel-wrapper").hover(
    function() {
        jQuery("#carousel-left", this).stop().animate({ left: "20px", opacity: "1" }, 400);
        jQuery("#carousel-right", this).stop().animate({ right: "20px", opacity: "1" }, 400);
    },
    function() {
        jQuery("#carousel-left", this).stop().animate({ left: "-50px", opacity: "0" }, 400);
        jQuery("#carousel-right", this).stop().animate({ right: "-50px", opacity: "0" }, 400);
    });

    jQuery(".sf-menu li li a").hover(
        function() {
            jQuery(this).stop().animate({
                paddingLeft: "1.8em"
            }, 400);
        },
        function() {
            jQuery(this).stop().animate({
                paddingLeft: "1.1em"
            }, 400);
        });

    jQuery(".thumbnail, .featured-image").hover(
        function() {
            jQuery('.excerpt', this).stop().animate({
                left: "-100%"
            }, 300);
            jQuery('.button', this).stop().animate({
                top: "50%"
            }, 300);
            jQuery('img', this).stop().animate({
                opacity: ".3"
            }, 400);
        },
        function() {
            jQuery('.excerpt', this).stop().animate({
                left: "10px"
            }, 200);
            jQuery('.button', this).stop().animate({
                top: "-100%"
            }, 300);
            jQuery('img', this).stop().animate({
                opacity: "1"
            }, 200);
        });

    jQuery(".remained-folio-items").hover(
        function() {
            jQuery('.r-f img', this).stop().animate({
                left: "0"
            }, 400);
        },
        function() {
            jQuery('.r-f img', this).stop().animate({
                left: "-100%"
            }, 200);
        });


    /*
 ---------------------------------------
RESPONSIVE MENU
 ---------------------------------------
 */

jQuery("<div id=\"responsive-menu\"><select /></div><div id=\"pulldownBtn\"></div>").appendTo("nav");

// Create default option "Go to..."
jQuery("<option />", {
   "selected": "selected",
   "value"   : "",
   "text"    : "ページを選択"
}).appendTo("nav select");

// Populate dropdown with menu items
jQuery("nav a").each(function() {
 var el = jQuery(this);
 jQuery("<option />", {
     "value"   : el.attr("href"),
     "text"    : el.text()
 }).appendTo("nav select");
});
        jQuery("nav select").change(function() {
            window.location = jQuery(this).find("option:selected").val();
        });


