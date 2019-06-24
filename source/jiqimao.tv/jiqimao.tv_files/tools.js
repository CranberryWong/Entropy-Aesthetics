var apiServer = 'http://apir.jiqimao.tv';
var parserServer = 'http://apick.jiqimao.tv';
var ckplayerServer = 'http://jiqimao.tv/video/ckPlayer/'
var wServer = 'http://119.28.42.219:9527'

var jqm_webTools = jqm_webTools || {}

jqm_webTools =  (function() {

    var cookieTools = {}

    cookieTools.cookieUser = function () {

        var userInfo = cookieTools.getCookie('userInfo');
        if (userInfo && userInfo != ''){
            return JSON.parse(userInfo);
        }
    }

    cookieTools.addUserInfo = function (params){

        var curUser = cookieTools.cookieUser();
        if (curUser){
            params.uid = curUser.uid;
            params.usid = curUser.sid
        }

        return params
    }

    cookieTools.getCookie = function (name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

        if(arr=document.cookie.match(reg))
            return decodeURIComponent(arr[2]);
        else
            return null;
    }

    cookieTools.setCookie = function (name,value,days){
        var exp = new Date();
        exp.setTime(exp.getTime() + days*24*60*60*1000);
        document.cookie = name + "="+ encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ';path=/;domain=jiqimao.tv;';
    }

    cookieTools.delCookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = cookieTools.getCookie(name);
        if(cval!=null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }


    //影片
    var movieTools = {}

    movieTools.view = function (sid, type) {

        var params = {sid: sid, type: type, mode: mode}
        params = cookieTools.addUserInfo(params);

        $.ajax({
            url: wServer + '/movie/views',
            type: "get",
            timeout : 15000,
            data: params,
            dataType : "jsonp",
            jsonp: "jsonpcallback",
            jsonpCallback: "jiqimao_jsoncallback" + new Date().getTime(),
            beforeSend: function() {
            },
            error: function(xhr, errorType, error) {
            },
            success: function(data, status, xhr){
            },
            complete: function(xhr, status){
            }
        });
    }


    //广告
    var adTools = {}
    adTools.adFloatTime = 5;
    adTools.adFloatInterval = null;
    adTools.adSlideTime = 5;
    adTools.adSlideInterval = null;

    adTools.loadPlayerBlackboardAd = function () {
        var str = cookieTools.getCookie('jqm-player-blackboard-ad');
        if (str == null || str == ''){
            $('.blackboard').show();
        }
    }

    adTools.loadPlayerFloatAd = function () {
        var str = cookieTools.getCookie('jqm-player-banner-ad');
        if (str == null || str == ''){
            cookieTools.setCookie('jqm-player-banner-ad', '1', 1);
            //倒计时广告
            var $adContainer = $('.ad-img');
            $adContainer.imagesLoaded(function(){
                $('.video-ad').fadeIn(1000);
                adTools.adFloatInterval = window.setInterval(function(){
                    if (adTools.adFloatTime <= 0){
                        $('.video-ad').fadeOut(1000);
                        window.clearInterval(adTools.adFloatInterval);
                    }
                    var str = '广告倒计时: {time}秒';
                    $('.ad-time span').html(str.replace('{time}', adTools.adFloatTime));
                    adTools.adFloatTime --;
                },1000);
            });
        }
    }

    adTools.loadCateBannerAd = function () {
        var str = cookieTools.getCookie('jqm-cate-banner-ad');
        if (str == null || str == ''){
            cookieTools.setCookie('jqm-cate-banner-ad', '1', 1);
            //倒计时广告
            var $adContainer = $('.ad-thumbnail');
            $adContainer.imagesLoaded(function(){
                $('.float-ad').fadeIn(1000);
                adTools.adFloatInterval = window.setInterval(function(){
                    if (adTools.adFloatTime <= 0){
                        $('.float-ad').fadeOut(1000);
                        window.clearInterval(adTools.adFloatInterval);
                    }
                    var str = '广告倒计时: {time}秒';
                    $('.ad-time span').html(str.replace('{time}', adTools.adFloatTime));
                    adTools.adFloatTime --;
                },1000);
            });
        }
    }

    adTools.loadHomeTopCol = function () {
        var $adContainer = $('.top-col img');
        $adContainer.imagesLoaded(function(){
            $('.top-col').slideDown(2000);
            adTools.adSlideInterval = window.setInterval(function(){
                if (adTools.adSlideTime <= 0){
                    $('.top-col').slideUp(1000, function(){
                        $('.site-head').css('position', 'fixed');
                    });
                    window.clearInterval(adTools.adSlideInterval);
                }
                adTools.adSlideTime --;
            },1000);
        });
    }

    adTools.loadHomeOrnAd = function () {
        var str = cookieTools.getCookie('jqm-home-orn-ad');
        if (str == null || str == ''){
            cookieTools.setCookie('jqm-home-orn-ad', '1', 1);
            $('.orn-ad').show();
        }
    }



    return {
        movieTools: movieTools,
        cookieTools: cookieTools,
        adTools: adTools
    };

})();



var loadScript = loadScript || {}

loadScript = (function() {
    var loadOne = function (url) {
        var dtd = $.Deferred();
        var node = document.createElement('script');
        node.type = "text/javascript";
        var onload = function(){
            dtd.resolve();
        };
        $(node).load(onload).bind('readystatechange', function(){
            if (node.readyState == 'loaded'){
                onload();
            }
        });
        document.getElementsByTagName('head')[0].appendChild(node);
        node.src = url;
        return dtd.promise();
    };

    var load = function(urls) {
        if(!$.isArray(urls)) {
            return load([urls]);
        }
        var ret = [];
        for (var i = 0; i < urls.length; i++) {
            ret[i] = loadOne(urls[i]);
        };
        return $.when.apply($, ret);
    }

    return {
        load: load
    };
})();


