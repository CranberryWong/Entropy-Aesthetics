'use strict';
angular.module(initialState.APP_NAME).service('commonService', function ($window,httpService, $translate, wixService) {
    this.g_allSettings  = null;
    this.postTimer      = null;
    this.gXHR           = null;
    var that            = this;
      
    this.log = function log(text) {
        if (window.console && window.console.log) {
            window.console.log(text);
        }
    }; 
    
    this.checkURL = function(str) {
        var options = {/*require_protocol:false*/};
        return validator.isURL(str, options);
    };
    
    this.getTranslateByKey = function(key){
        return $translate.instant(key,{},{},wixService.Utils.getLocale());
    };
	
	this.ucfirst = function(str) {
	    var text = str;
	    var parts = text.split(' '),
	        len = parts.length,
	        i, words = [];
	        
	    for (i = 0; i < len; i++) {
	        var part 	= parts[i];
	        var first 	= part[0].toUpperCase();
	        var rest 	= part.substring(1, part.length);
	        var word 	= first + rest;
	        
	        words.push(word);
	    }
	    
	    return words.join(' ');
	};
    
    this.getLocale = function(defaultLocale) {
        var locale = wixService.Utils.getLocale() || defaultLocale;
        locale = locale.toLowerCase().replace(/[^a-zA-Z]+/g, "");
        
        return  (locale.length == 2) ? locale : defaultLocale; 
    };
    
    this.openPopup = function(url, width, height, title, scroller) {
        var w       = width,
            h       = height,
            left    = (window.screen.width / 2) - (w / 2),
            top     = (window.screen.height / 2) - (h / 2);

        var resizable   = scroller = (scroller) ? 'yes' : 'no';
        var win         = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=' + scroller + ', resizable=' + resizable + ', copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        
        try {
            if (win != null && win.moveTo) win.moveTo(left, top);
            if (win != null) win.focus();
        } catch (e) { }
    };
    
    this.openModalWix = function(url, w, h,isBare){
        url += "&wCompId="+wixService.Utils.getCompId();
        var onClose = function(message) {
        	if(message.message.setCookie == 1){
        		setCookie();
        	} 
        };
        
        if(wixService.isMobile()){
        	isBare = true;
        	w = 280;
        	h = 300;
        }
        
        if(isBare) {
        	wixService.openModal(url, w, h, onClose,wixService.Theme.BARE);
        }else {
        	wixService.openModal(url, w, h, onClose);
        }return false;
    };
    
    this.openPopupWix = function(url, w, h, position){
        var onClose = function(message) {
            sessionStorage.setItem("canShowPopup",true);
            if (message.message.setCookie == 1) {
                setCookie();
            }
        };
        
        wixService.openPopup(url, w, h, position, onClose ,wixService.Theme.BARE);
    };

    this.canResize = function() {
        /*
         switch (wixService.Utils.getViewMode()) {
         case 'site':
         case 'preview': return false;
         }
         */
        return true;
    };

    this.supports_html5_storage = function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };
    
    this.getWindowDimensions = function(element) {
        var w = (element) ? angular.element(element) :  angular.element($window);
        return {
            'h': w.height(),
            'w': w.width()
        };
    };
    
    this.wixHandlers = function() {
        try {
            wixService.Performance.applicationLoaded();
        } catch (err) {
            console.log('Wix.Performance: ', err);
        }
        
        if (wixService.Utils.getDemoMode()) return;
        
        wixService.addEventListener(wixService.Events.COMPONENT_DELETED, function (params) {
            $.ajax({
	            type: "DELETE",
	            url: '/delete'+ document.location.search
	        });
        });
    };
    
	this.getWinHeight = function(){
		return angular.element($window).height();
	};

    this.adjustHeight = function() {
        $(window).ready(function () {
            setTimeout(function () {
                var height = that.getWinHeight();
                if (height) {
                    wixService.setHeight(height);
                }
            }, 0);
        });
    };

    this.onResizeWindow = function() {
        that.resizeWindow();

        $(window).resizeend({
            delay: 600
        }, function () {
            that.resizeWindow();
        });
    };

    this.resizeWindow = function() {
        if (!that.canResize()) return;
        that.adjustHeight();
    };

    this.getCookieKey = function() {
        var compId = wixService.Utils.getOrigCompId() || wixService.Utils.getCompId();
        
        return [wixService.Utils.getInstanceId(), compId].join("_");
    };

    this.strip_tags = function (input, allowed) {
        // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
        allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); 
        var tags                = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
        var commentsAndPhpTags  = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        
        return  input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    };
    
    this.setSettingsScrollbar = function(timeout){
        timeout = parseInt(timeout) || 0;
        var func = function(){    	
            $('.div-scrollbar').each (function(){
            	$(this).slimscroll({destroy: true});        	
                var curHeight = $(this).attr("data-scroll-height");            
                var curWidth = $(this).attr("data-scroll-width");
                
                if (isNaN(curHeight)) {
                	setTimeout(func,timeout);
                	return;
                }
                
                $(this).slimscroll({
                    top: '10px',
                    height: curHeight,
                    width: curWidth,
                    alwaysVisible: true,
                    railVisible: false,
                    disableFadeOut: true
                });
           });
        };
        if ($('.div-scrollbar').is(':visible')) func();
        else setTimeout(that.setSettingsScrollbar,timeout);
    };
    
    this.setWidgetScrollbar = function (timeout){
        timeout = parseInt(timeout) || 0;
        var func = function(){      
            $('.div-scrollbar').each (function(){
                var curHeight   = $(this).attr("data-scroll-height");
                var curWidth    = $(this).attr("data-scroll-width");
                $(this).slimscroll({
                    height: curHeight,
                    width: curWidth,
                    alwaysVisible: true,
                    railVisible: false,
                    disableFadeOut: true,
                    destroy: true
                });
           });
        };
        
        if ($('.div-scrollbar').is(':visible')) func();
        else setTimeout(that.setWidgetScrollbar,timeout);
    };
    
    this.appLoadedStep1 = function(){
    	try {
    		wixService.Performance.applicationLoaded();
            wixService.Performance.applicationLoadingStep(1, 'application loading');
        } catch (err) {
            $log.log('applicationLoadingStep 1: ', err);
        }
    };
    
    this.appLoadedStep2 = function(){
    	try {
	        Wix.Performance.applicationLoadingStep(2, 'popup loading');
	    } catch (err) {
	        $log.log('applicationLoadingStep 2: ', err);
	    }
    };
    
    this.saveSettingsOnClose = function(){
	    var conmpId			= wixService.Utils.getCompId(),	
	    	key             = "settings_"+conmpId,
	        data            = localStorage.getItem(key),
	        allSettings     = JSON.parse(data),
	        searchString    = document.location.search + "&origCompId="+conmpId;
	    
	    if(allSettings){
	        $.post('settings/save'+  searchString, allSettings , function(result){
	            location.reload();
	        },'json');
	        
	        localStorage.removeItem(key);
	    }
	};
});