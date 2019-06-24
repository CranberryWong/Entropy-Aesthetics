/*global jQuery */
/*
* FitText.js 1.3
* (c2 customized)
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*	Date: Tue May 29 2014
*	
*/

(function( $ ){

	$(document).ready(function(){
			$('body').append('<span id="fitRuler" style="visibility:hidden;position:absolute;white-space:nowrap;bottom:0;"></span>');
	})

  $.fn.fitText = function( selector, kompressor, defaultSize , options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

		//init
		$(this).find('a').css('font-size', defaultSize + 'px' );

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
				var wordLength = 0;
				var wordPadding = 0;
				var e,width,cnt = 0;
				var boldFlag = false;
				var boldCnt = 0;
				var liWidth = $this.innerWidth() / $this.find(selector).length;

				var fontSize = 0;
				var sizeAry = new Array();
				var thisCorrectSize = 0;
				var applyFontSize = 0;
				var pageFontSize = parseInt( $('body').css('font-size') );
				var correction = 1;

				$this.find(selector).each( function() {

					//bold check(only first-time)
					if( cnt == 0 ) {
						$(this).find("a").each(function()
						{
							if( $(this).css('font-weight') =='bold' )
							{
								boldCnt++;	
							}
						})
					}

					e = $("#fitRuler");
					width = e.text($(this).find("a").text()).get(0).offsetWidth;
					liWidth = $(this).innerWidth();

					correction = 1.1;
					if( boldCnt >= 1 )
					{
						correction = 1.3;
					}

					// multiplication 1.1, because of defference between a-tag size and ruler-size
					thisCorrectSize = pageFontSize * liWidth / ( width * correction );
					sizeAry.push(thisCorrectSize);
					cnt++;

				});

				//get min-fontSize
				applyFontSize = Math.min.apply(null,sizeAry);

				fontSize = applyFontSize > pageFontSize ? pageFontSize : applyFontSize ;
				if( fontSize < 12 ) {
					fontSize = 12;
				}

				$this.find("a").css('font-size', fontSize + "px");

      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
