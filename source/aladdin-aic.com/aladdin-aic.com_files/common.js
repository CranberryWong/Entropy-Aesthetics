if(location.hostname == 'localhost') ;

var $document, $window,$body;

var $intro, $intro_logo, isIntro=false; 
var $loadPanel;

var videoList,  video_param, $frameImages;

var $siteFooter;
var $siteHeader
var $siteNavi,$siteNaviBtn;



var winW,winH

var resizeTimer = null;
var isPC = false;
var isMobile = false;

var ua; //user agentによるua.isPCチェックを行える

var mousewheelevent;

/*
$(document).ready(function()
{
  //$("img.lazy").lazyload({effect : "fadeIn"});
});
*/

$(function()
{
  $document = $(document);
  $window  = $(window);
  $body = $(document.body)
  
  $siteFooter  = $('#site-footer');
  $siteHeader = $('#site-header');
  $siteNavi = $('#navi-container');
  $siteNaviBtn = $('#navi-btn');
  

  
  $loadPanel  = $('#loadPanel');
  
  mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

  $intro= $('#introPanel');
  
  ua = checkOS();
  
  initEvent();
  initCommonItems();
  initSiteNavi();
  checkTerminal();
  initPage();
  $window.trigger('resize');
})





/* #事前に仕込む共通イベント
---------------------------------------------------------------------*/
function initEvent()
{
  //電話番号処理
  if (isPC) {
    $('a[href^="tel:"]').replaceWith(function() {
      $(this).replaceWith("<span>"+$(this).text()+"</span>")
    });
  }
  
  resizeHandler_checkMobile();
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      resizeHandler_checkMobile();
    }, 200);
  });
  
  var headroom_option = {
    "offset": 300,
    "tolerance": 5,
    "classes": {
      "initial": "animated",
      "pinned": "slideDown",
      "unpinned": "slideUp"
    }
  }
  
  var _header = document.getElementById('site-header');
  var headroom = new Headroom(_header, headroom_option);
  headroom.init();
      
      
  // # PC / SPチェック
  function resizeHandler_checkMobile() {
    if($window.innerWidth() <= 639) {
      $body.removeClass('pc').addClass('sp');
      isMobile = true;
      isPC = false;
      //$siteNavi.css({opacity:0, display:'none'});
    }
    else {
      $body.removeClass('sp').addClass('pc');
      isMobile = false;
      isPC = true;
      //$siteNavi.css({opacity:1, display:'block'});
    }
  }
  
  //#site-headerのスクロールによる表示調整
  //if(ua.isPC) {
/*
  if(1) {
    var coverH = $('#maincover').height();
    
    $window.scroll(function()
    {
      var $_t = $(this);
      if ($_t.scrollTop() > coverH)
      {
        $siteHeader.removeClass('_white');
        //$siteHeader.removeClass('_hide');
      }
      else
      {
        $siteHeader.addClass('_white');
        //$siteHeader.removeClass('_hide');
      }
    });
    $window.trigger('scroll');
  }
*/
}



/* 特集から記事を呼び出す
---------------------------------------------------------------------*/
function openArticle() {
  
}




/* #siteHeaderの初期化
---------------------------------------------------------------------*/
var is_submenu = false;
function initSiteNavi()
{
  // # SP用ナビボタン
	$('a#navi-btn').on('click',function(ev)
	{
		ev.preventDefault();
		if(!$body.hasClass('open-nav')) 
		{
			$body.removeClass('hide-nav').addClass('open-nav');
			$(this).addClass('active');
			//no_scroll();
		}
		else
		{
			$body.removeClass('open-nav').addClass('hide-nav');
			$(this).removeClass('active');
			//return_scroll();
		}
	});
	
	if($body.hasClass('tax-kurashi')) {
    // # SP用ナビボタン
    	$('a#menu-btn').on('click',function(ev)
    	{
    		ev.preventDefault();
    		if(!$body.hasClass('open-menu')) 
    		{
    			$body.removeClass('hide-menu').addClass('open-menu');
    			$(this).addClass('active');
    			//no_scroll();
    		}
    		else
    		{
    			$body.removeClass('open-menu').addClass('hide-menu');
    			$(this).removeClass('active');
    			//return_scroll();
    		}
    	});
	}
  
  $('#globalnavi li.products, #globalnavi li.magazine').hover(function(ev) {
    console.log($(this).attr('class'))
    if($window.innerWidth() > 1000) {
      $siteHeader.addClass('open-submenu');
      $('.submenu', $(this)).addClass('_open');
      is_submenu = true;
      if($(this).attr('class') == 'products') $siteHeader.addClass('_products');
      else if($(this).attr('class') == 'magazine') $siteHeader.addClass('_magazine');
    }
  },
  function(ev) {
    if($window.innerWidth() > 1000) {
      $('.submenu', $(this)).removeClass('_open');
      is_submenu = false;
      $siteHeader.removeClass('open-submenu')
                      .removeClass('_products')
                      .removeClass('_magazine');
      setTimeout(function() {
        if(!is_submenu) {
          $siteHeader.removeClass('open-submenu');
        }
      }, 300);
    }
  });
}


