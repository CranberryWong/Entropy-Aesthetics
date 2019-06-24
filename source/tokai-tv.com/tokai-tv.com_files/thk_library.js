function set_tokaitv_news(){
	var url = '/tokainews/portal_newslist.js';
	var array_news = new Array();
	var video_area ='';
	var headline_area ='';
	var count = 0;

	//データの取得
	$.getJSON(
		url,
		function(data,status){
			if(status == 'success'){
				//alert('読み込みに成功しました。');
			}
			$.each( data , function(index,value){
				array_news.unshift(data[index]);
			});
			//html作成 
			//tokai-tv.com/にアクセスするとPC→/index.html　SP→/smp/にリダイレクト) 
			if(location.pathname === '/index.html' || location.pathname === '/smp/' || location.pathname === '/smp/index.html'){
				//トップページ 
				for(var i = 0 ; i < 5 ; i++){
					$.each(array_news[i],function(index,value){
						var entry_date = array_news[i][index]["date"].slice(0,10).replace(new RegExp('/',"g"),'');
						var article_url = '/tokainews/article.php?i=' + array_news[i][index]["id"] + '&date='+entry_date ;
						if(video_area ==''){
							if(array_news[i][index]["title"].length < 42){
								var entry_title=array_news[i][index]["title"];
							}else{
								var entry_title=array_news[i][index]["title"].slice(0,42) + "...";
							}
							var news_img ='common/image/noimage.png';
							if(array_news[i][index]["image_path"] != ''){
								news_img = array_news[i][index]["image_path"].replace(/^.\//, "");
							}
							video_area = '<a href="'+article_url+'"><time>'+array_news[i][index]["date"]+'</time><figure><img src="/tokainews/'+ news_img + '" alt=""></figure><span class="title">'+entry_title+'</span></a>';
						}else if(count < 4){
							if(array_news[i][index]["title"].length < 30){
								var entry_title=array_news[i][index]["title"];
							}else{
								var entry_title=array_news[i][index]["title"].slice(0,30) + "...";
							}
							headline_area += '<li><a href="'+article_url+'">'+ entry_title +'</a></li>';
							count++;
						}
					});
					if(count>=4 &&video_area !=''){
						break;
					}
				}
				$('#headline_first').append(video_area);
				$('#headline_second').html(headline_area);
			}else{
				//下層ページ 
				for(var i = 0 ; i < 5 ; i++){
					$.each(array_news[i],function(index,value){
						var entry_date = array_news[i][index]["date"].slice(0,10).replace(new RegExp('/',"g"),'');
						var article_url = '/tokainews/article.php?i=' + array_news[i][index]["id"] + '&date='+entry_date ;
						if(count < 4){
							if(array_news[i][index]["title"].length < 30){
								var entry_title=array_news[i][index]["title"];
							}else{
								var entry_title=array_news[i][index]["title"].slice(0,30) + "...";
							}
							headline_area += '<li><a href="'+article_url+'">'+ entry_title +'</a></li>';
							count++;
						}
					});
					if(count>=4){
						break;
					}
				}
				$('.headline ul').html(headline_area);
			}
			//ニュースが0件の時 
			if(headline_area == ''){
				headline_area += '<li>本日のニュースはありません。<br>ニュースが入り次第更新いたします。</li>';
			}
		}
	);
}
//イベント ジャンル表示
function get_event_genre(genre){
	switch(genre){
		case "0":
			return '<b class="iconEvent">音楽</b>';
		case "1":
			return '<b class="iconMusic">ステージ</b>';
		case "2":
			return '<b class="iconSports">スポーツ</b>';
		case "3":
			return '<b class="iconArt">イベント</b>';
		case "4":
			return '<b class="iconStage">アート</b>';
		case "5":
			return '<b class="iconOther">その他</b>';
	}
}
//イベント 販売情状況表示
function get_event_info(info){
	switch(info){
		case "0":
			return '';
		case "1":
			return '<b class="info1">先行販売</b>';
		case "2":
			return '<b class="info2">発売中</b>';
		case "3":
			return '<b class="info3">完売</b>';
		case "4":
			return '<b class="info4">ご招待</b>';
	}
}


//ピックアップコンテンツ セット
function set_pickup_contents(){
	//イベントカレンダー
	if($('.event_area').length){
		var param="";
		$.getJSON('/events_banner/pc/banner_list.js', function(json) {
			for (var i = 1; i <= 4 ; i++) {
				param += '<li class="event_item">';
				param += '<a href="'+json['0top'][i].link_url_pc+'" target="'+json['0top'][i].link_target+'">';
				param += '<span class="icon">';
				param +=  get_event_genre(json['0top'][i].genre) + get_event_info(json['0top'][i].sub_info);
				param += '</span>';
				param += '<figure><img src="'+json['0top'][i].img_url_mini+'" alt="'+json['0top'][i].title+'"></figure>';
				param += '<strong class="title">'+json['0top'][i].title+'</strong>';
				param += '<time>'+json['0top'][i].small_explain+'</time>';
				param += '</a>';
				param += '</li>';
			}
			$('.event_list').html(param);

		});
	}

	$(".pickup_contents_navi li").on('click', function() {
		var index = $('.pickup_contents_navi li').index(this);
		if(index !=3){
			$(".pickup_contents_navi li").removeClass("active");
			$(".pickup_contents_box > div").removeClass("view");
			$(this).addClass("active");
			$(".pickup_contents_box > div:nth-child("+ (index+1) + ")").addClass("view");
		}
	});
}
