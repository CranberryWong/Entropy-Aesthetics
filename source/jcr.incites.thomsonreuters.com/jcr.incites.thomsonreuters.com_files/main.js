$(document).ready(function() {
function IEPlaceholders(){
    if($.browser.msie) {
        $("body").find("input[type='text']").each(function() {
            var tp = $(this).attr("placeholder");
            $(this).attr('value',tp).css('color','#bbb').css('font-family','Georgia').css('font-style','italic');
        }).keypress(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == val) {
                $(this).attr('value','').css('color','#333').css('font-family','Arial').css('font-style','normal');
            }
        }).focusout(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == "") {
                $(this).attr('value', val).css('color','#bbb').css('font-family','Georgia').css('font-style','italic');
            }
        });
        $("body").find("textarea").each(function() {
            var tp = $(this).attr("placeholder");
            $(this).attr('value',tp).css('color','#bbb').css('font-family','Georgia').css('font-style','italic');
        }).keypress(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == val) {
                $(this).attr('value','').css('color','#333').css('font-family','Arial').css('font-style','normal');
            }
        }).focusout(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == "") {
                $(this).attr('value', val).css('color','#bbb').css('font-family','Georgia').css('font-style','italic');
            }
        });
        
    }
};  
IEPlaceholders();

//dropdown on documents page
$(".j-dropdown-show").mouseover(function () {
	$(this).parent().addClass("select-container-show")
})
$(".select-container").mouseleave(function () {
	$(this).removeClass("select-container-show")
})
$(".select-dropdown-item").click(function () {
	$(this).parent().parent().removeClass("select-container-show");
})

//check compare Journals
$('.check1').click(function() {
    console.log(checkAll('.check1'));
    console.log(!$("#comapreJournals").hasClass('disabled'));
   if(checkAll('.check1')) {
       if($("#comapreJournals").hasClass('disabled')){
           $("#comapreJournals").removeClass('disabled');
       }
   } else {
       if(!$("#comapreJournals").hasClass('disabled')){
           $("#comapreJournals").addClass('disabled');
       }
   }
})
function checkAll(_class) {
   var allCheck = $(_class);
   for (i=0; i < allCheck.length; i++) {
    if (allCheck[i].checked){
     return(true);
    }
   }
   return(false);
}

var $linkMenuStatus = '';
  $('.main-container').click(function (event) {
    var $target = $(event.target);
    if (!event.target) {
      $target = event.srcElement;
    }
    if ($target.is('.has-subnav')) {
      if ($linkMenuStatus) {
        $linkMenuStatus.parent().removeClass('show-subnav');
        $linkMenuStatus = '';
      } else {
        if ($target.parent().has('.subnav')) {
          $target.parent().addClass('show-subnav');
          $linkMenuStatus = $target;
        }
      }
    } else {
      if ($target.is('.icon-arrow') || $target.is('.icon-ic-menu-details')) {
        if ($linkMenuStatus) {
          $linkMenuStatus.parent().removeClass('show-subnav');
          $linkMenuStatus = '';
        } else {
          if ($target.parent().parent().has('.subnav')) {
            $target.parent().parent().addClass('show-subnav');
            $linkMenuStatus = $target.parent();
          }
        }
      } else {
        if (!$target.is('.subnav-link')) {
          if ($linkMenuStatus) {
            $linkMenuStatus.parent().removeClass('show-subnav');
            $linkMenuStatus = '';
          }
        }
      }
    }
  });

//show hide visualization and stickys it
  $(document).on('click', "a.visualization", function(event) {
    
	var d = new Date();
	d.setFullYear(d.getFullYear()+5);
    var $target = $(event.target);
    if( Ext.util.Cookies.get('jcrvisualization') == 'hide' && $target[0].className == "icon icon-visualization-expand")
    {
    	document.cookie = 'jcrvisualization = ' + 'show'+'; expires='+d.toUTCString();
    }
    else
    {
    	document.cookie='jcrvisualization = ' + $target[0].className+'; expires='+d.toUTCString();
    }
    $target.parents(".l-column-content").toggleClass("visualization-hide");
    
    if(Ext.util.Cookies.get('jcrvisualization') == 'hide'){
    	eventTrackCusIndicators('Navigation','jcrHideLandingVisualization','JCR_HIDE_LANDING_VISUALIZATION');
    }
    else{
    	eventTrackCusIndicators('Navigation','jcrShowLandingVisualization','JCR_SHOW_LANDING_VISUALIZATION');
    }
    //Resizes journalsgrid
    
    var journalsgridHeight = 400;
    var categorygridHeight = 400;
    
    if( Ext.util.Cookies.get('jcrvisualization') == "icon icon-visualization-expand" )
    {
    	document.cookie='jcrvisualization = ' + 'hide';
    }
    
    if(Ext.util.Cookies.get('jcrvisualization') == 'hide')
    {
    	journalsgridHeight = 800;
    	categorygridHeight = 800;
    }
    
    if(Ext.getCmp('journalsgrid'))
    {
    	Ext.getCmp('journalsgrid').setHeight(journalsgridHeight);
    }else if (Ext.getCmp('journalcitationgrid'))
    {
    	Ext.getCmp('journalcitationgrid').setHeight(journalsgridHeight);
    }
   
  });