/* イントロ 初期化 / close
---------------------------------------------------------------------*/
function closeIntro()
{
  $intro.delay(200).velocity({opacity: 0}, {duration:500, easing:[.54,.36,.48,.94], complete:function(){$intro.remove();}});
}

function initIntro()
{
  var _intro_ease3 = [.09,.22,.44,.86];
  var _intro_ease2 = [.51,.08,.38,.96];
  var _intro_ease1 = [.65,.22,.4,1];
  
  $intro_logo.show().velocity({scale:1.4, opacity:0},0)
    .delay(300)
    .velocity({scale:1, opacity:1},{duration:630, easing: _intro_ease3})
    .velocity({scale:.9},{duration:1400, easing: [.27,.21,.39,.69]})
    .velocity({scale:.8, opacity:0},{duration:400, easing: _intro_ease1, complete:closeIntro})
  
  if(!$.cookie('visited'))
  {
    // cookieセット
    var date = new Date();
    date.setTime(date.getTime() + (6*60*60*1000));
    $.cookie('visited','1', {expires:date, path: '/'});
  }
  else $intro.remove();
}


/*　画像のプリロード
  * imgSrcs @array
---------------------------------------------------------------------*/
function preloadImages(imgSrcs)
{ 
  var loader = new $.ImgLoader({
    srcs : imgSrcs,
    pipesize: 3,
    delay: 100,
    timeout: 500,
    useXHR2: false
  });
   
   var $indi_line = $('#indicator-line');
   
  loader.on('progress', function(progress){
      var prog = progress.loadedRatio; //進捗率を取得
      $indi_line.css({width: (String(prog * 100)+'%')});
  });
   
  loader.on('itemload', function($img){
      //console.log($img);
  });
   
  loader.on('allload', function($img)
  {
    var _delay = 250;
    $('#logo-indicator').delay(_delay).fadeOut(200);
    $indi_line.delay(_delay).fadeOut(200);
    $('#bg-indicator').delay(_delay+100).velocity({opacity: 0},{
      duration: 400, easing: [.35,.04,1,.24],
      begin: function() {
        return_scroll()
        openSite_begin();
      },
      complete: function() {
        openSite_complete();
        $loadPanel.remove();
      }
    });
  });
  loader.load();  //ローディングを実行
}




