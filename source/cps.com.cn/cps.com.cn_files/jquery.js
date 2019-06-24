/**
 * jquery.cpsSlide.js v 0.1
 * Copyright (c) 2014 G.Lee  http://www.cps.com.cn
 * Date: 2014-03-16
 * 一级频道页面的幻灯片切换效果
 * 暂不优化代码和封装过多功能
 */
(function ($) { 
	$.fn.cpsSlide = function(options) {  
		var defaults = {  
			time: 4000
		};   
		var opts = $.extend(defaults, options);  
		this.each(
			function () { 
				var $this = $(this);//获取当前焦点图容器对象
				var slideImg = $this.find("#slider-keleyi-com"); //获取焦点图 图片列表容器对
				var slideText = $this.find(".ak_name"); //获取焦点图 图片列表容器对象
				var sWidth = slideImg.width(); //获取焦点图的宽度（显示面积）
				var len = slideImg.find("ul li").length; //获取焦点图个数
				var ul = slideImg.find("ul");
				var li = slideImg.find("ul li");
				var index = 0;
				var picTimer;
				//以下代码添加导航按钮
				var btn = "<ol>";
				for(var i=0; i < len; i++) {
					btn += "<li>"+i+"</li>";
					//btn += "<span>"+$(li[i]).find("div").text()+"</span>";
				}
				btn += "</ol>";
				$('.c_btn').append(btn);
				var controlDiv = "<p class='prev'></p><p class='next'></p>";
				slideImg.append(controlDiv);
				
	
				//设置导航按钮的宽度和内容
				//slideText.find(".btn span").width( sWidth / len + 'px' ).css({"opacity": .8});
				
				//为小按钮添加鼠标滑入事件，以显示相应的内容
				$('.c_btn').find("ol li").mouseenter(function() {
					index = $('.c_btn').find("ol li").index(this);
					showPics(index);
				}).eq(0).trigger("mouseenter");
	
				//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
				ul.css("width",sWidth * (len));
				
				//上一页、下一页按钮透明度处理
				/*slideImg.find(".preNext").css("opacity",0.3).hover(function() {
					$(this).stop(true,false).animate({"opacity":"0.7"},300);
				},function() {
					$(this).stop(true,false).animate({"opacity":"0.3"},300);
				});
				*/
			
				//上一页按钮
				slideImg.find(".prev").click(function() {
					index -= 1;
					if(index == -1) {index = len - 1;}
					showPics(index);
				});
			
				//下一页按钮
				slideImg.find(".next").click(function() {
					index += 1;
					if(index == len) {index = 0;}
					showPics(index);
				});
			
				
				//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
				slideImg.hover(function() {
					clearInterval(picTimer);
				},function() {
					picTimer = setInterval(function() {
						showPics(index);
						index++;
						if(index == len) {index = 0;}
					}, opts.time); //此4000代表自动播放的间隔，单位：毫秒
				}).trigger("mouseleave");
				//显示图片函数，根据接收的index值显示相应的内容
				function showPics(index) { //普通切换
					var title = $(li[index]).find("a").attr("data-title");
					var url = $(li[index]).find("a").attr("href");
					//var text = $(li[index]).find("img").attr("data-text");
					var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
					ul.stop(true,false).animate({"left":nowLeft},150); //通过animate()调整ul元素滚动到计算出的position
					$('.c_btn').find("ol li").removeClass("active").eq(index).addClass("active"); //为当前的按钮切换到选中的效果
					
					
					//设置文字
					slideText.find("a").text(title);
					slideText.find("a").attr('href',url);
					//slideText.find("a").text(text);
				}
			}
			
			
		);
		
	};  
})(jQuery); 
