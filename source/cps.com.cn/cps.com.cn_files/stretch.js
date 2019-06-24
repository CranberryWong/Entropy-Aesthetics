/*! stretch.js v1.0 | (c) 2014 G.Lee <77271189@qq.com> */
;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {

    /*! 弹性伸缩广告 */
    $.cpsStretch = function(options){
        var defaults = {
            wrap: '#stretch',   //广告容器
            large: '.large',    //大广告容器
            small: '.small',    //小广告容器
            replay: true,       //是否允许重播
            close: true,        //是否允许关闭
            showSmall: true,    //是否允许显示小广告
            duration: 5,        //大广告显示时间
            show_duration: 1,   //显示过度时间
            hide_duration: 1    //收起过度时间
        };
        var opts = $.extend(defaults, options);
        if( $(opts.wrap).length == 0 ){
            //console.error('请确认伸缩广告是否存在');
            return;
        }
        if( $(opts.wrap).find(opts.large).length == 0 ){
            //console.error('请确认大广告是否存在');
            return;
        }
        if( opts.allowSmall === true && $(opts.wrap).find(opts.small).length == 0 ){
            //console.error('您设置了显示小广告，请确认小广告是否存在');
            return;
        }

        var replayBtn = '<div class="replay"></div>',
            closeBtn = '<div class="close"></div>',
            player = null,
            wrap = $(opts.wrap),
            large = $(wrap).find(opts.large),
            small = $(wrap).find(opts.small);
        (function init(){
            $(wrap).addClass('cps_strech');
            $(large).css({'position': 'relative','width':'1000px'});
            if( opts.close === true ){
                $(large).append(closeBtn).find(".close").on("click", function(){
                    if(player) clearTimeout(player);
                    close();
                });
            }
            $(small).css({'position': 'relative','width':'1000px'}).hide();
            if( opts.replay === true ){
                $(small).append(replayBtn).find(".replay").on("click", function(){
                    if(player) clearTimeout(player);
                    play();
                })
            }
            play();
        })();

        function play(){
            if( opts.showSmall === true ){
                $(small).slideUp();    //小容器向上滑动
            }
            $(large).slideDown(opts.show_duration * 1000, function(){
                player = setTimeout(close, opts.duration * 1000);
            });
        }
        function close(){
            $(large).slideUp(opts.hide_duration*1000, function(){
                if( opts.showSmall === true ){
                    $(small).slideDown();    //小容器向下滑动
                }
            });
        }
    }
}));
