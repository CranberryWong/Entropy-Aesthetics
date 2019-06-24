$(document).ready(function() {

	//导航鼠标划入事件
	//资讯

	$(".nav-message,.hb-nav li:nth-child(2)").hover(function() {

		trigger = setTimeout(function() {

			$(".nav-message").fadeIn(200);
			$("#icon-1").css("display", "block");
			$(".pull-exhibition,.pull-serve").hide();
		}, 200);
		$("#icon-1").unbind();
	}, function() {
		clearTimeout(trigger);
	});
	$(".nav-message").mouseleave(function() {
		$(".nav-message,#icon-1").hide();
		$(".pull-exhibition,.pull-serve,.nav-message").hide();
	})

	//展览活动
	$(".hb-nav li:nth-child(3),.pull-exhibition").hover(function() {
		trigger = setTimeout(function() {
			$("#icon-2").css("display", "block");
			$(".pull-exhibition").fadeIn(200);
			$(".nav-message,.pull-serve").hide();
		}, 200);
		$("#icon-2").unbind();
	}, function() {
		clearTimeout(trigger);

	});

	$(".pull-exhibition").mouseleave(function() {
		$(".pull-exhibition,#icon-2").hide();
	})

	//服务
	$(".hb-nav li:nth-child(6),.pull-serve").hover(function() {
		trigger = setTimeout(function() {
			$("#icon-3").css("display", "block");
			$(".pull-serve").fadeIn(20);
			$(".nav-message,.pull-exhibition").hide();
		}, 200);
		$("#icon-3").unbind();
	}, function() {
		clearTimeout(trigger);
		$(".nav-message,.pull-exhibition").hide();
	});

	$(".pull-serve").mouseleave(function() {
		$(".pull-serve,#icon-3").hide();
	})

	//导航移入移出增强版

	$(".header *").not(".hb-nav li:nth-child(6),.pull-serve").mouseenter(function() {
		$("#icon-3").hide();
		$(".pull-serve,#icon-3").hide();

	})

	$(".hb-nav *").not(".hb-nav li:nth-child(3),.pull-exhibition").mouseenter(function() {
		$("#icon-2").hide();
		$(".pull-exhibition").hide();

	})
	$(".hb-nav *").not(".hb-nav li:nth-child(2),.nav-message").mouseenter(function() {
		$("#icon-1").hide();
		$(".nav-message").hide();

	})

	//图标移入事件
	var trigger1; //微信定时参数
	var trigger2; //手机定时参数
	$(".sr-icon a,.ul-icon a").mouseenter(function() {
		var index1 = $(this).index();
		if(index1 == 0) {
			$(".icon1").css("background-position", "0px -41px");
			$(".ul-icon a li").eq(index1).css("color", "#cc0000");
		}
		if(index1 == 1) {
			$(".icon2").css("background-position", "-40px -41px");
			$(".ul-icon a li").eq(index1).css("color", "#cc0000");
		}
		if(index1 == 2) {
			$(".icon3").css("background-position", "-83px -41px");
			$(".ul-icon a li").eq(index1).css("color", "#cc0000");
		}
		if(index1 == 3) {
			$(".icon4").css("background-position", "-125px -41px");
			$(".ul-icon a li").eq(index1).css("color", "#cc0000");

			trigger1 = setTimeout(function() {
				$(".icon-wechat,.pull-wechat").fadeIn(200);
				$(".icon-wechat1,.pull-phone").hide();
			}, 200);
		}
		if(index1 == 4) {
			$(".icon5").css("background-position", "-171px -41px");
			$(".ul-icon a li").eq(index1).css("color", "#cc0000");
			trigger2 = setTimeout(function() {
				$(".icon-wechat1,.pull-phone").fadeIn(200);
				$(".icon-wechat,.pull-wechat").hide();
			}, 200);
		}
	});

	$(".icon-wz *,.nr-back *").not(".sr-icon a:nth-child(3),.ul-icon li:nth-child(3)").mouseenter(function() {

		$(".icon-wechat,.pull-wechat").hide();

	})
	$(".icon-wz *,.nr-back *").not(".sr-icon a:nth-child(4),.ul-icon li:nth-child(4)").mouseenter(function() {

		$(".icon-wechat1,.pull-phone").hide();
	})

	$(".sr-icon a,.ul-icon a").mouseleave(function() {
		var index1 = $(this).index();
		if(index1 == 0) {
			$(".icon1").css("background-position", "0px 0px");
			$(".ul-icon a li").eq(index1).css("color", "");
		}
		if(index1 == 1) {
			$(".icon2").css("background-position", "-40px 0px");
			$(".ul-icon a li").eq(index1).css("color", "");
		}
		if(index1 == 2) {
			$(".icon3").css("background-position", "-83px 0px");
			$(".ul-icon a li").eq(index1).css("color", "");
		}
		if(index1 == 3) {
			$(".icon4").css("background-position", "-125px 0px");
			$(".ul-icon a li").eq(index1).css("color", "");
			$(".icon-wechat,.pull-wechat").css("display", "none");
			clearTimeout(trigger1);
		}
		if(index1 == 4) {
			$(".icon5").css("background-position", "-171px 0px");
			$(".ul-icon a li").eq(index1).css("color", "");
			$(".icon-wechat1,.pull-phone").css("display", "none");
			clearTimeout(trigger2);
		}
	});

	//资讯导航鼠标划入事件
	$(".nav-control ul").eq(0).css("display", "block");
	
	$("#nav-mul a").hover(function() {
		
		if(!$(this).hasClass("nav-top")){
          $(this).addClass("nav-oop");
          
        }
		

	},function(){

             $(this).removeClass("nav-oop");
	});

	

	//资讯导航点击
  
	$(".nav-mul li").click(function(e) {
		e.preventDefault();
		var index1 = $(".nav-mul li").index(this);

		$(".nav-mul li").eq(index1).css("color", "#333333").siblings().css("color", "");
		$(".mag-navbor li").eq(index1).css("visibility", "visible").siblings().css("visibility", "hidden");
		$(this).unbind('mouseleave');
		$(this).addClass("nav-top").siblings().removeClass("nav-top");
		$(".nav-control .nav-kz").eq(index1).css("display", "block").siblings().css("display", "none");
	});
	
		$('.nav-kz').each(function(){
			$(this).find('li:eq(5) .xian').css('display','none');
			$(this).find('li:last .xian').css('display','none');
		})

	//点击搜索事件
	$(".sr-icon a:nth-child(1)").click(function() {

		//   	return true;
		//   	 $('body').bind('click', function(event) {
		//     // IE支持 event.srcElement ， FF支持 event.target    
		//		    var evt = event.srcElement ? event.srcElement : event.target; 
		//		    var aa = $(".search-md");
		//		    if(evt.id == 'aa' ) return; // 如果是元素本身，则返回
		//		    else {
		//		        $(".search-md").hide(); // 如不是则隐藏元素
		//		        $(".icon-wz").css("display","block");
		//		    }   
		//		});

	});
	

	//搜索点击和输入显示隐藏
	$(".sr-inqut").bind("click", function() {
		$(".icon-se").css("display", "block");
		$(".sr-inqut").css("border", "none");
		if($(".pull-seek").css('display') != 'none') {

		}
		$(".pull-seek").show();
	})
	$(".sr-inqut").bind("keyup", function() {
		$(".icon-se").css("display", "none");
		if($(".pull-seek").css('display') != 'block') {

		}
		$(".pull-seek").hide();
	})

	//移入资讯
		$(".nav-kz").on('mouseover','.xq-abstract',function() {
		$(this).css({
			"background-color": "#ffffff",
			"-moz-box-shadow": "0px 0px 30px rgba(0,0,0,0.1)",
			"-webkit-box-shadow": "0px 0px 30px rgba(0,0,0,0.1)",
			"box-shadow": "0px 0px 30px rgba(0,0,0,0.15)",
			"-webkit-transition": "all 0.2s ease-in",
            "-moz-transition": "all 0.2s ease-in",
           "-o-transition": "all 0.2s ease-in",
            "transition": "all 0.2s ease-in"
		});


	});
	$(".nav-kz").on('mouseleave','.xq-abstract',function() {
		$(this).css({
			"background-color": "",
			"-moz-box-shadow": "",
			"-webkit-box-shadow": "",
			"box-shadow": ""
		});
		$(".nav-kz li:first-child").css("border-top", "none")

	});
	// $(".xq-abstract", this).mouseover(function() {
		// $(this).css({
			// "background-color": "#ffffff",
			// "-moz-box-shadow": "0px 0px 30px rgba(0,0,0,0.1)",
			// "-webkit-box-shadow": "0px 0px 30px rgba(0,0,0,0.1)",
			// "box-shadow": "0px 0px 30px rgba(0,0,0,0.15)",
			// "-webkit-transition": "all 0.2s ease-in",
            // "-moz-transition": "all 0.2s ease-in",
           // "-o-transition": "all 0.2s ease-in",
            // "transition": "all 0.2s ease-in"
		// });


	// });
	// $(".xq-abstract", this).mouseleave(function() {
		// $(this).css({
			// "background-color": "",
			// "-moz-box-shadow": "",
			// "-webkit-box-shadow": "",
			// "box-shadow": ""
		// });
		// $(".nav-kz li:first-child").css("border-top", "none")

	// });
	$(".nav-kz li:first-child").css("border-top", "none")

	//资讯导航固定

	var h = $(".top").height();

	$(window).scroll(function() {
		var doscrollTop = $(document).scrollTop();
		if(doscrollTop > 800) {
			$(".nav-mul").css({
				"position": "fixed",
				"top": "3px",
				"background-color": "#ffffff",
				"-moz-box-shadow": "0px 4px 6px rgba(96,96,96, .2)",
				"-webkit-box-shadow": "0px 4px 6px rgba(96,96,96, .2)",
				"box-shadow": "0px 4px 6px rgba(96,96,96, .2)"
			});
			$(".mag-navbor").css({"position":"fixed","top": "-10px","background-color": "#ffffff"})
		} else {
			$(".nav-mul").css({
				"position": "",
				"background-color": "",
				"-moz-box-shadow": "",
				"-webkit-box-shadow": "",
				"box-shadow": ""
			});
			$(".mag-navbor").css({"position":"","background-color":""})
			

		}
		if(doscrollTop > 100) {
			$("#re-fh").css("display", "block");
			if($(".hea-img").css('display') != 'none') {
				// $(".sbs_ad").css("top", "80px");
				// $(".sbs_ad1").css("top", "387px");
					$(".couplet-le").css("top", "80px");
				$(".couplet-ri").css("top", "80px");
				$(".cou-aa").css("top", "387px");
				$(".couplet-ri1").css("top", "387px");
			}
		} else {
			$("#re-fh").css("display", "none");
			if($(".hea-img").css('display') != 'none') {
				// $(".sbs_ad").css("top", "180px");
				// $(".sbs_ad1").css("top", "490px");
					$(".couplet-le").css("top", "180px");
				$(".couplet-ri").css("top", "180px");
				$(".cou-aa").css("top", "490px");
				$(".couplet-ri1").css("top", "490px");
			}
		}

		//判断到达底部距离少于400p隐藏资讯导航
		var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
		var documentheight = parseFloat($(document).height());
		if(documentheight - totalheight <= 400) {
			$(".nav-mul").fadeOut();
		} else {
			$(".nav-mul").fadeIn();
		}
	})

	//选项卡
	$(".tab-menu li").eq(0).addClass("change").siblings().removeClass("change");
	$(".tab-menu li").mouseover(function() {
		//通过 .index1()方法获取元素下标，从0开始，赋值给某个变量
		var _index1 = $(this).index();
		//让内容框的第 _index1 个显示出来，其他的被隐藏
		$(".tab-box>div").eq(_index1).show().siblings().hide();
		//改变选中时候的选项框的样式，移除其他几个选项的样式
		$(this).addClass("change").siblings().removeClass("change");
	});

	//导航弹出搜索事件
	$(".pull-seek").mouseleave(function() {
		$(".icon-se").css("display", "none");
		var text = $("#intext").val();

		if($(".pull-seek").css('display') != 'none') {

		}
		$(".pull-seek").hide();

	});

	//用户功能鼠标移入事件
	$(".res-img1").mouseover(function() {
		$(".res-img1").css("display", "none");
		$("#gb-text").css("display", "block");
	})
	$("#re-gb").mouseleave(function() {
		$(".res-img1").css("display", "block");
		$("#gb-text").css("display", "none");
	});
	$(".res-img2").mouseover(function() {
		$(".res-img2").css("display", "none");
		$("#zx-text").css("display", "block");
	})
	$("#re-kf").mouseleave(function() {
		$(".res-img2").css("display", "block");
		$("#zx-text").css("display", "none");
	});
	$(".res-img3").mouseover(function() {
		$(".res-img3").css("display", "none");
		$("#fh-text").css("display", "block");
	})
	$("#re-fh").mouseleave(function() {
		$(".res-img3").css("display", "block");
		$("#fh-text").css("display", "none");
	});

	$(".nav-mul li").click(function() {

		if($(document).scrollTop() > 800) {

			$('html , body').animate({
				scrollTop: 650
			}, 'slow');
		}
	})

	$('#fh-text').click(function() {
		$('html , body').animate({
			scrollTop: 0
		}, 'slow');
	});

	//点击关闭广告
	$(".ad-close").click(function() {
		$(".hea-img").css("display", "none");
		$(".couplet-le").css("top", "91px");
		$(".couplet-ri").css("top", "91px");
		$(".cou-aa").css("top", "398px");
		$(".couplet-ri1").css("top", "398px");
	})
	$('.coup-close').click(function() {
		$(this).parent().fadeOut();
	});

	$(".sr-se").bind("mouseover", function() {
		open($(".sr-se").prev('select'));
	})
	$("#re-fh").mouseleave(function() {
		$(".res-img3").css("display", "block");
		$("#fh-text").css("display", "none");
	});
	
	

	

	//搜索下拉框
	$(".select").each(function() {
		var s = $(this);
		var z = parseInt(s.css("z-index"));
		var dt = $(this).children("dt");
		var dd = $(this).children("dd");
		var da = $("#sedt");
		var _show = function() {
			dd.slideDown(0);
			dt.addClass("cur");
			s.css("z-index", z + 1);
		}; //展开效果
		var _hide = function() {
			dd.slideUp(0);
			dt.removeClass("cur");
			s.css("z-index", z);
		}; //关闭效果
		dt.hover(function() {
			dd.is(":hidden") ? _show() : _show();
		});
		dd.find("a").click(function() {
			dt.html($(this).html());
			_hide();
		}); //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
		$("body").click(function(i) {
			!$(i.target).parents(".select").first().is(s) ? _hide() : "";
		});
	})

	$(".header *").not(".hb-nav li:nth-child(6),.pull-serve").mouseenter(function() {
		$("#icon-3").hide();
		$(".pull-serve,#icon-3").hide();

	})

	$(".header *").not("#sedt,#seul li,#seli,#seli1,#seli2").mouseleave(function() {

		$(".sedd").hide();
	})

});
 

