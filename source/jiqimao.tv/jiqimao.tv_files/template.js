var jqm_template = jqm_template || {}

jqm_template =  (function() {

    var player = {}

    //选集模板
    var ply_episode = player.episode = {}
    ply_episode.movieType = 0;
    ply_episode.maxShow = 45;
    ply_episode.showTotal = 0;
    ply_episode.currentPage = 1;
    ply_episode.currentEpisode = 1;
    ply_episode.currentEpisodeIndex = 1;
    ply_episode.todayPage = 0;

    ply_episode.init = function (data) {
        var episodeData = data.data;
        if (episodeData && episodeData.length > 0){
            var curEpisodeData = episodeData[0];
            inputEpisode(curEpisodeData, data.sid, data.movie);

            episodeAddEvent();
        }
    }

    function inputEpisode(curEpisodeData, curSid, movieData) {
        $(".episode-list").html('');
        var episodes = curEpisodeData.episodes;
        ply_episode.movieType = movieData.type
        var htmlStr = '';
        for (var i=0; i<episodes.length; i++){
            var episodeItem = episodes[i];
            var episodeTitle = episodeItem.episode;
            if (3 == ply_episode.movieType || 4 == ply_episode.movieType){
                episodeTitle = episodeItem.name
            }
            if (curSid == episodeItem.sid){
                ply_episode.currentEpisode = episodeItem.episode;
                ply_episode.currentEpisodeIndex = i;
                htmlStr += '<li><a href="javascript:void(0);" class="active" title="' + episodeItem.name + '" data-id="' + episodeItem.sid + '">' + episodeTitle + '</a></li>';
            }else{
                htmlStr += '<li><a onclick=' + '"_hmt.push(["_trackEvent", "web_player", "web_player_click", "web_player_click_' + movieData.name + '_' + episodeTitle + '"])"' + ' href="javascript:void(0);" title="' + episodeItem.name + '" data-id="' + episodeItem.sid + '">' + episodeTitle +'</a></li>';
            }

        }
        if (htmlStr.length > 0){
            $(".episode-list").append(htmlStr);
            if (3 == ply_episode.movieType){
                ply_episode.maxShow = 27
                $('.play-btns li').css('width', '33.3%')
            }
            if (4 == ply_episode.movieType){
                ply_episode.maxShow = 9
                $('.play-btns li').css('width', '100%')
            }
            ply_episode.showTotal = $(".episode-list li").length;
            if(ply_episode.showTotal > ply_episode.maxShow){
                ply_episode.currentPage = parseInt( (ply_episode.currentEpisodeIndex) / ply_episode.maxShow) + 1;
            }
            showEpisode();
            showPage();
            $('.play-right-inner').show();
        }
    }

    function showEpisode() {
        $(".episode-list li").show();
        var startIndex = (ply_episode.currentPage - 1) * ply_episode.maxShow;
        var endIndex = ply_episode.currentPage * ply_episode.maxShow - 1;

        $(".episode-list li").eq(startIndex).prevAll().hide();
        $(".episode-list li").eq(endIndex).nextAll().hide();
    }

    function showPage() {
        if (hasNextPage()){
            $('.pager-next').removeClass('disabled');
        }else{
            $('.pager-next').addClass('disabled');
        }

        if (hasPrePage()){
            $('.pager-pre').removeClass('disabled');
        }else{
            $('.pager-pre').addClass('disabled');
        }

        $('.play-two-btn').show();
    }

    function hasNextPage() {
        var pageCount = Math.ceil(ply_episode.showTotal / ply_episode.maxShow);
        if (ply_episode.currentPage < pageCount){
            return true;
        }

        return false;
    }

    function hasPrePage() {
        var pageCount = Math.ceil(ply_episode.showTotal / ply_episode.maxShow);
        if (ply_episode.currentPage <= pageCount && ply_episode.currentPage != 1){
            return true;
        }

        return false;
    }

    function episodeAddEvent() {

        $(document).on("click",".episode-list li",function(){
            var sid = $(this).find('a').attr('data-id');
            if (sid){
                window.location.href = ckplayerServer + sid;
                return false;
            }
        });

        $(document).on("click", ".play-two-btn .pager-pre", function(){
            ply_episode.currentPage = ply_episode.currentPage - 1;
            if (ply_episode.currentPage <= 0){
                ply_episode.currentPage = 1;
            }
            showEpisode();
            showPage();
        });

        $(document).on("click", ".play-two-btn .pager-next", function(){
            ply_episode.currentPage = ply_episode.currentPage + 1;
            var count = Math.ceil(ply_episode.showTotal / ply_episode.maxShow);
            if (ply_episode.currentPage > count){
                ply_episode.currentPage = count;
            }
            showEpisode();
            showPage();
        });

    }


    //播放页面多源模板
    var ply_change = player.change = {}

    ply_change.init = function (data) {
        inputPlayerChange(data);

        playerChangeAddEvent();
    }

    function inputPlayerChange(data) {
        var movie = data.movie;
        var resourceData = data.data;

        var lineListHtmlStr = initPlayerChangeGroupTemplate(resourceData);
        $('.player-change').append(lineListHtmlStr);

        var htmlStr = '';
        for (var i=1; i<resourceData.length; i++){
            var resourceItem = resourceData[i];
            var resourceHtmlStr = initPlayerChangeDataTemplate(resourceItem, movie.type);
            htmlStr += resourceHtmlStr;
        }
        $('.player-change').append(htmlStr)

        if (resourceData.length > 1){
            if (3 == ply_episode.movieType){
                $('.player-change .resource a').css({'width': '11%'})
            }
            if (4 == ply_episode.movieType){
                $('.player-change .resource a').css({'width': '24.8%'})
            }

            $('.player-change').show();
        }
    }

    function initPlayerChangeGroupTemplate(resourceData) {
        var htmlStr = '<div class="line-list">';
        for (var i=1; i<resourceData.length; i++){
            var resource = resourceData[i];
            var group = resource.group;

            htmlStr += '<span data-name="' + group.sourceName + '">' + group.sourceName + '</span>';
        }

        htmlStr += '</div>'

        return htmlStr;
    }

    function initPlayerChangeDataTemplate(resourceData, movieType) {
        var group = resourceData.group;
        var episodes = resourceData.episodes;

        var htmlStr = '<div class="resource clearfix" data-name="' + group.sourceName + '">';
        for (var i=0; i<episodes.length; i++){
            var episodeItem = episodes[i];
            var episodeTitle = episodeItem.episode;
            if (3 == movieType || 4 == movieType){
                episodeTitle = episodeItem.name
            }
            htmlStr += '<a href="javascript:void(0);" title="' + episodeItem.name + '" data-id="' + episodeItem.sid + '">' + episodeTitle + '</a>';

        }

        htmlStr += '</div>'

        return htmlStr;
    }

    function playerChangeAddEvent() {

        $(document).on("click", ".player-change .line-list span", function () {
            var sourceName = $(this).attr('data-name');
            if (sourceName && sourceName != ''){
                $('.player-change .line-list span').removeClass('active');
                $(this).addClass('active');
                $('.player-change .resource').hide();
                $('.player-change .resource[data-name="' + sourceName + '"]').show();
            }
        })

        $(document).on("click", ".player-change .line-list span.active", function () {
            $('.player-change .line-list span').removeClass('active');
            $('.player-change .resource').hide();
        })

        $(document).on("click", ".player-change .resource a", function () {
            var sid = $(this).attr('data-id');
            if (sid){
                window.location.href = ckplayerServer + sid;
                return false;
            }
        })
    }


    //播放器下方模块
    var ply_bottom = player.bottom = {}

    //第一版本
    ply_bottom.boxV1 = function () {
        var htmlStr = boxV1Template();
        $('.player-bottom-wrap').html(htmlStr);
    }

    function boxV1Template() {
        var htmlStr = '';

        htmlStr += msgBoxTemplate();
        htmlStr += '<div class="long-ad-box"></div>';
        htmlStr += playBoxTemplate();

        return htmlStr
    }

    //第二版本
    ply_bottom.boxV2 = function () {
        var htmlStr = boxV2Template();
        $('.player-bottom-wrap').html(htmlStr);

        var commentWrapEle = $('.player-bottom-wrap').find('.comment-section');
        if (commentWrapEle.length > 0){
            var commentWrapHtmlStr = initCommentWrapTemplate(sid, ctype);
            commentWrapEle.html(commentWrapHtmlStr);
        }

        var rankWrapEle = $('.player-bottom-wrap').find('.rank-section');
        if (rankWrapEle.length > 0){
            var movieRankHtmlStr = initMovieRankTemplate(mtype);
            $('.player-bottom-wrap .rank-section').html(movieRankHtmlStr);
        }
    }

    function boxV2Template() {
        var htmlStr = '';
        htmlStr += '<div class="player-bottom-box">';
        htmlStr += '<div class="info-box clearfix">';
        htmlStr += '<div class="box-left fl">';
        htmlStr += '<div class="section act-section">';
        htmlStr += '</div>';
        htmlStr += '<div class="section">';
        htmlStr += '<div class="head-1">';
        htmlStr += '<span class="title-1">大家都在看</span>';
        htmlStr += '</div>';
        htmlStr += '<div class="bottom-1">';
        htmlStr += '<div class="play-tv" id="play-tv">';
        htmlStr += '<div class="btns-img prev-btn"></div>';
        htmlStr += '<div class="btns-img next-btn"></div>';
        htmlStr += '<div class="play-tv-inner">';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="section comment-section">';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="box-right fr">';
        htmlStr += '<div class="section rank-section">';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';

        return htmlStr;
    }

    function initCommentWrapTemplate(sid, type) {
        var htmlStr = '';

        htmlStr += '<div id="comment_w" data-id="' + sid + '" data-type="' + type + '">';
        htmlStr += '</div>';

        return htmlStr;
    }

    function initMovieRankTemplate(type) {
        var htmlStr = '';

        htmlStr += '<div class="head-1">';
        var typeStr = '';
        if (1 == type){
            typeStr = '动漫榜';
        }else if (2 == type){
            typeStr = '电视榜';
        }else if (3 == type){
            typeStr = '综艺榜';
        }else if (4 == type){
            typeStr = '电影榜';
        }
        htmlStr += '<span class="title-1">' + typeStr + '</span>';
        htmlStr += '</div>';

        htmlStr += '<div class="bottom-1">';
        htmlStr += '<div class="rank-tv">';
        htmlStr += '</div>';
        htmlStr += '</div>';

        return htmlStr;
    }


    //第三版本
    ply_bottom.boxV3 = function () {
        var htmlStr = initPlayerBottomSingleTemplate();
        $('.player-bottom-wrap').html(htmlStr);
    }

    function initPlayerBottomSingleTemplate() {
        var htmlStr = '';

        htmlStr += '<div class="long-ad-box"></div>';
        htmlStr += playBoxTemplate();

        return htmlStr
    }


    function msgBoxTemplate () {
        var htmlStr = '';

        htmlStr += '<div class="msg-box clearfix">';

        htmlStr += '<div class="msg-box-left fl">';
        htmlStr += '<img src="http://static.jiqimao.tv/web/images/download.png">';
        htmlStr += '<a href="javascript:void(0);">暂无下载资源</a>';
        htmlStr += '</div>';

        htmlStr += '<div class="msg-box-mid text-ad fl">';
        htmlStr += '</div>';

        htmlStr += '<div class="msg-box-right fl">';
        htmlStr += '<img src="http://static.jiqimao.tv/web/images/information.png">';
        htmlStr += '<a href="javascript:void(0);" target="_blank">源站视频链接请戳我</a>';
        htmlStr += '</div>';

        htmlStr += '</div>';

        return htmlStr;
    }

    function playBoxTemplate() {
        var htmlStr = '';

        htmlStr += '<div class="play-box clearfix">';
        htmlStr += '<div class="play-box-left fl">';
        htmlStr += '<div class="box-top clearfix">';
        htmlStr += '<h2 class="three-title"><a href="javascript:;">大家都在看</a></h2>';
        htmlStr += '</div>';
        htmlStr += '<ul class="play-tv" id="play-tv">';
        htmlStr += '<div class="btns-img prev-btn"></div>';
        htmlStr += '<div class="btns-img next-btn"></div>';
        htmlStr += '<div class="play-tv-inner">';
        htmlStr += '</div>';
        htmlStr += '</ul>';
        htmlStr += '</div>';
        htmlStr += '<div class="play-box-right fl">';
        htmlStr += '<h2 class="three-title"><a href="javascript:;">今日看点</a></h2>';
        htmlStr += '<div class="today-list" id="today-list">';
        htmlStr += '<div class="today-list-inner">';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="today-btns clearfix" id="today-btns">';
        htmlStr += '<span class="fl today-btn prevDefault prevActive"></span>';
        htmlStr += '<span class="fr today-btn nextDefault nextActive"></span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';

        return htmlStr;
    }


    //播放器下方的活动专题
    var ply_act = player.act = {}

    ply_act.init = function (data) {
        var htmlStr = initPlayerRecommendActDataTemplate(data);

        $('.player-bottom-wrap .act-section').html(htmlStr);
    }

    function initPlayerRecommendActDataTemplate(act){

        var htmlStr = '';

        htmlStr += '<div class="head-1">';
        htmlStr += '<span class="title-1">相关专题</span>';
        htmlStr += '<a onclick="_hmt.push([\'_trackEvent\', \'player_recommend\', \'web_player_recommend_more_click\', \'web_player_recommend_more_click_act\'])" href="http://miao.jiqimao.tv/act/list" target="_blank" class="more-1 fr">查看更多></a>';
        htmlStr += '</div>';

        htmlStr += '<div class="bottom-1 clearfix">';
        htmlStr += '<div class="cover fl">';
        htmlStr += '<img src="' + act.cover_s + '" alt="' + act.name + '">';
        htmlStr += '</div>';
        htmlStr += '<div class="detail fl">';
        htmlStr += '<div class="title-line">';
        htmlStr += '<span class="title-mid">' + act.name + '</span>';
        htmlStr += '<a onclick="_hmt.push([\'_trackEvent\', \'player_recommend\', \'web_player_recommend_act_click\', \'web_player_recommend_act_click_' + act.name + '\'])" class="button-mid link-button" href="' + act.linkStr + '" target="_blank">点击投票</a>';
        htmlStr += '</div>';
        htmlStr += '<div class="tro-line">';
        htmlStr += '<span class="label">简介</span>';
        htmlStr += '<span class="text">' + act.intro + '</span>';
        htmlStr += '</div>';
        htmlStr += '<div class="info-line clearfix">';
        htmlStr += '<div class="views fl">';
        htmlStr += '<span class="label">观看人数</span>';
        htmlStr += '<span class="text">' + act.views + '</span>';
        htmlStr += '</div>';
        htmlStr += '<div class="time fr">';
        htmlStr += '<span class="label">更新时间</span>';
        htmlStr += '<span class="text">' + act.createTime + '</span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';

        return htmlStr;
    }


    //播放器下方的活动专题
    var ply_topic = player.topic = {}

    ply_topic.init = function (data) {
        var htmlStr = initPlayerRecommendTopicDataTemplate(data);

        $('.player-bottom-wrap .act-section').html(htmlStr);
    }

    function initPlayerRecommendTopicDataTemplate(topic){

        var htmlStr = '';

        htmlStr += '<div class="head-1">';
        htmlStr += '<span class="title-1">相关专题</span>';
        // htmlStr += '<a onclick="_hmt.push([\'_trackEvent\', \'player_recommend\', \'web_player_recommend_more_click\', \'web_player_recommend_more_click_topic\'])" href="javascript:;" target="_blank" class="more-1 fr">查看更多></a>';
        htmlStr += '</div>';

        htmlStr += '<div class="bottom-1 clearfix">';
        htmlStr += '<div class="cover fl">';
        htmlStr += '<img src="' + topic.cover_url + '" alt="' + topic.name + '">';
        htmlStr += '</div>';
        htmlStr += '<div class="detail fl">';
        htmlStr += '<div class="title-line">';
        htmlStr += '<span class="title-mid">' + topic.name + '</span>';
        htmlStr += '<a onclick="_hmt.push([\'_trackEvent\', \'player_recommend\', \'web_player_recommend_topic_click\', \'web_player_recommend_topic_click_' + topic.name + '\'])" class="button-mid link-button" href="' + topic.link + '" target="_blank">点击应援</a>';
        htmlStr += '</div>';
        htmlStr += '<div class="tro-line">';
        htmlStr += '<span class="label">简介</span>';
        htmlStr += '<span class="text">' + topic.intro + '</span>';
        htmlStr += '</div>';
        htmlStr += '<div class="info-line clearfix">';
        htmlStr += '<div class="views fl">';
        htmlStr += '<span class="label">观看人数</span>';
        htmlStr += '<span class="text">' + topic.views + '</span>';
        htmlStr += '</div>';
        htmlStr += '<div class="time fr">';
        htmlStr += '<span class="label">更新时间</span>';
        htmlStr += '<span class="text">' + topic.createTime + '</span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';

        return htmlStr;
    }


    //广告
    var ply_ad = player.ad = {}

    //文字广告
    ply_ad.inputTextAd = function (data) {
        var htmlStr = ''
        for (var i=0; i<data.length; i++){
            var item = data[i];
            htmlStr += initPlayerTextAd(item)
        }
        if (data.length > 0){
            $('.player-bottom-wrap .text-ad').html(htmlStr);
        }
    }

    function initPlayerTextAd (item) {
        var htmlStr = '';

        htmlStr += '<a href="' + item.link + '" target="_blank" onclick="_hmt.push([\'_trackEvent\', \'web_player_ad\', \'web_player_ad_text_click\', \'web_player_ad_text_click_' + item.text + '\'])">';
        htmlStr += item.text;
        htmlStr += '</a>';

        return htmlStr;
    }

    //长条banner广告
    ply_ad.inputLongAd = function (data) {
        var len = data.length;
        var random = Math.floor(Math.random()*10);
        var showIndex = random % len;
        var item = data[showIndex];

        var htmlStr = initPlayerLongAd(item);
        $('.player-bottom-wrap .long-ad-box').html(htmlStr)
    }

    function initPlayerLongAd (item) {
        var htmlStr = '';

        var title = item.title;
        htmlStr += '<div class="topic" style="padding: 0 0">';
        htmlStr += '<span>';
        htmlStr += '<a class="float-icon close-ad" href="javascript:;" style="right: 0;"></a>';
        htmlStr += '<a href="' + item.link + '" target="_blank" onclick="_hmt.push([\'_trackEvent\', \'web_ad\', \'web_ad_player_click\', \'web_ad_player_click_' + title + '\'])">';
        htmlStr += '<img src="' + item.cover + '" alt="' + title + '">';
        htmlStr += '</a>';
        htmlStr += '</span>';
        htmlStr += '</div>';

        return htmlStr;
    }

    //右上角推荐排行
    var ply_rankZan = player.rankZan = {}

    ply_rankZan.init = function (data) {
        inputZan(data);
    }

    function inputZan(zanData) {
        if (zanData){
            $('.anli-count').text(zanData.count);
            $('.rank-count').text(zanData.index);
        }
    }


    //推荐模块
    var recommend = {}

    //推荐-原创视频模板
    var rec_ugc = recommend.ugc = {}
    rec_ugc.curTodayNewsTop = 0;
    rec_ugc.curTodayNewsPage = 1;
    rec_ugc.todayNewsPageCount = 0;

    //今日看点
    rec_ugc.initUgcTodayNews = function (data) {
        inputUgcTodayNews(data);

        ugcTodayNewsAddEvent();
    }

    function inputUgcTodayNews(data) {
        var videoArr = data.data;
        var videoArrLength = videoArr.length;
        var htmlStr = '';
        for(var i=0; i<videoArrLength; i++){
            var item = videoArr[i];
            var trackEventStr = 'web_player_news_recommend_click';
            var pushEvenStr = 'web_player_news_recommend_click_' + item.name;
            htmlStr += '<a target="_blank" onclick="_hmt.push([\'_trackEvent\', \'player_recommend\', \'' + trackEventStr + '\', \'' + pushEvenStr + '\'])" title="' + item.name + '" href="' + item.playerLink + '"><img src="' + item.cover + '" alt="" onerror="loadDefaultMin();" />';
            htmlStr += '<p>' + item.name + '</p>';
            htmlStr += '</a>';
        }

        rec_ugc.todayNewsPageCount = Math.ceil(videoArrLength / 3)

        $('.today-list-inner').append(htmlStr);
    }

    function ugcTodayNewsAddEvent() {

        $(document).on('click', '#today-btns .prevActive', function() {
            rec_ugc.curTodayNewsPage -= 1
            if (rec_ugc.curTodayNewsPage <= 0){
                rec_ugc.curTodayNewsPage = 1
                return false;
            }
            var top = $("#today-list").height();
            rec_ugc.curTodayNewsTop += top
            $("#today-list").find('.today-list-inner').animate({
                "top": rec_ugc.curTodayNewsTop
            });
        });

        $(document).on('click', '#today-btns .nextActive', function() {
            rec_ugc.curTodayNewsPage += 1;
            if (rec_ugc.curTodayNewsPage > rec_ugc.todayNewsPageCount){
                rec_ugc.curTodayNewsPage = rec_ugc.todayNewsPageCount
                return false;
            }
            var top = $("#today-list").height();
            rec_ugc.curTodayNewsTop -= top
            $("#today-list").find('.today-list-inner').animate({
                "top": rec_ugc.curTodayNewsTop
            });
        });

    }

    //原创视频推荐
    rec_ugc.initRecommend = function (videoArr) {
        var videoArrLength = videoArr.length;
        var htmlStr = '';
        for(var i=0; i<videoArrLength; i++){
            var item = videoArr[i];
            var trackEventStr = 'sinplayer_ugc_recommend_click';
            var pushEvenStr = 'sinplayer_ugc_recommend_click_' + item.name;
            htmlStr += '<a onclick="_hmt.push([\'_trackEvent\', \'sinplayer_ugc_recommend\', \'' + trackEventStr + '\', \'' + pushEvenStr + '\'])" href="' + item.playerLink + '">';
            htmlStr += '<div class="recommend-item clearfix">';
            htmlStr += '<div class="item-left fl">';
            htmlStr += '<img src="' + item.cover + '" alt="' + item.name + '">';
            htmlStr += '</div>';
            htmlStr += '<div class="item-right fl">';
            htmlStr += '<div class="item-right-top">';
            htmlStr += '<span>' + item.name + '</span>';
            htmlStr += '</div>';
            htmlStr += '<div class="item-right-bottom">';
            htmlStr += '<span class="name">' + item.publisher + '</span>';
            htmlStr += '<span class="play"><i class="icon"></i>' + item.views + '</span>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</a>';
        }
        $('.recommend-list').append(htmlStr);
    }


    //推荐-影视模板
    var rec_movie = recommend.movie = {}

    //大家都在看
    rec_movie.initHotWatchMovie = function (data) {
        inputHotWatchMovie(data);

        hotWatchMovieAddEvent();
    }

    function inputHotWatchMovie(data) {
        var videoArr = data.data;
        var htmlStr = '';
        for(var i=0; i<videoArr.length; i++){
            var item = videoArr[i];
            var title = item.name;
            var trackEventStr = 'web_player_video_recommend_click';
            var pushEvenStr = 'web_player_video_recommend_click_' + title;
            htmlStr += '<a onclick="_hmt.push([\'_trackEvent\', \'player_recommend\', \'' + trackEventStr + '\', \'' + pushEvenStr + '\'])" title="' + title +'" href="' + item.link +'" target="_blank">';
            htmlStr += '<div class="play-tv-img"><img src="' + item.cover + '" alt="" onerror="loadDefaultMid();"></div>';
            htmlStr += '<p class="big">' + title + '</p>';
            htmlStr += '</a>';
        }

        $('.play-tv-inner').append(htmlStr);
    }

    function hotWatchMovieAddEvent() {
        $(document).on('click', '#play-tv .prev-btn', function() {
            $("#play-tv").find('.play-tv-inner').animate({
                "left": "0"
            });
        });

        $(document).on('click', '#play-tv .next-btn', function() {
            var left = $("#play-tv").width();
            $("#play-tv").find('.play-tv-inner').animate({
                "left": -left
            });
        });
    }

    //排行榜
    rec_movie.inputMovieRank = function (data) {
        var htmlStr = '';
        for (var i=0; i<data.length; i++){
            var item = data[i];
            var rankItemHtmlStr = initMovieRankItemDataTemplate(item, i+1);
            htmlStr += rankItemHtmlStr;
        }

        $('.rank-section .rank-tv').html(htmlStr);
    }

    function initMovieRankItemDataTemplate(rank, index) {
        var item = rank.data;
        var scores = rank.scores;

        var htmlStr = '';

        if (index == 1){
            htmlStr += initMovieRankTopDataTemplate(rank);

        }else {

            htmlStr += '<a onclick="_hmt.push([\'_trackEvent\', \'player_recommend\', \'web_player_recommend_rank_click\', \'web_player_recommend_rank_click_' + item.name + '\'])" href="' + item.link + '" target="_blank">';
            var rankClass = 'rank-' + index;
            htmlStr += '<div class="rank-item ' + rankClass + ' clearfix">';
            htmlStr += '<div class="rank-info fl">';
            htmlStr += '<span class="index">' + index + '</span>';
            htmlStr += '<span class="text">' + item.name + '</span>';
            htmlStr += '<span class="play fr"><i class="icon"></i>' + scores + '</span>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</a>';

        }

        return htmlStr
    }

    function initMovieRankTopDataTemplate(rank) {
        var item = rank.data;
        var scores = rank.scores;

        var htmlStr = '';

        htmlStr += '<a href="' + item.link + '" target="_blank">';
        htmlStr += '<div class="rank-item rank-1 clearfix">';
        htmlStr += '<div class="cover fl">';
        htmlStr += '<img src="' + item.cover_h + '" alt="' + item.name + '">';
        htmlStr += '</div>';
        htmlStr += '<div class="rank-info fl">';
        htmlStr += '<span class="index">1</span>';
        htmlStr += '<span class="text">' + item.name + '</span>';
        htmlStr += '<span class="play"><i class="icon"></i>' + scores + '</span>';
        htmlStr += '<span class="link-text">节目简介></span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</a>';

        return htmlStr;
    }

    //一周更新列表
    rec_movie.initComicWeek = function (data) {
        inputComicWeekData(data);

        comicWeekAddEvent();
    }

    function inputComicWeekData(data) {
        //下标0为星期一
        var weekDayIndex = new Date().getDay() - 1;
        if (weekDayIndex == -1){
            weekDayIndex = 6;
        }

        var htmlStr = '';

        for (var i=0; i<7; i++){
            var comicArr = data[i];
            htmlStr += '<ul data-id="' + i + '">';
            if (comicArr){
                for (var j=0; j<comicArr.length; j++){
                    var item = comicArr[j];
                    htmlStr += '<li>';
                    htmlStr += '<div class="update-img">';
                    var trackEventStr = 'web_box_top_comic_' + i + '_click';
                    var pushEvenStr = 'web_box_top_comic_click_' + item.title;
                    htmlStr += '<a onclick="_hmt.push([\'_trackEvent\', \'web_box_top\', \'' + trackEventStr + '\', \'' + pushEvenStr + '\'])" href="' + item.link + '" target="_blank" >';
                    htmlStr += '<img src="' + item.cover + '" alt="' + item.title + '">';
                    htmlStr += '</a>';
                    htmlStr += '</div>';
                    htmlStr += '<div class="update-content">';
                    htmlStr += '<h4>';
                    htmlStr += '<a onclick="_hmt.push([\'_trackEvent\', \'web_box_top\', \'' + trackEventStr + '\', \'' + pushEvenStr + '\'])" href="' + item.link + '" target="_blank" title="' + item.title + '">' + item.title + '</a>';
                    htmlStr += '</h4>';
                    htmlStr += '<p>' + item.updateStatus + '</p>';
                    htmlStr += '</div>';
                    htmlStr += '</li>';
                }
            }
            htmlStr += '</ul>';
        }

        $('.content-weekList').append(htmlStr);

        $('.update-weekList ul li:eq(' + weekDayIndex + ')').addClass('active');
        $('.content-weekList ul:eq(' + weekDayIndex +')').show();
    }

    function comicWeekAddEvent() {
        //选中切换
        $(document).on("click",".section-change li",function(){
            $('.page-count b').removeClass('active');
            $('.page-count b').hide();

            $('.section-change li').removeClass('active');
            $(this).addClass('active');
            var dataId = $(this).attr('data-id');

            $('.content-weekList ul').hide();
            var selector = '.content-weekList ul:eq(' + dataId + ')';
            //判断是否需要分页
            var _width = $(window).width();
            var liLength = $(selector + ' li').length;
            if ((_width < 1200 && liLength > 12) || (_width > 1200 && liLength > 15) ){
                $('.page-count b:eq(0)').addClass('active');
                $('.page-count b').show();
            }else{
                $('.page-count b:eq(0)').addClass('active');
                $('.page-count b:eq(0)').show();
            }
            $(selector).show();
        });

        //分页
        $(document).on("click",".page-count b",function(){
            $('.page-count b').removeClass('active');
            $(this).addClass('active');

            var page = $(this).text();
            var top = 0 - ((page-1) * 250);
            $('.content-weekList ul:visible').animate({
                'margin-top': top + 'px'
            });
        });
    }


    //用户
    var user = {}

    //用户-导航
    var u_nav = user.nav = {}

    //导航-登录成功
    u_nav.success = function (userObj) {
        inputUserSuccess(userObj);

        userSuccessAddEvent();
    }

    function inputUserSuccess(userObj) {
        var htmlStr = '';

        htmlStr += '<a href="javacript:void(0);" class="user">'
        htmlStr += '<img src="' + userObj.cover + '">'
        htmlStr += '<span class="text">' + '个人中心' + '</span>'
        htmlStr += '</a>'
        htmlStr += '<div class="user-panel">';
        htmlStr += '<div class="user-line clearfix">'
        htmlStr += '<span class="nickname fl">' + userObj.nickname + '</span>'
        htmlStr += '<span class="level fr">LV ' + userObj.level + '</span>'
        htmlStr += '</div>'
        htmlStr += '<div class="user-line clearfix">'
        htmlStr += '<a href="/user/account/index" class="fl"><span class="user-center">个人中心</span></a>'
        htmlStr += '<a href="/user/logout/' + userObj.uid + '/' + userObj.sid + '" class="fr"><span class="logout">登出</span></a>'
        htmlStr += '</div>'
        htmlStr += '<div class="triangle_border_up">'
        htmlStr += '<span></span>'
        htmlStr += '</div>'
        htmlStr += '</div>'

        $('.user-inner').html(htmlStr);
    }

    function userSuccessAddEvent() {
        $(document).on('click', '.user', function () {
            $('.user-panel').toggle();
        })
    }

    u_nav.login = function () {
        var htmlStr = '';
        htmlStr += '<a href="/user/login/index" class="login">'
        htmlStr += '<img src="http://static.jiqimao.tv/common/head/user.png">'
        htmlStr += '<span class="login-text">登录 / 注册</span>'
        htmlStr += '</a>'

        $('.user-inner').html(htmlStr);
    }



    return {
        player: player,
        recommend: recommend,
        user: user
    }

})();