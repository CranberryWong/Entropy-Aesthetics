angular.module(initialState.APP_NAME, ['pascalprecht.translate','nl2br'])
.constant('INITIAL_STATE',initialState)
.config(function ($translateProvider) {
    function getLocale (defaultLocale) {
        var locale = Wix.Utils.getLocale() || defaultLocale;
        locale = locale.toLowerCase().replace(/[^a-zA-Z]+/g, "");

        return  (locale.length == 2) ? locale : defaultLocale; 
    };
    
    var locale = getLocale(initialState.constants.DEFAULT_LANGUAGE);
    
    /*startTranslations*/
    $translateProvider.useStaticFilesLoader({prefix: "common/translations/widget/text_",suffix:".json"});
    /*endTranslations*/
            
    $translateProvider.preferredLanguage(locale)
    .fallbackLanguage(initialState.constants.DEFAULT_LANGUAGE)  // if translation file not exist then load English by default
    .useSanitizeValueStrategy('escaped'); //http://angular-translate.github.io/docs/#/guide/19_security;
}).run(function ($log, $timeout) {});