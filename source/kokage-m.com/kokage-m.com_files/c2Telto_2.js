// 2017/07/27 yu_ito No1087 new file

jQuery(document).ready(function($)
{
	var ua = navigator.userAgent;

	if ( $('.htmlItem a.c2Telto').length > 0 ) {
		if ( !ua.match(/Android/) && !ua.match(/iPhone/) && !ua.match(/Windows Phone/) ) {
			$('.htmlItem a.c2Telto').each(function() {
				$(this).css( 'pointer-events', 'none' );
				$(this).attr('href', '#');
			});
			$('.htmlItem a.c2Telto').click( function() {
				return false;
			});
		}else{
			$('.htmlItem a.c2Telto').each(function() {
				telNum = $(this).attr('href');
				if( !telNum.match(/tel:/) ) {
					$(this).attr('href', 'tel:' + telNum);
				}
			});
		}
	}
});
