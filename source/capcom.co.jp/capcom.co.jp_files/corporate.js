/* jquery.tinyscrollbar.min.js */
(function(a){a.tiny=a.tiny||{};a.tiny.scrollbar={options:{axis:"y",wheel:40,scroll:true,lockscroll:true,size:"auto",sizethumb:"auto"}};a.fn.tinyscrollbar=function(d){var c=a.extend({},a.tiny.scrollbar.options,d);this.each(function(){a(this).data("tsb",new b(a(this),c))});return this};a.fn.tinyscrollbar_update=function(c){return a(this).data("tsb").update(c)};function b(q,g){var k=this,t=q,j={obj:a(".viewport",q)},h={obj:a(".overview",q)},d={obj:a(".scrollbar",q)},m={obj:a(".track",d.obj)},p={obj:a(".thumb",d.obj)},l=g.axis==="x",n=l?"left":"top",v=l?"Width":"Height",r=0,y={start:0,now:0},o={},e=("ontouchstart" in document.documentElement)?true:false;function c(){k.update();s();return k}this.update=function(z){j[g.axis]=j.obj[0]["offset"+v];h[g.axis]=h.obj[0]["scroll"+v];h.ratio=j[g.axis]/h[g.axis];d.obj.toggleClass("disable",h.ratio>=1);m[g.axis]=g.size==="auto"?j[g.axis]:g.size;p[g.axis]=Math.min(m[g.axis],Math.max(0,(g.sizethumb==="auto"?(m[g.axis]*h.ratio):g.sizethumb)));d.ratio=g.sizethumb==="auto"?(h[g.axis]/m[g.axis]):(h[g.axis]-j[g.axis])/(m[g.axis]-p[g.axis]);r=(z==="relative"&&h.ratio<=1)?Math.min((h[g.axis]-j[g.axis]),Math.max(0,r)):0;r=(z==="bottom"&&h.ratio<=1)?(h[g.axis]-j[g.axis]):isNaN(parseInt(z,10))?r:parseInt(z,10);w()};function w(){var z=v.toLowerCase();p.obj.css(n,r/d.ratio);h.obj.css(n,-r);o.start=p.obj.offset()[n];d.obj.css(z,m[g.axis]);m.obj.css(z,m[g.axis]);p.obj.css(z,p[g.axis])}function s(){if(!e){p.obj.bind("mousedown",i);m.obj.bind("mouseup",u)}else{j.obj[0].ontouchstart=function(z){if(1===z.touches.length){i(z.touches[0]);z.stopPropagation()}}}if(g.scroll&&window.addEventListener){t[0].addEventListener("DOMMouseScroll",x,false);t[0].addEventListener("mousewheel",x,false)}else{if(g.scroll){t[0].onmousewheel=x}}}function i(A){var z=parseInt(p.obj.css(n),10);o.start=l?A.pageX:A.pageY;y.start=z=="auto"?0:z;if(!e){a(document).bind("mousemove",u);a(document).bind("mouseup",f);p.obj.bind("mouseup",f)}else{document.ontouchmove=function(B){B.preventDefault();u(B.touches[0])};document.ontouchend=f}}function x(B){if(h.ratio<1){var A=B||window.event,z=A.wheelDelta?A.wheelDelta/120:-A.detail/3;r-=z*g.wheel;r=Math.min((h[g.axis]-j[g.axis]),Math.max(0,r));p.obj.css(n,r/d.ratio);h.obj.css(n,-r);if(g.lockscroll||(r!==(h[g.axis]-j[g.axis])&&r!==0)){A=a.event.fix(A);A.preventDefault()}}}function u(z){if(h.ratio<1){if(!e){y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+((l?z.pageX:z.pageY)-o.start))))}else{y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+(o.start-(l?z.pageX:z.pageY)))))}r=y.now*d.ratio;h.obj.css(n,-r);p.obj.css(n,y.now)}}function f(){a(document).unbind("mousemove",u);a(document).unbind("mouseup",f);p.obj.unbind("mouseup",f);document.ontouchmove=document.ontouchend=null}return c()}}(jQuery));


