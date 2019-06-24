jQuery(document).ready( function($) {
	$(".bsk-pdf-manager-pdfs-select").change(function(){
		var target = $(this).attr("attr_target");
		var url = $(this).val();
		
		target = target == '_blank' ? target : '_self';
		if( url ){
			window.open( url, target);
		}
	});
});
