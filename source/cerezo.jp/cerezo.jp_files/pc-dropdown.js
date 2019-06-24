$(function(){

  $(".dropdown-menu").hover( function() {
      if ($('.dropdown-menu-sub').css('display') == 'block') {
        $(".dropdown-main-menu").removeClass("active");
        $(".dropdown-menu-sub").slideUp("fast");
      } else {
        $(".dropdown-main-menu").addClass("active");
        $(".dropdown-menu-sub").slideDown("fast");
      }
  });

});