function openSite_begin()
{  
  $('.column>li').matchHeight();
  $('.mdl_column-box').matchHeight();
  $('._mh').matchHeight();
  initResponsiveImage();
  
  if($('#important_field').length) {
    var $imp_slick = $('#important_field .slick-container').slick(
    {
      infinite: true,
      slidesToShow: 1, slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: false,
      adaptiveHeight: false,
      arrows: false, dots: false,
      fade:true,
      speed: 600,
      cssEase: 'ease',
      lazyLoad: 'ondemand'
    });
  }
  
  if($body.hasClass('home'))
  {
    initHome();
  }
  else if($body.hasClass('about'))
  {
    initGmap();
  }
  else if($body.hasClass('single-product'))
  {
    initProduct();
    if(isMobile) $('#feature ._right .text').before($('#feature ._right figure'));
    responsive(0, 639, function(changed) {
      if(!changed) return;
      $('#feature ._right .text').before($('#feature ._right figure'));
    });
    responsive(640, null, function(changed){
      if(!changed) return;
      $('#feature ._right .text').after($('#feature ._right figure'));
    });
  }
  else if($body.hasClass('faq'))
  {
    initAccordion();
    
    var $faqItems = $('#faq_items');
    $('a.open_all').on('click', function(ev) {
      ev.preventDefault();
      $('.mod_accordion:not(._open-accordion) .mod_accordion-title>a', $faqItems).trigger('click');
    });
    $('a.close_all').on('click', function(ev) {
      ev.preventDefault();
      $('.mod_accordion._open-accordion .mod_accordion-title>a', $faqItems).trigger('click');
    });
    
    /*
    var $faq_ctrl = $(' .slick-ctrl');
    var $faq_slick = $('#faq_items.slick-container').slick(
    {
      infinite: true,
      slidesToShow: 1, slidesToScroll: 1,
      autoplay: false,
      //autoplaySpeed: 4000,
      pauseOnHover: false,
      adaptiveHeight: true,
      arrows: false, dots: true,
      dotsClass: 'slick-dots _maru',
      fade:false,
      speed: 200,
      //easing: 'easeInOutCubic',
      cssEase: 'ease',
      lazyLoad: 'ondemand'
    });
    
    $('.navi-cat').each(function(index, nav) {
      $('ul li', $(nav)).each(function(idx, li) {
        $('a', $(li)).on('click', function(ev) {
          ev.preventDefault();
          $faq_slick.slick('slickGoTo', $(this).data('index'));
        })
      })
    });
    */
  }
  else if($body.hasClass('single-news'))
  {
    initHeadimageBlur();
    $window.on('scroll', checkScrollTop_news);
    $window.trigger('scroll');
  }
  else if($body.hasClass('check-form'))
  {
    var $partsWG = $('#partslist_wg');
    var $partsK = $('#partslist_k');
    var exchange_mode = '';
    
    $('.tableset>li').matchHeight(); //表の高さ調整
    
    var $sv = $('input#send-value'); //type=hidden
    var wpcf7Elm = document.querySelector( '.wpcf7' );
    wpcf7Elm.addEventListener( 'wpcf7mailsent', function( event ) {
      //alert( "Fire!" );
    }, false );
    
    
    
    //交換希望の申し込みチェック〜パーツ用テーブルの表示
    $('tr.exchange input[type=radio]').on('change', function(ev) {
      if($(this).closest('.wpcf7-list-item').hasClass('first')) {
        //非表示 + リセット
        $partsWG.hide();
        $partsK.hide();
      }
      else if($(this).closest('.wpcf7-list-item').hasClass('last')) {
        //黒色（B）
        exchange_mode = 'K';
        displayTotalPrice($partsK);
        $partsK.show();
        $partsWG.hide();
      }
      else {
        //白 or 緑（W+G）
        exchange_mode = 'WG';
        displayTotalPrice($partsWG);
        $partsWG.show();
        $partsK.hide();
      }
    });
    // 初期は非表示
    $partsWG.hide(); $partsK.hide();
    
    
    // [## 送信直前にinput[hidden]にパーツの情報を格納する ##]
    $('input.wpcf7-submit').on('click', function(ev) {
      var selectData = ''; $_frame = null;
      if(exchange_mode == 'K') {
        $_frame = $partsK;
        selectData = '＜ブルーフレーム [黒色]＞\n';
      }
      else if(exchange_mode == 'WG') {
        $_frame = $partsWG;
        selectData = '＜ブルーフレーム [白色][緑色]＞\n';
      }
      else return;
      
      var _maxIndex = $('ol.tableset>li', $_frame).length - 1;
      $('ol.tableset>li', $_frame).each(function(index, li) {
        var $li = $(li);
        var _num = $('select', $li).val();
        if(_num>0) {
          var _price = $('.price', $li).text();
          var _priceNum = Number(_price.replace(/,/g, ''));
          selectData += $('.title', $li).text() + ' : ' + _num + '個 … '+ setCommma(_priceNum*_num) +'円 ('+_price+' x'+_num +')\n';
        }
        
        if(index >= _maxIndex) $sv.val(selectData);
      });
    });
    
    
    // 任意のパーツの個数の変更→値段変更
    $('select', $partsK).each(function(index, select) {
      $(select).on('change', function(ev){displayTotalPrice($partsK);});
    });
    $('select', $partsWG).each(function(index, select) {
      $(select).on('change', function(ev){displayTotalPrice($partsWG);});
    });
    
    function displayTotalPrice($_frame) {
      $display_price = $('.meta .price .num', $_frame);
      var _maxIndex = $('ol.tableset>li', $_frame).length - 1;
      var _total = 8850; //基本金額
      $('ol.tableset>li', $_frame).each(function(index, li) {
        var $li = $(li);
        var _num = $('select', $li).val();
        if(_num>0) {
          var _price = $('.price', $li).text();
          var _priceNum = Number(_price.replace(/,/g, ''));
          _total += _priceNum*_num;
        }
        if(index >= _maxIndex) {
          $display_price.html(setCommma(_total));
        }
      });
      
    }
  }
  else if($body.hasClass('xxx'))
  {
    
  }
  setTimeout(function() {$window.trigger('resize');},100);
}

function openSite_complete()
{
  if($body.hasClass('home'))
  {
  }
  
  setTimeout(function() {$window.trigger('resize');},100);
}



function checkScrollTop() {
  if($window.scrollTop() > winH) {
    $siteHeader.removeClass('_white');
  }
  else {
    $siteHeader.addClass('_white');
  }
}
function checkScrollTop_news() {
  var _h = 480;
  if(isMobile) {
    _h = 300;
    $siteHeader.removeClass('_trans');
  }
  else {
    if($window.scrollTop() > _h) {
      $siteHeader.removeClass('_trans');
    }
    else {
      $siteHeader.addClass('_trans');
    } 
  }
}


