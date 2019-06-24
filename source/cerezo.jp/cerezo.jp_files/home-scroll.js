jQuery(window).load(function() {
  if (jQuery("html").scrollTop() == 0 && jQuery("body").scrollTop() == 0) {
	jQuery("html,body").animate({scrollTop:$('#header').offset().top}, 1000, "swing");
  }
});
