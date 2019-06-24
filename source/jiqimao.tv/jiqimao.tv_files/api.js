var jqm_api = jqm_api || {}

jqm_api = (function () {

    //视频
    var video = {}

    //视频-解析
    var vd_play_parser_api = parserServer + '/service/ckplayer/parser';
    video.play = function (sid, type, mode, cb) {
        var params = {sid: sid, type: type, mode: mode};
        ajaxJsonpGet(vd_play_parser_api, params, cb);
    }

    //视频-选集
    var vd_play_episdoe_api = apiServer + '/service/player/episode';
    video.episode = function (sid, cb) {
        var params = {'sid': sid};
        ajaxJsonpGet(vd_play_episdoe_api, params, cb);
    }

    //模板
    var template = {}

    //模板-播放器下方
    var tpl_player_api = apiServer + '/service/player/template';
    template.player = function (sid, type, cb) {
        var params = {'sid': sid, 'type': type};
        ajaxJsonpGet(tpl_player_api, params, cb);
    }


    //广告
    var ad = {}

    //广告-文字
    var ad_playerText_api = '/json/ad/text/data.json';
    ad.playerText = function (cb) {
        var params = {};
        ajaxGet(ad_playerText_api, params, cb);
    }

    //广告-长图
    var ad_playerLong_api = '/json/ad/long/data.json';
    ad.playerLong = function (cb) {
        var params = {};
        ajaxGet(ad_playerLong_api, params, cb);
    }

    //原创视频
    var ugc = {}

    //原创视频-今日看点
    var ugc_todayNews_api = apiServer + '/service/recommend/todayNews';
    ugc.todayNews = function (cb) {
        var params = {};
        ajaxJsonpGet(ugc_todayNews_api, params, cb);
    }

    var ugc_recommend_api = apiServer + '/service/recommend/ugc';
    ugc.recommend = function (cb) {
        var params = {};
        ajaxJsonpGet(ugc_recommend_api, params, cb);
    }


    //影片
    var movie = {}

    //影片-大家都在看
    var movie_hotWatch_api = apiServer + '/service/recommend/hotWatch';
    movie.hotWatch = function (cb) {
        var params = {};
        ajaxJsonpGet(movie_hotWatch_api, params, cb);
    }

    //影片-推荐(赞排行)
    var movie_rankZan_api = apiServer + '/service/activity/movie/zan';
    movie.rankZan = function (sid, cb) {
        var params = {'sid': sid};
        ajaxJsonpGet(movie_rankZan_api, params, cb);
    }

    //影片-赞(排行)
    var movie_rankZanSubmit_api = wServer + '/act/movie/zan/submit';
    movie.rankZanSubmit = function (sid, cb) {
        var params = {'sid': sid};
        ajaxJsonpGet(movie_rankZanSubmit_api, params, cb);
    }

    //影片-榜单
    var movie_rank_api = apiServer + '/service/recommend/move/rank';
    movie.rank = function (type, cb) {
        var params = {'type': type};
        ajaxJsonpGet(movie_rank_api, params, cb);
    }

    //影片-动漫一周更新列表
    var movie_comicWeek_api = apiServer + '/service/recommend/week/comic';
    movie.comicWeek = function (cb) {
        var params = {};
        ajaxJsonpGet(movie_comicWeek_api, params, cb);
    }


    //活动
    var act = {}

    //获取活动信息
    var act_get_api = apiServer + '/service/activity/get';
    act.get = function (sid, cb) {
        var params = {'sid': sid};
        ajaxJsonpGet(act_get_api, params, cb);
    }


    //专题
    var topic = {}

    //获取专题信息
    var topic_get_api = apiServer + '/service/topic/get';
    topic.get = function (sid, cb) {
        var params = {'sid': sid};
        ajaxJsonpGet(topic_get_api, params, cb);
    }

    //专题观看
    var topic_views_api = wServer + '/topic/views';
    topic.views = function (sid, cb) {
        var params = {'sid': sid};
        ajaxJsonpGet(topic_views_api, params, cb);
    }

    //专题赞
    var topic_zan_api = wServer + '/topic/zan';
    topic.zan = function (sid, cb) {
        var params = {'sid': sid};
        ajaxJsonpGet(topic_zan_api, params, cb);
    }


    //用户
    var user = {}

    var user_get_api = apiServer + '/service/user/detail';
    user.get = function (uid, sid, cb) {
        var params = {uid: uid, sid: sid};
        ajaxJsonpGet(user_get_api, params, cb);
    }



    function ajaxJsonpGet(url, params, cb){
        $.ajax({
            url: url,
            type: "get",
            data: params,
            timeout : 15000,
            dataType : "jsonp",
            jsonp: "jsonpcallback",
            jsonpCallback: "jiqimao_jsoncallback" + new Date().getTime(),
            beforeSend: function() {
            },
            error: function(xhr, errorType, error) {
                cb(error, errorType, null);
            },
            success: function(data, status, xhr){
                cb(null, null, data);
            },
            complete: function(xhr, status){
                if (status == 'timeout'){
                    cb('timeout', status, null);
                }
            }
        });
    }


    function ajaxGet(url, params, cb) {
        $.ajax({
            url: url,
            type: "get",
            data: params,
            timeout : 15000,
            dataType : "json",
            beforeSend: function() {
            },
            error: function(xhr, errorType, error) {
                cb(error, errorType, null);
            },
            success: function(data, status, xhr){
                cb(null, null, data);
            },
            complete: function(xhr, status){
                if (status == 'timeout'){
                    cb('timeout', status, null);
                }
            }
        });
    }


    return {
        ad: ad,
        video: video,
        template: template,
        ugc: ugc,
        movie: movie,
        act: act,
        user: user,
        topic: topic
    }

})()