/* 各ページごとの初期設定
---------------------------------------------------------------------*/
function initPage()
{
  var imgSrcs = [];

  var $preload = $('img:not(.unpreload)');
  
  setWindowSize_by_resize();
  if($body.hasClass('home'))
  {
    checkScrollTop();
    $window.on('scroll', checkScrollTop);
  }
  if($body.hasClass('about')) {
    $('section').each(function(index, s)
    {
      //var _animImg = $(s).data('src-anim');
      //imgSrcs.push(_animImg);
      //imgSrcs.push(_animImg.match(/https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:@&=+$,%#]+[a-z]/g)[0]);
    });
  }
  if($body.hasClass('category_home'))
  {
    var $mainArea = $('#main-area');
    var $mainArea_inner = $('#main-area .content-frame');
    
    $(window).on('resize', function() {
      var $_innerH = $('#main-area .content-frame .inner').outerHeight();
      var $_h = $window.height() - 155;
      //console.log($_h, $_innerH)
      
      if(!isMobile) {
        if($_h >= $_innerH) {
          $mainArea.height($_h);
          $mainArea_inner.height($_h);
        }
        else {
          $mainArea.css({height: 'auto'});
          $mainArea_inner.css({height: 'auto'});
        }
      }
      else {
        
      }
    });
  }
  else if($body.hasClass('tax-kurashi')) { //tax-junre
    var junreAry = ['living', 'childbirth', 'education', 'medical', 'work', 'facility'];
    var _len = junreAry;
    for(var n=0, _len = junreAry.length; n<_len; n++) {
      var _j = junreAry[n];
      if($body.hasClass('term-'+_j)) {
        $('#junre-navi li a.'+_j).addClass('_current').click(function(ev) {
          ev.preventDefault();
        });
        break; 
      }
    }
  }

  

  $preload.each(function()
  {
    imgSrcs.push($(this).attr('src'));
  });

  var $bgItems = $('.bg-preload');
  $bgItems.each(function()
  {
    var _bgimg = $(this).css('backgroundImage');
    imgSrcs.push(_bgimg.match(/https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:@&=+$,%#]+[a-z]/g)[0]);
  });
  
  preloadImages(imgSrcs);
}



function initMainVisual() {
  // [Main Visual]
  var $mv = $('#mainvisual');
  var _pdtAjust_pc = 0, _pdtAjust_sp = -winH;
  $window.on('resize', function() {
    var _pdtAjust = _pdtAjust_pc;
    $body.css({paddingTop:winH+_pdtAjust});
/*
    if(isMobile) {
      var _pdtAjust = _pdtAjust_sp;
      $body.css({paddingTop:0});
    }
    else {
      var _pdtAjust = _pdtAjust_pc;
      $body.css({paddingTop:winH+_pdtAjust});
    }
*/
    $mv.css({height:winH});
  });
}



/* 初期化 #Home
---------------------------------------------------------------------*/
function initHome()
{
  initMainVisual();
  
  //$('.parallax').parlx({});
  
  $('#sct-products .product-box').each(function(index, pb) {
    $pb = $(pb);
    var $_dots = $('.slick-ctrl .dots', $pb);
    $('.slick-container', $pb).slick(
    {
      fade: true,
      infinite: true,
      slidesToShow: 1, slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
      arrows: false, dots: true,
      dotsClass: 'slick-dots _line',
      appendDots: $_dots,
      speed: 2000,
      easing: 'easeOutQuart',
      lazyLoad: 'ondemand',
      responsive: [
        {
          breakpoint: 640,
          settings: {
            fade:false,
            autoplay: false
            //arrows: false, dots:true
          }
        }
      ]
    });
  });
  
  
  var $banner_slick = $('#banner-area .slick-container').slick(
  {
    fade: false,
    infinite: true,
    slidesToShow: 3, slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: false, dots: true,
    dotsClass: 'slick-dots _maru',
    speed: 450,
    easing: 'easeOutQuart',
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1, slidesToScroll: 1,
          arrows: false, dots:true
        }
      }
    ]
  });
  
  
  
  $('.scroll-button').on('click', function(ev) {
    ev.preventDefault();
    $('#sct-products').velocity('scroll',{offset: 0, duration: 500, easing: 'easeInOutCubic'});
  });
}


