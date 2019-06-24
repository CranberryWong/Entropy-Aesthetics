/**
 * @name MainController
 * @Discreption:    Main controller
 */
'use strict';
(function () {
    /* @ngInject */
    function MainController($scope, $window, $http, $timeout, biService, INITIAL_STATE, $translate,wixService,commonService) {
        var that = this;
        var viewMode,timer;
        
        this.$scope			= $scope;
        this.$window		= $window;
        this.initialState   = INITIAL_STATE;
        this.settings       = this.initialState.settings;
        this.design         = this.initialState.design;
        this.constants     	= this.initialState.constants;
        this.commonService	= commonService;
        this.wixService		= wixService;
        this.biService		= biService;
        this.$timeout		= $timeout;
        this.arrPopupSize 	= this.initialState.popupSize;
        this.cookieKey 		= this.commonService.getCookieKey();
        this.hostURL		= document.location.protocol+'//'+document.location.hostname+(document.location.port ? ':'+document.location.port: '');
        
        this.posCenter			= {origin:that.wixService.WindowOrigin.FIXED,placement: that.wixService.WindowPlacement.CENTER};
        this.posTopCenter		= {origin:that.wixService.WindowOrigin.FIXED,placement: that.wixService.WindowPlacement.TOP_CENTER};
        this.posBottomCenter	= {origin:that.wixService.WindowOrigin.FIXED,placement: that.wixService.WindowPlacement.BOTTOM_CENTER};
        
        /****************************************************Functions***********************************************/
        this.safeApply = function(fn) {
            that.$timeout(fn);
        };
        
        this.$window.setCookie = this.setCookie = function (message) {
            if (that.commonService.supports_html5_storage()) {
                localStorage[that.cookieKey] = '1';
            }
        };
        
        this.getTextBtn = function () {
            return  (that.settings.button.text == "") 
		            	? that.commonService.getTranslateByKey(that.constants.DEFAULT_TEXT_BUTTON)
		             	: that.settings.button.text;
        };
        
        this.openWindow = function (url) {
        	that.commonService.openPopup(url, 750, 750, 'euro-cookie', true);
        };

        this.closePopup = function (flag) {
            var message = {};
            message["setCookie"] = (flag) ? 1 : 0;
            that.wixService.Settings.closeWindow(message);
        };

        this.isValidLink = function (value) {
            return that.commonService.checkURL(value);
        };
        
        this.getFixedPopupSize = function () {
            /*********************calculate height in fixed position *************************/
        	if(that.wixService.isMobile()){
        		angular.element('.mobile-popup').css("display", "block");
        		var height = angular.element('.popup-connect-in')[0].offsetHeight - 10;
        		angular.element('.mobile-popup').css("display", "none");
        		if(that.wixService.isIPhone()) height +=20;
            	return height; 
            }
        	
        	var elmContent 	= angular.element(".popup-text-content-side-bar");
        	var elmButton 	= angular.element(".popup-warp-button-bar");
        	
            var contentHeight 	= (elmContent[0]) ? elmContent[0].offsetHeight : 0;
            var buttonHeight  	= (elmButton[0])  ? elmButton[0].offsetHeight  : 0;
            var height 			= (contentHeight > buttonHeight) ? contentHeight : buttonHeight;
            var winHeight		= that.commonService.getWindowDimensions();
            
            //console.log("getFixedPopupSize height before",height,contentHeight,buttonHeight);
            // top and bottom padding of the context is 44
            height = (height == 0) ? winHeight.h : height;
            
            return height + 44;
        };
        
        this.isTopLayout = function(){
        	return (that.settings.layout == that.constants.TOP_LAYOUT);
        };
        
        this.isPopupLayout = function(){
        	return (that.settings.layout == that.constants.POPUP_LAYOUT);
        };
        
        this.showPopup = function () {
            var origCompId = '&origCompId=' + Wix.Utils.getCompId(),
                ww = 0, 
                wh = 0;

            var canShowPopup = sessionStorage.getItem("canShowPopup");

            if (that.isPopupCanDisplayed() && canShowPopup == "true") {
            	that.popupElementToGetHeight 	= true;
                that.fixedElementToGetHeight 	= true;
                that.calculateHeight 			= true;

                that.$timeout.cancel(timer);
                timer = that.$timeout(function () {
                    sessionStorage.setItem("canShowPopup",false);
                    if (that.wixService.isMobile()){
                    	that.settings.layout = that.constants.BOTTOM_LAYOUT;
                    }
                    
                    var popupURL = that.hostURL + (that.wixService.isMobile() ? "/mobile" : "") + "/popup" + that.initialState.locationParams + origCompId;

                    if (that.isPopupLayout()) {
                        var abovePart 	= angular.element(".abovePart")[0].offsetHeight;
                        var bottomPart 	= angular.element(".bottomPart")[0].offsetHeight;
                        
                        if (abovePart && bottomPart)
                            var centerHeight = abovePart + bottomPart;
                        
                        var maxHeight = parseInt(that.arrPopupSize.maxLargeHeight);
                        
                        if (centerHeight <= parseInt(that.arrPopupSize.standardHeight)) {
                            ww = parseInt(that.arrPopupSize.standardWidth);
                            wh = parseInt(that.arrPopupSize.standardHeight);
                        } else {
                            ww = parseInt(that.arrPopupSize.largeWidth);
                            wh = (centerHeight > maxHeight) ? maxHeight : centerHeight;
                        }
                    } else {
                        var fixedHeight = that.getFixedPopupSize();
                    }
                    
                    var position = (that.isPopupLayout()) ? that.posCenter : (that.isTopLayout()) ? that.posTopCenter : that.posBottomCenter;
                    console.log("ww,wh,fixedHeight: ",ww,wh,fixedHeight);
                    if(that.isPopupLayout()){
                    	that.commonService.openPopupWix(popupURL, ww, wh, position);
                    }else{
                    	var width = (that.wixService.isIpad() || that.wixService.isAndroid()) ? '100%' : window.screen.width;
                    	that.commonService.openPopupWix(popupURL, width, fixedHeight, position);
                    }
                    
                    that.popupElementToGetHeight 	= false;
                    that.fixedElementToGetHeight 	= false;
                    that.calculateHeight 			= false;
                    that.settings.showPopup 		= 0;
                }, 1000);
            }
        };

        this.isPopupCanDisplayed = function(){
        	var viewMode = that.wixService.Utils.getViewMode();

        	if(viewMode == 'editor') sessionStorage.setItem("canShowPopup",true);
          		switch (viewMode) {
          			case 'site':
          			case 'preview': return true;
            }

            return false;
        };

        this.removeLocalStorage = function () {
            try {
                delete localStorage[that.cookieKey];
            } catch (ex) {
                console.log("error: ", ex);
            }
        };

        this.biOnSavePublish = function(type) {
            that.biService.savePublish([that.settings.layout, that.settings.textAlignment, type]);
        };

        this.handleEventListeners = function () {
        	that.wixService.addEventListener(that.wixService.Events.PAGE_NAVIGATION, function (data) {
                sessionStorage.setItem("canShowPopup",true);
            });

            that.wixService.addEventListener(that.wixService.Events.SITE_SAVED, function () {
            	that.biOnSavePublish('save');
            });

            that.wixService.addEventListener(that.wixService.Events.SITE_PUBLISHED, function () {
            	that.biOnSavePublish('publish');
            });

            that.wixService.addEventListener(that.wixService.Events.SETTINGS_UPDATED, function (params) {
            	that.safeApply(function(){
                    that.settings = params.settings;
                });
            });
    	    
    		that.wixService.addEventListener(that.wixService.Events.STYLE_PARAMS_CHANGE, function(styleParams){
                //that.applyWixStyles(styleParams);    
            });
    		
    		//that.wixService.Styles.getStyleParams(that.applyWixStyles);
    		
    		that.commonService.wixHandlers();
        };
        
        this.initApp = function () {
        	console.log("from s2");
            if (that.settings.hidden == 1) return;

            sessionStorage.setItem('canShowPopup',true);

            that.fixedElementToGetHeight 	= true;
            that.calculateHeight 			= false;

            that.wixService.addEventListener(that.wixService.Events.EDIT_MODE_CHANGE, function (data) {
                viewMode = data.editMode;
                if (that.isPopupCanDisplayed() && that.settings.showPopup == 1) that.showPopup();
                if (!that.isPopupCanDisplayed()) {
                    if (!that.isPopupCanDisplayed()) that.removeLocalStorage();
                }
            });

            if (that.commonService.supports_html5_storage() && localStorage[that.cookieKey] != '1') {
                if (!that.isPopupCanDisplayed()) {
                	that.removeLocalStorage();
                } else {
                	that.showPopup();
                }
            }
        };
        
        this.initApp();
        this.handleEventListeners();
    }
    
	MainController.$inject = ["$scope", "$window", "$http", "$timeout", "biService", "INITIAL_STATE","$translate","wixService","commonService"];
	angular.module(initialState.APP_NAME).controller('MainController', MainController).run(function ($timeout, commonService) {
		commonService.appLoadedStep1();
		
		$timeout(function(){
			$(window).bind('storage', commonService.saveSettingsOnClose()) ;	
		},100);
	});
})();