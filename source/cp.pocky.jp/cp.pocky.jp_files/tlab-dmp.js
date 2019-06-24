//  ========================================================
//  tlab-dmp.js
//  Copyright 2015 TEAM-LAB
//  ========================================================

if (!window.TlabDMP) TlabDMP = {};
(function(TlabDMP){
  TlabDMP.beaconBaseUrl     = (TlabDMP.bbu)? TlabDMP.bbu : "";
  TlabDMP.crossOriginSetup  = (TlabDMP.cos)? TlabDMP.cos : {};
  TlabDMP.userTrackCookie   = {
    name : (TlabDMP.utc)? TlabDMP.utc : "usertrack_asp3",
    maxage : 31536000,
    path : "/",
    crossOrigin: false
  };

  var awsSdkUrl = "https://sdk.amazonaws.com/js/aws-sdk-2.1.18.min.js";
  var accessKey = "";
  var secretAccessKey = "";
  var region = "ap-northeast-1";
  var streamName = (TlabDMP.sn)? TlabDMP.sn : TlabDMP.crossOriginSetup.server.match(/^(\w+:)?\/{0,3}([0-9a-z\.\-:]+?):?[0-9]*?(\/|$)/i)[2];

  // ===============================================
  // TlabDMP.Util
  if (!TlabDMP.Util){
    TlabDMP.Util = (function($) {
      $.random = function(max) {
        return Math.floor(Math.random() * max);
      };

      $.randomId = function() {
        return Number(new Date()) + "." + TlabDMP.Util.random(1e10);
      };

      $.isHash = function(obj) {
        return (obj && obj.constructor == Object);
      };

      $.isObject = function(obj) {
        return (obj && typeof obj === "object");
      };

      $.contains = function(array, val) {
        array = array || [];
        for (var i = 0; i < array.length; i++) {
          if (val === array[i])
            return true;
        }
        return false;
      };

      $.paramValue = function(obj) {
        if (obj instanceof Array)
          obj = obj.join(',');
        return encodeURIComponent(obj);
      };

      $.normalParam = function(obj) {
        return ($.isHash(obj)) ? obj : {item_id: obj};
      };

      $.normalParamList = function(obj) {
        var res = [];
        obj = (obj instanceof Array) ? obj : [ obj ];
        for (var i = 0; i < obj.length; i++) {
          res[i] = $.normalParam(obj[i]);
        }
        return res;
      };

      $.isExtName = function(name) {
        return (name.search(/^ext\./) >= 0);
      };

      $.extNames = function(args) {
        var exts = [];
        for (var name in $.normalParam(args)) {
          if ($.isExtName(name))
            exts.push(name);
        }
        return exts;
      };

      $.imageStorage = [];
      $.loadImage = function(img) {
        if (typeof img == "string")
          img = $.createImage(img);
        $.imageStorage.push(img);
      };

      $.createImage = function(src) {
        var elem = document.createElement("img");
        elem.width = 1;
        elem.height = 1;
        elem.style.cssText = "display:none";
        elem.src = src;
        return elem;
      };

      $.loadJs = function(src, elemId) {
        var elem = document.createElement("script");
        elem.type = "text/javascript";
        elem.src = src;
        elem.charset = "UTF-8";
        document.getElementById(elemId).appendChild(elem);
      };

      $.hostName = function(url) {
        return String(url).replace(/^(\w+:)?(\/\/)/, "")
          .replace(/[:\/].*/, "");
      };

      $.addListener = function(elem, type, handler, altType) {
        if (elem.addEventListener)
          elem.addEventListener(type, handler, false);
        else if (elem.attachEvent)
          elem.attachEvent(altType || ('on' + type), handler);
      };

      $.doNotTrack = function() {
        var dnt = (navigator.doNotTrack || navigator.msDoNotTrack);
        return (dnt === "yes" || dnt === "1");
      };

      $.isValidCrossOriginSetup = function(coSetup) {
        return !!(coSetup && typeof coSetup.server === "string");
      };

      $.isValidCookieSetup = function(ckParam) {
        return !!(ckParam && typeof ckParam.name === "string");
      };

      $.warn = function(msg) {
        try {
          console.warn(msg);
        } catch (e) {}
      };

      $.ready = (function() {
        var doc = window.document;
        var handlers = [];
        var handle = function(handler) {
          handle = defer;
          if (doc.readyState === "loading") {
            TlabDMP.Util.addListener(doc, "DOMContentLoaded", ready,
              "onreadystatechange");
          } else {
            ready();
          }
          handle(handler);
        };
        var defer = function(handler) {
          handlers.push(handler);
        };
        var run = function(handler) {
          handler();
        };
        var ready = function() {
          if (handle === run)
            return;
          if (!doc.body) {
            return setTimeout(ready, 1);
          }
          handle = run;
          while (handlers.length)
            (handlers.shift())();
        };
        return function(handler) {
          if (typeof handler === "function")
            handle(handler);
        };
      })();

      $.jsonStringify = function(obj){
        var dic_e = new Object();
        dic_e['\b'] = '\\b';
        dic_e['\f'] = '\\f';
        dic_e['\n'] = '\\n';
        dic_e['\r'] = '\\r';
        dic_e['\t'] = '\\t';
        dic_e['\"'] = '\\"';
        dic_e['\\'] = '\\\\';
        function stringify(obj){
          var i, k, s, r, num;
          var type = typeof(obj);
          if(type == "object"){
            if(!obj){
              return "null";
            }else if(obj.constructor == Array){
              s = "[";
              num = obj.length;
              for(i=0;i < num;i++){
                if(i)
                  s += ",";
                s += stringify(obj[i]);
              }
              return s + "]";
            }else{
              r = false;
              s = "{";
              for(k in obj){
                if(r)
                  s += ",";
                else
                  r = true;
                s += stringify(k) + ":" + stringify(obj[k]);
              }
              return s + "}";
            }
          }else if(type == "string"){
            s = '"';
            num = obj.length;
            for(i=0;i < num;i++){
              if(dic_e[obj.charAt(i)] != undefined){
                s += dic_e[obj.charAt(i)];
              }else{
                s += obj.charAt(i);
              }
            }
            return s + '"';
          }else if(type == "number"){
            if(isNaN(obj)) return "null";
            if(obj == Number.POSITIVE_INFINITY) return "null";
            if(obj == Number.NEGATIVE_INFINITY) return "null";
            return obj.toString();

          }else if(type == "boolean"){
            return obj.toString();
          }else if(type == "null" || type == "undefined"){
            return "null";
          }
          return null;
        }
        return stringify(obj);
      };

      $.satisfyAWS = function(){
        var a = window.navigator.userAgent.toLowerCase();
        var v = window.navigator.appVersion.toLowerCase();

        if (a.indexOf("ie") != -1) { // Internet Explorer 10+
          return v.match(/msie [6-9]\./) === null;
        } else if (a.indexOf("firefox") != -1) { // Firefox 23.0+
          var version = a.match(/firefox\/([1-9][0-9]*)/);
          if (version === null) return false;
          return parseInt(version[1], 10) >= 23;
        } else if (a.indexOf("chrome") != -1) { // Chrome 28.0+
          var version = a.match(/chrome\/([1-9][0-9]*)/);
          if (version === null) return false;
          return parseInt(version[1], 10) >= 28;
        } else if (a.indexOf("version") != -1) { // Safari 5.1+
          var version = a.match(/version\/(\d+\.\d+)/);
          if (version === null) return false;
          return parseFloat(version[1]) >= 5.1;
        }
        return false;
      }

      $.stripLeft = function(str) {
        return str.replace(/^ +/, '');
      };

      $.parseCookie = function() {
        var acc = {};
        var dat = document.cookie.split(';');
        for (var i=0; i<dat.length; i++){
          var fragments = dat[i].split('=');
          acc[$.stripLeft(fragments[0])] = decodeURI(fragments.slice(1).join('='));
        }
        return acc;
      };

      return $;
    })({});
  }

  // ===============================================
  // TlabDMP.RemoteProcessClient
  if (!TlabDMP.RemoteProcessClient){
    TlabDMP.RemoteProcessClient = (function($) {
      var $$ = $.prototype;
      $.available = !!(window.postMessage && window.JSON);
      $.nextId = 1;

      $$._init = function() {
        if (this.id !== undefined || !$.available)
          return TlabDMP.Util.warn("RemoteProcessClient creation failed");
        this.window = null;
        this.queue = [];
        var thisRP = this;
        var id = $.nextId++;
        var name = "TlabDMP_RS" + id;
        var doc = window.document;

        var iframe = doc.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.left = iframe.style.top = "-1000px";
        iframe.name = name;
        iframe.src = this.url + "/index.html";
        this._iframe = iframe;

        var form = doc.createElement("form");
        form.target = name;
        form.method = "POST";
        form.action = this.url + "/server.html";

        var host = TlabDMP.Util.hostName(this.url);
        TlabDMP.Util.addListener(window, "message", function(event) {
          if (TlabDMP.Util.hostName(event.origin) === host)
            thisRP._handleReply(event);
        });

        TlabDMP.Util.ready(function() {
          doc.body.appendChild(iframe);
          doc.body.appendChild(form);
          form.submit();
        });
        this.id = id;
      };

      $$.request = function(reqBody, callback) {
        if (this.id === undefined)
          return;
        var reqId = this.queue.length;
        var qentry = { id: reqId, body: reqBody, callback: callback };
        this.queue[reqId] = qentry;
        if (this.window !== null)
          this._sendMessage(qentry);
      };

      $$._sendMessage = function(qentry) {
        var msg = { id: qentry.id, body: qentry.body, instanceId: this.id };
        this.window.postMessage(JSON.stringify(msg), this.url);
      };

      $$._handleReply = function(event) {
        var thisRP = this;
        var msg = JSON.parse(event.data) || {};
        if (msg.type === "READY") {
          if (msg.from === (this.url + "/server.html")){
            setTimeout(function() {
              for (var i = 0; i < thisRP.queue.length; i++) {
                thisRP._sendMessage(thisRP.queue[i]);
              }
            }, 0);
            this.window = this._iframe.contentWindow;
          }
        } else if (typeof msg.id === "number") {
          if (msg.instanceId !== this.id) return;
          var ok = (msg.type === "OK");
          var qentry = this.queue[msg.id];
          this.queue[msg.id] = null;
          var resBody = (ok) ? msg.body : undefined;
          var error = (ok) ? undefined : msg.body;
          if (qentry && typeof qentry.callback === "function")
            qentry.callback.call(this, qentry.body, resBody, error);
        }
      };

      return $;
    })(function(url) { // constructor
      this.url = (/^https?:/.test(url))? url : window.location.protocol + url;
      this._init();
    });
  }

  // ===============================================
  // TlabDMP.RemoteProcessServer
  if (!TlabDMP.RemoteProcessServer){
    TlabDMP.RemoteProcessServer = (function($) {
      $.handler = null;
      $.window = window.parent;

      $.init = function(handler) {
        if (window.top == window || !window.postMessage || !window.JSON)
          return TlabDMP.Util.warn("RemoteProcessServer creation failed");

        TlabDMP.Util.addListener(window, "message", function(event) {
          if (typeof $.handler === "function")
            $._handleReply(event);
        });

        $.handler = handler;
        var msg = { id: 0, type: "READY", from: window.location.href };
        $.window.postMessage(JSON.stringify(msg), "*");
      };

      $._handleReply = function(event) {
        var msg = JSON.parse(event.data) || {};
        if (typeof msg.id !== "number" || msg.body === undefined || typeof msg.instanceId !== "number")
          return;

        try {
          var response = $.handler(msg.body, event.origin);
          if (response !== undefined) {
            var msg = { id: msg.id, type: "OK", body: response, instanceId: msg.instanceId };
            $.window.postMessage(JSON.stringify(msg), event.origin);
          }
        } catch (e) {
          var msg = { id: msg.id, type: "NG", body: String(e), instanceId: msg.instanceId };
          $.window.postMessage(JSON.stringify(msg), event.origin);
        }
      };

      return $;
    })({});
  }

  // ===============================================
  // TlabDMP.Result
  if (!TlabDMP.Result){
    TlabDMP.Result = (function($) {
      var setValue = function(obj, value, flag) {
        obj.appliedTo = function(handler) {
          if (typeof handler === "function")
            handler(value);
        };
        obj.toString = function() {
          return "Result[" + flag + ":" + value + "]";
        };
        return obj;
      };

      $.sync = function(value) {
        return setValue(new Function(), value, "SYNC");
      };

      $.async = function() {
        var handlers = [];
        var result = function(value) {
          if (handlers !== null) {
            while (handlers.length)
              (handlers.shift())(value);
            handlers = null;
            setValue(result, value, "ASYNC");
          }
        };
        result.appliedTo = function(handler) {
          if (typeof handler === "function")
            handlers.push(handler);
        };
        result.toString = function() {
          return "Result[ASYNC===]";
        };
        return result;
      };

      $.apply = function(func, result) {
        var newResult = new Function();
        newResult.appliedTo = function(handler) {
          result.appliedTo(function(value) {
            handler(func(value));
          });
        };
        newResult.toString = function() {
          return "Result[APPLY:" + result.toString() + "]";
        };
        return newResult;
      };

      $.apply2 = function(func, result1, result2) {
        var newResult = new Function();
        newResult.appliedTo = function(handler) {
          var pair = [];
          var insert = function(method, value) {
            method.call(pair, value);
            if (pair.length == 2)
              handler(func(pair[0], pair[1]));
          };
          result1.appliedTo(function(value) {
            insert(pair.unshift, value);
          });
          result2.appliedTo(function(value) {
            insert(pair.push, value);
          });
        };
        newResult.toString = function() {
          return "Result[APPLY:" + result1.toString()
            + ":" + result2.toString() + "]";
        };
        return newResult;
      };

      $.flatApply = function(func, result) {
        var newResult = new Function();
        newResult.appliedTo = function(handler) {
          result.appliedTo(function(value) {
            func(value).appliedTo(handler);
          });
        };
        newResult.toString = function() {
          return "Result[FLATAPPLY:" + result.toString() + "]";
        };
        return newResult;
      };

      return $;
    })({});
  }

  // ===============================================
  // TlabDMP.COCookieClient
  TlabDMP.COCookieClient = (function($) {
    $.client = null;

    var init = function() {
      var coSetup = TlabDMP.crossOriginSetup;
      if (!TlabDMP.Util.isValidCrossOriginSetup(coSetup))
        return TlabDMP.Util.warn("crossOriginSetup is invalid");
      $.client = new TlabDMP.RemoteProcessClient(coSetup.server);
    };

    $.select = function(command, ckParam) {
      if ($.client === null)
        init();
      var result = TlabDMP.Result.async();
      $.client.request({
        command: command,
        cookie: ckParam
      }, function(reqBody, resBody) {
        result(resBody);
      });
      return result;
    };

    $.update = function(command, ckParam, value) {
      if ($.client === null)
        init();
      $.client.request({
        command: command,
        cookie: ckParam,
        value: value
      });
    };

    return $;
  })({});

  // ===============================================
  // TlabDMP.COCookieService
  TlabDMP.COCookieService = (function($) {
    var makeCookie = function(ckParam) {
      return new TlabDMP.Cookie({
        name: escape(ckParam.name),
        maxage: ckParam.maxage
      });
    };

    var validateOrigin = function(arg, origin) {
      var permission = TlabDMP.crossOriginPermission;
      if (!(arg instanceof Object && typeof origin === "string"
            && TlabDMP.Util.isValidCookieSetup(arg.cookie)
            && typeof arg.command === "string"
            && permission instanceof Object))
        return null;
      var host = TlabDMP.Util.hostName(origin);
      for (var i = 0; i < permission.length; i++) {
        if (!TlabDMP.Util.contains(permission[i].name, arg.cookie.name))
          continue;
        if (TlabDMP.Util.contains(permission[i].domains, host))
          return permission[i].domains;
      }
      return null;
    };

    $.process = function(arg, origin) {
      var domains = validateOrigin(arg, origin);
      if (!domains)
        return null;
      var cookie = makeCookie(arg.cookie);
      var dispatch = {
        set: function(value) {
          cookie.set(value || "");
        },
        remove: function() {
          cookie.remove();
        },
        get: function() {
          return cookie.get() || null;
        },
        create: function() {
          var value = cookie.get();
          if (!value) {
            value = TlabDMP.Util.randomId();
            dispatch.set(value);
          }
          return value;
        }
      };
      return dispatch[arg.command](arg.value);
    };

    return $;
  })({});

  // ===============================================
  // TlabDMP.Cookie
  if (!TlabDMP.Cookie){
    TlabDMP.Cookie = (function($) {
      $.shortTerm = 10;
      var $$ = $.prototype;
      var expired = (new Date(1970, 0, 2)).toGMTString();

      $$.get = function() {
        var name = this.name;
        var si, ck = document.cookie + ";";
        if ((si = ck.indexOf(name + "=")) < 0)
          return false;
        return unescape(ck.substring(si + name.length + 1, ck.indexOf(";", si)));
      };

      $$.set = function(value, maxage) {
        var ck = this.name + "=" + escape(value);
        maxage = Number(maxage || this.maxage);
        if (isFinite(maxage)) {
          var ex = new Date((new Date()).getTime() + maxage * 1000);
          ck += ";expires=" + ex.toGMTString();
        }
        document.cookie = ck + ((this.path) ? ";path=" + this.path : "")
          + ((this.domain) ? ";domain=" + this.domain : "")
          + ((this.secure) ? ";secure" : "");
      };

      $$.remove = function() {
        document.cookie = this.name + "=;expires=" + expired
          + ((this.path) ? ";path=" + this.path : "")
          + ((this.domain) ? ";domain=" + this.domain : "");
      };

      return $;
    })(function(param) { // constructor
      param = param || {};
      this.name = param.name || "_";
      this.path = param.path;
      this.domain = param.domain;
      this.secure = param.secure;
      this.maxage = param.maxage;
      if (this.crossOrigin)
        this.maxage = $.shortTerm;
    });
  }

  // ===============================================
  // TlabDMP.UserTrackRecord
  if(!TlabDMP.UserTrackRecord) {
    TlabDMP.UserTrackRecord = (function ($) {
      var dnt = TlabDMP.Util.doNotTrack();
      var ckParam = TlabDMP.userTrackCookie;
      var crossOrigin = (TlabDMP.crossOriginSetup && ckParam.crossOrigin);
      var dntMark = "*";
      $.cookie = new TlabDMP.Cookie(ckParam);
      $.crossOrigin = (crossOrigin && !dnt);
      $.disabled = (crossOrigin && dnt);
      if ($.disabled && $.cookie.get() !== dntMark) {
        $.cookie.set(dntMark);
        if (crossOrigin)
          TlabDMP.COCookieClient.update("remove", ckParam);
      }

      var get = function () {
        if ($.disabled)
          return "";
        var value = $.cookie.get();
        return (value && value !== dntMark) ? value : null;
      };

      $.create = function () {
        var localvalue = get();
        var hubresult;
        var rtv;
        if($.crossOrigin) {
          hubresult = TlabDMP.COCookieClient.select("get", ckParam);
          rtv = TlabDMP.Result.flatApply(function(hubvalue){
            if (hubvalue){
              if (hubvalue !== localvalue) {
                localvalue = hubvalue;
              }
              return TlabDMP.Result.sync(localvalue);
            }
            else {
              var result;
              if (localvalue){
                result = TlabDMP.Result.sync(localvalue);
              }
              else {
                result = TlabDMP.COCookieClient.select("create", ckParam)
              }
              return result;
            }
          }, hubresult);
        }
        else {
          if (localvalue) {
            rtv = TlabDMP.Result.sync(localvalue);
          }
          else{
            rtv = TlabDMP.Result.sync(TlabDMP.Util.randomId());
          }
        }

        rtv.appliedTo(function(hv){
          $.cookie.set(hv);
        });

        return rtv;
      };

      $.get = function () {
        return (get() || "");
      };

      $.remove = function () {
        $.cookie.remove();
        if ($.crossOrigin)
          TlabDMP.COCookieClient.update("remove", ckParam);
      };

      return $;
    })({});
  }

  // ===============================================
  // TlabDMP.UrlList
  if (!TlabDMP.UrlList){
    TlabDMP.UrlList = (function($) {
      var $$ = $.prototype;

      var toResult = function (value) {
        return (typeof value === "function") ? value
          : TlabDMP.Result.sync(String(value));
      };

      $$.userId = function(value) {
        this._userId = toResult(value);
      };

      $$.trackingId = function(value) {
        this._trackingId = toResult(value);
      };

      $$.push = function(baseUrl) {
        if (baseUrl)
          this.list.push(String(baseUrl));
      };

      $$.forEach = function(handler) {
        var list = this.list;
        var userResult = TlabDMP.Result.apply2(function(user_id, tracking_id) {
          var user = new TlabDMP.Param();
          user.put("user_id", user_id);
          user.put("tracking_id", tracking_id);
          return (user.isEmpty()) ? "" : ("&" + user);
        }, this._userId, this._trackingId);
        userResult.appliedTo(function(userParam) {
          for (var i = 0; i < list.length; i++) {
            handler(list[i] + userParam);
          }
        });
      };

      return $;
    })(function() { // constructor
      this.list = [];
      this._userId = TlabDMP.Result.sync("");
      this._trackingId = TlabDMP.Result.sync("");
    });
  }

  if(!TlabDMP.KinesisDispatcher)
    TlabDMP.KinesisDispatcher = (function($) {
      var loading = false;
      var queue = [];

      var delegate = {
        push: function(input){
          var obj = {
            timestamp: new Date().getTime(),
            referer: window.location.href,
            agent: window.navigator.userAgent,
            cookie: TlabDMP.Util.parseCookie(),
            param: input
          };

          var params = {
            Data: TlabDMP.Util.jsonStringify(obj),
            PartitionKey: "" + new Date().getTime(),
            StreamName: streamName
          };

          $._instance.putRecord(params, function(err, data){
            if (err) TlabDMP.AlterDispatcher.dispatch(input);
          });
        }
      };

      var onAWSLoaded = function(){
        while (queue.length) $.kinesis().push(queue.shift());
      };

      var pollAWSLoad = function(){
        if (typeof AWS !== 'undefined') onAWSLoaded();
        else setTimeout(pollAWSLoad, 100);
      };

      $.kinesis = function(){
        if($._instance) return delegate;
        if(!loading){
          var script = document.createElement("script");
          script.src = awsSdkUrl;
          document.getElementsByTagName("script")[0].parentNode.appendChild(script);
          loading = true;
          pollAWSLoad();
        }
        if (typeof AWS !== 'undefined'){
          AWS.config.update({accessKeyId: accessKey, secretAccessKey: secretAccessKey, region: region});
          $._instance = new AWS.Kinesis();
          return delegate;
        } else {
          return queue;
        }
      };

      $.dispatch = function(params){
        $.kinesis().push(params);
      };

      return $;
    })({});

    if(!TlabDMP.KinesisDispatcherArray)
      TlabDMP.KinesisDispatcherArray = (function($) {
        var loading = false;
        var queue = [];

        var delegate = {
          push: function(inputArray){
            paramsArray = [];
            for(var i = 0; i < inputArray.length; i++){
              var obj = {
                timestamp: new Date().getTime(),
                referer: window.location.href,
                agent: window.navigator.userAgent,
                cookie: TlabDMP.Util.parseCookie(),
                param: inputArray[i]
              };
              var params = {
                Data: TlabDMP.Util.jsonStringify(obj),
                PartitionKey: "" + new Date().getTime(),
              };
              paramsArray.push(params);
            }
            var records = {
              Records: paramsArray,
              StreamName: streamName
            }
            $._instance.putRecords(records, function(err, data){
              if (err) TlabDMP.AlterDispatcherArray.dispatch(inputArray);
            });
          }
        };

        var onAWSLoaded = function(){
          while (queue.length) $.kinesis().push(queue.shift());
        };

        var pollAWSLoad = function(){
          if (typeof AWS !== 'undefined') onAWSLoaded();
          else setTimeout(pollAWSLoad, 100);
        };

        $.kinesis = function(){
          if($._instance) return delegate;
          if(!loading){
            var script = document.createElement("script");
            script.src = awsSdkUrl;
            document.getElementsByTagName("script")[0].parentNode.appendChild(script);
            loading = true;
            pollAWSLoad();
          }
          if (typeof AWS !== 'undefined'){
            AWS.config.update({accessKeyId: accessKey, secretAccessKey: secretAccessKey, region: region});
            $._instance = new AWS.Kinesis();
            return delegate;
          } else {
            return queue;
          }
        };

        $.dispatch = function(paramsArray){
          $.kinesis().push(paramsArray);
        };

        return $;
      })({});

  if(!TlabDMP.AlterDispatcher)
    TlabDMP.AlterDispatcher = (function($){
      var imagePath = "/put.gif";
      var _generateImageUrl = function (params) {
        var encoded = encodeURIComponent(TlabDMP.Util.jsonStringify(params));
        return TlabDMP.beaconBaseUrl + imagePath + "?" + encoded;
      };

      $.dispatch = function(params){
        TlabDMP.Util.loadImage(_generateImageUrl(params));
      };

      return $;
    })({});

  // POST puts Beacon Array
  if(!TlabDMP.AlterDispatcherArray)
    TlabDMP.AlterDispatcherArray = (function($){
	  var xhr = new XMLHttpRequest();
      $.dispatch = function(paramsArray){      	
      	xhr.open("POST",TlabDMP.beaconBaseUrl + "/puts.gif");	  
	  	xhr.setRequestHeader("Content-Type", "application/json");
	  	xhr.setRequestHeader("Accept", "application/json");
		xhr.send(JSON.stringify(paramsArray));
      };

      return $;
    })({});  

  // ===============================================
  // TlabDMP.Beacon
  if(!TlabDMP.Beacon) {
    TlabDMP.Beacon = (function ($) {
      var $$ = $.prototype;

      $$.sendRequest = function (data) {
        var self = this;
        this.trackingId.appliedTo(function (trackingId) {
          var params = {tracking_id: trackingId};
          if (self.userId) params["user_id"] = self.userId;
          for (var k in data) {
            params[k] = data[k];
          }
          if (TlabDMP.Util.satisfyAWS()) TlabDMP.KinesisDispatcher.dispatch(params);
          else TlabDMP.AlterDispatcher.dispatch(params);
        });
      };

      return $;
    })(function (trackingId, userId) {
      this.trackingId = (trackingId) ? TlabDMP.Result.sync(String(trackingId)) : TlabDMP.UserTrackRecord.create();
      this.userId = userId;
    });
  }

  // Post Beacon Array
  if(!TlabDMP.PostBeacons) {
    TlabDMP.PostBeacons = (function ($) {
      var $$ = $.prototype;

      $$.sendRequest = function (dataArray) {
        var self = this;
        this.trackingId.appliedTo(function (trackingId) {
          var paramsArray = [];
          for (var j = 0; j < dataArray.length; j++){
          	var params = {tracking_id: trackingId};
          	if (self.userId) params["user_id"] = self.userId;
	        for (var k in dataArray[j]) {
    	      params[k] = dataArray[j][k];
        	}
        	paramsArray.push(params);
       	  }
          if (TlabDMP.Util.satisfyAWS()) TlabDMP.KinesisDispatcherArray.dispatch(paramsArray);
          else TlabDMP.AlterDispatcherArray.dispatch(paramsArray);
        });
      };
      
      return $;
    })(function (trackingId, userId) {
      this.trackingId = (trackingId) ? TlabDMP.Result.sync(String(trackingId)) : TlabDMP.UserTrackRecord.create();
      this.userId = userId;
    });
  }  
  
  
})(TlabDMP);

TlabDMP.loaded = true;
if (TlabDMP.queue){
  var swap, queue;
  swap = TlabDMP.queue;
  queue = {
    push: function (data) {
      switch (data.__type) {
        case "beacon":
          new TlabDMP.Beacon(data.t, data.u).sendRequest(data.d);
          break;
        case "post-beacons":
          new TlabDMP.PostBeacons(data.t, data.u).sendRequest(data.d);  
          break; 
      }
    }
  };

  TlabDMP.queue = queue;
  setTimeout(function(){
    for (var i=0; i<swap.length; i++) TlabDMP.queue.push(swap[i]);
  }, 10);
}

if(window.tlabDmpAsyncInit && typeof window.tlabDmpAsyncInit === "function"){
  window.tlabDmpAsyncInit();
}

// ===============================================
