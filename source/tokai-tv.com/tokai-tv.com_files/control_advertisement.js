$(function() {

    var advertisement_disp_flg = true;
    $.getJSON('/topVideoAdvertisement/disp_flg.js', function(json) {

        if(json.length !== 0) {
            advertisement_disp_flg = json.disp_flg;
        }

        if(advertisement_disp_flg === false) {
            hide_advertisements();
        }

    })
    .error(function () {
        
    });

});


function hide_advertisements() {
    // 空にするclass名確認

    
    $(".adarea .normal").remove();
    $(".advertisement_area").remove();
    $(".adarea .substitution_contents").css('display', 'block');
}
