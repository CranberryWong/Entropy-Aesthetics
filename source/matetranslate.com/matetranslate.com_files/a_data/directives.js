angular.module(initialState.APP_NAME).directive('widget', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        templateUrl: '/pages/widget/views/widget.html',
        link: function (scope, element, attrs) {

        }
    };
}]).directive('mobile', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        templateUrl: '/pages/widget/views/mobile.html',
        link: function (scope, element, attrs) {

        }
    };
}]);