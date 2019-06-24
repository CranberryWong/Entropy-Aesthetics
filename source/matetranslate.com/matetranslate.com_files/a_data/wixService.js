'use strict';
(function () {
  /* @ngInject */
	function Wix($window,$location, $timeout) {
		var wix	= $window.Wix;
		var url	= $location.absUrl();
		
		wix.Utils.getInstance = function () {
	        var instanceRegexp 	= /.*instance=([\[\]a-zA-Z0-9\.\-_]*?)(&|$|#).*/g;
	        var instance 		= instanceRegexp.exec(url);
	        
	        return  (instance && instance[1]) ? instance[1] : undefined ;
	    };
		
	    wix.isMobile = function(){
	        return (wix.Utils.getDeviceType() == "mobile");
	    };
	    
	    wix.isEditorMode = function(){
			return  (wix.Utils.getViewMode() == "editor");
	    };
	    
	    wix.isSiteMode = function(){
			return  (wix.Utils.getViewMode() == "site");
	    };
	    
	    wix.isPreviewMode = function(){
			return  (wix.Utils.getViewMode() == "preview");
	    };
	    
        wix.isIOS = function() {
            var userAgent   = navigator.userAgent.toLowerCase(),
                isIPhone    = (userAgent.indexOf("iphone") >= 0),
                isIPod      = (userAgent.indexOf("ipod") >= 0),
                isIPad      = (userAgent.indexOf("ipad") >= 0);

            return (isIPhone || isIPod || isIPad);
        };
        
        wix.isIPhone = function() {
            var userAgent = navigator.userAgent.toLowerCase(),
                isIPhone = (userAgent.indexOf("iphone") >= 0);
               
            return (isIPhone);
        };
    
        wix.isIpad = function() {
            var userAgent = navigator.userAgent.toLowerCase(),
                isIPad = (userAgent.indexOf("ipad") >= 0);

            return (isIPad);
        };
        
        wix.isIE = function() {
		    //Test if the browser is IE
		    var userAgent = window.navigator.userAgent.toLowerCase();
		    return (/(msie|trident)/i.test(userAgent || ''));
		};
		
		wix.isFireFox = function() {
		    var userAgent     = window.navigator.userAgent.toLowerCase();
		    return (/(Firefox)/i.test(userAgent || ''));
		};
		
		wix.isAndroid = function() {
	        var userAgent = navigator.userAgent.toLowerCase(),
	            isAndroid = (userAgent.indexOf("android") >= 0);
	        return (isAndroid);
	    };
        
        wix.getCookieKey = function(keyName){
            var compId      = wix.Utils.getOrigCompId() || wix.Utils.getCompId();
            var cookieKey   = [keyName, wix.Utils.getInstanceId() , compId].join("_");
            return cookieKey;
        };
        
    	return wix;
  	}

  	Wix.$inject = ["$window","$location","$timeout"];
  	angular.module(initialState.APP_NAME).service('wixService', Wix);
})();