/* 初期化 #Product - single
---------------------------------------------------------------------*/
function initProduct()
{
  if($body.hasClass('_special')) {
    initMainVisual();
  }
  else {
    var $mainBasic = $('#main_basic');
    var $mb_slick = $('.slick-container', $mainBasic).slick(
    {
      infinite: true,
      slidesToShow: 1, slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 4000,
      arrows: false, dots: false,
      fade: true,
      speed: 400,
      easing: 'easeOutQuart',
      lazyLoad: 'ondemand',
      responsive: [
        {
          breakpoint: 640,
          settings: {
            fade:false,
            dots:true, dotsClass: 'slick-dots _maru'
          }
        }
      ]
    });
    
    $mb_slick.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      $('.slick-controller li a', $mainBasic).removeClass('_current');
      $('.slick-controller li:eq('+nextSlide+') a', $mainBasic).addClass('_current');
      $('.current', $gallery1_number).html(zeroPadding(nextSlide+1));
    });
    
    $('.slick-controller li', $mainBasic).each(function(idx, li) {
      $('a', $(li)).on('click', function(ev) {
        ev.preventDefault();
        $mb_slick.slick('slickGoTo', $(this).data('index'));
      });
      if(idx==0) $('a', $(li)).addClass('_current');
    });
  }
  
  
  $('#page-navi ul.navilist li').each(function(index, li) {
    var $li = $(li);
    $('a', $li).on('click', function(ev) {
      ev.preventDefault();
      var _anchor = $(this).attr('href')
      $('section'+_anchor).velocity('scroll',{offset: 0, duration: 500, easing: 'easeInOutCubic'});
    });
  });
  
  
  // ギャラリー１
  var $gallery1 = $('section#gallery1');
  var $gallery1_number = $('.slick-number', $gallery1);
  $('.max', $gallery1_number).html(zeroPadding($('.slick-container figure', $gallery1).length));
  var $gallery1_ctrl = $('.slick-ctrl', $gallery1);
  var $gallery1_prevArrow = $('.prev-arrow', $gallery1_ctrl);
  var $gallery1_nextArrow = $('.next-arrow', $gallery1_ctrl);
  
  var $gallery1_slick = $('.slick-container', $gallery1).slick(
  {
    infinite: true,
    slidesToShow: 1, slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true, dots: false,
    prevArrow: $gallery1_prevArrow, nextArrow: $gallery1_nextArrow,
    initialSlide: 1, //ずらしておく
    fade: true,
    speed: 2000,
    easing: 'easeOutQuart',
    lazyLoad: 'ondemand'
  });
    $('.slick-thumbs li', $gallery1).each(function(idx, li) {
      $('a', $(li)).on('click', function(ev) {
        ev.preventDefault();
        $gallery1_slick.slick('slickGoTo', $(this).data('index'));
      });
    });
    $gallery1_slick.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $('.slick-thumbs li', $gallery1).removeClass('_current');
      $('.slick-thumbs li', $gallery1).eq(nextSlide).addClass('_current');
      $('.current', $gallery1_number).html(zeroPadding(nextSlide+1));
    });
    $gallery1_slick.slick('slickGoTo', 0); //init
    $g1_slideBlock = $('.slide-block', $gallery1); $g1_cursor = $('.cursor', $gallery1);
    $g1_slideBlock.hover(function() {
        $(this).removeClass('_hide-cursor').addClass('_show-cursor');
        initZoomCursor($(this));
      },
      function() {
        $(this).removeClass('_show-cursor').addClass('_hide-cursor');
        destroyZoomCursor($(this));
      }
    );
  
  
  // ギャラリー2
  var $gallery2 = $('section#gallery2');
  var $gallery2_number = $('.slick-number', $gallery2);
  $('.max', $gallery2_number).html(zeroPadding($('.slick-container figure', $gallery2).length));
  var $gallery2_ctrl = $('.slick-ctrl', $gallery2);
  var $gallery2_prevArrow = $('.prev-arrow', $gallery2_ctrl);
  var $gallery2_nextArrow = $('.next-arrow', $gallery2_ctrl);
  
  var $gallery2_slick = $('.slick-container', $gallery2).slick(
  {
    infinite: true,
    slidesToShow: 1, slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false, dots: false,
    prevArrow: $gallery2_prevArrow, nextArrow: $gallery2_nextArrow,
    initialSlide: 1, //ずらしておく
    fade: true,
    speed: 2000,
    easing: 'easeOutQuart',
    lazyLoad: 'ondemand'
  });
    $('.slick-thumbs li', $gallery2).each(function(idx, li) {
      $('a', $(li)).on('click', function(ev) {
        ev.preventDefault();
        $gallery2_slick.slick('slickGoTo', $(this).data('index'));
      });
    });
    $gallery2_slick.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $('.slick-thumbs li', $gallery2).removeClass('_current');
      $('.slick-thumbs li', $gallery2).eq(nextSlide).addClass('_current');
      $('.current', $gallery2_number).html(zeroPadding(nextSlide+1));
    });
    // なぜか反応しないので、直接bindする。
    $gallery2_prevArrow.on('click', function(ev) {$gallery2_slick.slick('slickPrev');});
    $gallery2_nextArrow.on('click', function(ev) {$gallery2_slick.slick('slickNext');});
    $gallery2_slick.slick('slickGoTo', 0); //init
  
    $g2_slideBlock = $('.slide-block', $gallery2); $g2_cursor = $('.cursor', $gallery2);
    $g2_slideBlock.hover(function() {
        $(this).removeClass('_hide-cursor').addClass('_show-cursor');
        initZoomCursor($(this));
      },
      function() {
        $(this).removeClass('_show-cursor').addClass('_hide-cursor');
        destroyZoomCursor($(this));
      }
    );
    
    function initZoomCursor($tg) {
      var $_cursor = $('.cursor', $tg);
      $tg.on('mousemove', function(ev) {
        $_cursor.css({'left': ev.offsetX, 'top': ev.offsetY});
      });
    }
    function destroyZoomCursor($tg) {$tg.on('mousemove')}
  
  
  // 仕様
  var $spec = $('section#spec');
  var $spec_slick = $('.slick-container', $spec).slick(
  {
    infinite: true,
    slidesToShow: 1, slidesToScroll: 1,
    autoplay: false,
    arrows: true, dots: false,
    swipe: false,
    prevArrow: $gallery2_prevArrow, nextArrow: $gallery2_nextArrow,
    fade: false,
    speed: 450,
    easing: 'easeOutQuart',
    lazyLoad: 'ondemand'
  });
    $('.slick-controller li', $spec).each(function(idx, li) {
      $('a', $(li)).on('click', function(ev) {
        ev.preventDefault();
        $spec_slick.slick('slickGoTo', $(this).data('index'));
      });
    });
  
  // 白抜き製品画像
  var $pImages = $('section#product-images');
  var $pImages_slick = $('.slick-container', $pImages).slick(
  {
    infinite: true,
    slidesToShow: 3, slidesToScroll: 1,
    autoplay: false,
    arrows: true, dots: false,
    fade: false,
    speed: 450,
    easing: 'easeOutQuart',
    lazyLoad: 'ondemand'
  });
}



