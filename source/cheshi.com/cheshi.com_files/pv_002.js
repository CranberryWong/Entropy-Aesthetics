;
(function(d) {
    if (typeof(d.getElementsByClassName) == 'undefined') {
        d.getElementsByClassName = function (className) {
            var ele = [];
            var o = document.getElementsByTagName('*'); // 这个方法效率很低 :(

            for (var i = 0; i < o.length; i++) {
                var classes = o[i].className.split(/\s+/);

                for (var j = 0; j < classes.length; j++) {
                    if (className == classes[j])
                        ele[ele.length] = o[i];
                }
            }

            return ele;
        };
    }
})(window.document);

window.onload = function (){
    try{
        if (window.location.href.substring(0,28) == 'http://pic.cheshi.com/photo/') {
            var e = document.getElementsByClassName('bread')[0].getElementsByTagName("li")[4].getElementsByTagName('a')[0];
            var d = document.getElementsByClassName('comde')[0].getElementsByTagName("dl")[0].getElementsByTagName('dd');
            if (d.length < 0 || (e.href.trim().substr(-13) == "logopic_.html")) {
                var d = new Image;
                d.onload = d.onerror = d.onabort = function() {};
                d.src = 'http://pv.cheshi.com/images/analysis02.gif?'+Math.random().toString(36);
            }
        }
    } catch (e) {console && console.log(window.location);}
};


