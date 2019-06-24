// JavaScript Document
jQuery(function() {
	jQuery('.carousel > .part').slick({
	  autoplay: true,
		dots:true,
		pauseOnHover:false,
	});	
jQuery('.carousel2 > .part').slick({
	autoplay: true,
	dots:false,
	pauseOnHover:false,
	slidesToShow: 3,
	slidesToScroll: 3,
	infinite: true,
	speed: 40000,
	cssEase: 'linear',
	arrows: false,
	autoplaySpeed:0,
	responsive: [
	{
		breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 3
			}
		},
	]
});	
	 jQuery('.carousel3 > .part').slick({
	  autoplay: true,
		dots:false,
		pauseOnHover:false,
		slidesToShow: 3,
		slidesToScroll: 3,
		infinite: true,
        speed: 30000,
        cssEase: 'linear',
        arrows: false,
        autoplaySpeed:0,
	responsive: [
	{
		breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll:3
			}
		},
	]
	});	
});
