/*! sbs.js v1.0 | (c) 2014 G.Lee <77271189@qq.com> */
;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {

    /*! 对联广告 */
    $.cpsSbs = function(options){

        var defaults = {
            wrap: '.cps_sbs',   //广告容器
            allowClose: true,   //是否允许关闭
            closePos: 'top',    //关闭按钮的位置，可选值： top, bottom, both：上下都有
            closeCls: 'close',  //关闭按钮的样式
            close: 'both',      //可选值， both：关闭全部, self：关闭自己
            top: 'auto',        //距离顶部位置，默认auto，自动判断放在中间
            left: 10,           //距离左边位置
            right: 10,          //距离右边位置
            bottom: 10,         //距离底部位置
            fixed: true,        //是否固定显示位置, 值为false则随屏幕滚动
            position: 'left',   //默认位置，当广告只存在1个的时候生效， 可选 left, right
            minScreen: 800      //当浏览器内容区域宽度达到此值时，不在显示广告，为0 表示永远显示
        };
        var opts = $.extend(defaults, options);

        var wrap = $(opts.wrap),
            closeBtn = '<div class="cps_sbs_close '+opts.closeCls+'"></div>';

        (function init(){
            if( $(opts.wrap).length == 0 ){
                console.error('请确认容器 '+opts.wrap+' 是否存在');
                return;
            } else if( $(opts.wrap).length > 2 ){
                console.error('容器 '+opts.wrap+' 超出2个');
                return;
            }
            $(wrap).addClass('cps_sbs');    //给容器添加样式

            if( opts.allowClose == true ){  //关闭按钮操作
                if(opts.closePos == 'top'){     //如果是在顶部
                    $(wrap).prepend( closeBtn );
                } else if(opts.closePos == 'bottom'){   //如果在底部
                    $(wrap).append( closeBtn );
                } else if(opts.closePos == 'both'){     //如果全部都有
                    $(wrap).prepend( closeBtn ).append( closeBtn );
                }
            }

            if(opts.fixed === true) {
                $(wrap).css({"position": "fixed"});
            }
            if(opts.fixed === true) {
                $(wrap).css({"position": "fixed"});
            }
            if(opts.allowClose === true){   //是否允许关闭
                $(wrap).find('.cps_sbs_close').on("click", function(){
                    if( opts.close == 'both' ){
                        $(wrap).fadeOut();
                    } else {
                        $(this).parent().fadeOut();
                    }
                });
            }

            show();
            $(window).resize(function(){    //给浏览器窗口尺寸发生变化时添加事件
                show();
            })

        })();

        function show(){

            var _screen = $(window).width();
            if(_screen <= opts.minScreen && opts.minScreen != 0) {
                $(wrap).hide();
            } else {

                if( $(wrap).length == 1 ){  //如果只有一个容器
                    if( opts.position == 'left' ){
                        $(wrap).css({'left': opts.left + 'px'});
                    } else if( opts.position == 'right' ){
                        $(wrap).css({'right': opts.right + 'px'});
                    }
                } else if( $(wrap).length == 2 ){   //如果是2个容器
                    $(wrap).each(function(i){
                        if(i == 0){
                            $(this).css({'left': opts.left + 'px'});
                        } else {
                            $(this).css({'right': opts.right + 'px'});
                        }
                    })
                }

                if( opts.top === 'auto'){   //如果高度自动获取，则显示在屏幕垂直的中央
                    var _bh = $(window).height();
                    var _sh = $(wrap).height();
                    $(wrap).css({'top': (_bh - _sh) /2 + 'px'});
                } else {    //否则按照指定的top高度显示
                    $(wrap).css({'top': opts.top + 'px'});
                }

                $(wrap).show(); //显示广告

            }


        }

    }
}));