function initFeature() {
  $('article#main .body ul>li').each(function(index, li) {
    var $li = $(li);
    $('a', $li).on('click', function(ev) {
      ev.preventDefault();
      $_t = $(this);
      loadArticle($_t.data('slug'), $_t.data('no'))
    });
  });
}

function loadArticle(articles_slug, no) {
  $ia = $('#import-article');
  $ia_contaiiner = $('#import-article>#article-container');
  $btn_return1 = $('.button_return', $ia);
  $body.removeClass('_close-article').addClass('_open-article');
  
  $ia_contaiiner.html('').hide();
  $btn_return1.hide();
  
  $('a.button_return').on('click', function(ev) {
    ev.preventDefault();
    $body.removeClass('_open-article').addClass('_close-article');
  });
  
  $.ajax({
    url: '/_parse',
    type: 'post',
    timeout : 1000,
    data: {aslug: articles_slug},
    datatype:'html'
  }).then(function(data)
  {
    setArticle(data, no);
  },function(jqXHR, textStatus)
  {
    if(textStatus!=="success") {
/*
        var txt = "<p>textStatus:"+ textStatus + "</p>" +
            "<p>status:"+ jqXHR.status + "</p>" +
            "<p>responseText : </p><div>" + jqXHR.responseText +
            "</div>";
*/
    }
  });
  
  
  function setArticle(_dom, _no) {
    $ia_contaiiner.html(_dom).fadeIn(500);
    $btn_return1.fadeIn(500);
    $('#import-article #article-header').prepend('<div class="feature_no">#'+_no+'</div>');
  }
}





function setWindowSize_by_resize() {
  // リサイズ処理 - 画面全体に動画を敷く
  $window.on('resize', function(ev) {winH = $window.innerHeight();});
  $window.trigger('resize');
}

/* スクロールによる「_anim」クラス付与
---------------------------------------------------------------------*/
function initScrollEffect() {
  $window.scroll(function (){
    $(".effect").each(function(index, t){
      var $t = $(t);
      var posT = $t.offset().top;    
      var _sct = $window.scrollTop();
      if (_sct > posT - winH + winH/4){
        $t.addClass('_anim');
      };
    });
  });
}


/* responsive
---------------------------------------------------------------------*/
function initResponsiveImage() {
  var $responsive_images = $("[data-sp-replace]");
  var $responsive_images2 = $("[data-spbg-replace]");
  
  // setting
  $responsive_images.each(function() {
    var $img = $(this);
    if(!$img.data("src-sp")) $img.data("src-sp", $img.attr("src").replace(/\.(png|jpg|gif|svg)/, "-sp.$1"));
    $img.data("src", $img.attr("src"));
  });
  if(isMobile) {
    $responsive_images.each(function() {$(this).attr("src", $(this).data("src-sp"));});
  }
  responsive(0, 639, function(changed) {
    if(!changed) return;
    $responsive_images.each(function() {$(this).attr("src", $(this).data("src-sp"));});
  });
  responsive(640, null, function(changed){
    if(!changed) return;
    $responsive_images.each(function() {$(this).attr("src", $(this).data("src"));});
  });
  
  // setting
  $responsive_images2.each(function() {
    var $tg = $(this);
    if(!$tg.data("spbg-src")) return false;
    $tg.data("bg-src", $tg.css('background-image'));
  });
  
  if(isMobile) {
    console.log(1);
    $responsive_images2.each(function() {
      $(this).css('background-image', $(this).data("spbg-src"));}
    );
  }
  
  responsive(0, 639, function(changed) {
    if(!changed) return;
    $responsive_images2.each(function() {$(this).css('background-image', $(this).data("spbg-src"));});
  });
  responsive(640, null, function(changed){
    if(!changed) return;
    $responsive_images2.each(function() {$(this).css('background-image', $(this).data("bg-src"));});
  });
  
  
  $window.trigger('resize');
}



