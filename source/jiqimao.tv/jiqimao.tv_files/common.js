/*
	公共代码
*/
$(function() {
	// 返回顶部
	$("#toTop").on('click', function() {
		$(window).scrollTop(0);
	});

	//关闭广告条按钮
	$(document).on('click', '.close-ad', function(){
		$(this).parent().hide();
	});

	$(document).on('click', '.float-ad-close', function(){
		$(this).parent().parent().hide();
	});

	// 缩放屏幕
	$(window).resize(function() {
		$(".tv-tab-inner").css({
			"left": "0"
		});
	});

	// 滚动屏幕
	$(window).scroll(function() {
        var scrollTop = $(document).scrollTop();
        if (scrollTop > 580) {
            $(".float-box").show(500);
        } else {
            $(".float-box").hide(500);
        }
    });

    $(document).on('click', '.popover', function(){
    	$(this).hide();
    });

	// 关闭二维码弹框
	$("#close").on('click', function(){
		$("#ewm-box").hide();
	});

	// 显示二维码
	$('.weixin-icon').on('click', function(){
		$("#ewm-box").show();
	});

    //栏目 向左切换
    $(document).on('click', ".tv-tab .prev-btn", function() {
        var page = $(this).parents('.tv-tab').attr('data-page');
        var left = $(this).parent().width();
        if(page <= 0) return;
        page--;
        $(this).parent().find('.tv-tab-inner').animate({
            "left": -left*page
        });
        $(this).parents('.tv-tab').attr('data-page', page);
    });

    //向右切换
    $(document).on('click', ".tv-tab .next-btn", function() {
        var page = $(this).parents('.tv-tab').attr('data-page');
        var left = $(this).parent().width();
        var length = $(this).parent().find('.tv-tab-inner').find('a').length / 6;
        if(page >= length -1) return;
        $(this).parent().find('.tv-tab-inner').animate({
            "left": -(left*page+left)
        });
        page++;
        $(this).parents('.tv-tab').attr('data-page', page);
    });
})