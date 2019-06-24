//Generated:2018-06-28 17:11:12
// 39-497
(function(){
    var o = {
    $: function(el) {
        var x = el || o.divID, p = {
            o: o
        };
        p.y = typeof x === 'string' ? o.w.document.getElementById(x) : x;
        return new o.$Base(p);
    },
    $Base: function(p) {
        var $o = this;
        this.$ = true;
        this.o = p.o;
        p.y = p.y || {};
        this.target = p.y.$ ? p.y.target : p.y;
        this.style = p.y.style || {};
        this.parent = function() {
            if ($o.target.parentNode && $o.target.parentNode !== p.o.w.document) {
                return p.o.$($o.target.parentNode);
            } else {
                return $o;
            }
        };
        this.hash = function() {
            return 1;
        };
        this.alignTo = function(ob) {
            if (ob.$ && ob.target) {
                ob = ob.target;
            }
            p.y.style.left = p.o.$(ob).x() + 'px';
            p.y.style.top = p.o.$(ob).y() + 'px';
            return $o;
        };
        this.x = function() {
            return p.o.getAbsLeft(this.target);
        };
        this.y = function() {
            return p.o.getAbsTop(this.target);
        };
        this.getStyle = function(style) {
            var x = window.getComputedStyle ? window.getComputedStyle($o.target, '') : $o.target.currentStyle;
            if (x != null) {
                try {
                    return x[style];
                } catch (e) {
                    return 'auto';
                }
            } else {
                return x;
            }
        };
    },
    addEventListener: function(type, func) {
        if (typeof o.eventListeners[type] === 'undefined') {
            o.eventListeners[type] = [];
        }
        if (typeof func === 'function') {
            o.eventListeners[type].unshift(func);
        }
        if (type === 'adonpage' && o.adDisplayed || type === 'adready' && o.adReady) {
            func.call(o);
        }
    },
    addVClick: function(ct) {
        var pubClick = o.decode(o.qs('click', ''));
        var encodeCount = o.encodeClickCount;
        if (encodeCount && pubClick) {
            while (encodeCount--) {
                ct = encodeURIComponent(ct);
            }
        } else if (pubClick && o.inApp) {
            if (/^mopubnativebrowser:\/\//.test(pubClick)) {
                ct = encodeURIComponent(encodeURIComponent(ct));
            } else {
                ct = encodeURIComponent(ct);
            }
        }
        return pubClick + ct;
    },
    appendScriptToHead: function(scr) {
        var div = o.$().target, newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = scr;
        div.appendChild(newScript);
    },
    bver: function(b, p) {
        p = p || 'appVersion';
        var str, wpr = /android|ios|ip(?:ad|hone|od)/gi;
        if (!o.navigator) {
            if (/Windows Phone/.test(navigator.appVersion)) {
                o.navigator = {
                    appVersion: navigator.appVersion.replace(wpr, ''),
                    userAgent: navigator.userAgent.replace(wpr, '')
                };
            } else {
                o.navigator = {};
            }
        }
        str = (o.navigator || {})[p] || navigator[p];
        return b instanceof RegExp ? b.test(str) : str.toLowerCase().indexOf(b.toLowerCase()) >= 0;
    },
    compareVersions: function(a, b) {
        if (!this.adReady) {
            return 1;
        }
        a = a.split('.');
        b = b.split('.');
        for (var i = 0; i < 3; i++) {
            if ((+a[i] || 0) > (+b[i] || 0)) {
                return 1;
            }
            if ((+a[i] || 0) < (+b[i] || 0)) {
                return -1;
            }
        }
        return 0;
    },
    convertUrlProtocol: function(url) {
        url = String(url);
        if (o.secure) {
            return 'https:' + url.substring(url.indexOf('/'), url.length);
        }
        return url;
    },
    decode: function(str) {
        try {
            return decodeURIComponent(str);
        } catch (e) {
            return unescape(str);
        }
    },
    dispatchEvent: function(type, msg) {
        if (typeof o.eventListeners[type] !== 'undefined') {
            var i = o.eventListeners[type].length;
            while (i--) {
                o.eventListeners[type][i].call(o, msg);
            }
        }
        if (type === 'adonpage' || type === 'backup') {
            o.adDisplayed = true;
        }
    },
    getAbsLeft: function(id) {
        return id.getBoundingClientRect().left + (window.scrollX != null ? window.scrollX : window.pageXOffset != null ? window.pageXOffset : document.documentElement.scrollLeft);
    },
    getAbsTop: function(id) {
        return id.getBoundingClientRect().top + (window.scrollY != null ? window.scrollY : window.pageYOffset != null ? window.pageYOffset : document.documentElement.scrollTop);
    },
    insertParam: function(str, insert) {
        if (typeof str === 'string' && insert.value !== '') {
            str = str.replace('/?', '/?' + insert.param + '=' + insert.value + '&');
        }
        return str;
    },
    listen: function(element, type, callback) {
        this.cachedEvents.push([ element, type, callback ]);
        if (typeof window.addEventListener !== 'undefined') {
            element.addEventListener(type, callback, false);
            return function(el, ev, cb) {
                el.addEventListener(ev, cb, false);
            };
        } else {
            element.attachEvent('on' + type, callback, false);
            return function(el, ev, cb) {
                el.attachEvent('on' + ev, cb, false);
            };
        }
    },
    macSaf: function() {
        return o.is.mac && o.is.safari && !o.is.chrome;
    },
    modifyClicks: function() {
        var i, j, clicks = o.clickTags.slice(0), insert = [ {
            param: 'ft_custom',
            value: window['ftCustom_' + o.pID] || ''
        }, {
            param: 'ft_section',
            value: window['ftSection_' + o.pID] || ''
        }, {
            param: 'ft_id',
            value: o.ftId ? o.ftId : ''
        }, {
            param: 'ft_impID',
            value: o.ftImpId ? o.ftImpId : ''
        }, {
            param: 'ft_agentEnv',
            value: o.qs('ft_agentEnv') && o.qs('ft_agentEnv') !== '0' ? o.qs('ft_agentEnv') : ''
        } ];
        for (i = clicks.length; i--; ) {
            if (clicks[i]) {
                j = insert.length;
                while (j--) {
                    clicks[i] = o.insertParam(clicks[i], insert[j]);
                }
                clicks[i] = o.replaceMacros(clicks[i], true);
            }
        }
        j = insert.length;
        while (j--) {
            o.altimghref = o.altImgHref = o.insertParam(o.altimghref || o.altImgHref, insert[j]);
        }
        o.altimghref = o.altImgHref = o.replaceMacros(o.altimghref || o.altImgHref, true);
        return clicks;
    },
    once: function(type, func) {
        var newFunc = function(e) {
            var i = o.eventListeners[type].length;
            func.call(o, e);
            while (i--) {
                if (o.eventListeners[type][i] === newFunc) {
                    o.eventListeners[type].splice(i, 1);
                }
            }
        };
        o.addEventListener(type, newFunc);
    },
    outputExtExpTrack: function() {
        var et = this.decode(this.qs("ftExpTrack", ""));
        if (et && !o.expandTracked) {
            new Image().src = o.replaceMacros(et);
            o.expandTracked = true;
        }
    },
    outputExternals: function() {
        var i = o.exttrack.length;
        function outputPixel(p) {
            if (p) {
                new Image().src = o.replaceMacros(p);
            }
        }
        while (i--) {
            outputPixel(o.exttrack[i]);
        }
    },
    parseURL: function(url) {
        var a;
        if (url) {
            a = document.createElement('a');
            a.href = url || '';
        } else {
            a = {
                search: ''
            };
        }
        return {
            domain: a.hostname || '',
            hash: a.hash || '',
            host: a.host || '',
            hostname: a.hostname || '',
            href: a.href || '',
            query: a.search.substring(1, a.search.length) || '',
            path: a.pathname || '',
            pathname: a.pathname || '',
            port: a.port || '',
            protocol: a.protocol || '',
            search: a.search || ''
        };
    },
    protocolSwitch: function() {
        var t, i;
        if (o.secure) {
            for (i = o.switchArray.length; i--; ) {
                t = o[o.switchArray[i]];
                if (!t) {
                    continue;
                }
                o[o.switchArray[i]] = t.replace('http:', 'https:');
            }
        }
    },
    pubPos: function() {
        var centre = o.centreAd ? 'margin:0 auto;' : '', str = o.attachtobody ? 'absolute;' : 'relative;' + centre, x = o.qs('ftx', ''), y = o.qs('fty', ''), z = o.qs('ftadz', '');
        if (x !== '' || y !== '') {
            str = 'absolute;';
            str += x ? 'left:' + x + 'px;' : '';
            str += y ? 'top:' + y + 'px;' : '';
        }
        if (z !== '') {
            str += 'z-index:' + z + ';';
        }
        return str;
    },
    random: function(x) {
        x = x || 1e9;
        return Math.floor(Math.random() * x);
    },
    removeListener: function(element, type, callback) {
        if (element.addEventListener) {
            element.removeEventListener(type, callback, false);
        } else {
            element.detachEvent('on' + type, callback, false);
        }
    },
    replaceMacros: function(str, cb) {
        var noCache, hasRandom, map = {
            TIMESTAMP: window['ftTimestamp_' + o.pID],
            GUID: window['ftGUID_' + o.pID],
            IDFA: o.ftId,
            RANDOM: o.random(),
            CONFID: window['ftConfID_' + o.pID],
            NOCACHEBUSTER: '',
            IMPRESSIONID: o.ftImpId,
            PROTOCOL: o.secure ? 'https' : 'http'
        }, allMacros = /(?:\[|%5B|%255B)(%|%25|%2525)?(?:FT_)?(\w+)\1(?:\]|%5D|%255D)/gi, replacer = function($0, d, macro) {
            macro = macro.toUpperCase();
            if (macro === 'NOCACHEBUSTER') {
                noCache = true;
            }
            if (macro === 'RANDOM' && noCache !== false) {
                hasRandom = true;
                return $0;
            }
            return map.hasOwnProperty(macro) ? map[macro] : $0;
        };
        str = str.replace(allMacros, replacer);
        noCache = !!noCache;
        if (!noCache && hasRandom) {
            str = str.replace(allMacros, replacer);
        }
        return str + (noCache || hasRandom || cb ? '' : (str.indexOf('?') !== -1 ? '&' : '?') + o.random());
    },
    setupLoadListener: function() {
        var w = o.w, f = function() {
            o.dispatchEvent('load');
        };
        if (o.is('ie', '<10')) {
            if (o.advload) {
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState === 'complete') {
                        f();
                    }
                });
            } else {
                w.attachEvent('onload', f);
            }
        } else {
            w.addEventListener(o.advload ? 'DOMContentLoaded' : 'load', f, false);
        }
    },
    setupPageVisibility: function() {
        var prevVis, prevFocus, focus, blurTimeout, checkBlur = true, w = function() {
            if (o.mayExpand) {
                return o.w;
            } else if (o.w !== window.parent) {
                try {
                    return typeof o.w.parent.document.body.style.cssText === 'string' && o.w.parent;
                } catch (e) {
                    return o.w;
                }
            }
            return o.w;
        }(), document = w.document, prop = 'hidden';
        function onchange(evt) {
            var type = (evt || w.event).type, map = {
                focus: 'yes',
                blur: 'maybe',
                focusin: 'yes',
                focusout: 'maybe'
            }, vis = document[prop] ? 'no' : map.hasOwnProperty(type) ? map[type] : 'yes';
            if (o.pageVisible !== vis) {
                o.pageVisible = vis;
                o.dispatchEvent('visibilitychange', vis);
                if (o.dispatchToCreative) {
                    o.dispatchToCreative('visibilitychange', vis);
                }
            }
            if (prevVis !== (vis !== 'no')) {
                prevVis = checkBlur = vis !== 'no';
                o.dispatchEvent('viewableChange', prevVis);
                if (o.api) {
                    o.api.dispatchEvent('viewableChange', prevVis);
                }
                if (checkBlur) {
                    clearTimeout(blurTimeout);
                    blurTimeout = setTimeout(blurCheck, 100);
                }
            }
        }
        function blurCheck() {
            var evt = {};
            if (checkBlur && typeof w.document.hasFocus !== 'undefined') {
                focus = w.document.hasFocus() || o.w.document.hasFocus();
                if (focus !== prevFocus) {
                    prevFocus = focus;
                    evt.type = focus ? 'focus' : 'blur';
                    onchange(evt);
                }
                clearTimeout(blurTimeout);
                blurTimeout = setTimeout(blurCheck, 100);
            }
        }
        if (prop in document) {
            o.listen(document, 'visibilitychange', onchange);
        } else if ('mozHidden' in document) {
            prop = 'mozHidden';
            o.listen(document, 'mozvisibilitychange', onchange);
        } else if ('webkitHidden' in document) {
            prop = 'webkitHidden';
            o.listen(document, 'webkitvisibilitychange', onchange);
        }
        o.addEventListener('adonpage', function() {
            clearTimeout(blurTimeout);
            blurTimeout = setTimeout(blurCheck, 100);
            o.pageVisible = document[prop] ? 'no' : document.hasFocus && (document.hasFocus() || o.w.document.hasFocus()) ? 'yes' : 'maybe';
        });
        o.pageVisible = document[prop] ? 'no' : document.hasFocus && document.hasFocus() ? 'yes' : 'maybe';
    },
    setupQS: function(query) {
        var a = query.split('&');
        var q = {};
        var i = a.length;
        var fn = function(ref, def) {
            return q[ref] || def;
        };
        var f = function(s) {
            return o.decode(s);
        };
        var x;
        while (i--) {
            x = a[i].split('=');
            x[1] = x.slice(1).join('=');
            q[f(x[0])] = f(x[1]);
        }
        return window.qs && window.qs.get || fn;
    },
    setupResizeListener: function() {
        var f = function() {
            o.dispatchEvent('resize');
        };
        o.listen(o.w, 'resize', f);
    },
    adVisibilityListener: function() {
        var lastVisibility = 0;
        o.addEventListener('visibleAd', function(bool) {
            o.dispatchToCreative('ftAdVisible', bool ? 'visible' : 'undetectable');
        });
        o.addEventListener('advisibility', function(currentVisibility) {
            var visibility = {
                aboveThreshold: !!(currentVisibility && currentVisibility > o.viewableImpressionThreshold),
                undetectable: currentVisibility === false,
                percentInView: currentVisibility === false ? NaN : currentVisibility,
                shouldPlay: currentVisibility === false || currentVisibility >= o.viewableImpressionThreshold
            };
            if (currentVisibility !== lastVisibility) {
                o.dispatchToCreative('visibilityupdate', visibility);
            }
            lastVisibility = currentVisibility;
        });
    },
    addAPIFlashVars: function(ready) {
        o.flashVar('state', ready ? o.api.getState() : 'loading');
        o.flashVar('isViewable', ready ? o.api.isViewable() : false);
        if (o.mayExpand) {
            o.flashVar('orientation', ready ? o.api.getOrientation() : o.api.fallbackAPI.getOrientation());
            o.flashVar('maxWidth', ready ? o.api.getMaxSize().width : window['ftImp' + o.pID] && window['ftImp' + o.pID].wurfl ? window['ftImp' + o.pID].wurfl.maxWidth : window.innerWidth);
            o.flashVar('maxHeight', ready ? o.api.getMaxSize().height : window['ftImp' + o.pID] && window['ftImp' + o.pID].wurfl ? window['ftImp' + o.pID].wurfl.maxHeight : window.innerHeight);
        } else {
            o.flashVar('orientation', 0);
            o.flashVar('maxWidth', o.width);
            o.flashVar('maxHeight', o.height);
        }
    },
    addAPIListeners: function() {
        var orientationEventTarget = o.w, orientationEvent = 'orientationchange', time = [], checkOrientation = function() {
            if (o.api._ORIENTATION !== o.api.getOrientation()) {
                o.sendOrientation();
                if (o.is.ios) {
                    o.dispatchToCreative('maxsizechange', o.getSizeAndScale());
                }
            }
            if (!o.inApp) {
                if (o.goneFullscreen) {
                    o.fullPageResize(o.getSizeAndScale());
                }
                if (!o.is.ios) {
                    o.dispatchToCreative('maxsizechange', o.getSizeAndScale());
                }
            }
        };
        o.api.addEventListener('stateChange', function(arg) {
            o.dispatchToCreative('statechange', arg);
            if (arg === 'default' && /(resized|expanded)/.test(o.api._STATE)) {
                o.contract();
                if (o.compareVersions(o.ftVersion, '2.6')) {
                    o.dispatchToCreative('contract');
                }
            }
            o.api._STATE = arg;
        });
        if (o.is.ios && o.inApp === false && window.matchMedia) {
            window.addEventListener('pageshow', checkOrientation);
            window.matchMedia('(orientation:portrait)').addListener(function() {
                setTimeout(checkOrientation);
            });
        } else if (o.is.mobile || o.is.ios || o.is.android) {
            if (o.w.ScreenOrientation) {
                orientationEventTarget = o.w.screen.orientation;
                orientationEvent = 'change';
            } else if (o.w.screen.msOrientation) {
                orientationEventTarget = o.w;
                orientationEvent = 'orientationchange';
            } else if (o.w.screen.mozOrientation || o.w.screen.msOrientation) {
                orientationEventTarget = o.w.screen;
                orientationEvent = 'mozorientationchange';
            }
            o.listen(orientationEventTarget, orientationEvent, function() {
                var oCheck = function(e) {
                    if (!e || e.type === 'resize') {
                        checkOrientation();
                    }
                    o.removeListener(o.w, 'resize', o.checkOrientation, true);
                    clearTimeout(time.shift());
                };
                o.listen(o.w, 'resize', oCheck, true);
                time.push(setTimeout(oCheck, 30));
            }, false);
        }
        o.listen(o.w, 'resize', checkOrientation, true);
        if (/^2/.test(o.api.getVersion())) {
            o.api.addEventListener('sizeChange', function(width, height) {
                if (width.width) {
                    height = width.height;
                    width = width.width;
                }
                o.dispatchToCreative('maxsizechange', o.getSizeAndScale(width, height));
                o.sendOrientation(width, height);
            });
        }
        o.api.addEventListener('viewableChange', function(arg) {
            o.dispatchToCreative('viewablechange', arg);
        });
    },
    addListeners: function() {
        o.interactionManager();
        o.politeLoadSetup();
        o.adVisibilityListener();
        o.touchAbsorber(o.absorbSwipes);
        o.checkFocus();
        o.subloadSetup();
        o.addEventListener('expand', function(d) {
            if (o.ftVersion && o.compareVersions(o.ftVersion, '2.6') >= 0) {
                o.dispatchToCreative('expand', d);
            }
        });
        o.addEventListener('contract', function() {
            if (o.ftVersion && o.compareVersions(o.ftVersion, '2.6') >= 0) {
                o.dispatchToCreative('contract');
            }
        });
    },
    allowFullscreen: function(w) {
        try {
            var ifr = (w || window).frameElement;
            ifr.setAttribute('webkitallowfullscreen', '');
            ifr.setAttribute('mozallowfullscreen', '');
            ifr.setAttribute('allowfullscreen', '');
        } catch (e) {}
    },
    checkFocus: function() {
        var uA = navigator.userAgent;
        var resize = function() {
            if (/iP(ad|hone|od) OS .*?Safari/.test(uA) && !/CriOS/.test(uA) && parseInt(uA.split('OS')[1], 10) === 7) {
                if (o.w.document.hasFocus && !o.w.document.hasFocus()) {
                    setTimeout(resize, 50);
                } else if (o.w.document.hasFocus && o.goneFullscreen) {
                    o.sendOrientation();
                }
            }
        };
        o.listen(o.w, 'blur', function() {
            setTimeout(resize, 50);
        });
    },
    createFrame: function(allowScroll) {
        var ifr = document.createElement('iframe');
        ifr.width = o.width;
        ifr.height = o.height;
        ifr.frameBorder = 0;
        ifr.scrolling = allowScroll ? 'yes' : 'no';
        ifr.setAttribute('margin', '0');
        ifr.setAttribute('allowTransparency', 'true');
        ifr.setAttribute('webkitallowfullscreen', '');
        ifr.setAttribute('mozallowfullscreen', '');
        ifr.setAttribute('allowfullscreen', '');
        return ifr;
    },
    customPosition: function(customPosFunc) {
        o.customPos = true;
        o.customPosFunc = customPosFunc;
    },
    dispatchToCreative: function(ev, arg) {
        var send = function(event, args) {
            o.send(o.adWindow, {
                method: 'dispatch',
                msg: {
                    ev: event,
                    msg: args
                }
            });
        };
        if (o.adReady) {
            send(ev, arg);
        } else {
            o.once('adready', function() {
                send(ev, arg);
            });
        }
    },
    displayAd: function(fullAd) {
        var i = o.extscript.length;
        o.outputDiv(fullAd);
        if (fullAd) {
            o.adDiv = o.w.document.getElementById(o.divID);
            o.adFrame = o.w.document.getElementById(o.frameID);
            o.adWindow = o.adFrame.contentWindow;
        }
        o.addListeners();
        while (i--) {
            if (o.extscript[i] !== '') {
                o.appendScriptToHead(o.replaceMacros(o.extscript[i]));
            }
        }
        o.dispatchEvent('end');
    },
    fireEvent: function(id, val, extra) {
        var pixel = this.statBaseURL, random = Math.floor(Math.random() * 1e7);
        val = val || '0';
        extra = extra ? '-' + extra : '';
        pixel += +o.confID + '-' + id + '-' + val + '-' + o.GUID + '-' + random + extra;
        o.api.request(pixel, 'proxy');
    },
    flashVar: function() {
        var a = [], fv = o.fVarList, i, j;
        switch (arguments.length) {
          case 1:
            a = arguments[0].replace(/[&=]/g, '-__-').split('-__-');
            if (a.length > 1) {
                for (i = 0, j = a.length; i < j; i += 2) {
                    o.flashVar(a[i], a[i + 1]);
                }
            }
            break;

          case 2:
            fv[arguments[0]] = arguments[1];
            break;

          default:
            for (i in fv) {
                a.push(i + '=' + encodeURIComponent(fv[i]));
            }
            return a.join('&');
        }
    },
    getBackup: function(div) {
        this.backupDisplayed = true;
        o.altimghref = o.convertUrlProtocol(o.altimghref);
        var href = o.addVClick(o.altimghref), impression = o.insertParam(o.altImg, {
            param: "ft_creative",
            value: o.creativeID
        });
        impression = o.insertParam(impression, {
            param: "ft_configuration",
            value: window["ftConfID_" + o.pID]
        });
        div.innerHTML = '<a id="' + o.altImgID + '" href="' + href + '" style="display:inline-block" target="' + o.altImgTarget + '"><img sr' + 'c="' + impression + '?' + o.random() + '" alt="' + o.altText + '" style="width:' + o.width + 'px; height:' + o.height + 'px; border:0px"/></a>';
        return div;
    },
    getFSElement: function() {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    },
    getFrame: function(div) {
        var frame = o.createFrame(), assignSRC = function() {
            o.adFrame.src = o.file;
        };
        o.fVarList.name = frame.id = o.frameID;
        frame.name = JSON.stringify(o.fVarList);
        if (o.loadMethod === 'quickload') {
            frame.src = o.file;
        } else {
            frame.src = 'about:blank';
            if (o.is('ie', '<=8')) {
                o.loadMethod = 'full load';
            }
            if (o.loadMethod === 'DOMLoaded') {
                if (document.readyState === 'loading') {
                    o.listen(document, 'DOMContentLoaded', assignSRC);
                } else {
                    setTimeout(assignSRC, 0);
                }
            } else {
                if (document.readyState !== 'complete') {
                    o.listen(window, 'load', assignSRC);
                } else {
                    setTimeout(assignSRC, 0);
                }
            }
        }
        frame.style.visibility = 'hidden';
        div.appendChild(frame);
        return div;
    },
    getSizeAndScale: function(width, height) {
        var size = o.api.getMaxSize(), w = o.api.getOrientation(width, height), dw = document.documentElement.clientWidth, dh = document.documentElement.clientHeight;
        size.width = width || size.width;
        size.height = height || size.height;
        size.orientation = w === 270 ? 90 : w;
        size.scale = size.scale && !o.lockableOrientation && o.forceOrientation !== 'none' ? size.scale : 1;
        if (o.is.android) {
            if (size.width >= (w % 180 === 0 ? Math.min(dw, dh === o.height ? dw + 1 : dh) : Math.max(dw, dh)) * window.devicePixelRatio) {
                size.height /= window.devicePixelRatio;
                size.width /= window.devicePixelRatio;
            }
        }
        return size;
    },
    init: function() {
        var baggyFrame = (window.innerWidth || document.documentElement.offsetWidth) >= o.width + o.baggyFrameLimit && (window.innerHeight || document.documentElement.offsetHeight) >= o.height + o.baggyFrameLimit, fullAd = o.supportedBrowser(), renderAd = function() {
            o.displayAd(fullAd);
        }, apiState = o.setAPI();
        o.setup();
        o.onAPIReady(apiState);
        o.addAPIFlashVars(apiState);
        o.removeMargin(o.inApp || o.w !== window.top && !baggyFrame);
        o.outputExternals();
        o.dispatchEvent('start');
        if (fullAd) {
            o.adId = o.frameID;
            if (o.mayExpand && o.shouldBreakout && o.shouldBreakout(baggyFrame)) {
                return;
            }
            o.messageListen();
        } else {
            o.adId = o.altImgID;
        }
        o.setupPageVisibility();
        if (o.api.getState() === 'loading' && o.append) {
            o.api.addEventListener('ready', renderAd);
        } else {
            renderAd();
        }
    },
    interactionManager: function() {
        var minTime = 10, maxTime = 6e3, startTime = 0, mobile = o.is.mobile, extraTracking = o.tracking3rdParty.userEngagement, firstEvent = true, interactionTimeout;
        function over() {
            o.dispatchEvent('interaction');
            if (!mobile || !o.mayExpand || /^(?:expanded|resized)$/i.test(o.api.getState())) {
                startTime = new Date();
                if (firstEvent) {
                    interactionTimeout = setTimeout(function() {
                        o.fireEvent(o.event.INTERACTION);
                        if (extraTracking) {
                            o.api.request(o.replaceMacros(extraTracking));
                        }
                        firstEvent = false;
                    }, 1e3);
                }
            }
            o.send(o.adWindow, {
                method: 'dispatch',
                msg: 'rollover'
            });
        }
        function out() {
            if (interactionTimeout) {
                clearTimeout(interactionTimeout);
                interactionTimeout = null;
            }
            var endTime = new Date(), lastInteraction = Math.floor((endTime.getTime() - (startTime ? startTime.getTime() : 0)) / 100);
            if (lastInteraction >= minTime && startTime > 0) {
                lastInteraction = Math.min(lastInteraction, maxTime);
                o.fireEvent(o.event.INTERACTION_TIME, lastInteraction);
            }
            startTime = 0;
            o.send(o.adWindow, {
                method: 'dispatch',
                msg: 'rollout'
            });
        }
        function set() {
            o.adDiv = o.$().target;
            if (o.adDiv.id) {
                o.adFrame = o.backupDisplayed ? null : o.$(o.frameID).target;
                o.adWindow = o.adFrame ? o.adFrame.contentWindow : window;
                o.receiveMethod.interaction = function() {
                    if (!startTime) {
                        over();
                    }
                };
                o.receiveMethod.interactionComplete = function() {
                    out();
                };
                o.listen(o.adDiv, 'mouseover', over);
                o.listen(o.adDiv, 'mouseout', out);
                o.listen(o.w, 'beforeunload', out);
                if (!o.backupDisplayed) {
                    o.listen(o.w, 'touchstart', out);
                }
                if (mobile) {
                    o.listen(o.w, 'scroll', function() {
                        if (/(resiz|expand)ed/.test(o.api.getState()) === false) {
                            startTime = 0;
                            out();
                        }
                    });
                    o.addEventListener('contract', out);
                    o.addEventListener('clickthrough', out);
                    o.addEventListener('viewableChange', function(viewable) {
                        if (!viewable) {
                            out();
                        }
                    });
                }
            } else {
                setTimeout(set, 10);
            }
        }
        set();
    },
    messageListen: function() {
        o.listen(o.w, 'message', function(e) {
            o.receive(e);
        });
    },
    nuke: function() {
        var ad = o.$();
        o.contract();
        ad.parent().target.removeChild(ad.target);
        this.api.close();
        if (this.api.getState() === 'default') {
            this.api.close();
        }
        while (this.cachedEvents && this.cachedEvents.length) {
            var ev = this.cachedEvents.pop();
            this.removeListener.apply(this, ev);
        }
        o.dispatchEvent('nuke');
    },
    nullifySwipe: function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    },
    onAPIReady: function(apiState) {
        var ext = o.api.fallbackAPI !== o.api._BRIDGE;
        if (apiState === 'loading') {
            o.api.addEventListener('ready', function() {
                o.api._STATE = o.api.getState();
                o.api.processQueuedListeners();
                o.addAPIListeners(ext);
            });
        } else {
            o.addAPIListeners(ext);
        }
    },
    osmatch: function(b) {
        var blockedOs = b.slice(b.indexOf('-') + 1);
        return navigator.platform.toLowerCase().indexOf(blockedOs) > -1;
    },
    outputDiv: function(fullAd) {
        var phDiv = null, cssText = o.safeFrame ? 'width:100%;height:100%;position:absolute;' : 'width:' + o.width + 'px; height:' + o.height + 'px; position:' + o.pubPos(), div = document.createElement('div'), badWrite = !(document.write instanceof Function && ~document.write.toString().indexOf('[native code]'));
        div.style.cssText = cssText;
        div = fullAd ? o.getFrame(div) : o.getBackup(div);
        div.id = o.divID;
        if (o.adType == 'html_onpage' || !o.iframe && !o.attachtobody) {
            if (badWrite || o.append) {
                o.scriptLocation.parentNode.insertBefore(div, o.scriptLocation.parentNode.lastChild.nextSibling);
            } else {
                document.write(div.outerHTML);
            }
        } else {
            if (o.attachtobody) {
                phDiv = document.createElement('div');
                phDiv.id = o.phID;
                phDiv.style.cssText = cssText;
                if (o.iframe) {
                    frameElement.parentNode.insertBefore(phDiv, frameElement.nextSibling);
                    frameElement.style.display = 'none';
                } else if (badWrite || o.append) {
                    o.scriptLocation.parentNode.insertBefore(phDiv, o.scriptLocation.nextSibling);
                } else {
                    document.write(phDiv.outerHTML);
                }
                o.w.document.body.appendChild(div);
                o.phDiv = o.$(o.phID).target;
                o.$().alignTo(o.$(o.phID).target);
                if (o.customPos === false) {
                    o.addEventListener('resize', function() {
                        o.$().alignTo(o.$(o.phID).target);
                    });
                }
            } else {
                frameElement.parentNode.insertBefore(div, frameElement);
                frameElement.style.display = 'none';
            }
        }
        if (o.countOnDownload && !o.firedRenderedImpression) {
            new Image().src = o.replaceMacros(o.viewableImpressionURL);
            o.firedRenderedImpression = true;
        }
        if (o.customPos) {
            o.customPosFunc();
            o.addEventListener('adonpage', function() {
                o.customPosFunc();
                o.addEventListener('resize', o.customPosFunc);
            });
        }
        o.setupResizeListener();
        o.adDisplayed = true;
        o.adDiv = o.$().target;
        o.dispatchEvent('adonpage');
    },
    politeLoadSetup: function() {
        var sendPoliteLoadMsg = function() {
            o.dispatchToCreative('politeload');
        };
        if (document.readyState !== 'complete' && document.readyState !== 'loaded') {
            setTimeout(function() {
                o.politeLoadSetup();
            }, 15);
        } else {
            sendPoliteLoadMsg();
        }
    },
    receive: function(e) {
        var version, info, errorMsg, value;
        var error = false;
        if (!o.serveDOM || /^https?:\/\/[a-z0-9\-\.]*flashtalking\.(com|net|dev)/i.test(e.origin.toString()) || o.adWindow === e.source) {
            if (o.apiVersion && o.apiVersion.major === 0) {
                info = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
                if (info.msg.version) {
                    version = String(info.msg.version).split('.');
                    for (var i = 0; i < version.length; i++) {
                        o.apiVersion[!i ? 'major' : i === 1 ? 'minor' : 'patch'] = parseInt(version[i], 10) || 0;
                    }
                }
            }
            info = o.apiVersion && o.apiVersion.major >= 3 ? e.data : JSON.parse(e.data);
            if (info.method === 'ready' && info.msg.location.indexOf(o.file) > -1) {
                o.adWindow = e.source;
            }
            if (e.source === o.adWindow) {
                try {
                    value = o.receiveMethod[info.method].call(o, info.msg);
                } catch (err) {
                    error = true;
                    errorMsg = err.message;
                }
                if (o.apiVersion && o.apiVersion.major >= 3) {
                    o.send(e.source, {
                        correlationId: info.messageId,
                        isError: error,
                        value: value,
                        error: errorMsg
                    });
                }
            }
        }
    },
    receiveMethod: {
        ready: function(message) {
            var msg = {
                confID: o.confID,
                creativeID: o.creativeID,
                cID: o.cID,
                serveDOM: o.serveDOM,
                mvt: o.mvt,
                api: o.api._BRIDGE === o.api.fallbackAPI ? 'ft' : 'ext',
                guid: o.GUID
            };
            var i;
            o.adReady = true;
            if (o.compareVersions('' + message.version || '0', '2.9') < 0) {
                msg.clicks = o.clicks;
                for (i in o.fVarList) {
                    msg[i] = o.fVarList[i];
                }
            }
            if (document.addEventListener) {
                document.addEventListener('touchstart', function firstTouch() {
                    document.removeEventListener('touchstart', firstTouch, true);
                    o.send(o.adWindow, {
                        method: 'dispatch',
                        msg: 'firsttouch'
                    });
                }, true);
            }
            o.send(o.adWindow, {
                method: 'init',
                msg: msg
            });
            o.adFrame.style.visibility = '';
            o.ftVersion = String(message.version || '');
            o.dispatchEvent('adready', {
                ad: o.adWindow
            });
            if (o.inApp === false) {
                o.api.fallbackAPI._STATE = 'default';
                o.api.dispatchEvent('ready');
            }
        },
        tracker: function(message) {
            o.trackerManager(message);
        },
        expand: function(message) {
            o.expand(message);
        },
        contract: function(message) {
            if (o.mayExpand) {
                o.contract();
            }
        },
        open: function(message) {
            o.api.open(message);
        },
        destroy: function() {
            o.nuke();
        },
        nuke: function() {
            o.nuke();
        },
        mraidcustomclose: function(message) {
            o.api.useCustomClose(message);
        },
        clickthrough: function(message) {
            o.dispatchEvent('clickthrough', message);
        },
        click: function(msg) {
            var url = msg.url || o.clicks["clickTag" + (msg.clickTag || "")];
            o.api.open(url);
        },
        communicate: function(e) {
            var ftSharedObjectRef;
            try {
                ftSharedObjectRef = window.parent.ftSharedObject || window.ftSharedObject;
            } catch (ex) {
                ftSharedObjectRef = window.ftSharedObject;
            }
            if (e.type === "register") {
                this.name = e.name;
                ftSharedObjectRef.add(e.name, this);
            } else {
                ftSharedObjectRef.send(e.name, e.msg, this.name);
            }
        },
        preventSwipes: function(bool) {
            this.touchAbsorber(bool);
        },
        interaction: function() {},
        interactionComplete: function() {}
    },
    removeMargin: function(remove) {
        if (remove) {
            if (document.body) {
                document.body.style.margin = 0;
            } else {
                setTimeout(function() {
                    o.removeMargin(remove);
                }, 20);
            }
        }
    },
    send: function(targ, msg) {
        if (!targ || !targ.parent) {
            return;
        }
        targ.postMessage(this.apiVersion && this.apiVersion.major >= 3 ? msg : JSON.stringify(msg), '*');
    },
    sendOrientation: function(width, height) {
        var size = o.getSizeAndScale(width, height);
        if (o.goneFullscreen) {
            o.fullPageResize(size);
        }
        if (o.api._ORIENTATION !== size.orientation) {
            o.api._ORIENTATION = size.orientation;
            o.dispatchToCreative('orientationchange', size);
        }
    },
    setAPI: function() {
        var apiState = function() {
            o.api.fallbackAPI.ft = o;
            o.api._BRIDGE = o.api.bridge = o.api._BRIDGE || window.mraid || window.ormma || o.api.fallbackAPI;
            return o.api.getState();
        }();
        o.inApp = o.api._BRIDGE !== o.api.fallbackAPI;
        if (o.inApp) {
            o.noBreakout = true;
            o.setupViewport();
        } else if (o.safeFrame) {
            o.setSFEnvironment();
        }
        o.api.fallbackAPI._FT = o;
        o.api.fallbackAPI._STATE = 'default';
        return apiState;
    },
    setSFEnvironment: function() {
        var sl = document.querySelector('#ftscript_m' + o.pID);
        var ifr = o.createFrame(), ifrStyle = 'width:' + o.width + 'px; height:' + o.height + 'px; border:none;';
        window['ftImp' + o.pID] = window['ftImp' + o.pID] || {};
        window['ftImp' + o.pID].jsAppend = o.append = 1;
        ifr.id = o.frameID;
        ifr.style.cssText = ifrStyle;
        sl.parentNode.insertBefore(ifr, sl);
        o.w = ifr.contentWindow;
        o.w.document.open();
        o.w.document.write('<!DOCTYPE HTML><html><head></head><body style="margin:0;text-align:right;"><div id="ref"></div></body></html>');
        o.w.document.close();
        o.scriptLocation = o.w.document.getElementById('ref');
        o.addEventListener('end', function() {
            o._expand = o.expand;
            o._contract = o.contract;
            o.expand = function() {
                o._expand.apply(o, arguments);
                o.adDiv.style.position = 'absolute';
                o.adDiv.style.right = o.adDiv.style.top = 0;
                ifr.style.width = o.adFrame.style.width;
                ifr.style.height = o.adFrame.style.height;
            };
            o.contract = function() {
                o._contract.apply(o, arguments);
                ifr.style.cssText = ifrStyle;
            };
        });
        if (window.DARLA) {
            o.secure = true;
        }
    },
    setup: function() {
        var w = window, p = o.pID, noBreakout = !!o.safeFrame || o.adType.indexOf('expand') === -1 && !o.mayExpand;
        o.html_communication();
        o.qs = o.setupQS(o.params);
        o.confID = w['ftConfID_' + p] = w['ftConfID_' + p] || o.qs('ftcfid', '0');
        o.GUID = w['ftGUID_' + p] = w['ftGUID_' + p] || o.qs('ftguid', '99999999999999');
        o.timestamp = w['ftTimestamp_' + p] = w['ftTimestamp_' + p] || o.qs('fttime', '99999999999999');
        o.custom = w['ftCustom_' + p] = w['ftCustom_' + p] || o.qs('ftcustom', '');
        o.section = w['ftSection_' + p] = w['ftSection_' + p] || o.qs('ftsection', '');
        o.ftId = w['ftId_' + p] = w['ftId_' + p] || o.qs('ft_id', '');
        o.ftImpId = w['ftImp' + p] && w['ftImp' + p].impID || o.qs('ftimpid', '');
        if (o.ftImpId && w['ftImp' + p] && !w['ftImp' + p].impID) {
            w['ftImp' + p].impID = o.ftImpId;
        }
        o.noBreakout = noBreakout || o.noBreakout;
        o.attachtobody = noBreakout ? false : o.attachtobody;
        o.setupClickTags();
        o.protocolSwitch();
        o.setupFlashVars();
        if (o.safeFrame && typeof o.safeFrame.register === "function") {
            o.safeFrame.register(o.width, o.height);
        }
    },
    setupClickTags: function() {
        var i = o.clickTags.length;
        while (i--) {
            if (o.clickTags[i] != null) {
                o.clickTags[i] = o.convertUrlProtocol(o.clickTags[i]);
            }
        }
        var clicks = o.modifyClicks();
        i = clicks.length;
        while (i--) {
            if (o.clickTags[i] != null) {
                o.clicks['clickTag' + (i + 1)] = o.addVClick(clicks[i]);
            }
        }
        o.clicks.clickTag = o.clicks.clickTag1;
        o.flashVar('clicks', o.clicks);
    },
    setupFlashVars: function() {
        var i, w = window, p = o.pID, fvl = o.flashVarHolder, gfvl = o.gFlashVarList;
        for (i = fvl.length; i--; ) {
            if (o[fvl[i][1]]) {
                o.flashVar([ fvl[i][0] ], o[fvl[i][1]]);
            }
        }
        for (i = gfvl.length; i--; ) {
            if (w[gfvl[i][1] + p]) {
                o.flashVar([ gfvl[i][0] ], w[gfvl[i][1] + p]);
            }
        }
    },
    setupViewport: function() {
        var w = this.w || window;
        var head = w.document.getElementsByTagName('head')[0];
        var metas = w.document.getElementsByTagName('meta');
        var viewportMeta = w.document.createElement('meta');
        var i = metas.length;
        var viewportTagExists = false;
        while (i--) {
            if (metas[i].name === 'viewport') {
                viewportTagExists = true;
                break;
            }
        }
        if (!viewportTagExists) {
            if (!head) {
                head = w.document.createElement(head);
                w.document.body.parentElement.insertBefore(head, w.document.body);
            }
            viewportMeta.name = 'viewport';
            viewportMeta.content = 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1';
            head.insertBefore(viewportMeta, head.children[0]);
        }
    },
    subloadSetup: function() {
        var wait = 1e3, delayedDispatch = function(delay) {
            setTimeout(function() {
                o.dispatchToCreative("subload");
            }, delay);
        };
        if (document.readyState !== "loading") {
            if (window.performance) {
                var loadedEnd = window.performance.timing.domContentLoadedEventEnd;
                var diff = Date.now() - loadedEnd;
                if (diff >= wait) {
                    delayedDispatch(0);
                } else {
                    delayedDispatch(wait - diff);
                }
            } else {
                delayedDispatch(wait);
            }
        } else {
            o.listen(document, "DOMContentLoaded", function() {
                delayedDispatch(wait);
            });
        }
    },
    supportedBrowser: function() {
        var i = o.blockBrowsers.length, nameReg = /\D+/, numReg = /\d+/;
        function blocked(brow) {
            var browser = nameReg.exec(brow.substr(0, brow.indexOf('-'))) || nameReg.exec(brow), minimumVersion = numReg.test(brow) ? parseInt(numReg.exec(brow), 10) : Math.pow(2, 32), osRestrict = brow.indexOf('-') > 0 ? brow.slice(brow.indexOf('-') + 1) : '';
            if (browser) {
                browser = browser.toString();
            }
            if (o.is(browser, '<=' + minimumVersion) && (!osRestrict || osRestrict && o.is(osRestrict))) {
                return true;
            }
            return false;
        }
        if (typeof document.querySelector === 'undefined' || typeof window.postMessage === 'undefined' || o.forceBackup) {
            return false;
        }
        while (i--) {
            if (blocked(o.blockBrowsers[i].toLowerCase())) {
                return false;
            }
        }
        return true;
    },
    touchAbsorber: function(absorb) {
        if (absorb && !o.touchMoveDisabled) {
            o.listen(o.adDiv, 'touchmove', o.nullifySwipe);
            o.touchMoveDisabled = true;
            o.addEventListener('adready', function() {
                o.send(o.adWindow, {
                    method: 'absorbSwipes',
                    msg: true
                });
            });
        } else if (o.touchMoveDisabled && !absorb) {
            o.removeListener(o.adDiv, 'touchmove', o.nullifySwipe);
            o.touchMoveDisabled = false;
            o.addEventListener('adready', function() {
                o.send(o.adWindow, {
                    method: 'absorbSwipes',
                    msg: false
                });
            });
        }
    },
    trackerManager: function(e) {
        var ev = o.event, vid3rdParty = o.tracking3rdParty.videoQuartiles[e.event];
        switch (e.type) {
          case 'clickmap':
            o.fireEvent(ev.CLICKMAP, '0', e.x + 'x' + e.y);
            break;

          case 'custom':
            o.fireEvent(e.num, e.value, e.string);
            break;

          case 'video':
            if (vid3rdParty) {
                o.api.request(o.replaceMacros(vid3rdParty), 'proxy');
            }
            if (e.event === 'unmute') {
                if (!o.unmuteDispatched) {
                    o.unmuteDispatched = true;
                    o.fireEvent(ev.VIDEO[e.event]);
                }
            } else if (ev.VIDEO.hasOwnProperty(e.event)) {
                o.fireEvent(e.id + ev.VIDEO[e.event], e.duration);
            }
            break;

          default:
            if (typeof ev.extra[e.type] !== 'undefined') {
                ev.extra[e.type].call(o, e);
            }
            break;
        }
    },
    breakout: function() {
        var referrerURL = o.parseURL(document.referrer), d = referrerURL.host, qString = '?ifsrc=', r = '';
        if (o.iframe && d !== location.host && d !== '') {
            if (self.location.href.indexOf(o.ftlocal) > -1) {
                o.qs = function(a, b) {
                    return qs.get(a, b);
                };
            } else {
                if (o.secure) {
                    o.jsurl = o.jsurl.replace(/\bhttp:\/\/(cdn(?=\.flash)|video(?=\.flash)|stat(?=\.flash)|a(?=\.flash))/, 'https://cdn');
                }
                qString += encodeURIComponent(o.jsurl + '&' + o.params + o.wrapVars());
                r = referrerURL.protocol + '//' + d + '/' + o.ftlocal + qString;
                o.locationReplace(r);
                o.breakingOut = true;
                return true;
            }
        }
        return false;
    },
    contract: function() {
        var frame = o.$(this.frameID), expandTime = new Date(), expandCounter = o.expandCounter ? Math.floor((expandTime.getTime() - o.expandCounter.getTime()) / 100) : 0;
        frame.style.cssText = "";
        if (expandCounter >= 10) {
            o.fireEvent(o.event.EXPAND_TIME, expandCounter);
        }
        if (o.goneFullscreen) {
            o.setScroll(true);
            o.goneFullscreen = false;
            o.touchAbsorber(false);
        }
        o.forceOrientation = 'none';
        o.expandCounter = 0;
        if (/(resiz|expand)ed/.test(o.api.getState())) {
            o.api._STATE = 'default';
            o.api.close();
        }
        for (var i in o.cachedBodyStyles) {
            document.body.style[i] = o.cachedBodyStyles[i];
            delete o.cachedBodyStyles[i];
        }
        o.dispatchEvent("contract");
    },
    expand: function(dimensions) {
        dimensions.indentAcross = dimensions.indentAcross || 0;
        dimensions.indentDown = dimensions.indentDown || 0;
        var max = o.getSizeAndScale(), frame = o.$(this.frameID), cssVals = {
            left: (o.inApp ? 0 : dimensions.fullscreen ? -frame.x() : -parseInt(dimensions.indentAcross, 10)) + 'px',
            width: (dimensions.fullscreen ? max.width : parseInt(dimensions.width, 10)) + 'px',
            top: (o.inApp ? 0 : dimensions.fullscreen ? -frame.y() : -parseInt(dimensions.indentDown, 10)) + 'px',
            height: (dimensions.fullscreen ? max.height : parseInt(dimensions.height, 10)) + 'px',
            position: 'absolute',
            'z-index': o.zIndex,
            scale: dimensions.fullscreen ? max.scale : 1
        }, expandCounter = new Date(), completeExpand = function(state) {
            o.api.removeEventListener("stateChange", completeExpand);
            if (state === 'expanded' || state === 'resized') {
                cssVals[o.cssPrefix + 'transform-origin'] = '0 0';
                cssVals[o.cssPrefix + 'transform'] = 'scale(' + (dimensions.fullscreen && max.scale || 1) + ')';
                frame.style.cssText = o.expandCss(cssVals);
                if (o.event.EXPAND) {
                    o.fireEvent(o.event.EXPAND);
                    o.event.EXPAND = false;
                }
                o.outputExtExpTrack();
                o.expandCounter = expandCounter;
                if (dimensions.fullscreen && o.getFSElement() !== o.adFrame) {
                    o.fullPageResize(o.getSizeAndScale(), max);
                }
                o.dispatchEvent("expand", dimensions);
            }
        };
        if (dimensions.fullscreen) {
            o.forceOrientation = dimensions.forceOrientation || 'none';
            o.forceOrientation = o.forceOrientation !== 'none' ? o.forceOrientation : dimensions.allowOrientationChange === false ? max.orientation % 180 === 0 ? 'portrait' : 'landscape' : 'none';
            o.setScroll();
            dimensions.width = parseFloat(cssVals.width, 10);
            dimensions.height = parseFloat(cssVals.height, 10);
            o.cachedBodyStyles = {
                overflow: document.body.style.overflow || '',
                overflowX: document.body.style.overflowX || '',
                overflowY: document.body.style.overflowY || ''
            };
            document.body.style.overflow = 'hidden';
            document.body.style.overflowX = 'hidden';
            document.body.style.overflowY = 'hidden';
            o.touchAbsorber(true);
        }
        o.goneFullscreen = dimensions.fullscreen;
        o.api.addEventListener("stateChange", completeExpand);
        if (o.api.getState() === 'loading') {
            o.api.addEventListener("ready", function() {
                o.api.expand(dimensions);
            });
        } else {
            o.api.expand(dimensions);
        }
    },
    expandCss: function(values) {
        var cssText = '';
        var temp;
        var rotation = o.forceOrientation === 'portrait' ? 0 - (typeof o.w.orientation === 'number' ? o.w.orientation : o.api.getOrientation()) : 90;
        if (o.getFSElement() === o.adFrame) {
            return '';
        }
        if (o.switchDimensions()) {
            temp = values.width;
            values.width = values.height;
            values.height = temp;
            values[o.cssPrefix + 'transform'] += 'rotate(' + rotation + 'deg)';
            if (rotation < 0) {
                values[o.cssPrefix + 'transform-origin'] = parseInt(values.width, 10) * (values.scale || 1) + 'px 0';
                values.left = parseInt(values.left, 10) - parseInt(values.width, 10) * (values.scale || 1) + 'px';
            } else {
                values.left = parseInt(values.left, 10) + parseInt(values.height, 10) * (values.scale || 1) + 'px';
            }
        }
        for (var i in values) {
            cssText += i + ':' + values[i] + ';';
        }
        return cssText;
    },
    fullPageResize: function(size, expandMax) {
        var div = o.$(), values, frame = o.$(o.frameID);
        setTimeout(function() {
            var dpr = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
            if (o.inApp && expandMax && expandMax.height > size.height) {
                size = expandMax;
            } else if (o.is('ie', '===10') && o.inApp && !expandMax) {
                size.width = Math.floor(size.width / dpr);
                size.height = Math.floor(size.height / dpr);
                size.scale = o.api.fallbackAPI.getMaxSize().width / size.width;
            }
            if (o.goneFullscreen) {
                o.setScroll();
                values = {
                    width: size.width / size.scale + "px",
                    height: size.height / size.scale + "px",
                    left: -div.x() + "px",
                    top: -div.y() + "px",
                    position: 'absolute',
                    'z-index': o.zIndex,
                    scale: size.scale
                };
                values[o.cssPrefix + 'transform-origin'] = '0 0';
                values[o.cssPrefix + 'transform'] = 'scale(' + size.scale + ')';
                frame.style.cssText = o.expandCss(values);
            }
        }, /rubicon/i.test(o.parseURL(location.host).domain) ? 350 : 25);
    },
    locationReplace: function(url) {
        document.location.replace(url);
    },
    setScroll: function(restore) {
        if (restore === true) {
            o.w.scrollTo(o.scrollXVal || 0, o.scrollYVal || 0);
            o.scrollXVal = -1;
            o.scrollYVal = -1;
        } else {
            o.scrollXVal = o.scrollXVal < 0 ? o.w.pageXOffset : o.scrollXVal;
            o.scrollYVal = o.scrollYVal < 0 ? o.w.pageYOffset : o.scrollYVal;
            if (o.to00 !== false) {
                o.w.scrollTo(0, 0);
            }
        }
    },
    setupExtraQS: function() {
        var p = o.pID;
        if (typeof window['ftGeoC2_' + p] !== 'undefined') {
            this.qsVars.push([ 'ftgc', 'ftGeoC2_' + p ], [ 'ftgs', 'ftGeoState_' + p ], [ 'ftgs', 'ftGeoState_' + p ], [ 'ftgcit', 'ftGeoCity_' + p ], [ 'ftgi', 'ftISP_' + p ], [ 'ftgsp', 'ftSpeed_' + p ], [ 'ftdma', 'ftDMA_' + p ], [ 'ftlg', 'ftLong_' + p ], [ 'ftlt', 'ftLat_' + p ], [ 'ftpst', 'ftPostal_' + p ]);
        }
        if (typeof window['ftKeyword_' + p] !== 'undefined') {
            this.qsVars.push([ 'ftkw', 'ftKeyword_' + p ]);
        }
        if (typeof window['ftClick_' + p] !== 'undefined' && o.params.indexOf('click') === -1) {
            this.qsVars.push([ 'click', 'ftClick_' + p ]);
        }
    },
    shouldBreakout: function(baggyFrame) {
        if (o.w !== top && !o.noBreakout && !baggyFrame) {
            var didBreakout, xdom = function() {
                try {
                    return !parent.document;
                } catch (e) {
                    return true;
                }
            }();
            o.iframe = true;
            o.w = o.w.parent;
            if (xdom) {
                didBreakout = o.breakout();
            }
            if (!didBreakout && o.addAPIFlashVars) {
                o.addAPIFlashVars();
            }
            return didBreakout;
        }
    },
    switchDimensions: function(orientation) {
        orientation = typeof orientation !== 'number' ? this.getSizeAndScale().orientation : orientation;
        if ((!o.inApp || !/^2/.test(o.api.getVersion())) && (o.forceOrientation === 'portrait' && orientation % 180 !== 0) || o.forceOrientation === 'landscape' && orientation % 180 === 0) {
            if (o.lockableOrientation) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    },
    wrapVars: function() {
        function makestr(n, v) {
            return '&' + n + '=' + encodeURIComponent(v);
        }
        var str = '', vars = this.qsVars;
        for (var i = vars.length; i--; ) {
            if (vars[i].length < 3) {
                str += makestr(vars[i][0], window[vars[i][1]]);
            } else if (window[vars[i][1]] && window[vars[i][1]][vars[i][2]]) {
                str += makestr(vars[i][0], window[vars[i][1]][vars[i][2]]);
            }
        }
        return str;
    },
    html_communication: function() {
        window.ftSharedObject = window.ftSharedObject || {
            ads: {},
            add: function(name, obj) {
                var register = function(target, ownName) {
                    if (target.adReady) {
                        target.send(target.adWindow, {
                            method: 'communicate',
                            msg: {
                                name: ownName,
                                type: 'register'
                            }
                        });
                    } else {
                        target.addEventListener('adready', function() {
                            register(target, ownName);
                        });
                    }
                };
                for (var i in this.ads) {
                    register(this.ads[i], name);
                    register(obj, i);
                }
                this.ads[name] = obj;
            },
            send: function(name, message, from) {
                var ad;
                if (typeof this.ads[name] !== 'undefined') {
                    ad = this.ads[name];
                    ad.send(ad.adWindow, {
                        method: 'communicate',
                        msg: {
                            msg: message,
                            name: from,
                            type: 'talk'
                        }
                    });
                }
            }
        };
        try {
            window.parent.ftSharedObject = window.ftSharedObject;
        } catch (ex) {}
        return window.ftSharedObject;
    },
    api: {
        _BRIDGE: null,
        _STATE: 'loading',
        _LISTENERQUEUE: [],
        _EVENTS: {},
        _call: function(name) {
            return this._BRIDGE[name] || this.fallbackAPI[name] || function() {};
        },
        addEventListener: function(event, callback) {
            var o = this;
            if (o._BRIDGE === null || o.getState() === 'loading' && event !== 'ready') {
                o._LISTENERQUEUE.push([ event, callback ]);
            } else {
                if (typeof o._EVENTS[event] === 'undefined') {
                    o._EVENTS[event] = [];
                    this._call('addEventListener').call(this._BRIDGE, event, function() {
                        var args = [ event ].concat([].slice.call(arguments, 0));
                        o.dispatchEvent.apply(o, args);
                    });
                }
                if (typeof callback === 'function') {
                    o._EVENTS[event].push(callback);
                }
            }
        },
        close: function() {
            this._call('close').apply(this._BRIDGE, arguments);
        },
        dispatchEvent: function() {
            var o = this;
            var event = arguments[0];
            var args = [].slice.call(arguments, 1);
            if (typeof o._EVENTS[event] !== 'undefined') {
                for (var i = 0; i < o._EVENTS[event].length; i++) {
                    o._EVENTS[event][i].apply(o, args);
                }
            }
        },
        getOrientation: function(width, height) {
            var or = typeof this._call('getOrientation').apply(this._BRIDGE, arguments) !== 'undefined' ? this._call('getOrientation').call(this._BRIDGE) : this.fallbackAPI.getOrientation.call(this._BRIDGE);
            if (this.fallbackAPI._FT.goneFullscreen && width) {
                if (or % 180 === 0) {
                    or = width > height ? 90 : or;
                } else {
                    or = width < height ? 0 : or;
                }
            }
            return or;
        },
        getState: function() {
            return this._call('getState').call(this._BRIDGE);
        },
        getVersion: function() {
            if (!this._BRIDGE.getVersion) {
                return 2;
            } else {
                return this._call('getVersion').apply(this._BRIDGE, arguments);
            }
        },
        isViewable: function() {
            return this._call('isViewable').apply(this._BRIDGE, arguments);
        },
        open: function(url) {
            if (window.ftClickYOC) {
                this._call("open").call(this._BRIDGE, encodeURIComponent(window.ftClickYOC), true, encodeURIComponent(url));
            } else {
                this._call("open").call(this._BRIDGE, url);
            }
        },
        processQueuedListeners: function() {
            var o = this;
            for (var i = 0; i < o._LISTENERQUEUE.length; i++) {
                o.addEventListener(o._LISTENERQUEUE[i][0], o._LISTENERQUEUE[i][1]);
            }
        },
        removeEventListener: function(event, callback) {
            var o = this;
            var evs = o._EVENTS[event];
            var i = evs && evs.length || 0;
            while (i--) {
                if (evs[i] === callback) {
                    evs.splice(i, 1);
                }
            }
        },
        request: function(url, display) {
            this.fallbackAPI.request(url, display);
        },
        useCustomClose: function() {
            return this._call('useCustomClose').apply(this._BRIDGE, arguments);
        },
        fallbackAPI: {
            addEventListener: function(event, callback) {
                var api = this;
                if (typeof api._EVENTS[event] === 'undefined') {
                    api._EVENTS[event] = [];
                }
                if (typeof callback === 'function') {
                    api._EVENTS[event].push(callback);
                }
            },
            close: function() {
                if (this._STATE !== 'default' && this.ft.api._STATE === 'default') {
                    this._STATE = this.ft.api._STATE = 'default';
                } else {
                    this._STATE = this.ft.api._STATE = 'hidden';
                }
                if (this._FT.safeFrame) {
                    this._FT.safeFrame.collapse();
                }
                this.dispatchEvent('stateChange', this._STATE);
            },
            dispatchEvent: function() {
                var o = this;
                var event = arguments[0];
                var args = [].slice.call(arguments, 1);
                if (typeof o._EVENTS[event] !== "undefined") {
                    for (var i = 0; i < o._EVENTS[event].length; i++) {
                        o._EVENTS[event][i].apply(o, args);
                    }
                }
            },
            getOrientation: function() {
                var w = 0, s = o.w.screen;
                if (o.w === window.top) {
                    w = s.orientation && s.orientation.type || s.mozOrientation || s.msOrientation || o.w.orientation;
                    w = isNaN(w) ? /portrait/.test(w) ? 0 : /landscape/.test(w) ? 90 : window.innerHeight > window.innerWidth ? 0 : 90 : w;
                }
                return w;
            },
            getState: function() {
                return this._STATE;
            },
            isViewable: function() {
                return true;
            },
            open: function(url) {
                window.open(url, '_blank');
            },
            request: function(url) {
                new Image().src = url;
            },
            _FT: null,
            _STATE: 'loading',
            _EVENTS: {},
            _TARGET: '_blank',
            expand: function(dimensions) {
                var geom = {}, left, right, top, bottom;
                if (o.safeFrame) {
                    if (dimensions.fullscreen) {
                        geom = o.safeFrame.geom();
                        left = geom.exp.l;
                        right = geom.exp.r;
                        top = geom.exp.t;
                        bottom = geom.exp.b;
                    } else {
                        left = Math.abs(dimensions.indentAcross);
                        top = Math.abs(dimensions.indentDown);
                        right = dimensions.width - o.width - left;
                        bottom = dimensions.height - o.height - top;
                    }
                    o.safeFrame.expand({
                        t: top,
                        l: left,
                        r: right,
                        b: bottom,
                        push: o.pushdown ? o.safeFrame.supports().exp_push : false
                    });
                }
                this._STATE = o.api._STATE = dimensions.fullscreen ? 'expanded' : 'resized';
                this.dispatchEvent('stateChange', this._STATE);
            },
            getExpandProperties: function() {
                return this._EXPANDPROPERTIES;
            },
            getMaxSize: function() {
                return o.safeFrame ? {
                    width: o.safeFrame.geom().win.w,
                    height: o.safeFrame.geom().win.h
                } : {
                    width: o.w.innerWidth,
                    height: o.w.innerHeight,
                    scale: o.w.innerWidth / o.w.document.documentElement.clientWidth
                };
            },
            setExpandProperties: function(properties) {
                this._EXPANDPROPERTIES = properties;
            }
        },
        expand: function(dimensions, url) {
            var v1 = /^1/.test(this.getVersion());
            var maxSize, finalOb, useCustomClose;
            if (this._BRIDGE === window.mraid) {
                if (dimensions.fullscreen || v1) {
                    if (v1 && dimensions.fullscreen) {
                        dimensions.width = this.getExpandProperties().width;
                        dimensions.height = this.getExpandProperties().height;
                        if (/Android/.test(navigator.userAgent) && dimensions.width > screen.width / window.devicePixelRatio) {
                            dimensions.width /= window.devicePixelRatio;
                            dimensions.height /= window.devicePixelRatio;
                        }
                    }
                    useCustomClose = typeof dimensions.useCustomClose !== 'undefined' ? dimensions.useCustomClose : true;
                    finalOb = {
                        width: Math.floor(dimensions.width),
                        height: Math.floor(dimensions.height),
                        useCustomClose: useCustomClose
                    };
                    if (!v1) {
                        finalOb.allowOrientationChange = typeof dimensions.allowOrientationChange !== 'undefined' ? dimensions.allowOrientationChange : true;
                        finalOb.forceOrientation = typeof dimensions.forceOrientation !== 'undefined' ? dimensions.forceOrientation : 'none';
                    }
                    this._call('setExpandProperties').call(this._BRIDGE, finalOb);
                    this._call('useCustomClose').call(this._BRIDGE, useCustomClose);
                    this._call('expand').call(this._BRIDGE, url);
                } else {
                    maxSize = this.getMaxSize();
                    dimensions.indentAcross = dimensions.width < maxSize.width ? (maxSize.width - dimensions.width) / 2 : dimensions.indentAcross;
                    dimensions.allowOffscreen = typeof dimensions.allowOffscreen !== 'undefined' ? dimensions.allowOffscreen : false;
                    for (var i in dimensions) {
                        if (typeof dimensions[i] === 'number') {
                            dimensions[i] = Math.floor(dimensions[i]);
                        }
                    }
                    this._call('setResizeProperties').call(this._BRIDGE, {
                        width: dimensions.width,
                        height: dimensions.height,
                        offsetX: dimensions.indentAcross,
                        offsetY: dimensions.indentDown,
                        customClosePosition: dimensions.customClosePosition || 'top-right',
                        allowOffscreen: dimensions.allowOffscreen
                    });
                    this._call('resize').call(this._BRIDGE);
                }
            } else if (this._BRIDGE === window.ormma) {
                this._call('setExpandProperties').call(this._BRIDGE, {
                    width: dimensions.width,
                    height: dimensions.height,
                    useCustomClose: typeof dimensions.useCustomClose === 'undefined' ? true : dimensions.useCustomClose
                });
                if (dimensions.fullscreen) {
                    this._call('expand').call(this._BRIDGE);
                } else {
                    this._call('resize').call(this._BRIDGE, dimensions.width, dimensions.height);
                }
            } else {
                this._call('expand').call(this._BRIDGE, dimensions, url);
            }
        },
        getExpandProperties: function() {
            return this._call('getExpandProperties').call(this._BRIDGE);
        },
        getMaxSize: function() {
            var ob, temp;
            if (/^2/.test(this.getVersion()) || !o.inApp) {
                ob = o.inApp ? this.getExpandProperties() : this.fallbackAPI.getMaxSize();
                if (!ob.width || typeof window.MMJS !== 'undefined') {
                    ob = this._call('getMaxSize').apply(this._BRIDGE, arguments);
                    if (!ob.width) {
                        ob = o.api.fallbackAPI.getMaxSize();
                    }
                }
                if (/android/i.test(navigator.userAgent) && /mydas\.mobi/.test(location.href)) {
                    ob.width = ob.width *= window.devicePixelRatio * 2;
                    ob.height = ob.height *= window.devicePixelRatio * 2;
                }
                return ob;
            } else {
                ob = this.getExpandProperties();
                if (!ob.width) {
                    ob = o.api.fallbackAPI.getMaxSize();
                }
                if (/mobile/i.test(navigator.userAgent)) {
                    if (o.api.getOrientation() % 180 !== 0 && o.api.getOrientation() !== -1 && ob.width < ob.height) {
                        temp = ob.width;
                        ob.width = ob.height;
                        ob.height = temp;
                    } else if (o.api.getOrientation() % 180 === 0 && ob.width > ob.height) {
                        temp = ob.width;
                        ob.width = ob.height;
                        ob.height = temp;
                    }
                }
                return ob;
            }
        }
    }
};
    (function() {
    var p = "3183120", n = JSON.parse('[]'), w = window, f = function(s) {
        var r = w[s + "_" + p], i = n.length;
        if (!r) {
            r = "";
            while (i--) {
                if (w[s + "_" + n[i]]) {
                    r = w[s + "_" + n[i]];
                    break;
                }
            }
        }
        return r;
    }, d = function(a, b) {
        if (b && !~w[q].indexOf(a + "=")) {
            b = ~b.indexOf("&") ? encodeURIComponent(b) : b;
            w[q] += "&" + a + "=" + b;
        }
    }, q = "ftParams_" + p, e = "ftExpTrack";
    d(e, f(e));
    d("click", f("ftClick"));
})();

