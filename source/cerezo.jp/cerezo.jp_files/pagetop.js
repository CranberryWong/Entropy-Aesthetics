// pagetop ボタン
$(".pagetop").hide();
$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $(".pagetop").fadeIn("slow");

  } else {
    $(".pagetop").fadeOut("slow");
  }
});