//搜索框点击其他隐藏
$(function() {

	var oBox = document.getElementsByTagName("body");
	var obj = document.getElementById("search-md");
	var obj2 = document.getElementById("search");
	var obj1 = document.getElementById("select");
	var oBtn = document.getElementById("icon-btn");
    var oBtn1 = document.getElementById("li-disp");
	var obj3 = document.getElementById("intext");
	var obj4 = document.getElementById("sedt");
	var obj5 = $("#seul").parent().children();
	var obj6 = document.getElementById("sedd");
	var obj7 = document.getElementById("seli");
	var obj8 = document.getElementById("seli1");
	var obj9 = document.getElementById("seeksdsd");
	var obj10 = document.getElementById("seli2");

	oBtn.onclick = function() {
		obj.style.display = "block";
		$("#li-disp").css("visibility", "hidden");
		$(".icon1").css("visibility", "hidden");
		$(".icon-se").css("display", "none");
	}
    oBtn1.onclick = function() {
    	
		obj.style.display = "block";
		$("#li-disp").css("visibility", "hidden");
		$(".icon1").css("visibility", "hidden");
		$(".icon-se").css("display", "none");
	}
	document.onclick = function(event) {
		//  
		var e = event || window.event; //兼容ie和非ie的event  
		var aim = e.srcElement || e.target; //兼容ie和非ie的事件源  
		//  
		if(e.srcElement) {
			var aim = e.srcElement;
			if(aim != oBtn && aim != oBtn1 && aim != obj && aim != obj1 && aim != obj2 && aim != obj3 && aim != obj4 && aim != obj5 && aim != obj6 && aim != obj7 && aim != obj8 && aim != obj9 && aim != obj10) {
				obj.style.display = "none";
				$(".ul-icon li:nth-child(1)").css("visibility", "visible");
				$(".icon1").css("visibility", "visible");
				$(".pull-seek").css("display", "none")
			}
		} else {
			var aim = e.target;
			if(aim != oBtn && aim != oBtn1 && aim != obj && aim != obj1 && aim != obj2 && aim != obj3 && aim != obj4 && aim != obj5 && aim != obj6 && aim != obj7 && aim != obj8 && aim != obj9 && aim != obj10) {
				obj.style.display = "none";
				$(".ul-icon li:nth-child(1)").css("visibility", "visible");
				$(".icon1").css("visibility", "visible");
				$(".pull-seek").css("display", "none")
			}
		}
	}

	$('#seul .search_type').click(function(){
		var thisId = $(this).attr('alt');
		$('#Z_search_type').val(thisId);
	})
	$('.sr-seek').click(function(){
		$(this).parents('form').submit();
		
	})
	
		$('.seek-ul li').click(function(){
			$('#Z_search_type').val(2);
			$('#intext').val($(this).children('a').text());
			 $('#searchForm').submit();
	})



});


 function headSearchSubList(f)
		{
			var action = '';
			var type = f.Z_search_type.value;
			if (f.q.value == ''){alert('请输入搜索内容。');return false;}
			if (type == 0){
				action = "http://b2b.cps.com.cn/list/?id=920468";
			}else if(type == 1){
				action = "http://company.cps.com.cn/index/";
			}else{
				action = "http://news.cps.com.cn/search/";
				f.q.name = 'keyword';
				f.method = 'post';
			}
			f.action = action;
			f.submit();
		}



