
// OS判断
ua = navigator.userAgent;
if( ua.indexOf("iPhone") > 0 || ua.indexOf("iPod") > 0 || ua.indexOf("iPad") > 0 ){ $("html").addClass("ios");
}else if( ua.indexOf("Android") > 0 ){ $("html").addClass("android");
}else{  $("html").addClass("desktop"); }

// iOSボタンhover対応
document.addEventListener("DOMContentLoaded", function(event) {
	if(navigator.userAgent.match(/iPhone|iPad|iPod/)){
		document.getElementsByTagName("body")[0].classList.add("ios");
	}
});


$(function() {
	
	// インクルード
	$("header").load("/common/include/header.html");
	$("footer").load("/common/include/footer.html");


	// メディアクエリ判断
	$(window).on("load orientationchange resize", function(){
		if($("#sp_header").css("height") == "50px"){ $("html").removeClass("pc").addClass("sp");
		}else{ $("html").removeClass("sp").addClass("pc"); }
	});
	
	
	// sp グローバルナビゲーション
	$(document).on("click","#sp_header div",function(){
		if( $("html").hasClass("sp") ){
			if( $("#sp_gnav").css("right") == "0px" ){
				$(this).removeClass("on");
				$("body").removeClass("fixed");
				$(".overlay").stop().hide();
				$("#sp_gnav").stop().animate({ "right":"-100%" },400,"easeOutQuint");
			}else{
				$(this).addClass("on");
				$("body").addClass("fixed");
				$(".overlay").stop().fadeTo(400,0.9);
				$("#sp_gnav").stop().animate({ "right":"0" },400,"easeOutQuint");
			}
		}
	});


	// sp アコーディオン
	$(document).on("click","#sp_gnav #gnav ul .pd_top a",function(){
		if( $("html").hasClass("sp") ){
			var _child = $(this).parent().find("ul");
			if( _child.is(':visible') ){
				$(this).removeClass("on");
				_child.slideUp("fast");
			}else{
				$(this).addClass("on");
				_child.slideDown("fast");
			}
		}
	});


	// smoth scroll
	$('a[href^="#"]').on("click", function(){
		var target = $( $(this).attr("href") ).offset().top;
		$("html,body").animate({ scrollTop: target }, 600, "easeOutQuint");
		return false;
	});
	
	
	// オートheight
	$('#t_topics .Txt,#awardees .paragraph ul li span').matchHeight();
	
	
	

	//TOPバナー
	$(function(){$(".imgSwitch a img").hover(function(){
		$(this).animate({opacity:1},200)
		},function(){$(this).animate({opacity:1},200)})
	});

	
});


$(document).ready(function() {
	var pagetop = $('.pt');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 120) {
			pagetop.fadeIn();
		} else {
			pagetop.fadeOut();
		}
	});
	pagetop.click(function () {
		$('body, html').animate({ scrollTop: 0 }, 500);
		return false;
	});
});




	

