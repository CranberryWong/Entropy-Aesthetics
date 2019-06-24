( function( $, undefined ){

	// load scripts when the DOM is ready and when Infinite Scroll has fired
	function postScripts() {
		$.bigfoot();
	}

	// load scripts when the DOM is ready
	function documentScripts() {
		// Retrieve daily update date widths and find the longest one.
		var $dudate = $( '#daily-updates .entry-meta' );
		var alldudates = $dudate.map( function() {
			if ( 0 < $(this).width() ) {
				return $(this).width();
			}
			else {
				return 0;
			}
		} ).get();
		var widestdudate = Math.max.apply( Math, alldudates );
		$dudate.css( {
			'width' : widestdudate + 1
		} );
	}

	$( document )
		.ready( postScripts )
		.ready( documentScripts )
		.on( 'post-load', postScripts );

})( jQuery );
