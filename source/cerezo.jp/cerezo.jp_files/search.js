    function buttonUp(){
         var valux = $('.sb-search-input').val(); 
            valux = $.trim(valux).length;
            if(valux !== 0){
                $('.sb-search-submit').css('z-index','99');
            } else{
                $('.sb-search-input').val(''); 
                $('.sb-search-submit').css('z-index','-999');
            }
    }
    
    $(document).ready(function(){
        var submitIcon = $('.sb-icon-search');
        var submitInput = $('.sb-search-input');
        var searchBox = $('.sb-search');
        var isOpen = false;
        
        $(document).mouseup(function(){
            if(isOpen == true){
            submitInput.val('');
            $('.sb-search-submit').css('z-index','-999');
            submitIcon.click();
            }
        });
        
        submitIcon.mouseup(function(){
            return false;
        });
        
        searchBox.mouseup(function(){
            return false;
        });
                
        submitIcon.click(function(){
            if(isOpen == false){
                searchBox.addClass('sb-search-open');
                $('.toggle-btn').css('z-index','-999');
                $('#lang').css('z-index','-999');
                $('.logo').css('z-index','10');
                $('.sb-icon-search-active').css('display','block');
                isOpen = true;
            } else {
                searchBox.removeClass('sb-search-open');
                $('.toggle-btn').css('z-index','599');
                $('#lang').css('z-index','599');
                $('.logo').css('z-index','600');
                $('.sb-search-input ').css('z-index','600');
                isOpen = false;
            }
    });

});