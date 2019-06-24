/**
 * Theme functions file
 */
(function ($) {
    var $document = $(document);
    var $window = $(window);


    /**
    * Document ready (jQuery)
    */
    $(function () {

        /**
         * Activate superfish menu.
         */
        $('.sf-menu').superfish({
            'speed': 'fast',
            'delay' : 0,
            'animation': {
                'height': 'show'
            }
        });

        /**
         * Activate jQuery.mmenu.
         */
        $("#menu-main-slide").mmenu({
            "slidingSubmenus": false,
            "extensions": [
                "theme-dark",
                "pageshadow",
                "border-full"
            ]
        })

    });

})(jQuery);
