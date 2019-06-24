function showa(a) {
    document.getElementById(a).style.display = "block";
}
function doIframe() {
    o = document.getElementsByTagName('iframe');
    for (i = 0; i < o.length; i++) {
        if (/\bautoHeight\b/.test(o[i].className)) {
            setHeight(o[i]);
            addEvent(o[i], 'load', doIframe);
        }
    }
}
function setHeight(e) {
    if (e.contentDocument) {
        var browserName = navigator.appName;
        if (browserName !== "Microsoft Internet Explorer") {
            e.height = e.contentDocument.body.offsetHeight + 35;
        }
    } else {
    }
    e.width = 285;
}
function addEvent(obj, evType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent) {
        var r = obj.attachEvent("on" + evType, fn);
        return r;
    } else {
        return false;
    }
}
var time_lang = new Array();
time_lang["en"] = ['en', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
time_lang["ru"] = ['ru', '\u042F\u043D\u0432', '\u0424\u0435\u0432', '\u041C\u0430\u0440', '\u0410\u043F\u0440',
    '\u041C\u0430\u0439', '\u0418\u044E\u043D', '\u0418\u044E\u043B', '\u0410\u0432\u0433',
    '\u0421\u0435\u043D', '\u041E\u043A\u0442', '\u041D\u043E\u044F', '\u0414\u0435\u043A',
    '\u0412\u0441', '\u041F\u043D', '\u0412\u0442', '\u0421\u0440', '\u0427\u0442', '\u041F\u0442', '\u0421\u0431'];
var time_dst = new Array(
        /* 0  */ [[0, 7, 3, 0, 7, 10, 60], []], //CIS					  //Europe
        /* EU */ [[0, 7, 3, 0, 7, 10, 60], ["RU", "AZ", "AM", "BY", "MD", "UA", "AT", "AL", "AD", "BE", "BG", "BA", "VA", "GB", "HU", "DE", "GR", "DK", "IE", "ES", "IT", "CY", "LV", "LT", "LI", "LU", "MT", "MK", "MC", "NL", "NO", "PL", "PT", "RO", "SM", "CS", "SK", "SI", "TR", "FI", "FR", "HR", "CZ", "CH", "SE", "EE"]],
        /* US */ [[2, 7, 3, 1, 7, 11, 60], ["US", "CA"]],
        /* MX */ [[1, 7, 4, 0, 7, 10, 60], ["MX"]],
        /* CU */ [[3, 7, 3, 0, 7, 10, 60], ["CU"]],
        /* IR */ [[4, 5, 3, 3, 6, 9, 60], ["IR"]],
        /* IL */ [[0, 5, 3, 1, 7, 10, 60], ["IL"]],
        /* EG */ [[0, 5, 4, 0, 4, 8, 60], ["EG"]],
//southern hemisphere
        /* AU */ [[1, 7, 10, 1, 7, 4, 60], ["AU"]],
        /* NZ */ [[0, 7, 9, 1, 7, 4, 60], ["NZ"]],
        /* CL */ [[2, 7, 10, 0, 7, 3, 60], ["CL"]],
        /* BR */ [[1, 7, 11, 0, 7, 2, 60], ["BR"]]
        );
function _v(a) {
    return eval(a)
}
function time(p, tz, fmt, lang) {
    this.p = p;
    if (tz == 999) {
        var now = new Date();
        tz = -1 * now.getTimezoneOffset();
    }
    this.tz = tz;
    if (fmt == '')
        fmt = '%hh:%nn:%ss';
    this.fmt = fmt;
    this.refresh = time_refresh;
    this.format = time_format;
    this.daylight = time_daylight;
    this.dstdata = 0;
    this.dst1 = 0;
    this.dst2 = 0;
    this.dsttype = 0;
    if (!time_lang[lang])
        lang = "en";
    this.lang = lang;
    this.time_m = new Array();
    this.time_m[1] = time_lang[lang][1];
    this.time_m[2] = time_lang[lang][2];
    this.time_m[3] = time_lang[lang][3];
    this.time_m[4] = time_lang[lang][4];
    this.time_m[5] = time_lang[lang][5];
    this.time_m[6] = time_lang[lang][6];
    this.time_m[7] = time_lang[lang][7];
    this.time_m[8] = time_lang[lang][8];
    this.time_m[9] = time_lang[lang][9];
    this.time_m[10] = time_lang[lang][10];
    this.time_m[11] = time_lang[lang][11];
    this.time_m[12] = time_lang[lang][12];
    this.time_w = new Array();
    this.time_w[0] = time_lang[lang][13];
    this.time_w[1] = time_lang[lang][14];
    this.time_w[2] = time_lang[lang][15];
    this.time_w[3] = time_lang[lang][16];
    this.time_w[4] = time_lang[lang][17];
    this.time_w[5] = time_lang[lang][18];
    this.time_w[6] = time_lang[lang][19];
    window.setInterval("time_" + p + ".refresh()", 1000);
}
function time_refresh() {
    var now = new Date();
    now = new Date(now.getTime() + this.tz * 60000);
    if (this.dst1 && this.dsttype) {
        if (now.getTime() > this.dst1 || now.getTime() < this.dst2)
            now = new Date(now.getTime() + this.dstdata * 60000);
    } else if (this.dst1) {
        if (now.getTime() > this.dst1 && now.getTime() < this.dst2)
            now = new Date(now.getTime() + this.dstdata * 60000);
    }
    document.getElementById('time_' + this.p).innerHTML = this.format(now, this.fmt);
}
function time_format(now, time_f) {
    var d = now.getUTCDate();
    var dd = d;
    if (d < 10)
        dd = '0' + d;
    var m = now.getUTCMonth() + 1;
    var mm = m;
    if (m < 10)
        mm = '0' + m;
    var yyyy = now.getUTCFullYear();
    var yy = yyyy - 2000;
    if (yy < 10)
        yy = '0' + yy;
    var h = now.getUTCHours();
    var hh = h;
    if (h < 10)
        hh = '0' + h;
    var H = h % 12;
    if (H == 0)
        H = 12;
    var HH = H;
    if (H < 10)
        HH = '0' + H;
    var n = now.getUTCMinutes();
    var nn = n;
    if (nn < 10)
        nn = '0' + n;
    var s = now.getUTCSeconds();
    var ss = s;
    if (ss < 10)
        ss = '0' + s;
    var w = now.getUTCDay();
    W = this.time_w[w];
    var M = this.time_m[m];
    var p = 'am';
    if (h >= 12)
        p = 'pm';
    var P = 'AM';
    if (h >= 12)
        P = 'PM';
    var s = new String(time_f);
    s = s.replace(new RegExp("%dd"), dd);
    s = s.replace(new RegExp("%d"), d);
    s = s.replace(new RegExp("%mm"), mm);
    s = s.replace(new RegExp("%m"), m);
    s = s.replace(new RegExp("%yyyy"), yyyy);
    s = s.replace(new RegExp("%yy"), yy);
    s = s.replace(new RegExp("%hh"), hh);
    s = s.replace(new RegExp("%h"), h);
    s = s.replace(new RegExp("%nn"), nn);
    s = s.replace(new RegExp("%n"), n);
    s = s.replace(new RegExp("%ss"), ss);
    s = s.replace(new RegExp("%s"), s);
    s = s.replace(new RegExp("%HH"), HH);
    s = s.replace(new RegExp("%H"), H);
    s = s.replace(new RegExp("%W"), W);
    s = s.replace(new RegExp("%M"), M);
    s = s.replace(new RegExp("%p"), p);
    s = s.replace(new RegExp("%P"), P);
    return s.toString();
}
function time_daylight(c) {
    c = time_find_dst(c);
    if (!c) {
        this.dst1 = 0;
        this.dst2 = 0;
        return;
    }
    dd = time_dst[c][0];
    d = time_byweekday(dd[0], dd[1], dd[2] - 1);
    d.setUTCHours(2, 0, 0, 0);
    this.dst1 = d.getTime();
    d = time_byweekday(dd[3], dd[4], dd[5] - 1);
    d.setUTCHours(3, 0, 0, 0);
    this.dst2 = d.getTime();
    if (this.dst1 > this.dst2)
        this.dsttype = 1;
    this.dstdata = dd[6];
}

function time_byweekday(pos, w, mon) {
    var now = new Date();
    now.setUTCMonth(mon, 1);
    w1 = 1 + Math.abs(w - now.getUTCDay());
    now.setUTCDate(w1);	//first needed weekday in month
    wn = 0;
    if (pos)
        wn = (pos - 1) * 7 + w1;
    else {
        for (i = 2; i <= 6; i++) {
            td = new Date(now.getTime() + 7 * i * 86400 * 1000);
            if (td.getUTCMonth() > mon) {
                wn = w1 + 7 * (i - 1);
                break;
            }
        }
    }
    now.setUTCDate(wn);
    return now;
}

function time_find_dst(c) {
    if (!c)
        return;
    for (var i = 0; i < time_dst.length; i++) {
        for (var j = 0; j < time_dst[i][1].length; j++) {
            if (time_dst[i][1][j] == c)
                return i;
        }
    }
}
var timezone = 0;
var timezoneGMT = -1;
$(document).ready(function () {
    if ($.cookie("timezone") == null) {
        timezone = calculate_time_zone();
        $.cookie("timezone", timezone, {expires: 3});
    }
    else {
        timezone = $.cookie("timezone");
    }
    timezoneGMT = -1 * calculate_time_zone();
    $("#timezone").val(timezone);
    calculateTime();
    clock();
});
function changeTimezone(tz) {
    $.cookie("timezone", tz, {expires: 3});
    timezone = tz;
    calculateTime();
}
function calculateTime() {
    timezone = (parseInt(timezone) + parseInt(timezoneGMT)) * 3600;
//    timezone = (parseInt(timezone)) * 3600;
    //alert(timezoneGMT);
    $(".time").each(function () {
        var t = $(this).html();
        t = parseInt(t) + parseInt(timezone);
        myDate = new Date(1000 * t);
        $(this).next('.realtimeh').html(myDate.format("HH:MM"));
        $(this).next('.realtimedh').html(myDate.format("dd-mm-yyyy HH:MM"));
        $(this).next('.realtimehd').html(myDate.format("HH:MM dd-mm-yyyy"));
    });
}
function clock() {
    var t = new Date().getTime();
    newDate = new Date(parseInt(t));
    $("#time").html(newDate.format("HH:MM:ss"));
    setTimeout('clock();', 1000);
}
var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len)
                    val = "0" + val;
                return val;
            };
    return function (date, mask, utc) {
        var dF = dateFormat;
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }
        date = date ? new Date(date) : new Date;
        if (isNaN(date))
            throw SyntaxError("invalid date");
        mask = String(dF.masks[mask] || mask || dF.masks["default"]);
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }
        var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };
        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]};
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
function calculate_time_zone() {
    var rightNow = new Date();
    var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);  // jan 1st
    var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0); // june 1st
    var temp = jan1.toGMTString();
    var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
    temp = june1.toGMTString();
    var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
    var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
    var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
    var dst;
    if (std_time_offset == daylight_time_offset) {
        dst = "0";
    } else {
        var hemisphere = std_time_offset - daylight_time_offset;
        if (hemisphere >= 0)
            std_time_offset = daylight_time_offset;
        dst = "1"; // daylight savings time is observed
    }
    var i;
    return convert(std_time_offset);
}
function convert(value) {
    var hours = parseInt(value);
    value -= parseInt(value);
    value *= 60;
    var mins = parseInt(value);
    value -= parseInt(value);
    value *= 60;
    var secs = parseInt(value);
    var display_hours = hours;
    if (hours == 0) {
        display_hours = "00";
    } else if (hours > 0) {
        display_hours = (hours < 10) ? "+0" + hours : "+" + hours;
    } else {
        display_hours = (hours > -10) ? "-0" + Math.abs(hours) : hours;
    }
    mins = (mins < 10) ? "0" + mins : mins;
    return display_hours;
}
jQuery.cookie = function (key, value, options) {
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        value = String(value);
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    options = value || {};
    var result, decode = options.raw ? function (s) {
        return s;
    } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

