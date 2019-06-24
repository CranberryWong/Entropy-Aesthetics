/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-csspositionsticky-csstransforms-csstransforms3d-csstransformslevel2-csstransitions-eventlistener-forcetouch-input-inputtypes-placeholder-preserve3d-search-touchevents-video-setclasses !*/
!function (e, t, n) { function r(e, t) { return typeof e === t } function i() { var e, t, n, i, o, s, a; for (var l in x) if (x.hasOwnProperty(l)) { if (e = [], t = x[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase()); for (i = r(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++) s = e[o], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = i : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = i), C.push((i ? "" : "no-") + a.join("-")) } } function o(e) { var t = b.className, n = Modernizr._config.classPrefix || ""; if (w && (t = t.baseVal), Modernizr._config.enableJSClass) { var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)"); t = t.replace(r, "$1" + n + "js$2") } Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), w ? b.className.baseVal = t : b.className = t) } function s() { return "function" != typeof t.createElement ? t.createElement(arguments[0]) : w ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments) } function a(e) { return e.replace(/([a-z])-([a-z])/g, function (e, t, n) { return t + n.toUpperCase() }).replace(/^-/, "") } function l() { var e = t.body; return e || (e = s(w ? "svg" : "body"), e.fake = !0), e } function u(e, n, r, i) { var o, a, u, d, p = "modernizr", c = s("div"), f = l(); if (parseInt(r, 10)) for (; r--;) u = s("div"), u.id = i ? i[r] : p + (r + 1), c.appendChild(u); return o = s("style"), o.type = "text/css", o.id = "s" + p, (f.fake ? f : c).appendChild(o), f.appendChild(c), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(t.createTextNode(e)), c.id = p, f.fake && (f.style.background = "", f.style.overflow = "hidden", d = b.style.overflow, b.style.overflow = "hidden", b.appendChild(f)), a = n(c, e), f.fake ? (f.parentNode.removeChild(f), b.style.overflow = d, b.offsetHeight) : c.parentNode.removeChild(c), !!a } function d(e, t) { return !!~("" + e).indexOf(t) } function p(e, t) { return function () { return e.apply(t, arguments) } } function c(e, t, n) { var i; for (var o in e) if (e[o] in t) return n === !1 ? e[o] : (i = t[e[o]], r(i, "function") ? p(i, n || t) : i); return !1 } function f(e) { return e.replace(/([A-Z])/g, function (e, t) { return "-" + t.toLowerCase() }).replace(/^ms-/, "-ms-") } function m(t, n, r) { var i; if ("getComputedStyle" in e) { i = getComputedStyle.call(e, t, n); var o = e.console; if (null !== i) r && (i = i.getPropertyValue(r)); else if (o) { var s = o.error ? "error" : "log"; o[s].call(o, "getComputedStyle returning null, its possible modernizr test results are inaccurate") } } else i = !n && t.currentStyle && t.currentStyle[r]; return i } function v(t, r) { var i = t.length; if ("CSS" in e && "supports" in e.CSS) { for (; i--;) if (e.CSS.supports(f(t[i]), r)) return !0; return !1 } if ("CSSSupportsRule" in e) { for (var o = []; i--;) o.push("(" + f(t[i]) + ":" + r + ")"); return o = o.join(" or "), u("@supports (" + o + ") { #modernizr { position: absolute; } }", function (e) { return "absolute" == m(e, null, "position") }) } return n } function h(e, t, i, o) { function l() { p && (delete M.style, delete M.modElem) } if (o = r(o, "undefined") ? !1 : o, !r(i, "undefined")) { var u = v(e, i); if (!r(u, "undefined")) return u } for (var p, c, f, m, h, y = ["modernizr", "tspan", "samp"]; !M.style && y.length;) p = !0, M.modElem = s(y.shift()), M.style = M.modElem.style; for (f = e.length, c = 0; f > c; c++) if (m = e[c], h = M.style[m], d(m, "-") && (m = a(m)), M.style[m] !== n) { if (o || r(i, "undefined")) return l(), "pfx" == t ? m : !0; try { M.style[m] = i } catch (g) { } if (M.style[m] != h) return l(), "pfx" == t ? m : !0 } return l(), !1 } function y(e, t, n, i, o) { var s = e.charAt(0).toUpperCase() + e.slice(1), a = (e + " " + $.join(s + " ") + s).split(" "); return r(t, "string") || r(t, "undefined") ? h(a, t, i, o) : (a = (e + " " + U.join(s + " ") + s).split(" "), c(a, t, n)) } function g(e, t, r) { return y(e, n, n, t, r) } var C = [], x = [], T = { _version: "3.5.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, t) { var n = this; setTimeout(function () { t(n[e]) }, 0) }, addTest: function (e, t, n) { x.push({ name: e, fn: t, options: n }) }, addAsyncTest: function (e) { x.push({ name: null, fn: e }) } }, Modernizr = function () { }; Modernizr.prototype = T, Modernizr = new Modernizr, Modernizr.addTest("eventlistener", "addEventListener" in e); var b = t.documentElement, w = "svg" === b.nodeName.toLowerCase(), S = T._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""]; T._prefixes = S, Modernizr.addTest("video", function () { var e = s("video"), t = !1; try { t = !!e.canPlayType, t && (t = new Boolean(t), t.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, "")) } catch (n) { } return t }), Modernizr.addTest("csspositionsticky", function () { var e = "position:", t = "sticky", n = s("a"), r = n.style; return r.cssText = e + S.join(t + ";" + e).slice(0, -e.length), -1 !== r.position.indexOf(t) }), Modernizr.addTest("preserve3d", function () { var t, n, r = e.CSS, i = !1; return r && r.supports && r.supports("(transform-style: preserve-3d)") ? !0 : (t = s("a"), n = s("a"), t.style.cssText = "display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);", n.style.cssText = "display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);", t.appendChild(n), b.appendChild(t), i = n.getBoundingClientRect(), b.removeChild(t), i = i.width && i.width < 4) }), Modernizr.addTest("placeholder", "placeholder" in s("input") && "placeholder" in s("textarea")); var _ = function () { function e(e, t) { var i; return e ? (t && "string" != typeof t || (t = s(t || "div")), e = "on" + e, i = e in t, !i && r && (t.setAttribute || (t = s("div")), t.setAttribute(e, ""), i = "function" == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), i) : !1 } var r = !("onblur" in t.documentElement); return e }(); T.hasEvent = _, Modernizr.addTest("inputsearchevent", _("search")); var E = s("input"), P = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "), k = {}; Modernizr.input = function (t) { for (var n = 0, r = t.length; r > n; n++) k[t[n]] = !!(t[n] in E); return k.list && (k.list = !(!s("datalist") || !e.HTMLDataListElement)), k }(P); var A = "search tel url email datetime date month week time datetime-local number range color".split(" "), z = {}; Modernizr.inputtypes = function (e) { for (var r, i, o, s = e.length, a = "1)", l = 0; s > l; l++) E.setAttribute("type", r = e[l]), o = "text" !== E.type && "style" in E, o && (E.value = a, E.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(r) && E.style.WebkitAppearance !== n ? (b.appendChild(E), i = t.defaultView, o = i.getComputedStyle && "textfield" !== i.getComputedStyle(E, null).WebkitAppearance && 0 !== E.offsetHeight, b.removeChild(E)) : /^(search|tel)$/.test(r) || (o = /^(url|email)$/.test(r) ? E.checkValidity && E.checkValidity() === !1 : E.value != a)), z[e[l]] = !!o; return z }(A); var O = "CSS" in e && "supports" in e.CSS, N = "supportsCSS" in e; Modernizr.addTest("supports", O || N); var L = T.testStyles = u; Modernizr.addTest("touchevents", function () { var n; if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0; else { var r = ["@media (", S.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join(""); L(r, function (e) { n = 9 === e.offsetTop }) } return n }); var R = "Moz O ms Webkit", $ = T._config.usePrefixes ? R.split(" ") : []; T._cssomPrefixes = $; var j = function (t) { var r, i = S.length, o = e.CSSRule; if ("undefined" == typeof o) return n; if (!t) return !1; if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in o) return "@" + t; for (var s = 0; i > s; s++) { var a = S[s], l = a.toUpperCase() + "_" + r; if (l in o) return "@-" + a.toLowerCase() + "-" + t } return !1 }; T.atRule = j; var U = T._config.usePrefixes ? R.toLowerCase().split(" ") : []; T._domPrefixes = U; var W = { elem: s("modernizr") }; Modernizr._q.push(function () { delete W.elem }); var M = { style: W.elem.style }; Modernizr._q.unshift(function () { delete M.style }), T.testAllProps = y, T.testAllProps = g, Modernizr.addTest("cssanimations", g("animationName", "a", !0)), Modernizr.addTest("csstransforms3d", function () { var e = !!g("perspective", "1px", !0), t = Modernizr._config.usePrefixes; if (e && (!t || "webkitPerspective" in b.style)) { var n, r = "#modernizr{width:0;height:0}"; Modernizr.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", L(r + n, function (t) { e = 7 === t.offsetWidth && 18 === t.offsetHeight }) } return e }), Modernizr.addTest("csstransformslevel2", function () { return g("translate", "45px", !0) }), Modernizr.addTest("csstransforms", function () { return -1 === navigator.userAgent.indexOf("Android 2.") && g("transform", "scale(1)", !0) }), Modernizr.addTest("csstransitions", g("transition", "all", !0)); var V = T.prefixed = function (e, t, n) { return 0 === e.indexOf("@") ? j(e) : (-1 != e.indexOf("-") && (e = a(e)), t ? y(e, t, n) : y(e, "pfx")) }; Modernizr.addTest("forcetouch", function () { return _(V("mouseforcewillbegin", e, !1), e) ? MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN && MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN : !1 }), i(), o(C), delete T.addTest, delete T.addAsyncTest; for (var q = 0; q < Modernizr._q.length; q++) Modernizr._q[q](); e.Modernizr = Modernizr }(window, document);