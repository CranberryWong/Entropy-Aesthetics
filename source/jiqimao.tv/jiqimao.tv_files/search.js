/**
 * Created by RueiBin on 18/3/20.
 */
var _w = window;

$(document).ready(function() {

    //搜索
    $('.search').on('click', function(){
        var keyword = $('.keyword').val();
        if("" != keyword && keyword){
            //提交统计
            _hmt.push(['_trackEvent', 'web_page_search', 'web_page_search_click', "web_page_search_click_"+keyword]);
            goSearch(keyword);
            return false;
        }
    });

    $("input").keypress(function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (keyCode == 13){
            var keywordStr = $('.keyword').val();
            if (keywordStr && keywordStr.length != 0){
                if (keywordStr.indexOf('<script>') >= 0 || keywordStr.indexOf('alert(') >= 0 || keywordStr.indexOf('eval(') >= 0){
                    return false;
                }else{
                    //提交统计
                    _hmt.push(['_trackEvent', 'web_page_search', 'web_page_search_keypress', "web_page_search_keypress_"+keywordStr]);
                    goSearch(keywordStr);
                    return false;
                }
            }
        }
    });

    $(document).click(function (e) {
        var drag = $(".search-result"),
            dragel = $(".search-result")[0],
            target = e.target;
        if (dragel !== target && !$.contains(dragel, target)) {
            $('.search-result').hide();
        }
    });

    $(".search-inner input[type='text']").removeAttr("disabled");

});

function goSearch(keywordStr){
    var curUrl = window.location.href;
    if (curUrl.indexOf("search/video") >= 0){
        window.location.href = '/search/video/' + encodeURIComponent(keywordStr);
        return false;
    }else{
        window.open('/search/video/' + encodeURIComponent(keywordStr));
        return false;
    }
}