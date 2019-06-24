// 第6世代以降のデザインテンプレートで使用されているガジェット用のJs

// jQuery Easing
jQuery.easing.easeOutQuart = function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
};

// Scroll to Top
(function(ns, w, d, $){

"use strict";

var app = {
  setup: {
    comment: {}
  }
};

$(d).ready(function(){
  $('.to-pagetop a').click(function(e){
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeOutQuart');
  });
  app.setup.comment.form();
  app.setup.bottombar();
});

// comment form rating navigation.
app.setup.comment.form = function(){
  if (!$('#comment-form-tools').length) {
    return;
  }

  var star              = $('#comment-form-tools .rating-value ul:last');
  var face              = $('#comment-form-tools .rating-value ul:first');
  var rating_disp       = $('#comment-form-tools .rating-value');
  var input_rating      = $('#comment-form-tools input[name="rating"]');
  var option_rating     = $('#comment-form-tools .rating-value ul li');
  var input_rating_icon = $('#comment-form-tools input[name="rating_icon"]');
  var radio_rating_icon = $('#comment-form-tools .rating-icon div');

  $('#comment-form-tools .rating-value').hover(function(){
    (input_rating_icon.val() === 'star' ? star : face).show();
  }, function(){
    (input_rating_icon.val() === 'star' ? star : face).hide();
  });

  radio_rating_icon.click(function(){
    var ele = $(this);
    input_rating_icon.val(ele.data('value'));
    radio_rating_icon.removeClass('selected');
    ele.addClass('selected');
    rating_disp.find('> img').remove();
    rating_disp.find('> span, > div').show();
    input_rating.val('');
  });

  option_rating.click(function(){
    var ele = $(this);
    var rating = ele.data('value');
    input_rating.val(rating);
    rating_disp.find('> img').remove();
    if (rating) {
        rating_disp.find('> span, > div').hide();
        rating_disp.append($('<img/>').attr('src', ele.find('img').attr('src')).addClass(input_rating_icon.val()));
    } else {
        rating_disp.find('> span, > div').show();
    }
  });
};

// layout-1col bottom blog parts
app.setup.bottombar = function(){
  if (!$('body').hasClass('layout-1col') ||
       $('body').hasClass('layout-1col-nobrick')) {
    return ;
  }

  var process = function(){
    var columns = {};
    var append = function(ele){
      lis.sort(function(a, b){
        return a.height() - b.height();
      });
      lis[0].get(0).appendChild(ele);
    };
    var inner = $('#sidebar-inner');
    var innerLeft = inner.offset().left;
    var maxHeight = 0;
    $('#sidebar .sidewrapper').each(function(){
      var ele = $(this);
      var left = ele.offset().left;
      var height = ele.height();
      if (!(left in columns)) {
        columns[left] = { height: 0 };
      }
      ele.data('top', columns[left].height);
      ele.data('left', left - innerLeft - parseInt(ele.css('marginLeft'), 10));
      columns[left].height += height
        + parseInt(ele.css('paddingTop'), 10)
        + parseInt(ele.css('paddingBottom'), 10)
        + parseInt(ele.css('marginTop'), 10)
        + parseInt(ele.css('marginBottom'), 10);
      if (maxHeight < columns[left].height) {
        maxHeight = columns[left].height;
      }
    });
    inner.css({ position: 'relative', height: maxHeight });
    $('#sidebar .sidewrapper').each(function(){
      var ele = $(this);
      ele.css({
        position: 'absolute',
        top: ele.data('top'),
        left: ele.data('left')
      });
    });
  };
  
  setTimeout(process, 3000);
};

})(this, window, document, jQuery);