var cinfo = (function(w){
    // read cookies
    function read_cookie(name) {
        var cookieValue = "", s = (name + "=");

        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(s);
            if (offset != -1) {
                offset += s.length;
                end = document.cookie.indexOf(";", offset);
                if (end == -1) end = document.cookie.length;
                cookieValue = unescape(document.cookie.substring(offset, end));
            }
        }

        return cookieValue;
    }

    // write cookies
    function write_cookie(name, value, hours) {
        var expire = "";
        if (hours != null) {
            expire = new Date((new Date()).getTime() + hours * 3600000);
            expire = "; expires=" + expire.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expire + ";domain=.cheshi.com;path=/; ";
    }

    // make a new cookie string
    function make_cookie(){
        return (new Date().getTime()) + Math.floor(Math.random()*999);
    }

    function strdecode(str) {
        return utf8to16(base64decode(str));
    };

    function utf8to16(str) {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = str.length;
        i = 0;
        while(i < len) {
            c = str.charCodeAt(i++);
            switch(c >> 4){
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += str.charAt(i-1);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                                            ((char2 & 0x3F) << 6) |
                                            ((char3 & 0x3F) << 0));
                break;
            }
        }
        return out;
    };

    function base64decode(str) {
        var base64DecodeChars = new Array(
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
            52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
            -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
            -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
        );
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while(i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while(i < len && c1 == -1);
            if(c1 == -1)
                break;
            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while(i < len && c2 == -1);
            if(c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if(c3 == 61)
                    return out;
                c3 = base64DecodeChars[c3];
            } while(i < len && c3 == -1);
            if(c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if(c4 == 61)
                    return out;
                c4 = base64DecodeChars[c4];
            } while(i < len && c4 == -1);
            if(c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    };

    function getDomain(hn){
        str = hn.replace(/\.(com|net|org|cn)\.?.*/,"");
        if (str.lastIndexOf(".") == -1)
            dm = "." + hn;
        else {
            str = str.substring(str.lastIndexOf("."));
            dm = hn.substring(hn.lastIndexOf(str));
        }
        return dm.split('/')[0];
    }

    var r = 'http://pv.cheshi.com/images/analysis.gif?';

    var s, v = {}, ua = navigator.userAgent;

    var cache = {},
        os,
        browser,
        getOs,
        getBrowser,
        getOsAndBrowserStr,
        isMobile,
        publicObj,
        getLanguage,
        getSource,
        getCsUID,
        getPvUID,
        getRefTime;

    os = [
        {
            type: 'ios',
            getName: function (ua) {
                var name = null, type = '', isMatch = false;

                if (ua.indexOf('iPad') >= 0) {
                    isMatch = true;
                    type = ' (iPad)';
                } else if (ua.indexOf('iPod') >= 0) {
                    isMatch = true;
                    type = ' (iPod)';
                } else if (ua.indexOf('iPhone') >= 0) {
                    isMatch = true;
                    type = ' (iPhone)';
                }

                if (isMatch) {
                    name = 'iOS';
                    if (/OS ([0-9_]+)/.test(ua)) {
                        name += ' ' + RegExp.$1.replace(/_/g, '.');
                    }
                    name += type;
                }

                return name;
            }
        },
        {
            type: 'android',
            getName: function (ua) {
                var name = null;
                if (ua.indexOf('Android') >= 0) {
                    name = 'Android';
                    if (/Android ([\-a-zA-Z0-9\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }
                return name;
            }
        },
        {
            type: 'mac',
            getName: function (ua) {
                return (ua.indexOf('Mac') >= 0) ? 'Macintosh' : null;
            }
        },
        {
            type: 'windows',
            getName: function (ua) {
                return (ua.indexOf('Win') >= 0) ? 'Windows' : null;
            }
        }
    ];

    browser = [
        {
            type: 'opera',
            getName: function (ua) {
                var name = null;
                if (ua.indexOf('Opera') >= 0) {
                    name = 'Opera';
                    if (/Version\/([0-9\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    } else if (/Opera ([0-9\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    } else if (/Opera\/([0-9\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }
                else
                if (ua.indexOf('OPR') >= 0) {
                    name = 'Opera';
                    if (/OPR\/([0-9\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }

                return name;
            }
        },
        {
            type: 'msie',
            getName: function (ua) {
                var name = null;
                if (ua.indexOf('MSIE') >= 0) {
                    name = 'Internet Explorer';
                    if (/MSIE ([0-9\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }
                return name;
            }
        },
        {
            type: 'baidu',
            getName: function(ua) {
                var name = null;
                if (ua.indexOf('BIDUBrowser') >= 0) {
                    name = 'Baidu';
                    if (/BIDUBrowser\/([0-9x\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }
                return name;
            }
        },
        {
            type: 'uc',
            getName: function(ua) {
                var name = null;

                if (ua.indexOf('UCBrowser') >= 0) {
                    name = 'UC';
                    if (/UCBrowser\/([0-9x\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }

                return name;
            }
        },
        {
            type: 'liebao',
            getName: function(ua) {
                var name = null;
                if (ua.indexOf('LBBROWSER') >= 0) {
                    name = 'Liebao';
                    if (/LBBROWSER\/([0-9x\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }
                return name;
            }
        },
        {
            type: 'maxthon',
            getName: function(ua) {
                var name = null;
                if (ua.indexOf('Maxthon') >= 0) {
                    name = 'Maxthon';
                    if (/Maxthon\/([0-9x\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }
                return name;
            }
        },
        {
            type: 'tt',
            getName: function(ua) {
                var name = null;
                if (ua.indexOf('TencentTraveler') >= 0) {
                    name = 'TT';
                    if (/TencentTraveler ([0-9x\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }
                return name;
            }
        },
        {
            type: 'firefox',
            getName: function (ua) {
                var name = null;
                if (ua.indexOf('Firefox') >= 0) {
                    if (ua.indexOf('Fennec') >= 0) {
                        name = 'Fennec';
                        if (/Fennec\/([0-9\.]+)/.test(ua)) {
                            name += ' ' + RegExp.$1;
                        }
                    } else {
                        name = 'Firefox';
                        if (/Firefox\/([0-9\.]+)/.test(ua)) {
                            name += ' ' + RegExp.$1;
                        }
                    }
                }
                return name;
            }
        },
        {
            type: 'chrome',
            getName: function (ua) {
                var name = null;
                if (ua.indexOf('Chrome') >= 0) {
                    name = 'Chrome';

                    if (/Chrome\/([0-9\.]+)/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }
                return name;
            }
        },
        {
            type: 'safari',
            getName: function (ua) {
                var name = null;
                if (ua.indexOf('Safari') >= 0) {

                    name = 'Safari';

                    if (/Version\/([0-9\.]+) Safari/.test(ua)) {
                        name += ' ' + RegExp.$1;
                    }
                }
                return name;
            }
        }
    ];

    getOs = function () {
        var name, i, len, cacheObj = cache[ua];

        if (ua === undefined) {
            return null;
        }

        if (cacheObj !== undefined && cacheObj.os !== undefined) {
            return cacheObj.os;
        }

        for (i = 0, len = os.length; i < len; i += 1) {
            name = os[i].getName(ua);
            if (name !== null) {
                if (ua.indexOf('Mobile') >= 0) {
                    name = 'Mobile ' + name;
                }
                break;
            }
        }

        if (name === null) {
            name = 'undefined';
        }

        cache[ua] = cache[ua] || {};
        cache[ua].os = name;

        return name;
    };

    getBrowser = function () {
        var name, i, len, cacheObj = cache[ua];

        if (ua === undefined) {
            return null;
        }

        if (cacheObj !== undefined && cacheObj.browser !== undefined) {
            return cacheObj.browser;
        }

        for (i = 0, len = browser.length; i < len; i += 1) {
            name = browser[i].getName(ua);
            if (name !== null) {
                break;
            }
        }

        if (name === null) {
            name = 'undefined';
        }

        cache[ua] = cache[ua] || {};
        cache[ua].browser = name;

        return name;
    };

    getLanguage =  function () {
        return navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
    };

    isMobile = function () {
        var isMobile, cacheObj = cache[ua];

        if (ua === undefined) {
            return false;
        }

        if (cacheObj !== undefined && cacheObj.isMobile !== undefined) {
            return cacheObj.isMobile;
        }

        isMobile = /(DoCoMo|SoftBank|UP\.Browser|Vodafone|KDDI|Mobile|Android|iPhone|iPad|iPod)/.test(ua);

        cache[ua] = cache[ua] || {};
        cache[ua].isMobile = isMobile ? 1 : 0;

        return cache[ua].isMobile;
    };

    /**
     * 获取上次访问时间并记录当前时间
     */
    getRefTime = function () {
        var t = read_cookie('pv_cheshit');
        write_cookie('pv_cheshit', (new Date()).getTime());
        return t ? t : 0;
    };

    /**
     * 获取当前用户的唯一标识, 如果没有就设置
     */
    getPvUID = function (){
        var pv_uid = read_cookie('pv_uid');

        if (!pv_uid) {
            pv_uid = make_cookie();
            write_cookie('pv_uid', pv_uid);
        }

        return pv_uid;

    };

    /**
     * 获取车市用户ID
     */
    getCsUID = function () {
        var usercookie = read_cookie('cheshi_user_info');
        var    userarr = strdecode(usercookie);
        var userinfo = userarr.split('\t');
        if (userinfo[0]!="" && typeof(userinfo[0])!="undefined"){
            return userinfo[0];
        }else{
            return 0;
        }
    };

    /**
     * 获取访问者来源导航地址
     */
    getSource = function () {

        var source = '';
        var pv_source = getDomain(document.referrer);
        var source= read_cookie('pv_source');
        if (pv_source != '.cheshi.com') {
            source = encodeURIComponent(document.referrer);
            write_cookie('pv_source', document.referrer);
        } else {
            source = encodeURIComponent(source);
        }

        return source;
    };

    var _ = {
        pf : getOs(),                                                           // 浏览器平台
        swh: (w.screen.width || 0) + "x" + (w.screen.height || 0),              // 屏幕分辨率
        bwh: (w.outerWidth || 0) + 'x' + (w.outerHeight || 0),                  // 浏览器分辨率
        ce : navigator.cookieEnabled ? 1 : 0,                                   // 是否激活cookies
        je : navigator.javaEnabled() ? 1 : 0,                                   // 是否激活java
        bv : getBrowser(),                                                      // 浏览器与版本
        ism: isMobile(),                                                        // 是否是移动端
        ul : getLanguage(),                                                     // 浏览器语言
        prf: encodeURIComponent(document.referrer),                             // 文档的 ref 链接
        r  : Math.random().toString(36),                                        // 随机字符串
        u  : getPvUID(),                                                        // 获取用户唯一标识ID
        cu : getCsUID(),                                                        // 车市登录用户id
        lt : getRefTime(),                                                      // 最后一次访问时间是
        sc : getSource()                                                        // 目标来源跟踪
    };

    var a = [];

    for (var n in _) {
        a.push(n + '=' + (_[n] === undefined ? '' : _[n]));
    }

    var d = new Image;
    d.onload = d.onerror = d.onabort = function() {};
    d.src = r + a.join('&');

    //document.write('<img src="' + r + a.join('&') + '" />');
    return _;

})(window);