/* メインのカバー画像にブラーをかける
---------------------------------------------------------------------*/
function initHeadimageBlur() {
  if(!isMobile) {
    $visualArea = $('#maincover._blur');
    _imageURL = $visualArea.css('backgroundImage').match(/https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:@&=+$,%#]+[a-z]/g);
    $visualArea.backgroundBlur({
      imageURL : _imageURL,
      blurAmount : 7,
      imageClass : 'bg-blur'
    });
    $visualArea.css({backgroundImage:'none'})
  }
}



/* アコーディオン処理
---------------------------------------------------------------------*/
function initAccordion() {
  $('.mod_accordion').each(function(index, tg) {
    var $_tg = $(tg);
    if($_tg.hasClass('_open-accordion')) $('.mdl_accordion-body', $_tg).stop(true,true).slideDown(0);
    
    $('.mod_accordion-title a', $_tg).on('click', function(ev) {ev.preventDefault();})
    
    $('.mod_accordion-title', $_tg).on('click', function() {
      var $t = $(this), $p = $t.parent('.mod_accordion');
        if(!$p.hasClass('_open-accordion')) {
          $p.addClass('_open-accordion');
          $('.mod_accordion-body', $p).stop(true,true).slideDown(300, 'easeInCubic')
        }
        else {
          $p.removeClass('_open-accordion');
          $('.mod_accordion-body', $p).stop(true,true).slideUp(300, 'easeOutCubic')
        }
    });
  });
}




function no_scroll(){
  $(document).on(mousewheelevent,function(e){e.preventDefault();});
  $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
}

function return_scroll(){
  $(document).off(mousewheelevent);
  $(document).off('.noScroll');
}



/* [google mapの初期化]
    https://snazzymaps.com/style/18619/simple-retro
    https://webkikaku.co.jp/blog/webdesign/googlemap-customize/
---------------------------------------------------------------------*/
function initGmap() {
  var styleOptions =
[{"featureType": "all","elementType": "labels.text","stylers": [{"visibility": "off"}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"color": "#f1efe8"}]},{"featureType": "landscape.natural","elementType": "geometry.fill","stylers": [{"color": "#f1efe8"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#b2ac83"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#b2ac83"}]},{"featureType": "road.highway","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"color": "#8ac0c4"}]}]

  	map = new google.maps.Map(document.getElementById('gmap'), {
  		center: {lat: 33.552209, lng:131.154115,},
  		zoom: 12
  	});
  	
  	// set STYLE
  var styledMapOptions = { name: 'miranoshika' }
  var mapStyle = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('sample', mapStyle);
  map.setMapTypeId('sample');
  
  // set ICON
  var icon_salon = new google.maps.MarkerImage('http://miranoshika.org/wp-content/themes/miranoshika/assets/img/access/marker_home.png',
    new google.maps.Size(53,64),/*アイコンのサイズ*/
    new google.maps.Point(0,0)/*アイコンの位置*/
  );
  var marker_salon = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(33.517709,131.154115),
    icon: icon_salon,
    title: '田舎暮らし交流サロン ミラノシカ'
  });
  var icon_office = new google.maps.MarkerImage('http://miranoshika.org/wp-content/themes/miranoshika/assets/img/access/marker_yakuba.png',
    new google.maps.Size(53,64),/*アイコンのサイズ*/
    new google.maps.Point(0,0)/*アイコンの位置*/
  );
  var marker_office = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(33.578416, 131.164096),
    icon: icon_office,
    title: '上毛町役場'
  });
}




function setCommma(_num) {
  return _num.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,');
}


function zeroPadding(no, digit) {
  var _no;
  if(!digit) digit = 2
  if(digit == 2) _no = ("0"+no).slice(-2)
  else if(digit == 3) _no = ("00"+no).slice(-3)
  else if(digit == 4) _no = ("000"+no).slice(-4)
  return _no;
}

/* 配列の末尾の値を取得
---------------------------------------------------------------------*/
Array.prototype.getLastVal = function (){ return this[this.length -1];}


/* 配列の中身をシャッフル
---------------------------------------------------------------------*/
function aryShuffle(arr) {
  var i, j, temp;
  arr = arr.slice();
  i = arr.length;
  if (i === 0) {
    return arr;
  }
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};


/* for in メソッド
---------------------------------------------------------------------*/
Object.defineProperty(Object.prototype, "forIn", {
  value: function(fn, self) {
    self = self || this;
    Object.keys(this).forEach(function(key, index) {
      var value = this[key];
      fn.call(self, key, value, index);
    }, this);
  }
});