jQuery(function($) {
	//header
	$(window).resize(function() {
        var wid = $(window).width();
        if(wid < 641){
        	if($('#menu-area').hasClass('menu-toggle')){
        	} else {
            	$('#menu-area').addClass('menu-toggle');
            	$('#menu-area').hide();
        	}
        } else {
            $('#menu-btn').removeClass('open');
            $('#menu-area').removeClass('menu-toggle');
            $('#menu-area').show();
        }
	});
	$('#menu-btn').click(function() {
		$(this).toggleClass('open');
		if($(this).siblings().hasClass('open')){
			$(this).siblings().removeClass('open');
		};
		$('.menu-toggle').slideToggle();
	});

	//mouse-over
	$('[src*="_off."]')
	.mouseover(function()
	{$(this).attr("src",$(this).attr("src").replace(/^(.+)_off(\.[a-z]+)$/,"$1_on$2"));})
	.mouseout(function()
	{$(this).attr("src",$(this).attr("src").replace(/^(.+)_on(\.[a-z]+)$/,"$1_off$2"));})
	.each(function(init)
	{$("<img>").attr("src",$(this).attr("src").replace(/^(.+)_off(\.[a-z]+)$/,"$1_on$2"));})

	//tab
	$("#tab li").click(function() {
		var num = $("#tab li").index(this);
		$(".content_wrap").addClass('disnon');
		$(".content_wrap").eq(num).removeClass('disnon');
        if (typeof $(".content_wrap").eq(num).data("tsb") !== "undefined") {
            $(".content_wrap").eq(num).tinyscrollbar_update('relative');
        }
		$("#tab li").removeClass('select');
		$(this).addClass('select')
	});
	$("#tab li").mouseover(function(){
		var className = $(this).attr('class');
		if(className!='selected'){
			$(this).addClass('on');
		}
		}).mouseout(function(){
			$(this).removeClass('on');
	})
});




/**
 * @name		Shuffle Letters
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 * @license		MIT License
 */

(function($){
	
	$.fn.shuffleLetters = function(prop){
		
		var options = $.extend({
			"step"		: 8,			// How many times should the letters be changed
			"fps"		: 80,			// Frames Per Second
			"text"		: "", 			// Use this text instead of the contents
			"callback"	: function(){}	// Run once the animation is complete
		},prop)
		
		return this.each(function(){
			
			var el = $(this),
				str = "";


			// Preventing parallel animations using a flag;

			if(el.data('animated')){
				return true;
			}
			
			el.data('animated',true);
			
			
			if(options.text) {
				str = options.text.split('');
			}
			else {
				str = el.text().split('');
			}
			
			// The types array holds the type for each character;
			// Letters holds the positions of non-space characters;
			
			var types = [],
				letters = [];

			// Looping through all the chars of the string
			
			for(var i=0;i<str.length;i++){
				
				var ch = str[i];
				
				if(ch == " "){
					types[i] = "space";
					continue;
				}
				else if(/[a-z]/.test(ch)){
					types[i] = "lowerLetter";
				}
				else if(/[A-Z]/.test(ch)){
					types[i] = "upperLetter";
				}
				else {
					types[i] = "symbol";
				}
				
				letters.push(i);
			}
			
			el.html("");			

			// Self executing named function expression:
			
			(function shuffle(start){
			
				// This code is run options.fps times per second
				// and updates the contents of the page element
					
				var i,
					len = letters.length, 
					strCopy = str.slice(0);	// Fresh copy of the string
					
				if(start>len){
					
					// The animation is complete. Updating the
					// flag and triggering the callback;
					
					el.data('animated',false);
					options.callback(el);
					return;
				}
				
				// All the work gets done here
				for(i=Math.max(start,0); i < len; i++){

					// The start argument and options.step limit
					// the characters we will be working on at once
					
					if( i < start+options.step){
						// Generate a random character at thsi position
						strCopy[letters[i]] = randomChar(types[letters[i]]);
					}
					else {
						strCopy[letters[i]] = "";
					}
				}
				
				el.text(strCopy.join(""));
				
				setTimeout(function(){
					
					shuffle(start+1);
					
				},1000/options.fps);
				
			})(-options.step);
			

		});
	};
	
	function randomChar(type){
		var pool = "";
		
		if (type == "lowerLetter"){
			pool = "abcdefghijklmnopqrstuvwxyz0123456789";
		}
		else if (type == "upperLetter"){
			pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		}
		else if (type == "symbol"){
			pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		}
		
		var arr = pool.split('');
		return arr[Math.floor(Math.random()*arr.length)];
	}
	
})(jQuery);




