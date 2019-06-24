
(function($) {
	$.fn.fade_slide = function(pm){
		var df = $.extend({
			time: 800,
			delay: 6000
		}, pm);
		
		return this.each(function(i){
			
			var _self = this;
			z = 0;
			now_num = 1;
			sto = "";
			len = $(_self).find(".slide_i").children().length;
			
			$(_self).find(".baseWidth1200").css({"position":"relative"});
			
			var _self_i = $(_self).find(".slide_i");
			var cd = _self_i.children();
			cd.each(function(ii){
				$(this).css({"position":"absolute","top":"0","left":"0","z-index":len-ii,"width":"100%"});
				if (ii != 0) { $(this).hide(); }	
				else { $(this).addClass("current"); }
			});
			
			$(_self).find(".slide_s li").eq(0).addClass("on");
			sto = setInterval(function(){ is_slide($(_self)); }, df.delay);
			
			$(_self).find(".slide_s li").click(function(){
				clearInterval(sto);
				now_num = $(_self).find(".slide_s li").index(this);
				setTimeout(function(){ is_slide($(_self)); sto = setInterval(function(){ is_slide($(_self)); }, df.delay); });
			});
		
		});
		
		function is_slide(target){

			var target_i = target.find(".slide_i");
			var target_s = target.find(".slide_s");
			
			if( now_num > len -1 ){ now_num = 0; }
			else if( now_num < 0 ){ now_num = len -1; }
			target_i.find(".current").fadeOut(df.time).removeClass("current");
			target_i.find("li").eq(now_num).addClass("current");
			target_i.find(".current").css({ "z-index": z }).fadeIn(df.time);
			target_s.find("li.on").removeClass("on");
			target_s.find("li").eq(now_num).addClass("on");
			now_num++; z++;
		}
				
	}	
})(jQuery);


$(function(){
	$(".carousel").fade_slide({time:800, delay:6000});
});