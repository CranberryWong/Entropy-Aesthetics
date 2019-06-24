//index (jQuery) ver.20170413
//バス会社ロゴ画像ローテーション
$(document).ready( function() {
	// 会社ロゴ名取得
	var arrBusLogo = [];
	$.ajax({
		type: "GET",
		url: "/hon/CompanyLogo",
		dataType: "json",
		cache: true,
		async: false, /* 同期的に取得 */
		success: function (thisData) {
			arrBusLogo = thisData;
		}
	});

// Int ---------------------------------------------------------------
// ロゴ画像格納ディレクトリ
	var busLogoPath = "/hon/NewContent/Images/buslogo/";
// 表示枚数
	var intDispImages = 6;
// ロゴ画像サイズ
	var intImgWidth = 220;
	var ingImgHeight= 40;
// スライドのタイミング(ms)
	var intSlideTiming = 7000;
// フェードインのスピード(ms)
	var intFadeTiming = 888;

// Event : onLoad **********************************************************************************

// ロゴデータのシャッフル
	var arrBusLogoShuffled = shuffleArray(arrBusLogo);

// 表示グループの個数
	var intGroupCnt = Math.ceil( (arrBusLogoShuffled.length/intDispImages) );

// 初期表示をセット
	$("#busLogo").empty();
	$("#busLogo").append(mkImageGroup(0));
	$("#busLogo ul:first").show();
// ロゴ画像のセットが二組以上の場合、インターバルを実行
	if(intGroupCnt>1){
		//初期表示の次のプリロードをセット
		$("#busLogo").append(mkImageGroup(1));
		//プリロードの画面番号
		var intPreloadNo = 1;
		//インターバルセット
		var intervalSlide = setInterval(function(){
			intPreloadNo++;
			if(intPreloadNo >= intGroupCnt ) intPreloadNo = 0;
			//現在の削除
			$("#busLogo ul:last").css("opacity","0");
			$("#busLogo ul:first").remove();
			$("#busLogo ul:first").show().animate({opacity: 1}, intFadeTiming );
			//プリロードの追加
			$("#busLogo").append(mkImageGroup(intPreloadNo));
		}, intSlideTiming);
	}

// Functions ***************************************************************************************
// func:シャッフル（Fisher–Yates shuffle）
	function shuffleArray(thisArray){
		var n = thisArray.length;
		for(var i = n - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var tmp = thisArray[i];
			thisArray[i] = thisArray[j];
			thisArray[j] = tmp;
		}
		return thisArray;
	}
// func:プリロードのセット（非表示状態で読み込む）
	function mkImageGroup(thisGroupNo){
		var objImageSet = $("<ul/>",{"class":"layout-flex"}).css("display","none");
		var intNumber = thisGroupNo * intDispImages;
		for(var i=0;i<intDispImages;i++){
			if(arrBusLogoShuffled[i+intNumber] != null) {
				objImageSet.append( $("<li/>") );
				objImageSet.find("li:last").append( $("<img/>",{
					"src":busLogoPath + arrBusLogoShuffled[i+intNumber],
					"alt":arrBusLogoShuffled[i+intNumber],
					"width":intImgWidth,
					"height":ingImgHeight
				}));
			}
		}
		return objImageSet;
	}


//**************************************************************************************************
});
