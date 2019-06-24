    function onYouTubeIframeAPIReady() {
	var video_id = jQuery("#top_movie").attr("youtube_code");
        ytPlayer = new YT.Player(
            'top_movie', // 埋め込む場所の指定
            {
                videoId: video_id, // YouTubeのID
                playerVars: {
                    loop: 1,//0:ループしない 1:ループする 1の場合playlist設定必須
                    playlist: video_id,//次に流すYoutubeのID
                    controls: 0,//コントローラー無し
                    autoplay: 1,//オートプレイ
                    rel     : 0, // 関連動画非表示
                    showinfo: 0//動画タイトルなど表示しない
                },
                events: {
                    'onReady': onPlayerReady
                }
            }
        );
    }
//プレイ準備完了後
      function onPlayerReady(event) {
        event.target.playVideo();
        event.target.mute();
      }