//品牌专区轮播
$(function() {
	var t;
	var index = 0;
	/////自动播放
	t = setInterval(play, 2000)

	function play() {
		index++;
		if(index > 1) {
			index = 0
		}
		// console.log(index)
		$(".brand-ul>.bra-li").eq(index).fadeIn().css({
			"display": "block"

		}).siblings().css({
			"display": "none"
		})
	};
	$(".brand-ul").hover(
		
		function() {
			clearInterval(t);
		},
		function() {
			//$('#toright,#toleft').hide()
			//alert('aaa')
			t = setInterval(play, 2000)

			function play() {
				index++;
				if(index > 1) {
					index = 0
				}
				$(".brand-ul>.bra-li").eq(index).fadeIn().css({
					"display": "block"

				}).siblings().css({
					"display": "none"
				})

			}
		})
});

//轮播图1
$(function() {
	var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;

	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	//	var btn = "<div class='btnBg'></div><div class='btn'>";
	//	for(var i=0; i < len; i++) {
	//		btn += "<span></span>";
	//	}
	//	btn += "<div id='left' class='arrow'><img class='lb-left' src='img/centre/skip-left.png'/><div id='right' class='arrow'><img class='lb-left' src='img/centre/skip-right.png'/></div>";
	//	$("#focus").append(btn);
	$("#focus .btnBg").css("opacity", 0.5);

	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus .btn span").css({
		"opacity": "0.2"
	}).mouseenter(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//上一页、下一页按钮透明度处理
	$("#focus .preNext").css({
		"opacity": "0.2"
	}).hover(function() {
		$(this).stop(true, false).animate({
			"opacity": "0.5"
		}, 300);
	}, function() {
		$(this).stop(true, false).animate({
			"opacity": "0.2"
		}, 300);
	});

	//上一页按钮
	$("#left").click(function() {
		index -= 1;
		if(index == -1) {
			index = len - 1;
		}
		showPics(index);
	});

	//下一页按钮
	$("#right").click(function() {
		index += 1;
		if(index == len) {
			index = 0;
		}
		showPics(index);
	});

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus ul").css("width", sWidth * (len));

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus").hover(function() {
		clearInterval(picTimer);
	}, function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {
				index = 0;
			}
		}, 4000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");

	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index * sWidth; //根据index值计算ul元素的left值
		$("#focus ul").stop(true, false).animate({
			"left": nowLeft
		}, 300); //通过animate()调整ul元素滚动到计算出的position
		//$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		$("#focus .btn span").stop(true, false).animate({
			"opacity": "0.1"
			
		}, 300).eq(index).stop(true, false).animate({
			"opacity": "1",
			"background":"#000"
		}, 300); //为当前的按钮切换到选中的效果
	}
});