/* 共通パーツの初期化
---------------------------------------------------------------------*/
function initCommonItems()
{
  //setDefaultHoverAction($('a.hvr'));
  
  var $btnToTop = $("#button-totop");
  $btnToTop.click(function (ev) {
    ev.preventDefault();
    $('body, html').animate({ scrollTop: 0 }, 300);
    return false;
  });
/*
  $window.scroll(function () {
    if($(this).scrollTop() >= 200) {
      $btnToTop.fadeIn();
    } else {
      $btnToTop.fadeOut();
    }
  });
*/
}


  
/* 指定ターゲットのhoverによるフェード処理
---------------------------------------------------------------------*/
function setDefaultHoverAction($item, _speed, _alpha)
{
  var _ease = "linear";
  if(!_speed) var _speed = 300;
  if(!_alpha ) var _alpha = 0.6;
  $item.hover(
    function(){ $(this).stop().fadeTo(_speed, _alpha, _ease); },
    function(){ $(this).stop().fadeTo(_speed, 1, _ease); }
  )
}




/* IE用透過PNG処理
---------------------------------------------------------------------*/
function iePngFade()
{
    if(navigator.userAgent.indexOf("MSIE 7") != -1 || navigator.userAgent.indexOf("MSIE 8") != -1) {
        for(i=0; i<$('img').length; i++){
            if($('img').eq(i).attr('src').indexOf('.png') != -1) {
                $('img').eq(i).css({ 'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $('img').eq(i).attr('src') + '", sizingMethod="scale");' });
            }
        }
    }
}


/* IE用console
---------------------------------------------------------------------*/
if(!('console' in window))
{
  window.console = {};
  window.console.log = function(str){return str;};
}


/* 該当ブラウザをクラスに追加する
---------------------------------------------------------------------*/
function checkTerminal ()
{
  var ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0) {
    $body.addClass('sp')
    isPC = false;
  }
  else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    $body.addClass('sp tablet');
    isPC = false;
  }
  else {
    $body.addClass('pc');
    isPC = true;
  }
}


/* 該当ブラウザをクラスに追加する
---------------------------------------------------------------------*/
function checkBrowser()
{
  var ua = navigator.userAgent;
  var isIE = ua.match(/msie/i),
      isIE6 = ua.match(/msie [6.]/i),
      isIE7 = ua.match(/msie [7.]/i),
      isIE8 = ua.match(/msie [8.]/i),
      isIE9 = ua.match(/msie [9.]/i),
      isIE10 = ua.match(/msie [10.]/i),
      isChrome = ua.match(/chrome/i),
      isSafari = ua.match(/safari/i),
      isfireFox = ua.match(/firefox/i),
      isOpera = ua.match(/opera/i);
  if (isIE) {
      $("html").addClass('ie');
      if (isIE6) $("html").addClass('ie6');
      else if (isIE7) $("html").addClass('ie7');
      else if (isIE8) $("html").addClass('ie8');
      else if (isIE9) $("html").addClass('ie9');
      else if (isIE10) $("html").addClass('ie10');
  }
  else if(isChrome) $("html").addClass('chrome');
  else if(isSafari) $("html").addClass('safari');
  else if(isfireFox) $("html").addClass('firefox');
  else if(isOpera) $("html").addClass('opera');
}


/* 該当OSをクラスに追加する
---------------------------------------------------------------------*/
function checkOS()
{
  var ua = {};
  ua.name = window.navigator.userAgent.toLowerCase();
   
  ua.isIE = (ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0);
  ua.isiPhone = ua.name.indexOf('iphone') >= 0;
  ua.isiPod = ua.name.indexOf('ipod') >= 0;
  ua.isiPad = ua.name.indexOf('ipad') >= 0;
  ua.isiOS = (ua.isiPhone || ua.isiPod || ua.isiPad);
  ua.isAndroid = ua.name.indexOf('android') >= 0;
  ua.isTablet = (ua.isiPad || (ua.isAndroid && ua.name.indexOf('mobile') < 0));
   
  if (ua.isIE) {
      ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
      if (ua.verArray) {
          ua.ver = parseInt(ua.verArray[2], 10);
      }
  }
  if (ua.isiOS) {
      ua.verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua.name);
      if (ua.verArray) {
          ua.ver = parseInt(ua.verArray[2], 10);
      }
  }
  if (ua.isAndroid) {
      ua.verArray = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
      if (ua.verArray) {
          ua.ver = parseInt(ua.verArray[2], 10);
      }
  }
  
  ua.isPC = !(ua.isiOS || ua.isAndroid || ua.isTablet);
  return ua;
}

/* 配列か調べる
---------------------------------------------------------------------*/
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/* 全角英数字文字列を半角文字列に変換する
---------------------------------------------------------------------*/
String.prototype.to1ByteAlphaNumeric = function(){
    return this.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}
 
/* 半角英数字文字列を全角文字列に変換する
---------------------------------------------------------------------*/
String.prototype.to2ByteAlphaNumeric = function(){
    return this.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
}





