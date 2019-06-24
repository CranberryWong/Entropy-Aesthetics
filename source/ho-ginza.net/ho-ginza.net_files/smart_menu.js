jQuery(document).on("ready",function(){
function resizer(){
	var window_size=jQuery(window).width();
	console.log(window_size);
	if(window_size<=767){
		jQuery("#menu").hide();
	}else{
		jQuery("#menu").show();
	}	
}
	resizer();
	jQuery(".submenu_ul").hide();
 	jQuery("#menu li").hover(function(){
  	jQuery(this).children("ul.submenu_ul:not(:animated)").slideDown("fast")
	},function(){
		jQuery("ul.submenu_ul",this).slideUp("fast");
	})
}).on("resize",window,function(){
	resizer();	
}).on("click","#toggle",function(){
	console.log("click");
	jQuery("#menu").slideToggle("fast");
});

