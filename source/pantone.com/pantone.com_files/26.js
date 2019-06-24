
//jQuery(document).ready(function ($) {
    // AC 180223: Moving auto-popup/cookie-tracker into global function
    //initiateSignup_with_Cookie("Homepage Auto", "emailSignUpPANTONE");
    //generateProductContainer();
//});

jQuery(document).ready(function ($) {

checkViewport();  var sy_slider = $('.my-slider').slippry({
        auto: 	  true,
        pager: 	  false,
        autoDelay: 2000,
        autoHover: false,
        pause: 10000,
        speed: 1200,
        controls: true,
        captions: false,
        preload: 'all',
adaptiveHeight:true,
responsive:true,
        onSliderLoad: function() {
               $('.slider-box').css('visibility','visible');
        },
        onSlideBefore: function (el, index_old, index_new) {
var $elNew =  $('.text_nav span').eq(index_new), slideDesc = $elNew.data('desc');
            $('.text_nav span').removeClass('active');
            $elNew.addClass('active');
        }
    });


  checkViewport = function (e) {
                var windowWidth,
                    isMobile = Modernizr.touch;
if(  $('.imgSlide').length){
                windowWidth = window.innerWidth || $window.width();
                if ((windowWidth < 768 && sy_slider.width()  < 768) || isMobile) {
               $('.imgSlide,.respBanner').each(function(){
var sLink = $(this).attr('src');
if(sLink.indexOf('-mobile.jpg')<0){
sNewLink =  sLink.replace('.jpg','-mobile.jpg');
 $(this).attr('src',sNewLink )
sy_slider.refresh();}
});
                }
else{
   $('.imgSlide,.respBanner').each(function(){
var sLink = $(this).attr('src');
if(sLink.indexOf('-mobile.jpg')>0){
sNewLink =  sLink.replace('-mobile.jpg','.jpg');
 $(this).attr('src',sNewLink )
sy_slider.refresh();
}
});
}
}}
    $(window).on('load', checkViewport);
 $(window).on('resize', checkViewport);
    $('#slide1').on('click', function () {
        sy_slider.stop().goToSlide(1);
    });
    $('#slide2').on('click',function() {
        sy_slider.stop().goToSlide(2);
    });
    $('#slide3').on('click',function() {
        sy_slider.stop().goToSlide(3);
    });
    $('map').imageMapResize();

    $(window).scroll(function () {
        offset = $(this).scrollTop();
        if (offset > 3000) {
            $(".down_arrow:not(.scrolled)").addClass("scrolled");
       }
       else
       {
           $(".down_arrow.scrolled").removeClass("scrolled");
       }
    });
});