// Checks to see if Visualization was hidden and keeps it hidden  
  $(document).ready(function(){
	//document.cookie='jcr.visualization = ""';
	if(Ext.util.Cookies.get('jcrvisualization')!=""){
		var target = Ext.util.Cookies.get('jcrvisualization');
		if(Ext.util.Cookies.get('jcrvisualization')!="show")
		{
			$('.'+target).parents(".l-column-content").toggleClass("visualization-hide");
		}
	}	
	});
  
//  add filters popup mock
  var $grayscaleStatus = '';
  var $filterPopupStatus = '';
  $(".main-container").click(function (event) {
	$target = $(event.target);
	if (!event.target) {
		$target = event.srcElement;
	}
    if($target.is(".add-filters")){
        if ($filterPopupStatus){
			$('#popup').hide();
            if($("#popup").hasClass('popup-filter')){$("#popup").removeClass('popup-filter');}
            if($("#popup").hasClass('popup-checkbox-filters')){$("#popup").removeClass('popup-checkbox-filters');}
            if($("#popup").hasClass('popup-action-share')){$("#popup").removeClass('popup-action-share');}
            if($("#popup").hasClass('popup-action-download')){$("#popup").removeClass('popup-action-download');}
            if($grayscaleStatus.hasClass('grayscale')){$grayscaleStatus.removeClass('grayscale');}
            $filterPopupStatus = '';
		}
        $grayscaleStatus = $target;
        $("#popup .popup-wrapper").html($target.next().html());
        $filterPopupStatus = $target;
        positionTop =  $target.offset().top;
        positionLeft =  $target.offset().left;
        $("#popup").addClass('popup-filter');
        $("#popup").css( {
            top:positionTop - 64,
            left:positionLeft + $target.width() + 15
        });
        $("#popup").show();
    }
    else {
        if($target.is(".action-download")){
        	eventTrackCusIndicators('Navigation','jcrDownloadInteraction','Download_Interaction_JCR');
            if ($filterPopupStatus){
                $('#popup').hide();
                if($("#popup").hasClass('popup-filter')){$("#popup").removeClass('popup-filter');}
                if($("#popup").hasClass('popup-checkbox-filters')){$("#popup").removeClass('popup-checkbox-filters');}
                if($("#popup").hasClass('popup-action-share')){$("#popup").removeClass('popup-action-share');}
                if($("#popup").hasClass('popup-action-download')){$("#popup").removeClass('popup-action-download');}
                if($grayscaleStatus.hasClass('grayscale')){$grayscaleStatus.removeClass('grayscale');}
                $filterPopupStatus = '';
            }
            $grayscaleStatus = $target;
            $grayscaleStatus.addClass('grayscale');
			 
            $("#popup .popup-wrapper").html($target.next().html());
			
			if(document.getElementsByName('compare').length>0){
				if(document.getElementsByName('compare')[1].checked){
					$("#popup").find("ul li:nth-child(n+3)").hide();
				}
				else{
					$("#popup").find("ul li:nth-child(2)").hide();
				}

			}
			else{
				$("#popup").find("ul li").show();
			}
            $filterPopupStatus = $target;
            positionTop =  $target.offset().top;
            positionLeft =  $target.offset().left;
			 $("#popup").css( {
                top:positionTop + $target.height() + 24,
                left:positionLeft - 97
            });
            $("#popup").addClass('popup-action-download');
           
            $("#popup").show();
            $(".popup-action-download .first a").focus();
        }
        else {
            if($target.is(".action-share")){
                if ($filterPopupStatus){
                    $('#popup').hide();
                    if($("#popup").hasClass('popup-filter')){$("#popup").removeClass('popup-filter');}
                    if($("#popup").hasClass('popup-checkbox-filters')){$("#popup").removeClass('popup-checkbox-filters');}
                    if($("#popup").hasClass('popup-action-share')){$("#popup").removeClass('popup-action-share');}
                    if($("#popup").hasClass('popup-action-download')){$("#popup").removeClass('popup-action-download');}
                    if($grayscaleStatus.hasClass('grayscale')){$grayscaleStatus.removeClass('grayscale');}
                    $filterPopupStatus = '';
                }
                $grayscaleStatus = $target;
                $grayscaleStatus.addClass('grayscale');
                $("#popup .popup-wrapper").html($target.next().html());
                $filterPopupStatus = $target;
                positionTop =  $target.offset().top;
                positionLeft =  $target.offset().left;
                $("#popup").addClass('popup-action-share');
                $("#popup").css( {
                    top:positionTop + $target.height() + 24,
                    left:positionLeft - 200
                });
                IEPlaceholders();
                $("#popup").show();
                $(".popup-action-share input").focus();
            }
            else {
                if ($filterPopupStatus) {
                    $('#popup').hide();
                    if($("#popup").hasClass('popup-filter')){$("#popup").removeClass('popup-filter');}
                    if($("#popup").hasClass('popup-checkbox-filters')){$("#popup").removeClass('popup-checkbox-filters');}
                    if($("#popup").hasClass('popup-action-share')){$("#popup").removeClass('popup-action-share');}
                    if($("#popup").hasClass('popup-action-download')){$("#popup").removeClass('popup-action-download');}
                    if($grayscaleStatus.hasClass('grayscale')){$grayscaleStatus.removeClass('grayscale');}
                    $filterPopupStatus = '';
                }
            }
        }
    }
});