o.is = function platform(navigator) {
    var fn = function(p, v) {
        if (!v || !fn[p]) {
            return !!fn[p];
        }
        var eq, op = (/^\D+/.exec(v) || [ '' ]).pop(), comparison = new Function('a', 'b', 'return a' + (op || '==') + 'b'), currentParts = fn[p].split('.'), desiredParts = String(v).slice(String(v).search(/\d/)).split('.');
        for (var i = 0, m = desiredParts.length; i < m; i++) {
            eq = currentParts[i] === desiredParts[i];
            if (comparison(+currentParts[i], +desiredParts[i])) {
                if (!desiredParts[i + 1] || op.charAt(1) !== '=' || !eq) {
                    return true;
                }
            } else if (!desiredParts[i + 1] || op !== '>' && op !== '<' && !eq) {
                return false;
            }
        }
    }, getVersion = function(n) {
        return (RegExp(n + '[/ ](\\d+(?:[\\._]\\d+)*)').exec(u) || [ '' ]).pop().replace(/_/g, '.') || false;
    }, u = navigator.userAgent, p = navigator.platform, ios = p.slice(0, 2) === 'iP' && getVersion('OS'), ie = ~u.search(/MSIE|Trident|Edge/), android = !ie && getVersion('Android'), aosp = !!(~u.indexOf('; U;') || ~u.indexOf('Verson')) && android, chriOS = !ie && getVersion('ChriOS'), is = {
        mobile: !!(android || ios) || !!(ie && ~u.indexOf('Windows Phone')),
        android: !ie && android,
        ios: ios,
        windows: getVersion('Windows(?: NT| Phone(?: OS)?)?'),
        mac: !/like Mac OS/.test(u) && getVersion('Mac OS X'),
        linux: p.slice(0, 5) === 'Linux' && !android,
        chromeOS: getVersion('CrOS \\w+'),
        aosp: aosp,
        chrome: !ie && !aosp && (!!window.chrome && getVersion('Chrome')),
        firefox: getVersion('Firefox'),
        safari: !ie && !chriOS && navigator.vendor.slice(0, 5) === 'Apple' && getVersion('Version'),
        ie: !!ie && String(document.documentMode || getVersion('(?:MSIE|IEMobile|Edge)')),
        webkit: !ie && getVersion('AppleWebKit'),
        kindleFire: getVersion('Silk')
    };
    for (var i in is) {
        fn[i] = is[i];
    }
    return fn;
}(navigator);
    var data = {
    params:window.ftParams_3183120||'',
    GUID:window.ftGUID_3183120||'99999999999',
    confID:window.ftConfID_3183120||'0',
    ftReturn: window.ftReturn_3183120||'',
    keyword:window.ftKeyword_3183120||'',
    ftId:window.ftId_3183120||'',
    imp:window.ftImp3183120,
    ftImpId:window.ftImp3183120 && window.ftImp3183120.impID || '',
    campaignID:'93667',
    cID:'90521',
    pID:'3183120',
    creativeID:'2226751',
    exttrack:["https://adfarm.mediaplex.com/ad/tr/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN4=[VEN4]&VEN5=[VEN5]","https://t.myvisualiq.net/sync?prid=Test&ao=843&vndr=117&red=https%3A%2F%2Fadfarm.mediaplex.com%2Fad%2Fim%2F13044-85265-63530-0%3Fmpaltsys%3D46%26mpalt%3D%24%7BUUID%7D","https://tapestry.tapad.com/tapestry/1?ta_partner_id=950&ta_redirect=https%3A%2F%2Ft.myvisualiq.net%2Fsync%3Fprid%3D1001%26ao%3D0%26pruuid%3DTAPAD_%24%7BIDS%3Akey%7D"],
    extscript:["https://c.betrad.com/durly.js?;ad_w=300;ad_h=250;coid=358;nid=77808;crid=1884;check_container=true;","https://cdn.doubleverify.com/dvtp_src.js?ctx=11025772&cmp=93667&sid=4207&plc=3183120&num=&adid=&advid=236&adsrv=8&region=40&btreg=93667&btadsrv=flashtalking&crt=2226751&crtname=&chnl=&unit=&pid=&uid=&dvtagver=6.1.src"],
    clickTags: ["http://servedby.flashtalking.com/click/4/93667;3183120;2226751;211;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;212;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;213;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;214;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;215;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;216;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;217;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;218;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;219;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;220;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;241;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;242;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;243;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;244;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;245;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;246;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;247;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;248;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;249;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com","http://servedby.flashtalking.com/click/4/93667;3183120;2226751;250;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com"],
    placementDescription:'MEDIAMATHMEDIAMATHTECHNOLOGYQ2ITTDCOHTML5BANNER300x250DCPMIIPS1P39InterestTechEnthusiastsNA',
    width:300,
    height:250,
    adType:'HTML_onpage'.toLowerCase(),
    siteName:'MediaMath',
    divID:'ftdiv3183120',
    phID:'ftpos3183120',
    frameID:'ftframe3183120',
    expID:'ftexpframe3183120',
    altImgID:'ftalt3183120',
    altText:'Click here',
    altImgTarget:'_blank',
    altimghref:'http://servedby.flashtalking.com/click/4/93667;3183120;2226751;210;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=https://adfarm.mediaplex.com/ad/ck/10591-244576-26109-0?mpt=[%FT_RANDOM%]&VEN1=[%FT_CONFID%]&VEN2=[%FT_CUSTOM%]&VEN4=[VEN4]&VEN5=[VEN5]&mpre=https://www.dell.com',
    altImg:'http://servedby.flashtalking.com/imp/4/93667;3183120;204;gif;MediaMath;MEDIAMATHMEDIAMATHTECHNOLOGYQ2ITTDCOHTML5BANNER300x250DCPMIIPS1P39InterestTechEnthusiastsNA/?',
    viewableImpressionURL:'http://servedby.flashtalking.com/imp/4/93667;3183120;271;pixel;MediaMath;MEDIAMATHMEDIAMATHTECHNOLOGYQ2ITTDCOHTML5BANNER300x250DCPMIIPS1P39InterestTechEnthusiastsNA/?',
    stump:'http://servedby.flashtalking.com',
    jsurl:'http://cdn.flashtalking.com/xre/318/3183120/2226751/js/j-3183120-2226751.js',
    file:'http://cdn.flashtalking.com/90521/2226751/index.html',
    safeFrame: window.$sf && window.$sf.ext || false,
    serveDOM:'http://cdn.flashtalking.com',
    statBaseURL:'http://stat.flashtalking.com/reportV3/ft.stat?111696762-3183120;2226751;',
    adVis:false ? 1 : 0,
    centreAd:true,
    mvt:true,
    segment:window.ftSegment_3183120||'',
    segmentList:window.ftSegmentList_3183120||[],
    ftlocal:'flashtalking/ftlocal.html',
    attachtobody:false,
    zIndex:77000,
    blockBrowsers:'ie8'.split(','),
    absorbSwipes:'false' === 'true',
    forceBackup:'false' === 'true',
    loadMethod:"quickload",
    politeLoad:"false",
    countOnDownload: o.is.mobile && 0,
    baggyFrameLimit:15,
    append:!!(window.ftImp3183120 && window.ftImp3183120.jsAppend),
    mayExpand: +'0' > 250 || +'0' > 300,
    noBreakout:false,
    lockableOrientation:!!(window.screen && (screen.mozLockOrientation || screen.msLockOrientation || screen.lockOrientation || (screen.orientation && screen.orientation.lock))),
    encodeClickCount:parseInt('0', 10) || 0,
    clicks:{},
    fVarList:{},
    event:{
        INTERACTION: '18',
        INTERACTION_TIME: '19',
        EXPAND: '20',
        EXPAND_TIME: '30',
        CLICKMAP: '95',
        VIDEO: {
            init: '1',
            replay: '2',
            starts: '3',
            '25%': '4',
            '50%': '5',
            '75%': '6',
            '100%': '7',
            unmute: '38'
        },
        extra: {}
    },
    tracking3rdParty:{
        videoQuartiles: JSON.parse(''.replace(/^(\[%\w+%])?$/, '{}')),
        userEngagement: ''.replace(/^\[%\w+%\]$/, '')
    },
    w:window,
    adDisplayed:false,
    customPos:false,
    customPosFunc:function() {},
    eventListeners:{},
    cachedEvents:[],
    altimgtarget:'_blank',
    pageVisible: 'maybe',
    altimgborder: '0',
    secure: !!(location.protocol === 'https:' || !!(document.getElementById('ftscript_m3183120')&&/^https:/.test(document.getElementById('ftscript_m3183120').src)) || window.qs && typeof qs.get === 'function' && /^https:/.test(qs.get('ifsrc',''))),
    scriptLocation: document.getElementById('ftscript_m3183120'),
    apiVersion: (function(parts) {
        return {
            major: parseInt(parts[0], 10) || 0,
            minor: parseInt(parts[1], 10) || 0,
            patch: parseInt(parts[2], 10) || 0
        };
    })(('[%api_version%]').split('.')),
    cssPrefix: (function(bStyle) {
        var pres = ['MozT', 'MsT', 'webkitT', 't'];
        var prefix = '';
        for (var i = pres.length - 1; i > -1; i--) {
            if (pres[i] + 'ransform' in bStyle) {
                prefix = pres[i].slice(0, pres[i].length - 1).toLowerCase();
                break;
            }
        }
        return !prefix || prefix === 't' ? '' : ('-' + prefix + '-');
    }(document.documentElement.style)),
    flashVarHolder: [
        ['adVis', 'adVis'],
        ['divID', 'divID'],
        ['ftfuncid', 'pID'],
        ['creativeID', 'creativeID'],
        ['cID', 'cID'],
        ['ftPlacementID', 'pID'],
        ['aID', 'aID'],
        ['pID','pID'],
        ['ftSetFileSize', 'setFileSize'],
        ['ftStatBaseURL', 'statBaseURL'],
        ['ftMVT', 'mvt'],
        ['ftServeDom', 'serveDOM'],
        ['ftServeDom', 'serveDom'],
        ['serveDom', 'serveDom'],
        ['serveDom', 'serveDOM'],
		['ftSegment','segment'],
		['ftSegmentList','segmentList'],
        ['ftLinkMode', 'linkMode'],
        ['ftLinkID', 'linkID'],
        ['ftPL', 'politeload'],
        ['ftStreamMode', 'streamMode'],
        ['ftReturn', 'ftReturn'],
        ['guid', 'GUID'],
        ['ftBrowserInfo', 'is'],
        ['clicks', 'clicks'],
        ['impressionID', 'ftImpId'],
        ['ftServedStump', 'stump']
    ],
    gFlashVarList: [
        ['ftGUID', 'ftGUID_'],
        ['ftConfID', 'ftConfID_'],
        ['ftKeyword', 'ftKeyword_'],
        ['ftSegment', 'ftSegment_'],
        ['ftGeoCountry', 'ftGeoC2_'],
        ['ftGeoState', 'ftGeoState_'],
        ['ftGeoCity', 'ftGeoCity_'],
        ['ftGeoISP', 'ftISP_'],
        ['ftGeoSpeed', 'ftSpeed_'],
        ['ftDMA', 'ftDMA_'],
        ['ftLong', 'ftLong_'],
        ['ftLat', 'ftLat_'],
        ['ftPostal', 'ftPostal_']
    ],
    switchArray:['file', 'serveDOM', 'serveDom', 'statBaseURL', 'utilityURL', 'altImg', 'altImgHref', 'viewableImpressionURL'],
    qsVars:[
        ['ftguid', 'ftGUID_3183120'],
        ['ftcfid', 'ftConfID_3183120'],
        ['fttime', 'ftTimestamp_3183120'],
        ['ftsection', 'ftSection_3183120'],
        ['ftcustom', 'ftCustom_3183120'],
        ['ft_id', 'ftId_3183120'],
        ['ftimpid','ftImp3183120', 'impID']
    ]
};

        for(var i in data){
                o[i] = data[i];
        }

        window["ft" + data.pID] = o;

    // temp pagefold code
    (function(ft) {
        var ua = navigator.userAgent;
        var safari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/Edge/.test(ua);
        ft.viewableConversion = "false" === "true";
        ft.viewableImpressionURL = setupViewableImpression(ft.stump + "/state/" + ft.pID + ";" + ft.creativeID + ";" + "[CONFID];271;[IMPRESSIONID]/?cachebuster=[RANDOM]");

        ft.fireRenderedImpression = function() {
            if (ft.viewableConversion) {

                if (!(safari) || ft.pageVisible !== 'no' && !ft.firedRenderedImpression) {
                    new Image().src = ft.replaceMacros(ft.viewableImpressionURL);
                    ft.firedRenderedImpression = true;
                }
            }
        };

        function setupViewableImpression(str) {
            var inserts = [{
                "param": "ft_product",
                "value": ft.productSKU || ""
            }, {
                "param": "ft_data",
                "value": ft.ftData || ""
            }];
            var i = inserts.length;

            while (i--) {
                str = ft.insertParam(str, inserts[i]);
            }

            return str[str.length - 1] === '&' ? str.substring(0, str.length - 1) : str;
        }
    }(o));

    //--start extensions
(function(o) {
    o.originalReplaceMacros = o.replaceMacros;
    o.replaceMacros = function(str, cb) {
        var holder = window['ftSection_' + o.pID].replace("&ft_keyword=","");
        holder = holder.indexOf("__")>-1 ? holder : holder.replace(/_/g,"__");
        var split = holder != "" && holder.indexOf("__")>-1 ? holder.split("__") : ["undefined","undefined"];
        if(split.length < 2) {
            for(var i = split.length; i < 2; i++) {
                split.push("undefined");
            }
        }
        for(var i = 0; i < split.length; i++) {
            if(split[i].includes("_ATTR") || split[i] == ""){
                split[i] = "undefined";
            }
        }
        var map = {
                VEN4 : split[0],
                VEN5 : split[1]
            },
            allMacros = /(?:\[|%5B|%255B)(%|%25|%2525)?(?:FT_)?(\w+)\1(?:\]|%5D|%255D)/ig,
            replacer = function($0, d, macro) {
                macro = macro.toUpperCase();
                return map.hasOwnProperty(macro) ? map[macro] : $0;
            };
        str = str.replace(allMacros, replacer);
        return o.originalReplaceMacros(str, cb);
    };
}(ft3183120));

    //--end extensions
    o.init();

}());