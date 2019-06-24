/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

// Place your code here.

/* Thanks to CSS Tricks for pointing out this bit of jQuery
http://css-tricks.com/equal-height-blocks-in-rows/
It's been modified into a function called at page load and then each time the page is resized. One large modification was to remove the set height before each new calculation. */

equalheight = function(container){

var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(window).load(function() {
  equalheight('.specialties-wrap ul li.views-row a');
  equalheight('.location-listing li.views-row');
  equalheight('.other-experts-listing .views-row');
});


$(window).resize(function(){
  equalheight('.specialties-wrap ul li.views-row a');
  equalheight('.location-listing li.views-row');
  equalheight('.other-experts-listing .views-row');
});


$(function() { // Make sure the DOM is Ready



  // expand collapse toggle for sidebar menus with h2 header as trigger.
  // add "widget-toggle" class to the view block
  var trigger = $('.widget-toggle h2');
  $(trigger).each(
      function(){
          $(this.firstChild).wrap('<span></span>');
      });
  trigger.siblings('.view').hide();
  trigger.click(function() {
      $(this).toggleClass('toggle-expanded').siblings('.view').toggle(250);
  });


 // If you've created a new view for the home page feature slider, you'll need to change the class name of the view below.
  function initSlider(auto_value) {
    $('.view-id-nodequeue_3 .view-content').bxSlider({
      controls: false,
      mode: 'fade',
      auto: auto_value,
      pause: 8000
    });
  }
if($('body').hasClass('front')) {
  // Get the first slide of the nodequeue
  var firstSlide = $('.view-id-nodequeue_3 .view-content .views-row-1');
  var optionalSlide = $('.view-id-nodequeue_3 .view-content .views-row-1 div');
  // console.log(firstSlide.attr('class'));

  // Insert the 'slide-#' for poor weather banner or holiday banners if needed
  // Rotator will stop if it is the first slide
  var width = $(window).innerWidth();

  if (optionalSlide.hasClass('stop-rotation') && optionalSlide.hasClass('alert-message')) {
    // Will run if slide has 'Stop Rotation' and 'Alert Message' selected //
    initSlider(false);
    console.log('stop rotation and alert message');
    if ( width < 768 ) {
      window.onload = modalWindowAlert;
    }
  } else if (optionalSlide.hasClass('stop-rotation') && !optionalSlide.hasClass('alert-message')) {
    // Will run if slide has 'Stop Rotation' only selected //
    initSlider(false);
    console.log('stop rotation only');
  } else if (optionalSlide.hasClass('alert-message') && !optionalSlide.hasClass('stop-rotation')) {
    // Will run if slide has 'Alert Message' only selected //
    console.log('alert message only');
    initSlider(true);
    if ( width < 768 ) {
      window.onload = modalWindowAlert;
    }
  } else {
    initSlider(true);
  }
}

if($('body').hasClass('node-type-physician-profile')) {
  // only target physician profile pages
  var reviewsMore = $('#block-views-patient-reviews-full-block-1 .view-id-patient_reviews_full .more-link');
  var reviewsRating = document.getElementById('rating-link');
  if ((reviewsMore).children('a').length) {
    // Do nothing if there is a more-link
  } else {
    // Remove the href value of the link if there are not enough reviews
    // $(reviewsRating).removeAttr("href");

    // Replace the <a> tag with a <span>
    $(reviewsRating).replaceWith(function(){
        return $("<span>" + $(this).html() + "</span>");
    });
  }
}


    // Alert: Mobile Message content on Home Feature banner located in first position //
    function modalWindowAlert() {

        var id = $('#alert-message');
        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        //Set height and width to mask to fill up the whole screen
        $('#mask').css({'width':maskWidth,'height':maskHeight});

        //transition effect
        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("slow",0.8);

        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
        //Set the popup window to center
        $(id).css('top', winH/2-$(id).height()/2);
        $(id).css('left', winW/2-$(id).width()/2);

        //transition effectstyle
        $(id).fadeIn(2000);
    };

    //if close button is clicked
    $('.window .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        $('#mask, .window').hide();
    });

    //if mask is clicked
    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });

    $(window).resize(function () {
        var box = $('#boxes .window');
        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
        //Set height and width to mask to fill up the whole screen
        $('#mask').css({'width':maskWidth,'height':maskHeight});
        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
        //Set the popup window to center
        box.css('top', winH/2 - box.height()/2);
        box.css('left', winW/2 - box.width()/2);
    });

    // Have all links within an article open in a new window - Per Chassity
    if($('body').hasClass('node-type-article')) {
      $('.node-article .field-name-body a')
      .attr("target", "_blank");
    } else {
      // Do nothing
    }

    // Open any external links in new window //
    $('a[href^="http://"], a[href^="https://"]').each(
      function(){
        if(this.href.indexOf(location.hostname) == -1) {
          $(this).attr('target', '_blank');
        }
      }
    )

     //  Replace all 'am' and 'pm' to have periods like 'a.m.' and 'p.m.' and only run the function when on a locations page.  //
    var locationTimes = $('.oh-display').children();

    function updateTimes() {
      for ( var i = 0; i < locationTimes.length; i++ ) {

        $(".oh-display-hours").text(function(index, text) {
        return text.replace('am', 'a.m.');
        });

        $(".oh-display-hours").text(function(index, text) {
        return text.replace('pm', 'p.m.');
        });

      }
    }

    if($('body').hasClass('node-type-location')) {
      updateTimes();
    }

    // Displays the times in a vertical list instead of inline //
    $('span.oh-display').css('display','block');

     // expand the answer to each faq for the walk-in clinic //
    var faqQuestion = $('.faq-question');
    var faqAnswer = $('.faq-answer');

    $(faqQuestion).each(function () {
      $(this).click(function (e){
        e.preventDefault();
          $(this).siblings(faqAnswer).toggle('slow');
        });
    });

    var refCookie = ($.cookie("queryString"));
    //console.log("Ref: " + refCookie);

    $('.referralstring').val(refCookie);
});




})(jQuery, Drupal, this, this.document);
;