//轮播图2
$(function() {
	var sWidth = $("#focus1").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus1 ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;

	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	//	var btn = "<div class='btnBg'></div><div class='btn'>";
	//	for(var i=0; i < len; i++) {
	//		btn += "<span></span>";
	//	}
	//	btn += "<div id='left' class='arrow'><img class='lb-left' src='img/centre/skip-left.png'/><div id='right' class='arrow'><img class='lb-left' src='img/centre/skip-right.png'/></div>";
	//	$("#focus").append(btn);
	$("#focus1 .btnBg").css("opacity", 0.5);

	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus1 .btn span").css({
		"opacity": "0.2"
	}).mouseenter(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//上一页、下一页按钮透明度处理
	$("#focus1 .preNext").css({
		"opacity": "0.2"
	}).hover(function() {
		$(this).stop(true, false).animate({
			"opacity": "0.5"
		}, 300);
	}, function() {
		$(this).stop(true, false).animate({
			"opacity": "0.2"
		}, 300);
	});

	//上一页按钮
	$("#prev").click(function() {
		index -= 1;
		if(index == -1) {
			index = len - 1;
		}
		showPics(index);
	});

	//下一页按钮
	$("#next").click(function() {
		index += 1;
		if(index == len) {
			index = 0;
		}
		showPics(index);
	});

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus1 ul").css("width", sWidth * (len));

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus1").hover(function() {
		clearInterval(picTimer);
	}, function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {
				index = 0;
			}
		}, 4000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");

	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index * sWidth; //根据index值计算ul元素的left值
		$("#focus1 ul").stop(true, false).animate({
			"left": nowLeft
		}, 300); //通过animate()调整ul元素滚动到计算出的position
		//$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		$("#focus1 .btn span").stop(true, false).animate({
			"opacity": "0.1"
			
		}, 300).eq(index).stop(true, false).animate({
			"opacity": "1"
		}, 300); //为当前的按钮切换到选中的效果
	}
});


	
