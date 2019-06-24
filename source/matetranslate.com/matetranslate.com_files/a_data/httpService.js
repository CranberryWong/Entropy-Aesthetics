'use strict';
(function () {
  function http($http) {
    this.post = function(url,params){
        return $http.post(url+initialState.locationParams,params);
    };
    
    this.delete = function(url){
        return $http.delete(url+initialState.locationParams);
    };
    
    this.publishSettings = function(settings){
        return $http.post('/publish'+initialState.locationParams, {'settings':  JSON.stringify(settings) });
    } ;
  }

  http.$inject = ["$http"];
  angular.module(initialState.APP_NAME).service('httpService', http);
})();