//  popup mock with checkboxes RIGHT HERE
  var $checkboxPopupStatus = '';
  var journalsSelected = false;
  var categoriesSelected = false;
  var publisherSelected = false;
  var countriesSelected = false;
  $(".main-container").click(function (event) {
  	$target = $(event.target);
  	if (!event.target) {
  		$target = event.srcElement;
  	}
      if($target.is(".checkbox-journals") && !journalsSelected){
         $target.parent().removeClass("sidebar-body-hide");
         $target.parent().next().removeClass("sidebar-body-hide");
            
          $checkboxPopupStatus = $target;
          positionTop =  $target.offset().top;
          positionLeft =  $target.offset().left;
          $("#journal-popup").addClass('popup-checkbox-journals');
          $("#popupJournals").css( {
              top:positionTop - 72,
              left:positionLeft + $target.width() + 15
          });
          IEPlaceholders();
          $("#journal-popup").show();
          //$(".popup-checkbox-journals input[type='text']").focus();
  		journalsSelected = true;
      } 
  	else if ($target.is(".checkbox-journals") && journalsSelected)
  	{
  		$target.parent().addClass("sidebar-body-hide");
  		$target.parent().next().addClass("sidebar-body-hide");
  		journalsSelected = false;
  		$('#journal-popup').hide();
  	}
      
  	if($target.is(".checkbox-categories") && !categoriesSelected){
         $target.parent().removeClass("sidebar-body-hide");
         $target.parent().next().removeClass("sidebar-body-hide");
         
         $checkboxPopupStatus = $target;
         positionTop =  $target.offset().top;
         positionLeft =  $target.offset().left;
         $("#category-popup").addClass('popup-checkbox-categories');
         $("#popupCategories").css( {
             top:positionTop - 52,
             left:positionLeft + $target.width() + 15
         });
         IEPlaceholders();
         $("#category-popup").show();
         //$(".popup-checkbox-categories input[type='text']").focus();
         categoriesSelected = true;
     }
	 else if ($target.is(".checkbox-categories") && categoriesSelected)
		{
			$target.parent().addClass("sidebar-body-hide");
			$target.parent().next().addClass("sidebar-body-hide");
			 categoriesSelected = false;
			$('#category-popup').hide();
		}
  	
  	
    if($target.is(".checkbox-publisher") && !publisherSelected){
        $target.parent().removeClass("sidebar-body-hide");
        $target.parent().next().removeClass("sidebar-body-hide");
        
        $checkboxPopupStatus = $target;
        positionTop =  $target.offset().top;
        positionLeft =  $target.offset().left;
        $("#publisher-popup").addClass('popup-checkbox-journals');
        $("#popupPublisher").css( {
            top:positionTop - 72,
            left:positionLeft + $target.width() + 15
        });
        IEPlaceholders();
        $("#publisher-popup").show();
        //$(".popup-checkbox-journals input[type='text']").focus();
        publisherSelected = true;
    } 
    else if ($target.is(".checkbox-publisher") && publisherSelected)
	{
		$target.parent().addClass("sidebar-body-hide");
		$target.parent().next().addClass("sidebar-body-hide");
		publisherSelected = false;
		$('#publisher-popup').hide();
	}
    
    if($target.is(".checkbox-country") && !countriesSelected){
        $target.parent().removeClass("sidebar-body-hide");
        $target.parent().next().removeClass("sidebar-body-hide");
        
        $checkboxPopupStatus = $target;
        positionTop =  $target.offset().top;
        positionLeft =  $target.offset().left;
        $("#country-popup").addClass('popup-checkbox-journals');
        $("#popupCountry").css( {
            top:positionTop - 72,
            left:positionLeft + $target.width() + 15
        });
        IEPlaceholders();
        $("#country-popup").show();
        //$(".popup-checkbox-journals input[type='text']").focus();
        countriesSelected = true;
    }
    else if ($target.is(".checkbox-country") && countriesSelected)
	{
		$target.parent().addClass("sidebar-body-hide");
		$target.parent().next().addClass("sidebar-body-hide");
		countriesSelected = false;
		$('#country-popup').hide();
	}
   if($target.is(".checkbox-indicators")){
	   getCheckedStatus();
       if ($checkboxPopupStatus){
           $('#popupCountry').hide();$('#popupPublisher').hide();$('#popupCategories').hide();$('#popupIndicators').hide();$('#popupJournals').hide();
           $checkboxPopupStatus = '';
       }
       $("#popupIndicators .popup-wrapper").html($target.next().html());
       $checkboxPopupStatus = $target;
       positionTop =  $target.offset().top;
       positionLeft =  $target.offset().left;
       $("#popupIndicators").addClass('popup-checkbox-indicators');
       $("#popupIndicators").css( {
           top:positionTop + 26,
           left:positionLeft + $target.width() - $('#popupIndicators').width() - 40
       });
       $("#popupIndicators").show();
       $(".popup-checkbox-indicators .first input[type='checkbox']").focus();
   }/*
            else if($target.parents("#category-popup").length == 0 && $target.parents("#popupIndicators").length == 0 && $target.parents("#journal-popup").length == 0
            		&& $target.parents("#publisher-popup").length == 0 && $target.parents("#country-popup").length == 0) {
                if ($checkboxPopupStatus) {
                    //$('#country-popup').hide();$('#publisher-popup').hide();$('#category-popup').hide();$('#popupIndicators').hide();$('#journal-popup').hide();
                    $checkboxPopupStatus = '';
                }
            }*/
});

