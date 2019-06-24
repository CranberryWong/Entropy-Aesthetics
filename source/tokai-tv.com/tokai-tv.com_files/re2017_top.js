$(function () {
	//PCサーチメニュー
	$(".thk_tvprogram_navigation .search_box .btn").on('click', function () {
		if ($(".thk_tvprogram_navigation .search_box.active").length) {
			$(".thk_tvprogram_navigation .search_box").removeClass("active");
		} else {
			$(".thk_tvprogram_navigation .search_box").addClass("active");
		}
	});

	//動画バナーの設定 初期表示させておきたい場合使用 要対象に.active
	//$("#thk_top_contents .movie_banner").removeClass("active");
	//setTimeout("remove_banner()",4000);

	//ピックアップコンテンツの設定
	//アナウンサーブログ情報取得
	$(".announcer_list").load("/announcer/thk_announcer_list.html",set_pickup_contents());
	$(".movie_area .movie_list,.recommend_area .recommend_list").bxSlider({
			auto: false,
			slideWidth: 280,
			minSlides:3,
			maxSlides:3,
			scroll:1,
			slideMargin: 28,
			pager:false,
			moveSlides: 1
	});

	//東海テレビニュースの取得
	set_tokaitv_news();

	//気象情報
	//天気・気温の切り替え
	$('.btnTenki').on('click', function() {
		$("#thk_news_area .contents_right .kion").css('display','none');
		$("#thk_news_area .contents_right .tenki").css('display','block');
	});
	$('.btnKion').on('click', function() {
		$("#thk_news_area .contents_right .kion").css('display','block');
		$("#thk_news_area .contents_right .tenki").css('display','none');
	});

	/*
	*番組表の生成
	******************************/
	var bangumi_json_url ="/bangumi/program_list.js";
	$.getJSON(
		bangumi_json_url,
		function(data,status){
			if(status == 'success'){
				//alert('読み込みに成功しました。');
			}
			var oa_flg = 0;
			var oa_id = "";
			var bangumi_list_html ="";
			var param_width = 216;
			var now_position = 0;

			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			var hour = date.getHours();
			var minutes = date.getMinutes();

			//桁揃え
			month = ("0"+month).slice(-2);
			day = ("0"+day).slice(-2);
			hour = ("0"+hour).slice(-2);
			minutes = ("0"+minutes).slice(-2);

			var now = year+""+month+""+day+""+hour+""+minutes;

			//NOWONAIR判別
			for(var i = 0 ; i < data.length ; i++){
				var oa_date = data[i]["broadcastStartDate"] +""+ data[i]["broadcastStartTime"];
				if(now < oa_date ){
					oa_id = i-1;
					break;
				}
			}
			//HTML生成
			for(var i = 0; i < data.length;i++){
				var oa_time = data[i]["broadcastStartTime"].slice(0,2)+':'+ data[i]["broadcastStartTime"].slice(-2);
				oa_time = oa_time.replace(/(^0)/g, "");
				if( i < oa_id ){
					var oa_text = '<time class="sun">' + oa_time + '～</time>';
				}else if( i == oa_id ){
					var oa_text = '<time class="onair">NOW ONAIR</time>';
				}else{
					var oa_text = '<time class="moon">'+ oa_time +'～</time>';
				}
				bangumi_list_html += '<li><a href="'+data[i]["url"]+'" target="'+data[i]["target"]+'">'+ oa_text +'<span>'+data[i]["titleName"]+'</span></a></li>';
			}
			//HTML挿入
			$(".bangumi_list").html(bangumi_list_html);
			//初期表示位置の設定
			if(oa_id > 0){
				now_position = "-"+((oa_id * param_width)-(window.innerWidth*0.5)+(param_width*0.5));
			}
			//スライドの限界値の設定
			var min_position = 0 - (param_width * i) + (window.innerWidth*0.5);
			$('#bangumihyo .bangumi_list').css('left',now_position+"px");
			//次へボタンの設定
			$('#bangumihyo .bangumi_next').on('click', function() {
				if(now_position > min_position){
					now_position = now_position - param_width;
					$("#bangumihyo .bangumi_list").animate({left: now_position + "px"},500 );
				}
			});
			//前へボタンの設定
			$('#bangumihyo .bangumi_prev').on('click', function() {
				if(now_position < (window.innerWidth*0.5)-param_width){
					now_position = parseInt(now_position) + param_width;
					$("#bangumihyo .bangumi_list").animate({left: now_position + "px"},500 );
				}
			});
			//スクロール時の表示設定
			$(window).scroll(function() {
				var footer_top = $("#thk_global_footer").offset();
				if ($(this).scrollTop() > 180 && $(this).scrollTop() < footer_top.top-$(window).height()) {
					$("#bangumihyo_wrap").addClass("active");
					$("#bangumihyo").addClass("active");
				} else {
					$("#bangumihyo_wrap").removeClass("active");
					$("#bangumihyo").removeClass("active");
				}
			});
		}
	);

});

////ピックアップコンテンツ セット
//set_pickup_contents()はthk_library.jsに移動しました

// ニュース
cnt = 0;
delay_time = 8;
cut_length = 50;
TDI=0;
scroll_len = 99; // スクロールを開始するタイミングは、この文字数分表示されたとき
stcnt = 0;
array_cnt = 0;
start_point = 0;	// スクロールで表示される文字列の始まり場所
function Telop(){
	word = words[array_cnt];
	if (word.length >= start_point+cnt-1){
		document.clk.digital.value = word.substr(start_point,cnt);
		if (cnt > scroll_len){	// スクロール開始文字数を越えた。
			start_point++;	// 一文字ずつ表示文字列の先頭位置を移動
			TDI = setTimeout("Telop()",2000);
		}
	}
	cnt++;
	if (cnt - word.length == delay_time){
		cnt=0;			// 切抜き文字内のカウントを0に戻す
		start_point=0;		// 文字の切抜き開始位置を0に戻す
		array_cnt++;
		if (array_cnt >= words.length){	// すべて表示したら最初から
			array_cnt = 0;
		}
	}
	clearTimeout(TDI);
	TDI = setTimeout("Telop()",150);
}
function popwin(url,win){
	subwin = window.open(url,win,"width=800,height=500,left=50,screenX=50,resizable=yes,scrollbars=yes,resizable=yes,status=yes,toolbar=yes");
	subwin.focus();
	if (self.frames.name == ""){
		self.name="mainwin";
	}
}
function Show_All_Telop(){
	all_telop = window.open("","","width=800,height=250,left=50,screenX=50,resizable=yes,scrollbars=yes,resizable=yes");
	all_telop.document.write("<font size=-1>");
	for (i=0 ; i<words.length ; i++){
		word = words[i];
		if (word != ""){
			all_telop.document.write(word);
			all_telop.document.write("<br>");
		}
	}
	all_telop.document.write("</font>");
	all_telop.focus();
}
function remove_banner(){
	$("#thk_top_contents .movie_banner").removeClass("active");
}
