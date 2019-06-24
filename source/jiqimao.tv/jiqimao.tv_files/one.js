$(function() {
	var cat = function(obj) {
		obj.tv = {

			rollInt: null,

			roll: function () {
				$('.today .focus ul li:last').css({'height':'0px','opacity': '0'}).insertBefore('.today .focus ul li:first').animate({'height':'28px','opacity': '1'}, 'slow', function() { $(this).removeAttr('style');});

            },
			carousel: function() {
				var idx = 0;
				$(".carousel-nav a").on('mouseover', function() {
					idx = $(this).index();
					$(this).addClass('active').siblings().removeClass('active');
					$(".slider").hide().eq(idx).show();
				});

				setInterval(function() {
					idx++;
					if (idx > $(".carousel-nav a").length - 1) idx = 0;
					$(".slider").hide().eq(idx).show();
					$(".carousel-nav a").eq(idx).addClass('active').siblings().removeClass('active');
				}, 5000);
			},
			tab: function() {
				var i = 0;
				var left = $("#news-big-vedio").find('.big-vedio-inner').css("left");
				var width = $("#news-big-vedio").find('a').width();
				var length = $("#news-big-vedio").find('a').length - 1;
				$("#news-big-vedio").on('click', '.left-btn', function() {
					if (i <= 0) return;
					i--;
					$("#news-big-vedio").find('.big-vedio-inner').animate({
						left: parseInt(left) - (width * i)
					});
				});

				$("#news-big-vedio").on('click', '.right-btn', function() {
					if (i >= length) return;
					i++;
					$("#news-big-vedio").find('.big-vedio-inner').animate({
						left: -width * i
					});
				});
			},
			addEvent: function() {
				var _this = this;

				// 缩放屏幕
				var length = $("#news-big-vedio").find('a').length;
				$("#news-big-vedio").find('.big-vedio-inner').width($(".big-vedio").width() * length);
				$(window).resize(function() {
					$("#news-big-vedio").find('.big-vedio-inner').width($(".big-vedio").width() * length);
				});

				// 滚动屏幕
				$(window).scroll(function() {
					var scrollTop = $(document).scrollTop();
					if (scrollTop > 580) {
						$(".site-head").css('background', '#fff');
					} else {
						$(".site-head").css('background', '');
					}
				});

				// 一级导航鼠标浮动上面添加样式效果
				$(".site-nav").on('mouseover', 'a', function() {
					$(".site-nav").find('a').removeClass('active');
					$(this).addClass('active');
				});

				// 二级导航鼠标浮动上面添加样式效果
				$(".nav").on('mouseover', 'a', function() {
					$(this).addClass('current').parent().siblings('li').find('a').removeClass('current');
				});

				//小编推荐
                var hotRecIdx = 0;
                //向左切换
                $(document).on('click', ".hot-rec .prev-btn", function() {
                    var left = $(this).parent().width();
                    if(hotRecIdx <= 0) return;
                    hotRecIdx--;
                    $(this).parent().find('.hot-rec-inner').animate({
                        "left": -left*hotRecIdx
                    });
                });

                //向右切换
                $(document).on('click', ".hot-rec .next-btn", function() {
                    var left = $(this).parent().width();
                    var length = $(this).parent().find('.hot-rec-inner').find('.box-item').length / 3;
                    if(hotRecIdx >= length -1) return;
                    $(this).parent().find('.hot-rec-inner').animate({
                        "left": -(left*hotRecIdx+left)
                    });
                    hotRecIdx++;
                });

                //今日焦点
                _this.rollInt = setInterval(_this.roll,4000);

                $(".today .focus ul li").hover(function() {

                    clearInterval(_this.rollInt);

                }, function() {

                    _this.rollInt = setInterval(_this.roll,4000)

                });


				//左右切换
				_this.tab();

				//广告
                jqm_webTools.adTools.loadHomeOrnAd();

				//顶部标语
                jqm_webTools.adTools.loadHomeTopCol();
			},
			init: function() {
				var _this = this;
				_this.carousel();
				_this.addEvent();
			}
		};
		return obj;
	}(cat || {});
	cat.tv.init();
});