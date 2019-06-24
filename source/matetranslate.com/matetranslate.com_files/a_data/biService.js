angular.module(initialState.APP_NAME).service('biService', function() {
    var srcNum = 63,
        siteId = '',
        self   = this,
        savePublishId = 211;
       
    var events = [
        ['savePublish',savePublishId,['wixlabs_string_1','wixlabs_string_2','event_trigger']]
    ];
     
    var superProperties = {
        Uid           : Wix.Utils.getUid(),
        InstanceId    : Wix.Utils.getInstanceId(),
        CompId        : Wix.Utils.getCompId(),
        OrigCompId    : Wix.Utils.getOrigCompId()
    };
    
    (function(){
        var parser    = document.createElement('a');
        parser.href   = document.referrer ||'';
                
        var arr   = parser.pathname.split("/");
        siteId    = arr[arr.length-1];
        
        if (siteId === "new"){
            var objURL = {};
            
            parser.href.replace(
                new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
                function( $0, $1, $2, $3 ){
                    objURL[ $1 ] = $3;
                }
            );
            
            siteId = objURL.siteId || siteId; 
        }
    }());   
    
    var frogSuperProperties = {
        biToken                   : Wix.Utils.getInstanceValue('biToken')||'00000000-0000-0000-0000-000000000000',
        market                    : 'editor',
        origin                    : initialState.ORIGIN || 'app_settings',
        app_id                    : initialState.APP_ID,
        app_site_id               : superProperties.InstanceId,
        instance_id               : superProperties.OrigCompId || superProperties.CompId,
        tab_name                  : '',
        site_id                   : siteId,
    };
        
    var onSuccessDef = function(){
        //console.info('success',arguments);
    };
    
    var onErrorDef = function(){
        //console.error('error',arguments);
    };
    
    var report = function (params, bUserEvent, onSuccess, onError) {
        
        var url           = bUserEvent?'//frog.wix.com/wixlabs-ugc?':'//frog.wix.com/wixlabs-users?',
            cacheKiller   = '_=' + new Date().getTime(),
            bi            = new Image();
        
        if ((params.evid === savePublishId) || bUserEvent) {
            delete params.origin;
            delete params.market;
        }
        
        if (bUserEvent) {
            delete params.app_site_id;
            delete params.tab_name;
            delete params.site_id;
        }
        
        bi.onload    = onSuccess || onSuccessDef;
        bi.onerror   = onError || onErrorDef;
        
        var BIURL = url + cacheKiller+ '&src='+srcNum+'&'+Object.keys(params).map(function (key) {
            return [encodeURIComponent(key), '=', encodeURIComponent(params[key])].join('');
        }).join('&') ;
        //console.log("BIURL:",BIURL);
        bi.src = BIURL;
    }; 

    var eventClosure = function(eventParams,paramsOrder,sUserEvent){
        return function(){
            var bUserEvent  = (!!sUserEvent) && (sUserEvent == 'user');
            var onSuccess   = arguments[1]||angular.noop;
            var onError     = arguments[2]||angular.noop;
            var params      = arguments[0]||[];
            
            angular.forEach(paramsOrder,function(paramName,order){
                eventParams[paramName]=params[order];
            });
            
            report(eventParams,bUserEvent, onSuccess,onError);          
        };
    };
    
    angular.forEach(events,function(val,key){
        var event         = val,
            eventParams   = angular.extend({evid:event[1]},frogSuperProperties);
        
        angular.forEach(event[2],function(paramName,order){
            eventParams[paramName] = "";
        });
                
        self[event[0]] = eventClosure(eventParams,event[2],event[3]);
    });
    
    this.mixpanel = function(eventName,params){
        params = params || {};
        mixpanel.track(eventName,angular.extend(params,superProperties));
    };
});