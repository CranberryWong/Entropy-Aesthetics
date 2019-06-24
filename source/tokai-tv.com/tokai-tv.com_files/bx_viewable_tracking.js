(function() {

  // true: can use api
  var useIntersectionObserver = true;
  var logger = logger || {};
  logger.DEBUG = false;
  logger.info = function (args) {
    if (logger.DEBUG) {
      window.bxViewObj=viewableObj;
      console.log(args);
    }
  };

  var searchRetryMax = 10;
  var searchRetryCount = 0;
  var searchRetryInterval = 100;
  // var pollingTime = 1000;
  // var viewableAdmitTime = 3000;
  var pollingTime = 100;
  var viewableAdmitTime = 1000;
  var trkcnt = 1;

  var regulationMatchList = ["125x125", "160x600", "200x200", "300x250", "320x180",
                             "300x500", "300x600", "320x100", "320x150",
                             "320x50", "336x280", "468x60", "550x250",
                             "728x90", "970x250", "250x250", "300x1050"];
  var isSafeFrame = typeof $sf !== 'undefined';
  var isIntersectionObserver = useIntersectionObserver && typeof IntersectionObserver === 'function';
  var viewableObj = {};
  var viewableEventList = {
    VIEWABLE:{eventId: 1, admitTime: viewableAdmitTime},
    NO_MEASURABLE:{eventId: -1, admitTime: 0}
  };
  var ViewMeasurementType = {
    safeFrame: 1,
    intersectionObserver: 2,
    geoLocation: 3
  };

  var IntersectionObserverObj = {
    viewableThreshold: 0.5,
    observer: null,
  };

  var init = function () {
    var rndid = "bxtrk_" + ((new Date().getTime()) % 100000000) + Math.round(Math.random() * 100000000.0);
    document.write('<div id=' + rndid + '></div>');

    var position = document.getElementById(rndid);
    viewableObj.startElement = position.parentNode;
    viewableObj.trkParam = position.parentNode.getAttribute('data-src');

    var siStartIndex = viewableObj.trkParam.indexOf("si=") + 3;
    viewableObj.bxvs = "bxvs_" + viewableObj.trkParam.substring(siStartIndex, siStartIndex + 32);

    viewableObj.totalViewTime = 0;
    viewableObj.pollingFlag = false;
    viewableObj.eventIndex = 0;
    viewableObj.viewableEvent = viewableEventList.VIEWABLE;

    var measurableType = selectViewMeasurementType();
    viewableObj.vmt = measurableType; 
    if (measurableType === ViewMeasurementType.safeFrame) {
      logger.info("setting startSafeFramePolling!");
      viewableObj.startPolling = function() { startSafeFramePolling(); };
      viewableObj.pausePolling = function() { pausePolling(); };
    } else if (measurableType === ViewMeasurementType.intersectionObserver) {
      logger.info("setting startIntersectionObserverPolling!");
      IntersectionObserverObj.observer = new IntersectionObserver(function (entries, observer) {
          for (var num in entries) {
            logger.info(entries[num]);
            var ratio = entries[num].intersectionRatio;
            if(ratio >= IntersectionObserverObj.viewableThreshold) {
              logger.info(ratio);
              viewableObj.timerId = setInterval(function() {
                updateTotalTime(viewableObj, true);
              }, pollingTime);
            } else {
              if (viewableObj.timerId !== null) {
                clearInterval(viewableObj.timerId);
                viewableObj.totalViewTime = 0;
                viewableObj.timerId = null;
              }
            }
          }
        }, {
          threshold: [IntersectionObserverObj.viewableThreshold]
        });
      viewableObj.startPolling = function() { startApiPolling(); };
      viewableObj.pausePolling = function() { pauseApiPolling(); };
    } else {
      logger.info("setting startPolling!");
      viewableObj.startPolling = function() { startPolling(); };
      viewableObj.pausePolling = function() { pausePolling(); };
    }
  };

  var selectViewMeasurementType = function() {
    if (isSafeFrame) {
      return ViewMeasurementType.safeFrame;
    }

    var type = ViewMeasurementType.geoLocation;
    if (isIntersectionObserver) {
      type = ViewMeasurementType.intersectionObserver;
    }
    try {
      if (top.document) {
        type = ViewMeasurementType.geoLocation;
      }
    } catch (e) {}
    return type;
  };

  var exec = function() {
    if (document.readyState === 'complete') {
      logger.info("target ad search start.");
      if (!isMeasurable(viewableObj.vmt)) {
        viewableObj.pollingFlag = false;
        logger.info("do not have access to top document.");
        sendTrack(viewableEventList.NO_MEASURABLE.eventId);
        return;
      }
      if (adCheck()) {
        logger.info("search complate!!");
        logger.info("viewable measurement start!!");
        viewableObj.pollingFlag = true;
        viewableObj.startPolling();
        logger.info(viewableObj.viewableEl);
        return;
      }

      syncRetryAdCheck();

    }
  };

  document.addEventListener("readystatechange", function() {
    exec();
  });

  var adCheck = function() {
    try {
        var viewableEl = searchAdElement();
        if (viewableEl) {
          viewableObj.viewableEl = viewableEl;
          return true;
        }
    } catch (e) {
    }
    return false;
  };

  var isMeasurable = function(type) {
    var measurableFlag = 0;
    if (type === ViewMeasurementType.safeFrame) {
      measurableFlag = 1;
    } else if (type === ViewMeasurementType.intersectionObserver) {
      measurableFlag = 1;
    } else {
      try {
          if (top.document) {
            measurableFlag = 1;
          }
        } catch (e) {
          measurableFlag = 0;
        }
    }
    return measurableFlag;
  };

  var searchAdElement = function() {
    var safetyCounter = 100;
    var searchCount = 0;
    var element = viewableObj.startElement;
    do {
      element = element.previousElementSibling;
      if (element.getAttribute('id') === viewableObj.bxvs) {
        break;
      }
      if (!element){
        break;
      }

      var viewableEl = recursionAdCheck(element);
      if (viewableEl) {
        return viewableEl;
      }
      searchCount++;
      logger.info("searchCount:" + searchCount);
    } while(searchCount < safetyCounter);
    return;
  };

  var recursionAdCheck = function(element) {
    logger.info(element);
    if (element) {
      var rect = getRect(element);
      if (!rect) {
        return;
      }

      if (isMatchAdSize(rect.height, rect.width)) {
        logger.info("found!!");
        viewableEl = {};
        viewableEl.el = element;
        viewableEl.height = rect.height;
        viewableEl.width = rect.width;

        return viewableEl;
      }

      for (var i = 0; i < element.childNodes.length; i++) {
        var childEl = element.childNodes[i];
        var viewableEl = recursionAdCheck(childEl);
        if (viewableEl) {
          return viewableEl;
        }
      }
    }
    return;
  };

  var timeoutViewableCheck = function(viewableObj) {
    var viewableEl = viewableObj.viewableEl;

    if(!getRect(viewableEl.el)) {
      logger.info("target ad is visibility hidden or display none.");
      viewableObj.totalViewTime = 0;
      return;
    }

    var val = getPosition(viewableEl.el);

    var x = val.x;
    var y = val.y;

    var scrollTop = top.document.documentElement.scrollTop || // IE,Firefox,Opera
            top.document.body.scrollTop;// Chrome,Safari
    var scrollBottom = scrollTop + top.innerHeight;
    var scrollLeft = top.document.documentElement.scrollLeft || // IE,Firefox,Opera
            top.document.body.scrollLeft;// Chrome,Safari
    var scrollRight = scrollLeft + top.innerWidth;

    var h;
    var vdoTop = y;
    var vdoBottom = y + viewableEl.height;
    if (scrollTop < vdoBottom && scrollBottom > vdoTop) {
      h = viewableEl.height;
      if (vdoTop <= scrollTop) {
        h = h - (scrollTop - vdoTop);
      }
      if (scrollBottom <= vdoBottom) {
        h = h - (vdoBottom - scrollBottom);
      }
    }

    var w;
    var vdoLeftBorder = x;
    var vdoRightBorder = x + viewableEl.width;
    if (scrollLeft < vdoRightBorder && scrollRight > vdoLeftBorder) {
      w = viewableEl.width;
      if (vdoLeftBorder <= scrollLeft) {
        w = w - (scrollLeft - vdoLeftBorder);
      }
      if (scrollRight <= vdoRightBorder) {
        w = w - (vdoRightBorder - scrollRight);
      }
    }
    logger.info("viewableEl.width:" + viewableEl.width + " viewableEl.height:" + viewableEl.height);
    logger.info("h:" + h + " w:" + w);

    viewableObj.rate = (w * h) / (viewableEl.height * viewableEl.width) * 100 || 0;
    logger.info(viewableObj.rate);

    var viewableFlag = (viewableEl.height * viewableEl.width * 0.5) <= (w * h);

    updateTotalTime(viewableObj, viewableFlag);
  };

  var timeoutSafeFrameViewableCheck = function(viewableObj) {
    var totalViewable = $sf.ext.inViewPercentage();
    viewableObj.rate = totalViewable;
    var viewableFlag = totalViewable >= 50;
    updateTotalTime(viewableObj, viewableFlag);
  };

  var updateTotalTime = function(viewableObj, viewableFlag) {
    if (viewableFlag) {
      viewableObj.totalViewTime += pollingTime;
      logger.info("totalViewable:" + viewableObj.totalViewTime);
      if (viewableObj.totalViewTime >= viewableObj.viewableEvent.admitTime) {
          sendTrack(viewableObj.viewableEvent.eventId);
          // next event setting
          viewableObj.eventIndex += 1;
          viewableObj.viewableEvent = viewableEventList[Object.keys(viewableEventList)[viewableObj.eventIndex]];
        if (!viewableObj.viewableEvent || viewableObj.viewableEvent.eventId === viewableEventList.NO_MEASURABLE.eventId) {
          viewableObj.pollingFlag = false;
          logger.info("viewMeasurementType:" + viewableObj.vmt);
          logger.info("timer is end.");
          viewableObj.pausePolling();
        }
      }
    } else {
      viewableObj.totalViewTime = 0;
    }
  };

  var isMatchAdSize = function(ad_height, ad_width) {
    var sizeStr = "" + ad_width + "x" + ad_height;
    for (var num in regulationMatchList) {
      if (sizeStr === regulationMatchList[num]) {
        return true;
      }
    }
    return false;
  };

  var getPosition = function(element) {
    var x = 0;
    var y = 0;
    do {
      if (element === null) {
        element = parentIfr;
      }
      y += element.offsetTop || 0;
      x += element.offsetLeft || 0;

      if (getStyle(element, 'position') === 'fixed') {
        var scrollTop = top.document.documentElement.scrollTop || // IE,Firefox,Opera
              top.document.body.scrollTop;// Chrome,Safari
        y += scrollTop || 0;
        var scrollLeft = top.document.documentElement.scrollLeft || // IE,Firefox,Opera
              top.document.body.scrollLeft;// Chrome,Safari
        x += scrollLeft || 0;

      }

      parentIfr = element.ownerDocument.defaultView.frameElement;
      element = element.offsetParent;
      if (element)
      {
        var parentStyle = element.style;
        if (parentStyle.width === '0px' || parentStyle.height === '0px' || parentStyle.display === 'none' || parentStyle.visibility === 'hidden') {
          return false;
        }
      }
    } while(element || parentIfr);
    return {"x" : x, "y" : y};
  };

  var getStyle = function (element, cssname){
    if(element.currentStyle){
      return element.currentStyle[cssname]; //IE
    } else {
      var style =  element.ownerDocument.defaultView.getComputedStyle(element, null);
      if (style) {
        return style.getPropertyValue(cssname);
      }
    }
    return "";
  };

  var sendTrack = function(viewEventId) {
        var trk = new Image();
        trk.src = viewableObj.trkParam + viewEventId + "&vmt=" + viewableObj.vmt + "&trktm=" + (new Date().getTime()) + "&trkcnt=" + trkcnt;
        trkcnt++;
  };

  var startPolling = function() {
    if (document.visibilityState === "visible") {
      viewableObj.timerId = setInterval(function() {
        timeoutViewableCheck(viewableObj);
      }, pollingTime);
    }
  };

  var startSafeFramePolling = function() {
    if (document.visibilityState === "visible") {
      viewableObj.timerId = setInterval(function() {
        timeoutSafeFrameViewableCheck(viewableObj);
      }, pollingTime);
    }
  };

  var startApiPolling = function() {
    if (document.visibilityState === "visible") {
      IntersectionObserverObj.observer.observe(viewableObj.viewableEl.el);
    }
  };

  var pauseApiPolling = function() {
    if (viewableObj.timerId !== null) {
      clearInterval(viewableObj.timerId);
      viewableObj.totalViewTime = 0;
      viewableObj.timerId = null;
    }
    IntersectionObserverObj.observer.unobserve(viewableObj.viewableEl.el);
  };

  var pausePolling = function() {
    if (viewableObj.timerId !== null) {
      clearInterval(viewableObj.timerId);
      viewableObj.totalViewTime = 0;
      viewableObj.timerId = null;
    }
  };

  var getRect = function(element) {
    var elstyle = element.style;
    if (elstyle) {
      if ((elstyle.display === 'none' || elstyle.visibility === 'hidden')) {
        return;
      }
    }

    if ( typeof element.getBoundingClientRect !== "undefined") {
      var rect = element.getBoundingClientRect();
      return {"width" : Math.round(rect.width), "height" : Math.round(rect.height)};
    } else {
      return {"width" : element.width, "height" : element.height};
    }
  };

  var syncRetryAdCheck = function() {
    var retryCount = 1;

    if(searchRetryMax <= 0) {
      viewableObj.pollingFlag = false;
      logger.info("target ad not found.");
      sendTrack(viewableEventList.NO_MEASURABLE.eventId);
      return;
    }

    var retryTimerId = setInterval(function() {
      if (adCheck()) {
        logger.info("search complate!! count=" + retryCount);
        logger.info("viewable measurement start!!");
        viewableObj.pollingFlag = true;
        viewableObj.startPolling();
        logger.info(viewableObj.viewableEl);

        clearInterval(retryTimerId);
        retryTimerId = null;
        return;
      }

      logger.info("RetryCount: " + retryCount + ", totalTime: " + (retryCount * searchRetryInterval));
      retryCount++;
      if(retryCount > searchRetryMax) {
        viewableObj.pollingFlag = false;
        logger.info("exceeded retry limit. target ad not found.");
        sendTrack(viewableEventList.NO_MEASURABLE.eventId);

        clearInterval(retryTimerId);
        retryTimerId = null;
        return;
      }

    }, searchRetryInterval);
  };

  var hidden, visibilityState, visibilityChange;
  if ( typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
    visibilityState = "visibilityState";
  } else if ( typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
    visibilityState = "mozVisibilityState";
  } else if ( typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    visibilityState = "msVisibilityState";
  } else if ( typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
    visibilityState = "webkitVisibilityState";
  }

  if ( typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
  } else {
    document.addEventListener("visibilitychange", handler);
    function handler() {
    if (viewableObj.pollingFlag) {
        if (document.visibilityState === "visible") {
          logger.info("resume");
          viewableObj.startPolling();
        } else {
          logger.info("pause");
          viewableObj.pausePolling();
        }
      }
    };
  }

  init();
  exec();
}());