//  popup inner mock with checkboxes
var $checkboxInnerPopupStatus = '';
var $checkboxInnerPopupContent = '';
$("#popup").click(function (event) {
    $target = $(event.target);
    if (!event.target) {
        $target = event.srcElement;
    }
    if($target.is(".inner-popup-link")){
        $checkboxInnerPopupStatus = $target;
        $checkboxInnerPopupContent = $("#popup .popup-wrapper").html();
        $("#popup .popup-wrapper").html($target.next().html());
        $("#popup").addClass('popup-checkbox-filters');
        IEPlaceholders();
        $("#popup").show();
    }
    else {
        if ($target.is(".icon-arrow-button")) {
            if($("#popup").hasClass('popup-checkbox-filters')){$("#popup").removeClass('popup-checkbox-filters');}
            $("#popup .popup-wrapper").html($checkboxInnerPopupContent);
            $checkboxInnerPopupStatus = '';
        }
    }
});

//  close popup mock with checkboxes
$(".popup").click(function (event) {
	$target = $(event.target);
	if (!event.target) {
		$target = event.srcElement;
	}
    if($target.is(".icon-close")){
        if ($checkboxPopupStatus) {
			//$('#country-popup').hide();$('#publisher-popup').hide();$('#category-popup').hide();$('#popupIndicators').hide();$('#journal-popup').hide();
            $checkboxPopupStatus = '';
        }
    }
}); 

$(".popup-new").click(function (event) {
	$target = $(event.target);
	if (!event.target) {
		$target = event.srcElement;
	}
    if($target.is(".icon-close")){
        if ($checkboxPopupStatus) {
			$('#country-popup').hide();$('#publisher-popup').hide();$('#category-popup').hide();$('#popupIndicators').hide();$('#journal-popup').hide();
            $checkboxPopupStatus = '';
        }
    }
});
    
//sidebar-panels-expandable