$(function() {
//----------------------------------------
//		変数の設定
//----------------------------------------
	var sldrElement = '#sldr',
	    sldr = $(sldrElement),
	    visualElement = '#sldr-visual',
	    visual = $(visualElement),
	    visualLength = visual.find('li').length,
	    visualWidth = 902, visualHeight = 319,

	    spVisualElement = '#sldr-sp-visual',
	    spVisual = $(spVisualElement),
	    spVisualWidth = 320, spVisualHeight = 114,

	    bgElement = '#sldr-bg',
	    bg = $(bgElement),

	    charaElement = '#sldr-chara',
	    chara = $(charaElement),
	    charaMoveTop = 15, charaMoveLeft = 35, charaMoveSpeed = 300, charaTiming = 100,

	    logoElement = '#sldr-logo',
	    logo = $(logoElement),
	    logoMoveBottom = 0, logoMoveRight = -25, logoMoveSpeed = 200, logoTiming = 150,

	    thumbElement = '#sldr-thumb',
	    thumb = $(thumbElement),
	    thumbMove = 214, thumbLength,

	    hideTop = $('#sldr-header-bottom'),
	    hideBottom = $('#sldr-hide'),
	    noise = $('#sldr-noise'),
	    windowWidth = $(window).width(),
	    nextDatano, currentDatano, currentLeft, currentThumbIndex, nextThumbIndex;
		$('#prev-btn, #next-btn').show();


//----------------------------------------
//		ランダム配置
//----------------------------------------
		var ranArr = [];
		var visualInsert = '',
		    spVisualInsert = '',
		    bgInsert = '',
		    charaInsert = '',
		    logoInsert = '',
		    thumbInsert = '';
		for(var i = 0; i < visualLength; i++) {
			ranArr[i] = i + 1;
		}
		var shufflearr = [];
		var randomIndex;
		for(var i = 0; i < visualLength; i++) {
			if(i == 0){
			
			shufflearr[i] = 1;
			
			}else if(i == 1){
			
			shufflearr[i] = 2;

			}else{
			
			randomIndex = Math.floor(Math.random() * ranArr.length);
			shufflearr[i] = ranArr[randomIndex];
			}
			
			console.log(shufflearr[i]);
			
			ranArr.splice(randomIndex, 1);
			
			visualInsert += '<li>' + visual.find('li:eq(' + (shufflearr[i] - 1) + ')').html() + '</li>',
			spVisualInsert += '<li>' + spVisual.find('li:eq(' + (shufflearr[i] - 1) + ')').html() + '</li>',
			bgInsert += '<li>' + bg.find('li:eq(' + (shufflearr[i] - 1) + ')').html() + '</li>',
			charaInsert += '<li>' + chara.find('li:eq(' + (shufflearr[i] - 1) + ')').html() + '</li>',
			logoInsert += '<li>' + logo.find('li:eq(' + (shufflearr[i] - 1) + ')').html() + '</li>',
			thumbInsert += '<li>' + thumb.find('li:eq(' + (shufflearr[i] - 1) + ')').html() + '</li>';
		}
		visual.find('ul').html(visualInsert);
		spVisual.find('ul').html(spVisualInsert);
		bg.find('ul').html(bgInsert);
		chara.find('ul').html(charaInsert);
		logo.find('ul').html(logoInsert);
		thumb.find('ul').html(thumbInsert);

//----------------------------------------
//		初期設定
//----------------------------------------
	// thumbを複製(ループ用)
	var thumbInner = thumb.find('ul');
	thumbInner.children('li').each(function(i) {
		$(this).attr('data-no', i)
	});
	thumbInner.children('li').clone().appendTo(thumbInner).clone().appendTo(thumbInner);
	// thumbの個数を取得
	thumbLength = thumb.find('li').length;
	// thumbの先頭にclassを付与（現在地判別用）
	thumb.find('li:eq(0)').addClass('selected');
	// current追加
	thumb.append('<div class="current"></div>');
	// visualの無いliにclassを付与(ジャック)
	visual.find('li').each(function(i) {
		if(!($(this).find('img').length)) {
			$(this).addClass('none');
			bg.find('li').eq(i).wrapInner('<a href="' + thumb.find('li').eq(i).find('a').attr('href') + '"></a>');
		}
	});
	spVisual.find('li').css('position', 'absolute');

	// デバイスの判別
	function displaySize() {
		if($('#sldr-hide').is(':visible')) {
			sldr.removeClass('sp').addClass('pc');
		} else {
			sldr.removeClass('pc').addClass('sp');
		}
	}

	// sp時のvisualの高さの調整
	function spVisualSize(currentDatano) {
		if(sldr.hasClass('sp')) {
			var imgHeight = 0;
			spVisual.find('li').each(function() {
				// hide状態だと高さを取れないので、一時的にshow状態にする
				$(this).show();
				imgHeight = Math.max(imgHeight, $(this).find('img').height());
				$(this).hide();
			});
			spVisual.find('li').eq(currentDatano).show();
			spVisual.find('ul').css({
				height: imgHeight
			})
		}
	}

	// デバイス毎の設定
	function setting(currentDatano) {
		// PCの設定
		if(sldr.hasClass('pc')) {
			// 要素の表示
			bg.find('li').hide();
			bg.find('li').eq(currentDatano).show();
			visual.find('li').hide();
			visual.find('li').eq(currentDatano).show().find('p').show();
			chara.find('li').hide();
			chara.find('li').eq(currentDatano).show();
			logo.find('li').hide();
			logo.find('li').eq(currentDatano).show();

			// 要素の設定
			if(parseFloat($('.current').css('left')) <= 0) {
				thumb.find('ul').css({
					width: visualLength * thumbMove * 3,
					left: - currentDatano * thumbMove
				}).children('li').show();
			}


		// SPの設定
		} else {
			spVisual.find('li').hide();
			spVisual.find('li').eq(currentDatano).show();
			$('.current').css('left', 0);
			thumb.find('ul').css('left', 0);
			thumb.find('li').removeClass('selected');
			thumb.find('li').eq(currentDatano).addClass('selected');
			for (var i = visualLength; i < visualLength * 3; i++) {
				thumb.find('ul').children('li').eq(i).hide();
			};
			thumb.find('ul').css({
				width: '100%'
			});
		}
	}

	// pc時のスライダーの切り替え
	function pcSldr(currentDatano, nextDatano, nextThumbIndex) {

		// thumbの選択変更
		thumb.find('li').removeClass('selected');
		thumb.find('li').eq(nextThumbIndex).addClass('selected');

		// テキスト表示の準備
		visual.find('li').eq(nextDatano).find('.summary').children('p').hide();

		// 要素の非表示
		logo.find('li').eq(currentDatano).fadeOut();
		chara.find('li').eq(currentDatano).fadeOut();
		visual.find('li').eq(currentDatano).fadeOut();
		bg.find('li').eq(currentDatano).fadeOut();

		// 要素の表示
		logo.find('li').eq(nextDatano).fadeIn();
		chara.find('li').eq(nextDatano).fadeIn();
		visual.find('li').eq(nextDatano).fadeIn();
		bg.find('li').eq(nextDatano).fadeIn(function() {
			// テキストの表示
			visual.find('li').eq(nextDatano).find('.summary').children('p').fadeIn(300).shuffleLetters();
			sldr.removeClass('moving');
		});
	}

	// sp時のスライダーの切り替え
	function spSldr(currentDatano, nextDatano) {
		thumb.find('li').removeClass('selected');
		thumb.find('li').eq(nextDatano).addClass('selected');
		spVisual.find('li').eq(currentDatano).fadeOut(200);
		spVisual.find('li').eq(nextDatano).fadeIn(200);
		sldr.removeClass('moving');
	}

	// PC時のthumbの切り替え
	function thumbMovement(direction, currentDatano, nextDatano, nextThumbIndex) {
		thumb.find('ul').animate({
			left: parseFloat(thumb.find('ul').css('left')) - (thumbMove * 4 * direction)
		}, 1000);
		$('#sldr-category').animate({
			opacity: 1
		}, 700, function() {
			pcSldr(currentDatano, nextDatano, nextThumbIndex);
		})
	}

	// ノイズの幅調整
	function noiseWidth() {
	    windowWidth = $(window).width();
	    noise.css({
	    	width: windowWidth,
	    	left: - (windowWidth - 1000) / 2
	    })
	}


//----------------------------------------
//		ページ内読み込み後の処理
//----------------------------------------
	$(window).on('load', function() {

		// 現在のインデックス番号
		currentDatano = parseFloat(thumb.find('li.selected').attr('data-no'));
		displaySize();
		spVisualSize(currentDatano);
		setting(currentDatano);
		noiseWidth();


		if(navigator.userAgent.indexOf("MSIE") != -1) {
			$('img').each(function() {
				if($(this).attr('src').indexOf('.png') != -1) {
					$(this).css({
						'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $(this).attr('src') + '", sizingMethod="scale");'
					});
				}
			});
		}


//----------------------------------------
//		next-btnクリック時の処理
//----------------------------------------
		$('#next-btn a').on('click', function() {
			if(!(sldr.hasClass('moving'))) {
				sldr.addClass('moving');

				currentDatano = parseFloat(thumb.find('li.selected').attr('data-no'));

				if(sldr.hasClass('pc')) {

					// thumbの右端が残り4つ以下のとき
					currentLeft = Math.abs(parseFloat(thumb.find('ul').css('left')) / thumbMove);
					if(currentLeft + 8 >= thumbLength) {
						thumb.find('ul').css({
							left: - thumbMove * thumb.find('li').eq(currentLeft).attr('data-no')
						});
						thumb.find('li').removeClass('selected');
						thumb.find('li').eq(currentDatano).addClass('selected');
						currentLeft = Math.abs(parseFloat(thumb.find('ul').css('left')) / thumbMove);
					}
					currentThumbIndex = thumb.find('li.selected').index();
					nextThumbIndex = thumb.find('li').eq(currentLeft + 4).index();
					nextDatano = thumb.find('li').eq(nextThumbIndex).attr('data-no');

					$('.current').animate({
						left: 0
					}, 500);
					thumbMovement(1, currentDatano, nextDatano, nextThumbIndex);
				} else {
					if(!(currentDatano >= visualLength - 1)) {
						nextDatano = currentDatano + 1;
					} else {
						nextDatano = 0;
					}
					spSldr(currentDatano, nextDatano);
				}
				clearInterval(timerID);
				timerID = setInterval(function() {
					autoSlide();
				}, 7000);
			}
			return false;
		});


//----------------------------------------
//		prev-btnクリック時の処理
//----------------------------------------
		$('#prev-btn a').on('click', function() {
			if(!(sldr.hasClass('moving'))) {
				sldr.addClass('moving');

				currentDatano = parseFloat(thumb.find('li.selected').attr('data-no'));

				if(sldr.hasClass('pc')) {
					currentLeft = Math.abs(parseFloat(thumb.find('ul').css('left')) / thumbMove);
					currentThumbIndex = thumb.find('li.selected').index();

					// thumbの左端が残り4つ以下のとき
					if(currentLeft < 4) {
						currentThumbIndex = (thumbLength - (visualLength * 2) + parseFloat(thumb.find('li').eq(currentLeft).attr('data-no')));
						thumb.find('ul').css({
							left: - thumbMove * currentThumbIndex
						});
						thumb.find('li').removeClass('selected');
						thumb.find('li').eq(currentThumbIndex).addClass('selected');
						currentLeft = Math.abs(parseFloat(thumb.find('ul').css('left')) / thumbMove);
					}
					nextThumbIndex = thumb.find('li').eq(currentLeft - 1).index();
					nextDatano = thumb.find('li').eq(nextThumbIndex).attr('data-no');

					$('.current').animate({
						left: thumbMove * 3
					}, 500);
					thumbMovement(-1, currentDatano, nextDatano, nextThumbIndex);
				} else {
					if(!(currentDatano <= 0)) {
						nextDatano = currentDatano - 1;
					} else {
						nextDatano = visualLength - 1;
					}
					spSldr(currentDatano, nextDatano);
				}
				clearInterval(timerID);
				timerID = setInterval(function() {
					autoSlide();
				}, 7000);
			}
			return false;
		});


//----------------------------------------
//		自動切り替えの処理
//----------------------------------------
		function autoSlide() {
			if(!(sldr.hasClass('moving'))) {
				sldr.addClass('moving');

				currentDatano = parseFloat(thumb.find('li.selected').attr('data-no'));
				currentThumbIndex = thumb.find('li.selected').index();
				if(currentDatano < visualLength - 1) {
					nextDatano = currentDatano + 1;
				} else {
					nextDatano = 0;
				}
				nextThumbIndex = currentThumbIndex + 1;

				if(sldr.hasClass('pc')) {

					currentLeft = Math.abs(parseFloat(thumb.find('ul').css('left')) / thumbMove);

					// 通常の移動
					if(parseFloat($('.current').css('left')) < thumbMove * 3) {
						$('.current').animate({
							left: (nextThumbIndex - currentLeft) * thumbMove
						}, 500);
						$('#sldr-category').animate({
							opacity: 1
						}, 200, function() {
							pcSldr(currentDatano, nextDatano, nextThumbIndex);
						})
					// thumb4つ移動
					} else {
						// thumbの右端が残り4つ以下のとき
						currentLeft = Math.abs(parseFloat(thumb.find('ul').css('left')) / thumbMove);
						if(currentLeft + 8 >= thumbLength) {
							thumb.find('ul').css({
								left: - thumbMove * thumb.find('li').eq(currentLeft).attr('data-no')
							});
							thumb.find('li').removeClass('selected');
							thumb.find('li').eq(currentDatano).addClass('selected');
							currentLeft = Math.abs(parseFloat(thumb.find('ul').css('left')) / thumbMove);
						}
						currentThumbIndex = thumb.find('li.selected').index();
						nextThumbIndex = thumb.find('li').eq(currentLeft + 4).index();
						nextDatano = thumb.find('li').eq(nextThumbIndex).attr('data-no');

						$('.current').animate({
							left: 0
						}, 500);
						thumbMovement(1, currentDatano, nextDatano, nextThumbIndex);
					}
				} else {
					if(!(currentDatano >= visualLength - 1)) {
						nextDatano = currentDatano + 1;
					} else {
						nextDatano = 0;
					}
					spSldr(currentDatano, nextDatano);
				}
			}
		}

		var timerID = setInterval(function() {
			autoSlide();
		}, 7000);


//----------------------------------------
//		thumbクリック時の処理
//----------------------------------------
		thumb.find('a').on('click', function() {
			if(!(sldr.hasClass('moving'))) {
				if(!($(this).parent('li').index() == thumb.find('li.selected').index())) {
					sldr.addClass('moving');

					currentDatano = parseFloat(thumb.find('li.selected').attr('data-no'));
					currentThumbIndex = thumb.find('li.selected').index();
					// nextDatano = $(this).parent('li').attr('data-no') - 1;
					nextDatano = $(this).parent('li').attr('data-no');
					nextThumbIndex = $(this).parent('li').index();
					if(sldr.hasClass('pc')) {
						currentLeft = Math.abs(parseFloat(thumb.find('ul').css('left')) / thumbMove);
						$('.current').animate({
							left: (nextThumbIndex - currentLeft) * thumbMove
						}, 500);
						$('#sldr-category').animate({
							opacity: 1
						}, 200, function() {
							pcSldr(currentDatano, nextDatano, nextThumbIndex);
						})
					} else {
						spSldr(currentDatano, nextDatano);
					}
				} else {
					var currentUrl = $(this).attr('href');
					location.href = currentUrl;
				}
				clearInterval(timerID);
				timerID = setInterval(function() {
					autoSlide();
				}, 7000);
			}
			return false;
		});


//----------------------------------------
//		currentクリック時の処理
//----------------------------------------
		$('.current').on('click', function() {
			var currentUrl = thumb.find('li.selected a').attr('href');
			location.href = currentUrl;
		});


//----------------------------------------
//		画面サイズ変更時の処理
//----------------------------------------
		var timer = null;
		$(window).on('resize',function() {
			clearTimeout(timer);
			timer = setTimeout(function() {
				// 現在のインデックス番号
				currentDatano = parseFloat(thumb.find('li.selected').attr('data-no'));
				displaySize();
				spVisualSize(currentDatano);
				setting(currentDatano);
				noiseWidth();

				// フッターのバナーリスト用
				bnrSetting();
			}, 300 );
		});
	});


//----------------------------------------
//		ページ下部のカルーセル
//----------------------------------------
	var bnrAreaEle = '#bnr-area';
	var bnrArea = $(bnrAreaEle);
	var bnrListEle = '#bnr-list';
	var bnrList = $(bnrListEle);
	var bnrLength = bnrList.find('li').length;
	var bnrMove = 240, movePoint;

	bnrList.children('li').each(function(i) {
		$(this).attr('data-no', i)
	});

	bnrList.wrapAll('<div id="bnr-list-inner"></div>');

	bnrList.children('li').clone().appendTo(bnrList).clone().appendTo(bnrList);
	// control追加
	bnrArea.append('<div class="control"><a href="" class="bnr-prev"></a><a href="" class="bnr-next"></a></div>');

	// 個数取得
	cloneLength = bnrList.children('li').length;
	bnrList.css({
		width: cloneLength * bnrMove
	})

	function bnrMovement(direction, movePoint, speed) {
		bnrList.animate({
			left: parseFloat(bnrList.css('left')) - (movePoint * direction)
		}, speed, function() {
			bnrArea.removeClass('moving');
		});
	}

	function bnrSetting() {
		if(sldr.hasClass('pc')) {
			if(bnrLength <= 4) {
				$('.bnr-prev, .bnr-next').hide();
				bnrList.children('li').hide();
				for (var i = 0; i < bnrLength; i++) {
					bnrList.children('li').eq(i).show();
				};
				bnrList.css('left', 0);
			}
		} else {
			$('.bnr-prev, .bnr-next').show();
			bnrList.children('li').show();
		}
	}



	$(window).on('load', function() {
		bnrSetting();
//----------------------------------------
//		bnr-nextクリック時の処理
//----------------------------------------
		$('.bnr-next').on('click', function() {
			if(!(bnrArea.hasClass('moving'))) {
				bnrArea.addClass('moving');

				bnrCurrent = parseFloat(bnrList.children('li.current').attr('data-no'));

				// 右端が残り4つ以下のとき
				bnrPosLeft = Math.abs(parseFloat(bnrList.css('left')) / bnrMove);
				if(bnrPosLeft + 8 >= cloneLength) {
					bnrList.css({
						left: - bnrMove * bnrList.children('li').eq(bnrPosLeft).attr('data-no')
					});
					bnrList.children('li').removeClass('current');
					bnrList.children('li').eq(bnrCurrent).addClass('current');
					bnrPosLeft = Math.abs(parseFloat(bnrList.css('left')) / bnrMove);
				}

				if(sldr.hasClass('pc')) {
					movePoint = bnrMove * 4;
					bnrMovement(1, movePoint, 1000);
				} else {
					movePoint = bnrMove;
					bnrMovement(1, movePoint, 500);
				}
				clearInterval(timerID2);
				timerID2 = setInterval(function() {
					if($('.bnr-next').is(':visible')) {
						$('.bnr-next').click();
					}
				}, 7000);
			}
			return false;
		});


//----------------------------------------
//		bnr-prevクリック時の処理
//----------------------------------------
		$('.bnr-prev').on('click', function() {
			if(!(bnrArea.hasClass('moving'))) {
				bnrArea.addClass('moving');

				bnrCurrent = parseFloat(bnrList.children('li.current').attr('data-no'));
				// 左端が残り4つ以下のとき
				bnrPosLeft = Math.abs(parseFloat(bnrList.css('left')) / bnrMove);
				if(bnrPosLeft < 4) {
					bnrList.css({
						left: - bnrMove * (bnrLength * 2 + bnrPosLeft)
					});
					bnrPosLeft = Math.abs(parseFloat(bnrList.css('left')) / bnrMove);
				}

				if(sldr.hasClass('pc')) {
					movePoint = bnrMove * 4;
					bnrMovement(-1, movePoint, 1000);
				} else {
					movePoint = bnrMove;
					bnrMovement(-1, movePoint, 500);
				}
				clearInterval(timerID2);
				timerID2 = setInterval(function() {
					if($('.bnr-next').is(':visible')) {
						$('.bnr-next').click();
					}
				}, 7000);
			}
			return false;
		});


//----------------------------------------
//		自動切り替えの処理
//----------------------------------------
		var timerID2 = setInterval(function() {
			if($('.bnr-next').is(':visible')) {
				$('.bnr-next').click();
			}
		}, 7000);
	});


//----------------------------------------
//		xml取得
//----------------------------------------
    var wid = $(window).width();
    
	$.ajax({
		url: './rss/news.xml',
		dataType: 'xml',
		cache: false,
		success: function(data) {
			var newsInsert = '';
			var viewLength = Math.min(15, $('item' ,data).length)
			for (var i = 0; i < viewLength; i++) {
				// 日付の生成
				dateMake = date = '';
				dateMake = $('item' ,data).eq(i).children('pubDate').text().split('-');
				date += dateMake[0] + '.';
				date += dateMake[1] + '.';
				date += dateMake[2].slice(0, 2);

				// カテゴリ取得
				categoryType = $('item' ,data).eq(i).children('category').text();
				categoryID = $('item' ,data).eq(i).children('categoryID').text();

				newsInsert += '<dt>';
				newsInsert += date;
				newsInsert += '<span class="cat ' + categoryID + '">';
				newsInsert += categoryType;
				newsInsert += '</span></dt>';
				newsInsert += '<dd>';
				newsInsert += '<p><a href="' + $('item' ,data).eq(i).children('link').text() + '">';
				newsInsert += $('item' ,data).eq(i).children('title').text();
				newsInsert += '</a></p>';
				newsInsert += '<p>';
				newsInsert += $('item' ,data).eq(i).children('description').text();
				newsInsert += '</p>';
				newsInsert += '</dd>';
			};
			$('#news').prepend(newsInsert);
            if(wid >= 640){
                $('#content_news').tinyscrollbar({size : 450});
            }
		}
	});
	
	$.ajax({
		url: './rss/news02.xml',
		dataType: 'xml',
		cache: false,
		success: function(data) {
			var gameInsert = '';
			var viewLength = Math.min(15, $('item' ,data).length)
			for (var i = 0; i < viewLength; i++) {
				// 日付の生成
				dateMake = date = '';
				dateMake = $('item' ,data).eq(i).children('pubDate').text().split('-');
				date += dateMake[0] + '.';
				date += dateMake[1] + '.';
				date += dateMake[2].slice(0, 2);

				// カテゴリ取得
				categoryType = $('item' ,data).eq(i).children('category').text();
				categoryID = $('item' ,data).eq(i).children('categoryID').text();

				gameInsert += '<dt>';
				gameInsert += date;
				gameInsert += '<span class="cat ' + categoryID + '">';
				gameInsert += categoryType;
				gameInsert += '</span></dt>';
				gameInsert += '<dd>';
				gameInsert += '<p><a href="' + $('item' ,data).eq(i).children('link').text() + '">';
				gameInsert += $('item' ,data).eq(i).children('title').text();
				gameInsert += '</a></p>';
				gameInsert += '<p>';
				gameInsert += $('item' ,data).eq(i).children('description').text();
				gameInsert += '</p>';
				gameInsert += '</dd>';
			};
			$('#game').prepend(gameInsert);
            if(wid >= 640){
                $('#content_game').tinyscrollbar({size : 450});
            }
            $("#content_game").addClass('disnon');
		}
	});

	$.ajax({
		url: './rss/news03.xml',
		dataType: 'xml',
		cache: false,
		success: function(data) {
			var managementInsert = '';
			var viewLength = Math.min(15, $('item' ,data).length)
			for (var i = 0; i < viewLength; i++) {
				// 日付の生成
				dateMake = date = '';
				dateMake = $('item' ,data).eq(i).children('pubDate').text().split('-');
				date += dateMake[0] + '.';
				date += dateMake[1] + '.';
				date += dateMake[2].slice(0, 2);

				// カテゴリ取得
				categoryType = $('item' ,data).eq(i).children('category').text();
				categoryID = $('item' ,data).eq(i).children('categoryID').text();

				managementInsert += '<dt>';
				managementInsert += date;
				managementInsert += '<span class="cat ' + categoryID + '">';
				managementInsert += categoryType;
				managementInsert += '</span></dt>';
				managementInsert += '<dd>';
				managementInsert += '<p><a href="' + $('item' ,data).eq(i).children('link').text() + '">';
				managementInsert += $('item' ,data).eq(i).children('title').text();
				managementInsert += '</a></p>';
				managementInsert += '<p>';
				managementInsert += $('item' ,data).eq(i).children('description').text();
				managementInsert += '</p>';
				managementInsert += '</dd>';
			};
			$('#management').prepend(managementInsert);
            if(wid >= 640){
                $('#content_management').tinyscrollbar({size : 450});
            }
            $("#content_management").addClass('disnon');
		}
	});
});

// scrollbar
$(window).resize(function() {
    var wid = $(window).width();

    if(wid < 640) {
        if(typeof $('#content_news').data("tsb") !== "undefined" ||
            typeof $('#content_game').data("tsb") !== "undefined" ||
            typeof $('#content_management').data("tsb") !== "undefined"
        ) {
            window.location.reload(true);
            return false;
        }
    } else {
            $('#content_news').tinyscrollbar({size : 450});
            $('#content_game').tinyscrollbar({size : 450});
            $('#content_management').tinyscrollbar({size : 450});
    }
});

