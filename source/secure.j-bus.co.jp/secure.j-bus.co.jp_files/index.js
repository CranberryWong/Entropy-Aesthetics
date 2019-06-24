//index (jQuery) ver.20170413

$(document).ready( function() {
// Initialization ----------------------------------------------------
	var csrfToken = $.cookie('CSRF-TOKEN');
// Int ---------------------------------------------------------------

	//出発地/到着地の初期テキスト
		var defaultFromText = $("#tabHighwayFrom a:first").text();
		var defaultToText = $("#tabHighwayTo a:first").text();

// Event : onLoad **********************************************************************************

// Event : onLoad : ダイアログのプリロード（common.js） --------------
	jBusGlobalCommon.setTemplateDialog("place","date","alert");

// Event : onLoad : 本日の日付を代入 ---------------------------------
//	var indexTodayDate = new Date();
//	var indexTodayYYYY = indexTodayDate.getFullYear();
//	var indexTodayMM   = indexTodayDate.getMonth()+1;
//	var indexTodayDD   = indexTodayDate.getDate();
//	var TableOfWeek = ["日","月","火","水","木","金","土"];
//	var indexTodayDDDD = TableOfWeek[indexTodayDate.getDay()];
//	indexTodayMM = ("0" + indexTodayMM).slice(-2);
//	indexTodayDD = ("0" + indexTodayDD).slice(-2);
//	//data属性の埋込
//	$("#tabHighwayDate").attr({
//		"data-yyyymm":indexTodayYYYY+indexTodayMM,
//		"data-dd":indexTodayDD
//	});
//	//表示用テキスト
//	indexTodayMM = parseFloat(indexTodayMM);
//	indexTodayDD = parseFloat(indexTodayDD);
//	var thisText = indexTodayYYYY + "年" + indexTodayMM + "月" + indexTodayDD + "日（" + indexTodayDDDD + "）";
//	$("#tabHighwayDate > a.icon-calendar").text(thisText);

// Event : onLoad : バス会社ロゴ -------------------------------------
// ->別ファイル

// Event : onLoad : スマホ用重要なお知らせ
	$("#notice02 h3").empty();
	$("#notice h3").each(function(){
		var thisText = $(this).text();
		$("<a/>",{"text":thisText}).appendTo($("#notice02 h3"));
	});

// Event : onLoad : お気に入り路線 -----------------------------------
	if(jBusGlobalCommon.chkLogin() || debugForceLogin){
		$("#tabHighwaySubBody .tabs-sub-box ul").remove();
		$("#tabHighwaySubBody .tabs-sub-box p").remove();
		//お気に入り
		$.ajax({
			type: "GET",
			url: "/hon/Favorite/GetListAsync",
			dataType: "json",
			headers: {
				"X-CSRF-TOKEN": csrfToken
			},
			success: function(thisData){
				if(thisData){
					$("<ul/>",{"class":"order-2"}).appendTo($("#tabHighwaySubBody .tabs-sub-box:eq(0)"));
					for(var i=0;i<thisData.length;i++){
						if(i<3){
							var thisLI = $("<li/>",{"class":"js-dialog-date"});
							$("<a/>").attr({
								"data-rocd":thisData[i].rocd,
								"data-gpcd":thisData[i].gpcd
							}).text(thisData[i].routeName).appendTo(thisLI);
							$("#tabHighwaySubBody .tabs-sub-box:eq(0) ul").append(thisLI);
						}else{
							break;
						}
					}
					if( $("#tabHighwaySubBody .tabs-sub-box:eq(0) ul li").length < 3 ){
						$("#tabHighwaySubBody .tabs-sub-box:eq(0) ul").append('<li><br/></li>');
					}
					setEventFavHis($("#tabHighwaySubBody .tabs-sub-box:eq(0)"));
				}else{
					var thisText = "お気に入りはまだ登録されていません。";
					$("<p/>",{"class":"order-2"}).text(thisText).appendTo($("#tabHighwaySubBody .tabs-sub-box:eq(0)"));
				}
			}
		});
		//予約履歴
		$.ajax({
			type: "GET",
			url: "/hon/Reservation/GetHistoryListAsync",
			dataType: "json",
			headers: {
				"X-CSRF-TOKEN": csrfToken
			},
			success: function(thisData){
				if(thisData){
					$("<ul/>",{"class":"order-2"}).appendTo($("#tabHighwaySubBody .tabs-sub-box:eq(1)"));
					for(var i=0;i<thisData.length;i++){
						if(i<3){
							var thisLI = $("<li/>",{"class":"js-dialog-date"});
							$("<a/>").attr({
								"data-rocd":thisData[i].rocd,
								"data-gpcd":thisData[i].gpcd
							}).text(thisData[i].userTicket).appendTo(thisLI);
							$("#tabHighwaySubBody .tabs-sub-box:eq(1) ul").append(thisLI);
						}else{
							break;
						}
					}
					if( $("#tabHighwaySubBody .tabs-sub-box:eq(1) ul li").length < 3 ){
						$("#tabHighwaySubBody .tabs-sub-box:eq(1) ul").append('<li><br/></li>');
					}
					setEventFavHis($("#tabHighwaySubBody .tabs-sub-box:eq(1)"));
				}else{
					var thisText = "最近のご予約履歴はありません。";
					$("<p/>",{"class":"order-2"}).text(thisText).appendTo($("#tabHighwaySubBody .tabs-sub-box:eq(1)"));
				}
			}
		});
		function setEventFavHis(thisTarget){
			// Event : onClick : 高速バス：お気に入り/予約履歴から選ぶ ----------------
			thisTarget.find(".js-dialog-date a").click(function(e){
				//日付が選択済みならすぐに転送し、未選択ならダイアログ表示後転送
				var thisURL = "/hon/Route/Highway"; //結果ページURL
				var thisDTYM = $("#tabHighwayDate").attr("data-yyyymm"); //出発年月(dtym)の読込
				var thisDTDD = $("#tabHighwayDate").attr("data-dd"); //出発日(dtdd)の読込
				var thisGPCD = $(this).attr("data-gpcd");//クリックした箇所のgpcd
				var thisROCD = $(this).attr("data-rocd");//クリックした箇所のrocd
				//日付選択済みの場合
				if(thisDTYM){
					var thisPath = "?gpcd=" + thisGPCD + "&rocd=" + thisROCD + "&dtym=" + thisDTYM + "&dtdd=" + thisDTDD;
					location.href = thisURL + thisPath;
				}else{
				//日付未選択の場合、日付選択（固定表示）
					var thisLocURL = thisURL + "?gpcd=" + thisGPCD + "&rocd=" + thisROCD;
					jBusGlobalCommon.setDialogDateFixedLoc(thisLocURL,"出発日を指定してください",$(this));
				}
				e.preventDefault();
			});
		}
	}


// Event : onLoad : 緊急のお知らせ -----------------------------------------
	$.ajax({
		type: "GET",
		url: "/hon/DialogData/Disaster",
		dataType: "json",
	})
	.then(
		// 通信成功
		function (data) {
			if (data){
				// データあり
				$("#disaster p").append(data.content);
			}
			else{
				// データ無し
				$("#disaster").hide();
			}
		},
		// 通信失敗
		function () {
			$("#disaster").hide();
		}
	);

// Event : onLoad : ブラウザバックの状態保存(popState) ---------------
	loadState();

// Event : onClick *********************************************************************************

// Event : onClick : tabs --------------------------------------------
	$("#tabsName a").click(function(e){
		var thisIndex = $("#tabsName a").index(this);
		$(".tabs-box:eq(" + thisIndex + ")").show().siblings().hide();
		$(this).addClass("current").siblings().removeClass("current");
		e.preventDefault();
	});

// Event : onClick : スマホ用重要なお知らせ
	$("#notice02 h3 a").click(function(){
		var thisIndex = $("#notice02 h3 a").index(this);
		var targetHTML = $("#notice h3:eq(" + thisIndex + ")").next("p").html();
		jBusGlobalCommon.setDialogAlert("info",$(this).text(),targetHTML,$(this),1);
	});

// Event : onClick : 高速バス：お気に入りパネル -------------------------
	$("#tabHighwayFav").click(function(e){
		if( jBusGlobalCommon.chkDispPC() ){
			$("#tabHighwaySubBody").toggleClass("show");//PC版はCSSでのアニメーション
		}else{
			if( $("#tabHighwaySubBody").is(":hidden") ){
				$(this).addClass("is-open");
			}else{
				$(this).removeClass("is-open");
			}
			$("#tabHighwaySubBody").slideToggle();//SP版はスクリプト制御
		}
		e.preventDefault();
	});

// Event : onClick : 高速バス：お気に入りパネル閉じる ----------------
	$("#tabHighwaySub a.btn-close").click(function(e){
		if( jBusGlobalCommon.chkDispPC() ){
			$("#tabHighwaySubBody").toggleClass("show");//PC版はCSSでのアニメーション
		}
		e.preventDefault();
	});


// Event : onClick : 高速バス：出発地/到着地 -------------------------
	$("#tabHighwayFrom a:first, #tabHighwayTo a:first").click(function(e){
		var thisClosestObj = $(this).closest(".js-dialog-place"); //親要素
		var isDialog = thisClosestObj.find(".dialog").length; //重複確認
		if(!isDialog){
			jBusGlobalCommon.setDialogPlace( $(this), thisClosestObj );
			//ダイアログ内の地名にイベントをセット
			thisClosestObj.find(".dialog-place-list a").click(function(e){
				//親要素js-dialog-placeにdate属性を埋込
				var thisDataNode = $(this).closest(".js-dialog-place");
				thisDataNode.attr("data-pcd", $(this).attr("data-pcd") );//string型のためdataメソッド禁止
				thisDataNode.find("a:first").text( $(this).text() );
				jBusGlobalCommon.hideDialog();
				jBusGlobalCommon.removeError($(this));//エラー除去
				if(jBusGlobalCommon.chkDispSP()){
					jBusGlobalCommon.dispSmooth(thisDataNode.find("a:first"));//スクロール
				}
				e.preventDefault();
			});
		}
		jBusGlobalCommon.showDialog( thisClosestObj.find(".dialog"),"fade" );
		e.preventDefault();
	});
// Event : onClick : 高速バス：地名入替 ------------------------------
	$("#tabHighwayReplace a:first").click(function(e){
		var thisFromText = $("#tabHighwayFrom a:first").text();
		var thisFromPCD = $("#tabHighwayFrom").attr("data-pcd");
		var thisToText = $("#tabHighwayTo a:first").text();
		var thisToPCD = $("#tabHighwayTo").attr("data-pcd");

		$("#tabHighwayFrom a:first").text( thisToText );
		$("#tabHighwayTo   a:first").text( thisFromText );
		$("#tabHighwayFrom").attr( "data-pcd",thisToPCD );
		$("#tabHighwayTo"  ).attr( "data-pcd",thisFromPCD );

		//入替前のdata-pcdがundefinedなら、入替後のdata-pcdを開放
		if(thisFromPCD==null){
			$("#tabHighwayTo a:first").text(defaultToText);
			$("#tabHighwayTo"  ).attr( "data-pcd",null );
		}
		if(thisToPCD==null){
			$("#tabHighwayFrom a:first").text(defaultFromText);
			$("#tabHighwayFrom").attr( "data-pcd",null );
		}
		jBusGlobalCommon.removeError($("#tabHighwayFrom a:first"), $("#tabHighwayTo a:first"));//エラー除去
		e.preventDefault();
	});
// Event : onClick : 高速バス：出発日 --------------------------------
	$("#tabHighwayDate a:first").click(function(e){
		setEventDialogDate($(this));
		e.preventDefault();
	});
// Event : onClick : 高速バス：検索する ------------------------------
	$("#tabHighwaySearch").click(function(e){
		var thisURL = "/hon/Route/Highway"; //結果ページURL
		var thisDPCD = $("#tabHighwayFrom").attr("data-pcd"); //出発地(dpcd)の読込
		var thisAPCD = $("#tabHighwayTo").attr("data-pcd"); //到着時(apcd)の読込
		var thisDTYM = $("#tabHighwayDate").attr("data-yyyymm"); //出発年月(dtym)の読込
		var thisDTDD = $("#tabHighwayDate").attr("data-dd"); //出発日(dtdd)の読込

		var thisError ="";
		if(!thisDPCD || thisDPCD==null){
			thisError += "出発地を指定してください。<br/>";
			jBusGlobalCommon.setError($("#tabHighwayFrom a"));
		}
		if(!thisAPCD || thisAPCD==null){
			thisError += "到着地を指定してください。<br/>";
			jBusGlobalCommon.setError($("#tabHighwayTo a"));
		}
		if(!thisDTYM || thisDTYM==null){
			thisError += "出発日を指定してください。<br/>";
			jBusGlobalCommon.setError($("#tabHighwayDate a"));
		}

		//エラー表示
		if(thisError){
			jBusGlobalCommon.setDialogAlert( "warning","注意",thisError,$(this),0);
		//便一覧への移動
		}else{
			setPuchState();//状態保存
			var thisPath = "?dpcd=" + thisDPCD + "&apcd=" + thisAPCD + "&dtym=" + thisDTYM + "&dtdd=" + thisDTDD;
			location.href = thisURL + thisPath;
		}
		e.preventDefault();
	});

// Event : onClick : 空港連絡バス：空港選択メニュー ------------------
	$("#tabAirPlace li a:not([href^='/'])").click(function(e){
		if( $(this).closest("li").find("ul:first").is(":hidden") ){
			//表示制御
			$(this).closest("li").siblings().find("ul").hide();
			$(this).closest("li").find("ul:first").show();
		}else{
			//表示制御
			$(this).closest("li").find("ul:first").hide();
		}
		//選択状態のclass追加削除
		$("#tabAirPlace a").removeClass("current");
		$("#tabAirPlace ul").each(function(){
			if( $(this).is(":visible") ){
				$(this).prev().addClass("current");
			}
		});
		e.preventDefault();
	});
// Event : onClick : 空港連絡バス：空港決定 --------------------------
	$("#tabAirPlace li a[href^='/']").click(function(e){
		//日付が選択済みならすぐに転送し、未選択ならダイアログ表示後転送
		var thisURL = $(this).attr("href");//ページ遷移先※gpcd,rocdがHTML側にセットされている前提
		var thisDTYM = $("#tabAirDate").attr("data-yyyymm"); //出発年月(dtym)の読込
		var thisDTDD = $("#tabAirDate").attr("data-dd"); //出発日(dtdd)の読込
		//日付選択済みの場合
		if(thisDTYM){
			var thisPath = "&dtym=" + thisDTYM + "&dtdd=" + thisDTDD; //gpcd,rocdがHTML側にセットされている前提
			location.href = thisURL + thisPath;
		}else{
		//日付未選択の場合、日付選択（固定表示）
			var thisLocURL = thisURL; //gpcd,rocdがHTML側にセットされている前提
			jBusGlobalCommon.setDialogDateFixedLoc(thisLocURL,"出発日を指定してください",$(this));
		}
		e.preventDefault();
	});

// Event : onClick : 空港連絡バス：出発日 ----------------------------
	$("#tabAirDate a:first").click(function(e){
		setEventDialogDate($(this));
		e.preventDefault();
	});

// Event : onClick : 定期観光バス：検索する --------------------------
	$("#tabTourSearch").click(function(e){
		var thisSelected = $("#tabTourPlace").val();//URL
		if(thisSelected){
			location.href = thisSelected;
		}else{
			var thisError ="地域を選択してください";
			jBusGlobalCommon.setDialogAlert( "warning","注意",thisError,$(this),0 );
			jBusGlobalCommon.setError($("#tabTourPlace"));
		}
		e.preventDefault();
	});
// Event : その他 : 定期観光バス：選択中 --------------------------
	$("#tabTourPlace").change(function(){
		jBusGlobalCommon.removeError($("#tabTourPlace"));//エラー除去
	});

// Event : resize **********************************************************************************
	$(window).resize(function() {
		$("#tabHighwaySubBody").removeClass("show");
	});

// Functions ***************************************************************************************

// func:カレンダーダイアログの表示とイベント追加 ---------------------
	function setEventDialogDate (thisObj){
		//カレンダーを表示し、選択された日程情報を親要素(".js-dialog-date")のdata属性に埋込
		var thisClosestObj = thisObj.closest(".js-dialog-date"); //親要素
		var isDialog = thisClosestObj.find(".dialog").length; //重複確認
		if(!isDialog){
			jBusGlobalCommon.setDialogDate( thisObj, thisClosestObj );
			//ダイアログ内の日付にイベントをセット
			thisClosestObj.find("table a").click(function(e){
				var thisYYYY = $(this).attr("data-yyyymmdd").substr(0,4);
				var thisMM   = $(this).attr("data-yyyymmdd").substr(4,2);
				var thisDD   = $(this).attr("data-yyyymmdd").substr(6,2);
				var thisDDDD = $(this).attr("data-dddd");//曜日
				//data属性の埋込
				$(this).closest(".js-dialog-date").attr({
					"data-yyyymm":thisYYYY+thisMM,
					"data-dd":thisDD
				});
				//表示用テキスト
				thisMM = parseFloat(thisMM);
				thisDD = parseFloat(thisDD);
				var thisText = thisYYYY + "年" + thisMM + "月" + thisDD + "日（" + thisDDDD + "）";
				$(this).closest(".js-dialog-date").find("a:first").text(thisText);

				jBusGlobalCommon.hideDialog();
				jBusGlobalCommon.removeError($("#tabHighwayDate a:first"));//エラー除去
				if(jBusGlobalCommon.chkDispSP()){
					jBusGlobalCommon.dispSmooth($(this).closest(".js-dialog-date").find("a:first"));//スクロール
				}
				e.preventDefault();
			});
		}
		jBusGlobalCommon.showDialog( thisClosestObj.find(".dialog"),"fade" );
	}
// func:ブラウザバック対策(pushState) -----------------------
	function setPuchState(){
		if (window.history && window.history.pushState){//pushStateに対応しているか
			var thisHighwayPcdFrom = $("#tabHighwayFrom").attr("data-pcd");
			var thisHighwayPcdTo   = $("#tabHighwayTo").attr("data-pcd");
			var thisHighwayYYYYMM  = $("#tabHighwayDate").attr("data-yyyymm");
			var thisHighwayDD      = $("#tabHighwayDate").attr("data-dd");
			var thisURL  = "/hon/" + "?pcdfrom="+ thisHighwayPcdFrom + "&pcdto="+ thisHighwayPcdTo +"&yyyymm="+ thisHighwayYYYYMM +"&dd="+ thisHighwayDD;

			history.pushState('', '', thisURL);
		}
	}
	function loadState(){
		var thisArrLoc =location.search.substring(1).split('&');
		for(var i=0;i<thisArrLoc.length;i++) {
			var thisArr = thisArrLoc[i].split('=');
			thisArrLoc[thisArr[0]]=thisArr[1];
		}
		if( thisArrLoc["pcdfrom"] && thisArrLoc["pcdto"] && thisArrLoc["yyyymm"] && thisArrLoc["dd"] ){
		//data属性の埋込
			$("#tabHighwayFrom").attr("data-pcd",thisArrLoc["pcdfrom"]);
			$("#tabHighwayTo").attr("data-pcd",thisArrLoc["pcdto"]);
			$("#tabHighwayDate").attr({
				"data-yyyymm":thisArrLoc["yyyymm"],
				"data-dd":thisArrLoc["dd"]
			});
		//表示テキスト
			$("#tabHighwayFrom a").text( jBusGlobalData.place(Number(thisArrLoc["pcdfrom"])) );
			$("#tabHighwayTo a").text( jBusGlobalData.place(Number(thisArrLoc["pcdto"])) );
			//日付部分
			var indexYYYY = thisArrLoc["yyyymm"].substr(0,4);
			var indexMM   = thisArrLoc["yyyymm"].substr(4,2);
			var indexDD   = thisArrLoc["dd"];

			//URLパラメータの異常値補正(地名コードのチェックはcommon.js)
			var indexTodayDate = new Date();
			var indexTodayYYYY = indexTodayDate.getFullYear();
			var indexTodayMM = indexTodayDate.getMonth()+1;
			indexTodayMM = ("0" + indexTodayMM).slice(-2);
			//過去の日付を訂正
			var indexTodayYYYYMM = "" + indexTodayYYYY + indexTodayMM;
			var indexYYYYMM = "" + indexYYYY + indexMM;
			if( Number(indexYYYYMM) < Number(indexTodayYYYYMM)){
				indexYYYY = indexTodayYYYY;
				indexMM = indexTodayMM;
			}
			//異常な月を訂正
			if(parseFloat(indexMM) > 12){
				indexMM = "12";
			}
			var TableOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
			if( (indexYYYY%4)==0 ){ TableOfMonth[1] = 29; }
			var thisEndOfMonth = TableOfMonth[parseFloat(indexMM-1)];
			if(indexDD > thisEndOfMonth) indexDD = thisEndOfMonth;
			//日付テキストの埋込
			var indexDate = new Date(indexYYYY,parseFloat(indexMM-1),parseFloat(indexDD));
			var TableOfWeek = ["日","月","火","水","木","金","土"];
			var indexDDDD = TableOfWeek[indexDate.getDay()];
			indexMM = parseFloat(indexMM);
			indexDD = parseFloat(indexDD);
			var thisText = indexYYYY + "年" + indexMM + "月" + indexDD + "日（" + indexDDDD + "）";
			$("#tabHighwayDate > a.icon-calendar").text(thisText);
		}
	}


//**************************************************************************************************
});