$(document).on('click', "div.sidebar-panels-expandable", function(event) {
    var $target = $(event.target);
    if (!event.target) {
      $target = event.srcElement;
    }
    if($target.is('.sidebar-panels-expandable')) {
        if ($target.hasClass("sidebar-body-hide")) {
            $target.removeClass("sidebar-body-hide");
            $target.next().removeClass("sidebar-body-hide");
        } else {
            $target.addClass("sidebar-body-hide");
            $target.next().addClass("sidebar-body-hide");
        }
    }
      else {
        if ($target.parent('.sidebar-panels-expandable').hasClass("sidebar-body-hide")) {
            $target.parent('.sidebar-panels-expandable').removeClass("sidebar-body-hide");
            $target.parent('.sidebar-panels-expandable').next().removeClass("sidebar-body-hide");
        } else {
            $target.parent('.sidebar-panels-expandable').addClass("sidebar-body-hide");
            $target.parent('.sidebar-panels-expandable').next().addClass("sidebar-body-hide");
        }
    }
  });
    

//  add help popup mock
  var $helpPopupStatus = '';
  $("body").click(function (event) {
	$target = $(event.target);
	if (!event.target) {
		$target = event.srcElement;
	}
    if($target.is(".icon-help")){
        if ($helpPopupStatus){
            $('#popup-help').hide();
            $("#popup-help").removeClass('popup-help');

            $helpPopupStatus = '';
        }
        $("#popup-help .popup-wrapper").html($target.next().html());
        $helpPopupStatus = $target;
        positionTop =  $target.offset().top;
        positionLeft =  $target.offset().left;
        $("#popup-help").addClass('popup-help');
        $("#popup-help").css( {
            top:positionTop - 32,
            left:positionLeft + $target.width() + 15
        });
        $("#popup-help").show();
    }
    else {
        if ($helpPopupStatus) {
            $('#popup-help').hide();
            $("#popup-help").removeClass('popup-help');
            $helpPopupStatus = '';
        }
    }
});
    
//close all popups on escape click
$(document).keyup(function(e) {
  if (e.keyCode == 27) { // esc
    if ($helpPopupStatus) {
        $('#popup-help').hide();
        $("#popup-help").removeClass('popup-help');
        $helpPopupStatus = '';
    } else {
        if ($checkboxInnerPopupStatus) {
            if($("#popup").hasClass('popup-checkbox-filters')){$("#popup").removeClass('popup-checkbox-filters');}
            $("#popup .popup-wrapper").html($checkboxInnerPopupContent);
            $(".popup-filter .icon-help").focus();
            $checkboxInnerPopupStatus = '';
        } else {
            if ($checkboxPopupStatus) {
                $('#popup').hide();
                if($("#popup").hasClass('popup-checkbox-journals')){$("#popup").removeClass('popup-checkbox-journals');}
                if($("#popup").hasClass('popup-checkbox-categories')){$("#popup").removeClass('popup-checkbox-categories');}
                if($("#popup").hasClass('popup-checkbox-indicators')){$("#popup").removeClass('popup-checkbox-indicators');}
                $checkboxPopupStatus.focus();
                $checkboxPopupStatus = '';
            }
            if ($filterPopupStatus) {
                $('#popup').hide();
                if($("#popup").hasClass('popup-filter')){$("#popup").removeClass('popup-filter');}
                if($("#popup").hasClass('popup-action-share')){$("#popup").removeClass('popup-action-share');}
                if($("#popup").hasClass('popup-action-download')){$("#popup").removeClass('popup-action-download');}
                if($grayscaleStatus.hasClass('grayscale')){$grayscaleStatus.removeClass('grayscale');}
                $filterPopupStatus.focus();
                $filterPopupStatus = '';
            }
            if ($linkMenuStatus) {
                $linkMenuStatus.parent().removeClass('show-subnav');
                $linkMenuStatus.focus();
                $linkMenuStatus = '';
            }
        }
    }
  } 
});

});
$(".popup").click(function (event) {
	$target = $(event.target);
	if (!event.target) {
		$target = event.srcElement;
	}
    if($target.is(".icon-close")){
        if ($checkboxPopupStatus) {
			$('#country-popup').hide();$('#publisher-popup').hide();$('#category-popup').hide();$('#popupIndicators').hide();$('#journal-popup').hide();
            $checkboxPopupStatus = '';
        }
    }
}); 

function eventTrackCusIndicators(eventCategory, eventAction, eventLabel) {
	ga('send', 'event', eventCategory, eventAction, eventLabel);
}

function eventTrackCusIndicatorsWithValue(eventCategory, eventAction, eventLabel, eventValue) {
	ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue);
}

function pageViewTrackCusIndicators(pageName) {
	ga('send', 'pageview', '', '', pageName);
}
