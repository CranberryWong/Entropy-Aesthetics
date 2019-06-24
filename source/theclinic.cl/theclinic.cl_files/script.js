jQuery(document).ready(function($) {

	$('.popup').fancybox();

	$('.goComments').click(function(event){
		event.preventDefault();
		$('html,body').animate({
			scrollTop:$($(this).attr('href')).offset().top
			}, 800);
	});
	
	$(function() {	
		var banner_stuck = $(".side-single-ad-0");
		var banner_stuck_container = $(".adv-sidebar");		
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			if (scroll >= 463) {
				banner_stuck.removeClass('normal-pos').addClass("diff-pos");
				banner_stuck_container.addClass("diff-pos-cont");
			} else {
				banner_stuck.removeClass("diff-pos").addClass('normal-pos');
				banner_stuck_container.removeClass('diff-pos-cont');
			}
		});
	});

	$('#siteContent-container').waypoint(function(dir){
		if(dir == 'down'){
			$('.ad-float').removeAttr('style');
			$('.ad-float').addClass('stuck');
		}
		else{
			$('.ad-float').removeClass('stuck');
		}
	}, { offset: '200' });
	$('#footerContent-container').waypoint(function(dir){
		pos = $("#footerContent-container").offset();
		topfloat = pos.top - 620;
		if(dir == 'up'){
			$('.ad-float').removeAttr('style');
			$('.ad-float').addClass('stuck');
		}
		else{
			$('.ad-float').removeClass('stuck');
			$('.ad-float').css('top', topfloat);
		}
	}, { offset: '620' });

	$('#mainNav').waypoint(function(dir){
		if(dir == 'down'){
			$('.ad-background').removeAttr('style');
			$('.ad-background').addClass('stuck');
		}
		else{
			$('.ad-background').removeClass('stuck');
		}
	}, { offset: '-35' });
	$('#footerContent-container').waypoint(function(dir){
		pos = $("#footerContent-container").offset();
		topfloat = pos.top - 800;
		if(dir == 'up'){
			$('.ad-background').removeAttr('style');
			$('.ad-background').addClass('stuck');
		}
		else{
			$('.ad-background').removeClass('stuck');
			$('.ad-background').css('top', topfloat);
		}
	}, { offset: '800' });

	$('#bombaCarousel').carousel({ interval: 7000 });
	$('#thccarrusel').carousel({ interval: 4000 });
	
	if ($('#region1').length){
		$(window).resize(function(){
			var $maxheight;
			$('#region1 .zonaa, #region1 .zonab, #region1 .adv-content').height('initial');
			$('#region2 .zonac, #region2 .zonad, #region2 .adv-content').height('initial');
	
			if ($(window).outerWidth() >= 753){
				$('#region1 .zonaa, #region1 .zonab, #region1 .adv-content').height('initial');
				$('#region2 .zonac, #region2 .zonad, #region2 .adv-content').height('initial');
	
				$maxheight = 0;
				$maxheight = $('#region1 .zonaa').height();
				if($('#region1 .zonab').height() > $maxheight) $maxheight = $('#region1 .zonab').height();
				$('#region1 .zonaa, #region1 .zonab').height($maxheight);
	
				if ($(window).outerWidth() >= 976){
					if($('#region1 .adv-content').height() > $maxheight) $maxheight = $('#region1 .adv-content').height();
					$('#region1 .zonaa, #region1 .zonab, #region1 .adv-content').height($maxheight);
				}
	
				$maxheight = 0;
				$maxheight = $('#region2 .zonac').height();
				if($('#region2 .zonad').height() > $maxheight) $maxheight = $('#region2 .zonad').height();
				$('#region2 .zonac, #region2 .zonad').height($maxheight);
				
				if ($(window).outerWidth() >= 976){
					if($('#region2 .adv-content').height() > $maxheight) $maxheight = $('#region2 .adv-content').height();
					$('#region2 .zonac, #region2 .zonad, #region2 .adv-content').height($maxheight);
				}
			}
		});
	}
	
	if ($('#region3').length){
		$(window).resize(function(){
			var $maxheight;
			$('#region3 .zonae, #region3 .zonaf, #region3 .zonag').height('initial');
			$('#region4 .zona41, #region4 .zona42, #region4 .zona43, #region4 .zona44').height('initial');

			if ($(window).outerWidth() >= 753){
				if($(window).outerWidth() < 976){
					$('#region3 .zonae, #region3 .zonaf, #region3 .zonag').height('initial');
					$('#region4 .zona41, #region4 .zona42, #region4 .zona43, #region4 .zona44').height('initial');
					$('#region3 .zonae .item').height('initial');
					$('#region3 .zonaf .item').height('initial');
					$('#region3 .zonag .item').height('initial');

					$maxheight = 0;
					$maxheight = $('#region4 .zona41').height();
					if($('#region4 .zona42').height() > $maxheight) $maxheight = $('#region4 .zona42').height();
					$('#region4 .zona41, #region4 .zona42').height($maxheight);
		
					$maxheight = 0;
					$maxheight = $('#region4 .zona43').height();
					if($('#region4 .zona44').height() > $maxheight) $maxheight = $('#region4 .zona44').height();
					$('#region4 .zona43, #region4 .zona44').height($maxheight);
					
					$maxheight = 0;
					$('#region3 .zonae .item').each(function(){ if($(this).height() > $maxheight) $maxheight = $(this).height(); })
					$('#region3 .zonae .item').height($maxheight);
					$maxheight = 0;
					$('#region3 .zonaf .item').each(function(){ if($(this).height() > $maxheight) $maxheight = $(this).height(); })
					$('#region3 .zonaf .item').height($maxheight);
					$maxheight = 0;
					$('#region3 .zonag .item').each(function(){ if($(this).height() > $maxheight) $maxheight = $(this).height(); })
					$('#region3 .zonag .item').height($maxheight);

				}
				else if ($(window).outerWidth() >= 976){
					$('#region3 .zonae, #region3 .zonaf, #region3 .zonag').height('initial');
					$('#region4 .zona41, #region4 .zona42, #region4 .zona43, #region4 .zona44').height('initial');
					$('#region3 .zonae .item').height('initial');
					$('#region3 .zonaf .item').height('initial');
					$('#region3 .zonag .item').height('initial');
		
					$maxheight = 0;
					$maxheight = $('#region3 .zonae').height();
					if($('#region3 .zonaf').height() > $maxheight) $maxheight = $('#region3 .zonaf').height();
					if($('#region3 .zonag').height() > $maxheight) $maxheight = $('#region3 .zonag').height();
					$('#region3 .zonae, #region3 .zonaf, #region3 .zonag').height($maxheight);
		
					$maxheight = 0;
					$maxheight = $('#region4 .zona41').height();
					if($('#region4 .zona42').height() > $maxheight) $maxheight = $('#region4 .zona42').height();
					if($('#region4 .zona43').height() > $maxheight) $maxheight = $('#region4 .zona43').height();
					if($('#region4 .zona44').height() > $maxheight) $maxheight = $('#region4 .zona44').height();
					$('#region4 .zona41, #region4 .zona42, #region4 .zona43, #region4 .zona44').height($maxheight);
				}
			}
			else{
				$('#region3 .zonae .item').height('initial');
				$('#region3 .zonaf .item').height('initial');
				$('#region3 .zonag .item').height('initial');
			}
		});
		setTimeout(function(){ $(window).resize();}, 2000);
		setTimeout(function(){ $(window).resize();}, 10000);
	}
	
	if ($('#regionCat').length){
		$(window).resize(function(){
			var $artThumHeightIzq = 0;
			var $artThumHeightTotal = 0;
			var $artThumHeightFin = 0;
			$('.articleThumbs .item').each(function(){
				$( this ).innerHeight('initial');
			});
			$('#regionCat .adv-sidebar .adv-content').height('initial');

			if ($(window).outerWidth() >= 753){
			
				$('.articleThumbs').each(function(){
					$( this ).find('.item').innerHeight($(this).height());
					$artThumHeightIzq = $artThumHeightIzq + $(this).height();
					$artThumHeightTotal = $artThumHeightTotal + $(this).height();
				})
	
				if ($(window).outerWidth() >= 976){
					if($('#regionCat .adv-sidebar .adv-content').height() > $artThumHeightTotal) $artThumHeightTotal = $('#regionCat .adv-sidebar .adv-content').height();
					$('#regionCat .adv-sidebar .adv-content').height($artThumHeightTotal);
					$artThumHeightFin = $artThumHeightTotal - $artThumHeightIzq + $('.articleThumbs:last-child').height();
					$('.articleThumbs:last-child .item').innerHeight($artThumHeightFin)
				}
			}
		});
		setTimeout(function(){ $(window).resize();}, 2000);
		setTimeout(function(){ $(window).resize();}, 7000);
		setTimeout(function(){ $(window).resize();}, 10000);
		setTimeout(function(){ $(window).resize();}, 15000);
	}
	
	if($('.ad-itt')){
		var tc_itt_count = 0;
		function tc_itt_hide(){
			tc_itt_count++;

			if ($('.ad-itt iframe').contents().find('div:nth-child(3)').css('visibility') == 'hidden'){
				console.log('paso1');
				$('.ad-itt').hide();
			}
			else{
				console.log('paso2');
				if ($('.ad-itt iframe').contents().find('div:nth-child(3)').css('visibility') == 'visible'){
						console.log('paso3');
					$('.ad-itt > div').width($('.ad-itt iframe').contents().find('div:nth-child(3)').width());
					$('.ad-itt > div iframe').width($('.ad-itt iframe').contents().find('div:nth-child(3)').width());
					$('.ad-itt > div iframe').height($('.ad-itt iframe').contents().find('div:nth-child(3)').height());
					$('.ad-itt').addClass('ad-itt-css');
					$('.ad-itt').show();

					if ($(window).height() > $('.ad-itt > div iframe').height() ){
						console.log('paso4');
						padding = ($(window).height() - $('.ad-itt > div iframe').height()) / 2;
						$('.ad-itt > div').css('padding-top', padding);
					}
					else{
						console.log('paso5');
						$('.ad-itt > div').css('padding-top', 55);
					}

				}
				setTimeout(tc_itt_hide, 1000);
			}
		}
		setTimeout(tc_itt_hide, 1000);
	}
	else{
		console.log('none');
	}

	if($('.ad-itt-movil')){
		var tc_itt_count = 0;
		function tc_itt_movil_hide(){
			tc_itt_count++;

			if ($('.ad-itt-movil iframe').contents().find('div:nth-child(3)').css('visibility') == 'hidden'){
				$('.ad-itt-movil').hide();
			}
			else{
				if ($('.ad-itt-movil iframe').contents().find('div:nth-child(3)').css('visibility') == 'visible'){
					$('.ad-itt-movil').addClass('ad-itt-movil-css');
				}
				setTimeout(tc_itt_movil_hide, 1000);
			}
		}
		setTimeout(tc_itt_movil_hide, 1000);
	}

	$('.menu-banner-expand').mouseenter(function() {
		$(this).css('overflow','visible');
	}).mouseleave(function() {
		$(this).css('overflow','hidden');
	});

	/* ancho para comentarios facebook */
	if($('#commentsSection')){
		if($('#commentsSection').width() != $('.fb-comments').attr("data-width")){
			var facebook_comment_resize, comment_resize_timeout
	
			var facebook_comment_resize = function() {
				$('.fb-comments').attr("data-width", $('#commentsSection').width());
				FB.XFBML.parse($('#commentsSection').get(0));
			}
	
			$(window).on('resize', function() {
				clearTimeout( comment_resize_timeout );
				comment_resize_timeout = setTimeout(facebook_comment_resize, 200);
			});
	
			facebook_comment_resize();
		}
	}

});

function pegaPubMovil(tagId){
	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if(w <= 780){
		document.writeln("<div id='"+tagId+"'>");
		googletag.cmd.push(function() { googletag.display(tagId); });
		document.writeln("</div>");
	}
}

function pegaPubWeb(tagId){
	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if(w > 780){
		document.writeln("<div id='"+tagId+"'>");
		googletag.cmd.push(function() { googletag.display(tagId); });
		document.writeln("</div>");
	}
}